import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HubSelection from "./Screens/HubSelection";
import SelectState from "./Screens/SelectState";
import CreateAccount from "./Screens/CreateAccount";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SelectState />} />
        <Route path="/apply/hub" element={<HubSelection />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/personal-details" element={<PersonalDetails />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;