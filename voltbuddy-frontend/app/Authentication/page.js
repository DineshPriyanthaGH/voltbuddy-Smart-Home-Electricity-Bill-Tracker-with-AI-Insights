import React from 'react';
import { LoginForm } from './components/LoginForm';

export default function AuthenticationPage() {
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-12">
      {/* Left side - Full Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center h-64 md:h-auto mb-6 md:mb-0">
        <div className="relative w-full h-full">
          <img
            src="https://img.freepik.com/premium-vector/pay-electricity-using-mobile-application-tiny-people-holding-light-bulb-phone_1135642-371.jpg"
            alt="Person writing on board"
            className="w-full h-full object-cover rounded-3xl shadow-2xl"
            style={{ objectPosition: 'center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl"></div>
        </div>
      </div>

      {/* Right side - Login Form Card */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-6">
        <div className="w-full max-w-md bg-white/70 backdrop-blur-sm border border-white/30 rounded-3xl shadow-2xl p-8 md:p-10 hover:shadow-3xl transition-all duration-300">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
