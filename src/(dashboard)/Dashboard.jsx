import { useOutletContext, useNavigate } from "react-router-dom";
import { 
  FiPlus, 
  FiEye, 
  FiCreditCard, 
  FiMessageCircle, 
  FiArrowRight, 
  FiClock 
} from "react-icons/fi";
import { WelcomeCard, ApplicationStatusCard, LoanSummaryCard } from "./components/LoanCards";
import QuickStats from "./components/QuickStats";

const Dashboard = () => {
  const { user, loanStage } = useOutletContext();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* 1. Analytics / Quick Stats overview */}
      <section>
        <QuickStats />
      </section>

      {/* 2. Primary Status/Summary Card */}
      <section>
        {loanStage === 'ACTIVE_APPLICATION' && <ApplicationStatusCard />}
        {loanStage === 'DISBURSED' && <LoanSummaryCard />}
        {loanStage === 'NO_LOAN' && <WelcomeCard user={user} />}
      </section>

      {/* 2. Shortcut Actions */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ShortcutButton 
          icon={<FiPlus />} 
          title="Apply for Loan" 
          description="Get business funding"
          onClick={() => navigate('/apply/hub')}
          disabled={loanStage !== 'NO_LOAN' && loanStage !== 'FULLY_REPAID'}
        />
        <ShortcutButton 
          icon={<FiEye />} 
          title="View My Loans" 
          description="Check your history"
          onClick={() => navigate('/dashboard/loan-requests/history')}
        />
        <ShortcutButton 
          icon={<FiCreditCard />} 
          title="Make Payment" 
          description="Pay your active loan"
          onClick={() => navigate('/dashboard/make-payment')}
          disabled={loanStage !== 'DISBURSED'}
        />
        <ShortcutButton 
          icon={<FiMessageCircle />} 
          title="Contact Support" 
          description="We are here to help"
          onClick={() => navigate('/dashboard/support')}
          isSecondary
        />
      </section>

      {/* 3. Recent Activity / Quick Stats */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Recent Activity</h3>
          <div className="text-center py-12">
            <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiClock className="text-gray-300" size={24} />
            </div>
            <p className="text-sm text-gray-400 font-medium">No recent activity to show.</p>
          </div>
        </div>
        <div className="bg-emerald-900 p-6 rounded-2xl text-white relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-sm font-bold uppercase tracking-widest opacity-60 mb-6 font-poppins">Tips for Growth</h3>
            <p className="text-lg font-bold mb-4 font-poppins leading-snug">Keep your repayment records clean to increase your limit.</p>
            <button className="flex items-center gap-2 text-emerald-400 text-sm font-bold hover:gap-3 transition-all">
              Learn more <FiArrowRight />
            </button>
          </div>
          <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-700" />
        </div>
      </section>
    </div>
  );
};

const ShortcutButton = ({ icon, title, description, onClick, disabled = false, isSecondary = false }) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className={`p-6 rounded-2xl border transition-all text-left flex flex-col gap-4 group ${
      disabled 
        ? "bg-gray-50 border-gray-100 opacity-50 cursor-not-allowed" 
        : "bg-white border-gray-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/5"
    }`}
  >
    <div className={`h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
      disabled 
        ? "bg-gray-100 text-gray-400" 
        : "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white shadow-sm"
    }`}>
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors uppercase tracking-widest text-[10px]">{title}</h4>
      <p className="text-xs text-gray-400 font-medium mt-1">{description}</p>
    </div>
  </button>
);

export default Dashboard;
