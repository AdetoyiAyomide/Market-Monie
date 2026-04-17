import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const AuthLayout = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
        <div className="px-8 pb-12 pt-10">
          <div className="flex justify-center mb-10">
            <img 
              src="/market-monie.png" 
              alt="Market Monie Logo" 
              className="h-10 w-auto" 
            />
          </div>
          <div className="mx-auto max-w-lg">
            <Outlet />
          </div>
        </div>
      </div>
      
      {/* Footer / Helper Text */}
      <p className="mt-8 text-center text-sm text-slate-400 font-poppins">
        &copy; {new Date().getFullYear()} Market Monie. All rights reserved.
      </p>
    </motion.div>
  );
};

export default AuthLayout;
