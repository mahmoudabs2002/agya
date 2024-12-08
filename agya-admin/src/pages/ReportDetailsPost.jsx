// import Navbar from "../components/navbar";
import { useState } from "react";
import Sidebar from "../components/sidebar";

export default function ReportDetailsPost() {
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
            <h3 className=" mt-16 mb-8 mx-14 text-3xl font-bold text-center">A Ban has been sent <br /> to this user</h3>
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
            <h3 className=" mt-16 mb-8 mx-14 text-3xl font-bold text-center">A warning has been sent <br /> to this user</h3>
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
          <div className="text-center ">
            <h3>
              <span className=" text-main text-xl font-bold">
                Report Cause:
              </span>{" "}
              Not a related content
            </h3>
            <div className="flex justify-between items-start mb-6">
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

            {/* Title */}
            <h1 className="text-4xl font-bold text-center mb-6">
              “Major Paleolithic Site Excavated in Central Asia”
            </h1>

            {/* Main Image */}
            <div className="mb-6">
              <img
                className="w-full h-96 object-cover rounded-lg"
                src="/Frame20.png" // Replace with actual image
                alt="Paleolithic site"
              />
            </div>

            {/* Article Content */}
            <div className="space-y-4 text-gray-800">
              <p>
                Archaeologists have recently excavated a significant Paleolithic
                site in the Zeravshan Valley, Tajikistan, known as the Soii
                Havzak rock shelter. This site, previously thought to be
                sparsely inhabited during the Paleolithic era, has revealed
                multiple layers of human occupation dating from 150,000 to
                20,000 years ago.The findings include bones, stone tools, and
                charcoal, suggesting that Neanderthals, Denisovans, and modern
                humans may have all used this shelter during their
                migrations12.This discovery provides valuable insights into
                early human history and migration patterns in Central Asia3.
              </p>
            </div>
            <div className="mb-6">
              <img
                className="w-full h-96 object-cover rounded-lg"
                src="/Frame20.png" // Replace with actual image
                alt="Paleolithic site"
              />
            </div>
            <div className="space-y-4 text-gray-800">
              <p>
                The Soii Havzak rock shelter’s excavation has also uncovered a
                variety of artifacts that shed light on the technological
                advancements of early humans in Central Asia. Among the
                discoveries are finely crafted stone tools, including blades and
                scrapers, which indicate a high level of skill and adaptation to
                the environment. Additionally, the presence of animal bones with
                cut marks suggests that the inhabitants practiced hunting and
                butchering, providing further evidence of their survival
                strategies. These findings not only enhance our understanding of
                human evolution but also highlight the region’s importance as a
                crossroads for ancient human populations.{" "}
              </p>
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
