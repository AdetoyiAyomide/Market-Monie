import { useEffect, useMemo, useRef, useState } from "react";
import { FiDollarSign, FiCreditCard, FiActivity, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { banks } from "../../../store/Data";

const FinancialDetails = ({ data, onChange, onContinue, onBack }) => {
  const [isBankOpen, setIsBankOpen] = useState(false);
  const [bankQuery, setBankQuery] = useState(data.bankName || "");
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
      <div className="text-left font-poppins">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
           Loan & Bank Details
        </h2>
        <p className="mt-2 text-gray-500 text-sm">
          Please provide the loan amount and the bank account for disbursement.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 tracking-widest ml-1">
             How Much Do You Want To Borrow?
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-emerald-600 font-bold">
              ₦
            </div>
            <input
              type="text"
              inputMode="numeric"
              value={data.loanAmount}
              onChange={(e) => onChange('loanAmount', e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 100,000"
              className="block w-full rounded-xl border-gray-200 border-2 bg-gray-50/30 pl-11 pr-4 py-4 text-gray-900 shadow-sm transition-all focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none font-bold text-lg"
            />
          </div>
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

        <InputGroup 
          label="What is your account number?" 
          value={data.accountNumber} 
          onChange={(e) => onChange('accountNumber', e.target.value.replace(/\D/g, ''))}
          placeholder="Enter 10 digit account number"
          icon={<FiCreditCard />} 
        />

        <div className="flex gap-4 mt-10">
          <button
            onClick={onBack}
            className="flex-1 rounded-xl border-2 border-gray-100 py-4 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all font-poppins"
          >
            Back
          </button>
          <button
            onClick={onContinue}
            disabled={!data.loanAmount || !data.bankName || data.accountNumber.length < 10}
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

const CustomSelectGroup = ({ label, value, query, isOpen, onToggle, onInputChange, onSelect, options, icon, disabled = false, dropdownRef, placeholder }) => (
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
        placeholder={disabled ? "Loading..." : placeholder || `Select ${label}`}
        className={`block w-full rounded-xl border-gray-200 border-2 bg-gray-50/30 pl-11 pr-11 py-4 text-gray-900 shadow-sm transition-all focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none font-medium ${
          disabled ? "opacity-50 grayscale cursor-not-allowed" : ""
        }`}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
        {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
      </div>
      {isOpen && !disabled && (
        <div className="absolute left-0 right-0 top-[calc(100%+0.35rem)] z-20 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
          <ul className="max-h-56 overflow-y-auto py-2">
            {options.length > 0 ? (
              options.map((opt) => (
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

export default FinancialDetails;
