"use client";

import { useState } from 'react';
import { useAuth } from '@/context/authcontext'; // Import useAuth hook
import _LoginForm from './_loginform';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { login } = useAuth(); // Use login function from context
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  // Handle login submission
  const handleLogin = (email: string, password: string) => {
    // Mock login validation
    if (email === 'test@example.com' && password === 'password') {
      login({ id: '1', name: 'John Doe', email }); // Update global user state
      router.push('/dashboard'); // Redirect to dashboard page after login
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <main className="container mx-auto p-8 max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Login to Creative Legazpi</h1>
      <_LoginForm onSubmit={handleLogin} error={error} />
    </main>
  );
};

export default LoginPage;
