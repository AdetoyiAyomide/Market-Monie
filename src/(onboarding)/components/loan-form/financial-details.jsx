import { useEffect, useMemo, useRef, useState } from "react";
import { FiDollarSign, FiCreditCard, FiActivity, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { banks } from "../../../store/Data";

const FinancialDetails = ({ data, onChange, onContinue, onBack }) => {
  const [isBankOpen, setIsBankOpen] = useState(false);
  const [bankQuery, setBankQuery] = useState(data.bankName || "");
  const [errors, setErrors] = useState({});
  const bankDropdownRef = useRef(null);

  const filteredBanks = useMemo(() => {
    const query = bankQuery.trim().toLowerCase();

    if (!query) return banks;

    return banks.filter((bank) => bank.toLowerCase().includes(query));
  }, [bankQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bankDropdownRef.current && !bankDropdownRef.current.contains(event.target)) {
        setIsBankOpen(false);
        setBankQuery(data.bankName || "");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [data.bankName]);

  useEffect(() => {
    setBankQuery(data.bankName || "");
  }, [data.bankName]);

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="hidden sm:block text-left font-poppins">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
           Loan & Bank Details
        </h2>
        <p className="mt-2 text-gray-500 dark:text-white text-sm">
          Please provide the loan amount and the bank account for disbursement.
        </p>
      </div>

      <div className="mt-3 space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 dark:text-white tracking-widest ml-1">
             How Much Do You Want To Borrow?
          </label>
          <div className="relative group">
            <input
              type="text"
              inputMode="decimal"
              value={data.loanAmount}
              onChange={(e) => {
                const val = e.target.value;
                if (/[^0-9.]/.test(val)) {
                  setErrors(prev => ({ ...prev, loanAmount: "Please enter a valid amount using numbers only." }));
                } else {
                  setErrors(prev => ({ ...prev, loanAmount: null }));
                }
                // Allow user to type letters so they can see the error, or filter them out?
                // The prompt says "letters instead of numbers in how much do want to borrow input field inline error message"
                // This means the input shouldn't replace letters immediately if we want to show an error, or it should show the error.
                onChange("loanAmount", val);
              }}
              onBlur={() => {
                if (data.loanAmount && !/[^0-9.]/.test(data.loanAmount) && !data.loanAmount.includes('.')) {
                  onChange("loanAmount", `${data.loanAmount}.00`);
                }
              }}
              placeholder="e.g. 100,000"
              className={`block w-full rounded-xl border-2 bg-gray-50/30 dark:bg-black dark:text-white dark:placeholder-white px-4 pr-4 py-4 text-gray-900 dark:text-white shadow-sm transition-all outline-none font-bold text-lg ${
                errors.loanAmount 
                  ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                  : data.loanAmount 
                    ? "border-emerald-500 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10" 
                    : "border-gray-200 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
              }`}
            />
          </div>
          {errors.loanAmount && <p className="mt-1 text-xs text-red-500 animate-in fade-in slide-in-from-top-1 ml-1 font-medium">{errors.loanAmount}</p>}
        </div>

        <CustomSelectGroup 
          label="What is the name of your bank?" 
          value={data.bankName} 
          query={bankQuery}
          isOpen={isBankOpen}
          onToggle={() => setIsBankOpen((prev) => !prev)}
          onInputChange={(e) => {
            setBankQuery(e.target.value);
            setIsBankOpen(true);
            onChange('bankName', '');
          }}
          onSelect={(value) => {
            setIsBankOpen(false);
            setBankQuery(value);
            onChange('bankName', value);
          }}
          options={filteredBanks}
          dropdownRef={bankDropdownRef}
          placeholder="Select your bank"
          icon={<FiActivity />} 
        />

        <div className="space-y-2">
          <label className={`text-xs font-bold tracking-widest ml-1 transition-colors ${data.accountNumber?.length === 10 ? 'text-emerald-600' : 'text-gray-400 dark:text-white'}`}>
            What is your account number?
          </label>
          <div className="relative group">
            <input
              type="text"
              inputMode="numeric"
              value={data.accountNumber || ""}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                onChange('accountNumber', val);
              }}
              placeholder="Enter 10 digit account number"
              className={`block w-full rounded-xl border-2 bg-gray-50/30 dark:bg-black dark:text-white dark:placeholder-white px-4 py-4 text-gray-900 dark:text-white shadow-sm transition-all outline-none font-medium ${
                data.accountNumber?.length === 10
                  ? "border-emerald-500 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10" 
                  : "border-gray-200 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
              }`}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <span className={`text-[10px] font-bold transition-colors ${data.accountNumber?.length === 10 ? "text-emerald-500" : "text-gray-300 dark:text-white"}`}>
                {(data.accountNumber?.length || 0)}/10
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-10">
          <button
            onClick={onBack}
            className="flex-1 rounded-xl border-2 border-gray-100 py-4 text-sm font-semibold text-gray-600 dark:text-white hover:bg-gray-50 transition-all font-poppins"
          >
            Back
          </button>
          <button
            onClick={onContinue}
            disabled={!data.loanAmount || errors.loanAmount || !data.bankName || data.accountNumber.length < 10}
            className="flex-1 rounded-xl bg-emerald-600 py-4 text-sm font-semibold text-white shadow-xl shadow-emerald-200/50 hover:bg-emerald-500 disabled:opacity-50 transition-all font-poppins"
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
    <label className="text-xs font-bold text-gray-400 dark:text-white tracking-widest ml-1">
      {label}
    </label>
    <div className="relative group">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`block w-full rounded-xl border-2 bg-gray-50/30 dark:bg-black dark:text-white dark:placeholder-white px-4 pr-4 py-4 text-gray-900 dark:text-white shadow-sm transition-all outline-none font-medium ${
          value 
            ? "border-emerald-500 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10" 
            : "border-gray-200 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
        }`}
      />
    </div>
  </div>
);

