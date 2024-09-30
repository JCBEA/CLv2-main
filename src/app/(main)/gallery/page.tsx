"use client";

import ProtectedRoute from '@/components/protectedroute';
import { useEffect, useState } from 'react';
import { fetchGalleryItems } from '@/services/galleryservice';

interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
}

const GalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getGalleryItems = async () => {
      try {
        const data = await fetchGalleryItems();
        setGalleryItems(data);
      } catch (err) {
        setError('Failed to load gallery items');
      }
    };
    getGalleryItems();
  }, []);

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Gallery</h1>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {galleryItems.map((item) => (
              <div key={item.id} className="border p-4">
                <h2 className="text-xl font-bold">{item.title}</h2>
                <img src={item.imageUrl} alt={item.title} className="w-full h-auto" />
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default GalleryPage;
