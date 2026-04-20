import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../schemas/auth";
import { Link, useNavigate } from "react-router-dom";
import JourneyHeader from "../../components/ui/journey-header";

import { FiEye, FiEyeOff, FiChevronDown, FiChevronUp } from "react-icons/fi";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isTitleOpen, setIsTitleOpen] = useState(false);
  const titleOptions = ["Mr", "Mrs", "Ms"];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
    defaultValues: {
      title: "Mr"
    }
  });

  const watchedFields = watch();
  const titleValue = watchedFields.title;

  const getInputClassName = (fieldName, isPhone = false) => {
    const hasError = isSubmitted && !!errors[fieldName];
    const value = watchedFields[fieldName];
    const isValid = !hasError && value && value.toString().length > 0;
    
    return `block w-full rounded-lg border-0 py-3.5 ${isPhone ? 'pl-[88px]' : 'px-4'} pr-4 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-gray-50/50 transition-all ${
      hasError 
        ? "ring-red-500 focus:ring-red-600" 
        : isValid 
          ? "ring-emerald-500 focus:ring-emerald-600" 
          : "ring-gray-300 focus:ring-emerald-600"
    }`;
  };

  const getLabelClassName = (fieldName) => {
    const hasError = isSubmitted && !!errors[fieldName];
    const value = watchedFields[fieldName];
    const isValid = !hasError && value && value.toString().length > 0;

    return `block text-xs sm:text-sm font-medium leading-6 transition-colors ${
      hasError 
        ? "text-red-500" 
        : isValid 
          ? "text-emerald-600" 
          : "text-gray-900"
    }`;
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    localStorage.setItem("firstName", data.firstName);
    localStorage.setItem("lastName", data.lastName);
    localStorage.setItem("title", data.title || "Mr");
    // Navigate directly to phone verification with pre-filled phone
    navigate("/onboarding/phone", { state: { phone: data.phone } });
  };

  return (
    <div className="w-full pr-4 sm:pr-6 lg:pr-8 pt-2 pb-10 font-poppins">
      <div className="flex flex-col lg:flex-row gap-4 items-start">
        {/* Progress Sidebar - Placed at the very edge */}
        <aside className="shrink-0 lg:sticky lg:top-4 pl-0">
          <JourneyHeader activeStep="account" orientation="vertical" />
        </aside>

        {/* Main Form Content - Expanded and centered in remaining space */}
        <div className="flex-1 w-full flex justify-center">
          <div className="w-full max-w-2xl px-4 sm:px-0">
            <div className="text-left">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
                Create account
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-gray-600">
                Join us today! It only takes a minute to set up your account.
              </p>
            </div>

      <div className="mt-3">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name Row (Title, First, Last) */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-x-4 gap-y-4 items-end">
            {/* Title - Horizontal on Mobile */}
            <div className="col-span-2 md:col-span-2 flex md:block items-center justify-between md:justify-start gap-4">
              <label className="text-xs sm:text-sm font-medium leading-6 transition-colors pb-0 md:pb-2 whitespace-nowrap text-black">
                Title
              </label>
              <div className="relative w-24 md:w-full">
                <button
                  type="button"
                  onClick={() => setIsTitleOpen(!isTitleOpen)}
                  className={`flex w-full items-center justify-between rounded-lg border-0 py-2.5 md:py-3.5 px-3 md:px-4 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-gray-50/50 transition-all ${
                    errors.title 
                      ? "ring-red-500 focus:ring-red-600" 
                      : titleValue 
                        ? "ring-emerald-500 focus:ring-emerald-600" 
                        : "ring-gray-300 focus:ring-emerald-600"
                  }`}
                >
                  <span className={titleValue ? "text-gray-900" : "text-gray-400"}>
                    {titleValue || "Mr"}
                  </span>
                  {isTitleOpen ? <FiChevronUp className="text-gray-400" /> : <FiChevronDown className="text-gray-400" />}
                </button>

                {isTitleOpen && (
                  <div className="absolute z-50 mt-2 w-32 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden left-auto right-0 md:right-auto md:left-0">
                    <div className="py-1">
                      {titleOptions.map((title) => (
                        <button
                          key={title}
                          type="button"
                          onClick={() => {
                            setValue("title", title, { shouldValidate: true, shouldDirty: true });
                            setIsTitleOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-3 text-sm transition-colors hover:bg-emerald-50 hover:text-emerald-700 ${
                            titleValue === title ? "bg-emerald-50 text-emerald-700 font-bold" : "text-gray-700"
                          }`}
                        >
                          {title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {errors.title && (
                <p className="hidden md:block mt-1 text-xs text-red-500 font-medium">{errors.title.message}</p>
              )}
            </div>

            {/* First Name */}
            <div className="col-span-1 md:col-span-5">
              <label className={getLabelClassName("firstName")}>
                First Name
              </label>
              <input
                {...register("firstName")}
                type="text"
                placeholder="e.g. John"
                className={`mt-2 ${getInputClassName("firstName")}`}
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.firstName.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="col-span-1 md:col-span-5">
              <label className={getLabelClassName("lastName")}>
                Last Name
              </label>
              <input
                {...register("lastName")}
                type="text"
                placeholder="e.g. Doe"
                className={`mt-2 ${getInputClassName("lastName")}`}
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-5">
            {/* Phone Number */}
            <div className="w-full">
              <label className={getLabelClassName("phone")}>
                Phone Number
              </label>
              <div className="mt-2 relative">
                <div className={`absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none font-medium sm:text-sm z-10 transition-colors ${errors.phone ? 'text-red-400' : (watchedFields.phone ? 'text-emerald-500' : 'text-gray-500')}`}>
                  +234 (0)
                </div>
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="812 345 6789"
                  className={getInputClassName("phone", true)}
                />
              </div>
              {errors.phone && (
                <p className="mt-2 text-xs text-red-500 font-medium">{errors.phone.message}</p>
              )}
            </div>

            {/* Email Address */}
            <div className="w-full">
              <label className={getLabelClassName("email")}>
                Email Address
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="e.g. john@example.com"
                className={`mt-2 ${getInputClassName("email")}`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* PIN Setup (Horizontal Flow) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div className="relative">
              <label className="block text-xs sm:text-sm font-medium leading-6 text-gray-900">
                Create 6-Digit PIN
              </label>
              <div className="mt-2 relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  maxLength={6}
                  placeholder="••••••"
                  className={`${getInputClassName("password")} pr-12 tracking-widest font-mono`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              
              {errors.password && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.password.message}</p>
              )}
            </div>

            <div className="relative">
              <label className="block text-xs sm:text-sm font-medium leading-6 text-gray-900">
                Confirm 6-Digit PIN
              </label>
              <div className="mt-2 relative">
                <input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  maxLength={6}
                  placeholder="••••••"
                  className={`${getInputClassName("confirmPassword")} pr-12 tracking-widest font-mono`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start gap-3 py-2">
            <div className="flex h-6 items-center">
              <input
                {...register("agreeTerms")}
                id="agreeTerms"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600 cursor-pointer"
              />
            </div>
            <div className="text-sm leading-6">
              <label htmlFor="agreeTerms" className="font-medium text-gray-900 cursor-pointer">
                Terms and Conditions
              </label>
              <p className="text-gray-500">I agree to the <Link to="#" className="text-emerald-600 font-semibold hover:text-emerald-500">Privacy Policy</Link> and <Link to="#" className="text-emerald-600 font-semibold hover:text-emerald-500">Terms of Service</Link>.</p>
              {errors.agreeTerms && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.agreeTerms.message}</p>
              )}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-lg bg-emerald-600 px-3 py-4 text-sm font-bold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-50 transition-all font-poppins tracking-widest"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</div>
);
};

export default Register;
