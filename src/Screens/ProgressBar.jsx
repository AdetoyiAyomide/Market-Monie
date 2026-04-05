import React from 'react'

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-6">
      {/* Top Text */}
      <div className="flex justify-between text-sm mb-1">
        <p className="text-slate-400">Loan Application</p>
        <p className="text-green-700 font-medium">
          Step {currentStep} of {totalSteps}
        </p>
      </div>

      {/* Progress Track */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-700 transition-all rounded-full duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
