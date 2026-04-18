import { useState, useEffect } from "react";
import { FiHome, FiMap, FiUploadCloud, FiType, FiFileText, FiLoader } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { locationService } from "../../../services/locationService";

const AddressDetails = ({ data, onChange, onContinue, onBack }) => {
  // Query for states
  const { data: states = [], isLoading: loadingStates } = useQuery({
    queryKey: ['location-states'],
    queryFn: () => locationService.getStates(),
  });
  console.log("states=>", states)

  // Query for LGAs (enabled only if state is selected)
  const { data: lgas = [], isFetching: loadingLgas } = useQuery({
    queryKey: ['location-lgas', data.state],
    queryFn: () => locationService.getLGAs(data.state),
    enabled: !!data.state,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!data.state) newErrors.state = "State is required";
    if (!data.lga) newErrors.lga = "LGA is required";
    if (!data.area) newErrors.area = "Area or street is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      onContinue();
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-left font-poppins">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
           Residential Address
        </h2>
        <p className="mt-2 text-gray-500 text-sm">
          Tell us where you live so we can personalize your experience.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <SelectGroup 
            label="State" 
            value={data.state} 
            onChange={(e) => {
               onChange('state', e.target.value);
               onChange('lga', ''); 
               if (errors.state) setErrors(prev => ({ ...prev, state: null }));
            }}
            error={errors.state}
            options={states}
            icon={loadingStates ? <FiLoader className="animate-spin" /> : <FiMap />} 
            disabled={loadingStates}
          />
          <SelectGroup 
            label="LGA" 
            value={data.lga} 
            onChange={(e) => {
              onChange('lga', e.target.value);
              if (errors.lga) setErrors(prev => ({ ...prev, lga: null }));
            }}
            error={errors.lga}
            options={lgas}
            disabled={!data.state || loadingLgas}
            icon={loadingLgas ? <FiLoader className="animate-spin text-emerald-600" /> : <FiType />} 
          />
        </div>

        <InputGroup 
          label="Area / Street" 
          value={data.area} 
          onChange={(e) => {
            onChange('area', e.target.value);
            if (errors.area) setErrors(prev => ({ ...prev, area: null }));
          }}
          error={errors.area}
          placeholder="Enter your area or street"
          icon={<FiMap />} 
        />

        <InputGroup 
          label="House Number" 
          value={data.houseAddress} 
          onChange={(e) => onChange('houseAddress', e.target.value)}
          placeholder="Enter house number"
          icon={<FiHome />} 
        />

        <div className="flex gap-4 mt-10">
          <button
            onClick={onBack}
            className="flex-1 rounded-xl border-2 border-gray-100 py-4 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all font-poppins"
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            className="flex-2 rounded-xl bg-emerald-600 py-4 text-sm font-semibold text-white shadow-xl shadow-emerald-200/50 hover:bg-emerald-500 transition-all font-poppins"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, value, onChange, icon, placeholder, error = null }) => (
  <div className="space-y-2">
    <label className={`text-xs font-bold tracking-widest ml-1 transition-colors ${error ? 'text-red-500' : 'text-gray-400'}`}>
      {label}
    </label>
    <div className="relative group">
      <div className={`absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors ${error ? 'text-red-400' : 'text-gray-400'}`}>
        {icon}
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`block w-full rounded-xl border-2 bg-gray-50/30 pl-11 pr-4 py-4 text-gray-900 shadow-sm transition-all outline-none font-medium ${
          error 
            ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" 
            : "border-gray-200 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
        }`}
      />
    </div>
    {error && <p className="mt-1 text-xs text-red-500 animate-in fade-in slide-in-from-top-1 ml-1 font-medium">{error}</p>}
  </div>
);

const SelectGroup = ({ label, value, onChange, options, icon, disabled = false, error = null }) => (
  <div className="space-y-2">
    <label className={`text-xs font-bold tracking-widest ml-1 transition-colors ${error ? 'text-red-500' : 'text-gray-400'}`}>
      {label}
    </label>
    <div className="relative group">
      <div className={`absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors ${error ? 'text-red-400' : 'text-gray-400'}`}>
        {icon}
      </div>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`block w-full rounded-xl border-2 bg-gray-50/30 pl-11 pr-4 py-4 text-gray-900 shadow-sm transition-all outline-none font-medium appearance-none ${
          disabled 
            ? "opacity-50 grayscale cursor-not-allowed border-gray-100" 
            : error
              ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
              : "border-gray-200 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
        }`}
      >
        <option className="text-black bg-white" value="">{disabled && !value ? "Loading..." : `Select ${label}`}</option>
        {options.map((opt, i) => (
          <option className="text-black bg-white" key={i} value={opt}>{opt}</option>
        ))}
      </select>
      <div className={`absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none ${error ? 'text-red-400' : 'text-gray-400'}`}>
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
      </div>
    </div>
    {error && <p className="mt-1 text-xs text-red-500 animate-in fade-in slide-in-from-top-1 ml-1 font-medium">{error}</p>}
  </div>
);

export default AddressDetails;
