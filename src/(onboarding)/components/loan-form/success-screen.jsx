import { FiCheckCircle, FiClock, FiSmartphone, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { isGuestGlobal } from "../../../store/Data";


const ApplicationSuccess = ({ referenceId }) => {
  const navigate = useNavigate();

  return (
    <div className="animate-in fade-in zoom-in-95 duration-700 py-10">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-10">
          <div className="h-32 w-32  rounded-full flex items-center justify-center ">
            <div className="h-24 w-24 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-emerald-200">
              <FiCheckCircle size={48} />
            </div>
          </div>
        </div>

        <h2 className="text-xl sm:text-3xl font-bold font-poppins text-gray-900 mb-4 px-4">
          Application Received!
        </h2>
        
        <div className="bg-emerald-50 text-emerald-700 px-6 py-3 rounded-full font-bold text-sm mb-8">
          Reference ID: {referenceId || "MM-58302"}
        </div>

        <div className="space-y-6 max-w-sm px-4">
          <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 text-left">
            <FiClock className="shrink-0 text-emerald-600 mt-1" size={20} />
            <p className="text-sm text-gray-600 leading-relaxed">
              We’ll review your application and contact you within <span className="font-bold">24–48 hours</span>.
            </p>
          </div>

          <div className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 text-left">
            <FiSmartphone className="shrink-0 text-emerald-600 mt-1" size={20} />
            <p className="text-sm text-gray-600 leading-relaxed">
              You’ve received an SMS/Email with your reference ID. Please log in to your account to track updates.
            </p>
          </div>
        </div>

        {!isGuestGlobal ? (
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-12 flex items-center justify-center gap-2 w-full max-w-xs rounded-xl bg-green-600 py-4 text-sm font-bold text-white shadow-xl hover:bg-green-500 transition-all font-poppins group"
          >
            Take Me to Dashboard
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </button>
        ) : (
          <div className="mt-12 space-y-4 w-full max-w-xs">
            <button
              onClick={() => navigate('/register')}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-600 py-4 text-sm font-bold text-white shadow-xl hover:bg-emerald-500 transition-all font-poppins group"
            >
              Create Your Account First
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>
            <p className="text-[10px] text-gray-400 font-medium px-4">
              Register now to track your application status and access your business dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationSuccess;
