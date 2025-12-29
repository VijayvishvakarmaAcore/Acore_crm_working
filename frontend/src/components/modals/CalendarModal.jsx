// import React, { useState } from 'react';
// import Modal from '../common/Modal';
// import { HOLIDAYS_2024, MONTHS } from '../../data/mockData';
// import { generateCalendar } from '../../utils/helpers';
// import './CalendarModal.css';

// const CalendarModal = ({ isOpen, onClose }) => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const currentYear = currentDate.getFullYear();
//   const currentMonth = currentDate.getMonth();

//   const calendarDays = generateCalendar(currentYear, currentMonth);
//   const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//   const changeMonth = (direction) => {
//     setCurrentDate(prev => {
//       const newDate = new Date(prev);
//       newDate.setMonth(prev.getMonth() + direction);
//       return newDate;
//     });
//   };

//   const isHoliday = (date) => {
//     return HOLIDAYS_2024.some(holiday => holiday.date === date);
//   };

//   const getHolidayName = (date) => {
//     const holiday = HOLIDAYS_2024.find(h => h.date === date);
//     return holiday ? holiday.name : '';
//   };

//   const getUpcomingHolidays = () => {
//     const today = new Date().toISOString().split('T')[0];
//     return HOLIDAYS_2024
//       .filter(holiday => holiday.date >= today)
//       .slice(0, 5);
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title="📅 Holiday Calendar 2024"
//       size="large"
//     >
//       <div className="calendar-modal-content">
//         {/* Calendar Navigation */}
//         <div className="calendar-navigation">
//           <button 
//             className="nav-btn"
//             onClick={() => changeMonth(-1)}
//           >
//             ◀ Previous
//           </button>
          
//           <h3 className="calendar-title">
//             {MONTHS[currentMonth]} {currentYear}
//           </h3>
          
//           <button 
//             className="nav-btn"
//             onClick={() => changeMonth(1)}
//           >
//             Next ▶
//           </button>
//         </div>

//         {/* Calendar Grid */}
//         <div className="calendar-grid">
//           {/* Week Day Headers */}
//           {weekDays.map(day => (
//             <div key={day} className="calendar-cell week-header">
//               {day}
//             </div>
//           ))}
          
//           {/* Calendar Days */}
//           {calendarDays.map((day, index) => {
//             if (day.type === 'empty') {
//               return <div key={`empty-${index}`} className="calendar-cell empty"></div>;
//             }

//             const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day.value).padStart(2, '0')}`;
//             const isHolidayDay = isHoliday(dateStr);
//             const isToday = day.isToday;
//             const isWeekend = day.isWeekend;

//             return (
//               <div
//                 key={`day-${index}`}
//                 className={`calendar-cell day 
//                   ${isToday ? 'today' : ''} 
//                   ${isHolidayDay ? 'holiday' : ''}
//                   ${isWeekend ? 'weekend' : ''}
//                 `}
//                 title={isHolidayDay ? getHolidayName(dateStr) : ''}
//               >
//                 <div className="day-number">{day.value}</div>
//                 {isHolidayDay && (
//                   <div className="holiday-indicator">🎉</div>
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         {/* Legend */}
//         <div className="calendar-legend">
//           <div className="legend-item">
//             <div className="legend-color today"></div>
//             <span>Today</span>
//           </div>
//           <div className="legend-item">
//             <div className="legend-color holiday"></div>
//             <span>Holiday</span>
//           </div>
//           <div className="legend-item">
//             <div className="legend-color weekend"></div>
//             <span>Weekend</span>
//           </div>
//         </div>

