import { useState, useEffect } from "react";

// import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { useNavigate } from "react-router-dom";
import { Globe } from 'lucide-react';
import { Tickets } from 'lucide-react';
import { User } from 'lucide-react';
import Navbar from "../components/navbar";
import { format } from "date-fns";

// import { Ban } from 'lucide-react';
export default function PendingActivities() {
  const navigate = useNavigate();
  const [activityData, setActivityData] = useState([]);
  const [activityDataType, setActivityDataType] = useState([]);
  const [type, setType] = useState("");

  
    useEffect(() => {
      try {
        fetch("http://localhost:5000/api/activities/padding-activities", {}).then(
          (response) => {
            response.json().then((data) => {
              setActivityData(data.data);
            });
          }
        );
      } catch (e) {
        console.log(e);
      }
    }, []);
      
    useEffect(() => {
      try {
        fetch(`http://localhost:5000/api/activities/padding-activities/${type}`, {}).then(
          (response) => {
            response.json().then((data) => {
              setActivityDataType(data.data);
            });
          }
        );
      } catch (e) {
        console.log(e);
      }
    }, [type]);
  
  
  return (
    <div className=" flex justify-between">
      <Sidebar />
      <div className="flex-1 mx-[100px] py-8">
        <Navbar/>
        <div>
          <span className=" pb-1 text-[#777]  border-b border-[#777]">
            Activities
          </span>{" "}
          <span className=" text-[#777]"> /</span>{" "}
          <span className=" pb-1 text-[#777]  border-b border-[#777]">
            Pending Activities
          </span>
        </div>
        <h3 className=" text-3xl font-bold text-center my-8">
        Pending Activities
        </h3>
        <div className=" flex gap-1 items-center">
            <button
              onClick={() => setType("")}
              className={` rounded-xl duration-300 ${
                type === "" ? "bg-main text-white" : "bg-secondary text-black"
              }  py-3 w-32 text-[13px]`}
            >
              All Activitie
            </button>
            <button
              onClick={() => setType("Workshop")}
              className={` rounded-xl duration-300 ${
                type === "Workshop"
                  ? "bg-main text-white"
                  : "bg-secondary text-black"
              }  py-3 w-32 text-[13px]`}
            >
              Workshops
            </button>
            <button
              onClick={() => setType("Publications")}
              className={` rounded-xl duration-300 ${
                type === "Publications"
                  ? "bg-main text-white"
                  : "bg-secondary text-black"
              }  py-3 w-32 text-[13px]`}
            >
              Publications
            </button>
            <button
              onClick={() => setType("Conferences & Talks")}
              className={` rounded-xl duration-300 ${
                type === "Conferences & Talks"
                  ? "bg-main text-white"
                  : "bg-secondary text-black"
              }  py-3 w-32 text-[13px]`}
            >
              Conferences & Talks
            </button>
            <button
              onClick={() => setType("Events")}
              className={` rounded-xl duration-300 ${
                type === "Events"
                  ? "bg-main text-white"
                  : "bg-secondary text-black"
              }  py-3 w-32 text-[13px]`}
            >
              Events
            </button>
            <button
              onClick={() => setType("Interviews")}
              className={` rounded-xl duration-300 ${
                type === "Interviews"
                  ? "bg-main text-white"
                  : "bg-secondary text-black"
              }  py-3 w-32 text-[13px]`}
            >
              Interviews
            </button>
            <button
              onClick={() => setType("Competitions")}
              className={` rounded-xl duration-300 ${
                type === "Competitions"
                  ? "bg-main text-white"
                  : "bg-secondary text-black"
              }  py-3 w-32 text-[13px]`}
            >
              Competitions
            </button>
          </div>
              {
               type === "" ?  activityData.map((item)=> {
                return (
                  <div key={item._id} onClick={()=> navigate(`/activities/pending-activities/${item._id}`)} className="border border-[#2F150599] my-4 rounded-lg flex bg-[#C5AD891A] shadow-md overflow-hidden w-full">
                  <div className="relative">
                    <img
                      src={item.featuredImage}
                      alt="image"
                      className="w-[280px] bg-left h-[222px] object-cover "
                    />
                  </div>
                  <div className="p-4 relative">
                    <h3 className="text-lg font-semibold text-gray-800"> {item?.activityName}</h3>
                    <div className="flex items-center text-sm text-gray-500 space-x-2 my-2">
                      <span>{format(item?.date, "P")} | {item?.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 space-x-2 mb-2">
                      <Globe  className="w-4 h-4 text-main size-20" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 space-x-2 mb-2">
                      <Tickets className="w-4 h-4 text-main" />
                      <span>{item.price}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 space-x-2">
                      <User className="w-4 h-4 text-main" />
                      <span>{item.appliedNumber}</span>
                    </div>
                    <div className="flex mt-2 items-center text-sm text-gray-500 space-x-2">
                    {
                       item?.sponsors === undefined || item.sponsors.length === 0? <div> no sponsors</div>:   item?.sponsors.map((spons)=> {
                            return (
                              <img key={spons?.name} src={spons?.logo} alt="" className="w-10" />
                            )
                          })
                        }
                    </div>
                    <div onClick={()=> navigate("/activities/pending-activities/:id")} className=" translate-x-[450px] w-fit cursor-pointer   py-2 px-8 rounded-xl bg-main text-white"> Details</div>
                  </div>
                </div>
                )
              }) :  activityDataType.map((item)=> {
                return (
                  <div key={item._id} onClick={()=> navigate(`/activities/pending-activities/${item._id}`)} className="border border-[#2F150599] my-4 rounded-lg flex bg-[#C5AD891A] shadow-md overflow-hidden w-full">
                  <div className="relative">
                    <img
                     src={item.featuredImage}
                      alt="image"
                      className="w-[280px] bg-left h-[222px] object-cover "
                    />
                  </div>
                  <div className="p-4 relative">
                    <h3 className="text-lg font-semibold text-gray-800">{item?.activityName}</h3>
                    <div className="flex items-center text-sm text-gray-500 space-x-2 my-2">
                      <span>{format(item?.date, "P")} | {item?.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 space-x-2 mb-2">
                      <Globe  className="w-4 h-4 text-main size-20" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 space-x-2 mb-2">
                      <Tickets className="w-4 h-4 text-main" />
                      <span>{item.price}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 space-x-2">
                      <User className="w-4 h-4 text-main" />
                      <span>{item.appliedNumber}</span>
                    </div>
                    <div className="flex mt-2 items-center text-sm text-gray-500 space-x-2">
                    {
                       item?.sponsors === undefined || item.sponsors.length === 0? <div> no sponsors</div>:   item?.sponsors.map((spons)=> {
                            return (
                              <img key={spons?.name} src={spons?.logo} alt="" className="w-10" />
                            )
                          })
                        }
                    </div>
                    <div onClick={()=> navigate("/activities/pending-activities/:id")} className=" cursor-pointer translate-x-[450px] w-fit py-2 px-8 rounded-xl -right-32 bg-main text-white"> Details</div>
                  </div>
                </div>
                )
              })
              }
      </div>
    </div>
  );
}
