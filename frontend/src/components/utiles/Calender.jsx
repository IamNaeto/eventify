import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CustomCalendar = () => {
  const [value, setValue] = useState(new Date());

  const onChange = (date) => {
    setValue(date);
  };

  const tileClassName = ({ date, view }) => {
    // Check if the tile date is today's date
    if (
      view === 'month' &&
      date.getDate() === new Date().getDate() &&
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear()
    ) {
      return 'react-calendar__tile--now';
    }

    // Check if the tile date is the selected date
    if (
      view === 'month' &&
      date.getDate() === value.getDate() &&
      date.getMonth() === value.getMonth() &&
      date.getFullYear() === value.getFullYear()
    ) {
      return 'react-calendar__tile--selected';
    }

    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Calendar
        onChange={onChange}
        value={value}
        tileClassName={tileClassName}
        className="w-full rounded-xl border-2 border-[#EBEBEB] shadow-md p-2 text-[#33313E]"
      />
    </div>
  );
};

export default CustomCalendar;
