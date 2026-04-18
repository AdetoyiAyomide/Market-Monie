import { 
  FiPlus, 
  FiEye, 
  FiCheckCircle, 
  FiClock, 
  FiUserCheck,
  FiArrowRight 
} from "react-icons/fi";

/**
 * Card shown to users who haven't applied for a loan yet
 */
export const WelcomeCard = ({ user }) => (
  <div className="relative overflow-hidden bg-white rounded-3xl border border-emerald-100 p-10 flex flex-col md:flex-row items-center gap-8 shadow-sm group">
    {/* Background Pattern */}
    <div 
      className="absolute inset-0 opacity-[0.03] grayscale invert pointer-events-none"
      style={{ backgroundImage: 'url(/Pattern.svg)', backgroundSize: '250px' }}
    />
    
    <div className="relative z-10 flex-1">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold tracking-widest mb-4">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        Opportunity Awaits
      </div>
      <h2 className="text-3xl font-bold text-gray-900 font-poppins leading-tight mb-4">
        Ready to take your business to the <span className="text-emerald-600 underline decoration-emerald-200 underline-offset-4">next level?</span>
      </h2>
      <p className="text-gray-500 max-w-md leading-relaxed mb-8 font-medium">
        You are eligible to apply for business loans up to ₦10,000,000. Quick approval, flexible repayment starting from 1.5% interest.
      </p>
      <button className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-sm shadow-xl shadow-emerald-200 hover:bg-emerald-500 hover:-translate-y-0.5 transition-all">
        Start Application
      </button>
    </div>
    <div className="relative z-10 w-full md:w-64 h-64 bg-emerald-50/50 rounded-2xl flex items-center justify-center border-2 border-emerald-50 group-hover:bg-emerald-100/50 transition-colors duration-500">
       <FiPlus size={64} className="text-emerald-200 group-hover:scale-110 transition-transform duration-500" />
    </div>
  </div>
);

/**
 * Card shown when a loan application is in progress
 */
export const ApplicationStatusCard = () => {
  const statuses = [
    { name: "Submitted", active: true, done: true },
    { name: "Agent Assigned", active: true, done: true },
    { name: "Verification", active: true, done: false },
    { name: "Verified", active: false, done: false },
  ];

  return (
    <div className="relative overflow-hidden bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] grayscale invert pointer-events-none"
        style={{ backgroundImage: 'url(/Pattern.svg)', backgroundSize: '180px' }}
      />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-lg font-bold text-gray-900 font-poppins">Loan Application Status</h2>
            <p className="text-xs text-gray-400 font-medium mt-1">Ref: MM-94202 • Submitted Apr 11, 2026</p>
          </div>
          <div className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-bold border border-blue-100">
            In Progress
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 relative py-4">
          <div className="absolute top-9 left-8 right-8 h-1 bg-gray-50 -z-1" />
          <div className="absolute top-9 left-8 right-1/2 h-1 bg-blue-500 -z-1 transition-all duration-1000 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          
          {statuses.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-all duration-500 z-10 ${
                s.done ? "bg-blue-600 text-white " : s.active ? "bg-white text-blue-600 ring-2 ring-blue-500 ring-inset" : "bg-gray-50 text-gray-200"
              }`}>
                {s.done ? <FiCheckCircle size={20} /> : s.active ? <FiClock size={20} /> : <FiUserCheck size={20} />}
              </div>
              <span className={`text-[9px] font-bold ${s.active ? "text-gray-900" : "text-gray-300"}`}>{s.name}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-12 p-5 bg-blue-50/30 rounded-2xl border border-blue-50 flex items-center gap-4">
          <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
            <FiUserCheck size={20} />
          </div>
          <p className="text-[11px] text-blue-900 font-bold leading-relaxed">
            An agent has been assigned to verify your business location. Please ensure you are available at your registered business address.
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Card shown after a loan has been disbursed
 */
export const LoanSummaryCard = () => (
  <div className="relative overflow-hidden bg-emerald-950 rounded-3xl p-10 text-white shadow-2xl">
    {/* Background Pattern */}
    <div 
      className="absolute inset-0 opacity-[0.05] grayscale brightness-0 invert pointer-events-none"
      style={{ backgroundImage: 'url(/Pattern.svg)', backgroundSize: '300px' }}
    />

    <div className="relative z-10">
      <div className="flex justify-between items-start mb-12">
        <div>
          <p className="text-emerald-400 text-[10px] font-bold mb-2 font-poppins">Active Loan Principal</p>
          <h2 className="text-4xl font-bold font-poppins tracking-tight">₦450,000.00</h2>
        </div>
        <button className="h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 hover:bg-white/20 transition-all backdrop-blur-md">
           <FiEye />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-12 pt-8 border-t border-white/10">
        <div>
          <p className="text-white/40 text-[9px] font-bold mb-2">Next Payment Date</p>
          <p className="text-lg font-bold font-poppins">May 11, 2026</p>
        </div>
        <div>
          <p className="text-white/40 text-[9px] font-bold mb-2">Amount Due</p>
          <p className="text-lg font-bold font-poppins">₦45,000.00</p>
        </div>
      </div>
    </div>
    
    {/* Decorative Accents */}
    <div className="absolute top-0 right-0 p-8 opacity-20">
       <img src="/market-monie.png" alt="MM" className="h-5 brightness-0 invert" />
    </div>
    <div className="absolute -bottom-20 -left-20 h-64 w-64 bg-emerald-500/10 rounded-full blur-[80px]" />
  </div>
);
