import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowRight, FiArrowLeft, FiMapPin, FiHome, FiUser, FiUserPlus,
  FiSearch, FiCheckCircle, FiAlertCircle
} from "react-icons/fi";
import { locations, branchAddresses, setSelectedStateGlobal, setSelectedHubGlobal, setNoHubStateGlobal, setIsGuestGlobal } from "./store/Data";

const LandingPage2 = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: State, 2: Hub, 3: Options
  const [selectedState, setSelectedState] = useState("");
  const [selectedHub, setSelectedHub] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHubDropdownOpen, setIsHubDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const hubDropdownRef = useRef(null);


  const filteredStates = locations.filter(state =>
    state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const availableHubs = useMemo(() => {
    const raw = selectedState ? branchAddresses[selectedState] || [] : [];
    return raw.map(address => ({
      name: address.split(',')[0],
      address: address
    }));
  }, [selectedState]);

  const filteredHubs = availableHubs.filter(hub =>
    hub.address.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const handleStateSelect = (state) => {
    setSelectedState(state);
    setSelectedStateGlobal(state);
    setNoHubStateGlobal(false); // Reset on new state selection
    setSearchQuery("");
    setStep(2);
  };

  const handleHubSelect = (hub) => {
    setSelectedHub(hub.name);
    setSelectedHubGlobal(hub); // Now passing the object {name, address}
    setNoHubStateGlobal(false);
    setStep(3);
  };


  const handleContinueNoHub = () => {
    setSelectedHub("No Hub (Remote)");
    setSelectedHubGlobal("No Hub (Remote)");
    setNoHubStateGlobal(true);
    setStep(3);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (hubDropdownRef.current && !hubDropdownRef.current.contains(event.target)) {
        setIsHubDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleBack = () => {

    if (step === 2) {
      setStep(1);
      setSelectedState("");
    } else if (step === 3) {
      setStep(2);
      setSelectedHub("");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0a0f0d] text-white font-poppins overflow-hidden">

      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-900/10 blur-[120px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'url(/Pattern.svg)',
            backgroundSize: '200px',
            backgroundRepeat: 'repeat',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen px-6 md:px-12 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <img src="/market-monie.png" alt="Logo" className="h-10 w-auto" />
          </motion.div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-1">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1 w-8 rounded-full transition-all duration-500 ${step >= s ? 'bg-emerald-500' : 'bg-white/10'}`}
                />
              ))}
            </div>
            <span className="text-[10px] tracking-widest font-bold text-white/40">Step 0{step} / 03</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full space-y-8"
              >
                <div className="text-center space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Select
                    the state where your <span className="text-emerald-500">business</span> operates</h1>
                  <p className="text-white/50 max-w-md mx-auto">This helps us send an agent closest to you.</p>
                </div>

                <div className="relative max-w-md mx-auto z-50" ref={dropdownRef}>
                  <div className="relative">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      type="text"
                      placeholder="Search or Select State..."
                      value={searchQuery || (selectedState && !isDropdownOpen ? selectedState : "")}
                      onFocus={() => {
                        setIsDropdownOpen(true);
                      }}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setIsDropdownOpen(true);
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-500/50 transition-colors placeholder:text-white/20"
                    />
                  </div>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute mt-1 w-full bg-[#0d1412]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-3xl overflow-hidden max-h-[300px] overflow-y-auto custom-scrollbar"
                      >
                        {filteredStates.length > 0 ? (
                          <div className="p-2 space-y-1">
                            {filteredStates.map((state) => (
                              <button
                                key={state}
                                onClick={() => {
                                  handleStateSelect(state);
                                  setIsDropdownOpen(false);
                                }}
                                className="w-full text-left p-4 rounded-xl hover:bg-emerald-500/10 hover:text-emerald-500 transition-all group flex justify-between items-center"
                              >
                                <span className={`font-medium transition-colors ${selectedState === state ? 'text-emerald-400' : 'text-white/70'} group-hover:text-emerald-400`}>{state}</span>
                                <FiArrowRight className={`transition-all ${selectedState === state ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'} text-emerald-500`} />
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="p-8 text-center text-white/20 italic text-sm">
                            No states found matching "{searchQuery}"
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>


              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full space-y-8"
              >
                <div className="relative flex flex-col items-center border-b border-white/10 pb-8 mb-4">
                  <button onClick={handleBack} className="absolute left-0 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/5 hover:bg-white/20 transition-colors">
                    <FiArrowLeft />
                  </button>
                  <div className="text-center space-y-2">
                    <h2 className="text-emerald-500 text-sm font-bold tracking-[0.3em]">{selectedState} State</h2>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Choose a <span className="text-emerald-500">Hub</span></h1>
                  </div>
                </div>

                <p className="text-white/50 text-center max-w-md mx-auto">Select the Market Monie office closest to your place of business.</p>


                {availableHubs.length > 0 ? (
                  <div className="relative max-w-md mx-auto z-40" ref={hubDropdownRef}>
                    <div className="relative">
                      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                      <input
                        type="text"
                        placeholder="Search or Select Hub..."
                        value={searchQuery || (selectedHub && !isHubDropdownOpen ? selectedHub : "")}
                        onFocus={() => {
                          setIsHubDropdownOpen(true);
                        }}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          if (!isHubDropdownOpen) setIsHubDropdownOpen(true);
                          if (selectedHub) setSelectedHub(""); // Clear selection when typing
                        }}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-500/50 transition-colors placeholder:text-white/20 text-white font-medium shadow-inner"
                      />
                    </div>

                    <AnimatePresence>
                      {isHubDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.98 }}
                          className="absolute mt-1 w-full bg-[#0d1412]/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden max-h-[360px] overflow-y-auto custom-scrollbar z-[100]"
                        >
                          {filteredHubs.length > 0 ? (
                            <div className="p-3 grid grid-cols-1 gap-2">
                              {filteredHubs.map((hub, i) => (
                                <button
                                  key={i}
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    handleHubSelect(hub);
                                    setIsHubDropdownOpen(false);
                                  }}
                                  className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-left hover:border-emerald-500/30 hover:bg-emerald-500/10 transition-all"
                                >
                                  <div className={`p-2 rounded-xl transition-all ${selectedHub === hub.name ? 'bg-emerald-500 text-white' : 'bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white'}`}>
                                    <FiMapPin size={20} />
                                  </div>
                                  <div className="flex-1">
                                    <p className={`font-medium leading-snug transition-colors ${selectedHub === hub.name ? 'text-emerald-400' : 'text-white/80'} group-hover:text-emerald-400`}>{hub.name}</p>
                                    <p className="text-white/30 text-[10px] font-bold tracking-wider">Business Center</p>
                                  </div>
                                  <FiArrowRight className={`transition-all ${selectedHub === hub.name ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'} text-emerald-500`} />
                                </button>

                              ))}
                            </div>
                          ) : (
                            <div className="p-10 text-center space-y-2">
                              <div className="text-white/10 flex justify-center"><FiSearch size={32} /></div>
                              <p className="text-white/20 italic text-sm">No hubs found matching "{searchQuery}"</p>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (

                  <div className="col-span-full py-12 px-6 mb-4 text-center bg-emerald-500/5 border border-emerald-500/10 rounded-[2.5rem] flex flex-col items-center gap-6">
                    <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-500">
                      <FiAlertCircle size={32} />
                    </div>
                    <div className="space-y-2 max-w-lg">
                      <p className="text-white/80 font-medium text-lg leading-relaxed">
                        We currently do not have a MarketMonie office in your selected state.
                      </p>
                      <p className="text-white/40 text-sm leading-relaxed italic">
                        You can still proceed with your application, and an agent will reach out to you within 5 working days.
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleContinueNoHub}
                      className="px-10 py-4 rounded-full bg-emerald-600 text-white font-bold tracking-widest text-xs hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-500/20"
                    >
                      Continue Application
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="w-full max-w-2xl space-y-12"
              >
                <div className="text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex p-4 rounded-full bg-emerald-500/20 text-emerald-500 mb-2"
                  >
                    <FiCheckCircle size={40} />
                  </motion.div>
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Great choice!</h1>
                  <p className="text-white/50 text-lg">
                    You've selected <span className="text-white font-bold">{selectedState}</span> - <span className="text-white font-bold">{selectedHub}</span>.
                    How would you like to proceed?
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                  <motion.button
                    whileHover={{ y: -5 }}
                    onClick={() => {
                      setIsGuestGlobal(false);
                      navigate("/register");
                    }}
                    className="group relative overflow-hidden p-8 rounded-[2rem] bg-emerald-600 text-white text-left shadow-2xl shadow-emerald-900/40"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                      <FiUserPlus size={80} />
                    </div>
                    <div className="relative z-10 space-y-4">
                      <div className="p-3 w-fit rounded-xl bg-white/20">
                        <FiUserPlus size={24} />
                      </div>
                      <h3 className="text-2xl font-bold">Create Account</h3>
                      <p className="text-white/70 text-sm leading-relaxed">Track
                        application, faster re-apply, repayment history.</p>
                      <div className="flex items-center gap-2 text-xs font-bold tracking-widest pt-4 hover:gap-4 transition-all duration-400">
                        Get Started <FiArrowRight />
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ y: -5 }}
                    onClick={() => {
                      setIsGuestGlobal(true);
                      navigate("/onboarding/bvn");
                    }}
                    className="group relative overflow-hidden p-8 rounded-[2rem] bg-white/5 border border-white/10 text-white text-left hover:bg-white/10 transition-colors"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                      <FiUser size={80} />
                    </div>
                    <div className="relative z-10 space-y-4">
                      <div className="p-3 w-fit rounded-xl bg-white/10 text-emerald-500">
                        <FiUser size={24} />
                      </div>
                      <h3 className="text-2xl font-bold">Continue as Guest</h3>
                      <p className="text-white/40 text-sm leading-relaxed">Apply without
                        creating an account.</p>
                      <div className="flex items-center gap-2 text-xs font-bold tracking-widest pt-4 text-emerald-500 hover:gap-4 transition-all duration-400">
                        Explore Now <FiArrowRight />
                      </div>
                    </div>
                  </motion.button>
                </div>

                <div className="text-center">
                  <button
                    onClick={handleBack}
                    className="text-white/30 text-xs font-bold tracking-widest hover:text-white transition-colors"
                  >
                    Change location
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="mt-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6 text-[10px] font-bold tracking-widest text-white/20">
            <span>© 2026 Market Monie</span>
            <span className="hidden md:inline">|</span>
            <span className="hover:text-emerald-500 cursor-pointer transition-colors">Safety Center</span>
            <span className="hover:text-emerald-500 cursor-pointer transition-colors">Help & Support</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-6 w-6 rounded-full border-2 border-[#0a0f0d] bg-gray-800" />
              ))}
            </div>
            <span className="text-[10px] font-medium text-white/40 tracking-tighter">Trusted by 50k+ entrepreneurs</span>
          </div>
        </footer>
      </div>

      <style>
        {`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.5);
        }
        `}
      </style>
    </div>
  );
};

export default LandingPage2;
