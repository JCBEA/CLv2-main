"use client";
import { motion } from "framer-motion";

export const CreativeDirectory = () => {
  return (
    <div className="w-full md:h-[70dvh] h-fit md:py-0 py-12 bg-shade-1 rounded-3xl">
      <div className="w-full h-full flex flex-col gap-12 md:justify-center justify-evenly md:items-start items-center md:pl-16 px-2">
        <h1 className="md:text-5xl text-3xl font-bold text-secondary-1">
          Creative Directory
        </h1>
        <p className="font-medium text-2xl w-full max-w-xs md:text-left text-center">
          Explore, connect and network with the creative minds of Legazpi City
        </p>
        <div className="md:w-fit w-full flex flex-row md:justify-center justify-evenly items-center md:gap-8 font-semibold">
          <motion.button
            className="bg-primary-2 text-secondary-1 w-32 py-2 rounded-full uppercase"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            join
          </motion.button>
          <motion.button
            className="bg-secondary-1 text-primary-2 w-32 py-2 rounded-full uppercase"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            explore
          </motion.button>
        </div>
      </div>
    </div>
  );
};
