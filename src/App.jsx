import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SelectState from "./Screens/SelectState";

// New Auth Components
import AuthLayout from "./(auth)/layout";
import Login from "./(auth)/login/login";
import Register from "./(auth)/register/register";
import VerifyEmail from "./(auth)/register/verify-email";
import SuccessScreen from "./components/ui/success-screen";

// New Onboarding Components
import OnboardingLayout from "./(onboarding)/layout";
import PhoneVerification from "./(onboarding)/phone-verification";
import BvnVerification from "./(onboarding)/bvn-verification";
import LoanApplication from "./(onboarding)/loan-application";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 24 * 60 * 60 * 1000, // 24 hours (for location data)
      gcTime: 1000 * 60 * 60 * 24, // keep in cache for 24 hours
      retry: 2,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Entry Point */}
          <Route path="/" element={<SelectState />} />
          
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
              countdownSeconds={5}
            />
          } />

          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
