import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SuccessScreen = ({ 
  title = "Success!", 
  description = "Your action was successful.", 
  redirectPath = "/", 
  countdownSeconds = 5 
}) => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(countdownSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    if (timer === 0) {
      navigate(redirectPath);
    }

    return () => clearInterval(interval);
  }, [timer, navigate, redirectPath]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 text-center animate-in fade-in duration-700">
      <div className="h-24 w-24 bg-emerald-100 rounded-full flex items-center justify-center mb-8 animate-bounce">
        <div className="h-16 w-16 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
      </div>
      
      <h2 className="text-3xl font-bold font-poppins text-gray-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-gray-600 max-w-md text-lg font-sans">
        {description}
      </p>

      <div className="mt-12 flex flex-col items-center gap-6">
        <div className="flex gap-2">
          {Array.from({ length: countdownSeconds }).map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 w-10 rounded-full transition-all duration-500 ${
                i < (countdownSeconds - timer) ? "bg-emerald-600 w-12" : "bg-gray-100"
              }`} 
            />
          ))}
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest">
            Redirecting in {timer}s
          </p>
          <button 
            onClick={() => navigate(redirectPath)}
            className="text-xs text-gray-400 hover:text-emerald-600 underline transition-colors"
          >
            Click here if not redirected
          </button>
        </div>
      </div>
      
      {/* Brand Watermark */}
      <div className="absolute bottom-10 opacity-20">
        <img src="/market-monie.png" alt="" className="h-6 grayscale" />
      </div>
    </div>
  );
};

export default SuccessScreen;
