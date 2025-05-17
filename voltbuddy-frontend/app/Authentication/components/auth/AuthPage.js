
'use client'
import React, { useState } from 'react'
import { MobileNumberInput } from './MobileNumberInput'
import { Button } from '../common/Button'
import { PhoneIcon, UserIcon, KeyIcon } from 'lucide-react'
import axios from 'axios'

export function AuthPage() {
  const [authMode, setAuthMode] = useState('login') // We'll keep tabs but only OTP login/signup flow
  const [mobileNumber, setMobileNumber] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Step 1: Send OTP request
  const handleSendOtp = async (e) => {
    e.preventDefault()
    setError('')

    if (!mobileNumber || !/^(?:\+94|0)?[0-9]{9}$/.test(mobileNumber.replace(/\s/g, ''))) {
      setError('Please enter a valid Sri Lankan mobile number')
      return
    }

    setIsLoading(true)
    try {
      await axios.post('/api/auth/request-otp', { mobileNumber })
      setOtpSent(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP')
    } finally {
      setIsLoading(false)
    }
  }

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setError('')

    if (otpCode.length !== 6) {
      setError('Please enter the 6-digit OTP code')
      return
    }

    setIsLoading(true)
    try {
      const res = await axios.post('/api/auth/verify-otp', { mobileNumber, otpCode })
      localStorage.setItem('token', res.data.token)
      alert('Login successful! Redirecting to dashboard...')
      // TODO: Replace with your routing logic, e.g. next/router push to dashboard
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 w-full">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">VOLTBUDDY</h1>
          <p className="text-gray-600">
            {otpSent ? 'Enter the OTP sent to your mobile' : 'Sign in with your mobile number'}
          </p>
        </div>

        {!otpSent ? (
          <form onSubmit={handleSendOtp}>
            <div className="space-y-6">
              <MobileNumberInput value={mobileNumber} onChange={setMobileNumber} error={error} />
              <Button type="submit" fullWidth isLoading={isLoading}>
                Send OTP
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div className="space-y-6">
              <input
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="6-digit OTP code"
                maxLength={6}
                className="border p-2 w-full"
              />
              <Button type="submit" fullWidth isLoading={isLoading}>
                Verify OTP
              </Button>
            </div>
            <div className="mt-4 text-center">
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                onClick={() => {
                  setOtpSent(false)
                  setOtpCode('')
                  setError('')
                }}
              >
                Resend OTP / Change Number
              </button>
            </div>
          </form>
        )}

        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}

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
