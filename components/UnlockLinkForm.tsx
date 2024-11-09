"use client"
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { LoadingButton } from './ui/LoadingButton'
import { useParams, useRouter } from 'next/navigation'
import { trpc } from '@/trpc/client'
function UnlockLinkForm({ deviceType, location }: {
  deviceType: string,
  location: string
}) {
  const [password, setPassword] = useState<string>('')
  const router = useRouter()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { custom_id } = useParams() as { custom_id: string }
  if (!custom_id) return

  const registerClicksMutation = trpc.links.registerClick.useMutation({
    onSuccess: () => {
      if (unlockMutation.data?.originalUrl) {
        router.push(unlockMutation.data.originalUrl)
      }
    },
  })

  const unlockMutation = trpc.links.unlockLink.useMutation({
    onSuccess: (data) => {
      registerClicksMutation.mutate({
        customId: custom_id,
        location: location,
        device: deviceType,
      })
    },
  })



  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password.trim() === '') {
      alert('Please enter a password')
      return
    }
    unlockMutation.mutate({
      password,
      customId: custom_id as string
    })

  }
  console.log(unlockMutation.error)
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center absolute -translate-y-1/2 top-1/2 left-1/2 -translate-x-1/2 justify-center max-w-sm w-full mx-auto p-6 bg-white rounded-lg shadow-lg md:max-w-md lg:max-w-lg">
      <div className="text-center text-gray-800 font-semibold text-xl">
        🔒 This link is password protected
      </div>
      <div className="text-center text-gray-600 mb-4">
        Enter the password to unlock and access the link.
      </div>
      {unlockMutation.error && (
        <div className="text-red-500 text-center mb-4">
          {unlockMutation.error.message} {/* Display error message here */}
        </div>
      )}

      <div className="relative w-full">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter password"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-blue-500"
        >
          {showPassword ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8-4.03-8-9s3.582-9 8-9a10.05 10.05 0 011.875.175m-6.375 6.65A3 3 0 109.878 9a2.5 2.5 0 011.256-2.175" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 003-3h-2a3 3 0 003 3v-2a3 3 0 00-3-3H6a3 3 0 00-3 3v2a3 3 0 003 3z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c1.274 4.057.414 8.306-1.542 11.57-1.956 3.267-5.234 5.57-9.542 5.57-4.308 0-8.268-2.943-9.542-5.57-1.956-3.267-1.542-8.306 1.542-11.57" />
            </svg>
          )}
        </button>
      </div>

      <LoadingButton loading={unlockMutation.isPending || registerClicksMutation.isPending} type="submit" className='w-full'>
        Unlock Link
      </LoadingButton>
    </form>
  )
}

export default UnlockLinkForm
