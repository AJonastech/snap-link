import { SignIn } from '@clerk/nextjs'
import React from 'react'

function LoginView() {
  return (
    <div className="min-h-screen flex items-center justify-center">
        <SignIn 
          
          fallbackRedirectUrl="/dashboard"
        />
  
    
    </div>
  )
}

export default LoginView