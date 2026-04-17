import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../schemas/auth";
import { Link, useNavigate } from "react-router-dom";

import { FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError: setFormError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const passwordValue = watch("password", "");
  const phoneValue = watch("phone", "");

  const calculateStrength = (password) => {
    if (!password) return { score: 0, label: "", color: "bg-gray-200" };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { score, label: "Weak", color: "bg-red-500" };
    if (score === 3) return { score, label: "Medium", color: "bg-yellow-500" };
    return { score, label: "Strong", color: "bg-emerald-500" };
  };

  const strength = calculateStrength(passwordValue);
  const isWeak = strength.label === "Weak";

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
    navigate("/verify-otp", { state: { phone: data.phone } });
  };


  return (
    <div>
      <div className="text-left font-poppins">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Create an account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-10">
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Title and Name Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </label>
              <select
                {...register("title")}
                className={`mt-2 block w-full rounded-lg border-0 py-3.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-gray-50/50 appearance-none cursor-pointer transition-all ${
                  errors.title 
                    ? "ring-red-300 focus:ring-red-600" 
                    : "ring-gray-300 focus:ring-emerald-600"
                }`}
              >
                <option value="">Select</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
                <option value="Miss">Miss</option>
                <option value="Dr">Dr</option>
              </select>
              {errors.title && (
                <p className="mt-1 text-xs text-red-500 font-medium animate-in fade-in slide-in-from-top-1">{errors.title.message}</p>
              )}
            </div>

            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  First Name
                </label>
                <input
                  {...register("firstName")}
                  type="text"
                  placeholder="e.g. John"
                  className={`mt-2 block w-full rounded-lg border-0 py-3.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-gray-50/50 transition-all ${
                    errors.firstName 
                      ? "ring-red-300 focus:ring-red-600" 
                      : "ring-gray-300 focus:ring-emerald-600"
                  }`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-500 font-medium animate-in fade-in slide-in-from-top-1">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Last Name
                </label>
                <input
                  {...register("lastName")}
                  type="text"
                  placeholder="e.g. Doe"
                  className={`mt-2 block w-full rounded-lg border-0 py-3.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-gray-50/50 transition-all ${
                    errors.lastName 
                      ? "ring-red-300 focus:ring-red-600" 
                      : "ring-gray-300 focus:ring-emerald-600"
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-500 font-medium animate-in fade-in slide-in-from-top-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Phone Number
              </label>
               <input
                {...register("phone")}
                type="tel"
                placeholder="e.g. 08123456789"
                className={`mt-2 block w-full rounded-lg border-0 py-3.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-gray-50/50 transition-all ${
                  errors.phone 
                    ? "ring-red-300 focus:ring-red-600" 
                    : "ring-gray-300 focus:ring-emerald-600"
                }`}
              />
              {errors.phone && (
                <p className="mt-2 text-xs text-red-500 font-medium animate-in fade-in slide-in-from-top-1">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email Address <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="e.g. john@example.com"
                className={`mt-2 block w-full rounded-lg border-0 py-3.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-gray-50/50 transition-all ${
                  errors.email 
                    ? "ring-red-300 focus:ring-red-600" 
                    : "ring-gray-300 focus:ring-emerald-600"
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500 font-medium animate-in fade-in slide-in-from-top-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* PIN Setup */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Create 6-Digit PIN
              </label>
              <div className="mt-2 relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  maxLength={6}
                  placeholder="••••••"
                  className={`block w-full rounded-lg border-0 py-3.5 px-4 pr-12 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-gray-50/50 tracking-widest font-mono transition-all ${
                    errors.password 
                      ? "ring-red-300 focus:ring-red-600" 
                      : "ring-gray-300 focus:ring-emerald-600"
                  }`}
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
                <p className="mt-1 text-xs text-red-500 font-medium animate-in fade-in slide-in-from-top-1">{errors.password.message}</p>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Confirm 6-Digit PIN
              </label>
              <div className="mt-2 relative">
                <input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  maxLength={6}
                  placeholder="••••••"
                  className={`block w-full rounded-lg border-0 py-3.5 px-4 pr-12 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-gray-50/50 tracking-widest font-mono transition-all ${
                    errors.confirmPassword 
                      ? "ring-red-300 focus:ring-red-600" 
                      : "ring-gray-300 focus:ring-emerald-600"
                  }`}
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
                <p className="mt-1 text-xs text-red-500 font-medium animate-in fade-in slide-in-from-top-1">{errors.confirmPassword.message}</p>
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
              className="flex w-full justify-center rounded-lg bg-emerald-600 px-3 py-4 text-sm font-bold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-50 transition-all font-poppins uppercase tracking-widest"
            >
              {isSubmitting ? "Creating account..." : "Complete Registration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;


