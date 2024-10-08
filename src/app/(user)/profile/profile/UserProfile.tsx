"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { Calendar } from "./Calendar";
import { Messages } from "./Messages";

export interface UserDetail {
  first_name: string;
  creative_field: string;
  address: string;
  mobileNo: string;
  bio: string;
  instagram: string;
  facebook: string;
  twitter: string;
  portfolioLink: string;
}

interface UserProfileProps {
  userDetail: UserDetail; // Expecting the userDetail as a prop
}

interface ProfileButtonProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userDetail }) => {
  const [open, setOpen] = useState(false); // State to control Calendar and Messages

  return (
    <div className="min-h-dvh w-full text-primary-2">
      <div className="w-full xl:max-w-[65%] lg:max-w-[80%] max-w-[90%] lg:px-8 mx-auto h-fit py-[12dvh]">
        <div className="w-full h-full flex flex-col">
          <h1 className="uppercase font-semibold text-3xl lg:block hidden">
            Creative profile
          </h1>
          <div className="w-full h-full mt-28">
            <div className="w-full h-fit bg-primary-3 rounded-xl shadow-lg relative">
              <ProfileDetails userDetail={userDetail} />
              <OtherDetails userDetail={userDetail} />
              <ProfileButton open={open} setOpen={setOpen} />

              {/* Conditional rendering based on the open state */}
              {open ? <Messages /> : <Calendar />}

              <Icon
                className="absolute top-2 right-2 cursor-pointer"
                icon="material-symbols-light:edit-square-outline"
                width="35"
                height="35"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileDetails: React.FC<{ userDetail: UserDetail }> = ({ userDetail }) => {
  return (
    <div className="w-full md:max-w-[80%] mx-auto flex lg:flex-row flex-col justify-start lg:items-start items-center gap-8 lg:h-36 h-fit text-secondary-1">
      <div className=" -mt-20">
        <div className="w-48 h-48 bg-gray-400 rounded-full aspect-square"></div>
      </div>
      <div className="h-full w-full flex lg:flex-row flex-col lg:justify-start justify-center lg:gap-12 gap-4 items-center lg:mt-4 lg:pb-0 pb-4">
        <h1 className="text-3xl font-bold">{userDetail.first_name}</h1>
        <div className="flex flex-row justify-row items-center gap-4">
          <Icon icon="circum:instagram" width="35" height="35" />
          <Icon icon="uit:facebook-f" width="35" height="35" />
          <Icon icon="fluent:mail-28-regular" width="35" height="35" />
        </div>
      </div>
    </div>
  );
};

const OtherDetails: React.FC<{ userDetail: UserDetail }> = ({ userDetail }) => {
  return (
    <div className="w-full h-fit py-12 bg-shade-8">
      <div className="w-full md:max-w-[80%] max-w-[90%] mx-auto flex flex-col gap-1.5">
        <UserDetailDisplay userDetail={userDetail} /> {/* Use the renamed component */}
        <div className="pt-8 w-full flex justify-center items-center">
          <Button />
        </div>
      </div>
    </div>
  );
};

const UserDetailDisplay = ({ userDetail }: { userDetail: UserDetail }) => {
  return (
    <>
      <small className="font-bold text-primary-2 opacity-80 capitalize">
        Name
      </small>
      <p className="text-primary-2 font-bold">{userDetail.first_name}</p>
      <small className="font-bold text-primary-2 opacity-80 capitalize">
        Creative Field
      </small>
      <p className="text-primary-2 font-bold">{userDetail.creative_field}</p>
      <small className="font-bold text-primary-2 opacity-80 capitalize">
        Address
      </small>
      <p className="text-primary-2 font-bold">{userDetail.address}</p>
      <small className="font-bold text-primary-2 opacity-80 capitalize">
        Mobile Number
      </small>
      <p className="text-primary-2 font-bold">{userDetail.mobileNo}</p>
      <small className="font-bold text-primary-2 opacity-80 capitalize">
        Bio
      </small>
      <p className="text-primary-2 font-bold">{userDetail.bio}</p>
      <small className="font-bold text-primary-2 opacity-80 capitalize">
        Instagram
      </small>
      <p className="text-primary-2 font-bold">{userDetail.instagram}</p>
      <small className="font-bold text-primary-2 opacity-80 capitalize">
        Facebook
      </small>
      <p className="text-primary-2 font-bold">{userDetail.facebook}</p>
      <small className="font-bold text-primary-2 opacity-80 capitalize">
        Twitter
      </small>
      <p className="text-primary-2 font-bold">{userDetail.twitter}</p>
      <small className="font-bold text-primary-2 opacity-80 capitalize">
        Portfolio Link
      </small>
      <p className="text-primary-2 font-bold">{userDetail.portfolioLink}</p>
    </>
  );
};


const Button = () => {
  return (
    <motion.button
      className="bg-shade-1 text-secondary-1 uppercase py-3 w-full md:max-w-xs text-xl rounded-lg font-semibold"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Add Your Work
    </motion.button>
  );
};

const ProfileButton: React.FC<ProfileButtonProps> = ({ open, setOpen }) => {
  return (
    <div className="w-full h-fit flex bg-shade-8">
      <button
        onClick={() => setOpen(false)}
        className={`w-full py-4 font-bold text-lg uppercase flex justify-center items-center gap-2 ${
          !open ? "bg-shade-1" : "bg-shade-8"
        } rounded-tr-lg overflow-hidden`}
      >
        <Icon icon="ph:calendar-dots-thin" width="35" height="35" />
        Schedule
      </button>
      <button
        onClick={() => setOpen(true)}
        className={`w-full py-4 font-bold text-lg uppercase flex justify-center items-center gap-2 ${
          open ? "bg-shade-1" : "bg-shade-8"
        } rounded-tl-lg`}
      >
        <Icon icon="arcticons:mail" width="35" height="35" />
        Messages
      </button>
    </div>
  );
};
