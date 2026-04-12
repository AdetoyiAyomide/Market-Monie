import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiLogIn, FiDollarSign } from "react-icons/fi";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative max-h-screen w-full overflow-hidden bg-gray-900 font-poppins">
      
      {/* 1. Base Image Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/monie.jpg" 
          className="h-full w-full object-cover opacity-60 mix-blend-luminosity grayscale-40" 
          alt="Market Monie Background" 
        />
        {/* Dark Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-gray-900/80 via-transparent to-transparent" />
      </div>



      {/* 3. Content Layer */}
      <div className="relative z-10 min-h-screen flex flex-col px-6 md:px-16 lg:px-24 py-6 w-full">
        
        {/* Logo Header */}
        <nav className="flex justify-between items-center mb-auto">
          <div className="flex items-center gap-2 group cursor-pointer transition-transform hover:scale-105">
            <img 
              src="/market-monie.png" 
              alt="Market Monie Logo" 
              className="h-10 md:h-12 w-auto drop-shadow-2xl" 
            />
          </div>
          <button 
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold hover:bg-white/20 transition-all active:scale-95"
          >
            <FiLogIn /> Sign In
          </button>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col flex-1 justify-center py-10 max-w-2xl">
         
          
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-4 animate-in slide-in-from-left duration-700 delay-100">
            Empower Your <br />
            <span className="text-emerald-500 italic decoration-emerald-500/30 underline-offset-8">Business</span> Growth
          </h1>
          
          {/* <p className="text-base text-gray-300 leading-relaxed max-w-lg mb-8 animate-in slide-in-from-left duration-700 delay-200">
            Get quick, reliable financial support tailored for entrepreneurs. Choose how you want to proceed today.
          </p> */}

          {/* Main Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-bottom-10 duration-1000 delay-300">
            
            {/* CTA 1: Loan Application */}
            <button 
              onClick={() => navigate("/register")}
              className="group relative overflow-hidden p-6 rounded-3xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-xl shadow-emerald-900/40 hover:-translate-y-1 text-left"
            >
              {/* Pattern Overlay inside button */}
              <div 
                className="absolute inset-0 opacity-90 bg-white pointer-events-none mix-blend-overlay"
                style={{ 
                  WebkitMaskImage: 'url(/Pattern.svg)',
                  WebkitMaskSize: '120px',
                  WebkitMaskRepeat: 'repeat',
                  maskImage: 'url(/Pattern.svg)',
                  maskSize: '120px',
                  maskRepeat: 'repeat'
                }}
              />
              <div className="absolute top-0 right-0 -mr-4 -mt-4 h-24 w-24 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20" />
              
              <div className="relative z-10">
                <FiDollarSign className="text-2xl mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold mb-1">Request for Loan</h3>
                <p className="text-white/70 text-xs mb-4 leading-relaxed">
                  Step into the future of business financing with simple steps.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-black/10 w-fit px-3 py-1.5 rounded-full">
                  Get Started <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>

            {/* CTA 2: Dashboard/Login */}
            <button 
              onClick={() => navigate("/login")}
              className="group relative overflow-hidden p-6 rounded-3xl bg-gray-800/40 backdrop-blur-xl border border-white/10 hover:border-white/30 text-white transition-all hover:-translate-y-1 text-left"
            >
              {/* Pattern Overlay inside button */}
              <div 
                className="absolute inset-0 opacity-90 bg-emerald-400 pointer-events-none mix-blend-overlay"
                style={{ 
                  WebkitMaskImage: 'url(/Pattern.svg)',
                  WebkitMaskSize: '120px',
                  WebkitMaskRepeat: 'repeat',
                  maskImage: 'url(/Pattern.svg)',
                  maskSize: '120px',
                  maskRepeat: 'repeat'
                }}
              />
              <div className="absolute top-0 right-0 -mr-4 -mt-4 h-24 w-24 rounded-full bg-white/5 blur-2xl group-hover:bg-white/10" />
              
              <div className="relative z-10">
                <FiLogIn className="text-2xl mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold mb-1">Return to Account</h3>
                <p className="text-gray-400 text-xs mb-4 leading-relaxed">
                  Already have an application or active loan? Sign in here.
                </p>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest border border-white/20 w-fit px-3 py-1.5 rounded-full group-hover:bg-white group-hover:text-gray-900 transition-all">
                  Login <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>

          </div>
        </div>

        {/* Footer info */}
        <footer className="mt-auto pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-[10px] uppercase font-bold tracking-[2px]">
          <p>© 2026 Market Monie. All Rights Reserved.</p>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Support</span>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default LandingPage;
