// import React, { useState, useEffect } from "react";
// import "./AttendanceCalendarModal.css";

// /* ---------- Attendance Calendar Modal Component ---------- */
// const AttendanceCalendarModal = ({ isOpen, onClose, userAttendanceData }) => {
//   // For demo - if no data passed, use sample data
//   const [attendanceData, setAttendanceData] = useState(userAttendanceData || {
//     present: 20,
//     absent: 2,
//     leave: 3,
//     holidays: 5,
//     monthlyData: {}
//   });

//   const [currentDate, setCurrentDate] = useState(new Date());
//   const currentYear = currentDate.getFullYear();
//   const currentMonth = currentDate.getMonth();

//   // Months array
//   const months = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];

//   // Sample holiday dates for current month
//   const currentMonthHolidays = [1, 15, 26]; // Example dates
  
//   // Sample attendance status for current month (would come from API)
//   const getAttendanceStatusForDay = (day) => {
//     // For demo, using random statuses
//     const dayStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
//     const dayOfWeek = new Date(dayStr).getDay();
    
//     // Mark weekends as holidays
//     if (dayOfWeek === 0 || dayOfWeek === 6) {
//       return 'holiday';
//     }
    
//     // Mark some specific dates as holidays
//     if (currentMonthHolidays.includes(day)) {
//       return 'holiday';
//     }
    
//     // Random status for demo (in real app, this would come from API)
//     const statuses = ['present', 'absent', 'leave', 'present', 'present'];
//     return statuses[day % statuses.length];
//   };

//   // Generate calendar
//   const generateCalendar = () => {
//     const today = new Date();
//     const month = currentMonth;
//     const year = currentYear;
//     const firstDay = new Date(year, month, 1).getDay();
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     const calendarDays = [];

//     const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//     dayHeaders.forEach((day) => {
//       calendarDays.push(
//         <div key={`h-${day}`} className="attendance-calendar-day header">
//           {day}
//         </div>
//       );
//     });

//     // Empty cells for days before first day of month
//     for (let i = 0; i < firstDay; i++) {
//       calendarDays.push(<div key={`empty-${i}`} className="attendance-calendar-day empty" />);
//     }

//     // Days of the month
//     for (let d = 1; d <= daysInMonth; d++) {
//       const dayStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
//       const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
//       const dayOfWeek = new Date(dayStr).getDay();
//       const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
//       const isHoliday = currentMonthHolidays.includes(d);
//       const attendanceStatus = getAttendanceStatusForDay(d);
      
//       let className = "attendance-calendar-day";
//       if (isToday) className += " today";
//       if (isWeekend) className += " weekend";
//       if (isHoliday) className += " holiday";
//       className += ` ${attendanceStatus}`;

//       calendarDays.push(
//         <div key={`day-${d}`} className={className}>
//           <div className="day-number">{d}</div>
//           <div className={`status-dot ${attendanceStatus}`} title={attendanceStatus.toUpperCase()}></div>
//           {isToday && <div className="today-indicator">Today</div>}
//         </div>
//       );
//     }

//     return calendarDays;
//   };

//   // Change month
//   const changeMonth = (direction) => {
//     setCurrentDate(prev => {
//       const newDate = new Date(prev);
//       newDate.setMonth(prev.getMonth() + direction);
//       return newDate;
//     });
//   };

//   // Fetch attendance data (in real app, this would be an API call)
//   useEffect(() => {
//     // Simulate fetching attendance data
//     const fetchAttendanceData = () => {
//       // This is where you would make API call
//       // For now, using sample data
//       const sampleData = {
//         present: 20 + Math.floor(Math.random() * 3),
//         absent: 2 + Math.floor(Math.random() * 2),
//         leave: 3 + Math.floor(Math.random() * 2),
//         holidays: 5
//       };
//       setAttendanceData(prev => ({ ...prev, ...sampleData }));
//     };

//     if (isOpen) {
//       fetchAttendanceData();
//     }
//   }, [isOpen, currentMonth, currentYear]);

//   if (!isOpen) return null;

//   return (
//     <div className="attendance-calendar-modal active" onClick={onClose}>
//       <div className="attendance-calendar-content" onClick={(e) => e.stopPropagation()}>
//         {/* Modal Header */}
//         <div className="modal-header">
//           <h2>📅 Attendance Calendar & Report</h2>
//           <button className="close-modal" onClick={onClose}>✕</button>
//         </div>

//         {/* Attendance Summary Cards */}
//         <div className="attendance-summary-cards">
//           <div className="summary-card present">
//             <div className="summary-icon">✅</div>
//             <div className="summary-details">
//               <div className="summary-count">{attendanceData.present}</div>
//               <div className="summary-label">Present Days</div>
//             </div>
//           </div>
          
