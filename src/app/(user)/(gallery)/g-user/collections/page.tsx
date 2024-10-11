'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

async function getCollections() {
  // This would be an API call in a real application
  return [
    {
      id: 1,
      title: "FLOWERS 2020",
      description: "A stunning exploration of floral beauty.",
      thumbnail: "/images/indiworks/1.png",
      slug: "flowers-2020"
    },
    {
      id: 2,
      title: "WAVES 2020",
      description: "Capturing the power and serenity of the ocean.",
      thumbnail: "/images/indiworks/2.png",
      slug: "waves-2020"
    },
    {
      id: 3,
      title: "SCULPTURE 2021",
      description: "Modern sculptural works that challenge perception.",
      thumbnail: "/images/indiworks/3.png",
      slug: "sculpture-2021"
    },
  ];
}

export default async function BrowseCollectionsPage() {
  const collections = await getCollections();

  return <CollectionsList initialCollections={collections} />;
}


type Collection = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  slug: string;
};

function CollectionsList({ initialCollections }: { initialCollections: Collection[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCollections = initialCollections.filter(collection =>
    collection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collection.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-8 text-center"
        >
          Browse All Collections
        </motion.h1>
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search collections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCollections.map((collection, index) => (
            <motion.div 
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={collection.thumbnail}
                  alt={collection.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{collection.title}</h2>
                <p className="text-gray-600 mb-4">{collection.description}</p>
                <Link href={`/g-user/collections/${collection.slug}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium transition duration-300 hover:bg-gray-800"
                  >
                    View Collection
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}