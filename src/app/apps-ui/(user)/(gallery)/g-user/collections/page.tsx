import React from 'react';
import { useAuthRedirect } from '@/services/hoc/auth';

interface CollectionProps {
  created_at: string;
  title: string;
  description: string;
  images: string[];
  artist: string;
  year: string;
}

// Explicitly typing the component as a functional component
const CollectionDisplay: React.FC<CollectionProps> = ({ created_at, title, description, images, artist, year }) => {
  useAuthRedirect(); // auth guard

  // Return early if no collection data
  if (!created_at || !title || !description || !images || !artist || !year) {
    return <div>Loading...</div>;
  }

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
};

export default CollectionDisplay;
