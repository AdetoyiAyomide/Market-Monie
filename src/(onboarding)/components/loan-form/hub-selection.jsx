import { FiMapPin, FiChevronRight, FiChevronDown, FiGlobe } from "react-icons/fi";
import { branchAddresses } from "../../../store/Data";

const HubSelection = ({ selectedState, selectedHub, onSelectState, onSelectHub, onContinue }) => {
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

  const handleStateChange = (e) => {
    onSelectState(e.target.value);
    onSelectHub(null); // Reset hub when state changes
  };

  const handleHubChange = (e) => {
    const hubName = e.target.value;
    const hub = hubs.find(h => h.name === hubName);
    onSelectHub(hub);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-left font-poppins">
        <div className="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-xl mb-6 text-emerald-600">
          <FiMapPin size={24} />
        </div>
        
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Select Your Hub
        </h2>
        <p className="mt-3 text-gray-600 text-[15px] leading-relaxed">
          Please select your current state and the nearest Market Monie hub to process your application.
        </p>
      </div>

      <div className="mt-10 space-y-6">
        {/* State Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
             Select State
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-emerald-600 transition-colors">
              <FiGlobe />
            </div>
            <select
              value={selectedState}
              onChange={handleStateChange}
              className="block w-full rounded-xl border-gray-200 border-2 bg-gray-50/30 pl-11 pr-11 py-4 text-gray-900 shadow-sm transition-all focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none font-medium appearance-none"
            >
              <option className="text-black bg-white" value="" disabled>Choose your state</option>
              {states.map((state, index) => (
                <option className="text-black bg-white" key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
              <FiChevronDown size={20} />
            </div>
          </div>
        </div>

        {/* Hub Selection */}
        {hasHubs ? (
          <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-500">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
               Available Hubs in {selectedState}
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-emerald-600 transition-colors">
                <FiMapPin />
              </div>
              <select
                value={selectedHub?.name || ""}
                onChange={handleHubChange}
                className="block w-full rounded-xl border-gray-200 border-2 bg-gray-50/30 pl-11 pr-11 py-4 text-gray-900 shadow-sm transition-all focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none font-medium appearance-none"
              >
                <option className="text-black bg-white" value="" disabled>Select a hub near you</option>
                {hubs.map((hub, index) => (
                  <option className="text-black bg-white" key={index} value={hub.name}>
                    {hub.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
                <FiChevronDown size={20} />
              </div>
            </div>
            
            {selectedHub && (
              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                 <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Hub Full Address</p>
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
                You can still proceed with your application. Our remote agents will reach out to you within 48-72 hours.
             </p>
          </div>
        )}

        <button
          onClick={onContinue}
          disabled={hasHubs && !selectedHub}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-4 text-sm font-semibold leading-6 text-white shadow-xl shadow-emerald-200/50 hover:bg-emerald-500 disabled:opacity-50 transition-all font-poppins mt-8 group"
        >
          {hasHubs ? "Continue" : "Continue anyway"}
          <FiChevronRight className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default HubSelection;
