import { useState } from "react";
import { selectedStateGlobal, setSelectedHubGlobal } from "../store/Data";
import { branchAddresses } from "../store/Data";
import { useNavigate } from "react-router-dom";
import { PiWarningCircle } from "react-icons/pi";
import { FaArrowLeft } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { LuBuilding2 } from "react-icons/lu";
import ProgressBar from "./ProgressBar";

const HubSelection = () => {
  const navigate = useNavigate();
  const selectedState = selectedStateGlobal;
  const handleContinue = () => {
    if (selectedHubLocal) {
      setSelectedHubGlobal(selectedHubLocal);
      navigate("/create-account")
    }
  };

  const currentStep = 2;
  const [selectedHubLocal, setSelectedHubLocal] = useState("");

  const hubs = branchAddresses[selectedState]?.map((address, index) => ({
    name: `${selectedState} Hub ${index + 1}`,
    address,
  })) || [];


  return (
    <section className='w-full min-h-screen flex items-center justify-center'>
      <div className="p-6 mx-auto shadow-lg bg-white rounded-2xl">
        <div className="border-b border-slate-300">
          <button className="p-2 text-gray-500 hover:text-green-600 text-xl absolute hover:bg-slate-200 rounded-full transition-colors duration-200">
            <FaArrowLeft onClick={() => navigate("/")} className=" " />
          </button>
          <h3 className='w-full  rounded-t-2xl text-center pb-4 font-semibold '>Select State</h3>
          <div className='w-full'>
            <ProgressBar currentStep={currentStep} totalSteps={8} />
          </div>
        </div>
        <div className='flex items-center gap-3 text-md lg:text-2xl px-3 mt-2'>
          <div className='bg-[#e8f7ef] p-3 rounded-2xl'>
            <LuBuilding2 className=' text-[#3e8b4b]' />
          </div>
          <div className="flex flex-col p-2 mt-2">
            <h3>Select a Hub Near You</h3>
            <h3 className="text-sm text-gray-600 font-semibold mb-4">Hubs in <span className="text-black font-bold">{selectedState}</span></h3>
          </div>
        </div>


        {hubs.length > 0 ? (
          <div className="flex flex-col gap-4 my-3">

            {/* SCROLLABLE LIST ONLY */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {hubs.map((hub) => (
                <label
                  key={hub.name}
                  className={`flex text-start items-center justify-between p-4 border rounded-xl cursor-pointer transition-all duration-200 ${selectedHubLocal === hub.name
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200 hover:border-green-200 hover:bg-gray-50"
                    }`}
                >
                  <div className="flex flex-col gap-1 pr-4">
                    <span className={`text-sm font-semibold ${selectedHubLocal === hub.name ? "text-green-900" : "text-gray-800"
                      }`}>
                      {hub.name}
                    </span>
                    <span className={`text-xs ${selectedHubLocal === hub.name ? "text-green-700" : "text-gray-500"
                      }`}>
                      {hub.address}
                    </span>
                  </div>

                  <input
                    type="radio"
                    name="hub"
                    value={hub.name}
                    checked={selectedHubLocal === hub.name}
                    onChange={(e) => setSelectedHubLocal(e.target.value)}
                    className="mt-1 w-4 h-4 accent-green-600 shrink-0"
                  />
                </label>
              ))}
            </div>

            {/* BUTTON OUTSIDE SCROLL */}
            <button
              onClick={handleContinue}
              disabled={!selectedHubLocal}
              className={`w-full border p-2.5 rounded-xl text-white text-sm hover:bg-green-900 hover:text-white hover:border-green-900 transition-colors duration-400 ${selectedHubLocal
                ? "bg-[#8abfa0] hover:bg-green-200 shadow-md"
                : "bg-gray-300 cursor-not-allowed"
                }`}
            >
              Continue
            </button>

          </div>
        ) : (
          <div className="">
            <div>
              <div className="flex gap-2 items-start justify-center border-2 border-yellow-200 bg-yellow-100 rounded-xl p-4 mb-4">
                <div className="text-xl text-yellow-900 font-bold pt-1"><PiWarningCircle /></div>
                <div className="flex flex-col gap-2 text-yellow-800">
                  <div className="font-bold text-md text-yellow-900">
                    No hub in this state yet
                  </div>
                  <div className="text-sm max-w-md">
                    <p>We Currently do not have a MarketMonie hub in your state, but we are working on it. You can still proceed with your application, and an agent will reach out to you within <span className="font-bold">72 hours to 1 week</span></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 mb-6 p-3 ml-2 rounded-xl">
              <div className="flex gap-2 items-center text-gray-600">
                <div className="text-green-500 text-sm"><FaRegCircleCheck /></div>
                <div className="text-sm">Your application will be processed remotely</div>
              </div>
              <div className="flex gap-2 items-center text-gray-600">
                <div className="text-green-500 text-sm"><FaRegCircleCheck /></div>
                <div className="text-sm">An agent will call your registered number</div>
              </div>
              <div className="flex gap-2 items-center text-gray-600">
                <div className="text-green-500 text-sm"><FaRegCircleCheck /></div>
                <div className="text-sm">Verification can be done via video call</div>
              </div>
            </div>

            <button
              onClick={() => navigate("/create-account")}
              className="w-full border p-2.5 rounded-xl bg-green-800 text-white text-sm hover:bg-green-900 hover:text-white hover:border-green-900 transition-colors duration-400 "
            >
              Continue Anyway
            </button>

          </div>
        )}
      </div>
    </section>

  );
};

export default HubSelection;
