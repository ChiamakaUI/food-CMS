import React from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import { MdCategory } from "react-icons/md";
import { FcGallery } from "react-icons/fc";

const MainLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen	bg-slate-50 overflow-hidden">
      <Navbar />
      <div className="flex flex-row w-full h-[95%] ">
        <div className="w-[15%] p-6 ">
          <Link to="/">
            <div className="flex flex-row items-center my-3">
              <AiFillDashboard className="text-2xl mr-2.5"/>
              <p className="font-gentium text-xl">Dashboard</p>
            </div>
          </Link>
          <Link to="/categories">
            <div className="flex flex-row items-center my-3">
              <MdCategory className="text-2xl mr-2.5"/>
              <p className="font-gentium text-xl">Categories</p>
            </div>
          </Link>
          <Link to="/products">
            <div className="flex flex-row items-center my-3">
              <FcGallery className="text-2xl mr-2.5"/>
              <p className="font-gentium text-xl">Products</p>
            </div>
          </Link>
        </div>
        <div className="w-[85%] bg-[#F5F6FA] border">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
