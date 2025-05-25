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
        localStorage.setItem('user', JSON.stringify(res.data.data));
        toast.success('Login successful!');
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
        <div className="absolute -top-16 right-0">
         
        </div>
      </div>
       <div className="flex-shrink-0 flex items-center space-x-30">
        <span className="text-2xl font-extrabold text-blue-600  ">VOLTBUDDY</span>
            <img
              src="./images/logo.png"
              alt="VoltBuddy Logo"
              className="h-17 w-17"
            />{" "}
            {/* Logo Image */}
            
          </div>
      <form onSubmit={handleSubmit}>
        {isLogin ? (
          <div>
            <h1 className="text-2xl font-bold text-gray-700 mb-2">Welcome to VOLTBUDDY!</h1>
            <p className="text-gray-500 mb-8">Please sign-in to Track Your Bills, Save with AI</p>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 mb-2">Email</label>
              <input
                type="email"
                id="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-gray-600 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600 mb-2">Password</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 text-gray-600 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-center py-3 font-bold rounded-md text-gray-100 mb-4"
            >
              Login
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
              className="w-full bg-gray-600 hover:bg-gray-700 text-center py-3 rounded-md text-white font-bold cursor-pointer"
            >
              Register
            </button>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold text-gray-700 mb-2">Create Account</h1>
            <p className="text-gray-500 mb-8">Track Your Bills, Save with AI</p>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-gray-600 mb-2">Full Name</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 text-gray-600 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label htmlFor="email-register" className="block text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  id="email-register"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label htmlFor="password-register" className="block text-gray-600 mb-2">Password</label>
                <input
                  type="password"
                  id="password-register"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-gray-600 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-gray-600 mb-2">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-center py-3 rounded-md text-white font-bold cursor-pointer mt-6 mb-4"
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
              className="w-full bg-gray-600 hover:bg-gray-700 text-center py-3 rounded-md text-white font-bold cursor-pointer"
            >
              Back to Login
            </button>
          </div>
        )}
      </form>
      <ToastContainer />
    </div>
  );
}
