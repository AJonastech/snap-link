
"use client"
import React, { useState, useEffect } from 'react'
import { useSignIn } from '@clerk/nextjs'
import { trpc } from '@/trpc/client'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'


function Login() {
  const { signIn, isLoaded, setActive } = useSignIn()
  const [loading, setLoading] = useState(false)
  const mutation = trpc.user.createUserIfNotExists.useMutation()
 const user = trpc.user.getUser.useQuery()
 console.log(user.data, "This is the data")
 console.log(user.error, "This is the error")


  const {toast } = useToast()
  const router = useRouter()
  const handleGoogleSignIn = async () => {
    if (!isLoaded) return;

    setLoading(true)
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard"
      });

     mutation.mutate({
      userId:"123",
      name:"Agu Jonas",
      email:"AguJonas13@gmail.com"
     })

      toast({
        title:"'Login successful. Redirecting...'",
        variant:"success"
      })
      setLoading(false)
    } catch (err) {
      console.error('Error signing in with Google:', err);
      toast({
        title: 'An error occurred during Google sign in.',
        variant: "destructive"
      });
      setLoading(false)
    }
  }

  const handleGithubSignIn = async () => {
    if (!isLoaded) return;

    setLoading(true)
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_github",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard"
      });

      toast({
        title: 'Login successful. Redirecting...',
        variant: "success"
      })
      setLoading(false)
    } catch (err) {
      console.error('Error signing in with Github:', err);
      toast({
        title: 'An error occurred during Github sign in.',
        variant: "destructive"
      });
      setLoading(false)
    }
  }

const handleTest = ()=>{
  mutation.mutate({
    userId:"123",
    name:"Agu Jonas",
    email:"AguJonas13@gmail.com"
   })
   console.log(mutation.data)
}

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-sm">
      <div className="text-center mb-8">
        <h1 onClick={handleTest} className="text-3xl font-bold">Welcome back</h1>
        <p className="text-gray-500 mt-2">Sign in to continue to SnapLink</p>
      </div>

      <div className="space-y-4">
        <button onClick={handleGoogleSignIn} type="button" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>

        <button onClick={handleGithubSignIn} type="button" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2C5.03 2 1 6.03 1 11c0 3.97 2.58 7.35 6.16 8.54.45.08.62-.2.62-.44v-1.54c-2.5.54-3.03-1.21-3.03-1.21-.41-1.04-1-1.32-1-1.32-.82-.56.06-.55.06-.55.9.06 1.37.93 1.37.93.8 1.37 2.1.98 2.62.75.08-.58.31-.98.57-1.2-2-.23-4.1-1-4.1-4.44 0-.98.35-1.78.93-2.4-.09-.23-.4-1.16.09-2.42 0 0 .76-.24 2.48.93.72-.2 1.49-.3 2.25-.3.76 0 1.53.1 2.25.3 1.72-1.17 2.48-.93 2.48-.93.49 1.26.18 2.19.09 2.42.58.62.93 1.42.93 2.4 0 3.45-2.1 4.21-4.11 4.44.32.28.61.83.61 1.67v2.48c0 .24.16.52.62.44C16.42 18.35 19 14.97 19 11c0-4.97-4.03-9-9-9z" clipRule="evenodd" />
          </svg>
          Continue with GitHub
        </button>
        {loading && <div className="text-center mt-4">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>}
      </div>
    </div>
  )
}

export default Login