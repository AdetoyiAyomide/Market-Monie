import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BsPerson } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { LuBuilding2 } from "react-icons/lu";
import { FiCreditCard } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";

const FormHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const steps = [
    { name: "Personal", icon: <BsPerson />, path: "/personal-details" },
    { name: "Address", icon: <HiOutlineLocationMarker />, path: "/address" },
    { name: "Business", icon: <LuBuilding2 />, path: "/business" },
    { name: "Loan", icon: <FiCreditCard />, path: "/loan" },
  ];

  const activeIndex = steps.findIndex(step => step.path === location.pathname);

  return (

    <div className='flex flex-col items-center w-full'>
        <div className='flex gap-2 w-full items-center justify-between text-sm'>
      <button 
        onClick={() => navigate(-1)}
        className="p-2 text-gray-500 hover:text-green-600 text-xl hover:bg-slate-200 rounded-full transition"
      >
        <FaArrowLeft />
      </button>

      <div className='relative flex gap-2 w-full justify-between p-2 bg-slate-200 rounded-2xl'>

        <div
          className="absolute top-2 left-2 h-[calc(100%-16px)] bg-green-100 rounded-lg transition-all duration-300"
          style={{
            width: `calc((100% - 16px) / ${steps.length})`,
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />

        {steps.map((step, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={step.name}
              onClick={() => navigate(step.path)}
              className={`relative z-10 flex flex-col items-center rounded-lg p-2 w-1/4 transition-all duration-300 ${
                isActive
                  ? "text-green-800 font-semibold"
                  : "text-slate-400 hover:text-gray-600"
              }`}
            >
              {step.icon}
              <span>{step.name}</span>
              <span>{String.fromCharCode(65 + index)}</span>
            </button>
          );
        })}
      </div>
    </div>
    </div>
    
  );
};

export default FormHeader;