'use client'

import React, { useState } from 'react'
import { MenuIcon, XIcon } from 'lucide-react'
export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className=" fixed  w-full bg-white shadow-sm ">
      <div className="container mx-auto px-4 md:px-2">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <img src="./images/logo.png" alt="VoltBuddy Logo" className="h-17 w-17" /> {/* Logo Image */}
            <span className="text-xl font-bold text-blue-600  ">VOLTBUDDY</span>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-16" >
            <a
              href="#home"
              className="text-gray-500 font-bold hover:text-blue-600 transition-colors"
            >
              Home
            </a>
            <a
              href="#features"
              className="text-gray-500 font-bold hover:text-blue-600 transition-colors"
            >
              Features
            </a>
          
            <a
              href="#about"
              className="text-gray-500 font-bold hover:text-blue-600 transition-colors"
            >
              About Us
            </a>
            <a
              href="#contact"
              className="text-gray-500 font-bold hover:text-blue-600 transition-colors"
            >
              Contact
            </a>
            <div className='flex items-center space-x-4'>
            <button href='#signup' className="bg-blue-600 font-bold text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Sign Up
            </button>
            <button className="text-blue-600 border-2 rounded-lg px-5 py-2  font-bold hover:text-blue-700 transition-colors">
              Log In
            </button>
            </div>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <a
                href="#"
                className="text-gray-700  font-bold hover:text-blue-600 transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-700  font-bold hover:text-blue-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#"
                className="text-gray-700  font-bold hover:text-blue-600 transition-colors"
              >
                About Us
              </a>
              <a
                href="#"
                className="text-gray-700  font-bold hover:text-blue-600 transition-colors"
              >
                Contact
              </a>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full">
                Sign Up
              </button>
              <button className="text-blue-600 border-2 rounded-lg px-4 py-2   hover:text-blue-700 transition-colors w-full">
                Log In
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
// export default NavBar
// import React from 'react'
