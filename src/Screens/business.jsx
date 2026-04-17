import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormHeader from './formHeader'
import ProgressBar from './ProgressBar';
import { useForm } from "../store/FormContext";



const Business = () => {
    const navigate = useNavigate();
    const { formData, setFormData } = useForm();
    const { businessName, businessAddress, businessType, yearsInBusiness, dailySales} = formData;
    const isFormValid = businessName && businessType && yearsInBusiness && dailySales;
    const [error, setError] = useState(false);

    const handleNext = () => {
    if (!isFormValid) return;
    navigate("/loan");
};
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.id]: e.target.value
  });
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

    const currentStep = 6;

    return (
        <section className='w-full min-h-screen flex items-center justify-center p-4 bg-[#f4f6f9]'>
            <div className='rounded-2xl bg-white border border-white w-full max-w-2xl flex flex-col items-center gap-5 p-6 shadow-sm mb-10'>
                <div className='w-full'>
                    <ProgressBar currentStep={currentStep} totalSteps={8} />
                </div>
                <FormHeader />
                <h1 className='w-full text-left font-bold text-xl'>Business Details</h1>
                {error && (
                    <div className='w-full p-2 bg-red-50 text-red-600 rounded-lg text-xs text-center border border-red-200'>
                        Please fill in all required fields
                    </div>
                )}
                <div className='w-full max-h-[60vh] flex flex-col'>
                    <div className='overflow-y-auto'>
                    <div className='flex flex-col w-full gap-1'>
                    <label htmlFor="businessName" className='text-sm font-medium'>Business Name <span className='text-red-500'>*</span></label>
                    <input
                        type="text"
                        name="businessName"
                        id="businessName" value={businessName} onChange={handleChange}
                        placeholder='e.g. Vickys Salon'
                        className='border border-gray-300 rounded-xl p-2.5 outline-none focus:border-green-600 transition-colors'
                    />
                </div>

                <div className='flex flex-col w-full gap-1'>
                    <label htmlFor="businessAddress" className='text-sm font-medium'>Business Address <span className='text-slate-400'>(optional)</span></label>
                    <input
                        type="text"
                        name="business-address"
                        id="businessAddress"
                        value={businessAddress}
                        onChange={handleChange}
                        placeholder='e.g. 15, Admiralty Way, Lekki'
                        className='border border-gray-300 rounded-xl p-2.5 outline-none focus:border-green-600 transition-colors'
                    />
                </div>

                <div className='flex flex-col w-full gap-1'>
                    <label htmlFor="businessType" className='text-sm font-medium'>Business Type <span className='text-red-500'>*</span></label>
                    <input
                        type="text"
                        name="businessType"
                        id="businessType"
                        value={businessType}
                        onChange={handleChange}
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
                                    setFormData({ ...formData, yearsInBusiness: option });
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
                                setFormData({ ...formData, dailySales: option });
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
    disabled={!isFormValid}
    className={`rounded-xl p-2.5 w-1/2 transition-all duration-200 shadow-md font-medium
    ${
        isFormValid
        ? "bg-green-800 text-white hover:bg-green-900 cursor-pointer"
        : "bg-green-100 text-green-400 cursor-not-allowed"
    }`}
>
    Next
</button>
                </div>
                
                
            </div>
        </section>
    );
};

export default Business;