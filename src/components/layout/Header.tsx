"use client";
import { motion } from "framer-motion";
import { Logo } from "../reusable-component/Logo";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Define Props Interfaces
interface MenuItemProps {
  name: string;
  link: string;
}

interface HeaderProps {
  backgroundColor?: string;
  textColor?: string;
  buttonName?: string;
  roundedCustom?: string;
  paddingLeftCustom?: string;
}

// MenuItem Component
const MenuItem = ({ name, link }: MenuItemProps) => {
  return (
    <motion.a
      href={link}
      className="text-base uppercase font-semibold whitespace-nowrap relative"
      whileHover={{ scale: 1.1, color: "#fff" }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }} // Reduced duration for faster effect
    >
      {name}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-2"
        variants={{
          initial: { width: "0%" },
          hover: { width: "100%" },
        }}
        transition={{ duration: 0.2, ease: "easeInOut", delay: 0 }} // Faster underline effect
      />
    </motion.a>
  );
};

// Header Component
export const Header = ({
  backgroundColor = "bg-primary-1",
  textColor = "text-primary-2",
  buttonName = "Join Mukna",
  paddingLeftCustom = "pl-14",
  roundedCustom = "rounded-bl-3xl",
}: HeaderProps) => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // GSAP Animation for Header on Load
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        }
      );
    }

    // Scroll listener to change header background when scrolling
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

 
  return (
    <div
      ref={headerRef}
      className={`w-full h-[10dvh] fixed top-0 z-[1000] ${paddingLeftCustom} transition-colors duration-500`}
    >
      <motion.div
        className={`w-full h-full ${roundedCustom} ${textColor} ${
          isScrolled
            ? "bg-primary-1/60 backdrop-blur-md"
            : backgroundColor
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
      >
        <div className="w-full max-w-[95%] mx-auto h-full flex justify-between items-center">
          {/* Logo Section */}
          <motion.div
            className="w-fit h-full py-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <Logo width="auto" height="auto" color="text-secondary-2" />
          </motion.div>

          {/* Menu Section */}
          <motion.div
            className="w-fit lg:flex justify-center items-center lg:gap-14 hidden"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3,
                },
              },
            }}
          >
            {headerMenu.map((item, index) => (
              <MenuItem key={index} {...item} />
            ))}
            <motion.button
              className="uppercase w-44 py-1.5 font-semibold rounded-full bg-shade-2"
              whileHover={{ scale: 1.1, backgroundColor: "#ff6f61" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.2, ease: "easeOut" }} // Reduced delay and duration for faster effect
            >
              {buttonName}
            </motion.button>
          </motion.div>

          {/* Mobile Menu Icon */}
          <motion.div
            className="lg:hidden block text-secondary-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          >
            <Icon icon="eva:menu-fill" width="35" height="35" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// Menu Data
const headerMenu = [
  { name: "Directory", link: "/" },
  { name: "Gallery", link: "/about" },
  { name: "FAQ", link: "/contact" },
  { name: "Log In", link: "/signin" },
];
