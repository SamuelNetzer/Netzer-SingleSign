import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../lib/AuthContext';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';

type AdminRouteProps = {
  children: React.ReactNode;
};

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        setCheckingRole(false);
        return;
      }

      try {
        // Check if user has admin role in Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
        setIsAdmin(userData?.role === 'admin');
      } catch (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
      } finally {
        setCheckingRole(false);
      }
    };

    if (!loading) {
      checkAdminRole();
    }
  }, [user, loading]);

  // Redirect non-authenticated or non-admin users
  useEffect(() => {
    if (!loading && !checkingRole) {
      if (!user) {
        router.push('/login');
      } else if (!isAdmin) {
        router.push('/unauthorized');
      }
    }
  }, [user, loading, checkingRole, isAdmin, router]);

  // Show loading state while checking user role
  if (loading || checkingRole) {
    return <div>Loading...</div>;
  }

  return (isAdmin && user) ? <>{children}</> : null;
};

export default AdminRoute; 