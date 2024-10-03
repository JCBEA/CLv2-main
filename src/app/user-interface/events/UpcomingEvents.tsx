"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { EventDetails } from "./EventDetails";

interface ButtonProp {
  list: boolean;
  setList: React.Dispatch<React.SetStateAction<boolean>>;
}

// Helper to group events by date
const groupEventsByDate = (events: { date: string }[]) => {
  return events.reduce((acc: { [key: string]: any[] } = {}, event) => {
    if (!acc[event.date]) {
      acc[event.date] = [];
    }
    acc[event.date].push(event);
    return acc;
  }, {});
};

export const UpcomingEvents = () => {
  // State to store the current month and year
  const [currentMonthYear, setCurrentMonthYear] = useState("");

  useEffect(() => {
    const date = new Date();
    const options = { month: "long" as const, year: "numeric" as const };
    setCurrentMonthYear(date.toLocaleDateString("en-US", options)); // "September 2024"
  }, []);

  return (
    <div className="w-full h-fit min-h-dvh max-w-[90%] mx-auto py-[5dvh] flex flex-col gap-6">
      <div className="w-full">
        <h1 className="font-extrabold text-6xl text-primary-3 uppercase text-center">
          upcoming events
        </h1>
      </div>
      {/* Calendar showing the current date or month year */}
      <div className="w-full h-fit flex justify-center items-center pb-12">
        <div className="w-fit flex gap-6 justify-center items-center">
          {/* arrow */}
          <Icon icon="ph:arrow-left" className="" width="35" height="35" />
          {/* month and year */}
          <h1 className="font-bold text-5xl">{currentMonthYear}</h1>
          {/* arrow */}
          <Icon
            icon="ph:arrow-left"
            className="rotate-180"
            width="35"
            height="35"
          />
        </div>
      </div>
      {/* Event Grid */}
      <EventGrid />
    </div>
  );
};

const EventGrid = () => {
  const [list, setList] = useState<boolean>(true); // State to track the view type (list or grid)

  // Group events by date
  const groupedEvents = groupEventsByDate(EventDetails);

  // Sort the dates in ascending order
  const sortedDates = Object.keys(groupedEvents).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <div className="w-full h-fit flex flex-col gap-12 relative border border-black">
      <ListButton list={list} setList={setList} />
      {sortedDates.map((date, groupIndex) => (
        <div key={date}>
          {/* Date heading */}
          <h1 className="font-bold text-4xl uppercase pb-8 md:text-left text-center">
            {new Date(date).toLocaleDateString("en-US", {
              day: "numeric",
              weekday: "long",
            })}
          </h1>
          {/* Event grid or list based on toggle */}
          <div
            className={`w-full h-fit ${
              list
                ? "flex flex-col gap-4" // For list view
                : "grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-12" // For grid view
            }`}
          >
            {groupedEvents[date].map((event) => (
              <EventCard
                event={event}
                key={event.title}
                groupIndex={groupIndex}
                list={list} // Pass the actual list state here
              />
            ))}
          </div>
          <div className="w-full h-[1px] bg-primary-1 mt-12"></div>
        </div>
      ))}
    </div>
  );
};

// Add groupIndex as a prop to determine the color scheme
const EventCard: React.FC<{
  event: any;
  groupIndex: number;
  list: boolean;
}> = ({ event, groupIndex, list }) => {
  // Get color classes based on the group index (date index)
  const colorClasses = getColorClasses(groupIndex);

  return (
    <motion.div
    whileHover={list ? { backgroundColor: "transparent" } : {scale: 1.05, backgroundColor: "transparent"}}
      className={`w-full ${
        list ? "flex flex-row gap-6 justify-start items-center" : "max-w-xs mx-auto flex flex-col gap-4"
      }  ${colorClasses.bgColor} border-2 ${
        colorClasses.border
      } duration-500 p-4 text-base group`}
    >
      <div className={`${list ? "h-24 w-full max-w-44" : "h-48 w-full"}`}>
        <img
          className={`object-cover ${list ? "w-44 h-24" : "h-48 w-full"}`} // Change to 24px (6 in Tailwind's default scale) by 24px
          src={event.coverPhoto}
          alt={event.title} // Use event.title for accessibility
        />
      </div>
 
      <div
        className={`w-full flex  gap-4 ${
          list ? "flex-col-reverse" : "flex-col"
        }`}
      > 
        <div className="w-full flex justify-between items-center">
          <div className="w-fit flex flex-col leading-3">
            <p className={`font-bold duration-500 ${colorClasses.textColor}`}>
              {event.strTime} - {event.endTime}
            </p>
            <p className="text-sm capitalize font-medium">{event.location}</p>
          </div>
          <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
            <Icon
              className={`rotate-180 -mt-4 cursor-pointer duration-300 ${
                colorClasses.textColor
              } ${list ? "hidden" : "block"}`}
              icon="ph:arrow-left-bold"
              width="25"
              height="25"
            />
          </motion.div>
        </div>
        <div className="w-full">
          <h1
            className={`w-full text-xl font-semibold title duration-300 ${colorClasses.textColor} ${list ? "max-w-full" : "max-w-56"}`}
          >
            {event.title}
          </h1>
        </div>
      </div>
      {/* Render Event Register Button */}
      <EventRegisterButton colorClasses={colorClasses} list={list} />
    </motion.div>
  );
};

const EventRegisterButton = ({ colorClasses, list }: any) => {
  return (
    <motion.button
      className={` px-6 py-1.5 bg-primary-1 text-secondary-2 font-medium transition-colors duration-500 ease-in-out 
        ${colorClasses.bgHover} 
        ${colorClasses.textHover}
        ${list ? "w-fit px-6 whitespace-nowrap" : "w-full"}
        `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Register for free
    </motion.button>
  );
};

const ListButton: React.FC<ButtonProp> = ({ list, setList }) => {
  return (
    <motion.button
      className="w-44 absolute top-0 right-0 py-1.5 bg-secondary-1 border-2 border-secondary-2 text-secondary-2 font-medium transition-colors duration-500 ease-in-out"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setList((prev) => !prev)} // Toggle the view when button is clicked
    >
      {list ? "Show as Grid" : "Show as List"}
    </motion.button>
  );
};

// Function to return dynamic color classes based on groupIndex
const getColorClasses = (index: number) => {
  // Using index % 3 to cycle through the color schemes
  switch (index % 3) {
    case 0: // Green theme
      return {
        bgColor: "bg-shade-2",
        textColor: "group-hover:text-shade-3",
        border: "border-shade-2",
        bgHover: "group-hover:bg-shade-3",
        textHover: "group-hover:text-white",
      };
    case 1: // Violet theme
      return {
        textColor: "group-hover:text-shade-4",
        bgColor: "bg-shade-5",
        border: "border-shade-5",
        bgHover: "group-hover:bg-shade-4",
        textHover: "group-hover:text-white",
      };
    case 2: // Orange theme
      return {
        bgColor: "bg-shade-1",
        textColor: "group-hover:text-primary-3",
        border: "border-shade-1",
        bgHover: "group-hover:bg-primary-3",
        textHover: "group-hover:text-white",
      };
    default:
      return {
        bgColor: "bg-gray-500",
        textColor: "text-gray-500",
        border: "border-gray-500",
        bgHover: "group-hover:bg-gray-500",
        textHover: "group-hover:text-white",
      };
  }
};
