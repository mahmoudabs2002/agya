import { useContext, useEffect, useRef, useState } from "react";
// import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { PencilOff } from "lucide-react";
import { useParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import { GlobalContext } from "../context/GlobelContext";

export default function AdminEdit() {
  const [adminsData, setAdminsData] = useState();
  const { setIsAuthUser } = useContext(GlobalContext);
  const [user ,setUser] = useState()
  const [formData, setFormData] = useState({}); // State for form inputs
  const [image, setImage] = useState();
  const toastBC = useRef(null);

  const { id } = useParams();
 
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userInfo")))
    const fetchUserData = async () => {
      try {
        fetch(`http://localhost:5000/api/auth/single-admin/${id}`, {}).then(
          (response) => {
            response.json().then((data) => {
              setAdminsData(data.data);
              setFormData({
                firstname: data.data.firstname || "",
                lastname: data.data.lastname || "",
                email: data.data.email || "",
                image: data.data.image || "",
              });
            });
          }
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);
  // useEffect(() => {
  //   try {
  //     fetch(`http://localhost:5000/api/auth/single-admin/${id}`, {}).then(
  //       (response) => {
  //         response.json().then((data) => {
  //           setAdminsData(data.data);
  //         });
  //       }
  //     );
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, [id]);
  const update = async (e) => {
    // setPageLevelLoader(true);
    e.preventDefault();
    const formDataToSend = { ...formData };
    const imageData = new FormData();
    imageData.append("file", image); // The key should match the multer configuration
    imageData.set("firstname", formData.firstname);
    imageData.set("lastname", formData.lastname);
    imageData.set("email", formData.email);
    // Upload the image to the backend
    const imageUploadResponse = await fetch(
      `http://localhost:5000/api/uploads/profiles/${adminsData._id}`,
      {
        method: "PUT",
        body: imageData,
      }
    );
    const finalData = await imageUploadResponse.json();


    // if()
    if (finalData.success) {
      toastBC.current.show({
        severity: "success",
        summary: "Profile image uploaded and user updated successfully.",
        sticky: true,
      });
      user.id === id?
      localStorage.setItem("userInfo", JSON.stringify(finalData.user)) : null;
      // setIsAuthUser(finalData.user);
      setTimeout(() => {
        window.location.href = "/admin";
      }, 1000);
    } else {
      toastBC.current.show({
        severity: "error",
        summary: "No image uploded",
        sticky: true,
      });
    }
    // Update the formData with the new image URL from the response
    formDataToSend.image = imageUploadResponse.data.user.image;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const [firstname ,setFirstname] = useState("")
  return (
    <div className=" flex justify-between">
      <Sidebar />

      <div className="flex-1 mx-[100px] py-8">
        <div className=" w-full  px-3 py-8">
          <div>
            <span className=" pb-1 text-[#777]  border-b border-[#777]">
              Activities
            </span>{" "}
            <span className=" text-[#777]"> /</span>{" "}
            <span className=" pb-1 text-[#777]  border-b border-[#777]">
              Edit Admin
            </span>
          </div>
          <div className="flex flex-col items-center py-8 bg-white min-h-screen">
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Edit Profile
            </h2>

            {/* Profile Image */}
            <div className="relative">
              <img
                src={formData.image || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover" // Increased size to 150x150
              />
              <label htmlFor="dropzone-file">
                <div
                  htmlFor="id"
                  className="absolute bottom-0 right-0 bg-white border border-main p-2 rounded-full cursor-pointer hover:bg-gray-100"
                >
                  <PencilOff className="w-5 h-5 text-main" />
                </div>
                <input
                  accept="image/*"
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  name="img"
                  onChange={handleImageChange}
                />
              </label>
              {/* <input type="file" className=" hidden" id="file"/>
              <div htmlFor="id" className="absolute bottom-0 right-0 bg-white border border-main p-2 rounded-full cursor-pointer hover:bg-gray-100">
                <label htmlFor="id"><PencilOff className="w-5 h-5 text-main" /></label>
              </div> */}
            </div>

            {/* Profile Name */}
            <h3 className="text-lg font-medium text-gray-800 mt-4">
              {adminsData?.firstname} {adminsData?.lastname}
            </h3>

            {/* Form */}
            <form
              className="w-full max-w-3xl mt-6 bg-white px-6 py-8 border-t-2 "
              onSubmit={update}
            >
              {/* First Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-brown-500 focus:border-brown-500"
                />
              </div>

              {/* Last Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-brown-500 focus:border-brown-500"
                />
              </div>

              {/* Affiliation */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-brown-500 focus:border-brown-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-main text-white py-2 px-4 rounded-md hover:bg-brown-700 focus:ring focus:ring-brown-400"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
      <Toast ref={toastBC} position="top-right" />
    </div>
  );
}
