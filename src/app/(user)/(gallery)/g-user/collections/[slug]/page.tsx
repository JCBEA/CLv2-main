
'use client';

import { motion } from 'framer-motion';

import { notFound } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

async function getCollection(slug: string) {
  // This would be an API call in a real application
  const collections = {
    "flowers-2020": {
      title: "FLOWERS 2020",
      description: "A stunning collection that explores the delicate beauty of flowers. Each piece in this series captures the essence of nature's most exquisite creations, from vibrant roses to subtle daisies.",
      images: ["/images/indiworks/1.png", "/images/indiworks/2.png", "/images/indiworks/3.png"],
      artist: "Jane Doe",
      year: "2020",
    },
    "waves-2020": {
      title: "WAVES 2020",
      description: "A powerful depiction of the sea's strength and beauty, this collection captures the raw energy of nature. The waves crashing onto the shore symbolize life's ups and downs, while the serene horizons evoke a sense of calm and reflection.",
      images: ["/images/indiworks/2.png", "/images/indiworks/3.png", "/images/indiworks/1.png"],
      artist: "John Smith",
      year: "2020",
    },
    "sculpture-2021": {
      title: "SCULPTURE 2021",
      description: "This sculpture collection evokes feelings of contemplation and solitude. The intricate details highlight the craftsmanship, while the varied forms and materials challenge perceptions and invite deep reflection.",
      images: ["/images/indiworks/3.png", "/images/indiworks/1.png", "/images/indiworks/2.png"],
      artist: "Alex Johnson",
      year: "2021",
    },
  };

  return collections[slug as keyof typeof collections] || null;
}

export default async function ViewCollectionPage({ params }: { params: { slug: string } }) {
  const collection = await getCollection(params.slug);

  if (!collection) {
    notFound();
  }

  return <CollectionDisplay collection={collection} />;
}

type CollectionType = {
  title: string;
  description: string;
  images: string[];
  artist: string;
  year: string;
};

function CollectionDisplay({ collection }: { collection: CollectionType }) {
  return (
    <div className="bg-white min-h-screen pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          {collection.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 mb-8"
        >
          {collection.description}
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {collection.images.map((img, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative h-64 rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src={img}
                alt={`${collection.title} - Image ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-300 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Collection Details</h2>
          <p className="text-gray-600">Artist: {collection.artist}</p>
          <p className="text-gray-600">Year: {collection.year}</p>
        </div>
        <Link href="/g-user/collections">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-900 text-white px-6 py-3 rounded-full text-lg font-medium transition duration-300 hover:bg-gray-800"
          >
            Back to All Collections
          </motion.button>
        </Link>
      </div>
    </div>
  );
}