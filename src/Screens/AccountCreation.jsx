import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { FaRegUserCircle, FaArrowLeft } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FiEyeOff, FiMessageSquare } from "react-icons/fi";
import ProgressBar from "./ProgressBar"

const AccountCreation = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(180); // 3 minutes in seconds
  const [isOtpSent, setIsOtpSent] = useState(false);
  const isFormValid =
    fullName.trim() &&
    phone.length === 10 &&
    password.length >= 6 &&
    confirmPassword === password;

   React.useEffect(() => {
  let interval;

  if (isOtpSent && timer > 0) {
    interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
  }

  return () => clearInterval(interval);
}, [isOtpSent, timer]);

const maskedPhone = phone
  ? `${phone.slice(0, 2)}****${phone.slice(-2)}`
  : "";

  const handleOtpChange = (value, index) => {
  if (!/^\d*$/.test(value)) return;

  const newOtp = [...otp];
  newOtp[index] = value;
  setOtp(newOtp);

  // auto focus next input
  if (value && index < 5) {
    document.getElementById(`otp-${index + 1}`).focus();
  }
};

const formatTime = (seconds) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
};

const isOtpComplete = otp.every(d => d !== "");
  return (
     <section className='w-full relative min-h-screen flex items-center justify-center p-4 py-10'>
        <div className='rounded-2xl bg-white border border-white w-full max-w-2xl flex flex-col items-center gap-5 p-6 shadow-sm'>
          <div className='w-full'><ProgressBar currentStep={3} totalSteps={8} /></div>
          <div className='flex self-start gap-2 items-center'>
                <button onClick={() => navigate(-1)} className="p-2 text-gray-500 hover:text-green-600 text-xl hover:bg-slate-200 h-fit rounded-full transition">
                      <FaArrowLeft />
                    </button>
               <div className='flex gap-2 '>
                  <div className='rounded-2xl bg-green-100 p-3 flex items-center justify-center'>
                      <FaRegUserCircle className='text-green-800 text-2xl' />
                  </div>
                  <div>
                    <h1 className='font-semibold'>Create your account</h1>
                    <p className='text-slate-400 text-sm'>Fill in your details below</p>
                  </div>
               </div>
              </div>

                    <div className='flex flex-col gap-2 w-full'>
                        <label htmlFor="lastName">Full Name <span className='text-red-500'>*</span></label>
                        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} id="lastName" required  placeholder='e.g Amara Okafor' className='border border-gray-300 rounded-lg p-2 outline-none' />
                    </div>
                <div className='flex flex-col gap-2 items-start justify-start w-full '>
                    <label htmlFor="phoneNumber">Phone Number <span className='text-red-500'>*</span></label>
                    <div className='flex items-center border border-gray-300 rounded-lg w-full'>
                        <span className='p-2 bg-slate-100 border-r border-gray-300 text-slate-500 rounded-l-lg text-sm'>+234(0)</span>
                        <input type="text" id="phoneNumber" value={phone} onChange={(e) => {const value = e.target.value.replace(/\D/g, "").slice(0, 10); setPhone(value);}} required  placeholder='Phone Number' className='p-2 w-full rounded-r-lg outline-none text-sm' maxLength={10} />
                    </div>
                </div>

                <div className='flex flex-col gap-3 items-start justify-start w-full '>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder='you@example.com' className='border border-gray-300 rounded-lg p-2 w-full' />
                </div>
                <div className='flex flex-col gap-3 items-start justify-start w-full'>
                    <label htmlFor="password">Password <span className='text-red-500'>*</span></label>
                    <div className='w-full relative'>
                      <input type={showPassword ? "text" : "password"} value={password} id='password' onChange={(e) => setPassword(e.target.value)} placeholder='Min. 6 characters' className='border border-gray-300 rounded-lg p-2 w-full pr-10 outline-none'/>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-2.5 text-gray-500'>
                      {showPassword ? <FiEyeOff /> : <MdOutlineRemoveRedEye />}
                    </button>
                    </div>
                    {password && password.length < 6 && (<p className="text-xs text-red-500">Password must be at least 6 characters long</p>)}       
                </div>
                <div className='flex flex-col gap-3 items-start justify-start w-full'>
                    <label htmlFor="confirmPassword">Confirm Password <span className='text-red-500'>*</span></label>
                    <div className='relative w-full'>
                    <input type={showConfirmPassword ? "text" : "password"} id='confirmPassword' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} placeholder='Re-enter your password' className='border border-gray-300 rounded-lg p-2 w-full pr-10 outline-none'/>
                   <button type="button"  onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='absolute right-3 top-2.5 text-gray-500'>
                      {showConfirmPassword ? <FiEyeOff /> : <MdOutlineRemoveRedEye />}
                    </button>
                    {confirmPassword && confirmPassword !== password && (<p className="text-xs text-red-500">Passwords do not match</p>)}
                    </div>
                </div>

                <div className='flex text-sm gap-3 self-start'>
                  <input type="checkbox" name="" id="" required/>
                  <p>I agree to MarketMonie's {" "}<a href="" className='text-green-800'>Terms of service {" "}</a> and {" "}<a href="" className='text-green-800'>Privacy Policy</a></p>
                </div>
                <div className='w-full'>
                   <button onClick={() => {if (isFormValid) {setIsOtpSent(true); setTimer(180);}}} className={`rounded-xl p-2.5 w-full transition-all duration-200 shadow-md font-medium ${isFormValid ? "bg-green-800 text-white hover:bg-green-900 cursor-pointer" : "bg-green-100 text-green-400 cursor-not-allowed"}`}>
                      Create Account
                  </button>
                </div>
                <div className='flex gap-1 text-md'>
                  <p className='text-slate-400'>Already have an account?</p>
                  <button onClick={() => navigate("/login")} className='text-green-800 font-semibold hover:underline'>Login</button>
                </div>


                {/* OTP popup */}
                {isOtpSent && (
                  <div className='fixed inset-0 flex items-center justify-center bg-black/40 z-50'>
                    <div className='relative bg-white w-full max-w-md flex flex-col items-center gap-5 p-6 rounded-2xl shadow-md'>
                      <button onClick={() => setIsOtpSent(false)} className='text-xl absolute self-end hover:bg-gray-300 p-2 rounded-full hover:text-gray-800'>
                        <IoMdClose />
                      </button>
                      <div className='rounded-2xl bg-green-100 p-3 flex items-center justify-center'>
                        <FiMessageSquare className='text-green-800 text-2xl' />
                      </div>

                      <h1 className='font-semibold'>Enter Verification Code</h1>

                      <p className='text-sm text-slate-500'>
                        We sent a 6-digit code to {maskedPhone}
                      </p>

                      {/* OTP Inputs */}
                      <div className='flex gap-2'>
                        {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleOtpChange(e.target.value, index)}
                          onKeyDown={(e) => {
                            if (e.key === "Backspace" && !otp[index] && index > 0) {
                               document.getElementById(`otp-${index - 1}`).focus();
                              }
                              }}
                          onPaste={(e) => {
                            const paste = e.clipboardData.getData("text").slice(0, 6);
                            if (!/^\d+$/.test(paste)) return;
                            const newOtp = paste.split("");
                            setOtp(newOtp);
                              }}
                            className='w-10 h-10 text-center border border-gray-300 rounded-md outline-none'/>
                            ))}
                      </div>

                     {/* Timer / Resend */}
                    <div className='text-sm text-slate-500'>
                    {timer > 0 ? (
                      <p>Resend code in {formatTime(timer)}</p>
                      ) : (
                      <button onClick={() => { setTimer(180); }} className='text-green-800 font-semibold'>Resend Code
                      </button>
                    )}
                    </div>

                    <button onClick={() => navigate("/personal-details")} disabled={!isOtpComplete} className={`rounded-xl p-2.5 w-full ${isOtpComplete ? "bg-green-800 text-white hover:bg-green-900" : "bg-green-100 text-green-400 cursor-not-allowed"}`}>
                      Verify
                    </button>
                    <p className='text-slate-400 text-xs'>Didn't receive the code? Check your SMS inbox or try resending</p>
                    </div>
                  </div>
                )}

            </div>
        </section>
  )
}

export default AccountCreation
