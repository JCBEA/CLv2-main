import React from 'react';

interface CollectionProps {
  collection: {
    title: string;
    description: string;
    images: string[];
    artist: string;
    year: string;
  };
}

const CollectionDisplay: React.FC<CollectionProps> = ({ collection }) => {
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
};

export default CollectionDisplay;
