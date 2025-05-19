"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image
              src="/images/logo.png"
              alt="VoltBuddy Logo"
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <span className="text-xl font-bold text-blue-600">VOLTBUDDY</span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/dashboard"
              className={`flex items-center px-2 py-1 rounded-md ${
                pathname === "/dashboard"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Dashboard
            </Link>

            <Link
              href="/bill-history"
              className={`flex items-center px-2 py-1 rounded-md ${
                pathname === "/bill-history"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Bill History
            </Link>

            <Link
              href="/settings"
              className={`flex items-center px-2 py-1 rounded-md ${
                pathname === "/settings"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Settings
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          {/* Desktop Profile */}
          <div className="relative hidden md:flex items-center space-x-2">
            <Link href="/profile" className="relative group">
              <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-900 ring-2 ring-transparent group-hover:ring-blue-600 transition">
                <Image
                  src="/images/profileimg.jpg"
                  alt="User profile"
                  width={40}
                  height={40}
                  className="object-cover rounded-full"
                />
              </div>
            </Link>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              aria-haspopup="true"
              aria-expanded={profileDropdownOpen}
              className="focus:outline-none"
            >
              <svg
                className="h-4 w-4 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-md shadow-lg py-1 z-20">
                <Link
                  href="/notifications"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                >
                  Notifications
                </Link>
                <button
                  onClick={() => alert("Logout clicked")}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 pb-4 space-y-2 border-t pt-4">
            <Link
              href="/dashboard"
              className={`block px-4 py-2 rounded-md ${
                pathname === "/dashboard"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/bill-history"
              className={`block px-4 py-2 rounded-md ${
                pathname === "/bill-history"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              Bill History
            </Link>
            <Link
              href="/settings"
              className={`block px-4 py-2 rounded-md ${
                pathname === "/settings"
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              Settings
            </Link>

            {/* Profile Section (Mobile) */}
            <div className="px-4 pt-2 border-t">
              <div className="flex items-center space-x-2">
                <Link href="/profile">
                  <div className="h-10 w-10 rounded-full overflow-hidden  bg-gray-900 ring-2 ring-transparent hover:ring-blue-600">
                    <Image
                      src="/images/profileimg.jpg"
                      alt="User profile"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                </Link>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={profileDropdownOpen}
                >
                  <svg
                    className="h-4 w-4 text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              {profileDropdownOpen && (
                <div className="mt-2 space-y-2">
                  <Link
                    href="/notifications"
                    className="block px-2 py-1 text-gray-700 rounded-md hover:bg-gray-100 hover:text-blue-600"
                  >
                    Notifications
                  </Link>
                  <button
                    onClick={() => alert("Logout clicked")}
                    className="block w-full text-left px-2 py-1 text-gray-700 rounded-md hover:bg-gray-100 hover:text-blue-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

