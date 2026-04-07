import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // Personal
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
    email: "",

    // Address
    state: "",
    lga: "",
    houseAddress: "",
    area: "",

    // Business
    businessName: "",
    businessAddress: "",
    businessType: "",
    yearsInBusiness: "",
    dailySales: "",

    // Loan
    loanAmount: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
    existingLoans: "",
  });

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);