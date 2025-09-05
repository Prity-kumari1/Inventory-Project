import React from 'react'
import { useNavigate } from "react-router-dom";
import { BsQrCodeScan } from "react-icons/bs";
import { FaCamera } from "react-icons/fa";
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';
function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-white">
            <Navbar />

            {/* Responsive Layout */}
            <div className="flex flex-col md:flex-row gap-5 px-6 lg:px-10 py-6">

                {/* Left Side (Cards)*/}
                <div className="h-[80vh]  flex flex-col gap-5 md:w-[25%]">
                    <h1 className='text-[22px] font-bold'>Scan QR Code</h1>
                    <div className='w-full mt-9 p-[24px] flex flex-col gap-[16px] justify-center items-center'>
                        <div className='p-[24px] bg-[#EAEAEA] rounded-xl '>
                            <BsQrCodeScan className='text-[100px] text-[#C9CBD0]' onClick={() => navigate("/scanner")} />
                        </div>
                        <div className='text-center'>
                            <h2 className='text-[24px] font-[700]'>Ready To scan</h2>
                            <p className='text-[14px] font-[400]'>Tap the button below to start scanning</p>
                        </div>
                        <Button onClick={() => navigate("/scanner")} className='flex gap-2 justify-center items-center'> Scan <FaCamera /> </Button>

                    </div>


                </div>

                {/* Right Side (Analytics Table Placeholder) */}
                <div className="hidden md:flex md:w-[75%] justify-center items-center border border-dashed border-gray-300 rounded-lg">
                    <h2 className="text-2xl font-bold text-gray-500"> Analytics Table</h2>
                </div>
            </div>
        </div>
    );
}

export default Home;