//         {/* Upcoming Holidays */}
//         <div className="upcoming-holidays">
//           <h4 className="upcoming-title">🎊 Upcoming Holidays</h4>
//           <div className="holidays-list">
//             {getUpcomingHolidays().map((holiday, index) => (
//               <div key={index} className="holiday-item">
//                 <div className="holiday-date">
//                   {new Date(holiday.date).toLocaleDateString('en-US', { 
//                     month: 'short', 
//                     day: 'numeric' 
//                   })}
//                 </div>
//                 <div className="holiday-name">{holiday.name}</div>
//                 <div className="holiday-days">
//                   {Math.ceil((new Date(holiday.date) - new Date()) / (1000 * 60 * 60 * 24))} days
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default CalendarModal;




// import React, { useState } from 'react';
// import Modal from '../common/Modal';
// import { HOLIDAYS_2024 } from '../../data/mockData';
// import { MONTHS } from '../../utils/constants'; // ✅ Correct import path
// import { generateCalendar } from '../../utils/helpers';
// import './CalendarModal.css';

// const CalendarModal = ({ isOpen, onClose }) => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const currentYear = currentDate.getFullYear();
//   const currentMonth = currentDate.getMonth();

//   const calendarDays = generateCalendar(currentYear, currentMonth);
//   const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//   const changeMonth = (direction) => {
//     setCurrentDate(prev => {
//       const newDate = new Date(prev);
//       newDate.setMonth(prev.getMonth() + direction);
//       return newDate;
//     });
//   };

//   const isHoliday = (date) => {
//     return HOLIDAYS_2024.some(holiday => holiday.date === date);
//   };

//   const getHolidayName = (date) => {
//     const holiday = HOLIDAYS_2024.find(h => h.date === date);
//     return holiday ? holiday.name : '';
//   };

//   const getUpcomingHolidays = () => {
//     const today = new Date().toISOString().split('T')[0];
//     return HOLIDAYS_2024
//       .filter(holiday => holiday.date >= today)
//       .slice(0, 5);
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title="📅 Holiday Calendar 2024"
//       size="large"
//     >
//       <div className="calendar-modal-content">
//         {/* Calendar Navigation */}
//         <div className="calendar-navigation">
//           <button 
//             className="nav-btn"
//             onClick={() => changeMonth(-1)}
//           >
//             ◀ Previous
//           </button>
          
//           <h3 className="calendar-title">
//             {MONTHS[currentMonth]} {currentYear}
//           </h3>
          
//           <button 
//             className="nav-btn"
//             onClick={() => changeMonth(1)}
//           >
//             Next ▶
//           </button>
//         </div>

//         {/* Calendar Grid */}
//         <div className="calendar-grid">
//           {/* Week Day Headers */}
//           {weekDays.map(day => (
//             <div key={day} className="calendar-cell week-header">
//               {day}
//             </div>
//           ))}
          
//           {/* Calendar Days */}
//           {calendarDays.map((day, index) => {
//             if (day.type === 'empty') {
//               return <div key={`empty-${index}`} className="calendar-cell empty"></div>;
//             }

//             const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day.value).padStart(2, '0')}`;
//             const isHolidayDay = isHoliday(dateStr);
//             const isToday = day.isToday;
//             const isWeekend = day.isWeekend;

//             return (
//               <div
//                 key={`day-${index}`}
//                 className={`calendar-cell day 
//                   ${isToday ? 'today' : ''} 
//                   ${isHolidayDay ? 'holiday' : ''}
//                   ${isWeekend ? 'weekend' : ''}
//                 `}
//                 title={isHolidayDay ? getHolidayName(dateStr) : ''}
//               >
//                 <div className="day-number">{day.value}</div>
//                 {isHolidayDay && (
//                   <div className="holiday-indicator">🎉</div>
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         {/* Legend */}
//         <div className="calendar-legend">
//           <div className="legend-item">
//             <div className="legend-color today"></div>
//             <span>Today</span>
//           </div>
//           <div className="legend-item">
//             <div className="legend-color holiday"></div>
//             <span>Holiday</span>
//           </div>
//           <div className="legend-item">
//             <div className="legend-color weekend"></div>
//             <span>Weekend</span>
//           </div>
//         </div>

