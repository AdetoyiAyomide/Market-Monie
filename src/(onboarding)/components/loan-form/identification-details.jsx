import { FiFileText, FiUploadCloud, FiType, FiCheck } from "react-icons/fi";

const IdentificationDetails = ({ data, onChange, onContinue, onBack }) => {
  const idOptions = [
    "Driver’s License", 
    "International Passport", 
    "NIN", 
    "Voter’s Card"
  ];

  const proofOptions = [
    "Utility Bill",
    "Bank Statement",
    "Rent Agreement",
    "Lagos State Residency Card (LASRRA)"
  ];

  const canContinue = 
    data.idType && 
    data.idNumber && 
    data.idFile && 
    data.proofType && 
    data.proofFile;

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-left font-poppins">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
           Identification & Residence
        </h2>
        <p className="mt-2 text-gray-500 text-sm">
          Your documents help us verify your identity and residential address.
        </p>
      </div>

      <div className="mt-8 space-y-8">
        {/* Government ID Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 mb-2">
            <div className="h-2 w-2 rounded-full bg-emerald-600" />
            <h3 className="text-xs font-bold uppercase tracking-widest">Government Issued ID</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SelectGroup 
              label="ID Type" 
              value={data.idType} 
              onChange={(e) => onChange('idType', e.target.value)}
              options={idOptions}
              icon={<FiFileText />} 
            />
            <InputGroup 
              label="ID Number" 
              value={data.idNumber} 
              onChange={(e) => onChange('idNumber', e.target.value)}
              placeholder="Enter ID number"
              icon={<FiType />} 
            />
          </div>
          
          <FileUpload 
            file={data.idFile}
            onFileSelect={(file) => onChange('idFile', file)}
            label={`Upload ${data.idType || 'ID'}`}
            description="PNG, JPG or PDF. Max 5MB."
          />
        </section>

        {/* Proof of Residence Section */}
        <section className="space-y-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-emerald-600 mb-2">
            <div className="h-2 w-2 rounded-full bg-emerald-600" />
            <h3 className="text-xs font-bold uppercase tracking-widest">Proof of Residence</h3>
          </div>

          <SelectGroup 
            label="Document Type" 
            value={data.proofType} 
            onChange={(e) => onChange('proofType', e.target.value)}
            options={proofOptions}
            icon={<FiFileText />} 
          />

          <FileUpload 
            file={data.proofFile}
            onFileSelect={(file) => onChange('proofFile', file)}
            label={`Upload ${data.proofType || 'Proof Document'}`}
            description="Utility bill or bank statement (not older than 3 months)"
          />
        </section>

        <div className="flex gap-4 mt-10">
          <button
            onClick={onBack}
            className="flex-1 rounded-xl border-2 border-gray-100 py-4 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all font-poppins"
          >
            Back
          </button>
          <button
            onClick={onContinue}
            disabled={!canContinue}
            className="flex-2 rounded-xl bg-emerald-600 py-4 text-sm font-semibold text-white shadow-xl shadow-emerald-200/50 hover:bg-emerald-500 disabled:opacity-50 transition-all font-poppins"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const FileUpload = ({ file, onFileSelect, label, description }) => (
  <div className="relative group cursor-pointer">
    <input 
      type="file" 
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
      onChange={(e) => onFileSelect(e.target.files[0])}
    />
    <div className={`p-6 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2 ${
      file ? "bg-emerald-50 border-emerald-300" : "bg-gray-50/50 border-gray-200 hover:border-emerald-300 group-hover:bg-emerald-50/30"
    }`}>
      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
        file ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-400"
      }`}>
        {file ? <FiCheck size={20} /> : <FiUploadCloud size={20} />}
      </div>
      <p className={`text-sm font-bold ${file ? "text-emerald-700" : "text-gray-900"}`}>
        {file ? file.name : label}
      </p>
      <p className="text-[10px] text-gray-500 text-center uppercase tracking-wider font-medium">
         {description}
      </p>
    </div>
  </div>
);

const InputGroup = ({ label, value, onChange, icon, placeholder }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-emerald-600 transition-colors">
        {icon}
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="block w-full rounded-xl border-gray-200 border-2 bg-gray-50/30 pl-11 pr-4 py-4 text-gray-900 shadow-sm transition-all focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none font-medium text-sm"
      />
    </div>
  </div>
);

const SelectGroup = ({ label, value, onChange, options, icon }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-emerald-600 transition-colors">
        {icon}
      </div>
      <select
        value={value}
        onChange={onChange}
        className="block w-full rounded-xl border-gray-200 border-2 bg-gray-50/30 pl-11 pr-4 py-4 text-gray-900 shadow-sm transition-all focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none font-medium appearance-none text-sm"
      >
        <option value="">Select {label}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
      </div>
    </div>
  </div>
);

export default IdentificationDetails;
