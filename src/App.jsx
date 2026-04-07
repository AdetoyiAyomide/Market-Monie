import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HubSelection from "./Screens/HubSelection";
import SelectState from "./Screens/SelectState";
import CreateAccount from "./Screens/CreateAccount";
import PersonalDetails from "./Screens/PersonalDetails";
import Address from "./Screens/Address";
import Business from './Screens/Business';
import Loan from './Screens/Loan';
import AccountCreation from './Screens/AccountCreation';
import Preview from './Screens/PreviewPage'
import Login from './Screens/Login'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SelectState />} />
        <Route path="/apply/hub" element={<HubSelection />} />
        <Route path="/CreateAccount" element={<CreateAccount />} />
        <Route path="/account-creation" element={<AccountCreation />} />
        <Route path="/personal-details" element={<PersonalDetails />} />
        <Route path="/address" element={<Address />} />
        <Route path="/business" element={<Business />} />
        <Route path="/loan" element={<Loan />} />
        <Route path="/preview" element={<Preview />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;