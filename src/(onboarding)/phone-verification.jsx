import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { FiArrowRight, FiPhone } from "react-icons/fi";
import { toast } from "sonner";

const PhoneVerification = () => {
  const [value, setValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleContinue = async (e) => {
    e.preventDefault();
    if (!value) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Phone number saved!");
      navigate("/onboarding/bvn"); // Next step
    }, 1500);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-left font-poppins">
        <div className="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-xl mb-6 text-emerald-600">
          <FiPhone size={24} />
        </div>
        
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Phone Verification
        </h2>
        <p className="mt-3 text-gray-600 text-[15px] leading-relaxed">
          We use this information to determine the verification steps available to you.
        </p>
      </div>

      <form className="mt-10 space-y-8" onSubmit={handleContinue}>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 tracking-widest ml-1">
            Phone Number
          </label>
          <div className="phone-input-container">
            <PhoneInput
              placeholder="Enter phone number"
              defaultCountry="NG"
              value={value}
              onChange={setValue}
              className="flex w-full rounded-xl border-gray-200 border-2 bg-gray-50/30 px-4 py-3 sm:text-sm focus-within:ring-4 focus-within:ring-emerald-500/10 focus-within:border-emerald-600 outline-none transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !value}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-4 text-sm font-semibold text-white shadow-xl shadow-emerald-200/50 transition-all hover:bg-emerald-500 hover:shadow-emerald-300 disabled:opacity-50 disabled:shadow-none font-poppins mt-8"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </div>
          ) : "Continue"}
          {!isLoading && <FiArrowRight className="transition-transform group-hover:translate-x-1" />}
        </button>
      </form>

      <p className="mt-8 text-center text-xs text-gray-400">
        By continuing, you agree to Market Monie's Terms of Service and Privacy Policy.
      </p>

      <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex items-center justify-between">
              <div className="flex flex-col">
                  <span className="text-xs text-gray-400 font-bold tracking-widest">Progress</span>
                  <span className="text-sm font-semibold text-gray-700">Phone Verification</span>
              </div>
              <div className="h-2 w-24 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-emerald-500 rounded-full" />
              </div>
          </div>
      </div>
    </div>
  );
};

export default PhoneVerification;
