import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { FiEyeOff } from "react-icons/fi";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const Login = () => {
      const navigate = useNavigate();
      const [showPassword, setShowPassword] = useState(false);
      const [password, setPassword] = useState("");
        const [email, setEmail] = useState("");
        const [error, setError] = useState("");
        const handleLogin = () => {

  setError("");

  if (!email || !password) {
    setError("Please enter both email and password");
    return;
  }

  // Fake check (for now)
  // API call
// const res = await fetch("/api/login")
  if (email !== "test@gmail.com" || password !== "123456") {
    setError("Invalid email or password");
    return;
  }

  // Success
  alert("Login successful!");
};
  return (
    <>
       <section className='w-full min-h-screen flex items-center justify-center p-4 py-10'>
        <div className='rounded-2xl relative bg-white border border-white min-w-lg flex flex-col items-center gap-5 p-6 shadow-sm'>
             <button onClick={() => navigate(-1)} className="p-2 text-gray-500 hover:text-green-600 text-xl flex absolute left-4 top-10 hover:bg-slate-200 rounded-full transition-colors duration-200">
                         <FaArrowLeft />
                     </button>
                    <img src="/marketmonie.png" className='w-40' alt="" />

                    <h2 className='text-xl font-semibold'>Login</h2>

                    <div className='flex flex-col gap-3 items-start justify-start w-full'>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className={`border rounded-lg p-2 w-full outline-none ${ error ? "border-red-500" : "border-gray-300"}`} required/>   
                    </div>

                     <div className='flex flex-col gap-3 items-start justify-start w-full'>
                        <div className='w-full relative'>
                            <input type={showPassword ? "text" : "password"} id='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' className={`border rounded-lg p-2 w-full outline-none ${ error ? "border-red-500" : "border-gray-300"}`} required/>
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className='absolute right-3 top-2.5 text-gray-500'>
                            {showPassword ? <FiEyeOff /> : <MdOutlineRemoveRedEye />}
                            </button>
                        </div>     
                        </div>
                        {error && (
                            <div className="w-full p-2 bg-red-50 text-red-600 rounded-lg text-xs text-center">
                                {error}
                            </div>
                            )}

                        <button onClick={handleLogin} className={`rounded-xl p-2.5 w-full transition-all duration-200 shadow-md font-medium bg-green-800 text-white hover:bg-green-900 cursor-pointer`}>Login
                        </button>

                        <p className='text-slate-400 text-md'>Don't have account, <a href="/" className='text-green-800 font-semibold hover:underline'>Sign up</a></p>
        </div>
        </section>
    </>
  )
}

export default Login