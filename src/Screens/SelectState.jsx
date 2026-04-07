import React, { useState } from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { FaChevronDown, FaChevronUp, FaArrowLeft } from "react-icons/fa";
import { locations } from '..//store/Data';
import { useNavigate } from "react-router-dom";
import { setSelectedStateGlobal } from "../store/Data";
import ProgressBar from './ProgressBar.jsx';

const SelectState = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(locations);
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedLocation(""); // important

    const results = Array.isArray(locations)
  ? locations.filter((loc) =>
      loc.toLowerCase().includes(value.toLowerCase())
    )
  : [];

    setFiltered(results);
  };
  const handleSelect = (loc) => {
    setSelectedLocation(loc);
    setOpen(false);
    setQuery("");
  };
  return (
    <section className='w-full min-h-screen flex items-center justify-center p-4 py-10'>
      <div className='rounded-2xl relative bg-white shadow-lg border border-white w-full max-w-xl flex flex-col items-center gap-5 p-6'>
        <button onClick={() => navigate(-1)} className="p-2 text-gray-500 hover:text-green-600 text-xl flex absolute left-4 top-10 hover:bg-slate-200 rounded-full transition-colors duration-200">
          <FaArrowLeft />
        </button>
         <img src="/marketmonie.png" className='w-40' alt="" />
        <h3 className='w-full  rounded-t-2xl text-center pb-3 font-semibold border-b border-slate-300'>Select State</h3>
        <ProgressBar currentStep={1} totalSteps={8} />
        <div className='flex items-center gap-3 text-md lg:text-2xl px-3'>
          <div className='bg-[#e8f7ef] p-3 rounded-2xl'>
            <IoLocationOutline className=' text-[#3e8b4b]' />
          </div>
          <h3>Where is your Business?</h3>
        </div>
        <p className='text-slate-400 text-sm'>We'll connect you to the nearest MarketMonie hub.</p>
        <label htmlFor="stateLocated">Select your state</label>

        <div className="w-full relative px-3">
          <input
            type="text"
            value={selectedLocation || query}
            onClick={() => setOpen(prev => !prev)}
            onChange={handleChange}
            placeholder="Select Location"
            className="w-full border border-slate-400 p-2 mb-3 rounded-2xl outline-none"
          />
          <button onClick={() => setOpen(prev => !prev)}>
            {open ? (
              <FaChevronUp className="absolute right-7 top-3" />
            ) : (
              <FaChevronDown className="absolute right-7 top-3" />
            )}
          </button>


          {/* DROPDOWN */}
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
        <div className='px-3 w-full pb-3'>
          <button
            onClick={() => {
              if (!selectedLocation) return;

              setSelectedStateGlobal(selectedLocation);
              navigate("/apply/hub");
            }}
            className="w-full border p-2.5 rounded-xl bg-green-800 text-white text-sm hover:bg-green-900 hover:text-white hover:border-green-900 transition-colors duration-400 ">Continue</button>
        </div>
      </div>
    </section>
  )
}

export default SelectState
