import { useState } from "react";
import { FiUser, FiMail, FiCalendar, FiHash, FiHome } from "react-icons/fi";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { getDaysInMonth, eachMonthOfInterval, startOfYear, endOfYear, format } from 'date-fns';

const PersonalDetails = ({ data, onChange, onContinue, onBack }) => {
  // Split DOB YYYY-MM-DD
  const dobParts = data.dob ? data.dob.split('-') : ['', '', ''];
  const currentYear = dobParts[0] || "";
  const currentMonth = dobParts[1] || "";
  const currentDay = dobParts[2] || "";

  // Dynamic days based on selection
  const maxDays = (currentYear && currentMonth) 
    ? getDaysInMonth(new Date(parseInt(currentYear), parseInt(currentMonth) - 1)) 
    : 31;

  const days = Array.from({ length: maxDays }, (_, i) => (i + 1).toString().padStart(2, '0'));
  
  const handleDateChange = (type, value) => {
    let year = currentYear;
    let month = currentMonth;
    let day = currentDay;

    if (type === 'year') {
      year = value;
      // Re-validate day if switching to a month with fewer days (e.g. Feb in leap year)
      if (month && year) {
        const newMax = getDaysInMonth(new Date(parseInt(year), parseInt(month) - 1));
        if (parseInt(day) > newMax) day = newMax.toString().padStart(2, '0');
      }
    }
    if (type === 'month') {
      month = value;
      // Re-validate day
      if (month && year) {
        const newMax = getDaysInMonth(new Date(parseInt(year), parseInt(month) - 1));
        if (parseInt(day) > newMax) day = newMax.toString().padStart(2, '0');
      }
    }
    if (type === 'day') day = value;

    onChange('dob', `${year}-${month}-${day}`);
  };

  const months = eachMonthOfInterval({
    start: startOfYear(new Date()),
    end: endOfYear(new Date())
  }).map((month, index) => ({
    name: format(month, 'MMMM'),
    value: (index + 1).toString().padStart(2, '0')
  }));

  const years = Array.from({ length: 100 }, (_, i) => (new Date().getFullYear() - 18 - i).toString());

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!currentDay || !currentMonth || !currentYear) newErrors.dob = "Date of birth is required";
    if (!data.nin) newErrors.nin = "NIN is required";
    else if (data.nin.length !== 11) newErrors.nin = "NIN must be exactly 11 digits";
    if (!data.residentialAddress) newErrors.residentialAddress = "Residential address is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      onContinue();
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-left font-poppins">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Personal Details
        </h2>
        <p className="mt-2 text-gray-500 text-sm">
          Please confirm your personal information retrieved from your identity record.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <InputGroup 
            label="First Name" 
            value={data.firstname} 
            icon={<FiUser />} 
            readOnly
          />
          <InputGroup 
            label="Last Name" 
            value={data.lastname} 
            icon={<FiUser />} 
            readOnly
          />
        </div>

        {/* Phone Number — prepopulated and read-only */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 tracking-widest ml-1">
            Phone Number
          </label>
          <div className="phone-input-container opacity-60 cursor-not-allowed grayscale-[0.5]">
            <PhoneInput
              placeholder="Enter phone number"
              defaultCountry="NG"
              value={data.phone}
              disabled
              className="flex w-full rounded-xl border-gray-100 border-2 bg-gray-100/80 px-4 py-5 sm:text-sm outline-none transition-all text-gray-500 font-medium"
            />
          </div>
        </div>

        <InputGroup 
          label="Email Address" 
          value={data.email} 
          icon={<FiMail />} 
          readOnly
        />

        <InputGroup 
          label="National Identity Number (NIN)" 
          value={data.nin} 
          onChange={(e) => {
            onChange('nin', e.target.value.slice(0, 11));
            if (errors.nin) setErrors(prev => ({ ...prev, nin: null }));
          }}
          error={errors.nin}
          icon={<FiHash />} 
          placeholder="Enter 11-digit NIN"
          maxLength={11}
        />

        <div className="space-y-2">
          <label className={`text-xs font-bold tracking-widest ml-1 mb-2 block ${errors.dob ? 'text-red-500' : 'text-gray-400'}`}>
            Date of Birth
          </label>
          <div className="grid grid-cols-3 gap-3">
            <div className="relative group">
              <select
                value={currentDay}
                onChange={(e) => {
                  handleDateChange('day', e.target.value);
                  if (errors.dob) setErrors(prev => ({ ...prev, dob: null }));
                }}
                className={`block w-full rounded-xl border-2 bg-gray-50/30 px-4 py-4 text-gray-900 shadow-sm transition-all focus:ring-4 focus:ring-emerald-500/10 outline-none font-medium appearance-none ${
                    errors.dob ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-emerald-600'
                }`}
              >
                <option value="">Day</option>
                {days.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="relative group">
              <select
                value={currentMonth}
                onChange={(e) => {
                  handleDateChange('month', e.target.value);
                  if (errors.dob) setErrors(prev => ({ ...prev, dob: null }));
                }}
                className={`block w-full rounded-xl border-2 bg-gray-50/30 px-4 py-4 text-gray-900 shadow-sm transition-all focus:ring-4 focus:ring-emerald-500/10 outline-none font-medium appearance-none ${
                    errors.dob ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-emerald-600'
                }`}
              >
                <option value="">Month</option>
                {months.map(m => <option key={m.value} value={m.value}>{m.name}</option>)}
              </select>
            </div>
            <div className="relative group">
              <select
                value={currentYear}
                onChange={(e) => {
                  handleDateChange('year', e.target.value);
                  if (errors.dob) setErrors(prev => ({ ...prev, dob: null }));
                }}
                className={`block w-full rounded-xl border-2 bg-gray-50/30 px-4 py-4 text-gray-900 shadow-sm transition-all focus:ring-4 focus:ring-emerald-500/10 outline-none font-medium appearance-none ${
                    errors.dob ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-emerald-600'
                }`}
              >
                <option value="">Year</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>
          {errors.dob && <p className="mt-1 text-xs text-red-500 animate-in fade-in slide-in-from-top-1 ml-1">{errors.dob}</p>}
        </div>

        <InputGroup 
          label="Where do you live?" 
          value={data.residentialAddress} 
          onChange={(e) => {
            onChange('residentialAddress', e.target.value);
            if (errors.residentialAddress) setErrors(prev => ({ ...prev, residentialAddress: null }));
          }}
          error={errors.residentialAddress}
          icon={<FiHome />} 
          placeholder="Enter your street address"
        />

        <div className="flex gap-4 mt-10">
          <button
            onClick={onBack}
            className="flex-1 rounded-xl border-2 border-gray-100 py-4 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all font-poppins"
          >
            Back
          </button>
          <button
            onClick={handleContinue}
            className="flex-2 rounded-xl bg-emerald-600 py-4 text-sm font-semibold text-white shadow-xl shadow-emerald-200/50 hover:bg-emerald-500 transition-all font-poppins"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, value, onChange, icon, placeholder, readOnly = false, error = null }) => (
  <div className="space-y-2">
    <label className={`text-xs font-bold tracking-widest ml-1 transition-colors ${error ? 'text-red-500' : 'text-gray-400'}`}>
      {label}
    </label>
    <div className="relative group">
      <div className={`absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-colors ${error ? 'text-red-400' : 'text-gray-400'}`}>
        {icon}
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        className={`block w-full rounded-xl border-2 px-4 py-4 pl-11 text-gray-900 shadow-sm transition-all outline-none font-medium ${
          readOnly 
            ? "bg-gray-100/80 text-gray-500 cursor-not-allowed border-gray-100" 
            : error 
              ? "bg-red-50/30 border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
              : "bg-gray-50/30 border-gray-200 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
        }`}
      />
    </div>
    {error && <p className="mt-1 text-xs text-red-500 animate-in fade-in slide-in-from-top-1 ml-1 font-medium">{error}</p>}
  </div>
);

export default PersonalDetails;
