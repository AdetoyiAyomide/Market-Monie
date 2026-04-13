import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, otpSchema, resetPasswordSchema } from "../../schemas/auth";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiArrowLeft, FiMail, FiLock, FiCheckCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../components/ui/input-otp";
import SuccessScreen from "../../components/ui/success-screen";
import { toast } from "sonner";

const STAGES = {
  EMAIL: "EMAIL",
  OTP: "OTP",
  RESET: "RESET",
  SUCCESS: "SUCCESS",
};

const ForgotPassword = () => {
  const [stage, setStage] = useState(STAGES.EMAIL);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Email Form
  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors, isSubmitting: isEmailSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  // OTP Form
  const {
    control: otpControl,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors, isSubmitting: isOtpSubmitting },
  } = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  // Reset Password Form
  const {
    register: registerReset,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors, isSubmitting: isResetSubmitting },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onEmailSubmit = async (data) => {
    // Simulate API call
    console.log("Sending OTP to:", data.email);
    setEmail(data.email);
    toast.success("OTP sent to your email");
    setStage(STAGES.OTP);
  };

  const onOtpSubmit = async (data) => {
    // Simulate API call
    console.log("Verifying OTP:", data.otp);
    toast.success("OTP verified successfully");
    setStage(STAGES.RESET);
  };

  const onResetSubmit = async (data) => {
    // Simulate API call
    console.log("Resetting password for:", email);
    toast.success("Password reset successful");
    setStage(STAGES.SUCCESS);
  };

  if (stage === STAGES.SUCCESS) {
    return (
      <SuccessScreen
        title="Password Reset!"
        description="Your password has been successfully reset. You can now log in with your new credentials."
        redirectPath="/login"
        countdownSeconds={5}
      />
    );
  }

  const containerVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {stage === STAGES.EMAIL && (
          <motion.div
            key="email-stage"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-6"
          >
            <div>
              <Link
                to="/login"
                className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-500 mb-6 group transition-all"
              >
                <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to login
              </Link>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 font-poppins">
                Forgot password?
              </h2>
              <p className="mt-2 text-sm text-gray-600 font-poppins">
                No worries, we'll send you reset instructions.
              </p>
            </div>

            <form onSubmit={handleEmailSubmit(onEmailSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...registerEmail("email")}
                    type="email"
                    className="block w-full rounded-lg border-0 py-3.5 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 bg-gray-50/50 transition-all"
                    placeholder="Enter your email"
                  />
                  {emailErrors.email && (
                    <p className="mt-2 text-xs text-red-500 font-medium">
                      {emailErrors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isEmailSubmitting}
                className="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-3.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-50 transition-all font-poppins"
              >
                {isEmailSubmitting ? "Sending..." : "Reset password"}
              </button>
            </form>
          </motion.div>
        )}

        {stage === STAGES.OTP && (
          <motion.div
            key="otp-stage"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-6"
          >
            <div>
              <button
                onClick={() => setStage(STAGES.EMAIL)}
                className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-500 mb-6 group transition-all"
              >
                <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Change email
              </button>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 font-poppins">
                Enter OTP
              </h2>
              <p className="mt-2 text-sm text-gray-600 font-poppins">
                We've sent a 6-digit code to <span className="font-semibold text-gray-900">{email}</span>
              </p>
            </div>

            <form onSubmit={handleOtpSubmit(onOtpSubmit)} className="space-y-8">
              <div className="flex flex-col items-center">
                <Controller
                  name="otp"
                  control={otpControl}
                  render={({ field }) => (
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
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
                  )}
                />
                {otpErrors.otp && (
                  <p className="mt-4 text-xs text-red-500 font-medium text-center w-full">
                    {otpErrors.otp.message}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={isOtpSubmitting}
                  className="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-3.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-50 transition-all font-poppins"
                >
                  {isOtpSubmitting ? "Verifying..." : "Verify OTP"}
                </button>
                <p className="text-center text-sm text-gray-600">
                  Didn't receive the code?{" "}
                  <button
                    type="button"
                    className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors"
                    onClick={() => toast.success("OTP resent!")}
                  >
                    Click to resend
                  </button>
                </p>
              </div>
            </form>
          </motion.div>
        )}

        {stage === STAGES.RESET && (
          <motion.div
            key="reset-stage"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-6"
          >
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 font-poppins">
                Set new password
              </h2>
              <p className="mt-2 text-sm text-gray-600 font-poppins">
                Must be at least 8 characters with a mix of letters, numbers & symbols.
              </p>
            </div>

            <form onSubmit={handleResetSubmit(onResetSubmit)} className="space-y-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    New Password
                  </label>
                  <div className="mt-2 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...registerReset("password")}
                      type={showPassword ? "text" : "password"}
                      className="block w-full rounded-lg border-0 py-3.5 pl-10 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 bg-gray-50/50 transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                    {resetErrors.password && (
                      <p className="mt-2 text-xs text-red-500 font-medium">
                        {resetErrors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm Password
                  </label>
                  <div className="mt-2 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...registerReset("confirmPassword")}
                      type={showConfirmPassword ? "text" : "password"}
                      className="block w-full rounded-lg border-0 py-3.5 pl-10 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 bg-gray-50/50 transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                    {resetErrors.confirmPassword && (
                      <p className="mt-2 text-xs text-red-500 font-medium">
                        {resetErrors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2 py-2">
                 {[
                   { label: "At least 8 characters", met: true },
                   { label: "Contains a number", met: true },
                   { label: "Contains a special character", met: true }
                 ].map((rule, i) => (
                   <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                     <FiCheckCircle size={14} className="text-emerald-500" />
                     <span>{rule.label}</span>
                   </div>
                 ))}
              </div>

              <button
                type="submit"
                disabled={isResetSubmitting}
                className="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-3.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-50 transition-all font-poppins"
              >
                {isResetSubmitting ? "Updating..." : "Reset password"}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ForgotPassword;
