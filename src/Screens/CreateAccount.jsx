import React from 'react';
import { useNavigate } from "react-router-dom";
import { FiUserPlus, FiUserCheck } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import ProgressBar from './ProgressBar';

const CreateAccount = () => {
    const navigate = useNavigate();
    const currentStep = 3;

    return (
        <section className='w-full min-h-screen flex items-center justify-center bg-[#f4f6f9] p-4'>
            <div className='relative rounded-2xl bg-white border w-full max-w-xl flex flex-col items-center gap-5 p-6 shadow-sm'>

                {/* Back Button */}
                <button
                    className="absolute left-4 top-20 text-gray-500 hover:text-green-600 text-xl p-2 hover:bg-slate-200 rounded-full transition"
                    onClick={() => navigate(-1)}
                >
                    <FaArrowLeft />
                </button>

                {/* Progress */}
                <div className='w-full'>
                    <ProgressBar currentStep={currentStep} totalSteps={8} />
                </div>

                {/* Logo */}
                <img src="/marketmonie.png" className='w-40' alt="logo" />

                <h3 className='text-xl lg:text-2xl text-center font-semibold'>
                    How would you like to continue?
                </h3>

                <p className='text-slate-400 text-center text-sm'>
                    Create an account to track your application, or continue as a guest.
                </p>

                <div className='flex flex-col gap-6 w-full'>

                    {/* Create Account */}
                    <button
                        onClick={() => navigate("/account-creation")}
                        className='w-full text-left rounded-2xl border border-green-800 p-4 gap-3 hover:bg-green-100 transition'
                    >
                        <div className='flex items-center justify-between'>
                            <div className='flex gap-3'>
                                <div className='rounded-2xl bg-green-100 p-3 flex items-center justify-center'>
                                    <FiUserPlus className='text-green-800 text-xl' />
                                </div>

                                <div>
                                    <h1 className='font-semibold'>Create an Account</h1>
                                    <p className='text-sm text-slate-400'>
                                        Track your loans, get status updates
                                    </p>
                                </div>
                            </div>

                            <span className='bg-green-800 text-white text-xs px-3 py-1 rounded-full'>
                                RECOMMENDED
                            </span>
                        </div>

                        <div className='flex gap-2 mt-4 flex-wrap'>
                            <span className='bg-[#8abfa0] text-green-800 text-xs px-3 py-1 rounded-full'>
                                Track Application
                            </span>
                            <span className='bg-[#8abfa0] text-green-800 text-xs px-3 py-1 rounded-full'>
                                Repayment History
                            </span>
                            <span className='bg-[#8abfa0] text-green-800 text-xs px-3 py-1 rounded-full'>
                                Faster re-apply
                            </span>
                        </div>
                    </button>

                    {/* Guest */}
                    <button
                        className='w-full text-left rounded-2xl border border-gray-400 p-4 hover:bg-gray-100 transition'
                        onClick={() => navigate("/personal-details")}
                    >
                        <div className='flex items-center gap-3'>
                            <div className='rounded-2xl bg-gray-300 p-3 flex items-center justify-center'>
                                <FiUserCheck className='text-gray-500 text-2xl' />
                            </div>

                            <div>
                                <h1 className='font-semibold'>Continue as Guest</h1>
                                <p className='text-sm text-slate-400'>
                                    Apply without creating an account
                                </p>
                            </div>
                        </div>
                    </button>

                </div>
            </div>
        </section>
    );
};

export default CreateAccount;