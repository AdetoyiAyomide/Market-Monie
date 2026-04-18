import { FiCheckCircle, FiInfo, FiCreditCard, FiArrowLeft } from "react-icons/fi";

const ExistingLoans = ({ data, onChange, onContinue, onBack }) => {
  const handleToggle = (hasLoan) => {
    onChange('hasExistingLoan', hasLoan);
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      {data.hasExistingLoan === null ? (
        <>
          <div className="text-left font-poppins">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
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
          <div className="text-left font-poppins">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
               Credit History Details
            </h2>
            <p className="mt-2 text-gray-500 text-sm">
              Please provide brief details about your existing loan(s).
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 tracking-widest ml-1">
                 Which bank or lender did you borrow from?
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-emerald-600 transition-colors">
                  <FiBriefcase />
                </div>
                <input
                  type="text"
                  value={data.existingLenderName}
                  onChange={(e) => onChange('existingLenderName', e.target.value)}
                  placeholder="e.g. LAPO, Bank, etc."
                  className="block w-full rounded-xl border-gray-200 border-2 bg-gray-50/30 pl-11 pr-4 py-4 text-gray-900 shadow-sm transition-all focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 tracking-widest ml-1">
                 How much do you still owe?
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-emerald-600 font-bold">
                  ₦
                </div>
                <input
                  type="text"
                  inputMode="numeric"
                  value={data.outstandingAmount}
                  onChange={(e) => onChange('outstandingAmount', e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 50,000"
                  className="block w-full rounded-xl border-gray-200 border-2 bg-gray-50/30 pl-11 pr-4 py-4 text-gray-900 shadow-sm transition-all focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none font-bold text-lg"
                />
              </div>
            </div>
            
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
          <p className="text-sm text-gray-500 text-center max-w-[240px]">
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
          disabled={data.hasExistingLoan === null || (data.hasExistingLoan === true && (!data.existingLenderName || !data.outstandingAmount))}
          className="flex-[2] rounded-xl bg-emerald-600 py-4 text-sm font-bold text-white shadow-xl shadow-emerald-200/50 hover:bg-emerald-500 disabled:opacity-50 transition-all font-poppins"
        >
           {data.hasExistingLoan === true && (!data.existingLenderName || !data.outstandingAmount) ? "Enter Details" : "Proceed to Review"}
        </button>
      </div>
    </div>
  );
};

export default ExistingLoans;
