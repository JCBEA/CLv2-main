'use client';

import React, { useEffect, useState, createContext, useContext } from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import { fetchArtworks, Artwork } from '@/services/Collections/fetchArtworks'; // Ensure this import path is correct

// Create a context to provide artwork data
const ArtworkContext = createContext<Artwork[]>([]);

export const useArtwork = () => useContext(ArtworkContext);

const GalleryItem: React.FC<Artwork> = ({slug, image_path, title, year, desc }) => {
    const MAX_DESCRIPTION_LENGTH = 190;
    const truncatedDescription = desc.length > MAX_DESCRIPTION_LENGTH
        ? desc.slice(0, MAX_DESCRIPTION_LENGTH) + '...'
        : desc;

    return (
        <Link href={`/g-visitor/artwork/${slug}`} passHref>
            <motion.article 
                className="relative rounded-lg shadow-lg w-[500px] g-carousel h-auto max-md:max-w-full bg-white mx-4 mb-8 cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="relative overflow-hidden h-[300px]">
                    <motion.img
                        src={image_path}
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

// Slider settings
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

const BrowseGallery: React.FC = () => {
    const [galleryItems, setGalleryItems] = useState<Artwork[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadArtworks = async () => {
            try {
                const artworks = await fetchArtworks(); // Fetching artwork data from the external source
                setGalleryItems(artworks);
            } catch (error) {
                console.error('Error loading artworks:', error);
            } finally {
                setLoading(false);
            }
        };

        loadArtworks();
    }, []);

    if (loading) return <div>Loading...</div>; // Loading state

    return (
        <ArtworkContext.Provider value={galleryItems}>
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
        </ArtworkContext.Provider>
    );
};

export default BrowseGallery;
