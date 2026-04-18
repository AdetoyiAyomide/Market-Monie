import { FiCheckCircle, FiInfo } from "react-icons/fi";

const ExistingLoans = ({ data, onChange, onContinue, onBack }) => {
  const handleToggle = (hasLoan) => {
    onChange('hasExistingLoan', hasLoan);
    // Note: We are no longer collecting detailed loan info per user request
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
              <span className="block text-[10px] font-medium opacity-50 uppercase tracking-widest">I have other loans</span>
            </button>
            <button
              onClick={() => handleToggle(false)}
              className="flex-1 py-6 rounded-2xl border-2 border-gray-100 text-gray-400 hover:border-emerald-200 hover:text-emerald-700 hover:bg-emerald-50/30 transition-all font-bold group"
            >
              <span className="block text-lg mb-1 group-hover:scale-110 transition-transform">No</span>
              <span className="block text-[10px] font-medium opacity-50 uppercase tracking-widest">No active loans</span>
            </button>
          </div>
        </>
      ) : (
        <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center py-10">
          <div className="h-20 w-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <FiCheckCircle size={40} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Selection Saved</h2>
          <p className="text-sm text-gray-500 text-center max-w-[240px]">
            You've marked that you {data.hasExistingLoan ? 'have' : 'do not have'} existing loans. 
          </p>
          
          <button 
            onClick={() => onChange('hasExistingLoan', null)}
            className="mt-6 text-xs font-bold text-emerald-600 hover:text-emerald-700 underline flex items-center gap-1"
          >
            <FiInfo size={12} />
            Change my answer
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
          disabled={data.hasExistingLoan === null}
          className="flex-[2] rounded-xl bg-emerald-600 py-4 text-sm font-bold text-white shadow-xl shadow-emerald-200/50 hover:bg-emerald-500 disabled:opacity-50 transition-all font-poppins"
        >
          Proceed to Review
        </button>
      </div>
    </div>
  );
};

export default ExistingLoans;
