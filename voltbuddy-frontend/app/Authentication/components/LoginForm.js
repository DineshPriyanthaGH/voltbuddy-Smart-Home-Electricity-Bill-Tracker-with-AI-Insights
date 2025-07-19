'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all required fields.');
      toast.error('Please fill in all required fields.');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match.');
      toast.error('Passwords do not match.');
      return;
    }

    try {
      if (isLogin) {
        const res = await axios.post('http://localhost:5001/api/auth/login', {
          email,
          password,
        });

        // Save JWT token to localStorage
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
        }

        // Save user data (optional)
        localStorage.setItem('user', JSON.stringify(res.data.data));

        toast.success('Login successful!');
        // Redirect to dashboard page after login
        window.location.href = '/dashboard';
      } else {
        await axios.post('http://localhost:5001/api/auth/register', {
          username,
          email,
          password,
        });
        toast.success('Registration successful! Please login.');
        setIsLogin(true);
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <div className="absolute -top-16 right-0"></div>
      </div>
      {/* Logo Section */}
      <div className="flex items-center justify-center space-x-3 mb-8">
        <img src="./images/logo.png" className="h-10 w-10" />
        <span className="text-xl font-bold" style={{color: '#2441E1'}}>VOLTBUDDY</span>
      </div>
      <form onSubmit={handleSubmit}>
        {isLogin ? (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-transparent mb-3" 
                  style={{backgroundImage: 'linear-gradient(to right, #2441E1, #3B82F6)', 
                          WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>
                Welcome Back!
              </h1>
              <p className="text-gray-600 text-lg">Sign in to track your bills and save with AI</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-gray-700 px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80"
                  style={{focusRing: '2px solid #2441E1'}}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 text-gray-700 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80"
                  style={{focusRing: '2px solid #2441E1'}}
                />
              </div>
            </div>
            
            {error && (
              <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl p-4 mt-6">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                  <span className="text-red-700 font-medium">{error}</span>
                </div>
              </div>
            )}
            
            <div className="space-y-4 mt-8">
              <button
                type="submit"
                className="w-full py-4 font-bold rounded-2xl text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                style={{background: 'linear-gradient(to right, #2441E1, #3B82F6)'}}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                  setUsername('');
                  setEmail('');
                  setPassword('');
                  setConfirmPassword('');
                }}
                className="w-full py-4 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-2xl text-gray-700 hover:text-gray-900 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Create New Account
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-transparent mb-3" 
                  style={{backgroundImage: 'linear-gradient(to right, #2441E1, #3B82F6)', 
                          WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>
                Create Account
              </h1>
              <p className="text-gray-600 text-lg">Join VoltBuddy to track bills and save with AI</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your full name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 text-gray-700 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80"
                  style={{focusRing: '2px solid #2441E1'}}
                />
              </div>
              <div>
                <label htmlFor="email-register" className="block text-gray-700 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email-register"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 text-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80"
                  style={{focusRing: '2px solid #2441E1'}}
                />
              </div>
              <div>
                <label htmlFor="password-register" className="block text-gray-700 font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password-register"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-gray-700 px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80"
                  style={{focusRing: '2px solid #2441E1'}}
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-gray-700 font-semibold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 text-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:border-transparent shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80"
                  style={{focusRing: '2px solid #2441E1'}}
                />
              </div>
            </div>
            
            {error && (
              <div className="bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-2xl p-4 mt-6">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                  <span className="text-red-700 font-medium">{error}</span>
                </div>
              </div>
            )}
            
            <div className="space-y-4 mt-8">
              <button
                type="submit"
                className="w-full py-4 font-bold rounded-2xl text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                style={{background: 'linear-gradient(to right, #10B981, #059669)'}}
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                  setUsername('');
                  setEmail('');
                  setPassword('');
                  setConfirmPassword('');
                }}
                className="w-full py-4 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-2xl text-gray-700 hover:text-gray-900 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Back to Sign In
              </button>
            </div>
          </div>
        )}
      </form>
      <ToastContainer />
    </div>
  );
}  