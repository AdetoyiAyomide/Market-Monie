import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { locations } from '../store/Data';
import { stateLgaMapping } from '../store/LgaData';
import FormHeader from './formHeader';
import ProgressBar from "./ProgressBar"
import { useForm } from "../store/FormContext";

const Address = () => {
    const navigate = useNavigate();
    const { formData, setFormData } = useForm();
    const [error, setError] = useState(false);
    const [lgas, setLgas] = useState([]);

    useEffect(() => {
        if (formData.state) {
            setLgas(stateLgaMapping[formData.state] || []);
        }
    }, [formData.state]);

    const isFormValid =
        !!formData.state &&
        !!formData.lga &&
        formData.houseAddress?.trim().length > 0;

    const currentStep = 5;

    const handleNext = () => {
        if (!isFormValid) {
            setError(true);
            return;
        }
        navigate("/business");
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    return (
        <section className='w-full min-h-screen flex items-center justify-center p-4 py-10 bg-[#f4f6f9]'>
            <div className='rounded-2xl bg-white border border-white w-full max-w-2xl flex flex-col items-center gap-5 p-6 shadow-sm'>
                <ProgressBar currentStep={currentStep} totalSteps={8} />
                <FormHeader />
                <h2 className='font-bold text-left w-full text-xl'>Residential Address</h2>
                {error && (
                    <div className='w-full p-2 bg-red-50 text-red-600 rounded-lg text-xs text-center border border-red-200'>
                        Please fill in all required fields
                    </div>
                )}

                <div className='flex flex-col w-full'>
                    <label htmlFor="state">State <span className='text-red-500'>*</span></label>
                    <select
                        name="state"
                        id="state"
                        value={formData.state || ""}
                        onChange={(e) => {
                            const state = e.target.value;
                            setFormData({
                                ...formData,
                                state,
                                lga: ""
                            });
                            setLgas(stateLgaMapping[state] || []);
                            setError(false);
                        }}
                        className='border border-gray-500 rounded-xl px-2 h-[40px] bg-white outline-none w-full scrollbar-hide'
                    >
                        <option value="">Select State</option>
                        {locations.map((state) => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>

                <div className='flex flex-col w-full'>
                    <label htmlFor="local-government">Local Government Area (LGA) <span className='text-red-500'>*</span></label>
                    <select
                        name="local-government"
                        id="lga"
                        value={formData.lga || ""}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                lga: e.target.value
                            });
                            setError(false);
                        }}
                        disabled={!formData.state}
                        className='border border-gray-500 rounded-xl px-2 h-[40px] bg-white outline-none w-full scrollbar-hide disabled:bg-gray-100 disabled:cursor-not-allowed'
                    >
                        <option value="">{formData.state ? "Select LGA" : "Select State First"} </option>
                        {lgas.map((lga) => (
                            <option key={lga} value={lga}>{lga}</option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col w-full'>
                    <label htmlFor="area">Area/Street <span className='text-slate-400'>(optional)</span></label>
                    <input type="text" id="area" value={formData.area || ""} onChange={(e) => setFormData({ ...formData, area: e.target.value })} placeholder='e.g Victoria, Lekki Phase 1' className='border border-gray-500 rounded-xl p-2' />
                </div>
                <div className='flex flex-col w-full'>
                    <label htmlFor="houseAddress">House Address <span className='text-red-500'>*</span></label>
                    <input
                        type="text"
                        name="houseAddress"
                        id="houseAddress"
                        value={formData.houseAddress || ""}
                        onChange={handleChange}
                        placeholder='house number and street name'
                        className='border border-gray-500 rounded-xl p-2'
                    />
                </div>
                <div className='flex w-full justify-between gap-2'>
                    <button className='border border-green-800 text-green-800 rounded-xl p-2 w-1/2 hover:bg-green-100'
                        onClick={() => navigate("/personal-details")}>
                        Back
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={!isFormValid}
                        className={`rounded-xl p-2 w-1/2 transition-all duration-200 font-medium
    ${isFormValid
                                ? "bg-green-800 text-white hover:bg-green-900"
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

export default Address