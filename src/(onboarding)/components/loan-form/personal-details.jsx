import { useState, useEffect } from "react";
import { FiUser, FiMail, FiCalendar, FiHome, FiMapPin, FiMap, FiType, FiLoader, FiHash } from "react-icons/fi";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { getDaysInMonth, eachMonthOfInterval, startOfYear, endOfYear, format } from 'date-fns';
import { useQuery } from "@tanstack/react-query";
import { locationService } from "../../../services/locationService";

const PersonalDetails = ({ data, onChange, onContinue, onBack }) => {
  // Split DOB YYYY-MM-DD
  const dobParts = data.dob ? data.dob.split('-') : ['', '', ''];
  const currentYear = dobParts[0] || "";
  const currentMonth = dobParts[1] || "";
  const currentDay = dobParts[2] || "";

  // Dynamic days based on selection
  const maxDays = (currentYear && currentMonth) 
    ? getDaysInMonth(new Date(parseInt(currentYear), parseInt(currentMonth) - 1)) 
    : 31;

  const days = Array.from({ length: maxDays }, (_, i) => (i + 1).toString().padStart(2, '0'));
  
  const handleDateChange = (type, value) => {
    let year = currentYear;
    let month = currentMonth;
    let day = currentDay;

    if (type === 'year') {
      year = value;
      if (month && year) {
        const newMax = getDaysInMonth(new Date(parseInt(year), parseInt(month) - 1));
        if (parseInt(day) > newMax) day = newMax.toString().padStart(2, '0');
      }
    }
    if (type === 'month') {
      month = value;
      if (month && year) {
        const newMax = getDaysInMonth(new Date(parseInt(year), parseInt(month) - 1));
        if (parseInt(day) > newMax) day = newMax.toString().padStart(2, '0');
      }
    }
    if (type === 'day') day = value;

    onChange('dob', `${year}-${month}-${day}`);
  };

  const months = eachMonthOfInterval({
    start: startOfYear(new Date()),
    end: endOfYear(new Date())
  }).map((month, index) => ({
    name: format(month, 'MMMM'),
    value: (index + 1).toString().padStart(2, '0')
  }));

  const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - 18 - i).toString());

  // Query for states
  const { data: states = [], isLoading: loadingStates } = useQuery({
    queryKey: ['location-states'],
    queryFn: () => locationService.getStates(),
  });

  // Query for LGAs (enabled only if state is selected)
  const { data: lgas = [], isFetching: loadingLgas } = useQuery({
    queryKey: ['location-lgas', data.state],
    queryFn: () => locationService.getLGAs(data.state),
    enabled: !!data.state,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!currentDay || !currentMonth || !currentYear) newErrors.dob = "Date of birth is required";
    if (!data.phone) newErrors.phone = "Phone number is required";
    if (!data.state) newErrors.state = "State is required";
    if (!data.lga) newErrors.lga = "LGA is required";
    if (!data.area) newErrors.area = "Area is required";
    
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
          Personal Details
        </h2>
        <p className="mt-2 text-gray-500 text-sm">
          Please confirm your personal information and residential address.
        </p>
      </div>

      <div className="mt-8 space-y-6 pb-20">
        <div className="grid grid-cols-2 gap-4">
          <InputGroup 
            label="First Name" 
            value={data.firstname} 
            icon={<FiUser />} 
            readOnly
          />
          <InputGroup 
            label="Last Name" 
            value={data.lastname} 
            icon={<FiUser />} 
            readOnly
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 tracking-widest ml-1">
            Phone Number
          </label>
          <div className="phone-input-container">
            <PhoneInput
              placeholder="Enter phone number"
              defaultCountry="NG"
              value={data.phone}
              onChange={(val) => onChange('phone', val)}
              className="flex w-full rounded-xl border-gray-200 border-2 bg-gray-50/30 px-4 py-5 sm:text-sm focus-within:ring-4 focus-within:ring-emerald-500/10 focus-within:border-emerald-600 outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className={`text-xs font-bold tracking-widest ml-1 mb-2 block ${errors.dob ? 'text-red-500' : 'text-gray-400'}`}>
            Date of Birth
          </label>
          <div className="grid grid-cols-3 gap-3">
            <SelectGroupSimple
              value={currentDay}
              onChange={(e) => handleDateChange('day', e.target.value)}
              options={days.map(d => ({ label: d, value: d }))}
              placeholder="Day"
              error={!!errors.dob}
            />
            <SelectGroupSimple
              value={currentMonth}
              onChange={(e) => handleDateChange('month', e.target.value)}
              options={months.map(m => ({ label: m.name, value: m.value }))}
              placeholder="Month"
              error={!!errors.dob}
            />
            <SelectGroupSimple
              value={currentYear}
              onChange={(e) => handleDateChange('year', e.target.value)}
              options={years.map(y => ({ label: y, value: y }))}
              placeholder="Year"
              error={!!errors.dob}
            />
          </div>
          {errors.dob && <p className="mt-1 text-xs text-red-500 animate-in fade-in slide-in-from-top-1 ml-1 font-medium">{errors.dob}</p>}
        </div>

        <div className="pt-6 border-t border-gray-100 space-y-6">
          <div className="flex items-center gap-2 text-emerald-600 mb-2">
            <FiHome />
            <h3 className="text-xs font-bold tracking-widest">Residential Address</h3>
          </div>

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
            icon={<FiMapPin />} 
          />

          <InputGroup 
            label="House Number" 
            value={data.houseAddress} 
            onChange={(e) => onChange('houseAddress', e.target.value)}
            placeholder="Enter house number"
            icon={<FiHome />} 
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

const InputGroup = ({ label, value, onChange, icon, placeholder, readOnly = false, error = null }) => (
  <div className="space-y-2">
    <label className={`text-xs font-bold uppercase tracking-widest ml-1 transition-colors ${error ? 'text-red-500' : 'text-gray-400'}`}>
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
        readOnly={readOnly}
        placeholder={placeholder}
        className={`block w-full rounded-xl border-2 bg-gray-50/30 pl-11 pr-4 py-4 text-gray-900 shadow-sm transition-all outline-none font-medium ${
          readOnly 
            ? "bg-gray-100/80 text-gray-500 cursor-not-allowed border-gray-100" 
            : error 
              ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" 
              : "border-gray-200 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
        }`}
      />
    </div>
    {error && <p className="mt-1 text-xs text-red-500 animate-in fade-in slide-in-from-top-1 ml-1 font-medium">{error}</p>}
  </div>
);

const SelectGroupSimple = ({ value, onChange, options, placeholder, error }) => (
  <select
    value={value}
    onChange={onChange}
    className={`block w-full rounded-xl border-2 bg-gray-50/30 px-4 py-4 text-gray-900 shadow-sm transition-all focus:ring-4 focus:ring-emerald-500/10 outline-none font-medium appearance-none ${
        error ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-emerald-600'
    }`}
  >
    <option value="">{placeholder}</option>
    {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
  </select>
);

const SelectGroup = ({ label, value, onChange, options, icon, disabled = false, error = null }) => (
  <div className="space-y-2">
    <label className={`text-xs font-bold uppercase tracking-widest ml-1 transition-colors ${error ? 'text-red-500' : 'text-gray-400'}`}>
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
        <option value="">{disabled && !value ? "Loading..." : `Select ${label}`}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
      <div className={`absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400`}>
         <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
      </div>
    </div>
    {error && <p className="mt-1 text-xs text-red-500 animate-in fade-in slide-in-from-top-1 ml-1 font-medium">{error}</p>}
  </div>
);

export default PersonalDetails;
