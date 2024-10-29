"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from 'next/link';
import { CreativeArray, CreativeLegazpiUsers } from '../creative-components/CreativeArray';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
};

const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.6
};

const staggerChildren = {
    animate: {
        transition: {
            staggerChildren: 0.2
        }
    }
};

const childVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
};

const SearchResultsPage = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState(query || '');
    
    // Filter both categories and users based on search query
    const filteredCategories = CreativeArray.filter(category =>
        category.title.toLowerCase().includes((query || '').toLowerCase())
    );
    
    const filteredUsers = CreativeLegazpiUsers.filter(user =>
        user.name.toLowerCase().includes((query || '').toLowerCase()) ||
        user.description.toLowerCase().includes((query || '').toLowerCase())
    );

    const handleNewSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/apps-ui/creative-dashboard/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <motion.div
            className="w-full min-h-screen pt-[5dvh] pb-20 text-primary-2"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
        >
            <div className="w-full lg:max-w-[70%] md:max-w-[80%] max-w-[90%] mx-auto">
                <motion.div 
                    className="w-full flex flex-col gap-8"
                    variants={staggerChildren}
                >
                    {/* Header with Back Button */}
                    <motion.div 
                        className="flex items-center gap-4"
                        variants={childVariants}
                    >
                        <Link href="/" className="text-primary-2 hover:opacity-80 transition-opacity">
                            <Icon icon="eva:arrow-back-fill" width="24" height="24" />
                        </Link>
                        <h1 className="text-3xl font-semibold">
                            Search Results
                        </h1>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.form 
                        onSubmit={handleNewSearch}
                        className="w-full max-w-2xl relative"
                        variants={childVariants}
                    >
                        <input
                            className="placeholder:text-primary-2 text-lg font-medium rounded-full bg-quaternary-2 ring-none 
                            outline-none w-full py-2.5 px-14"
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Icon
                            className="absolute top-1/2 -translate-y-1/2 left-4 text-primary-2"
                            icon="cil:search"
                            width="23"
                            height="23"
                        />
                        <button type="submit">
                            <Icon
                                className="cursor-pointer -mt-1 absolute top-[55%] -translate-y-1/2 right-4 text-primary-2"
                                icon="iconamoon:send-thin" 
                                width="28" 
                                height="28" 
                            />
                        </button>
                    </motion.form>

                    {/* Search Query Display */}
                    <motion.div variants={childVariants}>
                        <p className="text-lg opacity-80">
                            Showing results for "<span className="font-semibold">{query}</span>"
                        </p>
                    </motion.div>

                    {/* Categories Results */}
                    {filteredCategories.length > 0 && (
                        <motion.div variants={childVariants}>
                            <h2 className="text-2xl font-semibold mb-4">Categories</h2>
                            <motion.div 
                                className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6"
                                variants={staggerChildren}
                            >
                                {filteredCategories.map((category) => (
                                    <Link href={category.link} key={category.id}>
                                        <motion.div
                                            className="bg-quaternary-2 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                                            variants={childVariants}
                                        >
                                            <img
                                                src={category.src}
                                                alt={category.title}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="p-6">
                                                <h3 className="text-xl font-semibold">{category.title}</h3>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Artists/Users Results */}
                    {filteredUsers.length > 0 && (
                        <motion.div variants={childVariants} className="mt-8">
                            <h2 className="text-2xl font-semibold mb-4">Artists</h2>
                            <motion.div 
                                className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6"
                                variants={staggerChildren}
                            >
                                {filteredUsers.map((user) => (
                                    <motion.div
                                        key={user.id}
                                        className="bg-quaternary-2 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                                        variants={childVariants}
                                    >
                                        <div className="relative h-48">
                                            <img
                                                src={user.imageBg}
                                                alt="background"
                                                className="w-full h-full object-cover absolute"
                                            />
                                            <img
                                                src={user.imageSrc}
                                                alt={user.name}
                                                className="w-full h-full object-contain relative z-10"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold mb-2">{user.name}</h3>
                                            <p className="text-sm opacity-80 line-clamp-3">{user.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}

                    {/* No Results State */}
                    {filteredCategories.length === 0 && filteredUsers.length === 0 && (
                        <motion.div 
                            className="text-center py-12"
                            variants={childVariants}
                        >
                            <p className="text-xl mb-2">No results found for "{query}"</p>
                            <p className="opacity-80">Try searching with different keywords</p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default SearchResultsPage;