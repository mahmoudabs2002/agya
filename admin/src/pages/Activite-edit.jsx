import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "primereact/calendar";
import { IoTrashBinOutline } from "react-icons/io5";
import { Edit3 } from "lucide-react";
import Navbar from "../components/navbar";
import { Toast } from "primereact/toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { GlobalContext } from "../context/GlobelContext";
import axios from "axios";
const AddActivity = () => {
  const navigate = useNavigate();
  const toastBC = useRef(null);
  const { setIsAuthUser, isAuthUser } = useContext(GlobalContext);
  const [uploading, setUploading] = useState(false);
  const [sponsorImages, setSponsorImages] = useState([]);
  const [sponsorPreviews, setSponsorPreviews] = useState([]);
  const [formData, setFormData] = useState({
    activityName: "",
    type: "Workshop",
    date: "",
    time: null,
    institution: "",
    location: "offline",
    locationDetails: "",
    price: "Free",
    priceAmount: "",
    description: "",
    timeline: "",
    externalLink: "",
    callToAction: "",
  });
  const sponsorUrls = [];
  const [featuredImage, setFeaturedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setIsAuthUser(userInfo);
  }, [setIsAuthUser]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFeaturedImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toastBC.current.show({
          severity: "error",
          summary: "Image size should be less than 5MB",
          sticky: true,
        });
        return;
      }
      setFeaturedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSponsorImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const oversizedFiles = files.filter((file) => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toastBC.current.show({
        severity: "error",
        summary: "Some images are larger than 5MB",
        sticky: true,
      });
      return;
    }
    setSponsorImages((prev) => [...prev, ...files]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setSponsorPreviews((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };
  const removeSponsorImage = (index) => {
    setSponsorImages((prev) => prev.filter((_, i) => i !== index));
    setSponsorPreviews((prev) => prev.filter((_, i) => i !== index));
  };
  const validateForm = () => {
    const required = [
      "activityName",
      "type",
      "date",
      "institution",
      "description",
    ];
    const missingFields = required.filter((field) => !formData[field]);
    if (missingFields.length) {
      toastBC.current.show({
        severity: "error",
        summary: `Required fields missing: ${missingFields.join(", ")}`,
        sticky: true,
      });
      return false;
    }
    if (formData.location === "offline" && !formData.locationDetails) {
      toastBC.current.show({
        severity: "error",
        summary: "Location details required for offline activities",
        sticky: true,
      });
      return false;
    }
    if (formData.price === "Paid" && !formData.priceAmount) {
      toastBC.current.show({
        severity: "error",
        summary: "Price amount required for paid activities",
        sticky: true,
      });
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthUser) {
      return toastBC.current.show({
        severity: "error",
        summary: "Please login first",
        sticky: true,
      });
    }
    if (!validateForm()) {
      return;
    }
    try {
      setUploading(true);
      if (featuredImage) {
        const featuredFormData = new FormData();
        featuredFormData.append("file", featuredImage);
        const featuredResponse = await axios.post(`https://agyademo.uber.space/upload`, featuredFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (featuredResponse) {
          for (const sponsorImage of sponsorImages) {
            const formData = new FormData();
            formData.append("file", sponsorImage);
            try {
              const response = await axios.post(`https://agyademo.uber.space/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
              });
              if (response) {
                sponsorUrls.push(
                  `https://agyademo.uber.space/files/${response.data.link}`
                );
              }
            } catch (error) {
              toastBC.current.show({
                severity: "error",
                summary: `Failed to upload sponsor image: ${sponsorImage.name}`,
                sticky: true,
              });
            }
          }
        }
        const formattedDate =
          formData.date instanceof Date
            ? formData.date.toISOString().split("T")[0]
            : formData.date;
        const formattedTime =
          formData.time instanceof Date
            ? formData.time.toLocaleTimeString()
            : formData.time;
        const activityData = {
          userId: isAuthUser.id,
          activityName: formData.activityName,
          activityType: formData.type,
          date: formattedDate,
          time: formattedTime,
          featuredImage: `https://agyademo.uber.space/files/${featuredResponse.data.link}`,
          organization: formData.institution,
          sponsors: sponsorUrls,
          location:
            formData.location === "offline"
              ? formData.locationDetails
              : formData.location,
          price: formData.price === "Free" ? "Free" : formData.priceAmount,
          description: formData.description,
          timeline: formData.timeline,
          activityExLink: formData.externalLink,
          apply: formData.callToAction,
          status: "pending",
        };
        const activityResponse = await fetch(
          "https://agyademo.uber.space/api/activities",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(activityData),
          }
        );
        if (activityResponse) {
          toastBC.current.show({
            severity: "success",
            summary: "Activity created successfully!",
            sticky: true,
          });
        }
        const newActivity = await activityResponse.json();
        navigate("/overview");
      }
    } catch (error) {
      toastBC.current.show({
        severity: "error",
        summary: error.message || "Failed to create activity",
        sticky: true,
      });
    } finally {
      setUploading(false);
    }
  };
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };
  return (
    <div className="p-4 sm:px-12 lg:px-24">
      <Navbar />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <nav className="text-gray-500 text-sm">
            <span>Activities</span> / <span>New Activity</span> /{" "}
            <span>Create</span>
          </nav>
          <h1 className="text-3xl font-bold text-center mt-6">New Activity</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Left Column */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block font-bold mb-2">
                  <span className="text-red-500 mr-1">*</span>Activity Name
                </label>
                <input
                  type="text"
                  name="activityName"
                  value={formData.activityName}
                  onChange={handleInputChange}
                  className="w-full p-2 border bg-white rounded-lg"
                  placeholder="Enter activity name"
                />
              </div>
              <div>
                <label className="block font-bold mb-2">
                  <span className="text-red-500  mr-1">*</span>Activity Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full p-2 border bg-white rounded-lg"
                >
                  <option value="Workshop">Workshop</option>
                  <option value="Publication">Publication</option>
                  <option value="Conference">Conference and talk</option>
                  <option value="Event">Event</option>
                  <option value="Interview">Interview</option>
                  <option value="Competition">Competition</option>
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 font-bold">Date</label>
                  <Calendar
                    value={formData.date}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, date: e.value }))
                    }
                    className="w-full bg-white h-9"
                  />
                </div>
                <div>
                  <label className="block mb-2 font-bold">Time</label>
                  <Calendar
                    value={formData.time}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, time: e.value }))
                    }
                    timeOnly
                    hourFormat="12"
                    className="w-full h-9 bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold mb-2">
                  <span className="text-red-500 mr-1">*</span>
                  Organization
                </label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                  className="w-full bg-white p-2 border rounded-lg"
                  placeholder="Enter organization name"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-2">Location Type</label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full bg-white p-2 border rounded-lg"
                  >
                    <option value="offline">Offline</option>
                    <option value="online">Online</option>
                  </select>
                </div>
                {formData.location === "offline" && (
                  <div>
                    <label className="block font-bold mb-2">
                      Location Details
                    </label>
                    <input
                      type="text"
                      name="locationDetails"
                      value={formData.locationDetails}
                      onChange={handleInputChange}
                      className="w-full bg-white p-2 border rounded-lg"
                      placeholder="Enter location details"
                    />
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-2">Price Type</label>
                  <select
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full bg-white p-2 border rounded-lg"
                  >
                    <option value="Free">Free</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
                {formData.price === "Paid" && (
                  <div>
                    <label className="block font-bold mb-2">Price Amount</label>
                    <input
                      type="number"
                      name="priceAmount"
                      value={formData.priceAmount}
                      onChange={handleInputChange}
                      className="w-full bg-white p-2 border rounded-lg"
                      placeholder="Enter price amount"
                      min="0" // Optional: Prevent negative values
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Featured Image</h3>
                <div className="relative">
                  <img
                    src={imagePreview || "/png.png"}
                    alt="Featured preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <label className="absolute bottom-2 right-2 bg-white p-2 rounded-full cursor-pointer">
                    <Edit3 className="w-5 h-5" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFeaturedImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Sponsor Images</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {sponsorPreviews === undefined ||
                  sponsorPreviews.length === 0 ? (
                    <div> no sponsor</div>
                  ) : (
                    sponsorPreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Sponsor ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeSponsorImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                        >
                          <IoTrashBinOutline className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleSponsorImagesChange}
                  className="mt-4 w-full rounded-lg"
                />
              </div>
            </div>
          </div>
          <div className="space-y-16 sm:space-y-20 mb-4">
            <div>
              <label className="block mb-2 font-bold">
                <span className="text-red-500  mr-1">*</span>
                Description
              </label>
              <ReactQuill
                value={formData.description}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, description: value }))
                }
                modules={quillModules}
                className="h-40"
              />
            </div>
            <div>
              <label className="block font-bold mb-2">Timeline</label>
              <ReactQuill
                value={formData.timeline}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, timeline: value }))
                }
                modules={quillModules}
                className="h-40"
              />
            </div>
            {/* <div>
              <label className="block font-bold mb-2">External Link</label>
              <input
                type="url"
                name="externalLink"
                value={formData.externalLink}
                onChange={handleInputChange}
                className="w-full bg-white p-2 border rounded-lg "
                placeholder="Enter external link"
              />
            </div> */}
            <div>
              <label className="block font-bold mb-2">Application Link</label>
              <input
                type="url"
                name="callToAction"
                value={formData.callToAction}
                onChange={handleInputChange}
                className="w-full bg-white p-2 border rounded-lg"
                placeholder="Enter Applying link"
              />
            </div>
          </div>
          <div className="flex justify-center pt-6">
            <button
              type="submit"
              disabled={uploading}
              className="bg-main text-white px-6 sm:px-8 py-2 rounded-lg disabled:opacity-50 w-full sm:w-auto"
            >
              {uploading ? "Creating Activity..." : "Submit Activity"}
            </button>
          </div>
        </form>
        <Toast ref={toastBC} position="top-right" />
      </div>
    </div>
  );
};
export default AddActivity;
