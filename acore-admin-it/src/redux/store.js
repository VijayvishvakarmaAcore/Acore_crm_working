// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice.js"

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });


import { configureStore } from "@reduxjs/toolkit";
import attendanceAdminReducer from "./slices/attendanceAdminSlice";
import holidaysReducer from "./slices/holidaysSlice";
import adminDashboardReducer from "./slices/adminDashboardSlice";
import adminAuthReducer from "./slices/adminAuthSlice";
import adminEmployeesReducer from "./slices/adminEmployeesSlice";
import adminAttendanceReducer from "./slices/adminAttendanceSlice";
import projectsReducer from "./slices/projectsSlice";
import tasksReducer from "./slices/tasksSlice";


const store = configureStore({
  reducer: {
    attendanceAdmin: attendanceAdminReducer,
    holidays: holidaysReducer,
    adminDashboard: adminDashboardReducer,
    adminAuth: adminAuthReducer,
    adminEmployees: adminEmployeesReducer,
    adminAttendance: adminAttendanceReducer,
    projects: projectsReducer,
    tasks: tasksReducer,
  },
});

export default store;
