import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile sidebar on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const user = {
    firstname: "Samuel",
    lastname: "Peter"
  };
  
  const loanStage = 'ACTIVE_APPLICATION'; 

  return (
    <div className="flex min-h-screen bg-gray-50/50 relative">
      <Sidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-all duration-500"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className={`flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300 ${
        isCollapsed ? "lg:pl-20" : "lg:pl-64"
      }`}>
        <TopBar 
          user={user} 
          loanStage={loanStage} 
          toggleMobile={() => setIsMobileOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <Outlet context={{ user, loanStage }} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;