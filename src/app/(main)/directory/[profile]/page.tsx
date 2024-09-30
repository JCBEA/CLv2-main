"use client";

import { useEffect, useState } from 'react';
import { fetchCreatives } from '@/services/creativeservice';

interface Creative {
  id: string;
  name: string;
  skill: string;
  bio: string;
}

interface ProfilePageProps {
  params: {
    profile: string;
  };
}

const ProfilePage = ({ params }: ProfilePageProps) => {
  const [creative, setCreative] = useState<Creative | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { profile } = params;

  useEffect(() => {
    const getCreative = async () => {
      try {
        const data = await fetchCreatives();
        const foundCreative = data.find((c: Creative) => c.id === profile);
        setCreative(foundCreative || null);
      } catch (err) {
        setError('Failed to load profile.');
      }
    };

    if (profile) {
      getCreative();
    }
  }, [profile]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!creative) {
    return <p>Loading...</p>;
  }

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">{creative.name}</h1>
      <p className="text-xl">{creative.skill}</p>
      <p className="mt-2">{creative.bio}</p>
    </main>
  );
};

export default ProfilePage;
