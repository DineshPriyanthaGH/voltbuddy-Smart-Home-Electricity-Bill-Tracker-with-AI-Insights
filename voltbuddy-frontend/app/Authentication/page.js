import React from 'react';
import { LoginForm } from './components/LoginForm';

export default function AuthenticationPage() {
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-50 p-4 md:p-12">
      {/* Left side - Full Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center h-64 md:h-auto mb-6 md:mb-0">
        <img
          src="https://img.freepik.com/premium-vector/pay-electricity-using-mobile-application-tiny-people-holding-light-bulb-phone_1135642-371.jpg"
          alt="Person writing on board"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center' }}
        />
      </div>

      {/* Right side - Login Form Card */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 md:p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
