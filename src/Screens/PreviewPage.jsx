import React from 'react'
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar'
import { TiPencil } from "react-icons/ti";
import { FaArrowLeft } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useForm } from "../store/FormContext";



const PreviewPage = () => {
    const currentStep = 8;
    const navigate = useNavigate();
    const { formData } = useForm();
    const Section = ({ title, children, onEdit }) => (
      <div className="w-full border border-gray-200 rounded-xl p-4 shadow-md">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-md">{title}</h3>
          <button
            onClick={onEdit}
            className="text-green-700 text-xs font-medium flex gap-1 items-center hover:underline">
                <TiPencil className='text-blue-300 text-lg'/>
            Edit
          </button>
        </div>
        <div className="text-sm text-gray-700 space-y-1">{children}</div>
      </div>
        );

  return (
    <section className='w-full min-h-screen flex items-center justify-center p-4 py-10'>
      <div className='rounded-2xl bg-white shadow-lg border border-white w-full max-w-xl flex flex-col items-center gap-5 p-6'>
        <div className='w-full pb-3 border-b border-slate-200'>
            <div className='flex items-center justify-between mb-2 w-full'>
                <button 
                    onClick={() => navigate(-1)}
                    className="p-2 text-gray-500 hover:text-green-600 text-xl hover:bg-slate-200 rounded-full transition">
                    <FaArrowLeft />
                  </button>
            <h2 className='font-semibold text-lg text-center flex-1'>Review Application</h2>
            <div className="w-10" />
            </div>
              
            <ProgressBar currentStep={currentStep} totalSteps={8} />
            <div className="w-full mt-4 bg-green-50 border border-green-100 rounded-xl p-4 flex gap-3 items-start shadow-sm">
                <div className='text-lg'>
                    <IoInformationCircleOutline className='text-green-700 '/>
                </div>
                {/* Text */}
                <p className="text-green-800 text-xs leading-relaxed">
                    Please review your details carefully. Tap <span className="font-semibold">Edit</span> on any section to make changes before submitting.
                </p>

            </div>
        </div>

        {/* Personal Details */}
        <Section title="Personal Details" onEdit={() => navigate("/personal-details")}>
          <div className='flex justify-between w-full'>
            <h2 className='font-semibold'>First Name</h2>
            <p>{formData.firstName} {formData.lastName}</p>
          </div>
          <div className='flex justify-between w-full'>
            <h2 className='font-semibold'>Phone Number</h2>
            <p>+234 {formData.phoneNumber}</p>
          </div>
          <div className='flex justify-between w-full'>
            <h2 className='font-semibold'>Date of Birth</h2>
            <p>{formData.dateOfBirth}</p>
          </div>
        </Section>

        {/* Address */}
        <Section title="Address" onEdit={() => navigate("/address")}>
          <div className='flex justify-between w-full'>
            <h2 className='font-semibold'>House Address</h2>
            <p>{formData.houseAddress}</p>
          </div>
          <div className='flex justify-between w-full'>
            <h2 className='font-semibold'>Area</h2>
            <p>{formData.area}</p>
          </div>
          <div className='flex justify-between w-full'>
            <h2 className='font-semibold'>State</h2>
            <p>{formData.lga}, {formData.state}</p>
          </div>
        </Section>

        {/* Business */}
        <Section title="Business" onEdit={() => navigate("/business")}>
          <div className='flex justify-between w-full'>
            <h2 className='font-semibold'>Business Name</h2>
            <p>{formData.businessName}</p>
          </div>
          <div className='flex justify-between w-full'>
            <h2 className='font-semibold'>Business Type</h2>
            <p>{formData.businessType}</p>
          </div>
          <div className='flex justify-between w-full'>
            <h2 className='font-semibold'>Years In Business</h2>
            <p>{formData.yearsInBusiness}</p>
          </div>
          <div className='flex justify-between w-full'>
            <h2 className='font-semibold'>Daily sales</h2>
            <p>{formData.dailySales}</p>
          </div>
        </Section>

        {/* Loan */}
        <Section title="Loan" onEdit={() => navigate("/loan")}>
          <div className='flex justify-between w-full'>
            <h2 className='font-semibold'>Loan amount</h2>
            <p>₦{formData.loanAmount ? Number(formData.loanAmount).toLocaleString() : "0"}</p>
          </div>
          <div className='flex justify-between w-full'>
            <h2 className='font-semibold'>Bank Name</h2>
            <p>{formData.bankName}</p>
          </div>
          <div className='flex justify-between w-full'>
            <h2 className='font-semibold'>Account Number</h2>
            <p>{formData.accountNumber}</p>
          </div>
          <div className='flex justify-between w-full'>
            <h2 className='font-semibold'>Account Name</h2>
            <p>{formData.accountName}</p>
          </div>
        </Section>
        <button
        className="w-full bg-green-800 text-white rounded-xl p-3 mt-4 hover:bg-green-900 transition"
        onClick={() => {
            console.log("FINAL DATA:", formData);
            alert("Application Submitted!");
        }}
        >
        Submit Application
        </button>

      </div>
    </section>
  )
}

export default PreviewPage