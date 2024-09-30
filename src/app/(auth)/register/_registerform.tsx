// app/(auth)/register/_RegisterForm.tsx

"use client";  // Client Component

import { useState } from 'react';

const _RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState<string | null>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock registration logic for demo purposes
    setSuccess('Registration successful. Please log in.');
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4">
      {success && <p className="text-green-500">{success}</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border rounded-md"
        required
      />
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
        Register
      </button>
    </form>
  );
};

export default _RegisterForm;
