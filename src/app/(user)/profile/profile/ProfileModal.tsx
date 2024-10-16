"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion, AnimatePresence } from "framer-motion";
import { UserDetail } from "./UserProfile";
import { supabase } from "@/services/supabaseClient";

interface ProfileModalProps {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    formData: UserDetail; // Accept formData as prop
    setFormData: React.Dispatch<React.SetStateAction<UserDetail>>; // Accept setFormData as prop
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
    openModal,
    setOpenModal,
    formData,
    setFormData
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

    // Handle input change within modal
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        console.log(name, value); // Check if the values are correct
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        console.log("Form Data being saved:", formData); // To verify
    
        try {
            // Use Supabase to update the user's details
            const { data, error } = await supabase
                .from('userDetails') // Replace with your actual table name
                .update({
                    first_name: formData.first_name,
                    bday: formData.bday,
                    address: formData.address,
                    facebook: formData.facebook,
                    instagram: formData.instagram,
                    email: formData.email,
                    creative_field: formData.creative_field,
                    mobileNo: formData.mobileNo,
                    portfolioLink: formData.portfolioLink,
                    bio: formData.bio
                })
                .eq('id', formData.id); // Use the user's unique identifier (id)
    
            if (error) {
                console.error("Error updating user data:", error.message);
            } else {
                console.log("User data updated successfully:", data);
                setOpenModal(false); // Close the modal after saving
            }
        } catch (error) {
            console.error("An error occurred while updating data:", error);
        }
    };



    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setOpenModal(false);
            setIsClosing(false);
        }, 500); // Adjust duration for the exit animation
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
                            <form className="w-full h-fit flex flex-col gap-8 overflow-y-auto">
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
                                                <div className="md:w-[20rem] w-full  flex flex-col gap-2 text-base md:p-0 p-4">
                                                    <div className="w-full flex flex-col gap-1">
                                                        <label className="ml-4" htmlFor="name">Name</label>
                                                        <input
                                                            type="text"
                                                            name="first_name"
                                                            value={formData.first_name}
                                                            onChange={handleInputChange}
                                                            className="w-full md:py-2.5 py-4 border rounded-xl px-4 outline-none" placeholder="Enter your name" />
                                                    </div>
                                                    <div className="w-full flex flex-col gap-1">
                                                        <label className="ml-4" htmlFor="age">Age</label>
                                                        <input
                                                            type="text"
                                                            name="bday"
                                                            value={formData.bday}
                                                            onChange={handleInputChange}
                                                            className="w-full md:py-2.5 py-4 border rounded-xl px-4 outline-none" placeholder="Enter your birth date" />
                                                    </div>
                                                    <div className="w-full flex flex-col gap-1">
                                                        <label className="ml-4" htmlFor="location">Location</label>
                                                        <input
                                                            type="text"
                                                            name="address"
                                                            value={formData.address}
                                                            onChange={handleInputChange}
                                                            className="w-full md:py-2.5 py-4 border rounded-xl px-4 outline-none" placeholder="Enter your adress" />
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
                                                <div className="w-full flex flex-col justify-center items-center gap-4 text-base md:h-44 h-fit">
                                                    {/* top part of the form */}
                                                    <div className="w-full flex md:flex-row flex-col justify-center items-center gap-4 text-base h-fit">
                                                        <div className="w-full flex flex-col gap-1">
                                                            <label className="ml-4 capitalize" htmlFor="name">Facebook link</label>
                                                            <input
                                                                type="facebook"
                                                                name="facebook"
                                                                value={formData.facebook}
                                                                onChange={handleInputChange}
                                                                className="w-full md:py-2.5 py-4 border rounded-xl px-4 outline-none" placeholder="Facebook Link" />
                                                        </div>
                                                        <div className="w-full flex flex-col gap-1">
                                                            <label className="ml-4 capitalize" htmlFor="location">instragram link</label>
                                                            <input
                                                                type="instagram"
                                                                name="instagram"
                                                                value={formData.instagram}
                                                                onChange={handleInputChange}
                                                                className="w-full md:py-2.5 py-4 border rounded-xl px-4 outline-none" placeholder="Instagram Link" />
                                                        </div>
                                                        <div className="w-full flex flex-col gap-1">
                                                            <label className="ml-4 capitalize" htmlFor="age">Email adress</label>
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                value={formData.email}
                                                                onChange={handleInputChange}
                                                                className="w-full md:py-2.5 py-4 border rounded-xl px-4 outline-none" placeholder="Email Address" />
                                                        </div>
                                                    </div>
                                                    {/* bottom form*/}
                                                    <div className="w-full flex md:flex-row flex-col justify-center items-center gap-4 text-base h-fit">
                                                        <div className="w-full flex flex-col gap-1">
                                                            <label className="ml-4 capitalize" htmlFor="name">Creative field</label>
                                                            <input
                                                                type="creative_field"
                                                                name="creative_field"
                                                                value={formData.creative_field}
                                                                onChange={handleInputChange}
                                                                className="w-full md:py-2.5 py-4 border rounded-xl px-4 outline-none" placeholder="Creative Field" />
                                                        </div>
                                                        <div className="w-full flex flex-col gap-1">
                                                            <label className="ml-4 capitalize" htmlFor="location">Mobile No.</label>
                                                            <input
                                                                type="mobileNo"
                                                                name="mobileNo"
                                                                value={formData.mobileNo}
                                                                onChange={handleInputChange}
                                                                className="w-full md:py-2.5 py-4 border rounded-xl px-4 outline-none" placeholder="Contact Number" />
                                                        </div>
                                                        <div className="w-full flex flex-col gap-1">
                                                            <label className="ml-4 capitalize" htmlFor="age">Portfolio Link</label>
                                                            <input
                                                                type="portfolioLink"
                                                                name="portfolioLink"
                                                                value={formData.portfolioLink}
                                                                onChange={handleInputChange}
                                                                className="w-full md:py-2.5 py-4 border rounded-xl px-4 outline-none" placeholder="Portfolio Link" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-full font-normal text-base h-fit">
                                                    <label className="ml-4 capitalize font-semibold" htmlFor="description">Description</label>
                                                    <textarea
                                                        name="bio"
                                                        value={formData.bio}
                                                        onChange={handleInputChange}
                                                        className="resize-none w-full h-52 md:py-2.5 py-4 border rounded-xl px-4 outline-none" placeholder="Enter your description of yourself"></textarea>
                                                </div>
                                            </motion.div>

                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex justify-end items-center md:pb-0 pb-6 pr-4 mb-4">
                                    <motion.button
                                        whileHover={{ scale: 1.05, backgroundColor: "#403737", color: "white" }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-44 py-2.5 font-semibold bg-shade-2 rounded-full"
                                        onClick={handleSave} // Add the save function here
                                    >
                                        Save
                                    </motion.button>

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