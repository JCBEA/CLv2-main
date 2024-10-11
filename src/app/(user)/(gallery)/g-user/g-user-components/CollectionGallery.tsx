'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const collections = [
  {
    id: 1,
    title: "FLOWERS 2020",
    description: "Her serene expression, framed by delicate petals in shades of pink, violet, and gold, contrasts within the soft, muted background, drawing attention to her radiant presence.",
    img: "/images/indiworks/1.png",
    slug: "flowers-2020"
  },
  {
    id: 2,
    title: "WAVES 2020",
    description: "A powerful depiction of the sea's strength and beauty, this artwork captures the raw energy of nature. The waves crashing onto the shore symbolize life's ups and downs.",
    img: "/images/indiworks/2.png",
    slug: "waves-2020"
  },
  {
    id: 3,
    title: "SCULPTURE 2021",
    description: "This sculpture evokes feelings of contemplation and solitude. The intricate details highlight the craftsmanship, while the muted background focuses on the artwork's depth.",
    img: "/images/indiworks/3.png",
    slug: "sculpture-2021"
  },
];

export default function CollectionsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % collections.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + collections.length) % collections.length);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-gray-900 mb-2 text-center"
        >
          YOUR COLLECTIONS
        </motion.h2>
        <motion.hr 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.5 }}
          className="border-t-2 border-gray-300 w-24 mx-auto mb-12"
        />
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="h-[500px] md:h-[600px]">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute top-0 left-0 w-full h-full flex flex-col md:flex-row"
              >
                <div className="w-full md:w-1/2 h-64 md:h-full relative">
                  <Image
                    src={collections[currentIndex].img}
                    alt={collections[currentIndex].title}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30" />
                </div>
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-3xl font-bold text-gray-900 mb-4"
                  >
                    {collections[currentIndex].title}
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-gray-600 mb-8 leading-relaxed"
                  >
                    {collections[currentIndex].description}
                  </motion.p>
                  <Link href={`/g-user/collections/${collections[currentIndex].slug}`}>
                    <motion.button
                      whileHover={{ scale: 1.05, backgroundColor: "#1a202c" }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-900 text-white px-8 py-3 rounded-full text-lg font-medium transition duration-300 ease-in-out transform hover:shadow-lg"
                    >
                      View This Collection
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            aria-label="Previous collection"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition duration-300 z-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            aria-label="Next collection"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="mt-12 text-center">
          <Link href="/g-user/collections">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#4a5568" }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-700 text-white px-10 py-4 rounded-full text-lg font-medium transition duration-300 ease-in-out transform hover:shadow-xl"
            >
              BROWSE ALL COLLECTIONS
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
}