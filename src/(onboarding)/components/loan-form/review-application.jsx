import { FiEdit3, FiUser, FiHome, FiBriefcase, FiCreditCard } from "react-icons/fi";

const ReviewApplication = ({ data, onEdit, onSubmit, onCancel }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="text-left font-poppins">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
           Review Details
        </h2>
        <p className="mt-3 text-gray-600 text-[15px] leading-relaxed">
          Please double-check your information before submitting your application.
        </p>
      </div>

      <div className="mt-10 space-y-8">
        <ReviewSection title="Personal Info" icon={<FiUser />} onEdit={() => onEdit(1)}>
          <InfoItem label="Full Name" value={`${data.firstname} ${data.middlename || ''} ${data.lastname}`} />
          <InfoItem label="Phone Number" value={data.phone} />
          <InfoItem label="Date of Birth" value={data.dob} />
        </ReviewSection>

        <ReviewSection title="Residential Address" icon={<FiHome />} onEdit={() => onEdit(2)}>
          <InfoItem label="Address" value={`${data.houseAddress || ''} ${data.area || ''}, ${data.lga}, ${data.state}`} />
          <InfoItem label="ID Type" value={data.idFile ? data.idFile.name : "Uploaded"} />
        </ReviewSection>

        <ReviewSection title="Business Info" icon={<FiBriefcase />} onEdit={() => onEdit(3)}>
          <InfoItem label="Business Name" value={data.businessName} />
          <InfoItem label="Business Type" value={data.businessType} />
          <InfoItem label="Daily Sales" value={`₦${data.dailySales}`} />
          <InfoItem label="Location" value={`${data.businessArea || ''}, ${data.businessLga}, ${data.businessState}`} />
        </ReviewSection>

        <ReviewSection title="Loan Details" icon={<FiCreditCard />} onEdit={() => onEdit(4)}>
          <InfoItem label="Loan Amount" value={`₦${Number(data.loanAmount).toLocaleString()}`} />
          <InfoItem label="Bank Account" value={`${data.bankName} - ${data.accountNumber}`} />
          <InfoItem label="Existing Loans" value={data.hasExistingLoan ? `${data.loans.length} Loan(s)` : "None"} />
        </ReviewSection>

        <div className="flex flex-col gap-4 pt-8">
          <button
            onClick={onSubmit}
            className="w-full rounded-xl bg-emerald-600 py-4 text-sm font-bold text-white shadow-xl shadow-emerald-200/50 hover:bg-emerald-500 transition-all font-poppins"
          >
            Submit Application
          </button>
          <button
            onClick={onCancel}
            className="w-full py-4 text-sm font-semibold text-gray-500 hover:text-red-500 transition-all font-poppins"
          >
            Cancel Application
          </button>
        </div>
      </div>
    </div>
  );
};

const ReviewSection = ({ title, icon, children, onEdit }) => (
  <div className="p-6 bg-gray-50/50 rounded-2xl border-2 border-gray-100">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2 text-emerald-600 font-bold">
        {icon}
        <span className="text-sm uppercase tracking-widest">{title}</span>
      </div>
      <button onClick={onEdit} className="text-gray-400 hover:text-emerald-600 transition-colors">
        <FiEdit3 size={18} />
      </button>
    </div>
    <div className="space-y-3">
      {children}
    </div>
  </div>
);

const InfoItem = ({ label, value }) => (
  <div className="flex justify-between gap-4">
    <span className="text-xs text-gray-400 font-medium">{label}:</span>
    <span className="text-sm font-bold text-gray-900 text-right">{value}</span>
  </div>
);

export default ReviewApplication;
