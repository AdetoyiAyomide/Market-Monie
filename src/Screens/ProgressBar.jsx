import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <> 
      {/* Top Text */}
      <div className="flex justify-between text-[11px] uppercase tracking-wider w-full">
        <p className="text-slate-400 font-semibold">Loan Application</p>
        <p className="text-green-700 font-bold">
          Step {currentStep} <span className="text-slate-300 mx-1">/</span> {totalSteps}
        </p>
      </div>

      {/* Progress Track */}
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden border border-gray-50">
        <div
          className="h-full bg-gradient-to-r from-green-600 to-green-800 transition-all rounded-full duration-700 ease-out shadow-[0_0_8px_rgba(22,101,52,0.2)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </>
  );
};

export default ProgressBar;