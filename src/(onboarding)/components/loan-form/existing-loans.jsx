import { useState } from "react";
import { FiPlus, FiTrash2, FiHelpCircle, FiCreditCard } from "react-icons/fi";

const ExistingLoans = ({ data, onChange, onContinue, onBack }) => {
  const [errors, setErrors] = useState({});
  const [loanErrors, setLoanErrors] = useState([]);

  const validate = () => {
    const newErrors = {};
    const newLoanErrors = [];

    if (data.hasExistingLoan === null) {
      newErrors.choice = "Please select Yes or No";
    }

    if (data.hasExistingLoan) {
      data.loans.forEach((loan, index) => {
        const itemErrors = {};
        if (!loan.lender) itemErrors.lender = "Lender/Bank name is required";
        if (!loan.amount) itemErrors.amount = "Loan amount is required";
        if (!loan.balance) itemErrors.balance = "Outstanding balance is required";
        if (!loan.repayment) itemErrors.repayment = "Regular repayment is required";
        newLoanErrors[index] = itemErrors;
      });
    }

    setErrors(newErrors);
    setLoanErrors(newLoanErrors);

    const hasNoLoanErrors = newLoanErrors.every(err => Object.keys(err || {}).length === 0);
    return Object.keys(newErrors).length === 0 && hasNoLoanErrors;
  };

  const handleContinue = () => {
    if (validate()) {
      onContinue();
    }
  };

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
    
    // Clear error for this field
    if (loanErrors[index]?.[field]) {
      const updatedLoanErrors = [...loanErrors];
      updatedLoanErrors[index] = { ...updatedLoanErrors[index], [field]: null };
      setLoanErrors(updatedLoanErrors);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-left font-poppins">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
           Existing Loans
        </h2>
        <p className="mt-2 text-gray-500 text-sm">
          Are you currently paying back any loan to another bank or lender?
        </p>
      </div>

      <div className="mt-8 space-y-8">
        <div className="space-y-2">
          <div className="flex gap-4">
            <button
              onClick={() => {
                handleToggle(true);
                if (errors.choice) setErrors(prev => ({ ...prev, choice: null }));
              }}
              className={`flex-1 py-4 rounded-xl border-2 transition-all font-bold ${
                data.hasExistingLoan === true 
                  ? "border-emerald-600 bg-emerald-50/50 text-emerald-700 shadow-lg shadow-emerald-100" 
                  : errors.choice
                    ? "border-red-300 bg-red-50/10 text-red-400"
                    : "border-gray-100 text-gray-400 hover:border-emerald-200"
              }`}
            >
              Yes
            </button>
            <button
              onClick={() => {
                handleToggle(false);
                if (errors.choice) setErrors(prev => ({ ...prev, choice: null }));
              }}
              className={`flex-1 py-4 rounded-xl border-2 transition-all font-bold ${
                data.hasExistingLoan === false 
                  ? "border-emerald-600 bg-emerald-50/50 text-emerald-700 shadow-lg shadow-emerald-100" 
                  : errors.choice
                    ? "border-red-300 bg-red-50/10 text-red-400"
                    : "border-gray-100 text-gray-400 hover:border-emerald-200"
              }`}
            >
              No
            </button>
          </div>
          {errors.choice && <p className="text-center mt-2 text-xs text-red-500 animate-in fade-in slide-in-from-top-1 font-medium">{errors.choice}</p>}
        </div>

        {data.hasExistingLoan && (
          <div className="space-y-6">
            {data.loans.map((loan, index) => (
              <div key={index} className="p-6 bg-gray-50/50 rounded-2xl border-2 border-gray-100 relative group animate-in slide-in-from-top-4 duration-300">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Loan {index + 1}</span>
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
                  <InputGroup 
                    label="Who or which bank did you borrow from?" 
                    value={loan.lender}
                    onChange={(e) => handleLoanChange(index, 'lender', e.target.value)}
                    error={loanErrors[index]?.lender}
                    icon={<FiHelpCircle />} 
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <InputGroup 
                      label="Loan amount?" 
                      value={loan.amount ? Number(loan.amount).toLocaleString() : ''}
                      onChange={(e) => handleLoanChange(index, 'amount', e.target.value.replace(/\D/g, ''))}
                      error={loanErrors[index]?.amount}
                      icon={<FiCreditCard />} 
                    />
                    <InputGroup 
                      label="Still owe?" 
                      value={loan.balance ? Number(loan.balance).toLocaleString() : ''}
                      onChange={(e) => handleLoanChange(index, 'balance', e.target.value.replace(/\D/g, ''))}
                      error={loanErrors[index]?.balance}
                      icon={<FiCreditCard />} 
                    />
                  </div>

                  <InputGroup 
                    label="How much do you pay regularly? (weekly/monthly)" 
                    value={loan.repayment ? Number(loan.repayment).toLocaleString() : ''}
                    onChange={(e) => handleLoanChange(index, 'repayment', e.target.value.replace(/\D/g, ''))}
                    error={loanErrors[index]?.repayment}
                    icon={<FiCreditCard />} 
                  />
                </div>
              </div>
            ))}

            <button
              onClick={handleAddLoan}
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl border-2 border-dashed border-emerald-300 text-emerald-600 font-bold hover:bg-emerald-50 transition-all"
            >
              <FiPlus /> Add another loan
            </button>
          </div>
        )}

        <div className="flex gap-4 mt-10">
          <button
            onClick={onBack}
            className="flex-1 rounded-xl border-2 border-gray-100 py-4 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all font-poppins"
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            className="flex-[2] rounded-xl bg-emerald-600 py-4 text-sm font-semibold text-white shadow-xl shadow-emerald-200/50 hover:bg-emerald-500 transition-all font-poppins"
          >
            Review Details
          </button>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, value, onChange, icon, error = null }) => (
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
        className={`block w-full rounded-xl border-2 bg-white pl-11 pr-4 py-4 text-gray-900 shadow-sm transition-all outline-none font-medium text-sm ${
          error 
            ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" 
            : "border-gray-200 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
        }`}
      />
    </div>
    {error && <p className="mt-1 text-xs text-red-500 animate-in fade-in slide-in-from-top-1 ml-1 font-medium">{error}</p>}
  </div>
);


export default ExistingLoans;
