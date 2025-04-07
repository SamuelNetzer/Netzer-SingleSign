import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../lib/AuthContext';
import AdminRoute from '../components/AdminRoute';
import FirebaseStatus from '../components/FirebaseStatus';

const AdminPage = () => {
  const { user, logout } = useAuth();

  const content = (
    <div className="container mx-auto p-4 max-w-5xl">
      <Head>
        <title>SSO Demo - Admin Panel</title>
        <meta name="description" content="Admin panel for SSO Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex justify-between items-center mb-8 p-4 bg-white shadow-md rounded-lg border border-gray-100">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">Admin Panel</h1>
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
                <span className="font-medium text-gray-700">Admin: {user.displayName}</span>
              </div>
              <Link 
                href="/" 
                className="text-indigo-600 hover:text-indigo-800 hover:underline font-medium transition-colors"
              >
                Home
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
          <h2 className="text-xl font-semibold mb-4 text-purple-700">Admin Dashboard</h2>
          <p className="mb-6 text-gray-700">
            This page is only accessible to users with the admin role. Regular users will be redirected.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 bg-blue-50 rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-medium text-blue-800">User Management</h3>
              </div>
              <p className="text-blue-700 text-sm">Manage user accounts and permissions</p>
            </div>
            
            <div className="p-5 bg-green-50 rounded-lg border border-green-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="font-medium text-green-800">Content Management</h3>
              </div>
              <p className="text-green-700 text-sm">Manage website content and settings</p>
            </div>
            
            <div className="p-5 bg-amber-50 rounded-lg border border-amber-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-medium text-amber-800">Analytics</h3>
              </div>
              <p className="text-amber-700 text-sm">View site traffic and user engagement</p>
            </div>
            
            <div className="p-5 bg-purple-50 rounded-lg border border-purple-100 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-purple-800">System Settings</h3>
              </div>
              <p className="text-purple-700 text-sm">Configure system-wide settings</p>
            </div>
          </div>
        </div>
        
        <FirebaseStatus />
      </main>
    </div>
  );

  return <AdminRoute>{content}</AdminRoute>;
};

export default AdminPage; 