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
  const [noHubAlert, setNoHubAlert] = useState(false);
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
    setSelectedHub(""); // Reset hub selection when state changes
    const hubs = branchAddresses[state] || [];
    
    if (hubs.length > 0) {
      setNoHubAlert(false);
      setNoHubStateGlobal(false);
    } else {
      setNoHubAlert(true);
      setNoHubStateGlobal(true);
      setSelectedHub("No Hub (Remote)");
      setSelectedHubGlobal("No Hub (Remote)");
    }
    setSearchQuery("");
  };

  const handleHubSelect = (hub) => {
    setSelectedHub(hub.name);
    setSelectedHubGlobal(hub);
    setNoHubStateGlobal(false);
    // Stay on step 1, options will show below
  };


  const handleContinueNoHub = () => {
    setSelectedHub("No Hub (Remote)");
    setSelectedHubGlobal("No Hub (Remote)");
    setNoHubStateGlobal(true);
    // Stay on step 1, options will show below
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
    if (selectedHub) {
      setSelectedHub("");
    } else if (selectedState) {
      setSelectedState("");
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-white text-gray-900 font-poppins overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-50 blur-[120px] rounded-full hidden md:block" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gray-50 blur-[120px] rounded-full hidden md:block" />
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: 'url(/Pattern.svg)',
            backgroundSize: '240px',
            backgroundRepeat: 'repeat',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen px-6 md:px-12 py-4">
        {/* Header */}
        <header className="flex justify-between items-center mb-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <img src="/market-monie.png" alt="Logo" className="h-10 w-auto" />
          </motion.div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-1">
              {[1].map((s) => (
                <div
                  key={s}
                  className={`h-1 w-8 rounded-full transition-all duration-500 ${step >= s ? 'bg-emerald-500' : 'bg-gray-100'}`}
                />
              ))}
            </div>
            <span className="text-[10px] tracking-widest font-bold text-gray-400">Step 01 / 01</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center pt-0 md:pt-0 max-w-4xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full space-y-4"
              >
                <div className="text-center space-y-2 mt-5">
                  <h1 className="text-xl md:text-3xl font-bold tracking-tight text-gray-900">Select
                    the state where your <span className="text-emerald-500">business</span> operates</h1>
                  <p className="text-gray-500 text-xs md:text-sm max-w-sm mx-auto">This helps us send an agent closest to you.</p>
                </div>
                <div className="relative max-w-md mx-auto z-50" ref={dropdownRef}>
                  <div className="relative">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
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
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-500/50 transition-colors placeholder:text-gray-400 text-gray-900 shadow-sm"
                    />
                  </div>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute mt-1 w-full bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden max-h-[300px] overflow-y-auto custom-scrollbar"
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
                                <span className={`font-medium transition-colors ${selectedState === state ? 'text-emerald-500' : 'text-gray-600'} group-hover:text-emerald-500`}>{state}</span>
                                <FiArrowRight className={`transition-all ${selectedState === state ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'} text-emerald-500`} />
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="p-8 text-center text-gray-300 italic text-sm">
                            No states found matching "{searchQuery}"
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                  {selectedState && availableHubs.length > 0 && !noHubAlert && (
                    <motion.div
                      key="hub-selection"
                      initial={{ opacity: 0, height: 0, y: 10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: 10 }}
                      className="space-y-4 pt-4 w-full"
                    >
                      <div className="text-center space-y-1">
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">Choose a <span className="text-emerald-500">Hub</span></h2>
                        <p className="text-gray-400 text-center text-[10px] sm:text-xs max-w-xs mx-auto">Select the Market Monie office closest to your business in {selectedState}.</p>
                      </div>

                      <div className="relative max-w-md mx-auto z-40" ref={hubDropdownRef}>
                        <div className="relative">
                          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search or Select Hub..."
                            value={searchQuery || (selectedHub && !isHubDropdownOpen ? selectedHub : "")}
                            onFocus={() => setIsHubDropdownOpen(true)}
                            onChange={(e) => {
                              setSearchQuery(e.target.value);
                              if (!isHubDropdownOpen) setIsHubDropdownOpen(true);
                              if (selectedHub) setSelectedHub("");
                            }}
                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-500/50 transition-colors placeholder:text-gray-400 text-gray-900 font-medium shadow-sm"
                          />
                        </div>

                        <AnimatePresence>
                          {isHubDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.98 }}
                              className="absolute mt-1 w-full bg-white border border-gray-100 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden max-h-[300px] overflow-y-auto custom-scrollbar z-[100]"
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
                                      className="group flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100 text-left hover:border-emerald-500/30 hover:bg-emerald-50 transition-all"
                                    >
                                      <div className={`p-2 rounded-xl transition-all ${selectedHub === hub.name ? 'bg-emerald-500 text-white' : 'bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white'}`}>
                                        <FiMapPin size={20} />
                                      </div>
                                      <div className="flex-1">
                                        <p className={`font-medium leading-snug transition-colors ${selectedHub === hub.name ? 'text-emerald-500' : 'text-gray-700'} group-hover:text-emerald-500`}>{hub.name}</p>
                                        <p className="text-gray-400 text-[10px] font-bold tracking-wider uppercase">Business Center</p>
                                      </div>
                                      <FiArrowRight className={`transition-all ${selectedHub === hub.name ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'} text-emerald-500`} />
                                    </button>
                                  ))}
                                </div>
                              ) : (
                                <div className="p-10 text-center space-y-2">
                                  <div className="text-gray-200 flex justify-center"><FiSearch size={32} /></div>
                                  <p className="text-gray-400 italic text-sm">No hubs found matching "{searchQuery}"</p>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}

                  {noHubAlert && (
                    <motion.div 
                      key="no-hub-alert"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-6 pt-4 w-full"
                    >
                      {/* No Hub Alert */}
                      <div className="flex gap-3 bg-amber-50 border border-amber-100 rounded-2xl p-4 text-left max-w-md mx-auto">
                        <div className="shrink-0 p-2 rounded-lg bg-amber-100 text-amber-600 h-fit">
                          <FiAlertCircle size={20} />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-amber-900">No hub in {selectedState} yet</h4>
                          <p className="text-xs text-amber-800/80 leading-relaxed">
                            We don't have a physical hub in this state, but you can still apply! 
                            An agent will contact you within 5 working days.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Options Section (Premium Cards) */}
                <AnimatePresence>
                  {(selectedHub || noHubAlert) && (
                    <motion.div
                      key="options-section"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="w-full space-y-6 pt-4"
                    >
                      <div className="text-center space-y-2">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <div className="h-[1px] w-8 bg-gray-100" />
                          <p className="text-gray-400 text-[9px] font-bold tracking-[0.2em] uppercase">
                            Final Step
                          </p>
                          <div className="h-[1px] w-8 bg-gray-100" />
                        </div>
                        <h2 className="text-lg md:text-xl font-bold text-gray-900">How would you like to proceed?</h2>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto w-full px-2">
                        <motion.button
                          whileHover={{ y: -4, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setIsGuestGlobal(false);
                            navigate("/register");
                          }}
                          className="group relative overflow-hidden p-6 rounded-[2rem] bg-emerald-600 text-white text-left shadow-2xl shadow-emerald-900/20 h-45 md:h-60"
                        >
                          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <FiUserPlus size={48} />
                          </div>
                          <div className="relative z-10 space-y-4">
                            <div className="p-3 w-fit rounded-2xl bg-white/20 backdrop-blur-md">
                              <FiUserPlus size={24} />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold leading-tight">Create Account</h3>
                              <p className="text-white/70 text-xs mt-1 leading-relaxed">Track your application and repayment history easily.</p>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest -mt-1 md:pt-2 group-hover:gap-3 transition-all duration-400">
                              GET STARTED <FiArrowRight />
                            </div>
                          </div>
                      </motion.button>

                        <motion.button
                          whileHover={{ y: -4, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setIsGuestGlobal(true);
                            navigate("/apply/hub");
                          }}
                          className="group relative overflow-hidden p-6 rounded-[2rem] bg-white border border-gray-100 text-gray-900 text-left hover:bg-gray-50/50 h-45 md:h-60 transition-all shadow-xl shadow-gray-200/50"
                        >
                          <div className="absolute top-0 right-0 p-6 opacity-[0.03]">
                            <FiUser size={48} />
                          </div>
                          <div className="relative z-10 space-y-4">
                            <div className="p-3 w-fit rounded-2xl bg-emerald-50 text-emerald-600">
                              <FiUser size={24} />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold leading-tight">Continue as Guest</h3>
                              <p className="text-gray-500 text-xs mt-1 leading-relaxed">Apply quickly without creating a permanent account.</p>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest -mt-1 md:pt-2 text-emerald-600 group-hover:gap-3 transition-all duration-400">
                              EXPLORE NOW <FiArrowRight />
                            </div>
                          </div>
                        </motion.button>
                      </div>

                      <div className="text-center pt-4">
                        <button
                          onClick={handleBack}
                          className="text-gray-400 text-[10px] font-bold tracking-widest hover:text-emerald-600 transition-colors uppercase"
                        >
                          Change Location
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="mt-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6 text-[10px] font-bold tracking-widest text-gray-400">
            <span>© 2026 Market Monie</span>
            <span className="hidden md:inline">|</span>
            <span className="hover:text-emerald-500 cursor-pointer transition-colors uppercase">Safety Center</span>
            <span className="hover:text-emerald-500 cursor-pointer transition-colors uppercase">Help & Support</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-6 w-6 rounded-full border-2 border-white bg-gray-100" />
              ))}
            </div>
            <span className="text-[10px] font-bold text-gray-400 tracking-tighter uppercase">Trusted by 50k+ entrepreneurs</span>
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
