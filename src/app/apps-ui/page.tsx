"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./(pages)/loader/loader.css";

const heroImages = [
  "/intro/img1.jpg",
  "/intro/img2.jpg",
  "/intro/img3.jpg",
  "/intro/img4.jpg",
  "/intro/img5.jpg",
  "/intro/img6.jpg",
  "/intro/img7.png",
];

// Define HomeProps interface for Loader component props
export interface HomeProps {
  setContentLoaded?: React.Dispatch<React.SetStateAction<boolean>>;
}

// Loader component
const Loader: React.FC<HomeProps> = ({ setContentLoaded }) => {
  const router = useRouter();
  const [contentFullyLoaded, setContentFullyLoaded] = useState(false);

  const digit1Ref = useRef<HTMLDivElement>(null);
  const digit2Ref = useRef<HTMLDivElement>(null);
  const digit3Ref = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !progressBarRef.current ||
      !digit1Ref.current ||
      !digit2Ref.current ||
      !digit3Ref.current ||
      !heroRef.current
    ) {
      return;
    }

    gsap.set("nav", { y: -150 });

    const animate = (digit: HTMLElement, duration: number, delay = 1) => {
      const numElement = digit.querySelector(".num");
      if (numElement instanceof HTMLElement) {
        const numHeight = numElement.clientHeight;
        const totalDistance =
          (digit.querySelectorAll(".num").length - 1) * numHeight;
        gsap.to(digit, {
          y: -totalDistance,
          duration,
          delay,
          ease: "power2.inOut",
        });
      }
    };

    animate(digit3Ref.current, 5);
    animate(digit2Ref.current, 6);
    animate(digit1Ref.current, 2, 5);

    gsap
      .timeline()
      .to(progressBarRef.current, {
        width: "30%",
        duration: 2,
        ease: "power4.inOut",
        delay: 7,
      })
      .to(progressBarRef.current, {
        width: "100%",
        opacity: 0,
        duration: 2,
        ease: "power3.out",
      })
      .set(".pre-loader", { display: "none" })
      .to(".hero-imgs > img", {
        clipPath: "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)",
        duration: 1,
        ease: "power4.inOut",
        stagger: 0.25,
      })
      .to(
        heroRef.current,
        { scale: 1.25, duration: 3, ease: "power3.inOut" },
        "-=2"
      )
      .to("nav", { y: 0, duration: 1, ease: "power3.out" })
      .to(
        "h1 span",
        {
          top: "0px",
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5"   
      )
      .eventCallback("onComplete", () => {
        if (setContentLoaded) {
          setContentLoaded(true);
        }
        window.dispatchEvent(new Event("contentLoaded"));
        setContentFullyLoaded(true);
        // Redirect to the pofcon landing page
        router.push("/apps-ui/pofcon-landing-page");
      });
  }, [setContentLoaded, router]);

  return (
    <main className={`gege overflow-x-hidden ${!contentFullyLoaded ? "no-scroll" : ""}`}>
      <section ref={heroRef} className="hero">
        <div className="pre-loader font-extrabold">
          <p>loading</p>
          <div className="counter">
            <div className="digit-1" ref={digit1Ref}>
              <div className="num">0</div>
              <div className="num offset">1</div>
            </div>
            <div className="digit-2" ref={digit2Ref}>
              {[...Array(11)].map((_, i) => (
                <div key={i} className="num">
                  {i % 10}
                </div>
              ))}
            </div>
            <div className="digit-3" ref={digit3Ref}>
              {[...Array(11)].map((_, i) => (
                <div key={i} className="num">
                  {i % 10}
                </div>
              ))}
            </div>
            <div className="digit-4">%</div>
          </div>
          <div className="progress-bar" ref={progressBarRef} />
        </div>
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
    </main>
  );
};

// Exporting Loader component as the default export
export default Loader;
