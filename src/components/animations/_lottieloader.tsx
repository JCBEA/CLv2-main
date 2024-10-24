// src/components/animations/Custom404.tsx
"use client";

import React from "react";
import Lottie from "lottie-react";
import animationData from "../../../public/load.json";

export default function Custom404() {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-white">
    <Lottie 
      animationData={animationData}
      loop
      className="w-80 h-80 md:w-96 md:h-96" // Adjust size as needed
    />
  </div>
  );
}
