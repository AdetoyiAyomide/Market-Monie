import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HubSelection from "./components/loan-form/hub-selection";
import AccountChoice from "./components/loan-form/account-choice";
import PersonalDetails from "./components/loan-form/personal-details";
import AddressDetails from "./components/loan-form/address-details";
import IdentificationDetails from "./components/loan-form/identification-details";
import BusinessDetails from "./components/loan-form/business-details";
import FinancialDetails from "./components/loan-form/financial-details";
import ExistingLoans from "./components/loan-form/existing-loans";
import ReviewApplication from "./components/loan-form/review-application";
import ApplicationSuccess from "./components/loan-form/success-screen";
import {
  applicationModeGlobal,
  selectedStateGlobal,
  selectedHubGlobal,
  setApplicationModeGlobal,
  setIsGuestGlobal,
} from "../store/Data";
import JourneyHeader from "../components/ui/journey-header";

const LoanApplication = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  
  // Form State
  const [formData, setFormData] = useState({
    // Step 0: Hub
    hub: selectedHubGlobal || null,
    selectedState: selectedStateGlobal || location.state?.state || "Lagos", 

    // Step 1: Personal (Pre-populated from mock BVN/Register data)
    firstname: "Samuel",
    lastname: "Peter",
    middlename: "Blessing",
    phone: "+234 812 345 6789",
    email: "",
    dob: "2000-01-27",

    // Step 2: Address
    state: selectedStateGlobal || location.state?.state || "Lagos",
    lga: "",
    area: "",
    houseAddress: "",

    // Step 3: Identification
    idType: "",
    idNumber: "",
    idFile: null,
    proofType: "",
    proofFile: null,

    // Step 4: Business
    businessName: "",
    businessState: "",
    businessLga: "",
    businessArea: "",
    businessType: "",
    otherBusiness: "",
    businessYears: "",
    dailySales: "",

    // Step 5: Financial
    loanAmount: "",
    bankName: "",
    accountNumber: "",

    // Step 6: Loans
    hasExistingLoan: null,
    loans: []
  });

  // Always start from hub selection for the current flow
  const [step, setStep] = useState(0);

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

  const withJourneyHeader = (content, activeStep = "application") => (
    <div>
      <JourneyHeader activeStep={activeStep} />
      {content}
    </div>
  );

  // Render Logic
  switch (step) {
    case 0:
      return withJourneyHeader(
        <HubSelection 
          selectedState={formData.selectedState} 
          selectedHub={formData.hub}
          onSelectState={(s) => updateFormData('selectedState', s)}
          onSelectHub={(h) => updateFormData('hub', h)}
          onContinue={nextStep}
        />
      );
    case 1:
      return withJourneyHeader(
        <AccountChoice
          onCreateAccount={() => {
            setIsGuestGlobal(false);
            setApplicationModeGlobal("account");
            navigate("/register");
          }}
          onContinueGuest={() => {
            setIsGuestGlobal(true);
            setApplicationModeGlobal("guest");
            nextStep();
          }}
        />
      );
    case 2:
      return withJourneyHeader(
        <PersonalDetails 
          data={formData} 
          onChange={updateFormData}
          onContinue={nextStep}
          onBack={prevStep}
        />
      );
    case 3:
      return withJourneyHeader(
        <AddressDetails 
          data={formData} 
          onChange={updateFormData}
          onContinue={nextStep}
          onBack={prevStep}
        />
      );
    case 4:
      return withJourneyHeader(
        <IdentificationDetails 
          data={formData} 
          onChange={updateFormData}
          onContinue={nextStep}
          onBack={prevStep}
        />
      );
    case 5:
      return withJourneyHeader(
        <BusinessDetails 
          data={formData} 
          onChange={updateFormData}
          onContinue={nextStep}
          onBack={prevStep}
        />
      );
    case 6:
      return withJourneyHeader(
        <FinancialDetails 
          data={formData} 
          onChange={updateFormData}
          onContinue={nextStep}
          onBack={prevStep}
        />
      );
    case 7:
      return withJourneyHeader(
        <ExistingLoans 
          data={formData} 
          onChange={updateFormData}
          onContinue={nextStep}
          onBack={prevStep}
        />
      );
    case 8:
      return withJourneyHeader(
        <ReviewApplication 
          data={formData} 
          onEdit={(s) => goToStep(s + 1)}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />,
        "review"
      );
    case 9:
      return (
        <ApplicationSuccess referenceId="MM-94202" />
      );
    default:
      return null;
  }
};

export default LoanApplication;
