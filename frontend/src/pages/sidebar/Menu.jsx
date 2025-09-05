import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar';
import { FaHome } from "react-icons/fa";
import { BsQrCodeScan } from "react-icons/bs";
import { TbFileAnalytics } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";

function Menu() {

    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-5 min-h-screen bg-gradient-to-b from-blue-100 to-white px-6">
            <Navbar />
            <div>
                <div className='flex gap-1 items-center text-lg hover:bg-[#ECF3FE] px-4' onClick={() => navigate("/")}>
                    <FaHome />
                    <h2 className='p-2 font-medium'>Home</h2>
                </div>
                <div className='flex gap-1 items-center text-lg hover:bg-[#ECF3FE] px-4' onClick={() => navigate("/scan")}>
                    <BsQrCodeScan />
                    <h2 className='p-2 font-medium'>Scan</h2>
                </div>
                <div className='flex gap-1 items-center text-lg hover:bg-[#ECF3FE] px-4' onClick={() => navigate("/stock")}>
                    <TbFileAnalytics  />
                    <h2 className='p-2 font-medium'>Analytics</h2>
                </div>
                <div className='flex gap-1 items-center text-lg hover:bg-[#ECF3FE] px-4' onClick={() => navigate("/setting")}>
                    <IoMdSettings  />
                    <h2 className='p-2 font-medium'>Setting</h2>
                </div>
        

            </div>
        </div>
    )
}

export default Menu