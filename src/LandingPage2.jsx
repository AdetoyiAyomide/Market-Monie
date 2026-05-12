import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import {
  FiArrowRight, FiArrowLeft, FiMapPin, FiHome, FiUser, FiUserPlus,
  FiSearch, FiCheckCircle, FiAlertCircle, FiMap
} from "react-icons/fi";
import {
  locations, branchAddresses, setSelectedStateGlobal, setSelectedHubGlobal,
  setNoHubStateGlobal, setIsGuestGlobal, setSelectedLgaGlobal, setSelectedAreaGlobal,
  setSelectedTownGlobal
} from "./store/Data";
import { stateLgaMapping } from "./store/LgaData";

const LandingPage2 = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Location (State + LGA + Town + Area), 2: Hub/No Hub Alert + Options, 3: Options (if Hub selected)
  const [selectedState, setSelectedState] = useState("");
  const [selectedLga, setSelectedLga] = useState("");
  const [selectedTown, setSelectedTown] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedHub, setSelectedHub] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLgaDropdownOpen, setIsLgaDropdownOpen] = useState(false);
  const [isHubDropdownOpen, setIsHubDropdownOpen] = useState(false);
  const [noHubAlert, setNoHubAlert] = useState(false);
  const dropdownRef = useRef(null);
  const lgaDropdownRef = useRef(null);
  const hubDropdownRef = useRef(null);


  const filteredStates = locations.filter(state =>
    state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const availableLgas = useMemo(() => {
    return selectedState ? stateLgaMapping[selectedState] || [] : [];
  }, [selectedState]);

  const filteredLgas = availableLgas.filter(lga =>
    lga.toLowerCase().includes(searchQuery.toLowerCase())
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
    setSelectedLga(""); // Reset LGA when state changes
    setSelectedLgaGlobal("");
    setSelectedTown("");
    setSelectedTownGlobal("");
    setSelectedArea("");
    setSelectedAreaGlobal("");
    setSelectedHub(""); // Reset hub selection when state changes
    setSearchQuery("");
    setIsDropdownOpen(false);
    // Stay on step 1 to show LGA selection
  };

  const handleLgaSelect = (lga) => {
    setSelectedLga(lga);
    setSelectedLgaGlobal(lga);
    setIsLgaDropdownOpen(false);
    setSearchQuery("");
    // Stay on step 1 to show Town input
  };

  const handleLocationContinue = () => {
    setSelectedTownGlobal(selectedTown);
    setSelectedAreaGlobal(selectedArea);
    
    const hubs = branchAddresses[selectedState] || [];

    if (hubs.length > 0) {
      setNoHubAlert(false);
      setNoHubStateGlobal(false);
    } else {
      setNoHubAlert(true);
      setNoHubStateGlobal(true);
      setSelectedHub("No Hub (Remote)");
      setSelectedHubGlobal("No Hub (Remote)");
    }
    setStep(2); // Move to Hub selection or No Hub alert
  };

  const handleHubSelect = (hub) => {
    setSelectedHub(hub.name);
    setSelectedHubGlobal(hub);
    setNoHubStateGlobal(false);
    setSearchQuery("");
    // setStep(3);
  };


  const handleContinueNoHub = () => {
    setSelectedHub("No Hub (Remote)");
    setSelectedHubGlobal("No Hub (Remote)");
    setNoHubStateGlobal(true);
    setStep(2);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (lgaDropdownRef.current && !lgaDropdownRef.current.contains(event.target)) {
        setIsLgaDropdownOpen(false);
      }
      if (hubDropdownRef.current && !hubDropdownRef.current.contains(event.target)) {
        setIsHubDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleBack = () => {
    if (step === 3) {
      setStep(2);
      setSelectedHub("");
    } else if (step === 2) {
      setStep(1);
      setSelectedLga("");
      setNoHubAlert(false);
    }
  };

  const AccountOptions = () => (
    <div className="w-full space-y-6 pt-4">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="h-[1px] w-8 bg-gray-100" />
          <p className="text-gray-400 dark:text-white text-[9px] font-bold tracking-[0.2em] uppercase">
            Final Step
          </p>
          <div className="h-[1px] w-8 bg-gray-100" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">How would you like to proceed?</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto w-full px-2">
       
        <motion.button
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setIsGuestGlobal(true);
            navigate("/apply/hub");
          }}
          className="group relative overflow-hidden p-6 md:p-8 rounded-[2rem] bg-white border border-gray-100 text-gray-900 dark:text-white dark:bg-black text-left min-h-[160px] md:min-h-[240px] transition-all shadow-xl shadow-gray-200/50 flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 p-6 opacity-[0.03]">
            <FiUser size={48} />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="p-3 w-fit rounded-2xl bg-emerald-50 text-emerald-600">
              <FiUser size={24} />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold leading-tight dark:text-white">Continue as Guest</h3>
              <p className="text-gray-500 dark:text-white text-xs md:text-sm mt-1 leading-relaxed max-w-[200px]">Apply without creating an account.</p>
            </div>
          </div>
          <div className="relative z-10 flex items-center gap-2 text-[10px] font-bold tracking-widest text-emerald-600 group-hover:gap-3 transition-all duration-400">
            EXPLORE NOW <FiArrowRight />
          </div>
        </motion.button>
         <motion.button
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setIsGuestGlobal(false);
            navigate("/register");
          }}
          className="group relative overflow-hidden p-6 md:p-8 rounded-[2rem] bg-emerald-600 text-white text-left shadow-2xl shadow-emerald-900/20 min-h-[160px] md:min-h-[240px] flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <FiUserPlus size={48} />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="p-3 w-fit rounded-2xl bg-white/20 backdrop-blur-md">
              <FiUserPlus size={24} />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold leading-tight dark:text-white">Create Account</h3>
              <p className="text-white/70 text-xs md:text-sm mt-1 leading-relaxed max-w-[200px]">Track Application, View Repayment History, Access Your Dashboard</p>
            </div>
          </div>
          <div className="relative z-10 flex items-center gap-2 text-[10px] font-bold tracking-widest group-hover:gap-3 transition-all duration-400">
            GET STARTED <FiArrowRight />
          </div>
        </motion.button>

      </div>

      <div className="text-center pt-8">
        <button
          onClick={handleBack}
          className="group inline-flex items-center gap-2 text-gray-400 dark:text-white text-[10px] font-bold tracking-widest hover:text-emerald-600 transition-all uppercase"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Go Back
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-black text-gray-900 dark:text-white font-poppins overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-50 dark:bg-emerald-200 blur-[120px] rounded-full hidden md:block" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gray-50 dark:bg-gray-200 blur-[120px] rounded-full hidden md:block" />
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
              {(noHubAlert ? [1, 2] : [1, 2, 3]).map((s) => (
                <div
                  key={s}
                  className={`h-1 w-8 rounded-full transition-all duration-500 ${step >= s ? 'bg-emerald-500' : 'bg-gray-100'}`}
                />
              ))}
            </div>
            <span className="text-[10px] tracking-widest font-bold text-gray-400 dark:text-white">Step 0{step} / 0{noHubAlert ? '2' : '3'}</span>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center pt-0 md:pt-0 max-w-4xl mx-auto w-full">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="w-full space-y-6"
              >
                <div className="text-center space-y-2 mt-5">
                  <h1 className="text-xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Start your <span className="text-emerald-500">business</span> funding journey</h1>
                  <p className="text-gray-500 dark:text-white text-xs md:text-sm max-w-sm mx-auto">Tell us where your business is located so we can schedule a quick business survey.</p>
                </div>

                <div className="max-w-md mx-auto space-y-6">
                  {/* State Selection */}
                  <div className="relative z-[60]" ref={dropdownRef}>
                    <div className="relative">
                      <FiSearch className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${selectedState ? 'text-emerald-500' : 'text-gray-400 dark:text-white'}`} />
                      <input
                        type="text"
                        placeholder="Select State..."
                        value={isDropdownOpen ? searchQuery : (selectedState || "")}
                        onFocus={() => {
                          setIsDropdownOpen(true);
                          setSearchQuery("");
                        }}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setIsDropdownOpen(true);
                        }}
                        className={`w-full bg-gray-50 dark:bg-black border rounded-2xl py-4 pl-12 pr-4 focus:outline-none transition-all dark:placeholder:text-white dark:text-white placeholder:text-gray-400 dark:text-white text-gray-900 dark:text-white shadow-sm font-medium ${isDropdownOpen ? 'border-emerald-500 ring-4 ring-emerald-500/5' : 'border-gray-100'}`}
                      />
                    </div>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute mt-1 w-full bg-white dark:bg-black border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden max-h-[250px] overflow-y-auto custom-scrollbar z-[70]"
                        >
                          {filteredStates.length > 0 ? (
                            <div className="p-2 space-y-1">
                              {filteredStates.map((state) => (
                                <button
                                  key={state}
                                  onClick={() => handleStateSelect(state)}
                                  className="w-full text-left p-3 rounded-xl hover:bg-emerald-500/10 hover:text-emerald-500 transition-all group flex justify-between items-center"
                                >
                                  <span className={`font-medium transition-colors ${selectedState === state ? 'text-emerald-500' : 'text-gray-600 dark:text-white'} group-hover:text-emerald-500`}>{state}</span>
                                  {selectedState === state && <FiCheckCircle className="text-emerald-500" />}
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

                  {/* LGA Selection - Appears under state */}
                  <AnimatePresence>
                    {selectedState && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <div className="space-y-4 relative z-50" ref={lgaDropdownRef}>
                          <label className="text-[10px] font-bold text-emerald-600 dark:text-white tracking-widest ml-1 uppercase">Local Government Area</label>
                          <div className="relative">
                            <FiMapPin className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${selectedLga ? 'text-emerald-500' : 'text-gray-400 dark:text-white'}`} />
                            <input
                              type="text"
                              placeholder="Select LGA..."
                              value={isLgaDropdownOpen ? searchQuery : (selectedLga || "")}
                              onFocus={() => {
                                setIsLgaDropdownOpen(true);
                                setSearchQuery("");
                              }}
                              onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setIsLgaDropdownOpen(true);
                              }}
                              className={`w-full bg-gray-50 dark:bg-black border rounded-2xl py-4 pl-12 pr-4 focus:outline-none transition-all placeholder:text-gray-400 dark:text-white dark:placeholder:text-white dark:text-white text-gray-900 dark:text-white shadow-sm font-medium ${isLgaDropdownOpen ? 'border-emerald-500 ring-4 ring-emerald-500/5' : 'border-gray-100'}`}
                            />
                          </div>

                          <AnimatePresence>
                            {isLgaDropdownOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute mt-1 w-full bg-white dark:bg-black border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden max-h-[250px] overflow-y-auto custom-scrollbar z-[70]"
                              >
                                {filteredLgas.length > 0 ? (
                                  <div className="p-2 space-y-1">
                                    {filteredLgas.map((lga) => (
                                      <button
                                        key={lga}
                                        onClick={() => handleLgaSelect(lga)}
                                        className="w-full text-left p-3 rounded-xl hover:bg-emerald-500/10 hover:text-emerald-500 transition-all group flex justify-between items-center"
                                      >
                                        <span className={`font-medium transition-colors ${selectedLga === lga ? 'text-emerald-500' : 'text-gray-600 dark:text-white'} group-hover:text-emerald-500`}>{lga}</span>
                                        {selectedLga === lga && <FiCheckCircle className="text-emerald-500" />}
                                      </button>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="p-8 text-center text-gray-300 italic text-sm">
                                    No LGAs found matching "{searchQuery}"
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Town/City Selection - Appears after LGA */}
                        <AnimatePresence>
                          {selectedLga && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="space-y-4"
                            >
                              <div className="space-y-4">
                                <label className="text-[10px] font-bold text-emerald-600 dark:text-white tracking-widest ml-1 uppercase">Town / City</label>
                                <div className="relative">
                                  <FiHome className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${selectedTown ? 'text-emerald-500' : 'text-gray-400 dark:text-white'}`} />
                                  <input
                                    type="text"
                                    placeholder="e.g. Uyo or Onitsha"
                                    value={selectedTown}
                                    onChange={(e) => {
                                    const value = e.target.value.replace(/[^A-Za-z\s]/g, "");
                                    setSelectedTown(value);
                                  }}
                                    className="w-full bg-gray-50 dark:bg-black border border-gray-100 dark:border-gray-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-500 transition-all placeholder:text-gray-400 dark:text-white dark:placeholder:text-white text-gray-900 dark:text-white shadow-sm font-medium dark:text-white"
                                  />
                                </div>
                              </div>

                              <div className="space-y-4">
                                <label className="text-[10px] font-bold text-emerald-600 dark:text-white tracking-widest ml-1 uppercase flex items-center gap-1.5">
                                  Area / Street Name <span className="text-gray-400 dark:text-white lowercase font-medium">(Optional)</span>
                                </label>
                                <div className="relative">
                                  <FiMapPin className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${selectedArea ? 'text-emerald-500' : 'text-gray-400 dark:text-white'}`} />
                                  <input
                                    type="text"
                                    placeholder="e.g. Market Road, Ojota"
                                    value={selectedArea}
                                    onChange={(e) => {
                                      const value = e.target.value.replace(/[^A-Za-z\s]/g, "");
                                      setSelectedArea(value)}}
                                    className="w-full bg-gray-50 dark:bg-black border border-gray-100 dark:border-gray-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-500 transition-all placeholder:text-gray-400 dark:text-white dark:placeholder:text-white text-gray-900 dark:text-white shadow-sm font-medium dark:text-white"
                                  />
                                </div>
                              </div>

                              <button
                                onClick={handleLocationContinue}
                                disabled={!selectedTown}
                                className="w-full bg-emerald-600 text-white rounded-2xl py-4 font-bold shadow-xl dark:shadow-none dark:hover:shadow-md shadow-emerald-200/50 hover:bg-emerald-500 transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-2 group mt-4"
                              >
                                Find Nearest Hub
                                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
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
                className="w-full space-y-4"
              >
                {noHubAlert ? (
                  <div className="space-y-6">
                    <div className="flex gap-4 bg-amber-50 border border-amber-100 rounded-3xl p-6 md:p-8 text-left max-w-2xl mx-auto shadow-sm">
                      <div className="shrink-0 p-3 rounded-2xl bg-amber-100 text-amber-600 h-fit">
                        <FiAlertCircle size={28} />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-lg font-bold text-amber-900 dark:text-amber-600">No hub in {selectedState} yet</h4>
                        <p className="text-sm md:text-base text-amber-800/80 leading-relaxed">
                          We currently do not have a Market Monie Agent in your location.  You can continue with your application, and we will notify you once an agent is available near you.
                        </p>
                      </div>
                    </div>
                    <AccountOptions />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Choose a <span className="text-emerald-500">Hub</span></h2>
                      <p className="text-gray-500 dark:text-white text-center text-xs md:text-sm max-w-sm mx-auto">Select the Market Monie office closest to your business in {selectedLga}, {selectedState}.</p>
                    </div>

                    <div className="relative max-w-md mx-auto z-40" ref={hubDropdownRef}>
                      <div className="relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white" />
                        <input
                          type="text"
                          placeholder="Select Hub..."
                          value={isHubDropdownOpen ? searchQuery : (selectedHub || "")}
                          onFocus={() => {
                            setIsHubDropdownOpen(true);
                            setSearchQuery("");
                          }}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setIsHubDropdownOpen(true);
                          }}
                          className={`w-full bg-gray-50 dark:bg-black border border-gray-100 dark:border-gray-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-emerald-500/50 transition-colors placeholder:text-gray-400 dark:text-white dark:placeholder:text-white dark:text-white text-gray-900 dark:text-white font-medium shadow-sm`}
                        />
                        {(searchQuery || selectedHub) && (
                          <button
                            onClick={() => {
                              setSearchQuery("");
                              setSelectedHub(null);
                              setIsHubDropdownOpen(false);
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-white transition-colors p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            <IoMdClose className="text-lg" />
                          </button>
                        )}
                      </div>

                      <AnimatePresence>
                        {isHubDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                            className="absolute mt-1 w-full bg-white dark:bg-black border border-gray-100 dark:border-gray-800 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden max-h-[300px] overflow-y-auto custom-scrollbar z-[100]"
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
                                    <div className={`p-2 rounded-xl transition-all ${selectedHub === hub.name ? 'bg-emerald-500 text-white' : 'bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white '}`}>
                                      <FiMapPin size={20} />
                                    </div>
                                    <div className="flex-1">
                                      <p className={`font-medium leading-snug transition-colors ${selectedHub === hub.name ? 'text-emerald-500' : 'text-gray-700 dark:text-white'} group-hover:text-emerald-500`}>{hub.name}</p>
                                      <p className="text-gray-400 dark:text-white dark:group-hover:text-black text-[10px] font-bold tracking-wider uppercase">Business Center</p>
                                    </div>
                                    <FiArrowRight className={`transition-all ${selectedHub === hub.name ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'} text-emerald-500`} />
                                  </button>
                                ))}
                              </div>
                            ) : (
                              <div className="p-10 text-center space-y-2">
                                <div className="text-gray-200 flex justify-center"><FiSearch size={32} /></div>
                                <p className="text-gray-400 dark:text-white italic text-sm">No hubs found matching "{searchQuery}"</p>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    {selectedHub && (
  <div className="max-w-md mx-auto bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 flex items-center gap-3">
    <div className="p-2 rounded-xl bg-emerald-500 text-white">
      <FiCheckCircle size={20} />
    </div>

    <div>
      <p className="text-xs uppercase tracking-widest text-emerald-600 font-bold">
        Selected Hub
      </p>
      <p className="font-semibold text-gray-800 dark:text-white">
        {selectedHub}
      </p>
    </div>
  </div>
)}

                    {selectedHub && (
  <div className="flex justify-center pt-4">
    <button
      onClick={() => setStep(3)}
      className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-emerald-200/50 transition-all flex items-center gap-2 group"
    >
      Confirm Hub
      <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
    </button>
  </div>
)}

                    <div className="text-center pt-4">
                      <button
                        onClick={handleBack}
                        className="text-gray-400 dark:text-white text-[10px] font-bold tracking-widest hover:text-emerald-600 transition-colors uppercase flex items-center justify-center gap-2 mx-auto"
                      >
                        <FiArrowLeft /> Change Location
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full"
              >
                <AccountOptions />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="mt-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6 text-[10px] font-bold tracking-widest text-gray-400 dark:text-white">
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
            <span className="text-[10px] font-bold text-gray-400 dark:text-white tracking-tighter uppercase">Trusted by 50k+ entrepreneurs</span>
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
