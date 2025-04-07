import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/AuthContext';
import FirebaseStatus from '../components/FirebaseStatus';

const LoginPage = () => {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();

  // Redirect to home if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-blue-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text">
            Firebase SSO Demo
          </h1>
          <p className="text-gray-600">Sign in to access protected content</p>
        </div>
        
        <div className="flex justify-center mb-8">
          <button
            onClick={signInWithGoogle}
            className="flex items-center px-6 py-3 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10h-10.7v4.79h6.12c-0.26 1.41-1.06 2.61-2.27 3.42v2.84h3.68c2.15-1.98 3.39-4.9 3.39-8.05z" 
                fill="#4285F4" 
              />
              <path 
                d="M11.66 22c3.07 0 5.64-1.02 7.53-2.74l-3.68-2.84c-1.02 0.68-2.33 1.08-3.85 1.08-2.96 0-5.47-2-6.37-4.68H1.44v2.93C3.32 19.42 7.19 22 11.66 22z" 
                fill="#34A853" 
              />
              <path 
                d="M5.29 12.82c-0.23-0.68-0.36-1.4-0.36-2.15s0.13-1.47 0.36-2.15V5.6H1.44C0.52 7.48 0 9.64 0 12s0.52 4.52 1.44 6.4l3.85-2.93z" 
                fill="#FBBC05" 
              />
              <path 
                d="M11.66 5.18c1.67 0 3.17 0.57 4.35 1.7l3.27-3.27C17.29 1.71 14.72 0.69 11.66 0.69 7.19 0.69 3.32 3.27 1.44 7l3.85 2.93c0.9-2.68 3.41-4.75 6.37-4.75z" 
                fill="#EA4335" 
              />
            </svg>
            Sign in with Google
          </button>
        </div>
        
        <FirebaseStatus />
      </div>
    </div>
  );
};

export default LoginPage; 