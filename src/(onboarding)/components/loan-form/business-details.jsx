import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const BusinessDetails = ({ data, onChange, onContinue, onBack }) => {
  const [isBusinessTypeOpen, setIsBusinessTypeOpen] = useState(false);
  const [isBusinessYearsOpen, setIsBusinessYearsOpen] = useState(false);
  const [isDailySalesOpen, setIsDailySalesOpen] = useState(false);
  const businessTypeDropdownRef = useRef(null);
  const businessYearsDropdownRef = useRef(null);
  const dailySalesDropdownRef = useRef(null);

  const [errors, setErrors] = useState({});

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (businessTypeDropdownRef.current && !businessTypeDropdownRef.current.contains(event.target)) {
        setIsBusinessTypeOpen(false);
      }

      if (businessYearsDropdownRef.current && !businessYearsDropdownRef.current.contains(event.target)) {
        setIsBusinessYearsOpen(false);
      }

      if (dailySalesDropdownRef.current && !dailySalesDropdownRef.current.contains(event.target)) {
        setIsDailySalesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBusinessTypeSelect = (value) => {
    setIsBusinessTypeOpen(false);
    onChange("businessType", value);
    setErrors(prev => ({ ...prev, businessType: null }));
  };

  const handleBusinessYearsSelect = (value) => {
    setIsBusinessYearsOpen(false);
    onChange("businessYears", value);
    setErrors(prev => ({ ...prev, businessYears: null }));
  };

  const handleDailySalesSelect = (value) => {
    setIsDailySalesOpen(false);
    onChange("dailySales", value);
    setErrors(prev => ({ ...prev, dailySales: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!data.businessName) newErrors.businessName = "Required";
    if (!data.businessState) newErrors.businessState = "Required";
    if (!data.businessLga) newErrors.businessLga = "Required";
    if (!data.businessType) newErrors.businessType = "Required";
    if (data.businessType === "Other" && !data.otherBusiness) newErrors.otherBusiness = "Required";
    if (!data.businessYears) newErrors.businessYears = "Required";
    if (!data.dailySales) newErrors.dailySales = "Required";
    
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
           Business Details
        </h2>
        <p className="mt-2 text-gray-500 dark:text-white text-sm">
           Tell us about your business to help us understand your needs.
        </p>
      </div>

      <div className="mt-3 space-y-4">
        <InputGroup 
          label="Enter business name" 
          placeholder="e.g. Mama T store"
          value={data.businessName} 
          onChange={(e) => {
            onChange('businessName', e.target.value);
            setErrors(prev => ({ ...prev, businessName: null }));
          }}
          error={errors.businessName}
        />

        <div className="space-y-4 pt-2 pb-2">
          <label className="text-xs font-bold text-emerald-600 dark:text-white tracking-widest ml-1">
             Business Location
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest ml-1 text-emerald-600 dark:text-white">
                State
              </label>
              <div className="block w-full rounded-xl border-2 border-gray-100 dark:border-gray-800 bg-gray-100/50 dark:bg-black px-4 py-4 text-gray-500 dark:text-white font-medium text-sm">
                {data.businessState}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest ml-1 text-emerald-600 dark:text-white">
                LGA
              </label>
              <div className="block w-full rounded-xl border-2 border-gray-100 dark:border-gray-800 bg-gray-100/50 dark:bg-black px-4 py-4 text-gray-500 dark:text-white font-medium text-sm">
                {data.businessLga}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-widest ml-1 text-emerald-600 uppercase dark:text-white">
              Town / City
            </label>
            <div className="block w-full rounded-xl border-2 border-gray-100 dark:border-gray-800 bg-gray-100/50 dark:bg-black px-4 py-4 text-gray-500 dark:text-white font-medium text-sm">
              {data.businessTown}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-widest ml-1 text-emerald-600 uppercase dark:text-white">
              Area / Street Name
            </label>
            <div className="block w-full rounded-xl border-2 border-gray-100 dark:border-gray-800 bg-gray-100/50 dark:bg-black px-4 py-4 text-gray-500 dark:text-white font-medium text-sm">
              {data.businessArea || "Not Provided"}
            </div>
          </div>
        </div>

        <CustomSelectGroup 
          label="What is the nature of your business?" 
          value={data.businessType} 
          isOpen={isBusinessTypeOpen}
          onToggle={() => setIsBusinessTypeOpen((prev) => !prev)}
          onSelect={handleBusinessTypeSelect}
          options={businessKinds}
          dropdownRef={businessTypeDropdownRef}
          placeholder="e.g. Trading"
          error={errors.businessType}
        />

        {data.businessType === "Other" && (
          <div className="animate-in slide-in-from-top-2 duration-300">
            <InputGroup 
              label="Please specify your business type" 
              value={data.otherBusiness} 
              onChange={(e) => {
                onChange('otherBusiness', e.target.value);
                setErrors(prev => ({ ...prev, otherBusiness: null }));
              }}
              placeholder="e.g. Trading"
              error={errors.otherBusiness}
            />
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          <CustomSelectGroup 
            label="How many years have you been in business?" 
            value={data.businessYears} 
            isOpen={isBusinessYearsOpen}
            onToggle={() => setIsBusinessYearsOpen((prev) => !prev)}
            onSelect={handleBusinessYearsSelect}
            options={yearOptions}
            dropdownRef={businessYearsDropdownRef}
            placeholder="Select years in business"
            error={errors.businessYears}
          />
          <CustomSelectGroup 
            label="How much do you sell a day?" 
            value={data.dailySales} 
            isOpen={isDailySalesOpen}
            onToggle={() => setIsDailySalesOpen((prev) => !prev)}
            onSelect={handleDailySalesSelect}
            options={saleOptions}
            placeholder="Select daily sales range"
            dropdownRef={dailySalesDropdownRef}
            error={errors.dailySales}
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

const InputGroup = ({ label, value, onChange, placeholder, error }) => {
  const isValid = !error && value && value !== "";
  return (
    <div className="space-y-2">
      <label className={`text-xs font-bold tracking-widest ml-1 transition-colors ${error ? 'text-red-500' : (isValid ? 'text-emerald-600' : 'text-gray-400 dark:text-white')}`}>
        {label}
      </label>
      <div className="relative group">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`block w-full rounded-xl border-2 bg-gray-50/30 dark:bg-black dark:text-white dark:placeholder-white px-4 pr-4 py-4 text-gray-900 dark:text-white shadow-sm transition-all outline-none font-medium ${
            error 
              ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
              : isValid
                ? "border-emerald-500 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
                : "border-gray-200 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
          }`}
        />
      </div>
    </div>
  );
};


const CustomSelectGroup = ({ label, value, isOpen, onToggle, onSelect, options, disabled = false, dropdownRef, placeholder, error }) => {
  const isValid = !error && value && value !== "";
  return (
    <div className="space-y-2">
      <label className={`text-xs font-bold tracking-widest ml-1 transition-colors ${error ? 'text-red-500' : (isValid ? 'text-emerald-600' : 'text-gray-400 dark:text-white')}`}>
        {label}
      </label>
      <div className="relative group" ref={dropdownRef}>
        <button
          type="button"
          onClick={onToggle}
          disabled={disabled}
          className={`block w-full rounded-xl border-2 bg-gray-50/30 dark:bg-black dark:text-white px-4 pr-11 py-4 text-left shadow-sm transition-all outline-none font-medium ${
            disabled 
              ? "opacity-50 grayscale cursor-not-allowed border-gray-100 dark:border-gray-800" 
              : error
                ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                : isValid
                  ? "border-emerald-500 text-gray-900 dark:text-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
                  : "border-gray-200 text-gray-400 dark:text-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
          }`}
        >
          <span className={value ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-white"}>
          {disabled && !value 
            ? "Loading..." 
            : value || placeholder || "Select Option"}
        </span>
        </button>
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400 dark:text-white">
          {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        </div>
        {isOpen && !disabled && (
          <div className="absolute left-0 right-0 top-[calc(100%+0.35rem)] z-50 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-xl">
            <ul className="max-h-56 overflow-y-auto py-2">
              {options.map((opt) => (
                <li
                  key={opt}
                  onClick={() => onSelect(opt)}
                  className={`cursor-pointer px-4 py-3 text-xs sm:text-sm font-medium transition-colors hover:bg-emerald-50 hover:text-emerald-700 ${
                    value === opt ? "text-emerald-700 bg-emerald-50" : "text-gray-700 dark:text-white"
                  }`}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessDetails;
