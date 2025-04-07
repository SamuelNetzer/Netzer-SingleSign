import React, { useEffect, useState } from 'react';
import { getApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const FirebaseStatus = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Check if Firebase is initialized
      const app = getApp();
      const auth = getAuth(app);
      
      // Check if Firebase Auth is working
      const unsubscribe = onAuthStateChanged(
        auth,
        () => {
          setStatus('connected');
        },
        (error: Error) => {
          setStatus('error');
          setError(error.message);
        }
      );
      
      return () => unsubscribe();
    } catch (err: any) {
      setStatus('error');
      setError(err.message);
    }
  }, []);

  const getStatusClasses = () => {
    if (status === 'connected') return 'status-card status-success';
    if (status === 'error') return 'status-card status-error';
    return 'status-card status-warning';
  };

  const getStatusIcon = () => {
    if (status === 'connected') return '✅';
    if (status === 'error') return '❌';
    return '⏳';
  };

  return (
    <div className={`mt-6 ${getStatusClasses()}`}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Firebase Status</h2>
        <span className="text-lg">{getStatusIcon()}</span>
      </div>
      
      {status === 'checking' && (
        <p className="text-yellow-700 text-sm mb-2">Checking Firebase connection...</p>
      )}
      
      {status === 'connected' && (
        <p className="text-green-700 text-sm mb-2">Connected to Firebase successfully!</p>
      )}
      
      {status === 'error' && (
        <div className="mb-2">
          <p className="text-red-700 text-sm font-medium">Error connecting to Firebase</p>
          {error && <p className="text-sm mt-1 text-red-600">{error}</p>}
        </div>
      )}
      
      <div className="mt-3 grid grid-cols-1 gap-2 p-3 bg-white rounded-md border border-gray-200">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Project ID</span>
          <span className="font-mono text-sm text-gray-800">{typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID : ''}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Auth Domain</span>
          <span className="font-mono text-sm text-gray-800">{typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN : ''}</span>
        </div>
      </div>
    </div>
  );
};

export default FirebaseStatus; 