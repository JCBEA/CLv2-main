import { Icon } from "@iconify/react/dist/iconify.js";

export const Footer = () => {
  return (
    <div className="w-full md:h-[25dvh] h-[15dvh] bg-primary-1 ">
      <div className="w-full h-full md:max-w-[80%] max-w-[90%] mx-auto  flex flex-col justify-center items-center md:gap-6 gap-2">
        <div className="w-full h-fit flex flex-col gap-2 font-medium text-sm">
          <p>All Rights Reserved.</p>
          <p>visit our social media accounts</p>
        </div>
        <div className="w-full h-fit flex justify-start items-ce md:gap-4 gap-4 text-primary-2">
        {iconNify.map((src, index) => (
          <Icon className="cursor-pointer" key={index} icon={src} width="35" height="35" />
        ))}
      </div>
      </div>
    </div>
  )
};

// uncomment nalang if trip yung may color na icons
const iconNify = ["devicon:facebook", "skill-icons:instagram", "skill-icons:gmail-light"];

// uncomment nalang if trip yung walang color na icons
// const iconNify = ["iconoir:facebook-tag", "ph:instagram-logo-light", "fluent:mail-28-regular"];