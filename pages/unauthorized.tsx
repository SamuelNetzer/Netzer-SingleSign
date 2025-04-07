import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../lib/AuthContext';

const UnauthorizedPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container mx-auto p-4 max-w-5xl min-h-screen flex items-center justify-center">
      <Head>
        <title>Unauthorized Access</title>
        <meta name="description" content="Unauthorized access page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg border border-red-100">
        <div className="text-center">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          
          <div className="bg-red-50 border border-red-100 rounded-md p-4 mb-6">
            <p className="text-gray-700 mb-2">
              You don't have the required permissions to access this page.
            </p>
            <p className="text-gray-700 font-medium">
              This area is restricted to administrators only.
            </p>
          </div>
          
          <div className="flex justify-center space-x-4">
            <Link href="/" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200">
              Go to Home
            </Link>
            {user && (
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage; 