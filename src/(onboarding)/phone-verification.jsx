import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { isGuestGlobal } from "../store/Data";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiPhone, FiLock, FiSmartphone, FiEdit3 } from "react-icons/fi";
import { toast } from "sonner";
import JourneyHeader from "../components/ui/journey-header";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../components/ui/input-otp";

const STAGES = {
  PHONE: "PHONE",
  OTP: "OTP"
};

const PhoneVerification = () => {
  const { state } = useLocation();
  const [stage, setStage] = useState(STAGES.PHONE);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.phone) {
      // Clean and pre-fill the phone
      const cleaned = state.phone.replace(/\D/g, '').slice(-10);
      setPhone(cleaned);
      setStage(STAGES.OTP);
      toast.success(`Verification code sent to +234 ${cleaned}`);
    }
  }, [state]);

  useEffect(() => {
    if (isGuestGlobal && !state?.phone) {
      // For guests, we skip this to go to BVN/Personal Details? 
      // Actually, if they are guests, they might still need phone verification.
      // But the previous code had a replace. I'll keep it for now.
    }
  }, [navigate, state]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Verification code sent!");
      setStage(STAGES.OTP);
    }, 1500);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter the 6-digit code");
      return;
    }

    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      if (otp === "123456") {
        toast.success("Phone verified successfully!");
        navigate("/apply/hub");
      } else {
        toast.error("Invalid OTP. Try 123456");
      }
    }, 1500);
  };

  const containerVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="w-full pr-4 sm:pr-6 lg:pr-8 pt-2 pb-10 font-poppins">
      <div className="flex flex-col lg:flex-row gap-4 items-start">
        {/* Progress Sidebar */}
        <aside className="shrink-0 lg:sticky lg:top-4 pl-0">
          <JourneyHeader activeStep="phone" orientation="vertical" />
        </aside>

        {/* Main Form Content */}
        <div className="flex-1 w-full flex justify-center">
          <div className="w-full max-w-md px-4 sm:px-0">
            <AnimatePresence mode="wait">
              {stage === STAGES.PHONE ? (
                <motion.div 
                  key="phone-stage"
                  variants={containerVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="animate-in fade-in slide-in-from-bottom-4 duration-700"
                >
                  <div className="text-left">
                    <div className="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-xl mb-6 text-emerald-600">
                      <FiSmartphone size={24} />
                    </div>
                    
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                      Phone Verification
                    </h2>
                    <p className="mt-3 text-gray-600 text-[15px] leading-relaxed">
                      Enter your phone number to receive a secure verification code.
                    </p>
                  </div>

                  <form className="mt-3 space-y-8" onSubmit={handleSendOtp}>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-black tracking-widest ml-1">
                        Phone Number
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500 font-medium sm:text-sm">
                          +234 (0)
                        </div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                          placeholder="812 345 6789"
                          className="block w-full rounded-xl border-gray-200 border-2 bg-gray-50/30 pl-[88px] pr-4 py-4 text-gray-900 shadow-sm transition-all focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none font-medium sm:text-sm"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading || phone.length < 10}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-4 text-sm font-semibold text-white shadow-xl shadow-emerald-200/50 transition-all hover:bg-emerald-500 hover:shadow-emerald-300 disabled:opacity-50 disabled:shadow-none font-poppins mt-8"
                    >
                      {isLoading ? "Sending Code..." : "Send Verification Code"}
                      {!isLoading && <FiArrowRight className="transition-transform group-hover:translate-x-1" />}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div 
                  key="otp-stage"
                  variants={containerVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="animate-in fade-in slide-in-from-bottom-4 duration-700"
                >
                  <div className="text-left">
                    <button 
                      onClick={() => setStage(STAGES.PHONE)}
                      className="flex items-center gap-2 text-emerald-600 text-xs font-bold mb-6 hover:text-emerald-700 transition-colors"
                    >
                      <FiEdit3 size={14} />
                      Edit +234 {phone}
                    </button>

                    <div className="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-xl mb-6 text-emerald-600">
                      <FiLock size={24} />
                    </div>
                    
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                      Enter Security Code
                    </h2>
                    <p className="mt-3 text-gray-600 text-[15px] leading-relaxed">
                      We've sent a 6-digit verification code to your mobile number.
                    </p>
                  </div>

                  <form className="mt-8 space-y-8" onSubmit={handleVerifyOtp}>
                    <div className="flex flex-col items-center gap-6">
                      <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={setOtp}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>

                      <p className="text-center text-xs text-gray-400">
                        Didn't receive the code? <button type="button" className="text-emerald-600 font-bold hover:underline" onClick={() => toast.success("OTP Resent!")}>Resend Code</button>
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading || otp.length !== 6}
                      className="flex w-full items-center justify-center rounded-xl bg-emerald-600 px-3 py-4 text-sm font-semibold text-white shadow-xl shadow-emerald-200/50 transition-all hover:bg-emerald-500 disabled:opacity-50 font-poppins mt-4"
                    >
                      {isLoading ? "Verifying..." : "Verify and Continue"}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mt-12 text-center text-[10px] text-gray-400 uppercase tracking-widest font-bold">
              Secure Verification by Market Monie
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneVerification;
