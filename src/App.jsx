import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HubSelection from "./Screens/HubSelection";
import SelectState from "./Screens/SelectState";
import CreateAccount from "./Screens/CreateAccount";
import PersonalDetails from "./Screens/personalDetails";
import Address from "./Screens/address";
import Business from './Screens/business';
import Loan from './Screens/loan';
import AccountCreation from './Screens/AccountCreation';
import Preview from './Screens/PreviewPage'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SelectState />} />
        <Route path="/apply/hub" element={<HubSelection />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/account-creation" element={<AccountCreation />} />
        <Route path="/personal-details" element={<PersonalDetails />} />
        <Route path="/address" element={<Address />} />
        <Route path="/business" element={<Business />} />
        <Route path="/loan" element={<Loan />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;