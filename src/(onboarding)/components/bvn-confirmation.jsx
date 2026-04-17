import { FiArrowLeft, FiCheckCircle, FiUser, FiCalendar } from "react-icons/fi";

const BvnConfirmation = ({ userData, onConfirm, onBack }) => {
  if (!userData) return null;

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="text-left font-poppins">
        <button 
          onClick={onBack} 
          className="mb-8 flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors group"
        >
          <FiArrowLeft className="transition-transform group-hover:-translate-x-1" /> Back
        </button>
        
        <div className="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-xl mb-6 text-emerald-600">
          <FiCheckCircle size={24} />
        </div>
        
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Confirm Details
        </h2>
        <p className="mt-3 text-gray-600 text-[15px] leading-relaxed">
          Please confirm that the information retrieved from your BVN is correct.
        </p>
      </div>

      <div className="mt-10 space-y-6">
        <div className="flex flex-col items-center p-6 bg-gray-50/50 rounded-2xl border-2 border-gray-100 border-dashed mb-8">
          <div className="h-24 w-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-emerald-100 mb-4">
             <img src={userData.photo} alt="User Avatar" className="h-full w-full object-cover" />
          </div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Retrieved Photo</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <DetailItem label="First Name" value={userData.firstname} />
          <DetailItem label="Middle Name" value={userData.middlename} />
          <DetailItem label="Last Name" value={userData.lastname} />
          <DetailItem label="Date of Birth" value={userData.dob} icon={<FiCalendar className="text-gray-400" />} />
        </div>

        <button
          onClick={onConfirm}
          className="flex w-full justify-center rounded-xl bg-emerald-600 px-3 py-4 text-sm font-semibold leading-6 text-white shadow-xl shadow-emerald-200/50 hover:bg-emerald-500 transition-all font-poppins mt-8"
        >
          Confirm & Continue
        </button>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value, icon }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100">
    <div className="flex flex-col">
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
      <span className="text-sm font-semibold text-gray-900">{value}</span>
    </div>
    {icon || <FiUser className="text-gray-400" />}
  </div>
);

export default BvnConfirmation;
