// src/components/LayoutSelector.tsx
'use client'

import React from 'react';
import AuthLayout from '@/app/(pages)/layout';
import DashboardLayout from '@/app/(user)/layout';
import { useAuth } from '@/context/authcontext';

export const LayoutSelector = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  return user ? (
    <DashboardLayout>{children}</DashboardLayout>
  ) : (
    <AuthLayout>{children}</AuthLayout>
  );
};