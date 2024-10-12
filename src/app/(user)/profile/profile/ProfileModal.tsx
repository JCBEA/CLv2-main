"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion, AnimatePresence } from "framer-motion";

interface ProfileModalProps {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
    openModal,
    setOpenModal
}) => {
    const [isClosing, setIsClosing] = useState(false);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (openModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [openModal]);

    const handleClose = () => {
        setIsClosing(true);
        // Delay the actual closing to allow for exit animation
        setTimeout(() => {
            setOpenModal(false);
            setIsClosing(false);
        }, 500); // Match this with your exit animation duration
    };

    return (
        <AnimatePresence mode="wait">
            {(openModal || isClosing) && (
                <motion.div
                    className="w-full h-dvh fixed z-[1000] inset-0 bg-secondary-2/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isClosing ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="w-full h-full flex justify-center items-center">
                        <motion.div
                            className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
                            initial={{ scale: 0.9, y: 50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 50, opacity: 0 }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 500
                            }}
                        >
                            <div className="flex justify-between items-center mb-4 relative overflow-hidden">
                                <motion.h1
                                    className="text-2xl font-bold"
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    Profile
                                </motion.h1>
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Icon
                                        className="cursor-pointer"
                                        onClick={handleClose}
                                        icon="line-md:menu-to-close-alt-transition"
                                        width="25"
                                        height="25"
                                    />
                                </motion.div>
                            </div>
                            {/* Add your form components here */}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}