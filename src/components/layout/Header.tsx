"use client";

import { motion } from "framer-motion";
import { Logo } from "../reusable-component/Logo";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { getSession, logoutUser } from "@/services/authservice";
import { usePathname, useRouter } from 'next/navigation';

// Define Props Interfaces
interface MenuItemProps {
  name: string;
  link: string;
}

interface HeaderProps {
  backgroundColor?: string;
  textColor?: string;
  buttonName?: string;
  linkName?: string;
  roundedCustom?: string;
  paddingLeftCustom?: string;
  menuItems?: MenuItemProps[];
}

// MenuItem Component
const MenuItem = ({ name, link }: MenuItemProps) => {
  const pathname = usePathname();
  // Check if the current route is active
  const isActive = pathname === link;

  return (
    <motion.a
      href={link}
      className={`text-base uppercase font-semibold whitespace-nowrap relative ${isActive ? 'text-tertiary-1 font-bold text-lg' : 'text-primary-2'  // Active color condition
        }`}
      whileHover={{ scale: 1.1, color: "#B6E3CE" }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {name}
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
  linkName = "",
}: HeaderProps) => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItemProps[]>([]);
  const router = useRouter();

  const checkAuth = async () => {
    const session = await getSession();
    setIsLoggedIn(!!session);

    if (session) {
      setMenuItems([
        { name: "Home", link: "/pofcon-landing-page" },
        { name: "Directory", link: "/creative-dashboard" },
        { name: "Gallery", link: "/g-user" },
        { name: "FAQ", link: "/faqs" },
        { name: "Events", link: "/events" },
        { name: "Profile", link: "/profile" },
      ]);
    } else {
      setMenuItems([
        { name: "Home", link: "/landing-page" },
        { name: "Directory", link: "/creative-dashboard" },
        { name: "Gallery", link: "/g-visitor" },
        { name: "FAQ", link: "/faqs" },
        { name: "Events", link: "/events" },
        { name: "Profile", link: "/profile" },
      ]);
    }
  };

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
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    checkAuth();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    checkAuth(); // Update menu items
    router.push('/signin');
  };

  return (
    <div
      ref={headerRef}
      className={`w-full h-[10dvh] fixed top-0 z-[1000] ${paddingLeftCustom} transition-colors duration-500`}
    >
      <motion.div
        className={`w-full h-full ${roundedCustom} ${textColor} ${isScrolled ? "bg-primary-1/60 backdrop-blur-md" : backgroundColor
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
            className="w-fit xl:flex justify-center items-center lg:gap-14 hidden"
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
            {menuItems.map((item, index) => (
              <MenuItem key={index} {...item} />
            ))}
            {isLoggedIn ? (
              <motion.button
                onClick={handleLogout}
                className="uppercase w-44 py-1.5 font-semibold rounded-full bg-shade-2"
                whileHover={{ scale: 1.1, backgroundColor: "#403737", color: "#fff" }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                Logout
              </motion.button>
            ) : (
              <Link href={linkName}>
                <motion.button
                  className="uppercase w-44 py-1.5 font-semibold rounded-full bg-shade-2"
                  whileHover={{ scale: 1.1, backgroundColor: "#403737", color: "#fff" }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {buttonName}
                </motion.button>
              </Link>
            )}
          </motion.div>

          {/* Mobile Menu Icon */}
          <motion.div
            className="xl:hidden block text-secondary-2"
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