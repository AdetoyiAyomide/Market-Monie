import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/auth";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    navigate("/dashboard");
  };

  return (
    <div>
      <div className="text-left font-poppins">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Welcome Back
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          New Here?{" "}
          <Link to="/register" className="font-semibold text-emerald-600 hover:text-emerald-500">
            Create An Account
          </Link>
        </p>
      </div>

      <div className="mt-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Phone Number
            </label>
            <div className="mt-2">
              <input
                {...register("phone")}
                type="tel"
                className="block w-full rounded-lg border-0 py-3.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 bg-gray-50/50"
                placeholder="e.g. 08123456789"
              />
              {errors.phone && (
                <p className="mt-2 text-xs text-red-500 font-medium">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2 relative">
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className="block w-full rounded-lg border-0 py-3.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 bg-gray-50/50"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
              {errors.password && (
                <p className="mt-2 text-xs text-red-500 font-medium">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
              />
              <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-700">
                Remember Me
              </label>
            </div>

            <div className="text-sm leading-6">
              <Link to="/forgot-password" title="Recover password" className="font-semibold text-emerald-600 hover:text-emerald-500">
                Forgot Password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-50 transition-all"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

