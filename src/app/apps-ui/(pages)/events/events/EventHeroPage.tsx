"use client";

import { SubscribeInsights } from "@/components/reusable-component/Subscribe";
import { motion } from "framer-motion";

export const EventHeroPage = () => {
  return (
    <div className="relative w-full h-dvh bg-[url('/images/events/hero.jpg')] bg-cover bg-no-repeat bg-[50%_45%]">
      {/* Black overlay with 20% opacity */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/*  Contents of the page here */}
      <div className="relative z-10 w-full h-full pt-[10dvh] ">
        <div className="w-full h-full flex flex-col justify-evenly items-start">
          <div className="w-full h-fit flex flex-col justify-center items-start gap-6 max-w-[90%] mx-auto">
            <motion.h1
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-white font-bold lg:text-7xl md:text-6xl text-[50px] w-full max-w-32 md:text-left text-center leading-none"
            >
              Mukna Launching
            </motion.h1>
            <HeroButton />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full max-w-[90%] mx-auto"
          >
            <SubscribeInsights
              textColor="text-secondary-1"
              bgColor="bg-transparent"
              placeHolder="Enter your email"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const HeroButton = () => {
  return (
    <motion.button
      initial={{ opacity: 0, x: "-100%" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="w-fit px-8 py-2 bg-transparent text-secondary-1 text-xl uppercase border-[3px] border-secondary-1"
    >
      {/* this must be dynamic date for button name palitan nalang */}
      September 07, 2024
    </motion.button>
  );
};
