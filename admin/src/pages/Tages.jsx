import { useEffect, useRef, useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
// import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { EllipsisVertical } from 'lucide-react';
import { Toast } from 'primereact/toast';


export default function Tages() {
  // const navigate = useNavigate();
  const [tagName, setTageName] = useState("");
  const [tagData, setTageData] = useState([]);
    const toastBC = useRef(null);
  

  const [isOpen, setIsOpen] = useState();

  // window.addEventListener("click", () => {
  //   setIsOpen()
  // })

  useEffect(() => {
    try {
      fetch("http://localhost:5000/api/tags/all", {}).then((response) => {
        response.json().then((data) => {
          setTageData(data.data);
        });
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const addTages = async (e) => {
    // setPageLevelLoader(true);
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/tags/add-tag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: tagName,
      }),
    });
    const finalData = await response.json();
    if (finalData.success) {
      toastBC.current.show({
        severity: 'success',
        summary: "add tag succesfully",
        sticky: true,
    });
      setTimeout(() => {
        window.location.href = "/tags";
      }, 1000);
    } else {
      alert(finalData.message);
    }
  };
  const deleteTag = async (id) => {
    const data = await fetch(`http://localhost:5000/api/tags/delete-tag/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const finalData = await data.json();
    if (finalData.success) {
      toastBC.current.show({
        severity: 'success',
        summary: "removed tag succesfully",
        sticky: true,
    });
      setTimeout(() => {
        window.location.href = "/tags";
      }, 1000);
    }
  };

  return (
    <div className=" flex justify-between">
      <Sidebar />

      <div className="flex-1 mx-[100px] py-8">
        <Navbar />
        <div className=" w-full  px-3 py-8">
          <h1 className="mb-7 text-left font-bold text-3xl text-black">
            All Tags
          </h1>
          <div className=" flex gap-[10px]">
            {tagData === undefined ? (
              <div>loading</div>
            ) : (
              tagData.map((tag) => {
                return (
                  <div
                    key={tag._id}
                    className=" flex relative justify-between items-center py-2 gap-4 px-2 bg-main text-white font-light max-h-fit rounded-[5px]"
                  >
                    <div className="ml-4">{tag.name}</div>
                    <EllipsisVertical className=" cursor-pointer" onClick={()=> isOpen === tag._id ? setIsOpen():setIsOpen(tag._id) } />
                      {
                        isOpen === tag._id ?  <div className=" duration-700 absolute bg-white top-11 -right-6 py-2 px-8 border cursor-pointer  text-black" onClick={()=> deleteTag(tag._id)}> delete</div>: null
                      }
                    {/* <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? "long-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      <MoreVertIcon className=" text-white " />
                    </IconButton>
                    <Menu
                      id="long-menu"
                      MenuListProps={{
                        "aria-labelledby": "long-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      slotProps={{
                        paper: {
                          style: {
                            maxHeight: 48 * 4.5,
                            width: "20ch",
                          },
                        },
                      }}
                    >
                      <MenuItem onClick={() => deleteTag(tag._id)}>
                        Delete
                      </MenuItem>
                    </Menu> */}
                  </div>
                );
              })
            )}
          </div>
          <div className=" mt-8">
            <h1 className="mb-7 text-left font-bold text-3xl text-black">
              Add New Tags
            </h1>
            <form onSubmit={addTages} className=" w-full relative">
              <input
                type="text"
                className=" mb-1 h-[50px] py-[2px] px-[5px] border-main/50 pr-12 outline-none border rounded-xl bg-secondary w-full"
                placeholder="Write Tags here"
                onChange={(e) => setTageName(e.target.value)}
              />
              <Plus className="  absolute right-2 bg-main text-white w-[35px] h-[35px] rounded-[5px] top-[8px] py-[2px] px-[8px]  " />
            </form>
          </div>
        </div>
      </div>
      <Toast ref={toastBC} position="top-right" />
    </div>
  );
}
