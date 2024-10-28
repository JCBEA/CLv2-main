"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import '../app/(pages)/loader/loader.css';
import { Events } from './(pages)/landing-page/landing-page/EventsCarousel';
import { GallerySection } from './(pages)/landing-page/landing-page/GallerySection';
import { Malikhain } from './(pages)/landing-page/landing-page/Malikhain';
import { Transcribed } from '@/components/reusable-component/Transcribed';
import { Infinite } from '@/components/reusable-component/Infinite';
import { Subscribe } from '@/components/reusable-component/Subscribe';
import { PofconModal } from '@/components/reusable-component/PofconModal';
import { Logo } from '@/components/reusable-component/Logo';
import { motion } from 'framer-motion';

const heroImages = [
  '/intro/img1.jpg',
  '/intro/img2.jpg',
  '/intro/img3.jpg',
  '/intro/img4.jpg',
  '/intro/img5.jpg',
  '/intro/img6.jpg',
  '/intro/img7.jpg',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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
      type: 'spring',
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

    gsap.set('nav', { y: -150 });
    gsap.set(websiteContentRef.current, { display: 'none' });

    const animate = (digit: HTMLElement, duration: number, delay = 1) => {
      const numElement = digit.querySelector('.num');
      if (numElement instanceof HTMLElement) {
        const numHeight = numElement.clientHeight;
        const totalDistance =
          (digit.querySelectorAll('.num').length - 1) * numHeight;
        gsap.to(digit, {
          y: -totalDistance,
          duration,
          delay,
          ease: 'power2.inOut',
        });
      }
    };

    animate(digit3Ref.current, 5);
    animate(digit2Ref.current, 6);
    animate(digit1Ref.current, 2, 5);

    gsap
      .timeline()
      .to(progressBarRef.current, {
        width: '30%',
        duration: 2,
        ease: 'power4.inOut',
        delay: 7,
      })
      .to(progressBarRef.current, {
        width: '100%',
        opacity: 0,
        duration: 2,
        ease: 'power3.out',
      })
      .set('.pre-loader', { display: 'none' })
      .set(websiteContentRef.current, { display: 'block' })
      .to('.hero-imgs > img', {
        clipPath: 'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)',
        duration: 1,
        ease: 'power4.inOut',
        stagger: 0.25,
      })
      .to(heroRef.current, { scale: 1.25, duration: 3, ease: 'power3.inOut' }, '-=2')
      .to('nav', { y: 0, duration: 1, ease: 'power3.out' })
      .to(
        'h1 span',
        {
          top: '0px',
          stagger: 0.1,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.5'
      )
      .eventCallback('onComplete', () => {
        setShowContent(true);
        if (setContentLoaded) {
          setContentLoaded(true);
        }
        window.dispatchEvent(new Event('contentLoaded'));
        setContentFullyLoaded(true);
      });
  }, [setContentLoaded]);
  
  return (
    <main className={`gege overflow-x-hidden ${!contentFullyLoaded ? 'no-scroll' : ''}`}>
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
        transition={{ duration: 0.5, delay: 0.2 }}
    >
        <div className="digit-1" ref={digit1Ref}>
            <motion.div className="num"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >0</motion.div>
            <motion.div className="num offset"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            >1</motion.div>
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

      <div ref={websiteContentRef} className="website-content w-full min-h-screen pb-[10dvh]">
        <div className="h-[879px] absolute inset-0 bg-black bg-opacity-10 z-10"></div>
      
      
      {showContent && (
  <motion.div
  className="w-full md:max-w-[80%] max-w-[90%] h-full min-h-[30dvh] mx-auto flex flex-col gap-8 justify-center pt-[49dvh] items-center z-20 relative"
  variants={containerVariants}
  initial="hidden"
  animate="visible"
  onAnimationComplete={() => setContentFullyLoaded(true)}
>

   <motion.div className="z-50 w-full h-full flex flex-col lg:justify-start lg:items-start justify-center items-center gap-4" variants={itemVariants}>
     <motion.h1 className="font-bold lg:text-6xl text-5xl text-left text-secondary-1" variants={itemVariants}>
       Welcome to{" "}
     </motion.h1>
     <motion.div variants={itemVariants}>
       <Logo
         width={"auto"}
         height={"auto"}
         color="text-secondary-1"
         justifyContent="justify-center"
         itemPosition="items-center"
       />
     </motion.div>
   </motion.div>
   <motion.div className="z-50 w-full h-fit p-6 bg-shade-1 rounded-none" variants={itemVariants}>
     <div className="w-full h-full flex lg:flex-row flex-col border-primary-2 border-2">
       <motion.div className="w-full h-full flex flex-col p-32 md:justify-center justify-evenly md:items-start items-center lg:pl-16 px-2 gap-12" variants={containerVariants}>
         <motion.div className="w-full flex flex-col justify-start lg:items-start items-center gap-6" variants={itemVariants}>
           <motion.h1 className="md:text-4xl text-5xl lg:text-left text-center font-bold text-primary-2 lg:text-6xl tracking-widest title" variants={itemVariants}>
             Creative Directory
           </motion.h1>
           <motion.p className="font-medium text-2xl w-full max-w-xs lg:text-left text-center" variants={itemVariants}>
             Explore, connect and network with the creative minds of Legazpi City
           </motion.p>
         </motion.div>
         <motion.img className="w-full lg:h-full block lg:hidden" src={"images/landing-page/laptop.png"} alt="Laptop" variants={itemVariants} />
         <motion.div className="lg:w-fit w-full flex flex-row md:justify-center justify-evenly items-center md:gap-6 gap-4 font-semibold" variants={containerVariants}>
           <motion.button
             className="bg-primary-2 text-secondary-1 md:w-36 w-32 py-2 rounded-full uppercase tracking-widest title"
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             variants={itemVariants}
           >
             join
           </motion.button>
           <motion.button
             onClick={() => setShowPofconModal(true)}
             className="bg-secondary-1 text-primary-2 md:w-36 w-32 py-2 rounded-full uppercase tracking-widest title"
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             variants={itemVariants}
           >
             explore
           </motion.button>
         </motion.div>
       </motion.div>
       <motion.div className="w-full lg:block hidden h-full" variants={itemVariants}>
         <div className="w-full mt-1.5 h-full flex justify-center items-center">
           <motion.img 
             className="w-full" 
             src={"images/landing-page/laptop.png"} 
             alt="Laptop" 
             variants={itemVariants}
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.5, duration: 0.5 }}
           />
         </div>
       </motion.div>
     </div>
   </motion.div>
 </motion.div>
)}

      </div>
          <div className='mt-10'>

      <Events/>
          </div>
      <GallerySection />
      <Malikhain />
      <Transcribed />
      <Infinite />  
      <Subscribe />

      {showPofconModal && <PofconModal setShowPofconModal={setShowPofconModal} />}
      </main> 

    
  );
}