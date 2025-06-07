import React from 'react';

const Unauthorized: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">401 - Unauthorized Access</h1>
      <p className="text-gray-600 mb-8">You do not have permission to access this page.</p>
      <a 
        href="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Return Home
      </a>
    </div>
  );
};

export default Unauthorized;