//         {/* Upcoming Holidays */}
//         <div className="upcoming-holidays">
//           <h4 className="upcoming-title">🎊 Upcoming Holidays</h4>
//           <div className="holidays-list">
//             {getUpcomingHolidays().map((holiday, index) => (
//               <div key={index} className="holiday-item">
//                 <div className="holiday-date">
//                   {new Date(holiday.date).toLocaleDateString('en-US', { 
//                     month: 'short', 
//                     day: 'numeric' 
//                   })}
//                 </div>
//                 <div className="holiday-name">{holiday.name}</div>
//                 <div className="holiday-days">
//                   {Math.ceil((new Date(holiday.date) - new Date()) / (1000 * 60 * 60 * 24))} days
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default CalendarModal;


// 111111111111111111111111111111









// import React, { useState, useEffect } from 'react';
// import Modal from '../common/Modal';
// import './CalendarModal.css';

// // Updated Holidays for 2025-2026
// const UPCOMING_HOLIDAYS = [
//   { date: "2025-01-01", name: "New Year's Day" },
//   { date: "2025-01-14", name: "Makar Sankranti" },
//   { date: "2025-01-26", name: "Republic Day" },
//   { date: "2025-03-14", name: "Holi" },
//   { date: "2025-04-11", name: "Ram Navami" },
//   { date: "2025-05-01", name: "Labour Day" },
//   { date: "2025-08-15", name: "Independence Day" },
//   { date: "2025-10-02", name: "Gandhi Jayanti" },
//   { date: "2025-10-20", name: "Diwali" },
//   { date: "2025-12-25", name: "Christmas Day" },
//   { date: "2026-01-01", name: "New Year's Day" },
//   { date: "2026-01-14", name: "Makar Sankranti" },
//   { date: "2026-01-26", name: "Republic Day" },
//   { date: "2026-03-04", name: "Holi" },
//   { date: "2026-03-30", name: "Ram Navami" },
//   { date: "2026-05-01", name: "Labour Day" },
//   { date: "2026-08-15", name: "Independence Day" },
//   { date: "2026-10-02", name: "Gandhi Jayanti" },
//   { date: "2026-11-08", name: "Diwali" },
//   { date: "2026-12-25", name: "Christmas Day" }
// ];

// const CalendarModal = ({ isOpen, onClose }) => {
//   const [currentHolidayIndex, setCurrentHolidayIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
  
//   // Get upcoming holidays sorted by date
//   const getUpcomingHolidays = () => {
//     const today = new Date();
//     const todayStr = today.toISOString().split('T')[0];
    
//     // Filter holidays that are today or in the future
//     const upcoming = UPCOMING_HOLIDAYS
//       .filter(holiday => holiday.date >= todayStr)
//       .sort((a, b) => new Date(a.date) - new Date(b.date));
    
//     return upcoming.slice(0, 10); // Show next 10 holidays
//   };
  
//   const upcomingHolidays = getUpcomingHolidays();
  
//   // Auto slide every 3 seconds if there are multiple holidays
//   useEffect(() => {
//     if (upcomingHolidays.length <= 1 || isPaused) return;
    
//     const interval = setInterval(() => {
//       setCurrentHolidayIndex(prev => (prev + 1) % upcomingHolidays.length);
//     }, 3000);
    
//     return () => clearInterval(interval);
//   }, [upcomingHolidays.length, isPaused]);
  
//   const currentHoliday = upcomingHolidays[currentHolidayIndex] || upcomingHolidays[0];
  
//   const calculateDaysLeft = (holidayDate) => {
//     if (!holidayDate) return 0;
    
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
    
//     const holiday = new Date(holidayDate);
//     holiday.setHours(0, 0, 0, 0);
    
//     const diffTime = holiday - today;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
//     return diffDays;
//   };
  
//   const daysLeft = calculateDaysLeft(currentHoliday?.date);
  
//   // Format date nicely
//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString('en-IN', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric'
//     });
//   };
  
