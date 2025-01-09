import { useState, useEffect, useRef } from "react";

import { Globe, Tickets, User } from "lucide-react";
import { useParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import { format } from "date-fns";
import DOMPurify from "dompurify";

// import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
// import { useNavigate } from "react-router-dom";

export default function PendingActivitiesDetails() {
  // const navigate = useNavigate();
  const toastBC = useRef(null);

  const [activityData, setActivityData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [confirm, setConfirm] = useState("");
  const { id } = useParams();

  useEffect(() => {
    try {
      fetch(
        `https://agya-new-main-umye.vercel.app/api/activities/activitiy/${id}`,
        {}
      ).then((response) => {
        response.json().then((data) => {
          setActivityData(data.data);
        });
      });
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  const addActivity = async (e) => {
    // setPageLevelLoader(true);
    e.preventDefault();
    const response = await fetch(
      `https://agya-new-main-umye.vercel.app/api/activities/activities-updata/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "passed",
        }),
      }
    );
    const finalData = await response.json();
    if (finalData.success) {
      setConfirm("warn");
      setIsOpen(false);
      toastBC.current.show({
        severity: "success",
        summary: "the activity has approved",
        sticky: true,
      });
      setTimeout(() => {
        window.location.href = "/activities";
      }, 1000);
    } else {
      toastBC.current.show({
        severity: "error",
        summary: "something wrong",
        sticky: true,
      });
    }
  };
  const rejectedActivity = async (e) => {
    // setPageLevelLoader(true);
    e.preventDefault();
    const response = await fetch(
      `https://agya-new-main-umye.vercel.app/api/activities/activities-updata/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "rejected",
        }),
      }
    );
    const finalData = await response.json();
    if (finalData.success) {
      setConfirm("ban");
      setIsOpen(false);
      toastBC.current.show({
        severity: "success",
        summary: "the activity has rejected",
        sticky: true,
      });
      setTimeout(() => {
        window.location.href = "/activities";
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
    <>
      {confirm === "" ? null : confirm === "ban" ? (
        <div className=" z-[1000] fixed  bg-black/40 w-[1500px] h-[110vh] left-0 -top-[4px]  ">
          <div className=" bg-white rounded-2xl flex flex-col py-4 px-4 justify-center top-[30%] absolute left-[35%] items-center">
            <div
              onClick={() => setConfirm("")}
              className="my-2 w-fit cursor-pointer absolute right-4 top-4  bg-main rounded-full py-[4px] px-3 text-white"
            >
              X
            </div>
            <h3 className=" mt-16 mb-8 mx-14 text-3xl font-bold text-center">
              Activity Rejeted <br /> successfully
            </h3>
          </div>
        </div>
      ) : confirm === "warn" ? (
        <div className=" z-[1000] fixed  bg-black/40 w-[1500px] h-[110vh] left-0 -top-[4px]  ">
          <div className=" bg-white rounded-2xl flex flex-col py-16 px-5 justify-center top-[30%] absolute left-[30%] items-center">
            <div
              onClick={() => setConfirm("")}
              className="my-2 w-fit cursor-pointer absolute right-4 top-4  bg-main rounded-full py-[4px] px-3 text-white"
            >
              X
            </div>
            <h3 className=" mt-16 mb-8 mx-14 text-3xl font-bold text-center">
              Activity added successfully
            </h3>
          </div>
        </div>
      ) : null}
      {isOpen === true ? (
        <div className=" z-[1000] fixed  bg-black/40 w-[1500px] h-[110vh] left-0 -top-[4px]  ">
          <div className=" bg-white rounded-3xl flex flex-col py-4 px-20 justify-center top-[31%] absolute left-[31%] items-center">
            <div className=" relative  p-8">
              <div
                onClick={() => setIsOpen(false)}
                className="my-2 w-fit cursor-pointer text-right  absolute -right-10 -top-0 bg-main rounded-full py-[4px] px-3 text-white"
              >
                X
              </div>
              <h3 className=" text-2xl font-bold  absolute text-center mt-10 ml-[60px]">
                Reject this Activity
              </h3>
              <div className=" flex justify-center items-center ml-5 mt-16 gap-4">
                <button
                  className=" block  bg-main text-white py-2 px-10 my-8 rounded-xl "
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className=" block border-main border  py-2 px-14 my-4 rounded-xl "
                  onClick={rejectedActivity}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className=" flex justify-between">
        <Sidebar />
        <div className="flex-1 mx-[100px] py-8">
          <div>
            <span className=" pb-1 text-[#777]  border-b border-[#777]">
              Activities
            </span>{" "}
            <span className=" text-[#777]"> /</span>{" "}
            <span className=" pb-1 text-[#777]  border-b border-[#777]">
              Pending Activities
            </span>{" "}
            <span className=" text-[#777]"> /</span>{" "}
            <span className=" pb-1 text-[#777]  border-b border-[#777]">
              {activityData?.activityName}
            </span>
          </div>
          <h3 className=" text-3xl font-bold text-center my-8">
            {activityData?.activityName}
          </h3>
          <div className=" flex justify-between gap-16 ">
            <div>
              <img
                src={activityData?.featuredImage}
                className=" max-w-[500px]"
                alt=""
              />
              <div>
                <h3 className=" font-bold mb-6 mt-4">Activity Details</h3>
                <p className="text-[#010200]/70 mb-2">
                  {activityData === undefined
                    ? null
                    : format(activityData?.date, "P")}{" "}
                  | {activityData?.time}
                </p>

                <p className="text-[#010200]/70 mb-2">
                  {activityData?.organization}
                </p>
                <p className=" flex items-center text-[#010200]/70 mb-2">
                  <Globe className="w-4 h-4 text-main size-20 mr-1" />
                  {activityData?.location}
                </p>
                <p className=" flex items-center text-[#010200]/70 mb-2">
                  <Tickets className="w-4 h-4 text-main mr-1" />
                  {activityData?.price}
                </p>
                <p className=" flex items-center text-[#010200]/70 mb-2">
                  <User className="w-4 h-4 text-main mr-1" />
                  {activityData?.appliedNumber}
                </p>
              </div>
            </div>
            <div className="">
              <h3 className=" font-bold">About</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(activityData?.description || ""),
                }}
              />
              <h3 className=" font-bold my-4 ">Timeline and Activities</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(activityData?.timeline || ""),
                }}
              />
              <h3 className=" my-4 font-bold">Sponsors and Exhibitors</h3>
              {activityData?.sponsors === undefined ||
              activityData.sponsors.length === 0 ? (
                <div> no sponsors</div>
              ) : (
                activityData?.sponsors.map((spons) => {
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
          </div>
          <div className=" flex justify-center gap-8 items-center">
            <button
              className=" bg-secondary  py-3 px-36 text-main border border-main rounded-xl  "
              onClick={() => setIsOpen(true)}
            >
              Reject Event
            </button>
            <button
              className=" bg-main py-3 px-36 text-white rounded-xl  "
              onClick={addActivity}
            >
              Approve Event
            </button>
          </div>
        </div>
        <Toast ref={toastBC} position="top-right" />
      </div>
    </>
  );
}
