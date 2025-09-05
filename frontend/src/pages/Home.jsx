// import React from 'react'
// import { useNavigate } from "react-router-dom";

// import { FiPackage } from "react-icons/fi";
// import { HiOutlineDocumentReport } from "react-icons/hi";
// import { BsQrCodeScan } from "react-icons/bs";
// import Navbar from '../components/Navbar';
// function Home() {
//     const navigate = useNavigate();

//     return (
//         <div className="flex flex-col gap-5 min-h-screen bg-gradient-to-b from-blue-100 to-white px-6 lg:px-0">

//             <Navbar />
//             <div className='flex flex-col gap-5'>
//                 <div className="flex justify-between">
//                     <div className='w-[150px] h-[80px] border-[1px] style={{ boxShadow: "0px 4px 6px rgba(136, 136, 136, 0.12)" }} rounded-[12px] flex flex-col justify-center items-center '>
//                         <h3 className='font-semibold text-[22px]'>1,273</h3>
//                         <p className='font-semibold text-[12px] text-[#1EA34E]'>Available</p>
//                     </div>
//                     <div className='w-[150px] h-[80px] border-[1px] style={{ boxShadow: "0px 4px 6px rgba(136, 136, 136, 0.12)" }} rounded-[12px] flex flex-col justify-center items-center '>
//                         <h3 className='font-semibold text-[22px]'>8</h3>
//                         <p className='font-semibold text-[12px] text-[#F5A114]'>Available</p>
//                     </div>
//                 </div>
//                 <div className='w-full border-2 border-[#EAEAEA] p-[24px]' onClick={()=> navigate("/stock")}>
//                     <p className='p-[8px] bg-[#53C0B51A] inline-block rounded-[8px]' ><FiPackage className='text-[#53C0B5] text-[24px]' /></p>
//                     <p className='text-[14px] font-[400]'>Current Inventory stock levels</p>
//                     <h2 className='text-[24px] font-[700]'>1,273 Avaliable</h2>

//                 </div>
//                 <div className='w-full  bg-gradient-to-r from-[#3778E0] to-[#6BA1F8] border-2 text-[#fff] border-[#EAEAEA] p-[24px]' onClick={() => navigate("/scan")}>
//                     <p className='p-[8px] bg-[#53C0B51A] inline-block rounded-[8px]' ><BsQrCodeScan className=' text-[24px]' /></p>
//                     <p className='text-[14px] font-[400] '>Scan In/Out</p>
//                     <h2 className='text-[24px] font-[700]' >Tap To Scan</h2>

//                 </div>
//                 <div className='w-full bg-gradient-to-r from-[#F0F6F8] to-[#CCDFE7] border-2 border-[#EAEAEA] p-[24px]'>
//                     <p className='p-[8px] bg-[#53C0B51A] inline-block rounded-[8px]' ><HiOutlineDocumentReport
//                         className='text-[#53C0B5] text-[24px]' /></p>
//                     <p className='text-[14px] font-[400]'>Recent Transactions </p>
//                     <h2 className='text-[24px] font-[700]'>Analytics & Reports</h2>

//                 </div>


//             </div>

//         </div>
//     );
// }

// export default Home

import React from 'react'
import { useNavigate } from "react-router-dom";

import { FiPackage } from "react-icons/fi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { BsQrCodeScan } from "react-icons/bs";
import Navbar from '../components/Navbar';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <Navbar />

      {/* Responsive Layout */}
      <div className="flex flex-col md:flex-row gap-5 px-6 lg:px-10 py-6">
        
        {/* Left Side */}
        <div className="flex flex-col gap-5 md:w-[25%]">
          <div className="flex justify-between">
            <div className='w-[150px] h-[80px] border border-gray-200 shadow-sm rounded-[12px] flex flex-col justify-center items-center'>
              <h3 className='font-semibold text-[22px]'>1,273</h3>
              <p className='font-semibold text-[12px] text-[#1EA34E]'>Available</p>
            </div>
            <div className='w-[150px] h-[80px] border border-gray-200 shadow-sm rounded-[12px] flex flex-col justify-center items-center'>
              <h3 className='font-semibold text-[22px]'>8</h3>
              <p className='font-semibold text-[12px] text-[#F5A114]'>Available</p>
            </div>
          </div>

          <div className='w-full border-2 border-[#EAEAEA] p-[24px] cursor-pointer' onClick={() => navigate("/stock")}>
            <p className='p-[8px] bg-[#53C0B51A] inline-block rounded-[8px]'><FiPackage className='text-[#53C0B5] text-[24px]' /></p>
            <p className='text-[14px] font-[400]'>Current Inventory stock levels</p>
            <h2 className='text-[24px] font-[700]'>1,273 Available</h2>
          </div>

          <div className='w-full bg-gradient-to-r from-[#3778E0] to-[#6BA1F8] border-2 text-[#fff] border-[#EAEAEA] p-[24px] cursor-pointer' onClick={() => navigate("/scan")}>
            <p className='p-[8px] bg-[#53C0B51A] inline-block rounded-[8px]'><BsQrCodeScan className=' text-[24px]' /></p>
            <p className='text-[14px] font-[400] '>Scan In/Out</p>
            <h2 className='text-[24px] font-[700]'>Tap To Scan</h2>
          </div>

          <div className='w-full bg-gradient-to-r from-[#F0F6F8] to-[#CCDFE7] border-2 border-[#EAEAEA] p-[24px]'>
            <p className='p-[8px] bg-[#53C0B51A] inline-block rounded-[8px]'><HiOutlineDocumentReport className='text-[#53C0B5] text-[24px]' /></p>
            <p className='text-[14px] font-[400]'>Recent Transactions </p>
            <h2 className='text-[24px] font-[700]'>Analytics & Reports</h2>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex md:w-[75%] justify-center items-center border border-dashed border-gray-300 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-500"> Analytics Table</h2>
        </div>
      </div>
    </div>
  );
}

export default Home;
