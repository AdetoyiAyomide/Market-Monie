import { FiEdit3, FiUser, FiHome, FiBriefcase, FiCreditCard, FiFileText } from "react-icons/fi";

const ReviewApplication = ({ data, onEdit, onSubmit, onCancel, isGuest }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="hidden sm:block text-left font-poppins">
        {isGuest && (
          <div className="mb-6 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-500">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                <FiUser />
              </div>
              <div>
                <p className="text-sm font-bold text-amber-900">Guest Mode</p>
                <p className="text-[11px] text-amber-700">You are applying without an account.</p>
              </div>
            </div>
            <button 
              onClick={() => {
                if (window.confirm("Switching to registration will lose your current application progress. Continue?")) {
                  window.location.href = "/register";
                }
              }}
              className="text-[10px] font-bold text-amber-600 hover:text-amber-700 underline tracking-widest"
            >
              CREATE ACCOUNT
            </button>
          </div>
        )}
        <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-gray-900">
           Review Details
        </h2>
        <p className="mt-3 text-gray-600 text-xs sm:text-[15px] leading-relaxed">
          Please double-check your information before submitting your application.
        </p>
      </div>

      <div className="mt-3 space-y-8">
        <ReviewSection title="Personal Info" icon={<FiUser />} onEdit={() => onEdit(0)}>
          <InfoItem label="Full Name" value={`${data.firstname} ${data.middlename || ''} ${data.lastname}`} />
          <InfoItem label="Phone Number" value={data.phone} />
          <InfoItem label="Date of Birth" value={data.dob} />
        </ReviewSection>

        <ReviewSection title="Residential Address" icon={<FiHome />} onEdit={() => onEdit(0)}>
          <InfoItem label="Address" value={`${data.houseAddress || ''} ${data.area || ''}, ${data.lga}, ${data.state}`} />
        </ReviewSection>


        <ReviewSection title="Business Info" icon={<FiBriefcase />} onEdit={() => onEdit(1)}>
          <InfoItem label="Business Name" value={data.businessName} />
          <InfoItem label="Business Type" value={data.businessType === "Other" ? data.otherBusiness : data.businessType} />
          <InfoItem label="Daily Sales" value={`₦${data.dailySales}`} />
          <InfoItem label="Location" value={`${data.businessArea || ''}, ${data.businessLga}, ${data.businessState}`} />
        </ReviewSection>

        <ReviewSection title="Loan Details" icon={<FiCreditCard />} onEdit={() => onEdit(2)}>
          <InfoItem label="Loan Amount" value={`₦${Number(data.loanAmount).toLocaleString()}`} />
          <InfoItem label="Bank Account" value={`${data.bankName} - ${data.accountNumber}`} />
        </ReviewSection>

        <ReviewSection title="Financial History" icon={<FiCreditCard />} onEdit={() => onEdit(3)}>
          <InfoItem label="Existing Loans" value={data.hasExistingLoan ? "Yes" : "No"} />
          {data.hasExistingLoan && data.loans && data.loans.map((loan, idx) => (
            <div key={idx} className="mt-4 pt-4 border-t border-gray-100 space-y-3">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Loan {idx + 1}</span>
              <InfoItem label="Lender" value={loan.lender} />
              <InfoItem label="Outstanding" value={`₦${Number(loan.balance).toLocaleString()}`} />
              <InfoItem label="Repayment" value={`₦${Number(loan.repayment).toLocaleString()} / period`} />
            </div>
          ))}
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
        <span className="text-sm tracking-widest">{title}</span>
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
