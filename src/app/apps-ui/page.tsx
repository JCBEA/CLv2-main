"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import "./(pages)/loader/loader.css";
import { Events } from "./(pages)/landing-page/landing-page/EventsCarousel";
import { GallerySection } from "./(pages)/landing-page/landing-page/GallerySection";
import { Malikhain } from "./(pages)/landing-page/landing-page/Malikhain";
import { Transcribed } from "@/components/reusable-component/Transcribed";
import { Infinite } from "@/components/reusable-component/Infinite";
import { Subscribe } from "@/components/reusable-component/Subscribe";
import { PofconModal } from "@/components/reusable-component/PofconModal";
import { Logo } from "@/components/reusable-component/Logo";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PofconHeroPage } from "./(pages)/landing-page/landing-page/PofconHeroPage";

const heroImages = [
  "/intro/img1.jpg",
  "/intro/img2.jpg",
  "/intro/img3.jpg",
  "/intro/img4.jpg",
  "/intro/img5.jpg",
  "/intro/img6.jpg",
  "/intro/img7.png",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

interface HomeProps {
  setContentLoaded?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Loader({ setContentLoaded }: HomeProps) {
  const [showPofconModal, setShowPofconModal] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [contentFullyLoaded, setContentFullyLoaded] = useState(false);

  const digit1Ref = useRef<HTMLDivElement>(null);
  const digit2Ref = useRef<HTMLDivElement>(null);
  const digit3Ref = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const websiteContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !progressBarRef.current ||
      !digit1Ref.current ||
      !digit2Ref.current ||
      !digit3Ref.current ||
      !heroRef.current ||
      !websiteContentRef.current
    ) {
      return;
    }

    gsap.set("nav", { y: -150 });
    gsap.set(websiteContentRef.current, { display: "none" });

    const animate = (digit: HTMLElement, duration: number, delay = 1) => {
      const numElement = digit.querySelector(".num");
      if (numElement instanceof HTMLElement) {
        const numHeight = numElement.clientHeight;
        const totalDistance =
          (digit.querySelectorAll(".num").length - 1) * numHeight;
        gsap.to(digit, {
          y: -totalDistance,
          duration,
          delay,
          ease: "power2.inOut",
        });
      }
    };

    animate(digit3Ref.current, 5);
    animate(digit2Ref.current, 6);
    animate(digit1Ref.current, 2, 5);

    gsap
      .timeline()
      .to(progressBarRef.current, {
        width: "30%",
        duration: 2,
        ease: "power4.inOut",
        delay: 7,
      })
      .to(progressBarRef.current, {
        width: "100%",
        opacity: 0,
        duration: 2,
        ease: "power3.out",
      })
      .set(".pre-loader", { display: "none" })
      .set(websiteContentRef.current, { display: "block" })
      .to(".hero-imgs > img", {
        clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
        duration: 1,
        ease: "power4.inOut",
        stagger: 0.25,
      })
      .to(
        heroRef.current,
        { scale: 1.25, duration: 3, ease: "power3.inOut" },
        "-=2"
      )
      .to("nav", { y: 0, duration: 1, ease: "power3.out" })
      .to(
        "h1 span",
        {
          top: "0px",
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .eventCallback("onComplete", () => {
        setShowContent(true);
        if (setContentLoaded) {
          setContentLoaded(true);
        }
        window.dispatchEvent(new Event("contentLoaded"));
        setContentFullyLoaded(true);
      });
  }, [setContentLoaded]);

  return (
    <main
      className={`gege overflow-x-hidden   ${
        !contentFullyLoaded ? "no-scroll " : ""
      }`}
    >
      <section ref={heroRef} className="hero">
        <motion.div
          className="pre-loader font-extrabold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            loading
          </motion.p>
          <motion.div
            className="counter"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="digit-1" ref={digit1Ref}>
              <motion.div
                className="num"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                0
              </motion.div>
              <motion.div
                className="num offset"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                1
              </motion.div>
            </div>
            <div className="digit-2" ref={digit2Ref}>
              {[...Array(11)].map((_, i) => (
                <motion.div
                  key={i}
                  className="num"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 * i }}
                >
                  {i % 10}
                </motion.div>
              ))}
            </div>
            <div className="digit-3" ref={digit3Ref}>
              {[...Array(11)].map((_, i) => (
                <motion.div
                  key={i}
                  className="num"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 * i }}
                >
                  {i % 10}
                </motion.div>
              ))}
            </div>
            <motion.div
              className="digit-4"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              %
            </motion.div>
          </motion.div>
          <motion.div
            className="progress-bar"
            ref={progressBarRef}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
        </motion.div>
        <div className="hero-imgs">
          {heroImages.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Hero image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="imahe"
            />
          ))}
        </div>
      </section>

      <div
        ref={websiteContentRef}
        className="website-content w-full min-h-screen pb-[10dvh] relative"
      >
        {showContent && 
          <div className="w-full h-fit">
            <Header />
            <PofconHeroPage setShowPofconModal={setShowPofconModal} />
          </div>
        }
      </div>
      <div className="pt-[15dvh]">
        <Events />
      </div>
      <GallerySection />
      <Malikhain />
      <Transcribed />
      <Infinite />
      <Subscribe />
      <Footer />

      {showPofconModal && (
        <PofconModal setShowPofconModal={setShowPofconModal} />
      )}
    </main>
  );
}
