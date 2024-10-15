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
                    className="w-full h-dvh fixed z-[1000] inset-0 bg-secondary-2/50 flex justify-center items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isClosing ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="w-full h-full max-w-[90%] max-h-[90%] md:h-fit flex justify-center items-center x">
                        <motion.div
                            className="bg-primary-1 outline-2 flex flex-col outline-shade-2 outline-none h-full md:p-6 md:pt-10 relative rounded-lg 
                            shadow-xl w-full md:max-w-screen-xl md:overflow-hidden "
                            initial={{ scale: 0.9, y: 50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 50, opacity: 0 }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 500
                            }}
                        >

                            <div className="h-fit w-full flex justify-end p-2">
                            <Icon
                                className="cursor-pointer md:absolute top-2 right-2 bg-shade-2 rounded-full"
                                onClick={handleClose}
                                icon="line-md:close-circle"
                                width="35"
                                height="35"
                            />
                            </div>

                            {/* div left */}
                            <form className="w-full h-fit flex flex-col gap-8 overflow-y-auto" action="">
                                <div className="w-full h-fit flex flex-col gap-8 overflow-y-auto scroll-none">
                                <div className="w-full flex md:flex-row flex-col gap-10 ">
                                    <div className="flex md:w-fit w-full items-center">
                                        <motion.div
                                            className="w-full font-semibold flex flex-col gap-10 justify-center items-center"
                                            initial={{ y: -20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <div className="h-fit w-fit">
                                                <div className="w-44 h-44 relative">
                                                    {/* ${user.profilePic ? userAgent.profilePic : '/images/logo.png'} */}
                                                    <img className={`w-full h-full rounded-full bg-primary-3`} src="" alt="" />
                                                    <Icon className="absolute -bottom-0 right-0 bg-secondary-1 rounded-full p-2 cursor-pointer" icon="bxs:camera" width="45" height="45" />
                                                </div>
                                            </div>
                                            <div className="md:w-[20rem] w-full  flex flex-col gap-4 text-base md:p-0 p-4">
                                                <div className="w-full flex flex-col gap-1">
                                                    <label className="ml-4" htmlFor="name">Name</label>
                                                    <input className="w-full md:py-2.5 py-4 border rounded-xl px-4 outline-none" placeholder="Enter your name" />
                                                </div>
                                                <div className="w-full flex flex-col gap-1">
                                                    <label className="ml-4" htmlFor="age">Age</label>
                                                    <input className="w-full md:py-2.5 py-4 border rounded-xl px-4 outline-none" placeholder="Enter your age" />
                                                </div>
                                                <div className="w-full flex flex-col gap-1">
                                                    <label className="ml-4" htmlFor="location">Location</label>
                                                    <input className="w-full md:py-2.5 py-4 border rounded-xl px-4 outline-none" placeholder="Enter your adress" />
                                                </div>
                                            </div>
                                        </motion.div>

                                    </div>
                                    {/* div right */}
                                    <div className="flex w-full  justify-center items-center">
                                        <motion.div
                                            className="font-semibold w-full md:h-fit h-full flex flex-col gap-12 justify-between items-center md:p-0 p-4"
                                            initial={{ y: -20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: -20, opacity: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <div className="w-full flex md:flex-row flex-col
                                                justify-center items-center gap-4 text-base md:h-44 h-fit">
                                                <div className="w-full flex flex-col gap-1">
                                                    <label className="ml-4 capitalize" htmlFor="name">Facebook link</label>
                                                    <input className="w-full md:py-2.5 py-4 border rounded-xl px-4 outline-none" placeholder="Name" />
                                                </div>
                                                <div className="w-full flex flex-col gap-1">
                                                    <label className="ml-4 capitalize" htmlFor="location">instragram link</label>
                                                    <input className="w-full md:py-2.5 py-4 border rounded-xl px-4 outline-none" placeholder="Location" />
                                                </div>
                                                <div className="w-full flex flex-col gap-1">
                                                    <label className="ml-4 capitalize" htmlFor="age">Email adress</label>
                                                    <input className="w-full md:py-2.5 py-4 border rounded-xl px-4 outline-none" placeholder="Age" />
                                                </div>
                                            </div>
                                            <div className="w-full font-normal text-base h-fit">
                                                <label className="ml-4 capitalize font-semibold" htmlFor="description">Description</label>
                                                <textarea className="resize-none w-full h-52 md:py-2.5 py-4 border rounded-xl px-4 outline-none" name="description" id="" placeholder="Enter your description of yourself"></textarea>
                                            </div>
                                        </motion.div>

                                    </div>
                                </div>
                                </div>
                                <div className="w-full flex justify-end items-center md:pb-0 pb-6">
                                    <motion.button
                                        whileHover={{ scale: 1.05, backgroundColor: "#403737", color: "white" }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-44 py-2.5 font-semibold bg-shade-2 rounded-full">Save</motion.button>
                                </div>
                            </form>
                            {/* Add your form components here */}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}