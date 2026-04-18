import { useEffect, useMemo, useRef, useState } from "react";
import { FiBriefcase, FiMapPin, FiTrendingUp, FiClock, FiType, FiLoader, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { locationService } from "../../../services/locationService";

const BusinessDetails = ({ data, onChange, onContinue, onBack }) => {
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [isLgaOpen, setIsLgaOpen] = useState(false);
  const [isBusinessTypeOpen, setIsBusinessTypeOpen] = useState(false);
  const [isBusinessYearsOpen, setIsBusinessYearsOpen] = useState(false);
  const [isDailySalesOpen, setIsDailySalesOpen] = useState(false);
  const [stateQuery, setStateQuery] = useState(data.businessState || "");
  const stateDropdownRef = useRef(null);
  const lgaDropdownRef = useRef(null);
  const businessTypeDropdownRef = useRef(null);
  const businessYearsDropdownRef = useRef(null);
  const dailySalesDropdownRef = useRef(null);

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

  const filteredStates = useMemo(() => {
    const query = stateQuery.trim().toLowerCase();

    if (!query) return states;

    return states.filter((state) => state.toLowerCase().includes(query));
  }, [stateQuery, states]);

  useEffect(() => {
    setStateQuery(data.businessState || "");
  }, [data.businessState]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target)) {
        setIsStateOpen(false);
        setStateQuery(data.businessState || "");
      }

      if (lgaDropdownRef.current && !lgaDropdownRef.current.contains(event.target)) {
        setIsLgaOpen(false);
      }

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
  }, [data.businessState]);

  const handleStateInputChange = (e) => {
    const value = e.target.value;
    setStateQuery(value);
    setIsStateOpen(true);
    onChange("businessState", "");
    onChange("businessLga", "");
  };

  const handleStateSelect = (state) => {
    setStateQuery(state);
    setIsStateOpen(false);
    setIsLgaOpen(false);
    onChange("businessState", state);
    onChange("businessLga", "");
  };

  const handleBusinessTypeSelect = (value) => {
    setIsBusinessTypeOpen(false);
    onChange("businessType", value);
  };

  const handleBusinessYearsSelect = (value) => {
    setIsBusinessYearsOpen(false);
    onChange("businessYears", value);
  };

  const handleDailySalesSelect = (value) => {
    setIsDailySalesOpen(false);
    onChange("dailySales", value);
  };

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
          label="Enter business name" 
          placeholder="e.g. Mama T store"
          value={data.businessName} 
          onChange={(e) => onChange('businessName', e.target.value)}
          icon={<FiBriefcase />} 
        />

        <div className="space-y-4 pt-2 pb-2">
          <label className="text-xs font-bold text-emerald-600 tracking-widest ml-1">
             Business Location
          </label>
          <div className="grid grid-cols-2 gap-4">
            <SearchableSelectGroup 
              label="State" 
              value={data.businessState} 
              query={stateQuery}
              isOpen={isStateOpen}
              onToggle={() => setIsStateOpen((prev) => !prev)}
              onInputChange={handleStateInputChange}
              onSelect={handleStateSelect}
              options={states}
              filteredOptions={filteredStates}
              dropdownRef={stateDropdownRef}
              icon={loadingStates ? <FiLoader className="animate-spin" /> : <FiMapPin />} 
              disabled={loadingStates}
            />
            <CustomSelectGroup 
              label="LGA" 
              value={data.businessLga} 
              isOpen={isLgaOpen}
              onToggle={() => !(!data.businessState || loadingLgas) && setIsLgaOpen((prev) => !prev)}
              onSelect={(value) => {
                setIsLgaOpen(false);
                onChange('businessLga', value);
              }}
              options={lgas}
              dropdownRef={lgaDropdownRef}
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

        <CustomSelectGroup 
          label="What kind of business are you into?" 
          value={data.businessType} 
          isOpen={isBusinessTypeOpen}
          onToggle={() => setIsBusinessTypeOpen((prev) => !prev)}
          onSelect={handleBusinessTypeSelect}
          options={businessKinds}
          dropdownRef={businessTypeDropdownRef}
          icon={<FiBriefcase />} 
          placeholder="e.g. Trading"
        />

        {data.businessType === "Other" && (
          <div className="animate-in slide-in-from-top-2 duration-300">
            <InputGroup 
              label="Please specify your business type" 
              value={data.otherBusiness} 
              onChange={(e) => onChange('otherBusiness', e.target.value)}
              placeholder="e.g. Trading"
              icon={<FiType />} 
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
            icon={<FiClock />} 
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
    <label className="text-xs font-bold text-gray-400 tracking-widest ml-1">
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

const SearchableSelectGroup = ({
  label,
  value,
  query,
  isOpen,
  onToggle,
  onInputChange,
  onSelect,
  options,
  filteredOptions,
  icon,
  disabled = false,
  dropdownRef,
}) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-gray-400 tracking-widest ml-1">
      {label}
    </label>
    <div className="relative group" ref={dropdownRef}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-emerald-600 transition-colors">
        {icon}
      </div>
      <input
        type="text"
        value={query}
        onFocus={() => !disabled && onToggle()}
        onClick={() => !disabled && onToggle()}
        onChange={onInputChange}
        disabled={disabled}
        placeholder={disabled ? "Loading..." : `Select ${label}`}
        className={`block w-full rounded-xl border-gray-200 border-2 bg-gray-50/30 pl-11 pr-11 py-4 text-gray-900 shadow-sm transition-all focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none font-medium ${
          disabled ? "opacity-50 grayscale cursor-not-allowed" : ""
        }`}
      />
      <button
        type="button"
        onClick={() => !disabled && onToggle()}
        className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400"
        aria-label={`Toggle ${label} dropdown`}
      >
        {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
      </button>
      {isOpen && !disabled && (
        <div className="absolute left-0 right-0 top-[calc(100%+0.35rem)] z-20 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
          <ul className="max-h-56 overflow-y-auto py-2">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <li
                  key={opt}
                  onClick={() => onSelect(opt)}
                  className={`cursor-pointer px-4 py-3 text-sm font-medium transition-colors hover:bg-emerald-50 hover:text-emerald-700 ${
                    value === opt ? "text-emerald-700 bg-emerald-50" : "text-gray-700"
                  }`}
                >
                  {opt}
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-sm text-gray-400">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  </div>
);

const CustomSelectGroup = ({ label, value, isOpen, onToggle, onSelect, options, icon, disabled = false, dropdownRef, placeholder }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-gray-400 tracking-widest ml-1">
      {label}
    </label>
    <div className="relative group" ref={dropdownRef}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-emerald-600 transition-colors">
        {icon}
      </div>
      <button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        className={`block w-full rounded-xl border-gray-200 border-2 bg-gray-50/30 pl-11 pr-11 py-4 text-left text-gray-900 shadow-sm transition-all focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none font-medium ${
          disabled ? "opacity-50 grayscale cursor-not-allowed" : ""
        }`}
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
        {disabled && !value 
          ? "Loading..." 
          : value || placeholder || `Select ${label}`}
      </span>
      </button>
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
        {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
      </div>
      {isOpen && !disabled && (
        <div className="absolute left-0 right-0 top-[calc(100%+0.35rem)] z-20 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
          <ul className="max-h-56 overflow-y-auto py-2">
            {options.map((opt) => (
              <li
                key={opt}
                onClick={() => onSelect(opt)}
                className={`cursor-pointer px-4 py-3 text-sm font-medium transition-colors hover:bg-emerald-50 hover:text-emerald-700 ${
                  value === opt ? "text-emerald-700 bg-emerald-50" : "text-gray-700"
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

export default BusinessDetails;
