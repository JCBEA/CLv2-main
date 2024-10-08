"use client";
import { TopCreatives } from "./TopCreatives";

interface UserCardProps {
    name: string
    image: string
    description: string
}

export const ServiceCreatives = () => {
    return (
        <div className="w-full h-fit pb-[15dvh] border border-black relative">
            <div className="w-full h-full flex flex-col gap-[10dvh] justify-center items-center">
                <h1 className="uppercase font-bold text-5xl">
                    top creatives
                </h1>
                <div className="w-full relative border border-black">
                    <div className="w-full max-w-[90%] border border-black mx-auto">
                        <div className="w-full h-fit grid grid-cols-3 gap-8">
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
                    <div className="w-full h-[70%] absolute top-1/2 -translate-y-1/2 right-0 flex justify-center items-center bg-shade-1">

                    </div>
                </div>
            </div>
        </div>
    )
}

const UserCards: React.FC<UserCardProps> = ({ name, image, description }) => {
    return (
        <div className="p-4 border border-black bg-secondary-1 z-50 shadow-customShadow flex justify-center items-center gap-4 rounded-3xl">
            <div className="w-full max-w-36 h-36 rounded-full overflow-hidden border border-black">
                <img className="border border-black w-full max-w-36 h-36 object-cover" src={image} alt="" />
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