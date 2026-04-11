import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { FiArrowRight } from "react-icons/fi";
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
      navigate("/onboarding/kyc"); // Next step
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 bg-[url('/Pattern.png')] bg-repeat bg-size-[400px]">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100">
        <div className="mb-8 overflow-hidden rounded-xl h-48 -mx-8 -mt-8 relative">
           <img 
            src="/monie.jpg" 
            alt="Business" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-emerald-950/20 mix-blend-multiply" />
          <div className="absolute top-6 left-6">
            <img src="/market-monie.png" alt="Logo" className="h-8 brightness-0 invert" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-poppins text-gray-900">
            Country and phone number
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed font-sans">
            We use this information to determine the verification steps available to you.
          </p>
        </div>

        <form className="mt-10 space-y-8" onSubmit={handleContinue}>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Phone Number
            </label>
            <div className="phone-input-container">
              <PhoneInput
                placeholder="Enter phone number"
                defaultCountry="NG"
                value={value}
                onChange={setValue}
                className="flex w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-3 sm:text-sm focus-within:ring-2 focus-within:ring-emerald-600 focus-within:border-emerald-600 outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !value}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition-all hover:bg-emerald-500 hover:shadow-emerald-300 disabled:opacity-50 disabled:shadow-none font-poppins"
          >
            {isLoading ? "Processing..." : "Continue"}
            {!isLoading && <FiArrowRight className="transition-transform group-hover:translate-x-1" />}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-gray-400">
          By continuing, you agree to Market Monie's Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default PhoneVerification;
