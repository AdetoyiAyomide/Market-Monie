import { FiEdit3, FiFileText, FiMail, FiShield, FiUserPlus } from "react-icons/fi";

const steps = [
  { key: "account", label: "Account", icon: <FiUserPlus /> },
  { key: "email", label: "Email", icon: <FiMail /> },
  { key: "bvn", label: "BVN", icon: <FiShield /> },
  { key: "application", label: "Application", icon: <FiFileText /> },
  { key: "review", label: "Review", icon: <FiEdit3 /> },
];

const JourneyHeader = ({ activeStep }) => {
  const activeIndex = steps.findIndex((step) => step.key === activeStep);
  const currentStep = activeIndex >= 0 ? activeIndex + 1 : 1;
  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="mb-8">
      <div className="mb-3">
        <div className="flex justify-between text-[11px] uppercase tracking-wider w-full">
          <p className="text-slate-400 font-semibold">Application Journey</p>
          <p className="text-emerald-700 font-bold">
            Step {currentStep} <span className="text-slate-300 mx-1">/</span> {steps.length}
          </p>
        </div>

        <div className="mt-2 w-full h-1.5 bg-gray-100 rounded-full overflow-hidden border border-gray-50">
          <div
            className="h-full bg-gradient-to-r from-green-600 to-green-800 transition-all rounded-full duration-700 ease-out shadow-[0_0_8px_rgba(22,101,52,0.2)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="rounded-2xl bg-gray-100/90 p-1.5">
        <div className="grid grid-cols-5 gap-1.5">
          {steps.map((step, index) => {
            const isActive = index === activeIndex;
            const isCompleted = activeIndex > index;

            return (
              <div
                key={step.key}
                className={`flex min-h-20 flex-col items-center justify-center rounded-xl px-2 py-3 text-center transition-all ${
                  isActive
                    ? "bg-white text-emerald-700 shadow-sm ring-1 ring-emerald-100"
                    : isCompleted
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-gray-400"
                }`}
              >
                <span className="text-lg">{step.icon}</span>
                <span className="mt-1 text-[11px] font-bold uppercase tracking-wider sm:text-xs">
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JourneyHeader;
