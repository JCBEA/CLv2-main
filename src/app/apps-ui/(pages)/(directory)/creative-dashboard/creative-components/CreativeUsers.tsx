"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { CreativeService } from "./CreativeArray"; // Adjust if file name differs
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CreativeArrayProps {
    first_name: string;
    bday: string;
    bio: string;
    profile_pic: string;
    imageBg: string;
}

export const CreativeUsers = () => {
    const [creativeUsers, setCreativeUsers] = useState<CreativeArrayProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await CreativeService.fetchCreativeUsers();
                setCreativeUsers(users);
            } catch (error) {
                setError("Failed to load creatives.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <p>Loading creatives...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="w-full h-fit pb-[15dvh]">
            <div className="w-full h-full flex flex-col md:max-w-[80%] max-w-[90%] mx-auto">
                <div className="w-full p-6">
                    <h1 className="md:w-full w-fit mx-auto lg:text-5xl md:text-4xl text-2xl font-semibold uppercase md:text-left text-center leading-tight">meet our creatives</h1>
                </div>
                <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 lg:gap-16 md:gap-8 lg:gap-y-24 md:gap-y-12 gap-y-8 p-6">
                    {creativeUsers.map((user, id) => (
                        <UserCard key={id} first_name={user.first_name} bday={user.bday} bio={user.bio} profile_pic={user.profile_pic} imageBg={user.imageBg} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const calculateAge = (bDay: string | Date) => {
    const dateNow = new Date();
    const bDayDate = new Date(bDay);
    let age = dateNow.getFullYear() - bDayDate.getFullYear();
    const hasBirthdayPassed = dateNow.getMonth() > bDayDate.getMonth() ||
                              (dateNow.getMonth() === bDayDate.getMonth() && dateNow.getDate() >= bDayDate.getDate());
    if (!hasBirthdayPassed) age--;
    return age;
};

const UserCard = ({ first_name, bday, bio, profile_pic, imageBg }: CreativeArrayProps) => {
    const age = calculateAge(bday);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            className="w-full border border-gray-400 rounded-xl p-4 bg-secondary-1 shadow-customShadow">
            <div className="flex flex-col">
                <div className="w-full h-52 relative">
                    <img className="w-full h-full object-cover" src={imageBg || "../images/landing-page/eabab.png"} alt="" />
                </div>
                <div className="w-full h-full max-h-28 -mt-8 flex justify-between items-center">
                    <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><Icon className="cursor-pointer" icon="jam:heart" width="35" height="35" /></motion.span>
                    <img className="h-28 w-28 z-50 rounded-full object-cover" src={profile_pic || "../images/creative-directory/boy.png"} alt="" />
                    <div className="w-4"></div>
                </div>
                <div className="w-full min-h-32 max-h-fit mt-6">
                    <div className="w-full h-full max-w-[87%] mx-auto flex flex-col gap-2 justify-center items-center">
                        <h6 className="text-center text-2xl font-bold">{first_name}, {age}</h6>
                        <p className={`text-center text-xs font-semibold ${bio.length > 100 ? "line-clamp-6" : ""}`}>{bio}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
