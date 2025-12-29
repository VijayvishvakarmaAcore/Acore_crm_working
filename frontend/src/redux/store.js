// // import { configureStore } from "@reduxjs/toolkit";
// // import authReducer from "./slices/authSlice.js"

// // export const store = configureStore({
// //   reducer: {
// //     auth: authReducer,
// //   },
// // });


// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";
// import profileReducer from "./slices/profileSlice"
// import leaveReducer  from "./slices/leaveSlice"
// import salaryReducer from "./slices/salarySlice"
// import announcementsReducer from "./slices/announcementSlice";
// import celebrationReducer from "./slices/celebrationSlice";
// import holidayReducer from "./slices/calendermodalSlice";
// import attendanceReducer from "./slices/attendanceSlice";
// import attendanceCalendarReducer from "./slices/attendanceCalendarSlice";
// import projectsReducer from "./slices/projectsSlice";
// import tasksReducer from "./slices/tasksSlice";
// import dashboardReducer from "./slices/dashboardSlice";



// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     profile: profileReducer,
//     leave: leaveReducer,
//     salary: salaryReducer,
//     announcements:announcementsReducer,
//     celebrations: celebrationReducer,
//     holidays: holidayReducer,
//     attendance: attendanceReducer,
//      attendanceCalendar: attendanceCalendarReducer,
//      projects: projectsReducer,
//      tasks: tasksReducer,
//      dashboard: dashboardReducer,


//   },
// });

// export default store;   






// correct vala he 





// store.js में ये add करें:

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import leaveReducer from "./slices/leaveSlice";
import salaryReducer from "./slices/salarySlice";
import announcementsReducer from "./slices/announcementSlice";
import celebrationReducer from "./slices/celebrationSlice";
import holidayReducer from "./slices/calendermodalSlice";
import attendanceReducer from "./slices/attendanceSlice";
import attendanceCalendarReducer from "./slices/attendanceCalendarSlice";
import projectsReducer from "./slices/projectsSlice";
import tasksReducer from "./slices/tasksSlice";
import dashboardReducer from "./slices/dashboardSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    leave: leaveReducer,
    salary: salaryReducer,
    announcements: announcementsReducer,
    celebrations: celebrationReducer,
    holidays: holidayReducer,
    attendance: attendanceReducer,
    attendanceCalendar: attendanceCalendarReducer,
    projects: projectsReducer,
    tasks: tasksReducer,
    dashboard: dashboardReducer,
  },
  // ✅ Middleware configuration (already included by default in Redux Toolkit)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Allows Date objects in state
    }),
});

export default store;