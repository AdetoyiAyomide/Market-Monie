import React from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import { FiUserPlus, FiUserCheck } from "react-icons/fi";



const CreateAccount = () => {

  return (
    <section className='w-full h-screen flex items-center justify-center'>
        <div className='rounded-2xl bg-white border border-white min-w-1/2 flex flex-col items-center gap-5 p-4'>
            <img src="/public/marketmonie.png" className='w-40' alt="" />
            <h3 className='w-full text-xl lg:text-2xl rounded-t-2xl text-center pt-3 font-semibold'>How would you like to continue?</h3>
            <p className='text-slate-400 text-center text-sm'>Create an account to track your application, or continue as a guest.</p>

            <div className='flex flex-col gap-6'>
                <button className='w-full text-left rounded-2xl border border-green-800 p-3 gap-3 hover:bg-green-100'>
                    <div className='flex items-center justify-between lg:m-3 lg:gap-6'>
                        <div className='flex gap-3'>
                            <div className='rounded-2xl bg-[#8abfa0] p-3 flex items-center justify-center'>
                                <FiUserPlus className='text-green-800 text-xl' />
                            </div>
                            <div className='flex flex-col gap-0.5 mr-2'>
                                <h1 className='font-semibold'>Create an Account</h1>
                                <p className='text-sm text-slate-400'>Track your loans, get status updates</p>
                            </div>
                        </div>

                        <span className='bg-green-800 text-white text-xs px-3 py-1 rounded-full'>RECOMMENDED</span>
                    </div>

                    <div className='flex gap-3 mt-4 mb-2'>
                        <span className='bg-[#8abfa0] text-green-800 text-xs  px-3 py-1 rounded-full'>Track Application</span>
                        <span className='bg-[#8abfa0] text-green-800 text-xs  px-3 py-1 rounded-full'>Repayment History</span>
                        <span className='bg-[#8abfa0] text-green-800 text-xs  px-3 py-1 rounded-full'>Faster re-apply</span>
                    </div>
                </button>

                <button className='w-full text-left rounded-2xl border border-gray-500 hover:border-gray-500 p-3 hover:bg-gray-300'
                        onClick={Navigate("/personal-details")}
                >
                    <div className='flex items-center lg:m-3 lg:gap-6'>
                        <div className='flex gap-3'>
                            <div className='rounded-2xl bg-gray-300 p-3 flex items-center justify-center'>
                                <FiUserCheck className='text-gray-500 text-2xl' />
                            </div>
                            <div className='flex flex-col gap-0.5 mr-2'>
                                <h1 className='font-semibold'>Continue as Guest</h1>
                                <p className='text-sm text-slate-400'>Apply without creating an account</p>
                            </div>
                        </div>
                    </div>
                </button>
            </div>
        </div>

        </section>

    )
}

export default CreateAccount
