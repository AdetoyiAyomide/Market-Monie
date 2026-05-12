import { useState, useEffect, useRef } from "react";
import { FiUser, FiMail, FiCalendar, FiHome, FiMapPin, FiMap, FiType, FiLoader, FiHash, FiChevronUp, FiChevronDown, FiAlertCircle } from "react-icons/fi";

import { getDaysInMonth, eachMonthOfInterval, startOfYear, endOfYear, format } from 'date-fns';
import { useQuery } from "@tanstack/react-query";
import { locationService } from "../../../services/locationService";

/**
 * Reusable input component for the form
 */
const InputGroup = ({ label, value, onChange, icon, placeholder, readOnly = false, error = null }) => (
  <div className="space-y-2">
    <label className={`text-xs font-bold tracking-widest ml-1 transition-colors ${error ? 'text-red-500' : (value && !readOnly ? 'text-emerald-600' : 'text-gray-400 dark:text-white')}`}>
      {label}
    </label>
    <div className="relative group">
      <input
        type="text"
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        className={`block w-full rounded-xl border-2 bg-gray-50/30 dark:bg-black dark:text-white dark:placeholder-white px-4 py-4 text-gray-900 shadow-sm transition-all outline-none font-medium ${
          readOnly 
            ? "bg-gray-100/80 text-gray-500 dark:text-white cursor-not-allowed border-gray-100" 
            : error 
              ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" 
              : value
                ? "border-emerald-500 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
                : "border-gray-200 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
        }`}
      />
    </div>
    {error && <p className="mt-1 text-xs text-red-500 animate-in fade-in slide-in-from-top-1 ml-1 font-medium">{error}</p>}
  </div>
);

/**
 * Simple select component for date parts
 */
