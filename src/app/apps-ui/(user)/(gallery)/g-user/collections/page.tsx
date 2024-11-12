"use client"
import React from 'react';
import { useAuthRedirect } from '@/services/hoc/auth';

interface CollectionProps {
  collection: {
    created_at: string;
    title: string;
    description: string;
    images: string[];
    artist: string;
    year: string;
  };
}

export default function CollectionDisplay({ collection }: CollectionProps) {
  useAuthRedirect(); // auth guard

  // Return early if no collection
  if (!collection) {
    return <div>Loading...</div>; // Or handle this case however you'd like
  }

  const { title, description, images, artist, year } = collection;

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <p><strong>Artist:</strong> {artist}</p>
      <p><strong>Year:</strong> {year}</p>

      <div className="image-gallery">
        {images.map((image, index) => (
          <img key={`${image}-${artist}-${index}`} src={image} alt={`Image ${index + 1}`} />
        ))}
      </div>
    </div>
  );
}

// Ensure this component is exported as the default export.

