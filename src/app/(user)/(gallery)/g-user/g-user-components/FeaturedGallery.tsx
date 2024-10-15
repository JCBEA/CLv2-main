'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const featuredItems = [
  {
    id: 1,
    title: "flower-2020",
    description: "Her serene expression, framed by delicate petals, creates an effect of quiet beauty.",
    img: "/images/indiworks/1.png",
    artist: "Jane Doe",
  },
  {
    id: 2,
    title: "WAVES 2020",
    description: "A powerful depiction of the sea's strength and beauty, capturing the raw energy of nature.",
    img: "/images/indiworks/2.png",
    artist: "John Smith",
  },
  {
    id: 3,
    title: "SCULPTURE 2021",
    description: "This sculpture evokes feelings of contemplation and solitude, highlighting intricate craftsmanship.",
    img: "/images/indiworks/3.png",
    artist: "Alex Johnson",
  },
];

export default function FeaturedCollections() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Collections</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Showcasing your most exceptional artworks
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64">
                <Image
                  src={item.img}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-300">by {item.artist}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{item.description}</p>
                <Link href={`/g-user/collections/${item.title}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition duration-300 text-sm font-medium"
                  >
                    View Collection
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/g-user/publish">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-700 transition duration-300 shadow-lg"
            >
              ADD MORE FEATURED COLLECTIONS
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}