import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HubSelection from "./Screens/HubSelection";
import SelectState from "./Screens/SelectState";
import CreateAccount from "./Screens/CreateAccount";
import PersonalDetails from "./Screens/personalDetails";
import Address from "./Screens/address";
import Business from './Screens/business';
import Loan from './Screens/loan';
import AccountCreation from './Screens/AccountCreation';
import Preview from './Screens/PreviewPage'

// New Auth Components
import AuthLayout from "./(auth)/layout";
import Login from "./(auth)/login/login";
import Register from "./(auth)/register/register";
import VerifyEmail from "./(auth)/register/verify-email";
import SuccessScreen from "./components/ui/success-screen";
import PhoneVerification from "./(onboarding)/phone-verification";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SelectState />} />
        
        {/* Onboarding Routes */}
        <Route path="/onboarding/phone" element={<PhoneVerification />} />
        
        {/* Standalone Success Screens */}
        <Route path="/register/success" element={
          <SuccessScreen 
            title="Account Created!" 
            description="Your account has been successfully verified. You are being redirected to complete your profile."
            redirectPath="/onboarding/phone"
            countdownSeconds={5}
          />
        } />

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>


          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Route>


        <Route path="/apply/hub" element={<HubSelection />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/account-creation" element={<AccountCreation />} />
        <Route path="/personal-details" element={<PersonalDetails />} />
        <Route path="/address" element={<Address />} />
        <Route path="/business" element={<Business />} />
        <Route path="/loan" element={<Loan />} />
        <Route path="/preview" element={<Preview />} />
        
        {/* Redirect old login path if necessary, or just overwrite */}
        {/* <Route path='/old-login' element={<OldLogin />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;