export const Footer = () => {
  return (
    <div className="w-full md:h-[25dvh] h-[15dvh] bg-primary-1 ">
      <div className="w-full h-full md:max-w-[80%] max-w-[90%] mx-auto  flex flex-col justify-center items-center md:gap-6 gap-2">
        <div className="w-full h-fit flex flex-col gap-2 font-medium text-sm">
          <p>All Rights Reserved.</p>
          <p>visit our social media accounts</p>
        </div>
        <div className="w-full h-fit flex md:gap-6 gap-4">
          {svgIcons.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`social media icon ${index + 1}`}
              className="w-8 h-8"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const svgIcons = ["/SVG/mail.svg", "/SVG/fb.svg", "/SVG/insta.svg"];
