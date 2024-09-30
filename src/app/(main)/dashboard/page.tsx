"use client";

import { useAuth } from '@/context/authcontext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const DashboardPage = () => {
  const { user } = useAuth(); // Access the logged-in user
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if no user is found
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    // While redirecting, return null or a loader component
    return null;
  }

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to Your Dashboard, {user.name}</h1>
      <p className="text-lg mb-8">Email: {user.email}</p>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Your Recent Activity</h2>
        {/* Mock data for user activity */}
        <ul className="list-disc pl-5">
          <li>Submitted a new creative project.</li>
          <li>Updated profile information.</li>
          <li>Viewed the gallery section.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Quick Actions</h2>
        <div className="flex gap-4">
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500">
            Edit Profile
          </button>
          <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500">
            Submit New Project
          </button>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