//           <div className="summary-card absent">
//             <div className="summary-icon">❌</div>
//             <div className="summary-details">
//               <div className="summary-count">{attendanceData.absent}</div>
//               <div className="summary-label">Absent Days</div>
//             </div>
//           </div>
          
//           <div className="summary-card leave">
//             <div className="summary-icon">🏖️</div>
//             <div className="summary-details">
//               <div className="summary-count">{attendanceData.leave}</div>
//               <div className="summary-label">Leave Days</div>
//             </div>
//           </div>
          
//           <div className="summary-card holiday">
//             <div className="summary-icon">🎉</div>
//             <div className="summary-details">
//               <div className="summary-count">{attendanceData.holidays}</div>
//               <div className="summary-label">Holidays</div>
//             </div>
//           </div>
//         </div>

//         {/* Calendar Navigation */}
//         <div className="calendar-month-nav">
//           <button className="month-nav-btn" onClick={() => changeMonth(-1)}>
//             ◀ Previous
//           </button>
//           <h3 className="current-month-display">
//             {months[currentMonth]} {currentYear}
//           </h3>
//           <button className="month-nav-btn" onClick={() => changeMonth(1)}>
//             Next ▶
//           </button>
//         </div>

//         {/* Calendar Grid */}
//         <div className="attendance-calendar-grid">
//           {generateCalendar()}
//         </div>

//         {/* Legend */}
//         <div className="attendance-legend">
//           <div className="legend-title">Status Legend:</div>
//           <div className="legend-items">
//             <div className="legend-item">
//               <div className="legend-dot present"></div>
//               <span>Present</span>
//             </div>
//             <div className="legend-item">
//               <div className="legend-dot absent"></div>
//               <span>Absent</span>
//             </div>
//             <div className="legend-item">
//               <div className="legend-dot leave"></div>
//               <span>Leave</span>
//             </div>
//             <div className="legend-item">
//               <div className="legend-dot holiday"></div>
//               <span>Holiday</span>
//             </div>
//             <div className="legend-item">
//               <div className="legend-dot today"></div>
//               <span>Today</span>
//             </div>
//           </div>
//         </div>

//         {/* Statistics */}
//         <div className="attendance-statistics">
//           <h4>📊 Monthly Statistics</h4>
//           <div className="stats-grid">
//             <div className="stat-item">
//               <div className="stat-label">Working Days</div>
//               <div className="stat-value">{attendanceData.present + attendanceData.absent + attendanceData.leave}</div>
//             </div>
//             <div className="stat-item">
//               <div className="stat-label">Attendance %</div>
//               <div className="stat-value">
//                 {Math.round((attendanceData.present / (attendanceData.present + attendanceData.absent + attendanceData.leave)) * 100)}%
//               </div>
//             </div>
//             <div className="stat-item">
//               <div className="stat-label">Total Days</div>
//               <div className="stat-value">{new Date(currentYear, currentMonth + 1, 0).getDate()}</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendanceCalendarModal;




// import React, { useState, useEffect } from "react";
// import "./AttendanceCalendarModal.css";

// const AttendanceCalendarModal = ({ isOpen, onClose, currentUser, attendanceData }) => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const currentYear = currentDate.getFullYear();
//   const currentMonth = currentDate.getMonth();

//   // Sample attendance data (in real app, this would come from API)
//   const [attendanceStats, setAttendanceStats] = useState({
//     present: 20,
//     absent: 2,
//     leave: 3,
//     holidays: 5,
//     late: 1,
//     halfDay: 0
//   });

//   // Months array
//   const months = [
//     "January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ];

//   // Sample holiday dates for current month
//   const currentMonthHolidays = [1, 15, 26];
  
//   // Sample weekends
//   const getWeekendDays = () => {
//     const year = currentYear;
//     const month = currentMonth;
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     const weekends = [];
    
//     for (let d = 1; d <= daysInMonth; d++) {
//       const dayOfWeek = new Date(year, month, d).getDay();
//       if (dayOfWeek === 0 || dayOfWeek === 6) { // Sunday or Saturday
//         weekends.push(d);
//       }
//     }
//     return weekends;
//   };

//   // Get attendance status for each day (sample logic)
//   const getAttendanceStatusForDay = (day) => {
//     const dayStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
//     const dayOfWeek = new Date(dayStr).getDay();
    
//     // Mark weekends
//     if (dayOfWeek === 0 || dayOfWeek === 6) {
//       return 'weekend';
//     }
    
//     // Mark holidays
//     if (currentMonthHolidays.includes(day)) {
//       return 'holiday';
//     }
    
