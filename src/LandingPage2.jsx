import { useState, useEffect } from "react";
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

  const filteredStates = locations.filter(state => 
    state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const availableHubs = selectedState ? branchAddresses[selectedState] || [] : [];
  const filteredHubs = availableHubs.filter(hub => 
    hub.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setSelectedStateGlobal(state);
    setNoHubStateGlobal(false); // Reset on new state selection
    setSearchQuery("");
    setStep(2);
  };

  const handleHubSelect = (hub) => {
    setSelectedHub(hub);
    setSelectedHubGlobal(hub);
    setNoHubStateGlobal(false);
    setStep(3);
  };

  const handleContinueNoHub = () => {
    setSelectedHub("No Hub (Remote)");
    setSelectedHubGlobal("No Hub (Remote)");
    setNoHubStateGlobal(true);
    setStep(3);
  };

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
            <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Step 0{step} / 03</span>
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
                  <h2 className="text-emerald-500 text-sm font-bold uppercase tracking-[0.3em]">Location First</h2>
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Select your <span className="text-emerald-500">State</span></h1>
                  <p className="text-white/50 max-w-md mx-auto">Wherever you are in Nigeria, Market Monie is close to you. Start by picking your state.</p>
                </div>

                <div className="relative max-w-md mx-auto">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input 
                      type="text" 
                      placeholder="Search states..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-500/50 transition-colors placeholder:text-white/20"
                    />
                </div>

                {/* Desktop Grid View */}
                <div className="hidden md:grid grid-cols-4 gap-3 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar w-full">
                  {filteredStates.map((state) => (
                    <motion.button
                      key={state}
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(16, 185, 129, 0.1)" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleStateSelect(state)}
                      className="p-4 rounded-2xl bg-white/5 border border-white/5 text-sm font-medium transition-all hover:border-emerald-500/30 text-left"
                    >
                      {state}
                    </motion.button>
                  ))}
                </div>

                {/* Mobile Dropdown View */}
                <div className="md:hidden w-full max-w-md mx-auto space-y-4">
                  <div className="relative">
                    <select 
                      onChange={(e) => handleStateSelect(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 focus:outline-none focus:border-emerald-500/50 transition-colors appearance-none cursor-pointer text-white/80"
                      value={selectedState}
                    >
                      <option value="" disabled>Select State</option>
                      {filteredStates.map(state => (
                        <option key={state} value={state} className="bg-[#0a0f0d] text-white">
                          {state}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-500">
                      <FiArrowRight className="rotate-90" />
                    </div>
                  </div>
                  
                  {searchQuery && filteredStates.length === 0 && (
                    <p className="text-center text-white/30 text-xs italic">No states matching "{searchQuery}"</p>
                  )}
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
                <div className="flex items-center gap-4 mb-4">
                  <button onClick={handleBack} className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
                    <FiArrowLeft />
                  </button>
                  <div>
                    <h2 className="text-emerald-500 text-xs font-bold uppercase tracking-widest">{selectedState} State</h2>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Find your <span className="text-emerald-500">Hub</span></h1>
                  </div>
                </div>

                <p className="text-white/50">Select the Market Monie hub closest to your place of business.</p>

                  {filteredHubs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredHubs.map((hub, i) => (
                        <motion.button
                          key={i}
                          initial={{ opacity: 0, y: 10, delay: i * 0.1 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          onClick={() => handleHubSelect(hub)}
                          className="group flex items-start gap-4 p-6 rounded-3xl bg-white/5 border border-white/5 text-left hover:border-emerald-500/30 transition-all"
                        >
                          <div className="mt-1 p-2 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                            <FiMapPin size={20} />
                          </div>
                          <div className="space-y-1">
                            <p className="text-white/80 font-medium leading-snug">{hub}</p>
                            <p className="text-white/30 text-xs font-bold uppercase tracking-wider">Business Center</p>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="col-span-full py-12 px-6 text-center bg-emerald-500/5 border border-emerald-500/10 rounded-[2.5rem] flex flex-col items-center gap-6">
                       <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-500">
                          <FiAlertCircle size={32} />
                       </div>
                       <div className="space-y-2 max-w-lg">
                          <p className="text-white/80 font-medium text-lg leading-relaxed">
                             We currently do not have a MarketMonie hub in your selected state. 
                          </p>
                          <p className="text-white/40 text-sm leading-relaxed italic">
                             You can still proceed with your application, and an agent will reach out to you within 72 hours to 1 week.
                          </p>
                       </div>
                       <motion.button
                         whileHover={{ scale: 1.05 }}
                         whileTap={{ scale: 0.95 }}
                         onClick={handleContinueNoHub}
                         className="px-10 py-4 rounded-full bg-emerald-600 text-white font-bold uppercase tracking-widest text-xs hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-500/20"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.button
                    whileHover={{ y: -10 }}
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
                        <p className="text-white/70 text-sm leading-relaxed">Join thousands of entrepreneurs and unlock full access to loans and tracking.</p>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest pt-4">
                           Get Started <FiArrowRight />
                        </div>
                     </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ y: -10 }}
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
                        <p className="text-white/40 text-sm leading-relaxed">Explore our platform first. You can always create an account later to apply.</p>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest pt-4 text-emerald-500">
                           Explore Now <FiArrowRight />
                        </div>
                     </div>
                  </motion.button>
                </div>

                <div className="text-center">
                  <button 
                    onClick={handleBack}
                    className="text-white/30 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
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
           <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-white/20">
              <span>© 2026 MARKET MONIE</span>
              <span className="hidden md:inline">|</span>
              <span className="hover:text-emerald-500 cursor-pointer transition-colors">Safety Center</span>
              <span className="hover:text-emerald-500 cursor-pointer transition-colors">Help & Support</span>
           </div>
           
           <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="h-6 w-6 rounded-full border-2 border-[#0a0f0d] bg-gray-800" />
                 ))}
              </div>
              <span className="text-[10px] font-medium text-white/40 uppercase tracking-tighter">Trusted by 50k+ entrepreneurs</span>
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
