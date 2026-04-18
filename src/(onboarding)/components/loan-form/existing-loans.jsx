import { useState, useMemo, useRef, useEffect } from "react";
import { FiPlus, FiTrash2, FiHelpCircle, FiCreditCard, FiCheckCircle, FiInfo, FiArrowLeft, FiBriefcase, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { banks } from "../../../store/Data";

const ExistingLoans = ({ data, onChange, onContinue, onBack }) => {
  const handleToggle = (hasLoan) => {
    onChange('hasExistingLoan', hasLoan);
    if (hasLoan && data.loans.length === 0) {
      handleAddLoan();
    }
  };

  const handleAddLoan = () => {
    const newLoans = [...data.loans, { lender: '', amount: '', balance: '', repayment: '' }];
    onChange('loans', newLoans);
  };

  const handleRemoveLoan = (index) => {
    const newLoans = data.loans.filter((_, i) => i !== index);
    onChange('loans', newLoans);
    if (newLoans.length === 0) {
      onChange('hasExistingLoan', false);
    }
  };

  const handleLoanChange = (index, field, value) => {
    const newLoans = [...data.loans];
    newLoans[index][field] = value;
    onChange('loans', newLoans);
  };

  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [lenderQueries, setLenderQueries] = useState(data.loans.map(l => l.lender || ""));
  const dropdownRefs = useRef([]);

  useEffect(() => {
    setLenderQueries(data.loans.map(l => l.lender || ""));
  }, [data.loans]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdownIndex !== null && dropdownRefs.current[openDropdownIndex] && !dropdownRefs.current[openDropdownIndex].contains(event.target)) {
        setOpenDropdownIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdownIndex]);

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      {data.hasExistingLoan === null ? (
        <>
          <div className="hidden sm:block text-left font-poppins">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
               Existing Loans
            </h2>
            <p className="mt-2 text-gray-500 text-sm">
              Are you currently paying back any loan to another bank or lender?
            </p>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => handleToggle(true)}
              className="flex-1 py-6 rounded-2xl border-2 border-gray-100 text-gray-400 hover:border-emerald-200 hover:text-emerald-700 hover:bg-emerald-50/30 transition-all font-bold group"
            >
              <span className="block text-lg mb-1 group-hover:scale-110 transition-transform">Yes</span>
              <span className="block text-[10px] font-medium opacity-50 tracking-widest">I Have Other Loans</span>
            </button>
            <button
              onClick={() => handleToggle(false)}
              className="flex-1 py-6 rounded-2xl border-2 border-gray-100 text-gray-400 hover:border-emerald-200 hover:text-emerald-700 hover:bg-emerald-50/30 transition-all font-bold group"
            >
              <span className="block text-lg mb-1 group-hover:scale-110 transition-transform">No</span>
              <span className="block text-[10px] font-medium opacity-50 tracking-widest">No Active Loans</span>
            </button>
          </div>
        </>
      ) : data.hasExistingLoan === true ? (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2 mb-6 cursor-pointer text-emerald-600 font-bold text-xs tracking-widest" onClick={() => handleToggle(null)}>
            <FiArrowLeft /> BACK TO SELECTION
          </div>
          <div className="hidden sm:block text-left font-poppins">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
               Credit History Details
            </h2>
            <p className="mt-2 text-gray-500 text-sm">
              Please provide details about all your active existing loan(s).
            </p>
          </div>

          <div className="mt-8 space-y-8">
            {data.loans.map((loan, index) => (
              <div key={index} className="p-6 bg-gray-50/50 rounded-2xl border-2 border-gray-100 relative group animate-in slide-in-from-top-4 duration-300">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-bold text-emerald-600 tracking-widest uppercase">Loan {index + 1}</span>
                  {index > 0 && (
                    <button 
                      onClick={() => handleRemoveLoan(index)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  <SearchableSelectGroup 
                    label="Which bank or lender did you borrow from?" 
                    value={loan.lender}
                    query={lenderQueries[index] || ""}
                    isOpen={openDropdownIndex === index}
                    onToggle={() => setOpenDropdownIndex(openDropdownIndex === index ? null : index)}
                    onInputChange={(e) => {
                      const val = e.target.value;
                      const newQueries = [...lenderQueries];
                      newQueries[index] = val;
                      setLenderQueries(newQueries);
                      setOpenDropdownIndex(index);
                      handleLoanChange(index, 'lender', '');
                    }}
                    onSelect={(val) => {
                      handleLoanChange(index, 'lender', val);
                      setOpenDropdownIndex(null);
                    }}
                    options={banks}
                    dropdownRef={(el) => dropdownRefs.current[index] = el}
                    icon={<FiBriefcase />} 
                    placeholder="Search bank or lender"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <InputGroup 
                      label="How much did you borrow?" 
                      value={loan.amount}
                      onChange={(e) => handleLoanChange(index, 'amount', e.target.value.replace(/\D/g, ''))}
                      icon={<FiCreditCard />} 
                      placeholder="e.g. 100,000"
                    />
                    <InputGroup 
                      label="How much do you still owe?" 
                      value={loan.balance}
                      onChange={(e) => handleLoanChange(index, 'balance', e.target.value.replace(/\D/g, ''))}
                      icon={<FiCreditCard />} 
                      placeholder="e.g. 10,000"
                    />
                  </div>

                  <InputGroup 
                    label="Regular repayment amount (weekly/monthly)" 
                    value={loan.repayment}
                    onChange={(e) => handleLoanChange(index, 'repayment', e.target.value.replace(/\D/g, ''))}
                    icon={<FiCreditCard />} 
                    placeholder="e.g. 5,000"
                  />
                </div>
              </div>
            ))}

            <button
              onClick={handleAddLoan}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border-2 border-dashed border-emerald-300 text-emerald-600 font-bold hover:bg-emerald-50 transition-all text-sm tracking-widest"
            >
              <FiPlus /> ADD ANOTHER LOAN
            </button>
            
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-3">
              <FiInfo className="text-emerald-600 mt-1 shrink-0" />
              <p className="text-[11px] text-emerald-800 leading-relaxed font-medium">
                Providing accurate details helps us process your application faster. This information remains confidential.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center py-10">
          <div className="h-20 w-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <FiCheckCircle size={40} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Active Loans</h2>
          <p className="text-xs sm:text-sm text-gray-500 text-center max-w-[240px]">
            You've marked that you do not have any existing loans to repay.
          </p>
          
          <button 
            onClick={() => handleToggle(null)}
            className="mt-6 text-xs font-bold text-emerald-600 hover:text-emerald-700 underline flex items-center gap-1 uppercase tracking-widest"
          >
            <FiInfo size={12} />
            Change answer
          </button>
        </div>
      )}

      <div className="flex gap-4 mt-12 border-t border-gray-100 pt-8">
        <button
          onClick={onBack}
          className="flex-1 rounded-xl border-2 border-gray-100 py-4 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all font-poppins"
        >
          Back
        </button>
        <button
          onClick={onContinue}
          disabled={data.hasExistingLoan === null || (data.hasExistingLoan === true && data.loans.some(l => !l.lender || !l.amount))}
          className="flex-[2] rounded-xl bg-emerald-600 py-4 text-sm font-bold text-white shadow-xl shadow-emerald-200/50 hover:bg-emerald-500 disabled:opacity-50 transition-all font-poppins"
        >
           {data.hasExistingLoan === true && data.loans.some(l => !l.lender || !l.amount) ? "Fill All Details" : "Proceed to Review"}
        </button>
      </div>
    </div>
  );
};

const InputGroup = ({ label, value, onChange, icon, placeholder }) => (
  <div className="space-y-2">
    <label className={`text-xs font-bold tracking-widest ml-1 transition-colors ${value ? 'text-emerald-600' : 'text-gray-400'}`}>
      {label}
    </label>
    <div className="relative group">
      <div className={`absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors ${value ? 'text-emerald-500' : 'text-gray-400'}`}>
        {icon}
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`block w-full rounded-xl border-2 bg-gray-50/30 pl-11 pr-4 py-4 text-gray-900 shadow-sm transition-all outline-none font-medium ${
          value 
            ? "border-emerald-500 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10" 
            : "border-gray-200 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
        }`}
      />
    </div>
  </div>
);

