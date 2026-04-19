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
  const titleOptions = ["Mr", "Mrs", "Miss"];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const watchedFields = watch();
  const titleValue = watchedFields.title;

  const getInputClassName = (fieldName, isPhone = false) => {
    const hasError = !!errors[fieldName];
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
    const hasError = !!errors[fieldName];
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
    navigate("/register/success");
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 lg:px-8 py-10 sm:py-20 font-poppins">
      <JourneyHeader activeStep="account" />

      <div className="text-left mt-8">
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900">
          Create account
        </h1>
        <p className="mt-2 text-sm sm:text-lg leading-8 text-gray-600">
          Join us today! It only takes a minute to set up your account.
        </p>
      </div>

      <div className="mt-10">
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Main Grid for Alignment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {/* Title & First Name Group */}
            <div className="grid grid-cols-4 gap-4 items-end">
              <div className="col-span-1">
                <label className={getLabelClassName("title")}>
                  Title
                </label>
                <input type="hidden" {...register("title")} />
                <div className="mt-2 flex min-h-[52px] w-full items-center justify-around border-b border-gray-100 pb-1">
                  {titleOptions.map((title) => (
                    <button
                      key={title}
                      type="button"
                      onClick={() => setValue("title", title, { shouldValidate: true, shouldDirty: true })}
                      className={`text-sm font-bold transition-all ${
                        titleValue === title 
                          ? "text-emerald-600 underline decoration-2 underline-offset-8" 
                          : "text-gray-400 hover:text-emerald-500"
                      }`}
                    >
                      {title}
                    </button>
                  ))}
                </div>
                {errors.title && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.title.message}</p>
                )}
              </div>
              <div className="col-span-3">
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
            </div>

            {/* Last Name */}
            <div>
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

            {/* Phone Number */}
            <div>
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
            <div>
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

          {/* PIN Setup (Vertical Flow) */}
          <div className="space-y-5">
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
              {isSubmitting ? "Creating Account..." : "Complete Registration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
