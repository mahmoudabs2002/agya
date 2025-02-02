// import Navbar from "../components/navbar";
import { useEffect, useRef, useState } from "react";
import Sidebar from "../components/sidebar";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { format } from "date-fns";
// import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { useLocation } from "react-router-dom";

export default function ReportDetailsArticle() {
  const [isOpen, setIsOpen] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [articleData, setArticleData] = useState();
  // const navigate = useNavigate();
  const search = useLocation().search;
  const idItem = new URLSearchParams(search).get("id");

  const toastBC = useRef(null);

  const { id } = useParams();
  const { content } = useParams();

  useEffect(() => {
    try {
      fetch(`https://agyademo.uber.space/api/articles/${id}`, {}).then(
        (response) => {
          response.json().then((data) => {
            setArticleData(data);
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
      setTimeout(() => {
        window.location.href = "/report";
      }, 500);
    } else {
      toastBC.current.show({
        severity: "success",
        summary: " report has updated succesfully",
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
      `https://agyademo.uber.space/api/auth/update-user/${articleData.authorId._id}`,
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
            userId: articleData.authorId._id,
            content: `After careful review of the article, “${articleData?.title}” you shared, we've determined that the article contained misleading information and have taken steps to remove it from our platform.We understand the importance of accurate and reliable information, and we're committed to maintaining high quality standards on our platform.`,
            category: "Article Reported",
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
      }
    }
  };
  const warn = async (e) => {
    // setPageLevelLoader(true);
    e.preventDefault();
    const response = await fetch(
      `https://agyademo.uber.space/api/auth/update-user/${articleData.authorId._id}`,
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
            userId: articleData.authorId._id,
            content: `After careful review of the article, “${articleData?.title}” you shared, we've determined that the article contained misleading information and have taken steps to remove it from our platform.We understand the importance of accurate and reliable information, and we're committed to maintaining high quality standards on our platform.`,
            category: "Article Reported",
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
        <div className="flex-1 ml-80 mx-[100px] py-8">
          <div className="text-center ">
            <h3>
              <span className=" text-main text-xl font-bold">
                Report Cause:
              </span>{" "}
              {content}
            </h3>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center">
                <img
                  className="w-12 h-12 rounded-full mr-4"
                  src="/avatar.jpeg" // Replace with actual avatar
                  alt="Author"
                />
                <div>
                  <p className="text-lg font-semibold">
                    {articleData?.authorName}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-DateTime text-sm">
                  {articleData === undefined
                    ? null
                    : format(articleData?.createdAt, "P")}{" "}
                  •{" "}
                  {articleData === undefined
                    ? null
                    : format(articleData?.createdAt, "p")}
                </p>
              </div>
            </div>

            {/* Title */}
            <div
              className=" mb-4"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(articleData?.title || ""),
              }}
            ></div>
            <div
              className=" mb-4"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(articleData?.content || ""),
              }}
            ></div>
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
