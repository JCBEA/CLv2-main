"use client"
import React from 'react';
import {useAuthRedirect} from '@/services/hoc/auth';

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

const CollectionDisplay: React.FC<CollectionProps> = ({ collection }) => {
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

// This is the page export. If this is the main page of the route, it should be the default export.
export default CollectionDisplay;