//   const getNextHolidays = () => {
//     const nextIndex = (currentHolidayIndex + 1) % upcomingHolidays.length;
//     const nextHoliday = upcomingHolidays[nextIndex];
//     const nextDays = calculateDaysLeft(nextHoliday?.date);
    
//     return {
//       name: nextHoliday?.name,
//       date: formatDate(nextHoliday?.date),
//       days: nextDays
//     };
//   };
  
//   const nextHoliday = getNextHolidays();
  
//   // Navigation functions
//   const goToNext = () => {
//     setCurrentHolidayIndex(prev => (prev + 1) % upcomingHolidays.length);
//   };
  
//   const goToPrev = () => {
//     setCurrentHolidayIndex(prev => prev === 0 ? upcomingHolidays.length - 1 : prev - 1);
//   };
  
//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title="🎊 Upcoming Holidays"
//       size="medium"
//     >
//       <div className="holidays-simple-container">
//         {/* Current Holiday Div */}
//         {/* <div 
//           className="current-holiday-div"
//           onMouseEnter={() => setIsPaused(true)}
//           onMouseLeave={() => setIsPaused(false)}
//         >
//           <div className="holiday-main">
//             <div className="holiday-header">
//               <span className="holiday-tag">🎉 Next Holiday</span>
//               {upcomingHolidays.length > 1 && (
//                 <div className="holiday-controls">
//                   <button 
//                     className="control-btn prev-btn"
//                     onClick={goToPrev}
//                     aria-label="Previous holiday"
//                   >
//                     ◀
//                   </button>
//                   <span className="holiday-count">
//                     {currentHolidayIndex + 1}/{upcomingHolidays.length}
//                   </span>
//                   <button 
//                     className="control-btn next-btn"
//                     onClick={goToNext}
//                     aria-label="Next holiday"
//                   >
//                     ▶
//                   </button>
//                 </div>
//               )}
//             </div>
            
//             <div className="holiday-content">
//               <div className="holiday-name-large">{currentHoliday?.name}</div>
//               <div className="holiday-date-large">{formatDate(currentHoliday?.date)}</div>
              
//               <div className="countdown-section">
//                 <div className="countdown-number">{daysLeft}</div>
//                 <div className="countdown-label">
//                   {daysLeft === 1 ? 'day to go' : 'days to go'}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div> */}
        
//         {/* Next Holiday Preview */}
//         {/* {upcomingHolidays.length > 1 && (
//           <div className="next-holiday-preview">
//             <div className="next-label">Next ➜</div>
//             <div className="next-content">
//               <div className="next-name">{nextHoliday.name}</div>
//               <div className="next-date">{nextHoliday.date}</div>
//               <div className="next-days">{nextHoliday.days} days</div>
//             </div>
//           </div>
//         )} */}
        
//         {/* All Upcoming Holidays */}
//         <div className="all-upcoming-div">
//           <div className="section-header">
//             <span className="section-icon">📅</span>
//             <h3 className="section-title">All Upcoming Holidays</h3>
//           </div>
          
//           <div className="holidays-grid">
//             {upcomingHolidays.map((holiday, index) => {
//               const daysLeft = calculateDaysLeft(holiday.date);
//               const isCurrent = index === currentHolidayIndex;
              
//               return (
//                 <div 
//                   key={`${holiday.date}-${index}`}
//                   className={`holiday-grid-item ${isCurrent ? 'active' : ''}`}
//                   onClick={() => setCurrentHolidayIndex(index)}
//                 >
//                   <div className="grid-date">
//                     <span className="grid-day">{new Date(holiday.date).getDate()}</span>
//                     <span className="grid-month">
//                       {new Date(holiday.date).toLocaleDateString('en-IN', { month: 'short' })}
//                     </span>
//                     <span className="grid-year">{new Date(holiday.date).getFullYear()}</span>
//                   </div>
                  