//     // Today's date
//     const today = new Date();
//     const isToday = day === today.getDate() && 
//                    currentMonth === today.getMonth() && 
//                    currentYear === today.getFullYear();
    
//     // For today, check if punched in
//     if (isToday && attendanceData?.isPunchedIn) {
//       return 'present';
//     } else if (isToday && !attendanceData?.isPunchedIn) {
//       return 'absent';
//     }
    
//     // For other days, use sample data
//     const statusMap = {
//       1: 'present', 2: 'present', 3: 'present', 4: 'present', 5: 'present',
//       6: 'present', 7: 'present', 8: 'present', 9: 'present', 10: 'present',
//       11: 'leave', 12: 'present', 13: 'present', 14: 'present',
//       16: 'present', 17: 'present', 18: 'present', 19: 'present', 20: 'present',
//       21: 'late', 22: 'present', 23: 'present', 24: 'present', 25: 'present',
//       27: 'present', 28: 'present', 29: 'present', 30: 'present', 31: 'present'
//     };
    
//     return statusMap[day] || 'absent';
//   };

//   // Generate calendar
//   const generateCalendar = () => {
//     const today = new Date();
//     const month = currentMonth;
//     const year = currentYear;
//     const firstDay = new Date(year, month, 1).getDay();
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     const calendarDays = [];

//     const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//     dayHeaders.forEach((day) => {
//       calendarDays.push(
//         <div key={`h-${day}`} className="attendance-calendar-day header">
//           {day}
//         </div>
//       );
//     });

//     // Empty cells for days before first day of month
//     for (let i = 0; i < firstDay; i++) {
//       calendarDays.push(<div key={`empty-${i}`} className="attendance-calendar-day empty" />);
//     }

//     // Days of the month
//     for (let d = 1; d <= daysInMonth; d++) {
//       const dayStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
//       const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
//       const attendanceStatus = getAttendanceStatusForDay(d);
      
//       let className = "attendance-calendar-day";
//       if (isToday) className += " today";
//       className += ` ${attendanceStatus}`;

//       // Get status label
//       const getStatusLabel = () => {
//         switch(attendanceStatus) {
//           case 'present': return 'P';
//           case 'absent': return 'A';
//           case 'leave': return 'L';
//           case 'late': return 'LT';
//           case 'holiday': return 'H';
//           case 'weekend': return 'W';
//           default: return '';
//         }
//       };

//       calendarDays.push(
//         <div key={`day-${d}`} className={className}>
//           <div className="day-number">{d}</div>
//           <div className="status-label">{getStatusLabel()}</div>
//           {isToday && <div className="today-indicator">Today</div>}
//         </div>
//       );
//     }

//     return calendarDays;
//   };

//   // Change month
//   const changeMonth = (direction) => {
//     setCurrentDate(prev => {
//       const newDate = new Date(prev);
//       newDate.setMonth(prev.getMonth() + direction);
//       return newDate;
//     });
    
//     // Update stats for new month (in real app, fetch from API)
//     setAttendanceStats({
//       present: 20 + Math.floor(Math.random() * 3),
//       absent: 2 + Math.floor(Math.random() * 2),
//       leave: 3 + Math.floor(Math.random() * 2),
//       holidays: 5,
//       late: Math.floor(Math.random() * 2),
//       halfDay: Math.floor(Math.random() * 2)
//     });
//   };

//   // Calculate attendance percentage
//   const calculateAttendancePercentage = () => {
//     const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
//     const workingDays = totalDays - attendanceStats.holidays;
//     const attendedDays = attendanceStats.present + (attendanceStats.late * 0.5) + (attendanceStats.halfDay * 0.5);
//     return ((attendedDays / workingDays) * 100).toFixed(1);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="attendance-calendar-modal active" onClick={onClose}>
//       <div className="attendance-calendar-content" onClick={(e) => e.stopPropagation()}>
//         {/* Modal Header */}
//         <div className="modal-header">
//           <h2>📅 Attendance Calendar - {months[currentMonth]} {currentYear}</h2>
//           <button className="close-modal" onClick={onClose}>✕</button>
//         </div>

//         {/* User Info */}
//         <div className="user-info-section">
//           <div className="user-avatar">
//             {currentUser?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
//           </div>
//           <div className="user-details">
//             <h3>{currentUser?.name}</h3>
//             <p>{currentUser?.designation} • {currentUser?.empId}</p>
//           </div>
//         </div>

//         {/* Attendance Summary Cards */}
//         {/* <div className="attendance-summary-cards">
//           <div className="summary-card present">
//             <div className="summary-icon">✅</div>
//             <div className="summary-details">
//               <div className="summary-count">{attendanceStats.present}</div>
//               <div className="summary-label">Present</div>
//             </div>
//           </div>
          
