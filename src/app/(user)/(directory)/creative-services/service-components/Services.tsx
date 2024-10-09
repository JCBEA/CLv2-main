"use client"

import { Icon } from "@iconify/react/dist/iconify.js"
import { motion } from "framer-motion"
import { Alphabet, ServiceArray } from "./ServiceArray"
import { iconNifyNonColored } from "@/components/layout/Footer"

interface ServiceArrayProps {
    name: string,
    bDay: string,
    description: string,
    imageSrc: string,
    imageBg: string,
    fbLink: string,
    instaLink: string,
    email: string,
    address: string,
}

export const Services = () => {
    return (
        <div className="w-full h-fit pb-[15dvh]">
            <div className="w-full flex flex-col ">
                <CreativeHeader />
                <div className="w-full max-w-[90%] mx-auto grid grid-cols-3 gap-x-14 gap-y-14 py-[15dvh]">
                    {/* cards here */}
                    {ServiceArray.map((user, id) => (
                        <CreativeCards
                            key={id}
                            name={user.name}
                            bDay={user.bDay}
                            description={user.description}
                            imageSrc={user.imageSrc}
                            imageBg={user.imageBg}
                            fbLink={user.fbLink}
                            instaLink={user.instaLink}
                            email={user.email}
                            address={user.address}
                        />
                    ))}

                </div>
            </div>
        </div>
    )
}



const calculateAge = (bDay: string | Date) => {
    const dateNow = new Date();
    const bDayDate = new Date(bDay);

    // Calculate the age based on year difference
    let age = dateNow.getFullYear() - bDayDate.getFullYear();

    // Check if the birthday has passed this year
    const hasBirthdayPassed = (dateNow.getMonth() > bDayDate.getMonth()) ||
        (dateNow.getMonth() === bDayDate.getMonth() && dateNow.getDate() >= bDayDate.getDate());

    // If the birthday hasn't passed yet this year, subtract 1 from the age
    if (!hasBirthdayPassed) {
        age--;
    }

    return age;
};

const CreativeCards: React.FC<ServiceArrayProps> = ({ name, bDay, description, imageSrc, imageBg, fbLink, instaLink, email, address, }) => {
    const age = calculateAge(bDay);
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="w-full border border-gray-400 rounded-xl p-4 bg-secondary-1 shadow-customShadow">
            <div className="flex flex-col ">
                <div className="w-full h-44 relative ">
                    <div className="w-full h-44">
                        <img className="w-full h-full object-cover" src={imageBg || "images/landing-page/eabab.png"} alt="" />
                    </div>
                </div>
                <div className="w-full h-full max-h-32 -mt-6 flex flex-row gap-2 justify-start items-center">
                    <img className="h-32 w-32 z-50 bg-gray-600 rounded-full object-cover" src={imageSrc || "/images/creative-directory/boy.png"} alt="" />
                    <div className="w-full flex flex-col justify-start items-start">
                        <div className="w-full flex flex-row justify-between items-start mt-2">
                            <h4 className="text-xl font-bold">{name}</h4>
                            <div className="flex gap-2">
                                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Icon className="cursor-pointer text-red-400" icon="jam:heart" width="25" height="25" />
                                </motion.span>
                            </div>
                        </div>
                        <div className="w-full flex flex-row justify-between items-start">
                            <p className={`text-xs font-semibold ${description.length > 20 ? "line-clamp-1" : ""}`}>{age}, {address}</p>
                            <span className="flex gap-0.5">
                                {iconNifyNonColored.map((icon, id) => (
                                    <Icon key={id} className="cursor-pointer" icon={icon} width="25" height="25" />
                                ))}
                            </span>
                        </div>
                    </div>

                </div>
                <div className="w-full min-h-32 max-h-fit flex flex-col  pt-4">
                    <div className="w-full h-full max-w-[87%] mx-auto  flex flex-col gap-6 justify-center items-center">
                        <p className={`text-center text-xs font-semibold ${description.length > 100 ? "line-clamp-6" : ""}`}>{description}</p>
                        <CreativeButton />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

const CreativeHeader = () => {
    return (
        <div className="w-full bg-white pt-[12dvh] pb-5 sticky top-0 z-[100]">
            <div className="max-w-[80%] mx-auto flex flex-col gap-8 justify-center items-center">
            <div className="w-full max-w-[70%] mx-auto relative">
                <input className="placeholder:text-primary-2 text-lg font-medium rounded-full bg-quaternary-2 ring-none outline-none w-full py-3 px-14" type="text" placeholder="Search" />
                <Icon className="absolute cursor-pointer top-1/2 -translate-y-1/2 right-4 text-primary-2" icon="tabler:send-2" width="25" height="25" />
                <Icon className="absolute cursor-pointer top-1/2 -translate-y-1/2 left-4 text-primary-2" icon="f7:menu" width="25" height="25" />
            </div>
            <div className="w-full flex flex-row justify-center items-center gap-6  ">
                <div className="w-fit h-fit bg-quaternary-2 rounded-full p-2">
                    <Icon className=" text-primary-2 cursor-pointer " icon="line-md:heart-twotone" width="35" height="35" />
                </div>
                <div className="w-full ">
                    <div className="placeholder:text-primary-2 text-xl font-bold rounded-full bg-quaternary-2 py-1.5 ring-none outline-none w-full px-8 flex justify-between items-center">
                        {Alphabet.map((letter, index) => (
                            <motion.span
                                whileHover={{ scale: 1.5, color: "#1b7a8e" }}
                                whileTap={{ scale: 0.9 }}
                                className="cursor-pointer p-2" key={index}>{letter}</motion.span>
                        ))}
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

const CreativeButton = () => {
    return (
        <motion.div
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="w-full h-fit flex flex-row-reverse gap-2 justify-center items-center text-primary-2">
            <button className="py-2 bg-primary-1 rounded-full uppercase w-56 font-bold text-base">view gallery</button>
            <Icon icon="tabler:send" width="30" height="30" />
        </motion.div>
    )
}

