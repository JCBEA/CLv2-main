"use client";

import { useEffect, useState } from 'react';
import { fetchCreatives } from '@/services/creativeservice';

interface Creative {
  id: string;
  name: string;
  skill: string;
  bio: string;
}

const DirectoryPage = () => {
  const [creatives, setCreatives] = useState<Creative[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCreatives = async () => {
      try {
        const data = await fetchCreatives();
        setCreatives(data);
      } catch (err) {
        setError('Failed to load creatives.');
      }
    };

    getCreatives();
  }, []);

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Directory of Creatives</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {creatives.map((creative) => (
          <div key={creative.id} className="p-4 border rounded-md shadow-sm">
            <h2 className="text-2xl font-semibold">{creative.name}</h2>
            <p className="text-lg">{creative.skill}</p>
            <p className="text-sm text-gray-600">{creative.bio}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default DirectoryPage;
