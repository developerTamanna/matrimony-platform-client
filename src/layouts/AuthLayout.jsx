import React from 'react';
import { Outlet, Link } from 'react-router';
import authImg from '../assets/auth.jpg';
const AuthLayout = () => {
  return (
    <div className=" w-full mx-auto bg-lime-50">
      <div className=" max-w-7xl mx-auto flex flex-col md:flex-row min-h-screen">
        {/* Left Side - Form Content */}
        <div className="flex-1 flex items-center justify-center md:p-6 p-2 bg-lime-50 relative">
          {/* Back to Home Button */}
          <Link
            to="/"
            className="absolute top-4 left-4 text-sm px-4 py-2 bg-lime-300 text-gray-900 font-medium rounded-full shadow hover:bg-lime-400 transition"
          >
            ← Back to Home
          </Link>

          {/* Form Outlet */}
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="flex-1 hidden md:flex items-center justify-center bg-lime-50">
          <img
            src={authImg}
            alt="Authentication"
            className="w-full max-w-[480px] h-auto object-contain rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
