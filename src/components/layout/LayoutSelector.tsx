// src/components/LayoutSelector.tsx
'use client'

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import AuthLayout from '@/app/(pages)/layout';
import DashboardLayout from '@/app/(user)/layout';

export const LayoutSelector = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  return user ? (
    <DashboardLayout>{children}</DashboardLayout>
  ) : (
    <AuthLayout>{children}</AuthLayout>
  );
};