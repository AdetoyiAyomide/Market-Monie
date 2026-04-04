import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPerson } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { LuBuilding2 } from "react-icons/lu";
import { FiCreditCard } from "react-icons/fi";


const Business = () => {
    const navigate = useNavigate();
    const [businessName, setBusinessName] = useState("");
    const [businessAddress, setBusinessAddress] = useState("");
    const [businessType, setBusinessType] = useState("");
    const [yearsInBusiness, setYearsInBusiness] = useState("");
    const [dailySales, setDailySales] = useState("");
    const [error, setError] = useState(false);

    const handleNext = () => {
        if (!businessName || !businessType || !yearsInBusiness || !dailySales) {
            setError(true);
            return;
        }
        navigate("/loan");
    };

    const businessYears = ["Less than a year", "1-3 years", "3-5 years", "5+ years"];
    const dailySalesOptions = [
        "Below ₦5,000",
        "₦5,000 - ₦20,000",
        "₦20,000 - ₦50,000",
        "₦50,000 - ₦100,000",
        "₦100,000 - ₦500,000",
        "Above ₦500,000"
    ];

    return (
        <section className='w-full min-h-screen flex items-center justify-center p-4 bg-[#f4f6f9]'>
            <div className='rounded-2xl bg-white border border-white w-full max-w-2xl flex flex-col items-center gap-5 p-6 shadow-sm mb-10'>
                <div className='flex gap-2 w-full justify-between text-sm'>
                    <button className='flex flex-col items-center rounded-lg p-2 w-1/4 text-slate-400'>
                        <BsPerson />
                        <span>Personal</span>
                        <span>A</span>
                    </button>
                    <button className='flex flex-col items-center rounded-lg p-2 w-1/4 text-slate-400'>
                        <HiOutlineLocationMarker />
                        <span>Address</span>
                        <span>B</span>
                    </button>
                    <button className='text-green-800 bg-green-100 flex flex-col items-center rounded-lg p-2 w-1/4'>
                        <LuBuilding2 />
                        <span>Business</span>
                        <span>C</span>
                    </button>
                    <button className='flex flex-col items-center rounded-lg p-2 w-1/4 text-slate-400'>
                        <FiCreditCard />
                        <span>Loan</span>
                        <span>D</span>
                    </button>
                </div>
                <h1 className='w-full text-left font-bold text-xl'>Business Details</h1>
                {error && (
                    <div className='w-full p-2 bg-red-50 text-red-600 rounded-lg text-xs text-center border border-red-200'>
                        Please fill in all required fields
                    </div>
                )}

                <div className='flex flex-col w-full gap-1'>
                    <label htmlFor="business-name" className='text-sm font-medium'>Business Name <span className='text-red-500'>*</span></label>
                    <input
                        type="text"
                        name="business-name"
                        id="business-name"
                        value={businessName}
                        onChange={(e) => {
                            setBusinessName(e.target.value);
                            setError(false);
                        }}
                        placeholder='e.g. Vickys Salon'
                        className='border border-gray-300 rounded-xl p-2.5 outline-none focus:border-green-600 transition-colors'
                    />
                </div>

                <div className='flex flex-col w-full gap-1'>
                    <label htmlFor="business-address" className='text-sm font-medium'>Business Address <span className='text-slate-400'>(optional)</span></label>
                    <input
                        type="text"
                        name="business-address"
                        id="business-address"
                        value={businessAddress}
                        onChange={(e) => setBusinessAddress(e.target.value)}
                        placeholder='e.g. 15, Admiralty Way, Lekki'
                        className='border border-gray-300 rounded-xl p-2.5 outline-none focus:border-green-600 transition-colors'
                    />
                </div>

                <div className='flex flex-col w-full gap-1'>
                    <label htmlFor="business-type" className='text-sm font-medium'>Business Type <span className='text-red-500'>*</span></label>
                    <input
                        type="text"
                        name="business-type"
                        id="business-type"
                        value={businessType}
                        onChange={(e) => {
                            setBusinessType(e.target.value);
                            setError(false);
                        }}
                        placeholder='e.g. Retail, Service'
                        className='border border-gray-300 rounded-xl p-2.5 outline-none focus:border-green-600 transition-colors'
                    />
                </div>

                <div className='w-full flex flex-col gap-2'>
                    <label className='text-sm font-medium'>Years in Business <span className='text-red-500'>*</span></label>
                    <div className='grid grid-cols-2 gap-3 w-full'>
                        {businessYears.map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => {
                                    setYearsInBusiness(option);
                                    setError(false);
                                }}
                                className={`p-3 rounded-xl border text-sm transition-all duration-200 ${yearsInBusiness === option
                                    ? "bg-green-800 text-white border-green-800"
                                    : "bg-white text-gray-700 border-gray-300 hover:border-green-600"
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                <div className='w-full flex flex-col gap-2'>
                    <label className='text-sm font-medium'>Average Daily Sales <span className='text-red-500'>*</span></label>
                    <div className='flex flex-col gap-2 w-full'>
                        {dailySalesOptions.map((option) => (
                            <button
                                key={option}
                                type="button"
                                onClick={() => {
                                    setDailySales(option);
                                    setError(false);
                                }}
                                className={`p-2.5 rounded-xl border text-left text-sm transition-all duration-200 ${dailySales === option
                                    ? "bg-green-800 text-white border-green-800"
                                    : "bg-white text-gray-700 border-gray-300 hover:border-green-600"
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                <div className='flex w-full justify-between gap-3 mt-4'>
                    <button
                        onClick={() => navigate("/address")}
                        className='border border-green-800 text-green-800 rounded-xl p-2.5 w-1/2 hover:bg-green-50 transition-colors font-medium'
                    >
                        Back
                    </button>
                    <button
                        onClick={handleNext}
                        className='text-white bg-green-800 rounded-xl p-2.5 w-1/2 hover:bg-green-900 transition-colors shadow-md font-medium'
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Business;