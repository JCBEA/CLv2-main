"use client"; // This tells Next.js that this component is a client-side component

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface CollectionProps {
  collection: {
    images: {
      image_path: string;
      title: string;
      desc: string;
      artist: string;
      year: string;
    }[];
  };
}

const CollectionDisplay: React.FC<CollectionProps> = ({ collection }) => {
  const [selectedImage, setSelectedImage] = useState(collection.images[0]);

  const handleImageClick = (image: typeof selectedImage) => {
    setSelectedImage(image);
  };

  return (
    <div className="bg-white min-h-screen pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          {selectedImage.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 mb-8"
        >
          {selectedImage.desc}
        </motion.p>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {collection.images.map((image, index) => (
            <motion.div
              key={`${image.image_path}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative h-64 rounded-lg overflow-hidden shadow-lg cursor-pointer"
              onClick={() => handleImageClick(image)}
            >
              <Image
                src={image.image_path}
                alt={`Image ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
                className="transition-transform duration-300 hover:scale-105"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  opacity: 1,
                }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-0 w-full h-full bg-black flex justify-center items-center gap-8"
              >
                <motion.button
                  initial={{ backgroundColor: "#FFD094", color: "#403737" }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#403737",
                    color: "white",
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="w-32 py-2 rounded-full"
                >
                  Edit
                </motion.button>
                <motion.button
                  initial={{ backgroundColor: "#FFD094", color: "#403737" }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#403737",
                    color: "white",
                  }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="w-32 py-2 rounded-full"
                >
                  Delete
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Collection Details */}
        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Collection Details
          </h2>
          <p className="text-gray-600">
            <strong>Artist:</strong> {selectedImage.artist}
          </p>
          <p className="text-gray-600">
            <strong>Year:</strong> {selectedImage.year}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CollectionDisplay;