//           <div className="summary-card absent">
//             <div className="summary-icon">❌</div>
//             <div className="summary-details">
//               <div className="summary-count">{attendanceStats.absent}</div>
//               <div className="summary-label">Absent</div>
//             </div>
//           </div>
          
//           <div className="summary-card leave">
//             <div className="summary-icon">🏖️</div>
//             <div className="summary-details">
//               <div className="summary-count">{attendanceStats.leave}</div>
//               <div className="summary-label">Leave</div>
//             </div>
//           </div>
          
//           <div className="summary-card holiday">
//             <div className="summary-icon">🎉</div>
//             <div className="summary-details">
//               <div className="summary-count">{attendanceStats.holidays}</div>
//               <div className="summary-label">Holidays</div>
//             </div>
//           </div>
//         </div> */}



//         <div className="attendance-summary-cards">
//   <div className="summary-card present">
//     <div className="summary-dot-container">
//       <div className="summary-dot present-dot"></div>
//     </div>
//     <div className="summary-details">
//       <div className="summary-count">{attendanceStats.present}</div>
//       <div className="summary-label">Present</div>
//     </div>
//   </div>
  
//   <div className="summary-card absent">
//     <div className="summary-dot-container">
//       <div className="summary-dot absent-dot"></div>
//     </div>
//     <div className="summary-details">
//       <div className="summary-count">{attendanceStats.absent}</div>
//       <div className="summary-label">Absent</div>
//     </div>
//   </div>
  
//   <div className="summary-card leave">
//     <div className="summary-dot-container">
//       <div className="summary-dot leave-dot"></div>
//     </div>
//     <div className="summary-details">
//       <div className="summary-count">{attendanceStats.leave}</div>
//       <div className="summary-label">Leave</div>
//     </div>
//   </div>
  
//   <div className="summary-card holiday">
//     <div className="summary-dot-container">
//       <div className="summary-dot holiday-dot"></div>
//     </div>
//     <div className="summary-details">
//       <div className="summary-count">{attendanceStats.holidays}</div>
//       <div className="summary-label">Holidays</div>
//     </div>
//   </div>
// </div>

//         {/* Calendar Navigation */}
//         <div className="calendar-month-nav">
//           <button className="month-nav-btn" onClick={() => changeMonth(-1)}>
//             ◀ Previous
//           </button>
//           <h3 className="current-month-display">
//             {months[currentMonth]} {currentYear}
//           </h3>
//           <button className="month-nav-btn" onClick={() => changeMonth(1)}>
//             Next ▶
//           </button>
//         </div>

//         {/* Calendar Grid */}
//         <div className="attendance-calendar-grid">
//           {generateCalendar()}
//         </div>

//         {/* Legend */}
//         <div className="attendance-legend">
//           <div className="legend-title">Status Legend:</div>
//           <div className="legend-items">
//             <div className="legend-item">
//               <div className="legend-dot present"></div>
//               <span>Present</span>
//             </div>
//             <div className="legend-item">
//               <div className="legend-dot absent"></div>
//               <span>Absent</span>
//             </div>
//             <div className="legend-item">
//               <div className="legend-dot leave"></div>
//               <span>Leave</span>
//             </div>
//             <div className="legend-item">
//               <div className="legend-dot holiday"></div>
//               <span>Holiday</span>
//             </div>
//             <div className="legend-item">
//               <div className="legend-dot weekend"></div>
//               <span>Weekend</span>
//             </div>
//             <div className="legend-item">
//               <div className="legend-dot late"></div>
//               <span>Late</span>
//             </div>
//           </div>
//         </div>

//         {/* Statistics */}
//         <div className="attendance-statistics">
//           <h4>📊 Monthly Statistics</h4>
//           <div className="stats-grid">
//             <div className="stat-item">
//               <div className="stat-label">Attendance %</div>
//               <div className="stat-value">{calculateAttendancePercentage()}%</div>
//             </div>
//             <div className="stat-item">
//               <div className="stat-label">Working Days</div>
//               <div className="stat-value">{attendanceStats.present + attendanceStats.absent + attendanceStats.leave + attendanceStats.late + attendanceStats.halfDay}</div>
//             </div>
//             <div className="stat-item">
//               <div className="stat-label">Total Days</div>
//               <div className="stat-value">{new Date(currentYear, currentMonth + 1, 0).getDate()}</div>
//             </div>
//             <div className="stat-item">
//               <div className="stat-label">Late Arrivals</div>
//               <div className="stat-value">{attendanceStats.late}</div>
//             </div>
//           </div>
//         </div>

