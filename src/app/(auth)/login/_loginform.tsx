"use client";  // Make sure it’s a client component

import { useState } from 'react';

// Define props interface for the login form
interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  error: string | null;
}

const _LoginForm: React.FC<LoginFormProps> = ({ onSubmit, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle the form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password); // Call the onSubmit function passed from the parent
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded-md"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 border rounded-md"
        required
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
        Login
      </button>
    </form>
  );
};

export default _LoginForm;
