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
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1 w-8 rounded-full transition-all duration-500 ${step >= s ? 'bg-emerald-500' : 'bg-gray-100'}`}
                />
              ))}
            </div>
            <span className="text-[10px] tracking-widest font-bold text-gray-400">Step 0{step} / 03</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-start pt-0 md:pt-0 max-w-4xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="w-full space-y-4"
              >
                <div className="text-center space-y-2">
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


              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full space-y-3"
              >
                <div className="relative flex flex-col items-center border-b border-gray-50 pb-2 mb-1">
                  <button onClick={handleBack} className="absolute left-0 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-50 shadow-sm text-gray-500">
                    <FiArrowLeft size={16} />
                  </button>
                  <div className="text-center space-y-0.5">
                    <h2 className="text-emerald-600 text-[9px] font-bold tracking-[0.3em] uppercase">{selectedState} State</h2>
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">Choose a <span className="text-emerald-500">Hub</span></h1>
                    <p className="text-gray-400 text-center text-[10px] sm:text-xs max-w-xs mx-auto pt-0.5">Select the Market Monie office closest to your business.</p>
                  </div>
                </div>


                {availableHubs.length > 0 ? (
                  <div className="relative max-w-md mx-auto z-40" ref={hubDropdownRef}>
                    <div className="relative">
                      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
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
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-500/50 transition-colors placeholder:text-gray-400 text-gray-900 font-medium shadow-sm"
                      />
                    </div>

                    <AnimatePresence>
                      {isHubDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.98 }}
                          className="absolute mt-1 w-full bg-white border border-gray-100 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden max-h-[360px] overflow-y-auto custom-scrollbar z-[100]"
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
                ) : (

                  <div className="col-span-full py-12 px-6 mb-4 text-center bg-gray-50 border border-gray-200 rounded-[2.5rem] flex flex-col items-center gap-6 shadow-sm">
                    <div className="p-4 rounded-full bg-emerald-100 text-emerald-600">
                      <FiAlertCircle size={32} />
                    </div>
                    <div className="space-y-2 max-w-lg">
                      <p className="text-gray-800 font-medium text-lg leading-relaxed">
                        We currently do not have a MarketMonie office in your selected state.
                      </p>
                      <p className="text-gray-500 text-sm leading-relaxed italic">
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
                className="w-full max-w-2xl space-y-8"
              >
                <div className="text-center space-y-4">
                  <p className="text-gray-500 text-lg md:text-xl font-medium">
                    You've selected <span className="text-emerald-600 font-bold">{selectedState}</span> - <span className="text-emerald-600 font-bold">{selectedHub}</span>.
                  </p>
                  <p className="text-gray-400 text-sm tracking-widest font-bold uppercase">
                    How would you like to proceed?
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                  <motion.button
                    whileHover={{ y: -3 }}
                    onClick={() => {
                      setIsGuestGlobal(false);
                      navigate("/register");
                    }}
                    className="group relative overflow-hidden p-5 rounded-2xl bg-emerald-600 text-white text-left shadow-xl shadow-emerald-900/20"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <FiUserPlus size={48} />
                    </div>
                    <div className="relative z-10 space-y-3">
                      <div className="p-2 w-fit rounded-lg bg-white/20">
                        <FiUserPlus size={20} />
                      </div>
                      <h3 className="text-lg font-bold">Create Account</h3>
                      <p className="text-white/70 text-xs leading-relaxed">Track
                        application, repayment history.</p>
                      <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest pt-2 hover:gap-3 transition-all duration-400">
                        Get Started <FiArrowRight />
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ y: -3 }}
                    onClick={() => {
                      setIsGuestGlobal(true);
                      navigate("/apply/hub");
                    }}
                    className="group relative overflow-hidden p-5 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 text-left hover:bg-gray-100 transition-colors shadow-sm"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
                      <FiUser size={48} />
                    </div>
                    <div className="relative z-10 space-y-3">
                      <div className="p-2 w-fit rounded-lg bg-white border border-gray-200 text-emerald-500 shadow-sm">
                        <FiUser size={20} />
                      </div>
                      <h3 className="text-lg font-bold">Continue as Guest</h3>
                      <p className="text-gray-500 text-xs leading-relaxed">Apply without
                        creating an account.</p>
                      <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest pt-2 text-emerald-600 hover:gap-3 transition-all duration-400">
                        Explore Now <FiArrowRight />
                      </div>
                    </div>
                  </motion.button>
                </div>

                <div className="text-center">
                  <button
                    onClick={handleBack}
                    className="text-gray-400 text-xs font-bold tracking-widest hover:text-emerald-600 transition-colors uppercase"
                  >
                    Change location
                  </button>
                </div>
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