//                   <div className="grid-content">
//                     <div className="grid-name">{holiday.name}</div>
//                     <div className="grid-days">
//                       {daysLeft === 0 ? 'Today' : 
//                        daysLeft === 1 ? 'Tomorrow' : 
//                        `${daysLeft} days`}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
        
//         {/* Info Footer */}
//         <div className="holidays-footer">
//           <p>
//             <span className="total-count">{upcomingHolidays.length}</span> upcoming holidays • 
//             Auto-slides every 3 seconds • 
//             Click any holiday to view details
//           </p>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default CalendarModal;





// import React, { useState, useEffect } from 'react';
// import Modal from '../common/Modal';
// import './CalendarModal.css';

// import { useDispatch, useSelector } from "react-redux";
// import { fetchHolidays } from "../../redux/slices/calendermodalSlice";


// const CalendarModal = ({ isOpen, onClose }) => {
//   const dispatch = useDispatch();

//   const { list: holidays, loading } = useSelector(
//     (state) => state.holidays
//   );

//   const [currentHolidayIndex, setCurrentHolidayIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   // 🔥 API Call
//   useEffect(() => {
//     if (isOpen) dispatch(fetchHolidays());
//   }, [isOpen, dispatch]);


//   // 🔥 Convert API Holidays → Upcoming Sorted
//   const getUpcomingHolidays = () => {
//     const today = new Date();
//     today.setHours(0,0,0,0);

//     const upcoming = holidays
//       .map(h => ({
//         name: h.title,
//         date: h.date
//       }))
//       .filter(h => new Date(h.date) >= today)
//       .sort((a,b) => new Date(a.date) - new Date(b.date));

//     return upcoming.slice(0, 20);   // show next 20
//   };

//   const upcomingHolidays = getUpcomingHolidays();

//   // Auto Slide
//   useEffect(() => {
//     if (upcomingHolidays.length <= 1 || isPaused) return;

//     const interval = setInterval(() => {
//       setCurrentHolidayIndex(prev => (prev + 1) % upcomingHolidays.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, [upcomingHolidays.length, isPaused]);

//   const currentHoliday = upcomingHolidays[currentHolidayIndex];

//   const calculateDaysLeft = (holidayDate) => {
//     if (!holidayDate) return 0;

//     const today = new Date();
//     today.setHours(0,0,0,0);

//     const holiday = new Date(holidayDate);
//     holiday.setHours(0,0,0,0);

//     const diff = holiday - today;
//     return Math.ceil(diff / (1000 * 60 * 60 * 24));
//   };

//   const daysLeft = calculateDaysLeft(currentHoliday?.date);

//   const formatDate = (dateStr) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "short",
//       year: "numeric"
//     });
//   };

//   const goToNext = () =>
//     setCurrentHolidayIndex(prev => (prev + 1) % upcomingHolidays.length);

//   const goToPrev = () =>
//     setCurrentHolidayIndex(prev =>
//       prev === 0 ? upcomingHolidays.length - 1 : prev - 1
//     );


//   if (!isOpen) return null;

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title="🎊 Upcoming Holidays"
//       size="medium"
//     >
//       <div className="holidays-simple-container">

//         {/* Loader */}
//         {loading && (
//           <p style={{ color: "white", textAlign: "center" }}>
//             Loading holidays...
//           </p>
//         )}

//         {/* No Data */}
//         {!loading && upcomingHolidays.length === 0 && (
//           <p style={{ color: "white", textAlign: "center" }}>
//             😔 No upcoming holidays
//           </p>
//         )}

//         {/* All Upcoming Holidays */}
//         <div className="all-upcoming-div">
//           <div className="section-header">
//             <span className="section-icon">📅</span>
//             <h3 className="section-title">All Upcoming Holidays</h3>
//           </div>

//           <div className="holidays-grid">
//             {upcomingHolidays.map((holiday, index) => {
//               const d = calculateDaysLeft(holiday.date);