const SearchableSelectGroup = ({ label, value, query, isOpen, onToggle, onInputChange, onSelect, options, icon, disabled = false, dropdownRef, placeholder }) => {
  const filteredOptions = options.filter(opt => 
    opt.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-2" ref={dropdownRef}>
      <label className={`text-xs font-bold tracking-widest ml-1 transition-colors ${value ? 'text-emerald-600' : 'text-gray-400'}`}>
        {label}
      </label>
      <div className="relative group">
        <div className={`absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors z-10 ${value ? 'text-emerald-500' : 'text-gray-400'}`}>
          {icon}
        </div>
        <input
          type="text"
          value={isOpen ? query : (value || "")}
          onFocus={() => !disabled && onToggle()}
          onClick={() => !disabled && onToggle()}
          onChange={onInputChange}
          disabled={disabled}
          placeholder={disabled ? "Loading..." : placeholder || `Select ${label}`}
          className={`block w-full rounded-xl border-2 bg-gray-50/30 pl-11 pr-11 py-4 text-gray-900 shadow-sm transition-all outline-none font-medium ${
            disabled 
              ? "opacity-50 grayscale cursor-not-allowed border-gray-100" 
              : value
                ? "border-emerald-500 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
                : "border-gray-200 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
          }`}
        />
        <div className={`absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        </div>
        {isOpen && !disabled && (
          <div className="absolute left-0 right-0 top-[calc(100%+0.35rem)] z-50 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl max-h-56 overflow-y-auto py-2">
            <ul>
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
                <li className="px-4 py-3 text-sm text-gray-400">No results found</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExistingLoans;
