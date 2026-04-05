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
      <div className='flex gap-4 w-full items-center justify-between text-sm'>
        <button 
          onClick={() => navigate(-1)}
          className="p-2 text-gray-500 hover:text-green-600 text-xl hover:bg-slate-200 rounded-full transition shrink-0"
        >
          <FaArrowLeft />
        </button>

        <div className='relative grid grid-cols-4 gap-1 w-full p-1 bg-slate-200 rounded-2xl'>
          <div
            className="absolute top-1 left-1 bottom-1 bg-white rounded-xl shadow-sm transition-all duration-300 pointer-events-none"
            style={{
              width: `calc((100% - 8px) / 4)`, // 8px = (4 cells - 1 gap) * padding? No, simpler.
              transform: `translateX(calc(${activeIndex} * (100% + 1.25px)))`, // This is still tricky with grids.
            }}
          />
          {/* Using a simpler approach: active class on button instead of absolute div if transform is hard */}
          {steps.map((step, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={step.name}
                onClick={() => navigate(step.path)}
                className={`relative z-10 flex flex-col items-center rounded-xl p-2 transition-all duration-300 ${
                  isActive
                    ? "text-green-800 font-bold bg-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-300/50"
                }`}
              >
                <span className="text-lg mb-0.5">{step.icon}</span>
                <span className="text-[10px] leading-tight font-medium">{step.name}</span>
                <span className="text-[9px] opacity-60">{String.fromCharCode(65 + index)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
    
  );
};

export default FormHeader;