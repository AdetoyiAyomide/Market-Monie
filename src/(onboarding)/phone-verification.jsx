import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isGuestGlobal } from "../store/Data";

import { FiArrowRight, FiPhone } from "react-icons/fi";
import { toast } from "sonner";
import JourneyHeader from "../components/ui/journey-header";

const PhoneVerification = () => {
  const [value, setValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isGuestGlobal) {
      navigate("/onboarding/bvn", { replace: true });
    }
  }, [navigate]);

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
    <div className="w-full pr-4 sm:pr-6 lg:pr-8 pt-2 pb-10 font-poppins">
      <div className="flex flex-col lg:flex-row gap-4 items-start">
        {/* Progress Sidebar - Placed at the very edge */}
        <aside className="shrink-0 lg:sticky lg:top-4 pl-0">
          <JourneyHeader activeStep="email" orientation="vertical" />
        </aside>

        {/* Main Form Content - Expanded and centered in remaining space */}
        <div className="flex-1 w-full flex justify-center">
          <div className="w-full max-w-md px-4 sm:px-0">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="text-left">
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

              <form className="mt-3 space-y-8" onSubmit={handleContinue}>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 tracking-widest ml-1">
                    Phone Number
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500 font-medium sm:text-sm">
                      +234 (0)
                    </div>
                    <input
                      type="tel"
                      value={(value || "").replace(/^\+234/, '')}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="812 345 6789"
                      className="block w-full rounded-xl border-gray-200 border-2 bg-gray-50/30 pl-[88px] pr-4 py-3 text-gray-900 shadow-sm transition-all focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none font-medium sm:text-sm"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneVerification;
