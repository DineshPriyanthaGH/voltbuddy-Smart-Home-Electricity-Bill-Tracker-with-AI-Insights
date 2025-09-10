"use client";

import React, { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="fixed w-full bg-white/70 backdrop-blur-xl shadow-lg shadow-blue-100/25 z-50 border-b border-white/20">
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-3">
            <div className="relative">
              <img
                src="./images/logo.png"
                alt="VoltBuddy Logo"
                className="h-15 w-15"
              />
              <div className="absolute inset-0  blur-lg"></div>
            </div>
            <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
              VOLTBUDDY
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            <a
              href="#home"
              className="text-gray-700 font-semibold hover:text-blue-600 transition-all duration-300 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#demo"
              className="text-gray-700 font-semibold hover:text-blue-600 transition-all duration-300 relative group"
            >
              Demo
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#FeaturesSection"
              className="text-gray-700 font-semibold hover:text-blue-600 transition-all duration-300 relative group"
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#about"
              className="text-gray-700 font-semibold hover:text-blue-600 transition-all duration-300 relative group"
            >
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="#contact"
              className="text-gray-700 font-semibold hover:text-blue-600 transition-all duration-300 relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </a>

            <div className="flex items-center space-x-4">
              <Link href="/Authentication" passHref>
                <button className="bg-white/70 backdrop-blur-sm cursor-pointer text-blue-600 font-bold px-6 py-2.5 rounded-xl hover:bg-white hover:shadow-lg shadow-blue-100/50 transition-all duration-300 border border-blue-200/50">
                  Log In
                </button>
              </Link>
              <Link href="/Authentication" passHref>
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 cursor-pointer hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none p-2 rounded-xl bg-white/50 backdrop-blur-sm"
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
          <div className="md:hidden py-6 bg-white/90 backdrop-blur-xl rounded-2xl mt-2 shadow-xl shadow-blue-100/25 border border-white/20">
            <div className="flex flex-col space-y-4 px-4">
              <a
                href="#home"
                className="text-gray-700 font-semibold hover:text-blue-600 transition-colors py-2 px-4 rounded-xl hover:bg-blue-50"
              >
                Home
              </a>
              <a
                href="#demo"
                className="text-gray-700 font-semibold hover:text-blue-600 transition-colors py-2 px-4 rounded-xl hover:bg-blue-50"
              >
                Demo
              </a>
              <a
                href="#FeaturesSection"
                className="text-gray-700 font-semibold hover:text-blue-600 transition-colors py-2 px-4 rounded-xl hover:bg-blue-50"
              >
                Features
              </a>
              <a
                href="#about"
                className="text-gray-700 font-semibold hover:text-blue-600 transition-colors py-2 px-4 rounded-xl hover:bg-blue-50"
              >
                About Us
              </a>
              <a
                href="#contact"
                className="text-gray-700 font-semibold hover:text-blue-600 transition-colors py-2 px-4 rounded-xl hover:bg-blue-50"
              >
                Contact
              </a>
              
              <div className="pt-4 space-y-3">
                <Link href="/Authentication" passHref>
                  <button className="w-full bg-white/70 backdrop-blur-sm text-blue-600 font-bold px-6 py-3 rounded-xl hover:bg-white hover:shadow-lg shadow-blue-100/50 transition-all duration-300 border border-blue-200/50">
                    Log In
                  </button>
                </Link>
                <Link href="/Authentication" passHref>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
