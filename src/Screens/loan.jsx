import React, { useState } from'react';
import { useNavigate } from'react-router-dom';
import FormHeader from'./formHeader'
import BankSelect from'./BankSelect';
import ProgressBar from'./ProgressBar';
import { useForm } from"../store/FormContext";



const Loan = () => {
    const navigate = useNavigate();
    const { formData, setFormData } = useForm();
    const { loanAmount, bankName, accountNumber, accountName} = formData;
    const [error, setError] = useState(false);
    
    const isFormValid =
    loanAmount.length > 0 && !isNaN(parseFloat(loanAmount)) &&
    bankName &&
    accountNumber.length === 10 &&
  accountName.trim().length > 0;
  
    const handleReview = () => {
      if (!isFormValid) {
        setError(true);
    return;
  }
  navigate("/preview");
};
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.id]: e.target.value
  });
};
const formatAmount = (value) => {
  return value.replace(/\D/g,"");
};

const formatCurrency = (value) => {
  if (!value) return"";
  return Number(value).toLocaleString();
};

const currentStep = 7;

    return (
        <section className='w-full min-h-screen flex items-center justify-center p-4 py-10 bg-[#f4f6f9]'>
            <div className='rounded-2xl bg-white border border-white w-full max-w-2xl flex flex-col items-center gap-5 p-6 shadow-sm'>
                <div className='w-full'>
                    <ProgressBar currentStep={currentStep} totalSteps={8} />
                </div>
                <FormHeader />
                 <h2 className='font-bold text-left w-full text-xl'>Loan Details</h2>
                {error && (
                    <div className='w-full p-2 bg-red-50 text-red-600 rounded-lg text-xs text-center border border-red-200'>
                        Please fill in all required fields
                    </div>
                )}
                <div className='flex flex-col w-full gap-2'>
                    <label htmlFor="loanAmount">Loan Amount <span className='text-red-500'>*</span></label>
                   <input
                    type="text"
                    id="loanAmount"
                    value={loanAmount}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9.]/g,"");
                      const parts = value.split('.');
                      const sanitizedValue = parts.length > 2 ? parts[0] +'.' + parts.slice(1).join('') : value;
                      setFormData({
                        ...formData,
                        loanAmount: sanitizedValue
                      });
                    }}
                    placeholder="Enter amount"
                    className="border border-gray-300 rounded-xl p-2.5 outline-none focus:border-green-600 transition-colors"/>
                    <div className='flex flex-wrap gap-2 text-sm font-light text-slate-600'>
                        <span className='cursor-pointer hover:bg-green-50 p-1 rounded' onClick={() => { setFormData({ ...formData, loanAmount:"10000" });}}>₦10,000</span>
                        <span className='cursor-pointer hover:bg-green-50 p-1 rounded' onClick={() => { setFormData({ ...formData, loanAmount:"25000" });}}>₦25,000</span>
                        <span className='cursor-pointer hover:bg-green-50 p-1 rounded' onClick={() => { setFormData({ ...formData, loanAmount:"50000" });}}>₦50,000</span>
                        <span className='cursor-pointer hover:bg-green-50 p-1 rounded' onClick={() => { setFormData({ ...formData, loanAmount:"100000" });}}>₦100,000</span>
                        <span className='cursor-pointer hover:bg-green-50 p-1 rounded' onClick={() => { setFormData({ ...formData, loanAmount:"200000" });}}>₦200,000</span>
                        <span className='cursor-pointer hover:bg-green-50 p-1 rounded' onClick={() => { setFormData({ ...formData, loanAmount:"500000" });}}>₦500,000</span>
                    </div>
                </div>
                <div className="flex flex-col w-full gap-2">
                <BankSelect
                bankName={bankName}
                setBankName={(value) =>
                  setFormData({ ...formData, bankName: value })
                }
                setError={setError}/>
                </div>
                <div className='flex flex-col w-full gap-2'>
                    <label htmlFor="accountNumber" className={`transition-colors ${accountNumber?.length === 10 ?'text-green-600 font-semibold' :''}`}>Account Number <span className='text-red-500'>*</span></label>
                    <div className="relative">
                      <input
                        type="text"
                        id="accountNumber"
                        inputMode="numeric"
                        value={accountNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g,"").slice(0, 10);
                          setFormData({
                            ...formData,
                            accountNumber: value
                          });
                          setError(false);
                        }}
                        placeholder="10-digit NUBAN number"
                        className={`w-full border rounded-xl p-2.5 outline-none transition-colors ${
                          accountNumber?.length === 10 ?'border-green-600' :'border-gray-300 focus:border-green-600'
                        }`}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className={`text-[10px] font-bold transition-colors ${accountNumber?.length === 10 ?"text-green-600" :"text-gray-400"}`}>
                          {(accountNumber?.length || 0)}/10
                        </span>
                      </div>
                    </div>
                  {accountNumber && accountNumber.length < 10 && (
                    <p className="text-xs text-red-500">
                      Account number must be 10 digits
                    </p>
                  )}
                </div>
                <div className='flex flex-col w-full gap-2'>
                    <label htmlFor="accountName">Account Name <span className='text-red-500'>*</span></label>
                    <input
                        type="text"
                        id="accountName"
                        value={accountName}
                        onChange={handleChange}
                        placeholder='Name on your bank account'
                        className='border border-gray-300 rounded-xl p-2.5 outline-none focus:border-green-600 transition-colors'
                    />
                </div>
                <div className='flex flex-col w-full gap-2'>
                    <label htmlFor="existingLoans">Existing Loans</label>
                    <input type="text" id="existingLoans"
                    value={formData.existingLoans} onChange={(e) => setFormData({ ...formData, existingLoans: e.target.value})} placeholder='e.g. Lender name & outstanding amount, if any' className='border border-gray-300 rounded-xl p-2.5 outline-none focus:border-green-600 transition-colors' />
                </div>
                <div className='flex w-full justify-between gap-3 mt-2'>
                    <button
                        onClick={() => navigate("/business")}
                        className='border border-green-800 text-green-800 rounded-xl p-2.5 w-1/2 hover:bg-green-50 transition-colors font-medium'
                    >
                        Back
                    </button>
                    <button
                    onClick={handleReview}
                    disabled={!isFormValid}
                    className={`rounded-xl p-2.5 w-1/2 transition-all duration-200 shadow-md font-medium
                    ${
                      isFormValid
                        ?"bg-green-800 text-white hover:bg-green-900"
                        :"bg-green-100 text-green-400 cursor-not-allowed"
                    }`}
                  >
                    Review Application
                  </button>
                </div>
            </div>
        </section>
    )
}

export default Loan