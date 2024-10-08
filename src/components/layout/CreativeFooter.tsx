import { Icon } from "@iconify/react/dist/iconify.js";

export const CreativeFooter = () => {
    <div className="w-full md:h-[25dvh] h-[15dvh] bg-primary-1 ">
    <div className="w-full h-full md:max-w-[80%] max-w-[90%] mx-auto  flex flex-col justify-center items-center md:gap-6 gap-2">
      <div className="w-full h-fit flex flex-col gap-2 font-medium text-sm">
        <p>All Rights Reserved.</p>
        <p>visit our social media accounts</p>
      </div>
      <div className="w-full h-fit flex md:gap-6 gap-4">
        {iconNify.map((src, index) => (
          <Icon key={index} icon={src} width="35" height="35" />
        ))}
      </div>
    </div>
  </div>
}

const iconNify = ["iconoir:facebook-tag", "ph:instagram-logo-light", "fluent:mail-28-regular"];