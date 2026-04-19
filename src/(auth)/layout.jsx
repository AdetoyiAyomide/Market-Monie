import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";

const AuthLayout = () => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="flex min-h-screen bg-white"
    >
      <div className="w-full py-6 px-6 sm:px-10 lg:px-16">
        <div className="pt-2 px-5 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between gap-4 mb-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 p-2 sm:px-4 sm:py-2 text-sm font-medium text-slate-600 transition-colors hover:border-emerald-200 hover:text-emerald-700"
            >
              <FiArrowLeft className="text-base" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <img src="/market-monie.png" alt="Market Monie" className="h-8 w-auto" />
          </div>
        </div>

        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </motion.div>
  );
};

export default AuthLayout;
