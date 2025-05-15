'use client'
import React, { useState } from 'react'
import { MobileNumberInput } from './MobileNumberInput'
import { Button } from '../common/Button'
import { PhoneIcon, UserIcon, KeyIcon } from 'lucide-react'

export function AuthPage() {
  const [authMode, setAuthMode] = useState('login') // 'login' or 'signup'
  const [mobileNumber, setMobileNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validate Sri Lankan mobile number (basic format)
    if (
      !mobileNumber ||
      !/^(?:\+94|0)?[0-9]{9}$/.test(mobileNumber.replace(/\s/g, ''))
    ) {
      setError('Please enter a valid Sri Lankan mobile number')
      return
    }

    // Mock authentication
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)) // simulate API delay

      console.log(
        `${authMode === 'login' ? 'Logged in' : 'Registered'} with mobile number: ${mobileNumber}`
      )
      // TODO: Add real authentication logic here
    } catch (err) {
      setError('Authentication failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 w-full">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            VOLTBUDDY
          </h1>
          <p className="text-gray-600">
            {authMode === 'login' ? 'Sign in to your account' : 'Create a new account'}
          </p>
        </div>

        {/* Auth Mode Tabs */}
        <div className="flex mb-6 border-b">
          <button
            className={`flex-1 py-2 text-center ${
              authMode === 'login'
                ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
                : 'text-gray-500'
            }`}
            onClick={() => setAuthMode('login')}
            type="button"
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 text-center ${
              authMode === 'signup'
                ? 'text-blue-600 border-b-2 border-blue-600 font-medium'
                : 'text-gray-500'
            }`}
            onClick={() => setAuthMode('signup')}
            type="button"
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <MobileNumberInput value={mobileNumber} onChange={setMobileNumber} error={error} />
            <Button type="submit" fullWidth isLoading={isLoading}>
              {authMode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </div>
        </form>

        {authMode === 'login' && (
          <div className="mt-4 text-center">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium" type="button">
              Forgot Password?
            </button>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500 text-center">
          <p>
            By continuing, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
