import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SelectState from "./Screens/SelectState";

// New Auth Components
import AuthLayout from "./(auth)/layout";
import Login from "./(auth)/login/login";
import Register from "./(auth)/register/register";
import VerifyOTP from "./(auth)/register/verify-otp";
import ForgotPassword from "./(auth)/forgot-password/forgot-password";
import SuccessScreen from "./components/ui/success-screen";

// New Onboarding Components
import OnboardingLayout from "./(onboarding)/layout";
import PhoneVerification from "./(onboarding)/phone-verification";
import BvnVerification from "./(onboarding)/bvn-verification";
import LoanApplication from "./(onboarding)/loan-application";

// Dashboard Components
import DashboardLayout from "./(dashboard)/layout";
import Dashboard from "./(dashboard)/Dashboard";
import Analytics from "./(dashboard)/Analytics";
import ComingSoon from "./(dashboard)/ComingSoon";

// import LandingPage from "./LandingPage";
import LandingPage2 from "./LandingPage2";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 24 * 60 * 60 * 1000,
      gcTime: 1000 * 60 * 60 * 24,
      retry: 2,
    },
  },
});

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Entry Point */}
        <Route path="/" element={<LandingPage2 />} />
        <Route path="/landing-2" element={<LandingPage2 />} />
        <Route path="/select-state" element={<SelectState />} />
        
        {/* Onboarding & Application Routes */}
        <Route element={<OnboardingLayout />}>
          <Route path="/onboarding/phone" element={<PhoneVerification />} />
          <Route path="/onboarding/bvn" element={<BvnVerification />} />
          <Route path="/apply/hub" element={<LoanApplication />} />
        </Route>
        
        {/* Standalone Success Screens */}
        <Route path="/register/success" element={
          <SuccessScreen 
            title="Account Created!" 
            description="Your account has been successfully verified. You are being redirected to complete your profile."
            redirectPath="/onboarding/bvn"
            countdownSeconds={3}
          />
        } />

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/loan-requests" element={<ComingSoon title="My Loan Request" />} />
          <Route path="/dashboard/loan-requests/history" element={<ComingSoon title="Loan History" />} />
          <Route path="/dashboard/loan-requests/tracker" element={<ComingSoon title="Status Tracker" />} />
          <Route path="/dashboard/loan-requests/details" element={<ComingSoon title="Loan Details" />} />
          <Route path="/dashboard/analytics" element={<Analytics />} />
          <Route path="/dashboard/settings" element={<ComingSoon title="Settings" />} />
          <Route path="/dashboard/support" element={<ComingSoon title="Support Center" />} />
          <Route path="/dashboard/make-payment" element={<ComingSoon title="Make Payment" />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
