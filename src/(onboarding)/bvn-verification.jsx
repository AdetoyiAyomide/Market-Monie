import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiShield, FiAlertCircle } from "react-icons/fi";
import { toast } from "sonner";

const BvnVerification = () => {
  const navigate = useNavigate();
  const [bvn, setBvn] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

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
      toast.success("BVN Verified Successfully!");
      navigate("/onboarding/kyc-success"); 
    }, 2000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-left font-poppins">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-8 flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors group"
        >
          <FiArrowLeft className="transition-transform group-hover:-translate-x-1" /> Back
        </button>
        
        <div className="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-xl mb-6 text-emerald-600">
          <FiShield size={24} />
        </div>
        
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          BVN Verification
        </h2>
        <p className="mt-3 text-gray-600 text-[15px] leading-relaxed">
          We need your Bank Verification Number to verify your identity. This is a secure one-time process.
        </p>
      </div>

      <form className="mt-10 space-y-6" onSubmit={handleVerify}>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
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
            Don&apos;t know your bvn?. Dial <span className="font-bold">*565*0#</span> on your registered mobile number to retrieve your BVN.
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

      <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex items-center justify-between">
              <div className="flex flex-col">
                  <span className="text-xs text-gray-400 uppercase font-bold tracking-widest">Next Step</span>
                  <span className="text-sm font-semibold text-gray-700">Identity Verification</span>
              </div>
              <div className="h-2 w-24 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-emerald-500 rounded-full" />
              </div>
          </div>
      </div>
    </div>
  );
};

export default BvnVerification;
