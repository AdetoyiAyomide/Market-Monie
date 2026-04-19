import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiShield, FiAlertCircle, FiCheck } from "react-icons/fi";
import { toast } from "sonner";
import BvnConfirmation from "./components/bvn-confirmation";
import JourneyHeader from "../components/ui/journey-header";

const BvnVerification = () => {
  const navigate = useNavigate();
  const [bvn, setBvn] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [redirectTimer, setRedirectTimer] = useState(5);

  useEffect(() => {
    let interval;
    if (isConfirmed && redirectTimer > 0) {
      interval = setInterval(() => {
        setRedirectTimer((prev) => prev - 1);
      }, 1000);
    } else if (isConfirmed && redirectTimer === 0) {
      navigate("/apply/hub");
    }
    return () => clearInterval(interval);
  }, [isConfirmed, redirectTimer, navigate]);

  const handleBvnChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      setBvn(value);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (bvn.length !== 11) {
      toast.error("BVN must be exactly 11 digits");
      return;
    }

    setIsVerifying(true);
    
    // Mock API call
    setTimeout(() => {
      setIsVerifying(false);
      
      if (bvn === "12345678901") {
         // Mock BVN Details retrieval
         toast.success("BVN Verified Successfully!");
         localStorage.setItem("firstName", "Samuel");
         localStorage.setItem("lastName", "Peter");
         setIsConfirmed(true);
      } else {
         toast.error("Invalid BVN. Please check and try again.");
      }
    }, 2000);
  };

  if (isConfirmed) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10 animate-in fade-in duration-500">
        {/* Success Icon Wrapper */}
        <div className="relative mb-8">
          <div className="h-28 w-28 bg-emerald-100 rounded-full flex items-center justify-center">
            <div className="h-20 w-20 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg">
              <FiCheck size={36} strokeWidth={3} />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold font-poppins text-gray-900">
           BVN Verified
        </h2>
        <p className="mt-4 text-gray-500 text-lg leading-relaxed">
          Your identity details have been successfully confirmed.
        </p>

        <p className="mt-12 text-[#6366f1] font-semibold text-lg tracking-wide">
          Redirecting in {redirectTimer}...
        </p>
      </div>
    );
  }



  return (
    <div className="w-full pr-4 sm:pr-6 lg:pr-8 pt-0 pb-10 font-poppins">
      <div className="flex flex-col lg:flex-row gap-4 items-start">
        {/* Progress Sidebar - Placed at the very edge */}
        <aside className="shrink-0 lg:sticky lg:top-4 pl-0">
          <JourneyHeader activeStep="bvn" orientation="vertical" />
        </aside>

        {/* Main Form Content - Expanded and centered in remaining space */}
        <div className="flex-1 w-full flex justify-center">
          <div className="w-full max-w-md px-4 sm:px-0">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="hidden sm:block text-left font-poppins">
                <div className="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-xl mb-3 text-emerald-600">
                  <FiShield size={24} />
                </div>
                
                <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-gray-900">
                  BVN Verification
                </h2>
                <p className="mt-2 text-gray-600 text-xs sm:text-[15px] leading-relaxed">
                  We need your Bank Verification Number to verify your identity. This is a secure one-time process.
                </p>
              </div>

              <form className="mt-4 space-y-6" onSubmit={handleVerify}>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 tracking-widest ml-1">
                    Bank Verification Number (BVN)
                  </label>
                  <div className="relative group">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={bvn}
                      onChange={handleBvnChange}
                      placeholder="Enter your 11-digit BVN"
                      className="block w-full rounded-xl border-gray-200 border-2 bg-gray-50/30 px-4 py-4 text-gray-900 shadow-sm transition-all focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none placeholder:text-gray-400 font-medium"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <span className={`text-xs font-bold transition-colors ${bvn.length === 11 ? "text-emerald-500" : "text-gray-300"}`}>
                        {bvn.length}/11
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
                  <FiAlertCircle className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 leading-relaxed italic">
                    Don&apos;t know your BVN?. Dial <span className="font-bold">*565*0#</span> on your registered mobile number to retrieve your BVN.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={bvn.length !== 11 || isVerifying}
                  className="flex w-full justify-center rounded-xl bg-emerald-600 px-3 py-4 text-sm font-semibold leading-6 text-white shadow-xl shadow-emerald-200/50 hover:bg-emerald-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-50 transition-all font-poppins mt-8"
                >
                  {isVerifying ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Verifying...
                    </div>
                  ) : "Continue"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BvnVerification;
