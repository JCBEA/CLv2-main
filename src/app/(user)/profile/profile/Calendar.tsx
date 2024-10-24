import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { CalendarModal } from './(modals)/CalendarModal';
import { ToastContainer } from 'react-toastify';
import { getSession } from '@/services/authservice';
import { jwtVerify } from 'jose';
import { supabase } from '@/services/supabaseClient';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret';
const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

interface Event {
  id: string;
  event_title: string;
  selected_date: string; // The date format from the backend
  start_time: string;
  end_time: string;
  event_location: string;
}

export const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
  const [selectedDay, setSelectedDay] = useState<Date | null>(null); // Selected day
  const [events, setEvents] = useState<Event[]>([]); // Event state

  // Fetch events from the API

  useEffect(() => {
    const subscription = supabase
    .channel('creative_eventss')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'creative_events'
    }, (payload: any) => {
      setEvents(prev => [...prev, payload.new]);
    })
    .subscribe();

  return () => {
    supabase.removeChannel(subscription);
  };
  }, [])



  useEffect(() => {
    const fetchEvents = async () => {
      const token = getSession();
      if (!token) return;

      try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
        const userId = payload.id as string;
        const response = await fetch('/api/events', {
          method: 'GET',
          headers: {
            'User-ID': userId,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        setEvents(data); // Store the fetched events
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setCurrentDate(today);
  }, []);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDayClick = (day: number) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // month is 0-indexed

    // Create a new date and set the UTC time manually to prevent timezone issues
    const selectedDate = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));

    console.log(selectedDate); // Debugging
    setSelectedDay(selectedDate);
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedDay(null); // Reset the selected day
  };

  const formatDateToCST = (date: Date): string => {
    return new Date(date).toLocaleString('en-US', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0-indexed month
    const firstDay = new Date(year, month, 1); // First day of the month
    const lastDay = new Date(year, month + 1, 0); // Last day of the month

    const daysInMonth = lastDay.getDate(); // Number of days in the month
    const startingDayIndex = firstDay.getDay(); // First day of the month (0 = Sunday)

    const days = [];

    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < startingDayIndex; i++) {
      days.push(
        <div key={`empty-${i}`} className="border border-gray-700 flex items-start justify-start p-2 " />
      );
    }

    // Add cells for the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(year, month, day);
      const currentDayString = formatDateToCST(currentDay); // Use the new format function

      // Filter events where the selected_date matches the formatted current day in CST
      const dayEvents = events.filter((event) => {
        const eventDate = new Date(event.selected_date);
        const formattedEventDate = formatDateToCST(eventDate);
        return formattedEventDate === currentDayString;
      });

      days.push(
        <div
          key={day}
          className="border border-gray-700 flex flex-col items-start justify-start p-2 cursor-pointer hover:bg-gray-500 transition-colors"
          onClick={() => handleDayClick(day)} // Open modal when clicked
        >
          {day}
          {/* Render events if there are any for this day */}
          {dayEvents.length > 0 && (
            <div className="mt-1 text-xs text-blue-500">
              {dayEvents.map((event) => (
                <div key={event.id}>
                  <strong>{event.event_title}</strong>
                  <div>
                    <p>{event.start_time} - {event.end_time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="w-full md:p-6 bg-shade-1 rounded-b-xl">
      {/* Pass the selectedDay as a Date object */}
      <CalendarModal
        isOpen={isModalOpen}
        onClose={closeModal}
        closeHandler={closeModal}
        selectedDay={selectedDay ?? new Date()}
      />

      <div className="w-full flex flex-col p-4 rounded-lg">
        <div className="w-fit gap-8 flex justify-between items-center mb-8 mx-auto">
          <button onClick={prevMonth} className="cursor-pointer">
            <Icon icon="ph:arrow-left" width="35" height="35" />
          </button>
          <h2 className="text-xl font-semibold">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' }).toUpperCase()}
          </h2>
          <button onClick={nextMonth} className="cursor-pointer">
            <Icon icon="ph:arrow-left" className="rotate-180" width="35" height="35" />
          </button>
        </div>

        <div className="w-full h-[70dvh] grid grid-cols-7 auto-rows-fr gap-0 bg-orange-200">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="text-center flex justify-center items-center font-semibold text-sm py-2 bg-shade-1"
            >
              {day}
            </div>
          ))}
          {renderCalendarDays()}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