//         {/* Close Button */}
//         <button className="close-calendar-btn" onClick={onClose}>
//           Close Calendar
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AttendanceCalendarModal;




// +++++++++++++


// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAttendanceCalendarData } from "../../redux/slices/attendanceCalendarSlice";

// import "./AttendanceCalendarModal.css";

// const AttendanceCalendarModal = ({ isOpen, onClose, empId, attendanceData }) => {
//   const dispatch = useDispatch();

//   const { employee, leaves, holidays, loading } =
//     useSelector((state) => state.attendanceCalendar);

//   const [currentDate, setCurrentDate] = useState(new Date());
//   const currentYear = currentDate.getFullYear();
//   const currentMonth = currentDate.getMonth();

//   useEffect(() => {
//     if (isOpen && empId) {
//       dispatch(fetchAttendanceCalendarData(empId));
//     }
//   }, [isOpen, empId]);

//   if (!isOpen) return null;

//   const months = [
//     "January","February","March","April","May","June",
//     "July","August","September","October","November","December",
//   ];

//   // =====================================
//   // HOLIDAYS (THIS MONTH)
//   // =====================================
//   const monthHolidays = holidays
//     ?.map((h) => new Date(h.date))
//     ?.filter(
//       (d) =>
//         d.getMonth() === currentMonth && d.getFullYear() === currentYear
//     )
//     ?.map((d) => d.getDate());

//   // =====================================
//   // LEAVES THIS MONTH (Single + Range)
//   // =====================================
//   const leaveDays = new Set();

//   leaves?.forEach((leave) => {
//     // Single Day Leave
//     if (leave.date) {
//       const d = new Date(leave.date);
//       if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
//         leaveDays.add(d.getDate());
//       }
//     }

//     // Range Leave
//     if (leave.fromDate && leave.toDate) {
//       const start = new Date(leave.fromDate);
//       const end = new Date(leave.toDate);

//       let loop = new Date(start);
//       while (loop <= end) {
//         if (
//           loop.getMonth() === currentMonth &&
//           loop.getFullYear() === currentYear
//         ) {
//           leaveDays.add(loop.getDate());
//         }
//         loop.setDate(loop.getDate() + 1);
//       }
//     }
//   });

//   // =====================================
//   // WEEKEND CHECK
//   // =====================================
//   const isWeekend = (day) => {
//     const d = new Date(currentYear, currentMonth, day);
//     return d.getDay() === 0 || d.getDay() === 6;
//   };

//   // =====================================
//   // STATUS OF EACH DAY
//   // =====================================
//   const getStatus = (day) => {
//     if (isWeekend(day)) return "weekend";
//     if (monthHolidays?.includes(day)) return "holiday";
//     if (leaveDays.has(day)) return "leave";

//     const today = new Date();
//     const isToday =
//       day === today.getDate() &&
//       currentMonth === today.getMonth() &&
//       currentYear === today.getFullYear();

//     if (isToday) return attendanceData?.isPunchedIn ? "present" : "absent";

//     return "present"; // default assume working attended
//   };

//   // =====================================
//   // CALENDAR GENERATE
//   // =====================================
//   const generateCalendar = () => {
//     const firstDay = new Date(currentYear, currentMonth, 1).getDay();
//     const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

//     const calendar = [];

//     const headers = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
//     headers.forEach((h) =>
//       calendar.push(
//         <div key={h} className="attendance-calendar-day header">
//           {h}
//         </div>
//       )
//     );

//     for (let i = 0; i < firstDay; i++)
//       calendar.push(
//         <div key={"e" + i} className="attendance-calendar-day empty" />
//       );

//     for (let d = 1; d <= daysInMonth; d++) {
//       const status = getStatus(d);

//       calendar.push(
//         <div key={d} className={`attendance-calendar-day ${status}`}>
//           <div className="day-number">{d}</div>
//           <div className="status-label">
//             {status === "present" && "P"}
//             {status === "absent" && "A"}
//             {status === "leave" && "L"}
//             {status === "holiday" && "H"}
//             {status === "weekend" && "W"}
//           </div>
//         </div>
//       );
//     }

//     return calendar;
//   };

//   // =====================================
//   // STATS CALCULATION
//   // =====================================
//   const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

//   let present = 0,
//     leave = 0,
//     holiday = monthHolidays?.length || 0,
//     weekend = 0,
//     absent = 0;

//   for (let d = 1; d <= daysInMonth; d++) {
//     const status = getStatus(d);

//     if (status === "present") present++;
//     if (status === "leave") leave++;
//     if (status === "holiday") holiday++;
//     if (status === "weekend") weekend++;
//     if (status === "absent") absent++;
//   }