//               return (
//                 <div
//                   key={`${holiday.date}-${index}`}
//                   className={`holiday-grid-item ${index === currentHolidayIndex ? "active" : ""}`}
//                   onClick={() => setCurrentHolidayIndex(index)}
//                 >
//                   <div className="grid-date">
//                     <span className="grid-day">{new Date(holiday.date).getDate()}</span>
//                     <span className="grid-month">
//                       {new Date(holiday.date).toLocaleDateString("en-IN", {
//                         month: "short",
//                       })}
//                     </span>
//                     <span className="grid-year">
//                       {new Date(holiday.date).getFullYear()}
//                     </span>
//                   </div>

//                   <div className="grid-content">
//                     <div className="grid-name">{holiday.name}</div>
//                     <div className="grid-days">
//                       {d === 0
//                         ? "Today"
//                         : d === 1
//                         ? "Tomorrow"
//                         : `${d} days`}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         <div className="holidays-footer">
//           <p>
//             <span className="total-count">{upcomingHolidays.length}</span> upcoming holidays •
//             Auto-slides every 3 seconds • Click any holiday to view
//           </p>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default CalendarModal;



// multiple days ki holiday show 



import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import './CalendarModal.css';

import { useDispatch, useSelector } from "react-redux";
import { fetchUpcomingHolidays } from "../../redux/slices/calendermodalSlice";

const CalendarModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const { upcoming, loading } = useSelector(
    (state) => state.holidays
  );

  const [currentHolidayIndex, setCurrentHolidayIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 🔥 Call API When Modal Opens
  useEffect(() => {
    if (isOpen) {
      dispatch(fetchUpcomingHolidays(30));
    }
  }, [isOpen, dispatch]);


  // Auto Slide
  useEffect(() => {
    if (upcoming.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentHolidayIndex(prev => (prev + 1) % upcoming.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [upcoming.length, isPaused]);


  const calculateDaysLeft = (dateStr) => {
    const today = new Date();
    today.setHours(0,0,0,0);

    const date = new Date(dateStr);
    date.setHours(0,0,0,0);

    const diff = date - today;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🎊 Upcoming Holidays"
      size="medium"
    >
      <div className="holidays-simple-container">

        {/* Loader */}
        {loading && (
          <p style={{ color: "white", textAlign: "center" }}>
            Loading upcoming holidays...
          </p>
        )}

        {/* No Data */}
        {!loading && upcoming.length === 0 && (
          <p style={{ color: "white", textAlign: "center" }}>
            😔 No upcoming holidays
          </p>
        )}

        {/* Upcoming Holidays Grid */}
        <div className="all-upcoming-div">
          <div className="section-header">
            <span className="section-icon">📅</span>
            <h3 className="section-title">Upcoming Holidays</h3>
          </div>

          <div className="holidays-grid">
            {upcoming.map((holiday, index) => {
              const daysLeft = calculateDaysLeft(holiday.date);

              return (
                <div
                  key={`${holiday.date}-${index}`}
                  className={`holiday-grid-item ${
                    index === currentHolidayIndex ? "active" : ""
                  }`}
                  onClick={() => setCurrentHolidayIndex(index)}
                >
                  <div className="grid-date">
                    <span className="grid-day">
                      {new Date(holiday.date).getDate()}
                    </span>

                    <span className="grid-month">
                      {new Date(holiday.date).toLocaleDateString("en-IN", {
                        month: "short",
                      })}
                    </span>

                    <span className="grid-year">
                      {new Date(holiday.date).getFullYear()}
                    </span>
                  </div>

                  <div className="grid-content">
                    <div className="grid-name">{holiday.title}</div>

                    <div className="grid-days">
                      {daysLeft === 0
                        ? "Today"
                        : daysLeft === 1
                        ? "Tomorrow"
                        : `${daysLeft} days`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="holidays-footer">
          <p>
            <span className="total-count">{upcoming.length}</span> holidays in next 30 days
          </p>
        </div>

      </div>
    </Modal>
  );
};

export default CalendarModal;

