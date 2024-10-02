"use client";
import Image from "next/image";
import { Logo } from "./Logo";

export const Subscribe = () => {
  return (
    <div className="w-full md:h-[35dvh] h-fit md:pb-0 pb-12 bg-primary-2 text-secondary-1">
      <div className="w-full h-full flex md:flex-row flex-col-reverse justify-between items-center max-w-[80%] mx-auto">
        <div className="md:w-full h-full flex flex-col gap-4 justify-center items-start md:text-lg text-base">
          <p className="w-full max-w-sm text-left font-medium">
            Stay in the loop with the latest news, special offers, and insider
            insights.
          </p>
          <div className="w-full max-w-sm relative">
            <input
              className="w-full h-10 border-b-2 p-4 pl-12 border-secondary-1 bg-primary-2 outline-none ring-0"
              type="text"
              placeholder="Sign up your email"
            />
            <svg
              className="text-secondary-1 absolute top-1/2 left-0 -translate-y-1/2"
              width="35"
              height="20"
              viewBox="0 0 44 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M42 6C42 3.8 40.2 2 38 2H6C3.8 2 2 3.8 2 6M42 6V30C42 32.2 40.2 34 38 34H6C3.8 34 2 32.2 2 30V6M42 6L22 20L2 6"
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="w-full h-full flex md:justify-end justify-center items-center py-10">
          <Logo
            width="auto"
            height="auto"
            color="white"
            justifyContent="justify-end"
            itemPosition="items-end"
          />
        </div>
      </div>
    </div>
  );
};
