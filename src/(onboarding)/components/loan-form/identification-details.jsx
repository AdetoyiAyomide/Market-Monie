import { useEffect, useRef, useState } from "react";
import { FiFileText, FiUploadCloud, FiType, FiCheck, FiChevronDown, FiChevronUp } from "react-icons/fi";

const IdentificationDetails = ({ data, onChange, onContinue, onBack }) => {
  const [isIdTypeOpen, setIsIdTypeOpen] = useState(false);
  const [isProofTypeOpen, setIsProofTypeOpen] = useState(false);
  const idTypeDropdownRef = useRef(null);
  const proofTypeDropdownRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (idTypeDropdownRef.current && !idTypeDropdownRef.current.contains(event.target)) {
        setIsIdTypeOpen(false);
      }

      if (proofTypeDropdownRef.current && !proofTypeDropdownRef.current.contains(event.target)) {
        setIsProofTypeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
            <CustomSelectGroup 
              label="ID Type (optional)" 
              value={data.idType} 
              isOpen={isIdTypeOpen}
              onToggle={() => setIsIdTypeOpen((prev) => !prev)}
              onSelect={(value) => {
                setIsIdTypeOpen(false);
                onChange('idType', value);
              }}
              options={idOptions}
              dropdownRef={idTypeDropdownRef}
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

          <CustomSelectGroup 
            label="Document Type" 
            value={data.proofType} 
            isOpen={isProofTypeOpen}
            onToggle={() => setIsProofTypeOpen((prev) => !prev)}
            onSelect={(value) => {
              setIsProofTypeOpen(false);
              onChange('proofType', value);
            }}
            options={proofOptions}
            dropdownRef={proofTypeDropdownRef}
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

const CustomSelectGroup = ({ label, value, isOpen, onToggle, onSelect, options, icon, dropdownRef }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <div className="relative group" ref={dropdownRef}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400 group-focus-within:text-emerald-600 transition-colors">
        {icon}
      </div>
      <button
        type="button"
        onClick={onToggle}
        className="block w-full rounded-xl border-gray-200 border-2 bg-gray-50/30 pl-11 pr-11 py-4 text-left text-gray-900 shadow-sm transition-all focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none font-medium text-sm"
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || `Select ${label}`}
        </span>
      </button>
      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400">
        {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
      </div>
      {isOpen && (
        <div className="absolute left-0 right-0 top-[calc(100%+0.35rem)] z-20 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
          <ul className="max-h-56 overflow-y-auto py-2">
            {options.map((opt) => (
              <li
                key={opt}
                onClick={() => onSelect(opt)}
                className={`cursor-pointer px-4 py-3 text-sm font-medium transition-colors hover:bg-emerald-50 hover:text-emerald-700 ${
                  value === opt ? "text-emerald-700 bg-emerald-50" : "text-gray-700"
                }`}
              >
                {opt}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
);

export default IdentificationDetails;
