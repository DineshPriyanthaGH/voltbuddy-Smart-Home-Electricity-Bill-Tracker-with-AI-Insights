import React from 'react';
import  {LoginForm}  from './components/LoginForm';

export default function AuthenticationPage() {
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-50 p-4 md:p-12">
      {/* Left side - Image Card */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="w-full max-w-md rounded-xl border-2 border-gray-300 overflow-hidden shadow-lg">
          <img
            src="https://media.istockphoto.com/id/1406279390/ja/%E3%83%99%E3%82%AF%E3%82%BF%E3%83%BC/%E3%83%A6%E3%83%BC%E3%83%86%E3%82%A3%E3%83%AA%E3%83%86%E3%82%A3%E3%81%AE%E6%A6%82%E5%BF%B5.jpg?s=612x612&w=0&k=20&c=LZCSHfML73zcMEZUGfZLIkQa7JY-QfKx3pvKT4jT2v0="
            alt="Person writing on board"
            className="w-full h-full object-cover"
            style={{ aspectRatio: '4 / 5' }}
          />
        </div>
      </div>

      {/* Right side - Login Form Card */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