const CustomSelectGroup = ({ label, value, query, isOpen, onToggle, onInputChange, onSelect, options, icon, disabled = false, dropdownRef, placeholder }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-gray-400 dark:text-white tracking-widest ml-1">
      {label}
    </label>
    <div className="relative group" ref={dropdownRef}>
      <input
        type="text"
        value={query}
        onFocus={() => !disabled && onToggle()}
        onClick={() => !disabled && onToggle()}
        onChange={onInputChange}
        disabled={disabled}
        placeholder={disabled ? "Loading..." : placeholder || `Select ${label}`}
        className={`block w-full rounded-xl border-2 bg-gray-50/30 dark:bg-black dark:text-white dark:placeholder-white px-4 pr-11 py-4 text-gray-900 dark:text-white shadow-sm transition-all outline-none font-medium ${
          disabled 
            ? "opacity-50 grayscale cursor-not-allowed border-gray-100 dark:border-gray-800" 
            : value
              ? "border-emerald-500 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
              : "border-gray-200 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
        }`}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400 dark:text-white">
        {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
      </div>
      {isOpen && !disabled && (
        <div className="absolute left-0 right-0 top-[calc(100%+0.35rem)] z-20 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-xl">
          <ul className="max-h-56 overflow-y-auto py-2">
            {options.length > 0 ? (
              options.map((opt) => (
                <li
                  key={opt}
                  onClick={() => onSelect(opt)}
                  className={`cursor-pointer px-4 py-3 text-xs sm:text-sm font-medium dark:text-white transition-colors hover:bg-emerald-50 hover:text-emerald-700 ${
                    value === opt ? "text-emerald-700 bg-emerald-50" : "text-gray-700"
                  }`}
                >
                  {opt}
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-sm text-gray-400 dark:text-white">No results found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  </div>
);

export default FinancialDetails;
