import React from 'react'
import AuthForm from './components/auth-form'
import Image from 'next/image'

const AuthPage = () => {
  return (
    <div  className="
    flex 
    min-h-full 
    flex-col 
    justify-center 
    py-12 
    sm:px-6 
    lg:px-8 
  ">
    {/* <div className="sm:mx-auto sm:w-full sm:max-w-md rounded-full">
        <Image
          height="60"
          width="60"
          className="mx-auto w-auto rounded-full"
          src="/logo.jpg"
          alt="Logo"
        />
        <h2 
          className="
            mt-6 
            text-center 
            text-3xl 
            font-bold 
            tracking-tight 
            text-gray-900
          "
          >
            Sign in to your account
        </h2>
      </div> */}
      <>
        <AuthForm/>
      </>
    </div>
  )
}

export default AuthPage