import { useRef, useState } from "react";
// import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { Toast } from "primereact/toast";

export default function NewAdmin() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toastBC = useRef(null);
  const [formData, setFormData] = useState({}); // State for form inputs
  const [image, setImage] = useState();

  const addAdmin = async (e) => {
    // setPageLevelLoader(true);
    e.preventDefault();
    const formDataToSend = { ...formData };
    const imageData = new FormData();
    imageData.append("file", image); // The key should match the multer configuration
    imageData.set("firstname", formData.firstname);
    imageData.set("lastname", formData.lastname);
    imageData.set("email", formData.email);

    const response = await fetch(
      "https://agya-new-main-umye.vercel.app/api/auth/add-admin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
        }),
      }
    );
    const finalData = await response.json();
    if (finalData.success) {
      toastBC.current.show({
        severity: "success",
        summary: "added admin succesfully",
        sticky: true,
      });
      setTimeout(() => {
        window.location.href = "/admin";
      }, 1000);
    } else {
      toastBC.current.show({
        severity: "error",
        summary: "something wrong",
        sticky: true,
      });
    }
  };
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
              add Admin
            </span>
          </div>
          <div className="flex flex-col items-center py-8 bg-white min-h-screen">
            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6">add Admin</h2>

            {/* Profile Image */}
            <div className="relative">
              <img
                src="https://via.placeholder.com/150"
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover" // Increased size to 150x150
              />
              {/* <div className="absolute bottom-0 right-0 bg-white border border-main p-2 rounded-full cursor-pointer hover:bg-gray-100">
                <PencilOff className="w-5 h-5 text-main" />
              </div> */}
            </div>

            {/* Form */}
            <form
              className="w-full max-w-3xl mt-6 bg-white px-6 py-8 border-t-2 "
              onSubmit={addAdmin}
            >
              {/* First Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
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
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-brown-500 focus:border-brown-500"
                />
              </div>

              {/* Affiliation */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-brown-500 focus:border-brown-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-brown-500 focus:border-brown-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-main text-white py-2 px-4 rounded-md hover:bg-brown-700 focus:ring focus:ring-brown-400"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
      <Toast ref={toastBC} position="top-right" />
    </div>
  );
}
