import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HubSelection from "./components/loan-form/hub-selection";
import PersonalDetails from "./components/loan-form/personal-details";
import AddressDetails from "./components/loan-form/address-details";
import BusinessDetails from "./components/loan-form/business-details";
import FinancialDetails from "./components/loan-form/financial-details";
import ExistingLoans from "./components/loan-form/existing-loans";
import ReviewApplication from "./components/loan-form/review-application";
import ApplicationSuccess from "./components/loan-form/success-screen";

const LoanApplication = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Step management
  const [step, setStep] = useState(0); // 0: Hub, 1: Personal, 2: Address, 3: Business, 4: Financial, 5: Loans, 6: Review, 7: Success

  // Form State
  const [formData, setFormData] = useState({
    // Step 0: Hub
    hub: null,
    selectedState: location.state?.state || "Lagos", // Default from previous step if available

    // Step 1: Personal (Pre-populated from mock BVN/Register data)
    firstname: "Samuel",
    lastname: "Peter",
    middlename: "Blessing",
    phone: "+234 812 345 6789",
    email: "",
    dob: "2000-01-27",

    // Step 2: Address
    state: location.state?.state || "Lagos",
    lga: "",
    area: "",
    houseAddress: "",
    idFile: null,

    // Step 3: Business
    businessName: "",
    businessState: "",
    businessLga: "",
    businessArea: "",
    businessType: "",
    businessYears: "",
    dailySales: "",

    // Step 4: Financial
    loanAmount: "",
    bankName: "",
    accountNumber: "",

    // Step 5: Loans
    hasExistingLoan: null,
    loans: []
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);
  const goToStep = (s) => setStep(s);

  const handleSubmit = () => {
    // Simulate API call
    setTimeout(() => {
      nextStep(); // Go to success screen
    }, 1500);
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel your application? All progress will be lost.")) {
      navigate('/onboarding/bvn'); // Go back to start of KYC
    }
  };

  // Render Logic
  switch (step) {
    case 0:
      return (
        <HubSelection 
          selectedState={formData.selectedState} 
          selectedHub={formData.hub}
          onSelectState={(s) => updateFormData('selectedState', s)}
          onSelectHub={(h) => updateFormData('hub', h)}
          onContinue={nextStep}
        />
      );
    case 1:
      return (
        <PersonalDetails 
          data={formData} 
          onChange={updateFormData}
          onContinue={nextStep}
          onBack={prevStep}
        />
      );
    case 2:
      return (
        <AddressDetails 
          data={formData} 
          onChange={updateFormData}
          onContinue={nextStep}
          onBack={prevStep}
        />
      );
    case 3:
      return (
        <BusinessDetails 
          data={formData} 
          onChange={updateFormData}
          onContinue={nextStep}
          onBack={prevStep}
        />
      );
    case 4:
      return (
        <FinancialDetails 
          data={formData} 
          onChange={updateFormData}
          onContinue={nextStep}
          onBack={prevStep}
        />
      );
    case 5:
      return (
        <ExistingLoans 
          data={formData} 
          onChange={updateFormData}
          onContinue={nextStep}
          onBack={prevStep}
        />
      );
    case 6:
      return (
        <ReviewApplication 
          data={formData} 
          onEdit={goToStep}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      );
    case 7:
      return (
        <ApplicationSuccess referenceId="MM-94202" />
      );
    default:
      return null;
  }
};

export default LoanApplication;
