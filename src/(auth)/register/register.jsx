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

  const passwordValue = watch("password", "");
  const titleValue = watch("title", "");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (titleDropdownRef.current && !titleDropdownRef.current.contains(event.target)) {
        setIsTitleOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const calculateStrength = (password) => {
    if (!password) return { score: 0, label: "", color: "bg-gray-200" };
    let score = 0;
    if (password.length >= 2) score++;
    if (password.length >= 4) score++;
    if (password.length >= 6) score++;
    if (/^\d{6}$/.test(password)) score++;

    if (score <= 2) return { score, label: "Weak", color: "bg-red-500" };
    if (score === 3) return { score, label: "Medium", color: "bg-yellow-500" };
    return { score, label: "Strong", color: "bg-emerald-500" };
  };

  const strength = calculateStrength(passwordValue);

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
    navigate("/verify-email", {
      state: { email: data.email || "user@email.com" },
    });
  };


  return (
    <div>
      <JourneyHeader activeStep="account" />

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
              <input type="hidden" {...register("title")} />
              <div className="relative mt-2" ref={titleDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsTitleOpen((prev) => !prev)}
                  className="block w-full rounded-lg border-0 bg-gray-50/50 py-3.5 px-4 pr-11 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                >
                  <span className={titleValue ? "text-gray-900" : "text-gray-400"}>
                    {titleValue || "Select"}
                  </span>
                </button>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
                  {isTitleOpen ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                </div>
                {isTitleOpen && (
                  <div className="absolute left-0 right-0 top-[calc(100%+0.35rem)] z-20 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">
                    <ul className="max-h-56 overflow-y-auto py-2">
                      {titleOptions.map((title) => (
                        <li
                          key={title}
                          onClick={() => {
                            setValue("title", title, { shouldValidate: true, shouldDirty: true });
                            setIsTitleOpen(false);
                          }}
                          className={`cursor-pointer px-4 py-3 text-sm font-medium transition-colors hover:bg-emerald-50 hover:text-emerald-700 ${
                            titleValue === title ? "bg-emerald-50 text-emerald-700" : "text-gray-700"
                          }`}
                        >
                          {title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {errors.title && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.title.message}</p>
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
                  className="mt-2 block w-full rounded-lg border-0 py-3.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 bg-gray-50/50"
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.firstName.message}</p>
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
                  className="mt-2 block w-full rounded-lg border-0 py-3.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 bg-gray-50/50"
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.lastName.message}</p>
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
                className="mt-2 block w-full rounded-lg border-0 py-3.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 bg-gray-50/50"
              />
              {errors.phone && (
                <p className="mt-2 text-xs text-red-500 font-medium">{errors.phone.message}</p>
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
                className="mt-2 block w-full rounded-lg border-0 py-3.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 bg-gray-50/50"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.email.message}</p>
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
                  className="block w-full rounded-lg border-0 py-3.5 px-4 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 bg-gray-50/50 tracking-widest font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              
              {/* Strength Meter */}
              {passwordValue && (
                <div className="mt-2 space-y-2">
                  <div className="flex gap-1 h-1.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-full flex-1 rounded-full transition-all duration-300 ${
                          i <= strength.score ? strength.color : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-medium uppercase tracking-wider">
                    <span className="text-gray-500">Strength: {strength.label}</span>
                  </div>
                </div>
              )}
              
              <p className="mt-2 text-[11px] leading-relaxed text-gray-500">
                Enter exactly 6 digits for your PIN
              </p>
              
              {errors.password && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.password.message}</p>
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
                  className="block w-full rounded-lg border-0 py-3.5 px-4 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 bg-gray-50/50 tracking-widest font-mono"
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
