// import { useState } from "react";
import Sidebar from "../components/sidebar";
// import { useNavigate } from "react-router-dom";
import { Search } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Plus } from 'lucide-react';


import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { File } from 'lucide-react';

import { useState } from "react";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],

    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export default function ArticleEdit() {
    const [value, setValue] = useState("");
  return (
    <div className=" flex justify-between">
      <Sidebar />

      <div className="flex-1 mx-[100px] py-8">
        <div className=" w-full  px-3 py-8">
          <form className="articale">
            <div className="">
              {/* <div className=" border ">
            <div className=" border-b py-2 px-4 flex justify-center items-center">
              <Select
                value={age}
                onChange={handleChange}
                 className=" mx-4"
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  None
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <button>B</button>
            </div>
            <div>
                <textarea className=" w-full h-auto relative re outline-none p-2" placeholder='Title 
                  subtitle                
                ' ></textarea>
            </div>
          </div> */}

              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
                formats={formats}
                placeholder=" write something ..."
              />
              <h3 className=" font-semibold my-5">Featured Image</h3>
              <div className=" flex flex-col ">
                <div>
                  <input
                    type="radio"
                    className=" accent-main w-[15px] h-[15px]"
                    id=""
                    name="feat-input"
                  />
                  <label htmlFor=""> Use first image as featured image</label>
                </div>
                <div>
                  <input
                    type="radio"
                    className=" accent-main w-[15px] h-[15px]"
                    name="feat-input"
                  />
                  <label htmlFor=""> Upload another image</label>
                </div>
              </div>
              <div className="tages">
                <h3 className="font-semibold my-5">Article Tags</h3>
                <div className=" flex h-[10px] items-center relative mb-[10px]">
                  <Search className=" text-black/50 absolute top-[-12px] left-1 w-[18px] " />
                  <input
                    type="text"
                    className=" bg-[#e6e6d7] border-0 w-1/2 px-[40px] h-[30px] mb-[10px] rounded-[5px] "
                  />
                </div>
                <div className="flex gap-[10px]">
                  <div className=" border border-solid py-[6px] px-[10px] border-main mt-[10px] rounded-[5px] ">
                    tag1
                  </div>
                  <div className=" border border-solid py-[6px] px-[10px] border-main mt-[10px] rounded-[5px] ">
                    tag1
                  </div>
                  <div className=" border border-solid py-[6px] px-[10px] border-main mt-[10px] rounded-[5px] ">
                    tag1
                  </div>
                  <div className=" border border-solid py-[6px] px-[10px] border-main mt-[10px] rounded-[5px] ">
                    tag1
                  </div>
                </div>
                <div>
                  <h3 className=" font-semibold my-5">Tags</h3>
                  <div className=" flex gap-[10px]">
                    <div className=" bg-main text-white font-light py-[6px] px-[10px] rounded-[5px]">
                      tag1
                    </div>
                    <div className=" bg-main text-white font-light py-[6px] px-[10px] rounded-[5px]">
                      tag1
                    </div>
                    <div className=" bg-main text-white font-light py-[6px] px-[10px] rounded-[5px]">
                      tag1
                    </div>
                    <div className=" bg-main text-white font-light py-[6px] px-[10px] rounded-[5px]">
                      tag1
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold my-5">Article References</h3>
                  <div className=" flex flex-col w-full gap-2 ">
                    <div className=" w-full relative">
                      <input
                        type="text"
                        className=" mb-1 h-[50px] border py-[2px] px-[5px] border-[#e6e6d7] w-full"
                        placeholder="Sources, bibliography, links, book titles"
                      />
                      <Plus className="  absolute right-2 bg-main text-white w-[35px] h-[35px] rounded-[5px] top-[8px] py-[2px] px-[8px]  " />
                    </div>
                    <div className="flex items-center gap-[5px]  w-full ">
                      <File fill="#005f6a" className="text-main" />
                      <p className=" text-main w-full text-[14px] underline">
                        https://agya.info/agya-life/key-activities/exhibition-opening-in-berlin-cinderella-sindbad-sinuhe-arab-german-storytelling-traditions-1-1
                      </p>
                      <Trash2 />
                    </div>
                    <div className="flex items-center gap-[5px] w-full">
                      <File fill="#005f6a" className="text-main" />
                      <p className=" text-main w-full text-[14px] underline">
                        https://agya.info/agya-life/key-activities/exhibition-opening-in-berlin-cinderella-sindbad-sinuhe-arab-german-storytelling-traditions-1-1
                      </p>
                      <Trash2 />
                    </div>
                    <div className="flex items-center gap-[5px] w-full">
                      <File fill="#005f6a"  className="text-main" />
                      <p className=" text-main w-full text-[14px] underline">
                        https://agya.info/agya-life/key-activities/exhibition-opening-in-berlin-cinderella-sindbad-sinuhe-arab-german-storytelling-traditions-1-1
                      </p>
                      <Trash2 />
                    </div>
                    <div className="flex items-center gap-[5px] w-full">
                      <File fill="#005f6a" className="text-main" />
                      <p className=" text-main w-full text-[14px] underline">
                        https://agya.info/agya-life/key-activities/exhibition-opening-in-berlin-cinderella-sindbad-sinuhe-arab-german-storytelling-traditions-1-1
                      </p>
                      <Trash2 />
                    </div>
                  </div>
                </div>
                <div className=" submit-articale">
                  <h4 className="mt-5 font-bold mb-5 ml-4">
                    By submitting this article, I certify that:
                  </h4>
                  <ol start={"1"} className=" ml-4" >
                    <li>
                      1- Content Accuracy: The content is based on credible
                      evidence and research.
                    </li>
                    <li>
                    2- Asset Ownership: I own the copyright to all uploaded
                      assets or have obtained necessary permissions.
                    </li>
                    <li>
                    3- Consent to Use: I grant [Platform Name] a non-exclusive,
                      worldwide, royalty-free license to reproduce, distribute,
                      display, and perform the uploaded assets.
                    </li>
                  </ol>
                  <div className="flex gap-[5px] mt-4  ">
                    <input type="checkbox" className=" accent-main w-[15px]" />
                    <p className="text-[13px]">
                      I understand that providing false or misleading
                      information or unauthorized assets may result in the
                      removal of my article and potential consequences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <button className=" bg-main text-white py-[12px] px-[100px] rounded-[5px] my-8">
                Done
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