//   const totalWorkingDays = daysInMonth - weekend - holiday;
//   const attendancePercent =
//     totalWorkingDays > 0
//       ? ((present / totalWorkingDays) * 100).toFixed(1)
//       : 0;

//   const changeMonth = (val) => {
//     const newDate = new Date(currentDate);
//     newDate.setMonth(newDate.getMonth() + val);
//     setCurrentDate(newDate);
//   };

//   return (
//     <div className="attendance-calendar-modal active" onClick={onClose}>
//       <div
//         className="attendance-calendar-content"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="modal-header">
//           <h2>
//             📅 Attendance Calendar - {months[currentMonth]} {currentYear}
//           </h2>
//           <button className="close-modal" onClick={onClose}>
//             ✕
//           </button>
//         </div>

//         {loading && <h3>Loading...</h3>}

//         {/* USER */}
//         <div className="user-info-section">
//           <div className="user-avatar">
//             {employee?.name?.split(" ").map((n) => n[0]).join("")}
//           </div>

//           <div className="user-details">
//             <h3>{employee?.name}</h3>
//             <p>
//               {employee?.designation} • {employee?.employeeId}
//             </p>
//           </div>
//         </div>

//         {/* SUMMARY */}
//         <div className="attendance-summary-cards">
//           <div className="summary-card present">
//             <div className="summary-dot-container">
//               <div className="summary-dot present-dot"></div>
//             </div>
//             <div className="summary-details">
//               <div className="summary-count">{present}</div>
//               <div className="summary-label">Present</div>
//             </div>
//           </div>

//           <div className="summary-card absent">
//             <div className="summary-dot-container">
//               <div className="summary-dot absent-dot"></div>
//             </div>
//             <div className="summary-details">
//               <div className="summary-count">{absent}</div>
//               <div className="summary-label">Absent</div>
//             </div>
//           </div>

//           <div className="summary-card leave">
//             <div className="summary-dot-container">
//               <div className="summary-dot leave-dot"></div>
//             </div>
//             <div className="summary-details">
//               <div className="summary-count">{leave}</div>
//               <div className="summary-label">Leave</div>
//             </div>
//           </div>

//           <div className="summary-card holiday">
//             <div className="summary-dot-container">
//               <div className="summary-dot holiday-dot"></div>
//             </div>
//             <div className="summary-details">
//               <div className="summary-count">{holiday}</div>
//               <div className="summary-label">Holidays</div>
//             </div>
//           </div>
//         </div>

//         {/* NAV */}
//         <div className="calendar-month-nav">
//           <button className="month-nav-btn" onClick={() => changeMonth(-1)}>
//             ◀ Previous
//           </button>
//           <h3 className="current-month-display">
//             {months[currentMonth]} {currentYear}
//           </h3>
//           <button className="month-nav-btn" onClick={() => changeMonth(1)}>
//             Next ▶
//           </button>
//         </div>

//         {/* CALENDAR */}
//         <div className="attendance-calendar-grid">{generateCalendar()}</div>

//         {/* STATISTICS */}
//         <div className="attendance-statistics">
//           <h4>📊 Monthly Statistics</h4>
//           <div className="stats-grid">
//             <div className="stat-item">
//               <div className="stat-label">Attendance %</div>
//               <div className="stat-value">{attendancePercent}%</div>
//             </div>

//             <div className="stat-item">
//               <div className="stat-label">Working Days</div>
//               <div className="stat-value">{totalWorkingDays}</div>
//             </div>

//             <div className="stat-item">
//               <div className="stat-label">Total Days</div>
//               <div className="stat-value">{daysInMonth}</div>
//             </div>

//             <div className="stat-item">
//               <div className="stat-label">Leaves Taken</div>
//               <div className="stat-value">{leave}</div>
//             </div>
//           </div>
//         </div>

//         <button className="close-calendar-btn" onClick={onClose}>
//           Close Calendar
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AttendanceCalendarModal;







import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAttendanceCalendarData } from "../../redux/slices/attendanceCalendarSlice";
import "./AttendanceCalendarModal.css";

