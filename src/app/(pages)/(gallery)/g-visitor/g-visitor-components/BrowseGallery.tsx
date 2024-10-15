'use client';

import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Inline JSON data
export const artworksData = {
  artworks: [
    {
      id: "1",
      imageSrc: "/images/indiworks/1.png",
      title: "FLOWERS",
      year: "2020",
      description: "Her serene expression, framed by delicate petals in shades of pink, violet, and gold, contrasts with the soft, muted background, drawing attention to her radiant presence. The intricate details of the flowers symbolize nature's harmony, while her gentle gaze evokes a sense of innocence and quiet strength.",
      artist: {
        name: "Jane Doe",
        bio: "Jane Doe is a contemporary artist known for her vibrant floral portraits that blend realism with a touch of fantasy."
      },
      medium: "Oil on canvas",
      dimensions: "100 x 80 cm",
      relatedWorks: [
        { id: "2", title: "NATURE", imageSrc: "/images/indiworks/2.png" },
        { id: "3", title: "ABSTRACT", imageSrc: "/images/indiworks/3.png" }
      ]
    },
    {
      id: "2",
      imageSrc: "/images/indiworks/2.png",
      title: "NATURE",
      year: "2021",
      description: "A lush landscape portraying the vibrant colors of autumn, with golden leaves cascading from towering trees. The scene captures the essence of change and the beauty of seasonal transitions.",
      artist: {
        name: "John Smith",
        bio: "John Smith is a landscape artist known for his captivating depictions of natural scenes."
      },
      medium: "Acrylic on canvas",
      dimensions: "120 x 90 cm",
      relatedWorks: [
        { id: "1", title: "FLOWERS", imageSrc: "/images/indiworks/1.png" },
        { id: "4", title: "PORTRAIT", imageSrc: "/images/indiworks/4.png" }
      ]
    },
    {
      id: "3",
      imageSrc: "/images/indiworks/3.png",
      title: "ABSTRACT",
      year: "2022",
      description: "A bold composition of geometric shapes and vivid colors, creating a dynamic interplay of form and hue. This piece challenges perceptions and invites viewers to explore their own interpretations.",
      artist: {
        name: "Alice Johnson",
        bio: "Alice Johnson is an abstract artist known for her bold use of color and shape."
      },
      medium: "Mixed media on canvas",
      dimensions: "150 x 100 cm",
      relatedWorks: [
        { id: "1", title: "FLOWERS", imageSrc: "/images/indiworks/1.png" },
        { id: "4", title: "PORTRAIT", imageSrc: "/images/indiworks/4.png" }
      ]
    },
    {
      id: "4",
      imageSrc: "/images/indiworks/4.png",
      title: "PORTRAIT",
      year: "2023",
      description: "An intimate portrait capturing the essence of human emotion, with piercing eyes that seem to look directly into the viewer's soul. The play of light and shadow accentuates the subject's features, creating a powerful and memorable image.",
      artist: {
        name: "Robert Lee",
        bio: "Robert Lee is a portrait artist renowned for his ability to capture the essence of his subjects."
      },
      medium: "Oil on canvas",
      dimensions: "90 x 70 cm",
      relatedWorks: [
        { id: "2", title: "NATURE", imageSrc: "/images/indiworks/2.png" },
        { id: "3", title: "ABSTRACT", imageSrc: "/images/indiworks/3.png" }
      ]
    }
  ]
};

interface GalleryItemProps {
  id: string;
  imageSrc: string;
  title: string;
  year: string;
  description: string;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ id, imageSrc, title, year, description }) => {
  const MAX_DESCRIPTION_LENGTH = 190;
  const truncatedDescription = description.length > MAX_DESCRIPTION_LENGTH
    ? description.slice(0, MAX_DESCRIPTION_LENGTH) + '...'
    : description;

  return (
    <Link href={`/g-visitor/artwork/${id}`} passHref>
      <motion.article 
        className="relative rounded-lg shadow-lg w-[500px] g-carousel h-auto max-md:max-w-full bg-white mx-4 mb-8 cursor-pointer"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative overflow-hidden h-[300px]">
          <motion.img
            src={imageSrc}
            alt={`${title} artwork`}
            className="object-cover w-full h-full"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="p-4">
          <motion.h2 
            className="text-2xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {title} <span className="font-normal text-gray-600 text-lg">{year}</span>
          </motion.h2>
          <motion.p 
            className="mt-2 text-gray-700 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {truncatedDescription}
          </motion.p>
        </div>
        <motion.div
          className="g-carousel-button absolute top-[250px] right-[-30px] bg-[#695C5C] text-white font-bold py-3 px-10 rounded-lg text-4xl transition hover:bg-[#958484]"
          style={{ zIndex: 10 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          SEE MORE
        </motion.div>
      </motion.article>
    </Link>
  );
};

const PrevArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <motion.div
      className={`${className} slick-prev custom-arrow left-[-15px] sm:left-[-30px]`}
      onClick={onClick}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
    >
      <FaChevronLeft className="text-3xl text-gray-800 hover:text-gray-500" />
    </motion.div>
  );
};

const NextArrow = (props: any) => {
  const { className, onClick } = props;
  return (
    <motion.div
      className={`${className} slick-next custom-arrow right-[-15px] sm:right-[-30px]`}
      onClick={onClick}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
    >
      <FaChevronRight className="text-3xl text-gray-800 hover:text-gray-500" />
    </motion.div>
  );
};

const BrowseGallery: React.FC = () => {
  const galleryItems = artworksData.artworks;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <motion.section 
      className="browser-gallery-section py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-[1200px] mx-auto px-4">
        <Slider {...settings}>
          {galleryItems.map((item, index) => (
            <div key={index} className="px-2">
              <GalleryItem {...item} />
            </div>
          ))}
        </Slider>
      </div>
    </motion.section>
  );
};

export default BrowseGallery;