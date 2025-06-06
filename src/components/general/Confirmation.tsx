import React from 'react';

const Confirmation: React.FC = () => {
    
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Check Your Email</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        We've sent a confirmation link to your email address. Please check your inbox and click the link to verify your account.
      </p>
      <p className="text-sm text-gray-500">
        If you don't see the email, please check your spam folder.
      </p>
      <a 
        href="/login"
        className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Return to Login
      </a>
    </div>
  );
};

export default Confirmation;
