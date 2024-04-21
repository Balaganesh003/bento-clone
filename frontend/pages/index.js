import React from 'react';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Landing Page</h1>
      <div className="space-x-4">
        <Link
          href="/login"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Login
        </Link>
        <Link
          href="/signup"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
