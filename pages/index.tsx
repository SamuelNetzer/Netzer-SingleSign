import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../lib/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import FirebaseStatus from '../components/FirebaseStatus';

const HomePage = () => {
  const { user, logout } = useAuth();

  const content = (
    <div className="container mx-auto p-4 max-w-5xl">
      <Head>
        <title>SSO Demo - Home</title>
        <meta name="description" content="SSO Demo with Next.js and Firebase" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex justify-between items-center mb-8 p-4 bg-white shadow-md rounded-lg border border-gray-100">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text">Firebase SSO Demo</h1>
        <div className="flex items-center gap-4">
          {user && (
            <>
              <div className="flex items-center">
                {user.photoURL && (
                  <img 
                    src={user.photoURL} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full mr-2 border border-gray-200" 
                  />
                )}
                <span className="font-medium text-gray-700">Welcome, {user.displayName}</span>
              </div>
              <Link 
                href="/admin" 
                className="text-indigo-600 hover:text-indigo-800 hover:underline font-medium transition-colors"
              >
                Admin Panel
              </Link>
              <button
                onClick={logout}
                className="btn-danger"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </header>

      <main className="space-y-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4 text-indigo-700">Protected Content</h2>
          <p className="mb-4 text-gray-700">
            This content is only visible to authenticated users. You're logged in with the email: <span className="font-medium">{user?.email}</span>
          </p>
          <div className="p-5 bg-indigo-50 rounded-lg border border-indigo-100">
            <h3 className="font-medium mb-3 text-indigo-800">Your Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col p-3 bg-white rounded-md">
                <span className="text-xs text-gray-500">Name</span>
                <span className="font-medium">{user?.displayName || 'Not provided'}</span>
              </div>
              <div className="flex flex-col p-3 bg-white rounded-md">
                <span className="text-xs text-gray-500">Email</span>
                <span className="font-medium">{user?.email || 'Not provided'}</span>
              </div>
              <div className="flex flex-col p-3 bg-white rounded-md">
                <span className="text-xs text-gray-500">User ID</span>
                <span className="font-mono text-sm">{user?.uid}</span>
              </div>
              <div className="flex flex-col p-3 bg-white rounded-md">
                <span className="text-xs text-gray-500">Email Verified</span>
                <span className="font-medium">{user?.emailVerified ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex flex-col p-3 bg-white rounded-md">
                <span className="text-xs text-gray-500">Provider</span>
                <span className="font-medium">{user?.providerData[0]?.providerId}</span>
              </div>
              <div className="flex flex-col p-3 bg-white rounded-md">
                <span className="text-xs text-gray-500">Last Sign In</span>
                <span className="font-medium">{user?.metadata?.lastSignInTime 
                  ? new Date(user.metadata.lastSignInTime).toLocaleString() 
                  : 'Unknown'
                }</span>
              </div>
            </div>
          </div>
        </div>
        
        <FirebaseStatus />
        
        <div className="card">
          <h2 className="text-xl font-semibold mb-4 text-indigo-700">Firebase Project Info</h2>
          <p className="mb-4 text-gray-700">
            This application is connected to Firebase project:
          </p>
          <div className="p-3 bg-gray-50 rounded-md font-mono text-sm border border-gray-200">
            {typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID : ''}
          </div>
        </div>
      </main>
    </div>
  );

  return <ProtectedRoute>{content}</ProtectedRoute>;
};

export default HomePage; 