import { FiBell, FiUser, FiSearch, FiMenu } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const TopBar = ({ user, loanStage, toggleMobile }) => {
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.includes('/loan-requests')) return "Loan Requests";
    if (location.pathname.includes('/analytics')) return "Analytics Overview";
    if (location.pathname.includes('/settings')) return "Settings";
    if (location.pathname.includes('/support')) return "Support Center";
    if (location.pathname.includes('/make-payment')) return "Make Payment";
    return "Dashboard Overview";
  };

  return (
    <header className="h-20 bg-white border-b border-gray-100 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 shrink-0">
      {/* Left: Mobile Toggle & Greeting */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleMobile}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-xl text-gray-600 transition-colors"
        >
          <FiMenu size={20} />
        </button>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-0.5">
            <h1 className="text-sm md:text-xl font-bold text-gray-900 font-poppins line-clamp-1">
              {loanStage === 'NO_LOAN' ? (
                <>Hello {user.firstname}, you can borrow up to <span className="text-emerald-600">₦10,000,000</span></>
              ) : (
                <>Hello {user.firstname}</>
              )}
            </h1>
          </div>
          <p className="text-[9px] md:text-[10px] text-emerald-600 font-bold tracking-[0.2em]">
            {getTitle()}
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-6">
        {/* Search Bar (Static for now) */}
        <div className="hidden md:flex items-center bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 w-64 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
          <FiSearch className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="bg-transparent border-none outline-none ml-3 text-sm font-medium w-full"
          />
        </div>

        <div className="flex items-center gap-3 border-l border-gray-100 pl-6">
          <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 transition-all relative group">
            <FiBell size={20} />
            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white group-hover:animate-ping" />
          </button>
          
          <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-xl hover:bg-gray-50 transition-all">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-sm font-bold text-gray-900 leading-none">{user.firstname} {user.lastname}</span>
              <span className="text-[10px] text-gray-400 font-medium">Verified Merchant</span>
            </div>
            <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold border-2 border-emerald-50 shadow-sm shadow-emerald-100">
              {user.firstname[0]}{user.lastname[0]}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
