"use client";
import { motion } from "framer-motion";
import Image from 'next/image';

export const GallerySection = () => {
  const images = [
    "/images/landing-page/pader.png",
    "/images/landing-page/turog.png",
    "/images/landing-page/eabab.png",
  ];

  return (
    <div className="w-full min-h-screen bg-primary-1 flex flex-col gap-8 items-center justify-evenly p-8 pt-[10dvh]">
      <h1 className="md:text-5xl text-3xl font-extrabold md:text-left text-center">EXPLORE OUR GALLERY</h1>
      <div className="w-full flex md:flex-row flex-col gap-4 h-full justify-evenly items-center">
        {images.map((src, index) => (
          <motion.div
            key={src}
            className={`relative p-8 h-72 ${index === 0 ? 'w-full md:max-w-xl md:h-96' : 'w-full md:max-w-sm md:h-72'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Image
              src={src}
              alt={`Gallery image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        ))}
      </div>

      <motion.button
        className="max-w-60 w-full py-3 bg-white text-gray-800 rounded-full font-semibold shadow-md"
        whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
        whileTap={{ scale: 0.95 }}
      >
        LEARN MORE
      </motion.button>
    </div>
  );
};