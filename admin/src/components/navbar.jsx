import { useContext, useRef, useState } from "react";
import { Search, Plus, FileText, Calendar, FilePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { GlobalContext } from "../context/GlobelContext";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [postOpen, setPostOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [postText, setPostText] = useState("");
  const navigate = useNavigate();
  const toastBC = useRef(null);
  const { isAuthUser } = useContext(GlobalContext);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const newPost = async (e) => {
    e.preventDefault();
    if (!postText.trim()) {
      toastBC.current.show({
        severity: "error",
        summary: "Post cannot be empty",
        sticky: true,
      });
    } // Prevent empty posts

    if (!isAuthUser) {
      toastBC.current.show({
        severity: "error",
        summary: "Please login",
        sticky: true,
      });
    }

    try {
      const postBody = {
        userId: isAuthUser.id,
        content: postText,
        authorName: isAuthUser.firstname,
      };
      const response = await fetch(
        `https://agya-new-main-umye.vercel.app/api/post/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create a new post");
      }

      const data = await response.json();
      if (data) {
        toastBC.current.show({
          severity: "success",
          summary: " post added",
          sticky: true,
        });
      } else {
        toastBC.current.show({
          severity: "error",
          summary: "something error",
          sticky: true,
        });
      }
      setPostText(""); // Clear the input
      setPostOpen(false); // Close the modal
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      {postOpen === true ? (
        <div className=" z-[1000] fixed bg-black/40 w-[1490px] h-[110vh] left-0 -top-[4px]  ">
          <div className=" bg-white flex flex-col py-4 px-4 justify-center top-[25%] absolute left-[30%] items-center">
            <form
              onSubmit={newPost}
              className=" relative border-main border p-4"
            >
              <div
                onClick={() => setPostOpen(false)}
                className="my-2 w-fit cursor-pointer text-right float-right bg-main rounded-full py-[4px] px-3 text-white"
              >
                X
              </div>
              <h3 className=" text-xl font-medium mt-10 text-center">
                New Post
              </h3>
              <textarea
                onChange={(e) => setPostText(e.target.value)}
                className=" border border-black mt-4 resize-none w-[500px] h-32 "
              >
                {" "}
              </textarea>
              <div className=" flex justify-center items-center">
                <button className=" block  bg-main text-white py-2 px-10 my-4 rounded-xl ">
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
      <header className="w-full py-3 ">
        <div className=" flex items-center justify-between gap-4">
          {/* Centered Search Bar */}
          <div className="flex-1 max-w-xl flex items-center gap-2">
            <form
              onSubmit={() => navigate(`/article/search?search=${search}`)}
              className="relative flex-1"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-main" />
              <input
                type="text"
                name="search"
                placeholder="Search articles by title"
                className="w-full pl-10 pr-4 py-2 bg-secondary text-main rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-main placeholder-gray-500"
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 relative">
            {/* New Button */}
            <button
              className="hidden sm:flex items-center px-9 py-[10px] bg-main text-white rounded-xl hover:bg-opacity-90 relative"
              onClick={toggleDropdown}
            >
              <Plus className="w-5 h-5" />
              <span>New</span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-14 pb-4 right-0 w-48 bg-main text-white rounded-xl shadow-lg z-50">
                {/* Arrow Pointer */}
                <div className="absolute -top-2 right-24 w-4 h-4 bg-main transform rotate-45"></div>
                {/* Dropdown Items */}
                <div
                  className="flex items-center cursor-pointer gap-2 px-4 py-3 text-sm hover:bg-opacity-90"
                  onClick={() => setPostOpen(true)}
                >
                  <FileText className="w-5 h-5" />
                  <span>New Post</span>
                </div>
                <hr className="border-t border-gray-300 w-11/12 mx-auto" />
                <a
                  href="/article/add"
                  className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-opacity-90"
                >
                  <FilePlus className="w-5 h-5" />
                  <span>New Article</span>
                </a>
                <hr className="border-t border-gray-300 w-11/12 mx-auto" />
                <a
                  href="/activity/new-activity"
                  className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-opacity-90"
                >
                  <Calendar className="w-5 h-5" />
                  <span>New Activity</span>
                </a>
                <hr className="border-t border-gray-300 w-11/12 mx-auto" />
              </div>
            )}
          </div>
        </div>
      </header>
      <Toast ref={toastBC} position="top-right" />
    </>
  );
}
