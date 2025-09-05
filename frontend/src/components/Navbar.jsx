import React from 'react'
import { MdOutlineMenu } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Mobile Navbar */}
      <div className="flex w-full justify-between items-center py-4 md:hidden px-4">
        <MdOutlineMenu
          className="text-[32px] cursor-pointer"
          onClick={() => navigate("/menu")}
        />
        <img src={logo} alt="logo" className="w-12 h-12" />
        <FaRegCircleUser className="text-[30px] cursor-pointer" />
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-between items-center px-8 py-4 shadow-md">
        {/* Left: Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="logo" className="w-12 h-12" />
        </div>

        {/* Right: Nav Links + User */}
        <div className="flex items-center gap-8 text-lg font-medium">
          <span
            className="cursor-pointer hover:text-blue-500"
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <span
            className="cursor-pointer hover:text-blue-500"
            onClick={() => navigate("/scan")}
          >
            Scan
          </span>
          <FaRegCircleUser className="text-[30px] cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

export default Navbar;
