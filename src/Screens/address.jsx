import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { locations } from '../store/Data';
import { stateLgaMapping } from '../store/LgaData';
import { BsPerson } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { LuBuilding2 } from "react-icons/lu";
import { FiCreditCard } from "react-icons/fi";
import FormHeader from './formHeader';
import ProgressBar from "./ProgressBar"



const Address = () => {
    const navigate = useNavigate();
    const [selectedState, setSelectedState] = useState("");
    const [selectedLga, setSelectedLga] = useState("");
    const [houseAddress, setHouseAddress] = useState("");
    const [lgas, setLgas] = useState([]);
    const [error, setError] = useState(false);

    const lgaRef = useRef(null);

const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setLgas(stateLgaMapping[state] || []);
    setSelectedLga("");
    setError(false);

    setTimeout(() => {
        lgaRef.current?.focus();
    }, 100);
};

    const isFormValid =
    selectedState &&
    selectedLga &&
    houseAddress.trim();

    const currentStep = 5;
    const handleNext = () => {
    if (!isFormValid) {
        setError(true);
        return;
    }
    navigate("/business");
};

    return (
        <section className='w-full min-h-screen flex items-center justify-center p-4 py-10'>
            <div className='rounded-2xl bg-white border border-white w-full max-w-2xl flex flex-col items-center gap-5 p-6 shadow-sm'>
                            <div className='flex gap-2 w-full justify-between text-sm'>
                                <button className='flex flex-col items-center rounded-lg p-2 w-1/4 text-slate-400'>
                                    <BsPerson />
                                    <span>Personal</span>
                                    <span>A</span>
                                </button>
                                <button className='text-green-800 bg-green-100 flex flex-col items-center rounded-lg p-2 w-1/4'>
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
                <h2 className='font-semibold text-left w-full'>Residential Address</h2>
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
                        value={selectedState}
                        onChange={handleStateChange}
                        
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
                        id="local-government"
                        value={selectedLga}
                        ref={lgaRef}
                        onChange={(e) => {
                            setSelectedLga(e.target.value);
                            setError(false);
                        }}
                        disabled={!selectedState}
                        className='border border-gray-500 rounded-xl px-2 h-[40px] bg-white outline-none w-full scrollbar-hide disabled:bg-gray-100 disabled:cursor-not-allowed'
                    >
                        <option value="">{selectedState ? "Select LGA" : "Select State First"}</option>
                        {lgas.map((lga) => (
                            <option key={lga} value={lga}>{lga}</option>
                        ))}
                    </select>
                </div>
                <div className='flex flex-col w-full'>
                    <label htmlFor="area">Area/Street <span className='text-slate-400'>(optional)</span></label>
                    <input type="text" name="area" id="area" placeholder='e.g Victoria, Lekki Phase 1' className='border border-gray-500 rounded-xl p-2' />
                </div>
                <div className='flex flex-col w-full'>
                    <label htmlFor="house-address">House Address <span className='text-red-500'>*</span></label>
                    <input
                        type="text"
                        name="house-address"
                        id="house-address"
                        value={houseAddress}
                        onChange={(e) => {
                            setHouseAddress(e.target.value);
                            setError(false);
                        }}
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
    ${
        isFormValid
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