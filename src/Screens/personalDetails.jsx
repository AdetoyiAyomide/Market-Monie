import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { LuBuilding2 } from "react-icons/lu";
import { FiCreditCard } from "react-icons/fi";

const PersonalDetails = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        dateOfBirth: '',
    });
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        setError(false); // Clear error message as user types
    };

    const handleContinue = () => {
        const { firstName, lastName, phoneNumber, dateOfBirth } = formData;
        if (!firstName || !lastName || !phoneNumber || !dateOfBirth) {
            setError(true);
            return;
        }
        navigate("/address");
    };

    return (
        <section className='w-full min-h-screen flex items-center justify-center p-4 py-10'>
            <div className='rounded-2xl bg-white border border-white w-full max-w-2xl flex flex-col items-center gap-5 p-6 shadow-sm'>
                <div className='flex gap-2 w-full justify-between text-sm'>
                    <button className='text-green-800 bg-green-100 flex flex-col items-center rounded-lg p-2 w-1/4'>
                        <BsPerson />
                        <span>Personal</span>
                        <span>A</span>
                    </button>
                    <button className='flex flex-col items-center rounded-lg p-2 w-1/4 text-slate-400'>
                        <HiOutlineLocationMarker />
                        <span>Address</span>
                        <span>B</span>
                    </button>
                    <button className='flex flex-col items-center rounded-lg p-2 w-1/4 text-slate-400'>
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
                <h1 className='w-full text-left font-bold'>Personal Details</h1>

                {error && (
                    <div className='w-full p-2 bg-red-50 text-red-600 rounded-lg text-xs text-center'>
                        Please fill in all required fields
                    </div>
                )}

                <div className='flex gap-3 w-full'>
                    <div className='flex flex-col gap-2 w-1/2'>
                        <label htmlFor="firstName">First Name <span className='text-red-500'>*</span></label>
                        <input type="text" id="firstName" required value={formData.firstName} onChange={handleChange} placeholder='First Name' className='border border-gray-300 rounded-lg p-2' />
                    </div>
                    <div className='flex flex-col gap-2 w-1/2'>
                        <label htmlFor="lastName">Last Name <span className='text-red-500'>*</span></label>
                        <input type="text" id="lastName" required value={formData.lastName} onChange={handleChange} placeholder='Last Name' className='border border-gray-300 rounded-lg p-2' />
                    </div>
                </div>
                <div className='flex flex-col gap-2 items-start justify-start w-full '>
                    <label htmlFor="phoneNumber">Phone Number <span className='text-red-500'>*</span></label>
                    <div className='flex items-center border border-gray-300 rounded-lg w-full'>
                        <span className='p-2 bg-slate-100 border-r border-gray-300 text-slate-500 rounded-l-lg text-sm'>+234</span>
                        <input type="text" id="phoneNumber" required value={formData.phoneNumber} onChange={handleChange} placeholder='Phone Number' className='p-2 w-full rounded-r-lg outline-none text-sm' maxLength={10} />
                    </div>
                </div>

                <div className='flex flex-col gap-3 items-start justify-start w-full '>
                    <label htmlFor="email">Email Address <span className='text-slate-400'>(optional)</span></label>
                    <input type="email" id="email" placeholder='Email Address' className='border border-gray-300 rounded-lg p-2 w-full' />
                </div>
                <div className='flex flex-col gap-3 items-start justiify-start w-full'>
                    <label htmlFor="dateOfBirth">Date of birth <span className='text-red-500'>*</span></label>
                    <input type="date" id="dateOfBirth" required value={formData.dateOfBirth} onChange={handleChange} placeholder='dd/mm/yyyy' className='border border-gray-300 rounded-lg p-2 w-full' />
                </div>
                <div className='flex flex-col gap-1 items-start justify-start w-full'>
                    <label htmlFor="ID">ID Document <span className='text-slate-400'>(optional)</span></label>
                    <p className='text-[10px] text-slate-400 mb-1 lg:text-xs'>NIN, Driver's License, Passport, Voter's Card</p>
                    <input type="file" id="ID" className='border border-gray-300 rounded-lg p-2 w-full cursor-pointer' />
                </div>
                <div className='w-full'>
                    <button className='w-full border p-2.5 rounded-xl bg-green-800 text-white text-sm hover:bg-green-900 hover:text-white hover:border-green-900 transition-colors duration-400 '
                        onClick={handleContinue}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </section>
    );

};

export default PersonalDetails;