const AttendanceCalendarModal = ({ isOpen, onClose, empId, attendanceData }) => {
  const dispatch = useDispatch();

  // Get data from Redux store
  const { employee, leaves, holidays, loading, error } = useSelector(
    (state) => state.attendanceCalendar
  );

  const [currentDate, setCurrentDate] = useState(new Date());
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Fetch data when modal opens
  useEffect(() => {
    if (isOpen && empId) {
      console.log("Fetching data for empId:", empId);
      dispatch(fetchAttendanceCalendarData(empId));
    }
  }, [isOpen, empId, dispatch]);

  // Close modal if not open
  if (!isOpen) return null;

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // =====================================
  // GET HOLIDAYS FOR CURRENT MONTH
  // =====================================
  const getMonthHolidays = () => {
    if (!holidays || !Array.isArray(holidays)) return [];
    
    return holidays
      .filter(holiday => {
        try {
          if (!holiday.date) return false;
          const holidayDate = new Date(holiday.date);
          return (
            holidayDate.getMonth() === currentMonth &&
            holidayDate.getFullYear() === currentYear
          );
        } catch (error) {
          return false;
        }
      })
      .map(holiday => {
        try {
          return new Date(holiday.date).getDate();
        } catch (error) {
          return null;
        }
      })
      .filter(day => day !== null);
  };

  const monthHolidays = getMonthHolidays();

  // =====================================
  // GET LEAVE DAYS FOR CURRENT MONTH
  // =====================================
  const getLeaveDays = () => {
    const leaveDaysSet = new Set();
    
    if (!leaves || !Array.isArray(leaves)) return leaveDaysSet;
    
    leaves.forEach(leave => {
      try {
        // Single day leave
        if (leave.date) {
          const leaveDate = new Date(leave.date);
          if (
            leaveDate.getMonth() === currentMonth &&
            leaveDate.getFullYear() === currentYear
          ) {
            leaveDaysSet.add(leaveDate.getDate());
          }
        }
        
        // Range leave
        if (leave.fromDate && leave.toDate) {
          const startDate = new Date(leave.fromDate);
          const endDate = new Date(leave.toDate);
          
          let current = new Date(startDate);
          while (current <= endDate) {
            if (
              current.getMonth() === currentMonth &&
              current.getFullYear() === currentYear
            ) {
              leaveDaysSet.add(current.getDate());
            }
            current.setDate(current.getDate() + 1);
          }
        }
      } catch (error) {
        console.error("Error processing leave:", leave);
      }
    });
    
    return leaveDaysSet;
  };

  const leaveDays = getLeaveDays();

  // =====================================
  // CHECK IF DAY IS WEEKEND
  // =====================================
  const isWeekend = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  // =====================================
  // GET ATTENDANCE STATUS (REAL DATA)
  // =====================================
  const getAttendanceStatus = (day) => {
    // 1. Check weekend
    if (isWeekend(day)) return "weekend";
    
    // 2. Check holiday
    if (monthHolidays.includes(day)) return "holiday";
    
    // 3. Check leave
    if (leaveDays.has(day)) return "leave";
    
    // 4. Check today's attendance
    const today = new Date();
    const isToday = 
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear();
    
    if (isToday) {
      // Use real attendance data passed as prop
      return attendanceData?.isPunchedIn ? "present" : "absent";
    }
    
    // 5. For other days - मैं मान रहा हूँ present है
    // REAL APP में यहाँ API से attendance data fetch करें
    return "present";
  };

  // =====================================
  // GENERATE CALENDAR
  // =====================================
  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const calendar = [];

    // Headers
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach((day, index) => {
      calendar.push(
        <div key={`header-${index}`} className="attendance-calendar-day header">
          {day}
        </div>
      );
    });

    // Empty cells
    for (let i = 0; i < firstDay; i++) {
      calendar.push(
        <div key={`empty-${i}`} className="attendance-calendar-day empty" />
      );
    }

    // Days
    for (let day = 1; day <= daysInMonth; day++) {
      const status = getAttendanceStatus(day);
      const isToday = 
        day === new Date().getDate() &&
        currentMonth === new Date().getMonth() &&
        currentYear === new Date().getFullYear();
      
      // Status label
      const getLabel = () => {
        switch(status) {
          case 'present': return 'P';
          case 'absent': return 'A';
          case 'leave': return 'L';
          case 'holiday': return 'H';
          case 'weekend': return 'W';
          default: return '';
        }
      };

      calendar.push(
        <div 
          key={day} 
          className={`attendance-calendar-day ${status} ${isToday ? 'today' : ''}`}
        >
          <div className="day-number">{day}</div>
          <div className="status-label">{getLabel()}</div>
          {isToday && <div className="today-indicator">Today</div>}
        </div>
      );
    }

    return calendar;
  };

  // =====================================
  // CALCULATE STATISTICS
  // =====================================
  const calculateStatistics = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    let present = 0;
    let absent = 0;
    let leave = leaveDays.size;
    let holiday = monthHolidays.length;
    let weekend = 0;
    
    for (let day = 1; day <= daysInMonth; day++) {
      const status = getAttendanceStatus(day);
      
      if (status === "present") present++;
      if (status === "absent") absent++;
      if (status === "weekend") weekend++;
    }
    
    const totalWorkingDays = daysInMonth - weekend - holiday;
    const attendancePercentage = totalWorkingDays > 0 
      ? ((present / totalWorkingDays) * 100).toFixed(1)
      : "0.0";
    
    return {
      present,
      absent,
      leave,
      holiday,
      weekend,
      totalWorkingDays,
      daysInMonth,
      attendancePercentage
    };
  };

  const stats = calculateStatistics();

  // =====================================
  // CHANGE MONTH
  // =====================================
  const changeMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + direction);
      return newDate;
    });
  };

  // =====================================
  // RENDER
  // =====================================
  return (
    <div className="attendance-calendar-modal active" onClick={onClose}>
      <div
        className="attendance-calendar-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>
            📅 Attendance Calendar - {months[currentMonth]} {currentYear}
          </h2>
          <button className="close-modal" onClick={onClose}>
            ✕
          </button>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading attendance data...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <p>⚠️ Error: {error}</p>
            <button 
              className="retry-btn"
              onClick={() => empId && dispatch(fetchAttendanceCalendarData(empId))}
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            {/* User Info */}
            <div className="user-info-section">
              <div className="user-avatar">
                {employee?.name
                  ?.split(" ")
                  .map(n => n[0] || '')
                  .join("")
                  .toUpperCase() || 'U'}
              </div>
              <div className="user-details">
                <h3>{employee?.name || 'Employee Name'}</h3>
                <p>
                  {employee?.designation || 'Designation'} • {employee?.employeeId || empId || 'ID'}
                </p>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="attendance-summary-cards">
              <div className="summary-card present">
                <div className="summary-dot-container">
                  <div className="summary-dot present-dot"></div>
                </div>
                <div className="summary-details">
                  <div className="summary-count">{stats.present}</div>
                  <div className="summary-label">Present</div>
                </div>
              </div>

              <div className="summary-card absent">
                <div className="summary-dot-container">
                  <div className="summary-dot absent-dot"></div>
                </div>
                <div className="summary-details">
                  <div className="summary-count">{stats.absent}</div>
                  <div className="summary-label">Absent</div>
                </div>
              </div>

              <div className="summary-card leave">
                <div className="summary-dot-container">
                  <div className="summary-dot leave-dot"></div>
                </div>
                <div className="summary-details">
                  <div className="summary-count">{stats.leave}</div>
                  <div className="summary-label">Leave</div>
                </div>
              </div>

              <div className="summary-card holiday">
                <div className="summary-dot-container">
                  <div className="summary-dot holiday-dot"></div>
                </div>
                <div className="summary-details">
                  <div className="summary-count">{stats.holiday}</div>
                  <div className="summary-label">Holidays</div>
                </div>
              </div>
            </div>

            {/* Month Navigation */}
            <div className="calendar-month-nav">
              <button className="month-nav-btn" onClick={() => changeMonth(-1)}>
                ◀ Previous
              </button>
              <h3 className="current-month-display">
                {months[currentMonth]} {currentYear}
              </h3>
              <button className="month-nav-btn" onClick={() => changeMonth(1)}>
                Next ▶
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="attendance-calendar-grid">
              {generateCalendar()}
            </div>

            {/* Legend */}
            <div className="attendance-legend">
              <div className="legend-title">Status Legend:</div>
              <div className="legend-items">
                <div className="legend-item">
                  <div className="legend-dot present"></div>
                  <span>Present</span>
                </div>
                <div className="legend-item">
                  <div className="legend-dot absent"></div>
                  <span>Absent</span>
                </div>
                <div className="legend-item">
                  <div className="legend-dot leave"></div>
                  <span>Leave</span>
                </div>
                <div className="legend-item">
                  <div className="legend-dot holiday"></div>
                  <span>Holiday</span>
                </div>
                <div className="legend-item">
                  <div className="legend-dot weekend"></div>
                  <span>Weekend</span>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="attendance-statistics">
              <h4>📊 Monthly Statistics</h4>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-label">Attendance %</div>
                  <div className="stat-value">{stats.attendancePercentage}%</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Working Days</div>
                  <div className="stat-value">{stats.totalWorkingDays}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Total Days</div>
                  <div className="stat-value">{stats.daysInMonth}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Leaves Taken</div>
                  <div className="stat-value">{stats.leave}</div>
                </div>
              </div>
            </div>
          </>
        )}

        <button className="close-calendar-btn" onClick={onClose}>
          Close Calendar
        </button>
      </div>
    </div>
  );
};

export default AttendanceCalendarModal;