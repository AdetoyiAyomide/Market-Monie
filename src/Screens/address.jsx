import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { locations } from '../store/Data';
import { FaChevronDown, FaChevronUp, FaArrowLeft } from "react-icons/fa";
import { stateLgaMapping } from '../store/LgaData';
import FormHeader from './formHeader';
import ProgressBar from "./ProgressBar"
import { useForm } from "../store/FormContext";

const Address = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const { formData, setFormData } = useForm();
    const [error, setError] = useState(false);
    const [query, setQuery] = useState("");
    const [filtered, setFiltered] = useState(locations);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [openLga, setOpenLga] = useState(false);
    const [lgaQuery, setLgaQuery] = useState("");
    const [filteredLgas, setFilteredLgas] = useState([]);
    const [selectedLga, setSelectedLga] = useState("");
    const handleStateChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        setSelectedLocation(""); // important

        const results = locations.filter((loc) =>
            loc.toLowerCase().includes(value.toLowerCase())
        );

        setFiltered(results);
    };
    const handleSelect = (loc) => {
        setSelectedLocation(loc);
        setFormData({
            ...formData,
            state: loc,
            lga: ""
        });
        setOpen(false);
        setQuery("");
        setError(false);
    };
    const [lgas, setLgas] = useState([]);


    const isFormValid =
        !!formData.state &&
        !!formData.lga &&
        !!formData.area &&
        formData.houseAddress?.trim().length > 0;


    useEffect(() => {
        if (formData.state) {
            const lgaList = stateLgaMapping[formData.state] || [];
            setLgas(lgaList);
            setFilteredLgas(lgaList);
        }
    }, [formData.state]);

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

    const handleLgaChange = (e) => {
        const value = e.target.value;
        setLgaQuery(value);

        const results = lgas.filter((lga) =>
            lga.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredLgas(results);
    };

    const handleLgaSelect = (lga) => {
        setFormData({
            ...formData,
            lga
        });

        setOpenLga(false);
        setLgaQuery("");
        setError(false);
    };

    return (
        <section className='w-full min-h-screen flex items-center justify-center p-4 py-10 bg-[#f4f6f9]'>
            <div className='rounded-2xl bg-white border border-white w-full max-w-2xl flex flex-col items-center gap-5 p-6 shadow-sm'>
                <div className='w-full'>
                    <ProgressBar currentStep={currentStep} totalSteps={8} />
                </div>
                <FormHeader />
                <h2 className='font-bold text-left w-full text-xl'>
                    Residential Address
                </h2>
                {error && (
                    <div className='w-full p-2 bg-red-50 text-red-600 rounded-lg text-xs text-center border border-red-200'>
                        Please fill in all required fields
                    </div>
                )}

                <div className='flex flex-col w-full relative'>
                    <label htmlFor="state">State <span className='text-red-500'>*</span></label>
                    <input
                        type="text"
                        value={query || selectedLocation}
                        onClick={() => setOpen(prev => !prev)}
                        onChange={handleStateChange}
                        placeholder="Select State"
                        className="w-full border border-slate-400 p-2 rounded-2xl outline-none"
                    />
                    <button type='button' onClick={() => setOpen(prev => !prev)}>
                        {open ? (
                            <FaChevronUp className="absolute right-7 top-9" />
                        ) : (
                            <FaChevronDown className="absolute right-7 top-9" />
                        )}
                    </button>

                    {open && (
                        <div className="absolute left-0 top-full w-full bg-white border border-slate-400 mt-1 rounded shadow z-10">
                            <ul className="max-h-40 overflow-y-auto">
                                {filtered.length > 0 ? (
                                    filtered.map((loc, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleSelect(loc)}
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            {loc}
                                        </li>
                                    ))
                                ) : (
                                    <li className="p-2 text-gray-400">No results found</li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
                <div className='flex flex-col w-full relative'>
                    <label>LGA <span className='text-red-500'>*</span></label>

                    <input
                        type="text"
                        value={lgaQuery || formData.lga}
                        onClick={() => setOpenLga(prev => !prev)}
                        onChange={handleLgaChange}
                        placeholder={formData.state ? "Select LGA" : "Select State First"}
                        disabled={!formData.state}
                        className="w-full border border-slate-400 p-2 rounded-2xl outline-none disabled:bg-gray-100" />

                    <button type="button" onClick={() => setOpenLga(prev => !prev)}>
                        {openLga ? (
                            <FaChevronUp className="absolute right-7 top-9" />
                        ) : (
                            <FaChevronDown className="absolute right-7 top-9" />
                        )}
                    </button>

                    {openLga && (
                        <div className="absolute left-0 top-full w-full bg-white border border-slate-400 mt-1 rounded shadow z-10">
                            <ul className="max-h-40 overflow-y-auto">
                                {filteredLgas.length > 0 ? (
                                    filteredLgas.map((lga, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleLgaSelect(lga)}
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            {lga}
                                        </li>
                                    ))
                                ) : (
                                    <li className="p-2 text-gray-400">No results found</li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
                <div className='flex flex-col w-full'>
                    <label htmlFor="area">Area/Street <span className='text-red-500'>*</span></label>
                    <input type="text" id="area" value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })} placeholder='e.g Victoria, Lekki Phase 1' className='border border-gray-500 rounded-xl p-2' />
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