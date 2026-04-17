import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";

const OnboardingLayout = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 sm:px-6"
    >
      <div className="w-full max-w-4xl rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8 lg:p-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-emerald-200 hover:text-emerald-700"
          >
            <FiArrowLeft className="text-base" />
            Back
          </button>
          <img src="/market-monie.png" alt="Market Monie" className="h-8 w-auto" />
        </div>

        <div className="mx-auto w-full max-w-xl">
          <Outlet />
        </div>
      </div>
    </motion.div>
  );
};

export default OnboardingLayout;
