import { FiUser, FiMail, FiCalendar } from "react-icons/fi";
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

        {/* Phone Number — editable with country code picker */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
            Phone Number
          </label>
          <div className="phone-input-container">
            <PhoneInput
              placeholder="Enter phone number"
              defaultCountry="NG"
              value={data.phone}
              onChange={(val) => onChange('phone', val)}
              className="flex w-full rounded-xl border-gray-200 border-2 bg-gray-50/30 px-4 py-5 sm:text-sm focus-within:ring-4 focus-within:ring-emerald-500/10 focus-within:border-emerald-600 outline-none transition-all"
            />
          </div>
        </div>

        <InputGroup 
          label="Email Address (Optional)" 
          value={data.email} 
          onChange={(e) => onChange('email', e.target.value)}
          icon={<FiMail />} 
          placeholder="Enter your email"
        />

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">
            Date of Birth
          </label>
          <div className="grid grid-cols-3 gap-3">
            <div className="relative group">
              <select
                value={currentDay}
                onChange={(e) => handleDateChange('day', e.target.value)}
                className="block w-full rounded-xl border-gray-200 border-2 bg-gray-50/30 px-4 py-4 text-gray-900 shadow-sm transition-all focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none font-medium appearance-none"
              >
                <option value="">Day</option>
                {days.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="relative group">
              <select
                value={currentMonth}
                onChange={(e) => handleDateChange('month', e.target.value)}
                className="block w-full rounded-xl border-gray-200 border-2 bg-gray-50/30 px-4 py-4 text-gray-900 shadow-sm transition-all focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none font-medium appearance-none"
              >
                <option value="">Month</option>
                {months.map(m => <option key={m.value} value={m.value}>{m.name}</option>)}
              </select>
            </div>
            <div className="relative group">
              <select
                value={currentYear}
                onChange={(e) => handleDateChange('year', e.target.value)}
                className="block w-full rounded-xl border-gray-200 border-2 bg-gray-50/30 px-4 py-4 text-gray-900 shadow-sm transition-all focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none font-medium appearance-none"
              >
                <option value="">Year</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-10">
          <button
            onClick={onBack}
            className="flex-1 rounded-xl border-2 border-gray-100 py-4 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all font-poppins"
          >
            Back
          </button>
          <button
            onClick={onContinue}
            disabled={!currentDay || !currentMonth || !currentYear || !data.phone}
            className="flex-2 rounded-xl bg-emerald-600 py-4 text-sm font-semibold text-white shadow-xl shadow-emerald-200/50 hover:bg-emerald-500 disabled:opacity-50 transition-all font-poppins"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, value, onChange, icon, placeholder, readOnly = false }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
        {icon}
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        className={`block w-full rounded-xl border-gray-200 border-2 px-4 py-4 pl-11 text-gray-900 shadow-sm transition-all outline-none font-medium ${
          readOnly 
            ? "bg-gray-100/80 text-gray-500 cursor-not-allowed border-gray-100" 
            : "bg-gray-50/30 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10"
        }`}
      />
    </div>
  </div>
);

export default PersonalDetails;
