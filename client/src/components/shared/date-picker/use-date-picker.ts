import { useState } from 'react';

export const useDatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [showDay, setShowDay] = useState(false);
  const [showMonth, setShowMonth] = useState(false);
  const [showYear, setShowYear] = useState(false);

  const getDays = () => {
    const totalDays = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    const days: number[] = [];
    for (let i = 1; i <= totalDays; i++) days.push(i);

    return days;
  };

  const getYears = () => {
    const newDate = new Date();
    const currentYear = newDate.getFullYear();
    const years: number[] = [];
    for (let i = currentYear; i > currentYear - 20; i--) {
      years.push(i);
    }

    return years;
  };

  const updateDay = (day: number) => {
    console.log(day);
    const currentDate = date;
    currentDate.setDate(day);
    setDate(currentDate);
    setShowDay(false);
  };

  const updateMonth = (month: number) => {
    const currentDate = date;
    currentDate.setMonth(month);
    setDate(currentDate);
    setShowMonth(false);
  };

  const updateYear = (year: number) => {
    const currentDate = date;
    currentDate.setFullYear(year);
    setDate(currentDate);
    setShowYear(false);
  };

  return {
    states: { date, showDay, showMonth, showYear },
    handlers: {
      setShowDay,
      setShowMonth,
      setShowYear,
      getDays,
      getYears,
      updateDay,
      updateMonth,
      updateYear,
    },
  };
};
