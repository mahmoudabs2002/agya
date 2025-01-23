import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { useNavigate } from "react-router-dom";
import { Globe, User } from "lucide-react";
import { Tickets } from "lucide-react";
import { Clock9, Check } from "lucide-react";
import { Ban } from "lucide-react";
import { format } from "date-fns";

export default function Activities() {
  const navigate = useNavigate();
  const [activityData, setActivityData] = useState([]);
  const [activityDataType, setActivityDataType] = useState([]);
  const [type, setType] = useState("");

  useEffect(() => {
    try {
      fetch(
        "https://agyademo.uber.space/api/activities/activ/activite",
        {}
      ).then((response) => {
        response.json().then((data) => {
          setActivityData(data.data);
        });
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    try {
      fetch(
        `https://agyademo.uber.space/api/activities/activities/${type}`,
        {}
      ).then((response) => {
        response.json().then((data) => {
          setActivityDataType(data.data);
        });
      });
    } catch (e) {
      console.log(e);
    }
  }, [type]);
  return (
    <div className=" flex justify-between">
      <Sidebar />

      <div className="flex-1 mx-[100px] py-8">
        <Navbar />
        <div className=" w-full py-8">
          <div className=" mb-8 flex justify-between items-center">
            <h1
              onClick={() => setType("")}
              className=" text-left font-bold text-3xl text-black"
            >
              All Activities
            </h1>
            <button
              className=" rounded-xl bg-main text-white py-3 w-64"
              onClick={() => navigate("/activities/pending-activities")}
            >
              Pending Activities
            </button>
          </div>
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
              onClick={() => setType("Event")}
              className={` rounded-xl duration-300 ${
                type === "Event"
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
          {type === "" ? (
            activityData === undefined ? (
              <div>loading</div>
            ) : (
              activityData.map((activity) => {
                return (
                  <div
                    key={activity?._id}
                    onClick={() => navigate(`/activities/${activity?._id}`)}
                    className="border border-[#2F150599] my-4 rounded-lg flex max-w-full bg-[#C5AD891A] relative shadow-md overflow-hidden "
                  >
                    <div className="relative">
                      <img
                        src={activity?.featuredImage}
                        alt="image"
                        className="w-[280px] bg-left h-[222px] object-cover"
                      />
                    </div>
                    <div className="p-4 relative">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {activity?.activityName}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 space-x-2 my-2">
                        <span>
                          {format(activity?.date, "P")} | {activity?.time}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 space-x-2 mb-2">
                        <Globe className="w-4 h-4 text-main size-20" />
                        <span>{activity?.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 space-x-2 mb-2">
                        <Tickets className="w-4 h-4 text-main" />
                        <span>{activity.price}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 space-x-2">
                        <User className="w-4 h-4 text-main" />
                        <span>{activity?.appliedNumber}</span>
                      </div>
                      <div className="flex mt-2 items-center text-sm text-gray-500 space-x-2">
                        {activity?.sponsors === undefined ||
                        activity.sponsors.length === 0 ? (
                          <div> no sponsors</div>
                        ) : (
                          activity?.sponsors.map((spons) => {
                            return (
                              <img
                                key={spons?.name}
                                src={spons?.logo}
                                alt=""
                                className="w-10"
                              />
                            );
                          })
                        )}
                      </div>

                      <button className=" translate-x-[450px]  w-fit   py-2 px-8 rounded-xl  bg-main text-white">
                        {" "}
                        Details
                      </button>
                      <div className=" -translate-y-52 translate-x-[450px] text-white top-4 -right-44 flex items-center gap-1">
                        {activity.status === "pending" ||
                        activity.status === "Pending" ? (
                          <>
                            <Clock9
                              fillOpacity={20}
                              className="text-yellow-600"
                            />
                            <p className=" text-yellow-600 text-lg">Pending</p>
                          </>
                        ) : activity.status === "rejected" ? (
                          <>
                            <Ban fillOpacity={20} className="text-[#F10F0F]" />
                            <p className=" text-[#F10F0F] text-lg">Rejected</p>
                          </>
                        ) : activity.status === "passed" ||
                          activity.status === "Passed" ? (
                          <>
                            <Check fill="#16a34a" fillOpacity={20} />{" "}
                            <p className=" text-green-600 text-lg">Approved</p>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })
            )
          ) : activityDataType === undefined ? (
            <div>loading</div>
          ) : (
            activityDataType.map((activity) => {
              return (
                <div
                  key={activity._id}
                  onClick={() => navigate(`/activities/${activity._id}`)}
                  className="border border-[#2F150599] my-4 rounded-lg flex max-w-full bg-[#C5AD891A] shadow-md overflow-hidden w-full"
                >
                  <div className="relative">
                    <img
                      src={activity.featuredImage}
                      alt="image"
                      className="w-[280px] bg-left h-[222px] object-cover "
                    />
                  </div>
                  <div className="p-4 relative">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {activity.activityName}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 space-x-2 my-2">
                      <span>
                        {format(activity?.date, "P")} | {activity.time}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 space-x-2 mb-2">
                      <Globe className="w-4 h-4 text-main size-20" />
                      <span>{activity.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 space-x-2 mb-2">
                      <Tickets className="w-4 h-4 text-main" />
                      <span>{activity.price}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 space-x-2">
                      <User className="w-4 h-4 text-main" />
                      <span>{activity?.appliedNumber}</span>
                    </div>
                    <div className="flex mt-2 items-center text-sm text-gray-500 space-x-2">
                      {activity?.sponsors === undefined ||
                      activity.sponsors.length === 0 ? (
                        <div> no sponsors</div>
                      ) : (
                        activity?.sponsors.map((spons) => {
                          return (
                            <img
                              key={spons?.name}
                              src={spons?.logo}
                              alt=""
                              className="w-10"
                            />
                          );
                        })
                      )}
                    </div>
                    <button className="translate-x-[450px] py-2 px-8 rounded-xl bg-main text-white">
                      {" "}
                      Details
                    </button>
                    <div className=" -translate-y-52 translate-x-[450px] text-white flex items-center gap-1">
                      {activity.status === "pending" ||
                      activity.status === "Pending" ? (
                        <>
                          <Clock9
                            fillOpacity={20}
                            className="text-yellow-600"
                          />
                          <p className=" text-yellow-600 text-lg">Pending</p>
                        </>
                      ) : activity.status === "rejected" ? (
                        <>
                          <Ban fillOpacity={20} className="text-[#F10F0F]" />{" "}
                          <p className=" text-[#F10F0F] text-lg">Rejected</p>
                        </>
                      ) : activity.status === "passed" ||
                        activity.status === "Passed" ? (
                        <>
                          <Check fill="#16a34a" fillOpacity={20} />{" "}
                          <p className=" text-green-600 text-lg">Approved</p>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
