import { SignUp } from '@clerk/nextjs'
import React from 'react'

function SignUpView() {
    return (
        <div className="min-h-screen  w-full border-2 border-red-500  flex items-center justify-center hidden">
            <SignUp />
        </div>
    )
}

export default SignUpView
