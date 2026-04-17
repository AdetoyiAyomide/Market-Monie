import { FiClock, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ComingSoon = ({ title }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 animate-in fade-in zoom-in-95 duration-700">
      <div className="h-24 w-24 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-emerald-200/20">
        <FiClock size={48} className="animate-pulse" />
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900 font-poppins mb-4">
        {title || "Feature Coming Soon"}
      </h2>
      
      <p className="text-gray-500 max-w-sm leading-relaxed mb-10">
        We are working hard to bring this feature to your business dashboard. Stay tuned for updates!
      </p>
      
      <button 
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-2 text-emerald-600 font-bold hover:gap-4 transition-all"
      >
        <FiArrowLeft /> Back to Dashboard
      </button>
    </div>
  );
};

export default ComingSoon;
