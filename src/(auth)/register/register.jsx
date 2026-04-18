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
  const titleDropdownRef = useRef(null);
  const titleOptions = ["Mr", "Mrs", "Ms", "Miss", "Dr"];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError: setFormError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const watchedFields = watch();
  const passwordValue = watchedFields.password || "";
  const titleValue = watchedFields.title || "";

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (titleDropdownRef.current && !titleDropdownRef.current.contains(event.target)) {
        setIsTitleOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const onSubmit = async (data) => {
    // Mock check for existing phone
    if (data.phone === "08123456789") {
      setFormError("phone", {
        type: "manual",
        message: "This phone number is already registered."
      });
      return;
    }

    console.log("Register Data:", data);
    localStorage.setItem("firstName", data.firstName);
    localStorage.setItem("lastName", data.lastName);
    navigate("/verify-otp", {
      state: { phone: data.phone },
    });
  };


  return (
    <div>
      <JourneyHeader activeStep="account" />

      <div className="hidden sm:block text-left font-poppins">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
          Create An Account
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-500">
            Sign In
          </Link>
        </p>
      </div>

      <div className="mt-10">
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Title and Name Grid (TOP) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <label className="block text-xs sm:text-sm font-medium leading-6 text-gray-900">
                Title <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input type="hidden" {...register("title")} />
              <div className="mt-2 flex min-h-[52px] w-full items-center flex-wrap gap-3">
                {titleOptions.map((title) => (
                  <button
                    key={title}
                    type="button"
                    onClick={() => setValue("title", title, { shouldValidate: true, shouldDirty: true })}
                    className={`text-sm font-medium transition-all ${
                      titleValue === title 
                        ? "text-emerald-600 underline decoration-2 underline-offset-4" 
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

            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium leading-6 text-gray-900">
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
              <div>
                <label className="block text-xs sm:text-sm font-medium leading-6 text-gray-900">
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
          </div>

          {/* Contact Info (Beneath Name) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500 font-medium sm:text-sm z-10">
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
            <div>
              <label className="block text-xs sm:text-sm font-medium leading-6 text-gray-900">
                Email Address <span className="text-gray-400 font-normal">(Optional)</span>
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
