import { NavLink } from "react-router-dom";
import { 
  FiHome, 
  FiFileText, 
  FiSettings, 
  FiHelpCircle, 
  FiLogOut,
  FiChevronDown,
  FiPieChart,
  FiChevronLeft,
  FiMenu,
  FiX
} from "react-icons/fi";
import { useState } from "react";

const Sidebar = ({ isCollapsed, setIsCollapsed, isMobileOpen, setIsMobileOpen }) => {
  const [isLoanMenuOpen, setIsLoanMenuOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
    { 
      name:"Loan Requests", 
      icon: <FiFileText />, 
      path: "/dashboard/loan-requests",
      hasSubmenu: true,
      submodules: [
        { name: "Loan History", path: "/dashboard/loan-requests/history" },
        { name: "Status Tracker", path: "/dashboard/loan-requests/tracker" },
        { name: "Loan Details", path: "/dashboard/loan-requests/details" },
      ]
    },
    { name: "Analytics", icon: <FiPieChart />, path: "/dashboard/analytics" },
  ];

  const bottomItems = [
    { name: "Support", icon: <FiHelpCircle />, path: "/dashboard/support" },
    { name: "Settings", icon: <FiSettings />, path: "/dashboard/settings" },
  ];

  const sidebarClasses = `
    bg-emerald-800/85 text-white flex flex-col h-screen fixed left-0 top-0 z-50 overflow-hidden shadow-2xl transition-all duration-300
    ${isCollapsed ? "w-20" : "w-64"}
    ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
  `;

  return (
    <div className={sidebarClasses}>
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-90 grayscale invert pointer-events-none"
        style={{ backgroundImage: 'url(/Pattern.svg)', backgroundSize: '180px' }}
      />
      
      {/* Brand & Collapse Toggle */}
      <div className={`p-6 shrink-0 relative z-10 flex items-center ${isCollapsed ? "justify-center" : "justify-between"} bg-white mb-2`}>
        {!isCollapsed && (
          <img src="/market-monie.png" alt="Market Monie" className="h-8 w-auto transition-all animate-in fade-in" />
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`hidden lg:flex h-8 w-8 hover:bg-gray-100 rounded-lg items-center justify-center text-emerald-800 transition-all ${isCollapsed ? 'rotate-180' : ''}`}
        >
          <FiChevronLeft size={20} />
        </button>
        <button 
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden h-8 w-8 hover:bg-gray-100 rounded-lg flex items-center justify-center text-emerald-800"
        >
          <FiX size={20} />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto overflow-x-hidden custom-scrollbar relative z-10">
        {menuItems.map((item) => (
          <div key={item.name}>
            {item.hasSubmenu && !isCollapsed ? (
              <div className="mb-2">
                <button 
                  onClick={() => setIsLoanMenuOpen(!isLoanMenuOpen)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-300 hover:bg-white/10 group ${
                    isLoanMenuOpen ? "text-emerald-400 bg-white/10" : "text-emerald-100/70"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl opacity-80 group-hover:opacity-100">{item.icon}</span>
                    <span className="font-semibold text-sm tracking-wide">{item.name}</span>
                  </div>
                  <FiChevronDown className={`transition-transform duration-300 ${isLoanMenuOpen ? "rotate-180" : ""}`} />
                </button>
                
                {isLoanMenuOpen && (
                  <div className="mt-1 ml-4 border-l border-white/10 pl-6 space-y-1 animate-in slide-in-from-top-2 duration-300">
                    {item.submodules.map((sub) => (
                      <NavLink
                        key={sub.name}
                        to={sub.path}
                        className={({ isActive }) => 
                          `block px-3 py-2 text-[13px] rounded-lg transition-all ${
                            isActive ? "text-emerald-400 font-bold bg-white/5" : "text-emerald-100/40 hover:text-emerald-100"
                          }`
                        }
                      >
                        {sub.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to={item.path}
                end={item.path === "/dashboard"}
                title={isCollapsed ? item.name : ""}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                    isActive 
                      ? "bg-emerald-600 text-white shadow-xl shadow-emerald-950/20" 
                      : "text-emerald-100/70 hover:bg-white/10 hover:text-white"
                  } ${isCollapsed ? "justify-center px-0" : ""}`
                }
              >
                <span className="text-xl opacity-80 group-hover:opacity-100 transition-all">{item.icon}</span>
                {!isCollapsed && <span className="font-semibold text-sm tracking-wide">{item.name}</span>}
              </NavLink>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className={`p-3 border-t border-white/10 space-y-1 mt-auto relative z-10 ${isCollapsed ? "items-center" : ""}`}>
        {bottomItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            title={isCollapsed ? item.name : ""}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                isActive ? "text-emerald-400 bg-white/10" : "text-emerald-100/50 hover:text-white hover:bg-white/10"
              } ${isCollapsed ? "justify-center px-0" : ""}`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {!isCollapsed && <span className="text-xs font-semibold tracking-wide">{item.name}</span>}
          </NavLink>
        ))}
        
        <button className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all duration-300 mt-2 ${isCollapsed ? "justify-center px-0" : ""}`}>
          <FiLogOut className="text-lg" />
          {!isCollapsed && <span className="text-xs font-semibold tracking-wide">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
