"use client";  // This tells Next.js that this component is a client-side component

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
    <div className="bg-white min-h-screen pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          {title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 mb-8"
        >
          {description}
        </motion.p>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {images.map((image, index) => (
            <motion.div 
            key={`${title}-${artist}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative h-64 rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src={image}
                alt={`Image ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-300 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>

        {/* Collection Details */}
        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Collection Details</h2>
          <p className="text-gray-600"><strong>Artist:</strong> {artist}</p>
          <p className="text-gray-600"><strong>Year:</strong> {year}</p>
        </div>
      </div>
    </div>
  );
};

export default CollectionDisplay;
