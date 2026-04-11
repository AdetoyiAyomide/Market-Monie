import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../../components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";


const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "user@email.com";
  
  const [otpValue, setOtpValue] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [resendAttempts, setResendAttempts] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [redirectTimer, setRedirectTimer] = useState(5);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    let interval;
    if (isSuccess && redirectTimer > 0) {
      interval = setInterval(() => {
        setRedirectTimer((prev) => prev - 1);
      }, 1000);
    } else if (isSuccess && redirectTimer === 0) {
      navigate("/onboarding/bvn");
    }
    return () => clearInterval(interval);
  }, [isSuccess, redirectTimer, navigate]);


  const handleVerify = async (e) => {
    e.preventDefault();
    if (otpValue.length < 6) {
      toast.error("Please enter the full 6-digit code");
      return;
    }
    
    setIsVerifying(true);
    setHasError(false);
    
    // Mock Verification
    setTimeout(() => {
      if (otpValue === "123456") {
        toast.success("Email verified successfully!");
        setIsSuccess(true);
      } else {
        toast.error("Invalid or expired code.");
        setHasError(true);
      }
      setIsVerifying(false);
    }, 1500);
  };

  if (isSuccess) {
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
          Verification Successful
        </h2>
        <p className="mt-4 text-gray-500 text-lg leading-relaxed">
          Your email has been successfully verified.
        </p>

        <p className="mt-12 text-[#6366f1] font-semibold text-lg tracking-wide">
          Redirecting in {redirectTimer}...
        </p>
      </div>
    );
  }


  const handleResend = () => {
    if (!canResend) return;
    
    if (resendAttempts >= 2) {
      toast.error("Too many attempts. Please wait 5 minutes before trying again.");
      return;
    }
    
    setTimer(60);
    setCanResend(false);
    setResendAttempts((prev) => prev + 1);
    toast.info(`Code resent to ${email}`);
  };


  return (
    <div>
      <div className="text-left font-poppins">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors"
        >
          <FiArrowLeft /> Back
        </button>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Verify your email
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter the 6-digit code sent to <span className="font-semibold text-gray-900">{email}</span>
        </p>
      </div>

      <form className="mt-10 space-y-8" onSubmit={handleVerify}>
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={otpValue}
            onChange={(value) => {
              setOtpValue(value);
              if (hasError) setHasError(false);
            }}
            pattern={REGEXP_ONLY_DIGITS}
          >
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className={`rounded-sm border-gray-200 border focus:ring focus:ring-green-600 focus:border-green-600 outline-none ${hasError && "ring-2 ring-red-500 border-red-500"}`}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Didn't receive it?{" "}
            <button
              type="button"
              disabled={!canResend}
              onClick={handleResend}
              className={`font-semibold ${
                canResend 
                  ? "text-emerald-600 hover:text-emerald-500" 
                  : "text-gray-400 cursor-not-allowed"
              }`}
            >
              Resend code {timer > 0 && `(${timer}s)`}
            </button>
          </p>
        </div>

        <button
          type="submit"
          disabled={otpValue.length < 6 || isVerifying}
          className="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-50 transition-all font-poppins"
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;
