"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

interface CalendarModalProps {
    isOpen: boolean;
    onClose: () => void;
    closeHandler: () => void;
    selectedDay: Date;
}
interface FormProps {
    eventTitle: string;
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    location: string;
    eventAbout: string;
}

export const CalendarModal = ({ isOpen, onClose, selectedDay, closeHandler }: CalendarModalProps) => {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsClosing(false); // Reset closing state when modal opens
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsClosing(true); // Trigger the closing animation
        setTimeout(() => {
            onClose(); // Actually call the close function after the animation duration
        }, 200); // Match this with the exit animation duration
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-dvh fixed z-[1000] inset-0 bg-secondary-2/50 text-primary-2 flex justify-center items-center"
                    onClick={handleClose} // Allow closing when clicking on the background
                >
                    <div className="w-full xl:max-w-screen-md lg:max-w-[80%] max-w-[90%] lg:px-8 mx-auto h-fit py-[12dvh]">
                        <Content closeHandler={closeHandler} />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


const Content = ({ closeHandler }: { closeHandler: () => void }) => {
    return (
        <motion.div
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            transition={{
                type: "spring",
                damping: 25,
                stiffness: 500
            }}
            className="w-full h-full flex flex-col outline-none outline-shade-2 outline-offset-2 bg-white rounded-lg shadow-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        >
            <div className="w-full h-fit p-4 bg-shade-2 relative">
                <h1 className="uppercase font-semibold text-3xl lg:block hidden">Schedule</h1>
                <Icon
                    onClick={closeHandler}
                    className="absolute right-4 top-4 cursor-pointer hover:scale-110 duration-300"
                    icon="line-md:close-small"
                    width="35"
                    height="35"
                />
            </div>

            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ delay: 0.3 }}
                className="p-4"
            >
                {/* Form has to be here */}
                <FormInput />
                {/* End of form */}
            </motion.div>
        </motion.div>
    )
}

const FormInput = () => {
    return (
        <div className="w-full h-full">
            <form className="w-full h-full flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="" className="ml-2">Title and Location</label>
                    <div className="w-full flex gap-4 items-center">
                        <input
                            type="text"
                            placeholder="Title"
                            className="w-full h-12 border border-quaternary-1 outline-none focus:outline-shade-2 focus:ring-shade-3 focus:ring-1 rounded-lg p-4 text-primary-2"
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            className="w-full h-12 border border-quaternary-1 outline-none focus:outline-shade-2 focus:ring-shade-3 focus:ring-1 rounded-lg p-4 text-primary-2"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="" className="ml-2">Date</label>
                    <div className="w-full flex gap-4 items-center">
                        <input
                            type="text"
                            placeholder="Starting Date"
                            className="w-full h-12 border border-quaternary-1 outline-none focus:outline-shade-2 focus:ring-shade-3 focus:ring-1 rounded-lg p-4 text-primary-2"
                        />
                        <input
                            type="text"
                            placeholder="Ending Date"
                            className="w-full h-12 border border-quaternary-1 outline-none focus:outline-shade-2 focus:ring-shade-3 focus:ring-1 rounded-lg p-4 text-primary-2"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="" className="ml-2">Time</label>
                    <div className="w-full flex gap-4 items-center">
                        <input
                            type="text"
                            placeholder="Start time"
                            className="w-full h-12 border border-quaternary-1 outline-none focus:outline-shade-2 focus:ring-shade-3 focus:ring-1 rounded-lg p-4 text-primary-2"
                        />
                        <input
                            type="text"
                            placeholder="End time"
                            className="w-full h-12 border border-quaternary-1 outline-none focus:outline-shade-2 focus:ring-shade-3 focus:ring-1 rounded-lg p-4 text-primary-2"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="" className="ml-2">Description</label>
                    <textarea
                        placeholder="About the event"
                        className="w-full border border-quaternary-1 outline-none focus:outline-shade-2 focus:ring-shade-3 focus:ring-1 rounded-lg p-4 text-primary-2 resize-none row-span-12 col-span-12"
                    ></textarea>
                </div>
            </form>
        </div>
    );
};
