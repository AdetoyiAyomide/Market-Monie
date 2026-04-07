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
    console.log("hello")
    const { formData } = useForm();

    const Section = ({ title, children, onEdit }) => (
  <div className="w-full border border-gray-200 rounded-xl p-4 shadow-md">
    <div className="flex justify-between items-center mb-2">
      <h3 className="font-semibold text-sm">{title}</h3>
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
        <p>{formData.firstName} {formData.lastName}</p>
        <p>+234 {formData.phoneNumber}</p>
        <p>{formData.dateOfBirth}</p>
        </Section>

        {/* Address */}
        <Section title="Address" onEdit={() => navigate("/address")}>
        <p>{formData.houseAddress}</p>
        <p>{formData.area}</p>
        <p>{formData.lga}, {formData.state}</p>
        </Section>

        {/* Business */}
        <Section title="Business" onEdit={() => navigate("/business")}>
        <p>{formData.businessName}</p>
        <p>{formData.businessType}</p>
        <p>{formData.yearsInBusiness}</p>
        <p>{formData.dailySales}</p>
        </Section>

        {/* Loan */}
        <Section title="Loan" onEdit={() => navigate("/loan")}>
        <p>₦{formData.loanAmount ? Number(formData.loanAmount).toLocaleString() : "0"}</p>
        <p>{formData.bankName}</p>
        <p>{formData.accountNumber}</p>
        <p>{formData.accountName}</p>
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
