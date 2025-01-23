// import React, { useState, useRef, useContext ,useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { useLocation } from "react-router-dom";
import {
  UsersRound,
  Calendar,
  LogOut,
  User,
  LayoutDashboard,
  MessageCircleWarning,
  Newspaper,
  Tag,
  Mail,
} from "lucide-react";
import { GlobalContext } from "../context/GlobelContext";
import { useContext, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
const Sidebar = () => {
  const { setIsAuthUser, isAuthUser } = useContext(GlobalContext);
  const toastBC = useRef(null);

  useEffect(() => {
    setIsAuthUser(JSON.parse(localStorage.getItem("userInfo")));
  }, [setIsAuthUser]);

  const logout = async () => {
    fetch("https://agyademo.uber.space/api/auth/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      localStorage.removeItem("userInfo");
      toastBC.current.show({
        severity: "success",
        summary: "logout succesfully",
        sticky: true,
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
      setIsAuthUser(null);
    });
  };
  let location = useLocation();
  const name = isAuthUser?.firstname;
  const updatename = isAuthUser?.user?.firstname;

  return (
    <div className="flex flex-col max-h-fit max-w-64 min-w-64 text-main-font rounded-lg border border-gray-300 bg-[#C5AD891A] shadow">
      {/* Profile Section */}
      <div className="flex flex-col items-center py-8">
        <img src="/Logo.png" alt="" className=" w-36 mb-4" />
        {/* Profile Image */}
        <img
          src={
            isAuthUser?.image === undefined
              ? isAuthUser?.user?.image
              : isAuthUser?.image
          } // Replace with the actual image URL
          alt="Profile"
          className="w-20 h-20 rounded-full mb-4"
        />
        {/* Name */}
        <h2 className="text-lg font-semibold">
          {name === undefined ? updatename : name}
        </h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col py-4 px-6">
        <div className="flex flex-col items-center space-y-6">
          <Link
            to="/overview"
            className="flex items-center text-sm font-medium hover:text-main w-40"
          >
            <span className="w-12 inline-flex justify-end">
              <LayoutDashboard
                className={`w-5 h-5 duration-300 ${
                  location.pathname === "/overview" ? "text-main" : ""
                }`}
              />
            </span>
            <span
              className={`ml-4 duration-300 ${
                location.pathname === "/overview" ? "text-main" : ""
              } `}
            >
              Overview
            </span>
          </Link>
          <Link
            to="/users"
            className="flex items-center text-sm font-medium hover:text-main w-40"
          >
            <span className="w-12 inline-flex justify-end">
              <UsersRound
                className={`w-5 h-5 duration-300 ${
                  location.pathname === "/users" ? "text-main" : ""
                }`}
              />
            </span>
            <span
              className={`ml-4 duration-300 ${
                location.pathname === "/users" ? "text-main" : ""
              } `}
            >
              Users
            </span>
          </Link>
          <Link
            to="/report"
            className="flex items-center text-sm font-medium hover:text-main w-40"
          >
            <span className="w-12 inline-flex justify-end">
              <MessageCircleWarning
                className={`w-5 h-5 duration-300 ${
                  location.pathname === "/report" ||
                  location.pathname === "/report/post" ||
                  location.pathname === "/report/comment"
                    ? "text-main"
                    : ""
                }`}
              />
            </span>
            <span
              className={`ml-4 duration-300 ${
                location.pathname === "/report" ||
                location.pathname === "/report/post" ||
                location.pathname === "/report/comment"
                  ? "text-main"
                  : ""
              } `}
            >
              Reports
            </span>
          </Link>
          <Link
            to="/article"
            className="flex items-center text-sm font-medium hover:text-main w-40"
          >
            <span className="w-12 inline-flex justify-end">
              <Newspaper
                className={`w-5 h-5 duration-300 ${
                  location.pathname === "/article" ||
                  location.pathname === "/article/featured-articles"
                    ? "text-main"
                    : ""
                }`}
              />
            </span>
            <span
              className={`ml-4 duration-300 ${
                location.pathname === "/article" ||
                location.pathname === "/article/featured-articles"
                  ? "text-main"
                  : ""
              } `}
            >
              Article
            </span>
          </Link>
          <Link
            to="/tags"
            className="flex items-center text-sm font-medium hover:text-main w-40"
          >
            <span className="w-12 inline-flex justify-end">
              <Tag
                className={`w-5 h-5 duration-300 ${
                  location.pathname === "/tags" ? "text-main" : ""
                }`}
              />
            </span>
            <span
              className={`ml-4 duration-300 ${
                location.pathname === "/tags" ? "text-main" : ""
              } `}
            >
              Tags
            </span>
          </Link>
          <Link
            to="/activities"
            className="flex items-center text-sm font-medium hover:text-main w-40"
          >
            <span className="w-12 inline-flex justify-end">
              <Calendar
                className={`w-5 h-5 duration-300 ${
                  location.pathname === "/activities" ? "text-main" : ""
                }`}
              />
            </span>
            <span
              className={`ml-4 duration-300 ${
                location.pathname === "/activities" ? "text-main" : ""
              } `}
            >
              Activities
            </span>
          </Link>

          {/* Profile Button */}
          <Link
            to="/messages"
            className="flex items-center text-sm font-medium hover:text-main w-40"
          >
            <span className="w-12 inline-flex justify-end">
              <Mail
                className={`w-5 h-5 duration-300 ${
                  location.pathname === "/messages" ? "text-main" : ""
                }`}
              />
            </span>
            <span
              className={`ml-4 duration-300 ${
                location.pathname === "/messages" ? "text-main" : ""
              } `}
            >
              Messages
            </span>
          </Link>
          <Link
            to="/admin"
            className="flex items-center text-sm font-medium hover:text-main w-40"
          >
            <span className="w-12 inline-flex justify-end">
              <User
                className={`w-5 h-5 duration-300 ${
                  location.pathname === "/admin" ? "text-main" : ""
                }`}
              />
            </span>
            <span
              className={`ml-4 duration-300 ${
                location.pathname === "/admin" ? "text-main" : ""
              } `}
            >
              Admins
            </span>
          </Link>
        </div>

        {/* Logout Button */}
        <div
          className="flex items-center text-sm font-medium duration-300 cursor-pointer hover:text-main w-40 mx-auto mt-12"
          onClick={logout}
        >
          <span className="w-12 inline-flex justify-end">
            <LogOut className="w-5 h-5" />
          </span>
          <span className="ml-4">Log out</span>
        </div>
      </nav>

      {/* Footer Section */}
      <div className="mt-auto px-4 py-6 text-xs text-gray-400">
        <div className="w-3/4 mx-auto border-t border-gray-200">
          <p className="text-center mt-4 mb-2">
            <a href="#" className="hover:text-main">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="#" className="hover:text-main">
              Content Policy
            </a>{" "}
            |{" "}
            <a href="#" className="hover:text-main">
              Terms of Use
            </a>
          </p>
          <p className="text-center">
            Designed and Developed by: <strong>ABS.AI</strong>
          </p>
          <p className="text-center pb-4">All Rights Reserved ©2024 Agya.com</p>
        </div>
      </div>
      <Toast ref={toastBC} position="top-right" />
    </div>
  );
};

export default Sidebar;
