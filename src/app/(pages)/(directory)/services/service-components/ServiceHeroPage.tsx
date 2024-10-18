"use client"

import { Icon } from "@iconify/react/dist/iconify.js"
import { motion } from "framer-motion"

export const ServiceHeroPage = () => {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 }
    }

    const transition = {
        duration: 0.6
    }

    const staggerChildren = {
        animate: {
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    return (
        <motion.div 
            className="w-full lg:h-dvh h-fit lg:pb-0 pb-[15dvh]"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
        >
            <div className="w-full lg:pt-[20dvh] pt-[10dvh] flex flex-col lg:gap-5 lg:max-w-[70%] max-w-[80%] mx-auto">
                <motion.div 
                    className="w-full relative justify-start items-center lg:flex hidden"
                    variants={fadeInUp}
                    transition={transition}
                >
                    <h1 className="uppercase font-semibold lg:text-5xl text-xl">discover</h1>
                    <Icon 
                        onClick={() => window.history.back()} 
                        className="absolute top-1/2 lg:-left-16 -left-8 -translate-y-1/2 lg:text-5xl text-xl cursor-pointer" 
                        icon="ic:round-arrow-back"
                    />
                </motion.div>
                <div className="w-full flex lg:flex-row flex-col">
                    <div className="w-full lg:max-w-[45%] max-w-full flex flex-col gap-6 lg:justify-start lg:items-start justify-center items-center">
                        <motion.h1 
                            className="uppercase leading-snug w-full lg:max-w-sm max-w-full lg:font-extrabold font-bold lg:text-7xl text-3xl lg:text-left text-center mt-12"
                            variants={fadeInUp}
                            transition={transition}
                        >
                            Creative services
                        </motion.h1>
                        <motion.div 
                            className="w-fit h-fit lg:hidden block"
                            variants={fadeInUp}
                            transition={transition}
                        >
                            <img className="h-full w-full" src="/images/creative-directory/workshop.png" alt="" />
                        </motion.div>
                        <motion.p 
                            className="w-full max-w-2xl text-base font-medium lg:text-left text-justify pt-2"
                            variants={fadeInUp}
                            transition={transition}
                        >
                            Creative services encompass a wide range of professional offerings designed to help businesses
                            and individuals bring their ideas, products, and brands to life through artistic and imaginative approaches.
                            These services typically include graphic design, content creation, branding, marketing strategies, video
                            production, web design, photography, illustration, copywriting, and more.
                        </motion.p>
                    </div>
                    <motion.div 
                        className="w-full min-h-fit relative lg:block hidden"
                        variants={fadeInUp}
                        transition={transition}
                    >
                        <div className="w-full h-full">
                            <img className="absolute bottom-0 w-full" src="/images/creative-directory/workshop.png" alt="" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div> 
    )
}