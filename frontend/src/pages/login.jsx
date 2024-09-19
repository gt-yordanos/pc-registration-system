import React from 'react'

const Login = () => {
  return (
    <div className='flex  flex-col justify-center items-center min-h-screen bg-[#000F1F]'>
        <div className='text-center'>
            <h1 className='font-bold text-2xl md:text-4xl text-[#CCFFFF]'>PC Registration System </h1>
            <h2 className=' text-xl md:text-2xl text-[#A9A9A9] mb-6'>Sign in to your account</h2>
        </div>
        <form action="" className='flex flex-col justify-center items-center space-y-4'>
            <div className='mb-2'>
                <label 
                htmlFor="username" 
                className='text-left text-[#CCFFFF]'>Username</label> 
                <input type="text" 
                placeholder='Enter username'
                className='w-full p-2 border border-[#005F8F] bg-transparent text-[#A9A9A9]' />
            </div>
            <div className='mb-2'>
                <label 
                htmlFor="password" 
                className='text-left text-[#CCFFFF] '>Password</label>  
                <input type="password" 
                placeholder='Enter password'
                className='w-full p-2 border border-[#005F8F] bg-transparent text-[#A9A9A9]' />
            </div>
            <div className='w-full' >
                <button className='w-full p-2 bg-[#005F8F] text-[#CCFFFF]' >Login</button>
            </div>
        </form>

    </div>
  )
}

export default Login