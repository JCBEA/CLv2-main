"use client";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

interface AdminEvent {
  id: number;
  title: string;
  location: string;
  date: string;
  start_time: string;
  end_time: string;
  desc: string;
  image: string;
  created_at: string;
  status: boolean;
}

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export const CalendarEvent: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState<AdminEvent[]>([]);
  const [dateColorMap, setDateColorMap] = useState<Map<string, { bgColor: string; textColor: string }>>(new Map());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) throw new Error("Error fetching events");

        const events = await response.json();
        setData(events);
        assignColorsToDates(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchData();
  }, []);

  const assignColorsToDates = (events: { date: string }[]) => {
    const colorMap = new Map<string, { bgColor: string; textColor: string }>();
    let colorIndex = 0;
    events.forEach((event) => {
      if (!colorMap.has(event.date)) {
        const colorClasses = getColorClasses(colorIndex);
        colorMap.set(event.date, colorClasses);
        colorIndex = (colorIndex + 1) % 3;
      }
    });
    setDateColorMap(colorMap);
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const renderEventsForDay = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const formattedDate = date.toISOString().slice(0, 10);

    const eventsForDay = data.filter((event) => event.date === formattedDate);

    if (eventsForDay.length === 0) {
      return null;
    }

    return (
      <div className="events mt-1">
        {eventsForDay.map((event, index) => {
          const { bgColor, textColor } = dateColorMap.get(event.date) || { bgColor: "bg-gray-500", textColor: "text-gray-500" };
          return (
            <div
              key={index}
              className={`event-item text-sm mt-2 ${bgColor} p-2 rounded`}
            >
              <div className="w-full flex flex-col gap-2 justify-center items-center">
                <div className="w-full flex justify-center items-center gap-2 h-16 aspect-square">
                  <img
                    className="w-full h-full object-cover"
                    src={event.image}
                    alt={event.title}
                  />
                  <p className={`text-xs font-semibold ${textColor}`}>
                    {event.start_time} to {event.end_time}
                  </p>
                </div>
                <p className={`text-sm font-medium ${textColor}`}>
                  {event.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayIndex = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayIndex; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="calendar-day border border-gray-700 flex items-start justify-start p-2"
        />
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div
          key={day}
          className="calendar-day border border-gray-700 flex flex-col items-start justify-start p-2 min-h-36"
        >
          <div className="day-number">{day}</div>
          {renderEventsForDay(day)}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="w-full max-w-[90%] mx-auto md:p-6 bg-shade-2 my-[10dvh] border border-black lg:block hidden">
      <h1 className="text-5xl font-semibold pl-4 title pb-8">
        Events Calendar
      </h1>
      <div className="w-full flex flex-col p-4 rounded-lg">
        <div className="w-full flex flex-row justify-between items-center pb-12">
          <div className="w-fit gap-8 flex justify-center items-center">
            <button onClick={prevMonth} className="cursor-pointer">
              <Icon icon="ph:arrow-left" width="35" height="35" />
            </button>
            <h2 className="text-xl font-semibold">
              {currentDate.toLocaleString("default", { month: "long", year: "numeric" }).toUpperCase()}
            </h2>
            <button onClick={nextMonth} className="cursor-pointer">
              <Icon icon="ph:arrow-left" className="rotate-180" width="35" height="35" />
            </button>
          </div>
          <button className="border border-secondary-1 px-4 py-2">Filter</button>
        </div>
        <div className="w-full grid grid-cols-7 auto-rows-min gap-0 bg-shade-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center flex justify-center items-center font-semibold text-sm py-2 bg-shade-2">
              {day}
            </div>
          ))}
          {renderCalendarDays()}
        </div>
      </div>
    </div>
  );
};

const getColorClasses = (index: number) => {
  switch (index % 3) {
    case 0:
      return { bgColor: "bg-shade-3", textColor: "text-secondary-1" };
    case 1:
      return { bgColor: "bg-shade-5", textColor: "text-secondary-2" };
    case 2:
      return { bgColor: "bg-shade-1", textColor: "text-secondary-2" };
    default:
      return { bgColor: "bg-gray-500", textColor: "text-gray-500" };
  }
};
