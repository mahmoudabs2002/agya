import { useState, useEffect } from "react";

import { Globe, Tickets, User } from "lucide-react";
import { useParams } from "react-router-dom";
// import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import DOMPurify from "dompurify";

export default function ActiviteDetails() {
  const navigate = useNavigate();
  const [activityData, setActivityData] = useState();
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

  return (
    <div className=" flex justify-between">
      <Sidebar />
      <div className="flex-1 mx-[100px] py-8">
        <div>
          <span className=" pb-1 text-[#777]  border-b border-[#777]">
            Activities
          </span>{" "}
          <span className=" text-[#777]"> /</span>{" "}
          <span className=" pb-1 text-[#777]  border-b border-[#777]">
            {activityData?.activityName}
          </span>
        </div>
        <h3 className=" text-3xl font-bold text-center my-8">
          {activityData?.activityName}
        </h3>
        <div className=" flex justify-between gap-10 ">
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
            <div className=" flex gap-4 my-4">
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
        </div>
        {/* <div className=" flex justify-center items-center">
          <button
            className=" bg-main py-3 px-36 text-white rounded-xl  "
            onClick={() => navigate("/activities/:name/edit")}
          >
            Edit Details
          </button>
        </div> */}
      </div>
    </div>
  );
}
