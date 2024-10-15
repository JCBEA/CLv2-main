// pages/g-visitor/artwork/[id].tsx
'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaSearchPlus, FaVolumeUp, FaCube, FaPalette } from 'react-icons/fa';
import { artworksData } from '../../g-visitor-components/BrowseGallery'; // Adjust the import path as needed

const ArtworkDetailPage: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;

  const artwork = artworksData.artworks.find(art => art.id === id);

  if (!artwork) {
    return <div>Artwork not found</div>;
  }

  return (
    <div className="artwork-detail-page bg-white min-h-screen pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          {artwork.title}
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative h-96 rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src={artwork.imageSrc}
              alt={artwork.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
          </motion.div>
          <div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 mb-8"
            >
              {artwork.description}
            </motion.p>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Artwork Details</h2>
              <p className="text-gray-600">Artist: {artwork.artist.name}</p>
              <p className="text-gray-600">Year: {artwork.year}</p>
              <p className="text-gray-600">Medium: {artwork.medium}</p>
              <p className="text-gray-600">Dimensions: {artwork.dimensions}</p>
            </div>
          </div>
        </div>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Artist Biography</h2>
          <p className="text-gray-700 leading-relaxed">{artwork.artist.bio}</p>
        </section>
        {artwork.relatedWorks && artwork.relatedWorks.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Related Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {artwork.relatedWorks.map((work) => (
                <div key={work.id} className="relative overflow-hidden rounded-lg shadow-md h-48">
                  <Image
                    src={work.imageSrc}
                    alt={work.title}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                    <p className="font-semibold">{work.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ArtworkDetailPage;