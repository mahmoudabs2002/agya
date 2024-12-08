// import React, { useState, useRef, useContext ,useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { useLocation } from 'react-router-dom';
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
const Sidebar = () => {
  let location = useLocation();
  return (
    <div className="flex flex-col max-h-fit w-64 text-main-font rounded-lg border border-gray-300 bg-white shadow">
      {/* Profile Section */}
      <div className="flex flex-col items-center py-8">
        <img src="/Temp Logo.png" alt="" className=" w-40 mb-4" />
        {/* Profile Image */}
        <img
          src="https://via.placeholder.com/80" // Replace with the actual image URL
          alt="Profile"
          className="w-20 h-20 rounded-full mb-4"
        />
        {/* Name */}
        <h2 className="text-lg font-semibold">Salma Nofal</h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col py-4 px-6">
        <div className="flex flex-col items-center space-y-6">
          <Link
            to="/overview"
            className="flex items-center text-sm font-medium hover:text-main w-40"
          >
            <span className="w-12 inline-flex justify-end">
              <LayoutDashboard className={`w-5 h-5 duration-300 ${location.pathname === "/overview" ? "text-main" : ""}`} />
            </span>
            <span className={`ml-4 duration-300 ${location.pathname === "/overview" ? "text-main" : ""} `}>Overview</span>
          </Link>
          <Link
            to="/users"
            className="flex items-center text-sm font-medium hover:text-main w-40"
          >
            <span className="w-12 inline-flex justify-end">
              <UsersRound className={`w-5 h-5 duration-300 ${location.pathname === "/users" ? "text-main" : ""}`} />
            </span>
            <span className={`ml-4 duration-300 ${location.pathname === "/users" ? "text-main" : ""} `}>Users</span>
          </Link>
          <Link
            to="/report"
            className="flex items-center text-sm font-medium hover:text-main w-40"
          >
            <span className="w-12 inline-flex justify-end">
              <MessageCircleWarning className={`w-5 h-5 duration-300 ${location.pathname === "/report" || location.pathname === "/report/post" || location.pathname === "/report/comment" ? "text-main" : ""}`}/>
            </span>
            <span className={`ml-4 duration-300 ${location.pathname === "/report" || location.pathname === "/report/post" || location.pathname === "/report/comment" ? "text-main" : ""} `}>Reports</span>
          </Link>
          <Link
            to="/article"
            className="flex items-center text-sm font-medium hover:text-main w-40"
          >
            <span className="w-12 inline-flex justify-end">
              <Newspaper className={`w-5 h-5 duration-300 ${location.pathname === "/article" ? "text-main" : ""}`}/>
            </span>
            <span className={`ml-4 duration-300 ${location.pathname === "/article" ? "text-main" : ""} `}>Article</span>
          </Link>
          <Link
            to="/gallery"
            className="flex items-center text-sm font-medium hover:text-main w-40"
          >
            <span className="w-12 inline-flex justify-end">
              <Tag  className={`w-5 h-5 duration-300 ${location.pathname === "/gallery" ? "text-main" : ""}`}/>
            </span>
            <span className={`ml-4 duration-300 ${location.pathname === "/gallery" ? "text-main" : ""} `}>Tags</span>
          </Link>
          <Link
            to="/help"
            className="flex items-center text-sm font-medium hover:text-main w-40"
          >
            <span className="w-12 inline-flex justify-end">
              <Calendar className={`w-5 h-5 duration-300 ${location.pathname === "/help" ? "text-main" : ""}`}/>
            </span>
            <span className={`ml-4 duration-300 ${location.pathname === "/help" ? "text-main" : ""} `}>Activities</span>
          </Link>

          {/* Profile Button */}
          <Link
            to="/profile"
            className="flex items-center text-sm font-medium hover:text-main w-40"
          >
            <span className="w-12 inline-flex justify-end">
              <Mail className={`w-5 h-5 duration-300 ${location.pathname === "/profile" ? "text-main" : ""}`}/>
            </span>
            <span className={`ml-4 duration-300 ${location.pathname === "/profile" ? "text-main" : ""} `}>Messages</span>
          </Link>
          <Link
            to="/profile"
            className="flex items-center text-sm font-medium hover:text-main w-40"
          >
            <span className="w-12 inline-flex justify-end">
              <User className={`w-5 h-5 duration-300 ${location.pathname === "/profile" ? "text-main" : ""}`}/>
            </span>
            <span className={`ml-4 duration-300 ${location.pathname === "/profile" ? "text-main" : ""} `}>Admins</span>
          </Link>
        </div>

        {/* Logout Button */}
        <div
          
          className="flex items-center text-sm font-medium duration-300 cursor-pointer hover:text-main w-40 mx-auto mt-12"
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
    </div>
  );
};

export default Sidebar;
