'use client'

import React, { useState } from 'react'

import axios from 'axios'

export function LoginForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('') // for registration only
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all required fields.')
      return
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      if (isLogin) {
        // Login
        const res = await axios.post('http://localhost:5001/api/auth/login', {
          email,
          password,
        })
        // Save user data as needed
        localStorage.setItem('user', JSON.stringify(res.data.data))
        alert('Login successful!')
        // Redirect to dashboard (implement your own redirect logic)
        window.location.href = '/dashboard'
      } else {
        // Register
        await axios.post('http://localhost:5001/api/auth/register', {
          username,
          email,
          password,
        })
        alert('Registration successful! Please login.')
        setIsLogin(true)
        setUsername('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Badge in top right */}
      <div className="relative">
        <div className="absolute -top-16 right-0">
          <img
            src="https://www.pngall.com/wp-content/uploads/2016/07/Gold-Medal-PNG-Clipart.png"
            alt="Winner badge"
            className="w-20 h-20"
          />
        </div>
      </div>
      {/* Logo and company name */}
      <div className="flex items-center mb-12">
        
        <span className="text-2xl ml-2 text-gray-700">Echem.lk</span>
      </div>
      {/* Form Container */}
      <form onSubmit={handleSubmit} className="transition-all duration-300 ease-in-out">
        {isLogin ? (
          // Login Form
          <div>
            <h1 className="text-3xl font-medium text-gray-700 mb-2">Welcome to Echem.lk!</h1>
            <p className="text-gray-500 mb-8">Please sign-in to your account and start the adventure</p>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-center py-3 rounded-md text-gray-800 font-medium mb-4"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(false)
                setError('')
                setUsername('')
                setEmail('')
                setPassword('')
                setConfirmPassword('')
              }}
              className="w-full bg-gray-600 hover:bg-gray-700 text-center py-3 rounded-md text-white font-medium"
            >
              Register
            </button>
          </div>
        ) : (
          // Register Form
          <div>
            <h1 className="text-3xl font-medium text-gray-700 mb-2">Create Account</h1>
            <p className="text-gray-500 mb-8">Join us and start your learning journey</p>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-gray-600 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="John Doe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label htmlFor="email-register" className="block text-gray-600 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email-register"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label htmlFor="password-register" className="block text-gray-600 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password-register"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-gray-600 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-center py-3 rounded-md text-gray-800 font-medium mt-6 mb-4"
            >
              Create Account
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(true)
                setError('')
                setUsername('')
                setEmail('')
                setPassword('')
                setConfirmPassword('')
              }}
              className="w-full bg-gray-600 hover:bg-gray-700 text-center py-3 rounded-md text-white font-medium"
            >
              Back to Login
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
