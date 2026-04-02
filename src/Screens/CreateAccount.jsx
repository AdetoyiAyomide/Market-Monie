import React from 'react'

const CreateAccount = () => {
  return (
    <section className='w-full h-screen flex items-center justify-center'>
        <div className='rounded-2xl bg-white border border-white min-w-1/3 flex flex-col items-center gap-5 p-4'>
            <img src="/public/marketmonie.png" className='w-40' alt="" />
            <h3 className='w-full  rounded-t-2xl text-center py-3 font-semibold'>How would you like to continue?</h3>
            <p className='text-slate-400 text-center'>Create an account to track your application, or continue as a guest.</p>
        </div>
        
    </section>
  )
}

export default CreateAccount
