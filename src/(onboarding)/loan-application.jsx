import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PersonalDetails from "./components/loan-form/personal-details";
import BusinessDetails from "./components/loan-form/business-details";
import FinancialDetails from "./components/loan-form/financial-details";
import ExistingLoans from "./components/loan-form/existing-loans";
import ReviewApplication from "./components/loan-form/review-application";
import ApplicationSuccess from "./components/loan-form/success-screen";
import {
  isGuestGlobal,
  selectedStateGlobal,
  selectedHubGlobal,
  setIsGuestGlobal,
} from "../store/Data";
import JourneyHeader from "../components/ui/journey-header";

const LoanApplication = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If we reach this page and guest status hasn't been explicitly set (e.g. direct navigation),
    // we default to Guest mode to ensure the Success screen works correctly.
    if (isGuestGlobal === undefined || isGuestGlobal === null || (isGuestGlobal === false && !selectedHubGlobal)) {
      // Note: In a real app, check for auth token here.
      setIsGuestGlobal(true);
    }
    
    // If Guest, clear the mock BVN data so they can enter their own
    if (isGuestGlobal) {
      setFormData(prev => ({
        ...prev,
        firstname: "",
        lastname: "",
        middlename: "",
        phone: "",
        dob: ""
      }));
    }
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    // Step 0: Hub
    hub: selectedHubGlobal || null,
    selectedState: selectedStateGlobal || location.state?.state || "", 

    // Step 1: Personal (Pre-populated from mock BVN/Register data)
    title: "",
    firstname: "Samuel",
    lastname: "Peter",
    middlename: "Blessing",
    phone: "+234 812 345 6789",
    email: "",
    dob: "2000-01-27",

    // Step 2: Address
    state: "", 
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
    businessState: selectedStateGlobal || location.state?.state || "",
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

  // Simplified step management for 3-screen flow
  // 0: Personal, 1: Business, 2: Financial, 3: Review, 4: Success
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
    <div className="w-full pr-4 sm:pr-6 lg:pr-8 pt-2 pb-10 font-poppins">
      <div className="flex flex-col lg:flex-row gap-4 items-start">
        {/* Progress Sidebar - Placed at the very edge */}
        <aside className="shrink-0 lg:sticky lg:top-4 pl-0">
          <JourneyHeader activeStep={activeStep} orientation="vertical" />
        </aside>

        {/* Main Form Content - Expanded and centered in remaining space */}
        <div className="flex-1 w-full flex justify-center">
          <div className="w-full max-w-2xl px-4 sm:px-0">
            {content}
          </div>
        </div>
      </div>
    </div>
  );

  // Render Logic
  switch (step) {
    case 0:
      return withJourneyHeader(
        <PersonalDetails 
          data={formData} 
          onChange={updateFormData}
          onContinue={nextStep}
          onBack={() => navigate('/')}
          isGuest={isGuestGlobal}
        />
      );
    case 1:
      return withJourneyHeader(
        <BusinessDetails 
          data={formData} 
          onChange={updateFormData}
          onContinue={nextStep}
          onBack={prevStep}
        />
      );
    case 2:
      return withJourneyHeader(
        <FinancialDetails 
          data={formData} 
          onChange={updateFormData}
          onContinue={nextStep}
          onBack={prevStep}
        />
      );
    case 3:
      return withJourneyHeader(
        <ExistingLoans 
          data={formData} 
          onChange={updateFormData}
          onContinue={nextStep}
          onBack={prevStep}
        />
      );
    case 4:
      return withJourneyHeader(
        <ReviewApplication 
          data={formData} 
          onEdit={(s) => goToStep(s)}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isGuest={isGuestGlobal}
        />,
        "review"
      );
    case 5:
      return (
        <ApplicationSuccess referenceId="MM-94202" />
      );
    default:
      return null;
  }
};

export default LoanApplication;
