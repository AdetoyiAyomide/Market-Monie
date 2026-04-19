import { useEffect, useMemo, useRef, useState } from "react";
import { FiHome, FiMap, FiType, FiLoader, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { locationService } from "../../../services/locationService";

const AddressDetails = ({ data, onChange, onContinue, onBack }) => {
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [isLgaOpen, setIsLgaOpen] = useState(false);
  const [stateQuery, setStateQuery] = useState(data.state || "");
  const stateDropdownRef = useRef(null);
  const lgaDropdownRef = useRef(null);

  const [errors, setErrors] = useState({});

  // Real-time validation for green highlight
  const isValid = (field) => !errors[field] && data[field] && data[field] !== "";

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

  const filteredStates = useMemo(() => {
    const query = stateQuery.trim().toLowerCase();

    if (!query) return states;

    return states.filter((state) => state.toLowerCase().includes(query));
  }, [stateQuery, states]);

  useEffect(() => {
    setStateQuery(data.state || "");
  }, [data.state]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target)) {
        setIsStateOpen(false);
        setStateQuery(data.state || "");
      }

      if (lgaDropdownRef.current && !lgaDropdownRef.current.contains(event.target)) {
        setIsLgaOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [data.state]);

  const handleStateInputChange = (e) => {
    const value = e.target.value;
    setStateQuery(value);
    setIsStateOpen(true);
    onChange("state", "");
    onChange("lga", "");
  };

  const handleStateSelect = (state) => {
    setStateQuery(state);
    setIsStateOpen(false);
    setIsLgaOpen(false);
    onChange("state", state);
    onChange("lga", "");
    setErrors(prev => ({ ...prev, state: null }));
  };

  const handleLgaSelect = (lga) => {
    setIsLgaOpen(false);
    onChange("lga", lga);
    setErrors(prev => ({ ...prev, lga: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!data.state) newErrors.state = "Required";
    if (!data.lga) newErrors.lga = "Required";
    if (!data.area) newErrors.area = "Required";
    if (!data.houseAddress) newErrors.houseAddress = "Required";
    
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
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
           Residential Address
        </h2>
        <p className="mt-2 text-gray-500 text-sm">
          Tell us where you live so we can personalize your experience.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <SearchableSelectGroup 
            label="State" 
            value={data.state} 
            query={stateQuery}
            isOpen={isStateOpen}
            onToggle={() => setIsStateOpen((prev) => !prev)}
            onInputChange={handleStateInputChange}
            onSelect={handleStateSelect}
            options={states}
            filteredOptions={filteredStates}
            dropdownRef={stateDropdownRef}
            icon={loadingStates ? <FiLoader className="animate-spin" /> : <FiMap />} 
            disabled={loadingStates}
            error={errors.state}
          />
          <CustomSelectGroup 
            label="LGA" 
            value={data.lga} 
            isOpen={isLgaOpen}
            onToggle={() => !(!data.state || loadingLgas) && setIsLgaOpen((prev) => !prev)}
            onSelect={handleLgaSelect}
            options={lgas}
            dropdownRef={lgaDropdownRef}
            disabled={!data.state || loadingLgas}
            icon={loadingLgas ? <FiLoader className="animate-spin text-emerald-600" /> : <FiType />} 
            error={errors.lga}
          />
        </div>

        <InputGroup 
          label="Area / Street" 
          value={data.area} 
          onChange={(e) => {
            onChange('area', e.target.value);
            setErrors(prev => ({ ...prev, area: null }));
          }}
          placeholder="Enter your area or street"
          icon={<FiMap />} 
          error={errors.area}
        />

        <InputGroup 
          label="House Number" 
          value={data.houseAddress} 
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, ''); // Number only
            onChange('houseAddress', val);
            setErrors(prev => ({ ...prev, houseAddress: null }));
          }}
          placeholder="Enter house number"
          icon={<FiHome />} 
          error={errors.houseAddress}
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

const InputGroup = ({ label, value, onChange, icon, placeholder, error }) => {
  const isValid = !error && value && value !== "";
  return (
    <div className="space-y-2">
      <label className={`text-xs font-bold tracking-widest ml-1 transition-colors ${error ? 'text-red-500' : (isValid ? 'text-emerald-600' : 'text-gray-400')}`}>
        {label}
      </label>
      <div className="relative group">
        <div className={`absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors ${error ? 'text-red-400' : (isValid ? 'text-emerald-500' : 'text-gray-400')}`}>
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
              : isValid
                ? "border-emerald-500 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
                : "border-gray-200 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
          }`}
        />
      </div>
    </div>
  );
};

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
  error
}) => {
  const isValid = !error && value && value !== "";
  return (
    <div className="space-y-2">
      <label className={`text-xs font-bold tracking-widest ml-1 transition-colors ${error ? 'text-red-500' : (isValid ? 'text-emerald-600' : 'text-gray-400')}`}>
        {label}
      </label>
      <div className="relative group" ref={dropdownRef}>
        <div className={`absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors ${error ? 'text-red-400' : (isValid ? 'text-emerald-500' : 'text-gray-400')}`}>
          {icon}
        </div>
        <input
          type="text"
          value={isOpen ? query : (value || "")}
          onFocus={() => !disabled && onToggle()}
          onClick={() => !disabled && onToggle()}
          onChange={onInputChange}
          disabled={disabled}
          placeholder={disabled ? "Loading..." : `Select ${label}`}
          className={`block w-full rounded-xl border-2 bg-gray-50/30 pl-11 pr-11 py-4 text-gray-900 shadow-sm transition-all outline-none font-medium ${
            disabled 
              ? "opacity-50 grayscale cursor-not-allowed border-gray-100" 
              : error
                ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                : isValid
                  ? "border-emerald-500 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
                  : "border-gray-200 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
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
          <div className="absolute left-0 right-0 top-[calc(100%+0.35rem)] z-50 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
            <ul className="max-h-56 overflow-y-auto py-2">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                  <li
                    key={opt}
                    onClick={() => onSelect(opt)}
                    className={`cursor-pointer px-4 py-3 text-xs sm:text-sm font-medium transition-colors hover:bg-emerald-50 hover:text-emerald-700 ${
                      value === opt ? "text-emerald-700 bg-emerald-50" : "text-gray-700"
                    }`}
                  >
                    {opt}
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-sm text-gray-400 text-center">No results found</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const CustomSelectGroup = ({ label, value, isOpen, onToggle, onSelect, options, icon, disabled = false, dropdownRef, error }) => {
  const isValid = !error && value && value !== "";
  return (
    <div className="space-y-2">
      <label className={`text-xs font-bold tracking-widest ml-1 transition-colors ${error ? 'text-red-500' : (isValid ? 'text-emerald-600' : 'text-gray-400')}`}>
        {label}
      </label>
      <div className="relative group" ref={dropdownRef}>
        <div className={`absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors ${error ? 'text-red-400' : (isValid ? 'text-emerald-500' : 'text-gray-400')}`}>
          {icon}
        </div>
        <button
          type="button"
          onClick={onToggle}
          disabled={disabled}
          className={`block w-full rounded-xl border-2 bg-gray-50/30 pl-11 pr-11 py-4 text-left text-gray-900 shadow-sm transition-all outline-none font-medium ${
            disabled 
              ? "opacity-50 grayscale cursor-not-allowed border-gray-100" 
              : error
                ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                : isValid
                  ? "border-emerald-500 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
                  : "border-gray-200 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
          }`}
        >
          <span className={value ? "text-gray-900" : "text-gray-400"}>
            {disabled && !value ? "Loading..." : value || "Select LGA"}
          </span>
        </button>
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
          {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        </div>
        {isOpen && !disabled && (
          <div className="absolute left-0 right-0 top-[calc(100%+0.35rem)] z-50 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
            <ul className="max-h-56 overflow-y-auto py-2">
              {options.map((opt) => (
                <li
                  key={opt}
                  onClick={() => onSelect(opt)}
                  className={`cursor-pointer px-4 py-3 text-xs sm:text-sm font-medium transition-colors hover:bg-emerald-50 hover:text-emerald-700 ${
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
};

export default AddressDetails;
