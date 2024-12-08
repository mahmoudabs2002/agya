// import Navbar from "../components/navbar";
import { useState } from "react";
import Sidebar from "../components/sidebar";

export default function ReportDetailsComment() {
  const [isOpen, setIsOpen] = useState(false);
  const [confirm, setConfirm] = useState("");

  return (
    <>
      {confirm === "" ? null : confirm === "ban" ? (
        <div className=" z-[1000] fixed  bg-black/40 w-[1500px] h-[110vh] left-0 -top-[4px]  ">
          <div className=" bg-white rounded-2xl flex flex-col py-4 px-4 justify-center top-[25%] absolute left-[38%] items-center">
            <div
              onClick={() => setConfirm("")}
              className="my-2 w-fit cursor-pointer absolute right-4 top-4  bg-main rounded-full py-[4px] px-3 text-white"
            >
              X
            </div>
            <h3 className=" mt-16 mb-8 mx-14 text-3xl font-bold text-center">
              A Ban has been sent <br /> to this user
            </h3>
          </div>
        </div>
      ) : confirm === "warn" ? (
        <div className=" z-[1000] fixed  bg-black/40 w-[1500px] h-[110vh] left-0 -top-[4px]  ">
          <div className=" bg-white rounded-2xl flex flex-col py-5 px-5 justify-center top-[25%] absolute left-[35%] items-center">
            <div
              onClick={() => setConfirm("")}
              className="my-2 w-fit cursor-pointer absolute right-4 top-4  bg-main rounded-full py-[4px] px-3 text-white"
            >
              X
            </div>
            <h3 className=" mt-16 mb-8 mx-14 text-3xl font-bold text-center">
              A warning has been sent <br /> to this user
            </h3>
          </div>
        </div>
      ) : null}
      {isOpen === true ? (
        <div className=" z-[1000] fixed  bg-black/40 w-[1500px] h-[110vh] left-0 -top-[4px]  ">
          <div className=" bg-white rounded-3xl flex flex-col py-4 px-4 justify-center top-[25%] absolute left-[38%] items-center">
            <div className=" relative  p-4">
              <div
                onClick={() => setIsOpen(false)}
                className="my-2 w-fit cursor-pointer text-right float-right bg-main rounded-full py-[4px] px-3 text-white"
              >
                X
              </div>
              <div className=" flex justify-center items-center ml-5 mt-10 gap-4">
                <button
                  className=" block  bg-main text-white py-2 px-8 my-8 rounded-xl "
                  onClick={() => {
                    setConfirm("ban"), setIsOpen(false);
                  }}
                >
                  Ban for 3 days
                </button>
                <button
                  className=" block border-main border  py-2 px-8 my-4 rounded-xl "
                  onClick={() => {
                    setConfirm("ban"), setIsOpen(false);
                  }}
                >
                  Ban for 7 days
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
            <div className=" text-center">
              <h3>
                <span className=" text-main text-xl font-bold">
                  Report Cause:
                </span>{" "}
                Inappropriate content that violates community guidelines
              </h3>
            </div>
            <div className="border rounded-t-xl  py-8 px-8 mt-4 ">
              <div className="flex justify-between items-start mb-6  ">
                <div className="flex items-center">
                  <img
                    className="w-12 h-12 rounded-full mr-4"
                    src="/avatar.jpeg" // Replace with actual avatar
                    alt="Author"
                  />
                  <div>
                    <p className="text-lg font-semibold">John Snow</p>
                  </div>
                </div>
                <div>
                  <p className="text-DateTime text-sm">1d • 8:30 AM</p>
                </div>
              </div>
              <div className=" w-[800px] ml-16">
                Recent archaeological findings have unveiled the hidden
                craftsmanship of Scandinavia’s Bronze Age boatyards. These
                ancient sites, once overlooked, reveal the sophisticated
                techniques used by early boat builders. Dive into the past and
                explore how these remarkable discoveries shed light on our
                maritime heritage.
              </div>
            </div>
            <div className="border bg-main/10 border-main/40 rounded-b-xl  py-8 px-8">
              <div className="flex justify-between items-start mb-6  ">
                <div className="flex items-center">
                  <img
                    className="w-12 h-12 rounded-full mr-4"
                    src="/avatar.jpeg" // Replace with actual avatar
                    alt="Author"
                  />
                  <div>
                    <p className="text-lg font-semibold">Fatma Bahaa</p>
                  </div>
                </div>
                <div>
                  <p className="text-DateTime text-sm">2 Hours ago</p>
                </div>
              </div>
              <div className=" w-[800px] ml-16">
                The Soii Havzak excavation reveals fascinating insights into
                early human life and artistic expression in Central Asia!
              </div>
            </div>
            <div className=" flex justify-center items-center gap-4 mt-6">
              <button
                onClick={() => setConfirm("warn")}
                className=" border-main border py-2 w-36 rounded-xl"
              >
                warn
              </button>
              <button
                onClick={() => setIsOpen(true)}
                className=" border-main border py-2 w-36 text-main rounded-xl"
              >
                ban
              </button>
              <button className=" border-main border py-2 w-36 bg-main text-white  rounded-xl">
                take no action
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
