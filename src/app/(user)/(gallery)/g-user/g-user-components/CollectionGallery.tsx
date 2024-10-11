'use client'

import { useState } from "react";
import Image from "next/image";

export default function CollectionCarousel() {
  const collections = [
    {
      id: 1,
      title: "FLOWERS 2020",
      description:
        "Her serene expression, framed by delicate petals in shades of pink, violet, and gold, contrasts within the soft, muted background, drawing attention to her radiant presence. The intricate details of the flowers symbolize nature's harmony, while her gentle gaze exudes a sense of innocence and quiet strength.",
      img: "/images/indiworks/1.png",
    },
    {
      id: 2,
      title: "WAVES 2020",
      description:
        "A powerful depiction of the sea's strength and beauty, this artwork captures the raw energy of nature. The waves crashing onto the shore symbolize life's ups and downs, while the serene background evokes calmness and reflection.",
      img: "/images/indiworks/2.png",
    },
    {
      id: 3,
      title: "SCULPTURE 2021",
      description:
        "This sculpture evokes feelings of contemplation and solitude. The intricate details highlight the craftsmanship, while the muted background focuses the attention on the artwork's depth and emotion.",
      img: "/images/indiworks/3.png",
    },
  ];

  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((current + 1) % collections.length);
  };

  const handlePrevious = () => {
    setCurrent((current - 1 + collections.length) % collections.length);
  };

  return (
    <div className="bg-white p-8 mt-12">
      <h2 className="text-2xl font-bold mb-4">YOUR COLLECTIONS</h2>
      <hr className="border-gray-400 mb-6" />

      {/* Carousel Section */}
      <div className="flex items-center justify-center">
        {/* Previous Button */}
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-l-md"
          onClick={handlePrevious}
        >
          &#8592;
        </button>

        {/* Image and Text */}
        <div className="flex items-center space-x-8">
          {/* Image */}
          <div className="w-80">
            <Image
              src={collections[current].img}
              alt={collections[current].title}
              width={320}
              height={240}
              className="object-cover w-full h-auto"
            />
          </div>

          {/* Text */}
          <div className="max-w-md">
            <h3 className="font-bold text-xl">{collections[current].title}</h3>
            <p className="text-sm mt-2">{collections[current].description}</p>
          </div>
        </div>

        {/* Next Button */}
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-r-md"
          onClick={handleNext}
        >
          &#8594;
        </button>
      </div>

      <div className="mt-8 text-center">
        <button className="bg-black text-white px-6 py-2 rounded">
          BROWSE
        </button>
      </div>
    </div>
  );
}
