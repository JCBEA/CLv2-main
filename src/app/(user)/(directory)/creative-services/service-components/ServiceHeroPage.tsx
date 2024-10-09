"use client"

import { Icon } from "@iconify/react/dist/iconify.js"

export const ServiceHeroPage = () => {
    return (
        <div className="w-full h-dvh">
            <div className="w-full pt-[20dvh] flex flex-col gap-5 max-w-[70%] mx-auto">
                <div className="w-full relative flex justify-start items-start">
                    <h1 className="uppercase font-semibold text-5xl">discover</h1>
                    <Icon className="absolute top-1 -left-16" icon="ic:round-arrow-back" width="40" height="40" />
                </div>
                <div className="w-full flex">
                    <div className="w-full max-w-[45%] flex flex-col gap-6 justify-start items-start">
                        <h1 className="uppercase leading-snug w-full max-w-sm font-extrabold text-7xl mt-12">Creative services</h1>
                        <p className="w-full max-w-2xl text-base font-medium">
                            Creative services encompass a wide range of professional offerings designed to help businesses
                            and individuals bring their ideas, products, and brands to life through artistic and imaginative approaches.
                            These services typically include graphic design, content creation, branding, marketing strategies, video
                            production, web design, photography, illustration, copywriting, and more.
                        </p>
                    </div>
                    <div className="w-full min-h-fit relative">
                        <div className="w-full h-full">
                            <img className="absolute bottom-0 w-full" src="/images/creative-directory/workshop.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}