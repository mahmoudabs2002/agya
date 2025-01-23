// import Navbar from "../components/navbar";
import { useEffect, useRef, useState } from "react";
import Sidebar from "../components/sidebar";
// import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import { Toast } from "primereact/toast";

export default function ReportDetailsPost() {
  const [isOpen, setIsOpen] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [postData, setPostData] = useState();
  const search = useLocation().search;
  const idItem = new URLSearchParams(search).get("id");
  const toastBC = useRef(null);

  const { id } = useParams();
  const { content } = useParams();
  // const navigate = useNavigate();

  useEffect(() => {
    try {
      fetch(`https://agyademo.uber.space/api/posts/posts/admin/${id}`, {}).then(
        (response) => {
          response.json().then((data) => {
            setPostData(data);
          });
        }
      );
    } catch (e) {
      console.log(e);
    }
  }, [id]);

  const noAction = async (e) => {
    // setPageLevelLoader(true);
    e.preventDefault();
    const response = await fetch(
      `https://agyademo.uber.space/api/reports/reports/${idItem}/read`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const finalData = await response.json();
    if (finalData.success) {
      toastBC.current.show({
        severity: "success",
        summary: " report has updated succesfully",
        sticky: true,
      });
      window.location.href = "/report";
    } else {
      toastBC.current.show({
        severity: "success",
        summary: "report has updated succesfully",
        sticky: true,
      });
      setTimeout(() => {
        window.location.href = "/report";
      }, 500);
    }
  };
  const ban = async (e) => {
    // setPageLevelLoader(true);
    e.preventDefault();
    const response = await fetch(
      `https://agyademo.uber.space/api/auth/update-user/${postData.userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "ban",
        }),
      }
    );
    const finalData = await response.json();
    if (finalData.success) {
      const response = await fetch(
        `https://agyademo.uber.space/api/notifications/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: postData.userId,
            content: "ban",
            category: "ban",
          }),
        }
      );
      const finalData = await response.json();
      if (finalData.success) {
        toastBC.current.show({
          severity: "success",
          summary: " report has updated succesfully",
          sticky: true,
        });
        setIsOpen(false);
        setConfirm("ban");
      } else {
        toastBC.current.show({
          severity: "success",
          summary: " report has updated succesfully",
          sticky: true,
        });

        const response = await fetch(
          `https://agyademo.uber.space/api/reports/reports/${idItem}/read`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        await response.json();
        setIsOpen(false);
        setConfirm("ban");
        setTimeout(() => {
          window.location.href = "/report";
        }, 500);
      }
    }
  };
  const warn = async (e) => {
    // setPageLevelLoader(true);
    e.preventDefault();
    const response = await fetch(
      `https://agyademo.uber.space/api/auth/update-user/${postData.userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "warned",
        }),
      }
    );
    const finalData = await response.json();
    if (finalData.success) {
      const response = await fetch(
        `https://agyademo.uber.space/api/notifications/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: postData.userId,
            content: "warn",
            category: "warn",
          }),
        }
      );
      const finalData = await response.json();
      if (finalData.success) {
        toastBC.current.show({
          severity: "success",
          summary: " report has updated succesfully",
          sticky: true,
        });
        setIsOpen(false);
        setConfirm("warn");
      } else {
        toastBC.current.show({
          severity: "success",
          summary: " report has updated succesfully",
          sticky: true,
        });
        const response = await fetch(
          `https://agyademo.uber.space/api/reports/reports/${idItem}/read`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        await response.json();
        setIsOpen(false);
        setConfirm("warn");
      }
    }
  };
  return (
    <>
      {confirm === "" ? null : confirm === "ban" ? (
        <div className=" z-[1000] fixed  bg-black/40 w-[1500px] h-[110vh] middle  ">
          <div className=" bg-white rounded-2xl flex flex-col py-4 px-4 justify-center middle absolute items-center">
            <div
              onClick={() => setConfirm("")}
              className="my-2 w-fit cursor-pointer absolute right-4 top-4  bg-main rounded-full py-[4px] px-3 text-white"
            >
              X
            </div>
            <h3 className=" mt-16 mb-8 mx-14 text-3xl font-bold text-center">
              a ban has been send to this user
            </h3>
          </div>
        </div>
      ) : confirm === "warn" ? (
        <div className=" z-[1000] fixed  bg-black/40 w-[1500px] h-[110vh] middle">
          <div className=" bg-white rounded-2xl flex flex-col py-5 px-5 justify-center middle absolute items-center">
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
        <div className=" z-[1000] fixed  bg-black/40 w-[1500px] h-[110vh] middle  ">
          <div className=" bg-white rounded-3xl flex flex-col py-5 px-5 justify-center middle absolute items-center">
            <div className=" relative  p-4">
              <div
                onClick={() => setIsOpen(false)}
                className="my-2 w-fit cursor-pointer text-right float-right bg-main rounded-full py-[4px] px-3 text-white"
              >
                X
              </div>
              <form
                onSubmit={ban}
                className=" flex justify-center items-center ml-5 mt-10 gap-4"
              >
                <button
                  className=" block  bg-main text-white py-2 px-8 my-8 rounded-xl "
                  onClick={() => {}}
                >
                  Ban for 3 days
                </button>
                <button
                  className=" block border-main border  py-2 px-8 my-4 rounded-xl "
                  onClick={() => {}}
                >
                  Ban for 7 days
                </button>
              </form>
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
                {content}
              </h3>
            </div>
            <div className="border rounded-xl  py-8 px-8 mt-4 ">
              <div className="flex justify-between items-start mb-6  ">
                <div className="flex items-center">
                  <img
                    className="w-12 h-12 rounded-full mr-4"
                    src="/avatar.jpeg" // Replace with actual avatar
                    alt="Author"
                  />
                  <div>
                    <p className="text-lg font-semibold">
                      {postData?.authorName}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-DateTime text-sm">
                    {postData === undefined
                      ? null
                      : format(postData?.createdAt, "P")}{" "}
                    •{" "}
                    {postData === undefined
                      ? null
                      : format(postData?.createdAt, "p")}
                  </p>
                </div>
              </div>
              <div className=" w-[800px] ml-16">{postData?.content}</div>
            </div>
            <div className=" flex justify-center items-center gap-4 mt-6">
              <form action="" onSubmit={warn}>
                <button className=" border-main border py-2 w-36 rounded-xl">
                  warn
                </button>
              </form>
              <button
                onClick={() => setIsOpen(true)}
                className=" border-main border py-2 w-36 text-main rounded-xl"
              >
                ban
              </button>
              <form onSubmit={noAction}>
                <button className=" border-main border py-2 w-36 bg-main text-white  rounded-xl">
                  take no action
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toast ref={toastBC} position="top-right" />
    </>
  );
}
