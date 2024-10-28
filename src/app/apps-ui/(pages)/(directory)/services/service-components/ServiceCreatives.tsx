"use client";

import { ServiceArray, TopCreatives } from "./ServiceArray";

interface UserCardProps {
    name: string
    image: string
    description: string
}



export const ServiceCreatives = () => {
    return (
        <div className="w-full h-fit relative">
            <div className="w-full h-full flex flex-col gap-[10dvh] justify-center items-center">
                <h1 className="uppercase font-bold lg:text-5xl text-4xl w-full max-w-full lg:max-w-[70%] lg:text-left text-center ">
                    top creatives
                </h1>
                <div className="w-full relative">
                    <div className="w-full max-w-[90%] mx-auto">
                        <div className="w-full h-fit grid lg:grid-cols-3 grid-cols-1 gap-8 p-4">
                            {TopCreatives.map((user, id) => (
                                <UserCards
                                    key={id}
                                    name={user.name}
                                    image={user.src}
                                    description={user.description}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="w-full lg:h-[70%] h-full absolute top-1/2 -translate-y-1/2 right-0 flex justify-center items-center bg-shade-1">

                    </div>
                </div>
            </div>
        </div>
    )
}

const UserCards: React.FC<UserCardProps> = ({ name, image, description }) => {
    return (
        <div className="p-4 bg-secondary-1 z-50 shadow-customShadow flex justify-center items-center gap-4 rounded-3xl">
            <div className="w-full max-w-36 h-36 rounded-full overflow-hidden">
                <img className="w-full max-w-36 h-36 object-cover" src={image} alt="" />
            </div>
            <div className="w-full flex flex-col justify-center items-start gap-2">
                <h1 className="font-semibold text-2xl">{name}</h1>
                <p className={`font-normal text-sm ${description.length > 100 ? "line-clamp-5" : ""}`}>
                    {description}
                </p>
            </div>
        </div>
    )
}