import { FiUserPlus, FiUserCheck, FiArrowRight } from "react-icons/fi";

const AccountChoice = ({ onCreateAccount, onContinueGuest }) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="hidden sm:block text-left font-poppins">
        <div className="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-xl mb-6 text-emerald-600">
          <FiUserPlus size={24} />
        </div>

        <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-gray-900">
          How would you like to continue?
        </h2>
        <p className="mt-3 text-gray-600 text-xs sm:text-[15px] leading-relaxed">
          Create an account to track your application, or continue as a guest for a faster flow.
        </p>
      </div>

      <div className="mt-10 space-y-5">
        <button
          type="button"
          onClick={onCreateAccount}
          className="w-full rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 text-left transition-all hover:border-emerald-300 hover:bg-emerald-50"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-4">
              <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
                <FiUserPlus className="text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Create an Account</h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                  Track application, faster re-apply, repayment history.
                </p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-600 px-3 py-1 text-[10px] font-bold tracking-wider text-white">
              Recommended
            </span>
          </div>

          {/* <div className="mt-4 flex flex-wrap gap-2">
            {["Track Application", "Repayment History", "Faster Re-apply"].map((item) => (
              <span
                key={item}
                className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-medium text-emerald-700"
              >
                {item}
              </span>
            ))}
          </div> */}
        </button>

        <button
          type="button"
          onClick={onContinueGuest}
          className="group flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 text-left transition-all hover:border-gray-300 hover:bg-gray-50"
        >
          <div className="flex gap-4">
            <div className="rounded-2xl bg-gray-100 p-3 text-gray-600">
              <FiUserCheck className="text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Continue as Guest</h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-500">
                Apply without creating an account for now.
              </p>
            </div>
          </div>
          <FiArrowRight className="text-gray-400 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default AccountChoice;
