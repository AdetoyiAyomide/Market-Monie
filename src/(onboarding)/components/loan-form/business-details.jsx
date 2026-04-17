import { useState } from "react";
import { FiBriefcase, FiMapPin, FiTrendingUp, FiClock, FiType, FiLoader } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { locationService } from "../../../services/locationService";

const BusinessDetails = ({ data, onChange, onContinue, onBack }) => {
  // Query for states
  const { data: states = [], isLoading: loadingStates } = useQuery({
    queryKey: ['location-states'],
    queryFn: () => locationService.getStates(),
  });

  // Query for LGAs (enabled only if state is selected)
  const { data: lgas = [], isFetching: loadingLgas } = useQuery({
    queryKey: ['location-lgas', data.businessState],
    queryFn: () => locationService.getLGAs(data.businessState),
    enabled: !!data.businessState,
  });

  const businessKinds = [
    "Farming", "Food Processing", "Bakery Business", "Restaurants and Catering",
    "Supermarkets/Grocery Stores", "Petty Trading", "Leather Production",
    "Transport Services", "Real Estate", "Other"
  ];

  const yearOptions = [
    "0 – 1 year", "2 – 3 years", "4 – 5 years", "6 - 9 years", "10+ and above"
  ];

  const saleOptions = [
    "1,000 – 10,000", "20,000 – 40,000", "50,000 - 100,000",
    "200,000 - 400,000", "500,000 - 1,000,000", "1,000,000 and above"
  ];

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-left font-poppins">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
           Business Details
        </h2>
        <p className="mt-2 text-gray-500 text-sm">
          Tell us about your business to help us understand your needs.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <InputGroup 
          label="What is the name of your business?" 
          value={data.businessName} 
          onChange={(e) => onChange('businessName', e.target.value)}
          placeholder="Enter business name"
          icon={<FiBriefcase />} 
        />

        <div className="space-y-4 pt-2 pb-2">
          <label className="text-xs font-bold text-emerald-600 uppercase tracking-widest ml-1">
             Business Location
          </label>
          <div className="grid grid-cols-2 gap-4">
            <SelectGroup 
              label="State" 
              value={data.businessState} 
              onChange={(e) => {
                 onChange('businessState', e.target.value);
                 onChange('businessLga', '');
              }}
              options={states}
              icon={loadingStates ? <FiLoader className="animate-spin" /> : <FiMapPin />} 
              disabled={loadingStates}
            />
            <SelectGroup 
              label="LGA" 
              value={data.businessLga} 
              onChange={(e) => onChange('businessLga', e.target.value)}
              options={lgas}
              disabled={!data.businessState || loadingLgas}
              icon={loadingLgas ? <FiLoader className="animate-spin text-emerald-600" /> : <FiType />} 
            />
          </div>
          <InputGroup 
            label="Street / Area Name" 
            value={data.businessArea} 
            onChange={(e) => onChange('businessArea', e.target.value)}
            placeholder="e.g. 12, Market Road"
            icon={<FiMapPin />} 
          />
        </div>

        <SelectGroup 
          label="What kind of business are you into?" 
          value={data.businessType} 
          onChange={(e) => onChange('businessType', e.target.value)}
          options={businessKinds}
          icon={<FiBriefcase />} 
        />

        {data.businessType === "Other" && (
          <div className="animate-in slide-in-from-top-2 duration-300">
            <InputGroup 
              label="Please specify your business type" 
              value={data.otherBusiness} 
              onChange={(e) => onChange('otherBusiness', e.target.value)}
              placeholder="e.g. Tailoring, Graphic Design"
              icon={<FiType />} 
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          <SelectGroup 
            label="How many years have you been in business?" 
            value={data.businessYears} 
            onChange={(e) => onChange('businessYears', e.target.value)}
            options={yearOptions}
            icon={<FiClock />} 
          />
          <SelectGroup 
            label="How much do you sell a day?" 
            value={data.dailySales} 
            onChange={(e) => onChange('dailySales', e.target.value)}
            options={saleOptions}
            icon={<FiTrendingUp />} 
          />
        </div>

        <div className="flex gap-4 mt-10">
          <button
            onClick={onBack}
            className="flex-1 rounded-xl border-2 border-gray-100 py-4 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all font-poppins"
          >
            Back
          </button>
          <button
            onClick={onContinue}
            disabled={
              !data.businessName || 
              !data.businessState || 
              !data.businessLga || 
              !data.businessType || 
              (data.businessType === "Other" && !data.otherBusiness) ||
              !data.dailySales
            }
            className="flex-2 rounded-xl bg-emerald-600 py-4 text-sm font-semibold text-white shadow-xl shadow-emerald-200/50 hover:bg-emerald-500 disabled:opacity-50 transition-all font-poppins"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, value, onChange, icon, placeholder }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-emerald-600 transition-colors">
        {icon}
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full rounded-xl border-gray-200 border-2 bg-gray-50/30 pl-11 pr-4 py-4 text-gray-900 shadow-sm transition-all focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none font-medium"
      />
    </div>
  </div>
);

const SelectGroup = ({ label, value, onChange, options, icon, disabled = false }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-emerald-600 transition-colors">
        {icon}
      </div>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`block w-full rounded-xl border-gray-200 border-2 bg-gray-50/30 pl-11 pr-4 py-4 text-gray-900 shadow-sm transition-all focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none font-medium appearance-none ${
          disabled ? "opacity-50 grayscale cursor-not-allowed" : ""
        }`}
      >
        <option className="text-black bg-white" value="">{disabled && !value ? "Loading..." : `Select ${label}`}</option>
        {options.map((opt, i) => (
          <option className="text-black bg-white" key={i} value={opt}>{opt}</option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
      </div>
    </div>
  </div>
);

export default BusinessDetails;
