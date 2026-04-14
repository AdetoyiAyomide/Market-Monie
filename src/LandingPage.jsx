import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowRight, FiLogIn, FiDollarSign,
  FiTwitter, FiLinkedin, FiFacebook, FiInstagram,
  FiChevronLeft, FiChevronRight, FiUserCheck, FiUserPlus
} from "react-icons/fi";

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState(0); // 0: New User, 1: Returning User
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNavigation = (path) => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate(path);
    }, 100);
  };

  const modes = [
    {
      id: 0,
      label: "New Entrepreneur",
      title: "Empower Your Business Growth",
      desc: "Get quick, reliable financial support tailored for your business needs. Apply in minutes.",
      cta: "Request for Loan",
      path: "/register",
      icon: <FiUserPlus />,
      color: "emerald",
      bg: "/monie.jpg"
    },
    {
      id: 1,
      label: "Returning Client",
      title: "Welcome Back to Market Monie",
      desc: "Manage your active loans, track repayments, and explore new financial opportunities.",
      cta: "Return to Account",
      path: "/login",
      icon: <FiUserCheck />,
      color: "emerald",
      bg: "/market-woman.jpg"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isNavigating ? {
        scale: 1.2,
        opacity: 0,
        filter: "blur(10px)",
      } : {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
      className="relative h-screen w-full overflow-hidden bg-gray-900 font-poppins"
    >

      {/* 1. Base Image Background */}
      <div className="absolute inset-0 z-0">
        <motion.img
          key={activeMode}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1.5 }}
          src={modes[activeMode].bg}
          className="h-full w-full object-cover mix-blend-luminosity grayscale-90 blur-[2px]"
          alt="Market Monie Background"
        />

        {/* Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-90 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: 'url(/Pattern.svg)',
            backgroundSize: '300px',
            backgroundRepeat: 'repeat',
          }}
        />

        <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/60 to-gray-900/20" />

        <motion.div
          animate={{ background: "radial-gradient(circle at 30% 50%, transparent 0%, rgba(16, 185, 129, 0.1) 40%, rgba(17, 24, 39, 0.95) 100%)" }}
          className="absolute inset-0 pointer-events-none transition-colors duration-1000"
        />
      </div>

      {/* 2. Content Layer */}
      <div className="relative z-10 h-full w-full flex flex-col px-6 md:px-12 py-6">

        {/* Navigation */}
        <nav className="flex justify-between items-center z-20">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <img
              src="/market-monie.png"
              alt="Market Monie Logo"
              className="h-10 md:h-12 w-auto drop-shadow-2xl"
            />
          </motion.div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation("/login")}
              className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold hover:bg-white hover:text-gray-900 transition-all"
            >
              Sign In
            </motion.button>
          </div>
        </nav>

        {/* 3-Column Layout */}
        <div className="flex-1 grid grid-cols-12 items-center gap-4 py-8">

          {/* Socials column */}
          <div className="hidden lg:col-span-1 lg:flex flex-col items-center gap-8">
            <div className="h-16 w-[1px] bg-white/10" />
            <div className="flex flex-col gap-6 text-white/30">
              {[FiTwitter, FiLinkedin, FiFacebook, FiInstagram].map((Icon, i) => (
                <motion.div key={i} whileHover={{ scale: 1.3, color: '#10b981' }} className="cursor-pointer">
                  <Icon size={18} />
                </motion.div>
              ))}
            </div>
            <div className="h-16 w-[1px] bg-white/10" />
            <p className="[writing-mode:vertical-lr] text-[9px] uppercase font-bold tracking-[6px] text-white/20">
              MarketMonie
            </p>
          </div>

          {/* Central Section - Mode Dependent */}
          <div className="col-span-12 lg:col-span-8 flex flex-col items-start justify-center pl-4 lg:pl-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMode}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-2xl flex flex-col items-start text-left"
              >
                <div className={`px-4 py-1.5 rounded-full bg-${modes[activeMode].color}-500/10 border border-${modes[activeMode].color}-500/20 text-${modes[activeMode].color}-500 text-[10px] font-bold uppercase tracking-widest mb-8`}>
                  {modes[activeMode].label}
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] tracking-tighter mb-8 ">
                  {modes[activeMode].id === 0 ? (
                    <>Empower Your <br /><span className="text-emerald-500 ">Business</span> Growth</>
                  ) : (
                    <>Welcome Back to <br /><span className="text-emerald-500 ">Market</span> Monie</>
                  )}
                </h1>

                <p className="text-base text-gray-400 max-w-lg mb-12 leading-relaxed font-medium">
                  {modes[activeMode].desc}
                </p>

                <motion.button
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleNavigation(modes[activeMode].path)}
                  className={`group relative overflow-hidden px-10 py-5 rounded-[2.5rem] bg-${modes[activeMode].color}-600 text-white shadow-2xl shadow-${modes[activeMode].color}-900/40 w-full max-w-sm`}
                >
                  <div
                    className="absolute inset-0 opacity-40 bg-white pointer-events-none mix-blend-overlay"
                    style={{
                      WebkitMaskImage: 'url(/Pattern.svg)',
                      WebkitMaskSize: '150px',
                      maskImage: 'url(/Pattern.svg)',
                    }}
                  />
                  <div className="relative z-10 flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-sm">
                    {modes[activeMode].cta} <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Section: Mode Carousel Switcher */}
          <div className="hidden lg:col-span-3 lg:flex flex-col items-end">
            <div className="w-full max-w-[280px] space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-[2px] text-white/30 text-right pr-4">Personalize View</p>

              <div className="relative p-1 bg-white/5 rounded-4xl border border-white/10 backdrop-blur-xl">
                <motion.div
                  layout
                  className={`absolute inset-1 w-[calc(50%-4px)] h-[calc(100%-8px)] bg-emerald-600 rounded-[1.8rem] z-0 shadow-lg`}
                  animate={{ x: activeMode === 0 ? 0 : '100%' }}
                />
                <div className="relative z-10 flex">
                  <button
                    onClick={() => setActiveMode(0)}
                    className={`flex-1 flex flex-col items-center py-6 transition-colors duration-500 ${activeMode === 0 ? 'text-white' : 'text-white/40'}`}
                  >
                    <FiUserPlus size={20} className="mb-2" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">New Loan</span>
                  </button>
                  <button
                    onClick={() => setActiveMode(1)}
                    className={`flex-1 flex flex-col items-center py-6 transition-colors duration-500 ${activeMode === 1 ? 'text-white' : 'text-white/40'}`}
                  >
                    <FiUserCheck size={20} className="mb-2" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Returning</span>
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Market Context</span>
                </div>
                <p className="text-[11px] text-gray-400 font-medium leading-relaxed italic">
                  "Market Monie helped me scale my kiosk to a mini-mart in just 3 months."
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-gray-700 border border-white/10" />
                  <span className="text-[10px] font-bold text-white/50">Mama Chioma, Lagos</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Global Footer */}
        <footer className="mt-auto py-6 border-t border-white/5 flex justify-between items-center text-gray-600 text-[10px] uppercase font-bold tracking-[2px]">
          <p>© 2026 Market Monie. Empowering Entrepreneurs.</p>
          <div className="flex gap-10">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-white cursor-pointer transition-colors">Contact</span>
          </div>
        </footer>

      </div>
    </motion.div>
  );
};

export default LandingPage;