const SelectGroupSimple = ({ value, onChange, options, placeholder, error, isValid }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between rounded-xl border-2 bg-gray-50/30 dark:bg-black px-4 py-4 text-left shadow-sm transition-all outline-none font-medium text-sm ${
          error 
            ? "border-red-300 focus:border-red-500" 
            : isValid 
              ? "border-emerald-500 focus:border-emerald-600" 
              : "border-gray-200 focus:border-emerald-600"
        }`}
      >
        <span className={value ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-white"}>
          {selectedLabel}
        </span>
        {isOpen ? <FiChevronUp className="text-gray-400 dark:text-white" /> : <FiChevronDown className="text-gray-400 dark:text-white" />}
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 max-h-60 overflow-y-auto rounded-xl border border-gray-200 bg-white dark:bg-black dark:border-gray-800 shadow-xl scrollbar-hide">
          <div className="py-2">
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange({ target: { value: opt.value } });
                  setIsOpen(false);
                }}
                className={`block w-full px-4 py-3 text-left text-sm transition-colors hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-gray-900 dark:hover:text-emerald-400 ${
                  value === opt.value ? "bg-emerald-50 text-emerald-700 font-bold dark:bg-gray-900 dark:text-emerald-400" : "text-gray-700 dark:text-white"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Custom searchable dropdown for locations and IDs
 */
const SelectGroup = ({ label, value, onChange, options, icon, disabled = false, error = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter(opt => 
    opt.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (opt) => {
    onChange(opt);
    setIsOpen(false);
    setQuery("");
  };

  const isValid = !error && value && value !== "";

  return (
    <div className="space-y-2" ref={dropdownRef}>
      <label className={`text-xs font-bold tracking-widest ml-1 transition-colors ${error ? 'text-red-500' : (isValid ? 'text-emerald-600' : 'text-gray-400 dark:text-white')}`}>
        {label}
      </label>
      <div className="relative group">
        <input
          type="text"
          value={isOpen ? query : (value || "")}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          readOnly={disabled}
          placeholder={`Select ${label}`}
          className={`block w-full rounded-xl border-2 bg-gray-50/30 dark:bg-black dark:text-white dark:placeholder-white px-4 pr-10 py-4 text-gray-900 shadow-sm transition-all outline-none font-medium ${
            disabled 
              ? "opacity-50 grayscale cursor-not-allowed border-gray-100" 
              : error
                ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                : isValid
                  ? "border-emerald-500 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
                  : "border-gray-200 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
          }`}
        />
        <div className={`absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400 dark:text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
           <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
        </div>

        {isOpen && !disabled && (
          <div className="absolute z-50 w-full mt-2 bg-white dark:bg-black border border-gray-100 dark:border-gray-800 dark:text-white rounded-xl shadow-2xl  max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <ul className="py-2">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt, i) => (
                  <li
                    key={i}
                    onClick={() => handleSelect(opt)}
                    className="px-4 py-3 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer text-sm font-medium transition-colors border-b border-gray-50 last:border-0"
                  >
                    {opt}
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-gray-400 dark:text-white text-sm italic">No results found for "{query}"</li>
              )}
            </ul>
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500 animate-in fade-in slide-in-from-top-1 ml-1 font-medium">{error}</p>}
    </div>
  );
};

const PersonalDetails = ({ data, onChange, onContinue, onBack, isGuest }) => {
  const [isTitleOpen, setIsTitleOpen] = useState(false);
  
  // Split DOB YYYY-MM-DD
  const dobParts = data.dob ? data.dob.split('-') : ['', '', ''];
  const currentYear = dobParts[0] || "";
  const currentMonth = dobParts[1] || "";
  const currentDay = dobParts[2] || "";

  // Dynamic days based on selection - Defensive calculation to prevent RangeError
  let maxDays = 31;
  try {
    if (currentYear && currentMonth) {
      const parsedYear = parseInt(currentYear);
      const parsedMonth = parseInt(currentMonth);
      if (!isNaN(parsedYear) && !isNaN(parsedMonth)) {
        maxDays = getDaysInMonth(new Date(parsedYear, parsedMonth - 1));
      }
    }
  } catch (e) {
    maxDays = 31;
  }

  const days = Array.from({ length: maxDays || 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  
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

  const titleOptions = ["Mr", "Mrs", "Ms"];
  const idOptions = ["NIN", "International Passport", "Driver’s License", "Voter's Card"];

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Real-time validation
    const newErrors = {};
    if (data.dob) {
      const parts = data.dob.split('-');
      if (!parts[0] || !parts[1] || !parts[2]) newErrors.dob = "Incomplete date of birth";
    }
    
    // We only set these if they've been touched or if we're in "error mode"
    // For now, let's just clear errors as they are fixed
    setErrors(prev => {
      const updated = { ...prev };
      if (data.firstname && updated.firstname) delete updated.firstname;
      if (data.lastname && updated.lastname) delete updated.lastname;
      if (data.phone && updated.phone) delete updated.phone;
      if (data.state && updated.state) delete updated.state;
      if (data.lga && updated.lga) delete updated.lga;
      if (data.area && updated.area) delete updated.area;
      if (data.houseAddress && updated.houseAddress) delete updated.houseAddress;
      if (data.idType && updated.idType) delete updated.idType;
      if (data.idNumber && updated.idNumber) delete updated.idNumber;
      if (data.bvn && updated.bvn) delete updated.bvn;
      return updated;
    });
  }, [data]);

  const validate = () => {
    const newErrors = {};
    if (!data.firstname) newErrors.firstname = "Required";
    if (!data.lastname) newErrors.lastname = "Required";
    if (!currentDay || !currentMonth || !currentYear) newErrors.dob = "Required";
    if (!data.bvn) newErrors.bvn = "Required";
    else if (data.bvn.length !== 11) newErrors.bvn = "BVN must be 11 digits";
    if (!data.phone) newErrors.phone = "Required";
    if (!data.state) newErrors.state = "Required";
    if (!data.lga) newErrors.lga = "Required";
    if (!data.area) newErrors.area = "Required";
    if (!data.houseAddress) newErrors.houseAddress = "Required";
    if (!data.idType) newErrors.idType = "Required";
    if (!data.idNumber) newErrors.idNumber = "Required";
    
    if (isGuest) {
      if (!data.email) {
        newErrors.email = "Required";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
          newErrors.email = "Invalid email format";
        }
      }
    }
    
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
      <div className="hidden sm:block text-left font-poppins">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Personal Details
        </h2>
        <p className="mt-2 text-gray-500 dark:text-white text-sm">
          Please confirm your personal information and residential address.
        </p>
      </div>

      <div className="mt-3 space-y-4 pb-20">
        {/* Title, First, and Last Name Row */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-2 md:gap-4 items-end">
          <div className="col-span-2 md:col-span-2 flex md:block items-center justify-between md:justify-start gap-4">
             <label className={`text-[10px] font-bold tracking-widest ml-1 transition-colors whitespace-nowrap mb-0 md:mb-2 ${errors.title ? 'text-red-500' : 'text-black dark:text-white'}`}>
               TITLE
             </label>
             <div className="relative w-24 md:w-full">
                 <button
                  type="button"
                  disabled={!isGuest}
                  onClick={() => setIsTitleOpen(!isTitleOpen)}
                  className={`flex h-[50px] md:h-[60px] w-full items-center justify-between rounded-xl border-2 px-3 md:px-4 transition-all outline-none font-medium dark:bg-black dark:text-white ${
                    !isGuest
                      ? "border-gray-100 bg-gray-100/50 text-gray-500 dark:text-white cursor-not-allowed opacity-80"
                      : errors.title 
                        ? "border-red-300 bg-red-50/10" 
                        : data.title 
                          ? "border-emerald-500 bg-gray-50/30 text-gray-900" 
                          : "border-gray-200 bg-gray-50/30 text-gray-400 dark:text-white"
                  }`}
                >
                  <span className="text-xs font-bold">
                    {data.title || "Mr"}
                  </span>
                  {isGuest && (isTitleOpen ? <FiChevronUp /> : <FiChevronDown />)}
                </button>

                {isTitleOpen && (
                  <div className="absolute z-50 mt-2 w-32 rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden left-auto right-0 md:right-auto md:left-0">
                    <div className="py-1">
                      {titleOptions.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => {
                            onChange('title', t);
                            setIsTitleOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-3 text-sm transition-colors hover:bg-emerald-50 hover:text-emerald-700 ${
                            data.title === t ? "bg-emerald-50 text-emerald-700 font-bold" : "text-gray-700"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
             </div>
          </div>
          <div className="col-span-1 md:col-span-5">
            <InputGroup 
              label="First Name" 
              value={data.firstname} 
              onChange={(e) => onChange('firstname', e.target.value)}
              icon={<FiUser />} 
              readOnly={!isGuest}
              error={errors.firstname}
            />
          </div>
          <div className="col-span-1 md:col-span-5">
            <InputGroup 
              label="Last Name" 
              value={data.lastname} 
              onChange={(e) => onChange('lastname', e.target.value)}
              icon={<FiUser />} 
              readOnly={!isGuest}
              error={errors.lastname}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className={`text-xs font-bold tracking-widest ml-1 transition-colors ${errors.phone ? 'text-red-500' : (data.phone ? 'text-emerald-600' : 'text-gray-400 dark:text-white')}`}>
              Phone Number
            </label>
            <div className="relative group">
              <div className={`absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500 dark:text-white font-medium sm:text-sm z-10 transition-colors ${errors.phone ? 'text-red-400' : (data.phone ? 'text-emerald-500' : 'text-gray-400 dark:text-white')}`}>
                +234 (0)
              </div>
              <input
                type="tel"
                readOnly={!isGuest}
                value={(data.phone || "").replace(/^\+234/, '').replace(/^\(\+234\) 0/, '').replace(/^\+234 \(0\)/, '').trim()}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                  onChange('phone', val);
                  if (errors.phone) setErrors(prev => ({ ...prev, phone: null }));
                }}
                placeholder="812 345 6789"
                className={`block w-full rounded-xl border-2 px-4 py-4 text-gray-900 shadow-sm transition-all outline-none font-medium sm:text-sm pl-[88px] pr-4 dark:bg-black dark:text-white dark:placeholder-white ${
                  !isGuest
                    ? "bg-gray-100/80 text-gray-500 dark:text-white cursor-not-allowed border-gray-100"
                    : errors.phone 
                      ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" 
                      : data.phone
                        ? "border-emerald-500 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
                        : "border-gray-200 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
                }`}
              />
            </div>
            {errors.phone && <p className="mt-1 text-xs text-red-500 animate-in fade-in slide-in-from-top-1 ml-1 font-medium">{errors.phone}</p>}
          </div>

          {/* Email Address - Only for Guests */}
          {isGuest && (
            <InputGroup 
              label={<>Email Address <span className="text-gray-400 dark:text-white font-normal normal-case ml-1">(optional)</span></>} 
              value={data.email} 
              onChange={(e) => onChange('email', e.target.value)}
              placeholder="e.g. john@example.com"
              icon={<FiMail />} 
              error={errors.email}
            />
          )}
        </div>

        <div className="space-y-2">
          <label className={`text-xs font-bold tracking-widest ml-1 mb-2 block ${errors.dob ? 'text-red-500' : (data.dob ? 'text-emerald-600' : 'text-gray-400 dark:text-white')}`}>
            Date of Birth
          </label>
          <div className="grid grid-cols-3 gap-3">
            <SelectGroupSimple
              value={currentDay}
              onChange={(e) => handleDateChange('day', e.target.value)}
              options={days.map(d => ({ label: d, value: d }))}
              placeholder="Day"
              error={!!errors.dob}
              isValid={!!currentDay}
            />
            <SelectGroupSimple
              value={currentMonth}
              onChange={(e) => handleDateChange('month', e.target.value)}
              options={months.map(m => ({ label: m.name, value: m.value }))}
              placeholder="Month"
              error={!!errors.dob}
              isValid={!!currentMonth}
            />
            <SelectGroupSimple
              value={currentYear}
              onChange={(e) => handleDateChange('year', e.target.value)}
              options={years.map(y => ({ label: y, value: y }))}
              placeholder="Year"
              error={!!errors.dob}
              isValid={!!currentYear}
            />
          </div>
          {errors.dob && <p className="mt-1 text-xs text-red-500 animate-in fade-in slide-in-from-top-1 ml-1 font-medium">{errors.dob}</p>}
        </div>

        {/* BVN Field (Moved from separate screen) */}
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <label className={`text-xs font-bold tracking-widest ml-1 transition-colors ${errors.bvn ? 'text-red-500' : (data.bvn ? 'text-emerald-600' : 'text-black dark:text-white')}`}>
              BVN
            </label>
            <div className="relative group">
              <input
                type="text"
                inputMode="numeric"
                value={data.bvn || ""}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  if (val.length <= 11) {
                    onChange('bvn', val);
                    if (errors.bvn) setErrors(prev => ({ ...prev, bvn: null }));
                  }
                }}
                placeholder="Enter your 11-digit BVN"
                className={`block w-full rounded-xl border-2 bg-gray-50/30 dark:bg-black dark:text-white dark:placeholder-white px-4 py-4 text-gray-900 shadow-sm transition-all outline-none font-medium text-sm ${
                  errors.bvn 
                    ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                    : (data.bvn?.length === 11)
                      ? "border-emerald-500 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
                      : "border-gray-200 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
                }`}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <span className={`text-[10px] font-bold transition-colors ${(data.bvn?.length || 0) === 11 ? "text-emerald-500" : "text-gray-300 dark:text-white"}`}>
                  {(data.bvn?.length || 0)}/11
                </span>
              </div>
            </div>
            {errors.bvn && <p className="mt-1 text-xs text-red-500 animate-in fade-in slide-in-from-top-1 ml-1 font-medium">{errors.bvn}</p>}
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
            <FiAlertCircle className="text-amber-500 shrink-0 mt-0.5" size={14} />
            <p className="text-[10px] text-amber-800 leading-relaxed italic">
              Don&apos;t know your BVN?. Dial <span className="font-bold">*565*0#</span> on your registered mobile number to retrieve your BVN.
            </p>
          </div>
        </div>

        {/* New ID Section */}
        <div className="pt-6 border-t border-gray-100 space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 mb-2">
            <FiHash />
            <h3 className="text-xs font-bold tracking-widest">Identity Verification</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectGroup 
              label="ID Type" 
              value={data.idType} 
              onChange={(val) => {
                onChange('idType', val);
                onChange('idNumber', '');
                if (errors.idType) setErrors(prev => ({ ...prev, idType: null }));
              }}
              error={errors.idType}
              options={idOptions}
              icon={<FiType />} 
            />
            <div className="space-y-2">
              <label className={`text-xs font-bold tracking-widest ml-1 transition-colors ${errors.idNumber ? 'text-red-500' : (data.idNumber ? 'text-emerald-600' : 'text-black dark:text-white')}`}>
                ID Number
              </label>
              <div className="relative group">
                <input
                  type="text"
                  inputMode="numeric"
                  value={data.idNumber || ""}
                  onChange={(e) => {
                    const config = {
                      "NIN": { length: 11, pattern: /^\d*$/ },
                      "International Passport": { length: 9, pattern: /^[a-zA-Z0-9]*$/ },
                      "Driver’s License": { length: 12, pattern: /^[a-zA-Z0-9]*$/ },
                      "Voter's Card": { length: 9, pattern: /^[a-zA-Z0-9]*$/ }
                    }[data.idType] || { length: 15, pattern: /^[a-zA-Z0-9]*$/ };

                    const val = data.idType === "NIN" 
                      ? e.target.value.replace(/\D/g, '').slice(0, config.length)
                      : e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, config.length);

                    if (config.pattern.test(val)) {
                      onChange('idNumber', val);
                      if (errors.idNumber) setErrors(prev => ({ ...prev, idNumber: null }));
                    }
                  }}
                  placeholder={
                    data.idType === "NIN" ? "Enter 11-digit NIN" :
                    data.idType === "International Passport" ? "Enter 9-digit Passport No." :
                    data.idType === "Driver’s License" ? "Enter 12-digit License No." :
                    data.idType === "Voter's Card" ? "Enter Voter's Card No." :
                    "Enter ID number"
                  }
                  className={`block w-full rounded-xl border-2 bg-gray-50/30 dark:bg-black dark:text-white dark:placeholder-white px-4 py-4 text-gray-900 shadow-sm transition-all outline-none font-medium text-sm ${
                    errors.idNumber 
                      ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                      : (data.idNumber?.length === ({ "NIN": 11, "International Passport": 9, "Driver’s License": 12, "Voter's Card": 9 }[data.idType] || 15))
                        ? "border-emerald-500 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
                        : "border-gray-200 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
                  }`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <span className={`text-[10px] font-bold transition-colors ${(data.idNumber?.length || 0) === ({ "NIN": 11, "International Passport": 9, "Driver’s License": 12, "Voter's Card": 9 }[data.idType] || 15) ? "text-emerald-500" : "text-gray-300 dark:text-white"}`}>
                    {(data.idNumber?.length || 0)}/{({ "NIN": 11, "International Passport": 9, "Driver’s License": 12, "Voter's Card": 9 }[data.idType] || 15)}
                  </span>
                </div>
              </div>
              {errors.idNumber && <p className="mt-1 text-xs text-red-500 animate-in fade-in slide-in-from-top-1 ml-1 font-medium">{errors.idNumber}</p>}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 mb-2">
            <FiHome />
            <h3 className="text-xs font-bold tracking-widest">Residential Address</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <SelectGroup 
              label="State" 
              value={data.state} 
              onChange={(val) => {
                 onChange('state', val);
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
              onChange={(val) => {
                onChange('lga', val);
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
              const val = e.target.value.replace(/[^a-zA-Z\s]/g, '');
              onChange('area', val);
              if (errors.area) setErrors(prev => ({ ...prev, area: null }));
            }}
            error={errors.area}
            placeholder="Enter your area or street"
            icon={<FiMapPin />} 
          />

          <InputGroup 
            label="House Number" 
            value={data.houseAddress} 
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, ''); // Numbers only
              onChange('houseAddress', val);
              if (errors.houseAddress) setErrors(prev => ({ ...prev, houseAddress: null }));
            }}
            error={errors.houseAddress}
            placeholder="Enter house number"
            icon={<FiHome />} 
          />
        </div>

        <div className="flex gap-4 mt-10">
          <button
            onClick={onBack}
            className="flex-1 rounded-xl border-2 border-gray-100 py-4 text-sm font-semibold text-gray-600 dark:text-white hover:bg-gray-50 transition-all font-poppins"
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            className="flex-1 rounded-xl bg-emerald-600 py-4 text-sm font-semibold text-white shadow-xl shadow-emerald-200/50 hover:bg-emerald-500 transition-all font-poppins"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;

