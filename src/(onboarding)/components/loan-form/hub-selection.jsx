import { useEffect, useMemo, useRef, useState } from "react";
import { FiMapPin, FiChevronRight, FiChevronDown, FiChevronUp, FiGlobe } from "react-icons/fi";
import { branchAddresses } from "../../../store/Data";

const HubSelection = ({ selectedState, selectedHub, onSelectState, onSelectHub, onContinue }) => {
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [stateQuery, setStateQuery] = useState(selectedState || "");
  const [isHubOpen, setIsHubOpen] = useState(false);
  const stateDropdownRef = useRef(null);
  const hubDropdownRef = useRef(null);

  // Map our states to handle the FCT (Abuja) case if necessary
  const displayState = selectedState === "Abuja" ? "FCT (Abuja)" : selectedState;
  const hubsRaw = branchAddresses[displayState] || [];

  // Transform raw addresses into hub objects consistent with our components
  const hubs = hubsRaw.map((address, index) => ({
    name: address.split(',')[0], // Use the first part of address as a name
    address: address
  }));

  const hasHubs = hubs.length > 0;
  const states = Object.keys(branchAddresses);

  const filteredStates = useMemo(() => {
    const query = stateQuery.trim().toLowerCase();

    if (!query) {
      return states;
    }

    return states.filter((state) => state.toLowerCase().includes(query));
  }, [stateQuery, states]);

  useEffect(() => {
    setStateQuery(selectedState || "");
  }, [selectedState]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target)) {
        setIsStateOpen(false);
        setStateQuery(selectedState || "");
      }

      if (hubDropdownRef.current && !hubDropdownRef.current.contains(event.target)) {
        setIsHubOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedState]);

  const handleStateInputChange = (e) => {
    const value = e.target.value;
    setStateQuery(value);
    setIsStateOpen(true);
    onSelectState("");
    onSelectHub(null);
  };

  const handleStateSelect = (state) => {
    setStateQuery(state);
    setIsStateOpen(false);
    setIsHubOpen(false);
    onSelectState(state);
    onSelectHub(null); // Reset hub when state changes
  };

  const handleHubSelect = (hub) => {
    setIsHubOpen(false);
    onSelectHub(hub);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="hidden sm:block text-left font-poppins">
        <div className="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-xl mb-6 text-emerald-600">
          <FiMapPin size={24} />
        </div>

        <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-gray-900">
          Select Your Hub
        </h2>
        <p className="mt-3 text-gray-600 text-xs sm:text-[15px] leading-relaxed">
          Please select your current state and the nearest Market Monie office to process your application.
        </p>
      </div>

      <div className="mt-10 space-y-6">
        {/* State Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 tracking-widest ml-1">
            Select
            the State Where Your Business Operates
          </label>
          <div className="relative group" ref={stateDropdownRef}>
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-emerald-600 transition-colors">
              <FiGlobe />
            </div>
            <input
              type="text"
              value={stateQuery}
              onFocus={() => setIsStateOpen(true)}
              onClick={() => setIsStateOpen(true)}
              onChange={handleStateInputChange}
              placeholder="Choose your state"
              className="block w-full rounded-xl border-gray-200 border-2 bg-gray-50/30 pl-11 pr-11 py-4 text-gray-900 shadow-sm transition-all focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none font-medium"
            />
            <button
              type="button"
              onClick={() => setIsStateOpen((prev) => !prev)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400"
              aria-label="Toggle state dropdown"
            >
              {isStateOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
            </button>
            {isStateOpen && (
              <div className="absolute left-0 right-0 top-[calc(100%+0.35rem)] z-20 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                <ul className="max-h-56 overflow-y-auto py-2">
                  {filteredStates.length > 0 ? (
                    filteredStates.map((state) => (
                      <li
                        key={state}
                        onClick={() => handleStateSelect(state)}
                        className="cursor-pointer px-4 py-3 text-xs sm:text-sm font-medium text-gray-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        {state}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-3 text-sm text-gray-400">No states found</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Hub Selection */}
        {hasHubs ? (
          <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-500">
            <label className="text-xs font-bold text-gray-400 tracking-widest ml-1">
              Available Hubs In {selectedState}
            </label>
            <div className="relative group" ref={hubDropdownRef}>
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-emerald-600 transition-colors">
                <FiMapPin />
              </div>
              <button
                type="button"
                onClick={() => setIsHubOpen((prev) => !prev)}
                className="block w-full rounded-xl border-gray-200 border-2 bg-gray-50/30 pl-11 pr-11 py-4 text-left text-gray-900 shadow-sm transition-all focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none font-medium"
              >
                <span className={selectedHub ? "text-gray-900" : "text-gray-400"}>
                  {selectedHub?.name || "Select a hub near you"}
                </span>
              </button>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
                {isHubOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
              </div>
              {isHubOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+0.35rem)] z-20 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
                  <ul className="max-h-56 overflow-y-auto py-2">
                    {hubs.map((hub) => (
                      <li
                        key={hub.address}
                        onClick={() => handleHubSelect(hub)}
                        className="cursor-pointer px-4 py-3 text-xs sm:text-sm font-medium text-gray-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        {hub.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {selectedHub && (
              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <p className="text-xs font-bold text-emerald-700 tracking-wider mb-1">Hub Full Address</p>
                <p className="text-sm text-emerald-900 leading-relaxed font-sans font-medium italic">
                  {selectedHub.address}
                </p>
              </div>
            )}
          </div>
        ) : selectedState && (
          <div className="p-8 text-center bg-amber-50 rounded-2xl border-2 border-amber-100 border-dashed animate-in fade-in zoom-in-95 duration-500">
            <div className="inline-flex items-center justify-center h-16 w-16 bg-amber-100 rounded-full text-amber-600 mb-4 mx-auto">
              <FiMapPin size={32} />
            </div>
            <p className="text-amber-900 font-semibold mb-2">No Hub Service in {selectedState} yet</p>
            <p className="text-sm text-amber-700 leading-relaxed italic">
              You can still proceed with your application. Our remote agents will reach out to you within 5 working days.
            </p>
          </div>
        )}

        <button
          onClick={onContinue}
          disabled={!selectedState || (hasHubs && !selectedHub)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-4 text-sm font-semibold leading-6 text-white shadow-xl shadow-emerald-200/50 hover:bg-emerald-500 disabled:opacity-50 transition-all font-poppins mt-8 group"
        >
          {hasHubs ? "Continue" : "Continue Anyway"}
          <FiChevronRight className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default HubSelection;
