"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { MultiStepForm } from "@/app/apps-ui/(pages)/(authentication)/signup/signup-component/Signup";

interface RegisterModalProps {
  setShowPofconModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  setShowPofconModal,
}) => {
  const [isVisible, setIsVisible] = useState(true); // Local state to manage visibility
  const [isExiting, setIsExiting] = useState(false); // State to manage exit animation

  const handleClose = () => {
    setIsExiting(true); // Start exit animation
  };

  const handleAnimationComplete = () => {
    if (isExiting) {
      setShowPofconModal(false); // Hide modal after exit animation completes
    }
  };

  return (
    <motion.div
      className="w-full h-dvh fixed z-[1000] inset-0 bg-secondary-2/50"
      initial={{ opacity: 0 }} // Initial state
      animate={{ opacity: isExiting ? 0 : 1 }} // Animate to full opacity or fade out
      transition={{ duration: 0.3, ease: "easeInOut" }} // Duration of the transition
      onClick={handleClose} // Handle modal click to close
      onAnimationComplete={handleAnimationComplete} // Handle animation completion
    >
      <div className="w-full h-full flex justify-center items-center">
        <div
          className="w-full h-full max-h-[70%] xl:max-w-[55%]  md:max-w-[60%] max-w-[90%] mx-auto bg-secondary-1 py-4 rounded-2xl relative overflow-hidden"
          onClick={(e) => e.stopPropagation()} // Prevent close on inner click
        >
          <div className="w-full h-full flex xl:flex-row-reverse flex-col overflow-hidden rounded-lg relative px-4 lg:py-0 ">
            <div className="h-full w-full -ml-4 xl:flex hidden">
              <motion.div
              initial={{ opacity: 0, y: "10%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="h-full w-full max-w-[24rem] ">
                <Logo color="text-primary-2" width="auto" height="auto" />
              </motion.div>
            </div>
            <div className="h-full w-full overflow-y-auto scroll-none text-primary-2 z-50 ">
              <div className=" min-h-full lg:-ml-8 flex flex-col gap-4 justify-center items-center sm:p-10 p-4">
                <div className="w-full mx-auto h-full flex justify-end items-end">
                  <MultiStepForm />
                </div>
              </div>
            </div>
            
          </div>
          {/* design lang to */}
          <div className="h-fit w-fit absolute lg:-bottom-[19rem] -top-[23rem] lg:right-[-15rem] left-[-20rem]">
              <div className="bg-primary-2/20 xl:w-[40rem] w-[35rem]  h-[35rem] xl:h-[40rem]  rounded-full z-20"></div>
            </div>
          {/* design lang to */}
          <div className="h-fit w-fit absolute lg:-bottom-[23rem] -bottom-[30rem] right-[-20rem]">
            <div className="bg-primary-2/70 w-[40rem] h-[40rem] rounded-full z-20"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const RegisterButton = () => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="uppercase text-secondary-1 bg-primary-2 rounded-lg text-xl py-3 w-56 font-semibold"
    >
      register here
    </motion.button>
  );
};
