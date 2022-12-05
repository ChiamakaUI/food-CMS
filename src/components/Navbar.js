import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="flex flex-row items-center justify-between w-[90%] mx-auto p-1.5">
      <img src="/logo.png" alt="logo" className="w-[150px]" />
      <div className="flex flex-row items-center">
        <FaUserCircle className="text-4xl mr-3" />
        <p className="font-gentium" >Admin</p>
      </div>
    </div>
  );
};

export default Navbar;
