import React, { useState, useEffect } from 'react';
import waspLogo from './waspLogo.png';
import Calendar from 'react-calendar';
import './Main.css';
import 'react-calendar/dist/Calendar.css';

// Define public holidays
const publicHolidays = [
  new Date('2024-01-01'),
  new Date('2024-01-24'),
  new Date('2024-03-11'),
  new Date('2024-03-29'),
  new Date('2024-03-30'),
  new Date('2024-03-31'),
  new Date('2024-04-01'),
  new Date('2024-04-25'),
  new Date('2024-06-10'),
  new Date('2024-11-05'),
  new Date('2024-12-25'),
  new Date('2024-12-26'),
  new Date('2023-01-01'),
  new Date('2023-01-02'),
  new Date('2023-01-26'),
  new Date('2023-03-13'),
  new Date('2023-04-07'),
  new Date('2023-04-08'),
  new Date('2023-04-09'),
  new Date('2023-04-10'),
  new Date('2023-04-25'),
  new Date('2023-06-12'),
  new Date('2023-09-29'),
  new Date('2023-11-07'),
  new Date('2023-12-25'),
  new Date('2023-12-26'),
];

const isPublicHoliday = (date) => {
  return publicHolidays.some(holiday => holiday.toDateString() === date.toDateString());
};

const getWorkingDaysInMonth = (year, month) => {
  const date = new Date(year, month, 1);
  let workingDays = 0;

  while (date.getMonth() === month) {
    const day = date.getDay();
    if (day !== 0 && day !== 6 && !isPublicHoliday(date)) { // Exclude weekends and public holidays
      workingDays++;
    }
    date.setDate(date.getDate() + 1);
  }

  return workingDays;
};

export const MainPage = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [totalSelectedDays, setTotalSelectedDays] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleDateClick = (date) => {
    if (isPublicHoliday(date)) {
      return; // Do not select public holidays
    }

    const dateString = date.toDateString();
    const isDateSelected = selectedDates.some(selectedDate => selectedDate.toDateString() === dateString);

    if (isDateSelected) {
      // Date already selected, remove it
      setSelectedDates(prevDates => prevDates.filter(selectedDate => selectedDate.toDateString() !== dateString));
    } else {
      // Add new date
      setSelectedDates(prevDates => [...prevDates, date]);
    }
  };

  useEffect(() => {
    setTotalSelectedDays(selectedDates.length);
  }, [selectedDates]);

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    setCurrentMonth(activeStartDate);
  };

  const workingDaysInCurrentMonth = getWorkingDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  const AttendencePercentage = (totalSelectedDays / workingDaysInCurrentMonth * 100).toFixed(2);

  return (
    <div className="app">
      <a
        className="button button-filled feedback-button"
        href="https://forms.gle/bKrRYRpMPskL7bXn8"
        target="_blank"
        rel="noreferrer noopener"
      >
        Feedback
      </a>

      <a
        className="button button-filled donate-button"
        href="https://donate.stripe.com/test_7sIfZ58q18Gt9gs8wy"
        target="_blank"
        rel="noreferrer noopener"
      >
        Donate!
      </a>
      <div className="container">
        <h1 className="welcome-title">
            Welcome to <em>OfficeHoursCalculator</em>
        </h1>
        <main>
          <div className="logo">
            <a></a>
          </div>
          
          <div className="Calendar">
            <Calendar
              onClickDay={handleDateClick}
              onActiveStartDateChange={handleActiveStartDateChange}
              tileClassName={({ date }) => {
                if (isPublicHoliday(date)) {
                  return 'holiday'; // Apply holiday styling
                }
                return selectedDates.some(selectedDate => selectedDate.toDateString() === date.toDateString()) ? 'selected' : null;
              }}
            />
          </div>

          <h5 className="welcome-subtitle">
            left click to select office days and left click again to unselect
          </h5>

          <div className="selected-info">
            <p>Total selected days: {totalSelectedDays}</p>
            <p>Working days in current month: {workingDaysInCurrentMonth}</p>
            <p>Attendance Percentage: {AttendencePercentage}%</p>
          </div>
        </main>

        <footer>
          <p>&copy; 2024 ANZHoursCalculator. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};
