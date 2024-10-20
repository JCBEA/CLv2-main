import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { CalendarModal } from './(modals)/CalendarModal';
import { ToastContainer } from 'react-toastify';

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
  const [selectedDay, setSelectedDay] = useState<Date | null>(null); // Selected day

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
    setSelectedDay(null);  // Reset the selected day
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
        <div key={`empty-${i}`} className="calendar-day border border-gray-700 flex items-start justify-start p-2" />
      );
    }
  
    // Add cells for the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div
          key={day}
          className="calendar-day border border-gray-700 flex items-start justify-start p-2 cursor-pointer"
          onClick={() => handleDayClick(day)}  // Open modal when clicked
        >
          {day}
        </div>
      );
    }
  
    return days;
  };
  

  return (
    <div className="w-full md:p-6 bg-shade-1 rounded-b-xl">
      {/* Pass the selectedDay as a Date object */}
      <CalendarModal isOpen={isModalOpen} onClose={closeModal} closeHandler={closeModal} selectedDay={selectedDay ?? new Date()} />
      
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
