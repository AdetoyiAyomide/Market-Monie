import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import FormHeader from './formHeader';
import ProgressBar from './ProgressBar';
import { useForm } from "../store/FormContext";


const PersonalDetails = () => {
    const navigate = useNavigate();
    
    const { formData, setFormData } = useForm();

    const [error, setError] = useState(false);
    const { firstName, lastName, phoneNumber, dateOfBirth } = formData;
    const isFormValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    phoneNumber.trim().length > 0 &&
    !!dateOfBirth;

    const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.id]: e.target.value
  });
};

    const currentStep = 4;
    const handleContinue = () => {
    if (!isFormValid) {
        setError(true);
        return;
    }
    navigate("/address");
};

    return (
        <section className='w-full min-h-screen flex items-center justify-center py-10 bg-[#f4f6f9]'>
            <div className='rounded-2xl bg-white border border-white w-full max-w-2xl flex flex-col items-center gap-5 p-6 shadow-sm'>
                <div className='w-full'>
                    <ProgressBar currentStep={currentStep} totalSteps={8} />
                </div>
                <FormHeader />
                <h1 className='w-full text-left font-bold text-xl'>Personal Details</h1>

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
                    <input type="email" id="email" placeholder='Email Address' value={formData.email} onChange={handleChange} className='border border-gray-300 rounded-lg p-2 w-full' />
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
                   <button
                    onClick={handleContinue}
                    disabled={!isFormValid}
                    className={`rounded-xl p-2.5 w-full transition-all duration-200 shadow-md font-medium
                    ${
                        isFormValid
                        ? "bg-green-800 text-white hover:bg-green-900 cursor-pointer"
                        : "bg-green-100 text-green-400 cursor-not-allowed"}`}>
                    Continue
                </button>
                </div>
            </div>
        </section>
    );

};

export default PersonalDetails;

