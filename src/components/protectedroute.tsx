"use client";

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authcontext';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null; // or a loading spinner while redirecting
  }

  return <>{children}</>;
};

export default ProtectedRoute;
