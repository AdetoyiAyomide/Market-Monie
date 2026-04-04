import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPerson } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { LuBuilding2 } from "react-icons/lu";
import { FiCreditCard } from "react-icons/fi";


const Loan = () => {
    const navigate = useNavigate();
    const [loanAmount, setLoanAmount] = useState("");
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountName, setAccountName] = useState("");
    const [error, setError] = useState(false);

    const handleReview = () => {
        if (!loanAmount || !bankName || !accountNumber || !accountName) {
            setError(true);
            return;
        }
        // Proceed to next step or summary
        navigate("/summary"); // Assuming there's a summary page or similar
    };

    return (
        <section className='w-full min-h-screen flex items-center justify-center p-4 py-10'>
            <div className='rounded-2xl bg-white border border-white w-full max-w-2xl flex flex-col items-center gap-5 p-6 shadow-sm'>
                            <div className='flex gap-2 w-full justify-between text-sm'>
                                <button className='flex flex-col items-center rounded-lg p-2 w-1/4 text-slate-400'>
                                    <BsPerson />
                                    <span>Personal</span>
                                    <span>A</span>
                                </button>
                                <button className='flex flex-col items-center rounded-lg p-2 w-1/4 text-slate-400'>
                                    <HiOutlineLocationMarker />
                                    <span>Address</span>
                                    <span>B</span>
                                </button>
                                <button className='flex flex-col items-center rounded-lg p-2 w-1/4 text-slate-400'>
                                    <LuBuilding2 />
                                    <span>Business</span>
                                    <span>C</span>
                                </button>
                                <button className='text-green-800 bg-green-100 flex flex-col items-center rounded-lg p-2 w-1/4'>
                                   <FiCreditCard />
                                    <span>Loan</span>
                                    <span>D</span>
                                </button>
                            </div>
                 <h2 className='font-semibold text-left w-full'>Loan Details</h2>
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
                            setLoanAmount(e.target.value);
                            setError(false);
                        }}
                        className='border border-gray-300 rounded-xl p-2.5 outline-none focus:border-green-600 transition-colors'
                    />
                    <div className='flex flex-wrap gap-2 text-sm font-light text-slate-600'>
                        <span className='cursor-pointer hover:bg-green-50 p-1 rounded' onClick={() => { setLoanAmount("10,000"); setError(false); }}>#10,000</span>
                        <span className='cursor-pointer hover:bg-green-50 p-1 rounded' onClick={() => { setLoanAmount("25,000"); setError(false); }}>#25,000</span>
                        <span className='cursor-pointer hover:bg-green-50 p-1 rounded' onClick={() => { setLoanAmount("50,000"); setError(false); }}>#50,000</span>
                        <span className='cursor-pointer hover:bg-green-50 p-1 rounded' onClick={() => { setLoanAmount("100,000"); setError(false); }}>#100,000</span>
                        <span className='cursor-pointer hover:bg-green-50 p-1 rounded' onClick={() => { setLoanAmount("200,000"); setError(false); }}>#200,000</span>
                        <span className='cursor-pointer hover:bg-green-50 p-1 rounded' onClick={() => { setLoanAmount("500,000"); setError(false); }}>#500,000</span>
                    </div>
                </div>
                <div className='flex flex-col w-full gap-2'>
                    <label htmlFor="bankName">Bank Name <span className='text-red-500'>*</span></label>
                    <select
                        name="bankName"
                        id="bankName"
                        value={bankName}
                        onChange={(e) => {
                            setBankName(e.target.value);
                            setError(false);
                        }}
                        className='border top-full w-full bg-white border border-slate-400 mt-1 rounded shadow z-10 focus:border-green-600 p-2 hover:bg-gray-100 cursor-pointer transition-colors'
                    >
                        <option value="">Select Bank</option>
                        <option value="">Access Bank</option>
                        <option value="">First Bank</option>
                        <option value="">Guarantee Trust Bank</option>
                        <option value="">Polaris Bank</option>
                        <option value="">Zenith Bank</option>
                        <option value="">DigitvantPay</option>
                        <option value="">Moniepoint</option>
                        <option value="">OPay</option>
                        <option value="">PalmPay</option>
                    </select>
                </div>
                <div className='flex flex-col w-full gap-2'>
                    <label htmlFor="accountNumber">Account Number <span className='text-red-500'>*</span></label>
                    <input
                        type="text"
                        id="accountNumber"
                        value={accountNumber}
                        onChange={(e) => {
                            setAccountNumber(e.target.value);
                            setError(false);
                        }}
                        placeholder='10-digit NUBAN number'
                        className='border border-gray-300 rounded-xl p-2.5 outline-none focus:border-green-600 transition-colors'
                    />
                </div>
                <div className='flex flex-col w-full gap-2'>
                    <label htmlFor="accountName">Account Name <span className='text-red-500'>*</span></label>
                    <input
                        type="text"
                        id="accountName"
                        value={accountName}
                        onChange={(e) => {
                            setAccountName(e.target.value);
                            setError(false);
                        }}
                        placeholder='Name on your bank account'
                        className='border border-gray-300 rounded-xl p-2.5 outline-none focus:border-green-600 transition-colors'
                    />
                </div>
                <div className='flex flex-col w-full gap-2'>
                    <label htmlFor="existingLoans">Existing Loans <span className='text-sm text-slate-400'>(optional)</span></label>
                    <input type="text" id="existingLoans" placeholder='e.g. Lender name & outstanding amount, if any' className='border border-gray-300 rounded-xl p-2.5 outline-none focus:border-green-600 transition-colors' />
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
                        className='text-white bg-green-800 rounded-xl p-2.5 w-1/2 hover:bg-green-900 transition-colors shadow-md font-medium'
                    >
                        Review Application
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Loan