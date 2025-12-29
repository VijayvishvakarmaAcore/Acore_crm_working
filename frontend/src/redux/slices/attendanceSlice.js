// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../services/axiosInstance";

// // 🟢 GET SUMMARY
// export const fetchAttendanceSummary = createAsyncThunk(
//   "attendance/summary",
//   async ({ year, month }, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get(
//         `/admin/attendance/status-chart?date=${year}-${month}-01`
//       );
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // 🔵 GET MONTHLY DATA USING WEEKLY API
// export const fetchMonthlyAttendance = createAsyncThunk(
//   "attendance/month",
//   async ({ year, month }, { rejectWithValue }) => {
//     try {
//       let result = {};

//       const first = new Date(year, month - 1, 1);
//       const last = new Date(year, month, 0);
//       let start = new Date(first);

//       while (start <= last) {
//         let end = new Date(start);
//         end.setDate(end.getDate() + 6);
//         if (end > last) end = last;

//         const s = start.toISOString().split("T")[0];
//         const e = end.toISOString().split("T")[0];

//         const { data } = await axios.get(
//           `/admin/attendance/weekly-report?startDate=${s}&endDate=${e}`
//         );

//         data?.records?.forEach((d) => {
//           const date = d.date.split("T")[0];

//           result[date] =
//             d.status?.toLowerCase() ||
//             (d.isAbsent
//               ? "absent"
//               : d.isLeave
//               ? "leave"
//               : "present");
//         });

//         start.setDate(start.getDate() + 7);
//       }

//       return result;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// const attendanceSlice = createSlice({
//   name: "attendance",
//   initialState: {
//     summary: {
//       present: 0,
//       absent: 0,
//       leave: 0,
//       holidays: 0,
//       halfDay: 0,
//       late: 0,
//     },
//     calendarDays: {},
//     loading: false,
//     error: null,
//   },

//   extraReducers: (builder) => {
//     builder
//       // SUMMARY
//       .addCase(fetchAttendanceSummary.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchAttendanceSummary.fulfilled, (state, action) => {
//         state.loading = false;
//         state.summary = {
//           present: action.payload?.present || 0,
//           absent: action.payload?.absent || 0,
//           leave: action.payload?.leave || 0,
//           holidays: action.payload?.holidays || 0,
//           halfDay: action.payload?.halfDay || 0,
//           late: action.payload?.late || 0,
//         };
//       })
//       .addCase(fetchAttendanceSummary.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // MONTH
//       .addCase(fetchMonthlyAttendance.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchMonthlyAttendance.fulfilled, (state, action) => {
//         state.loading = false;
//         state.calendarDays = action.payload;
//       })
//       .addCase(fetchMonthlyAttendance.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default attendanceSlice.reducer;




// yha par add key he punch in api niche vale cod eme 



// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../services/axiosInstance";


// // 🟢 GET SUMMARY
// export const fetchAttendanceSummary = createAsyncThunk(
//   "attendance/summary",
//   async ({ year, month }, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get(
//         `/admin/attendance/status-chart?date=${year}-${month}-01`
//       );
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );


// // 🔵 GET MONTHLY DATA USING WEEKLY API
// export const fetchMonthlyAttendance = createAsyncThunk(
//   "attendance/month",
//   async ({ year, month }, { rejectWithValue }) => {
//     try {
//       let result = {};

//       const first = new Date(year, month - 1, 1);
//       const last = new Date(year, month, 0);
//       let start = new Date(first);

//       while (start <= last) {
//         let end = new Date(start);
//         end.setDate(end.getDate() + 6);
//         if (end > last) end = last;

//         const s = start.toISOString().split("T")[0];
//         const e = end.toISOString().split("T")[0];

//         const { data } = await axios.get(
//           `/admin/attendance/weekly-report?startDate=${s}&endDate=${e}`
//         );

//         data?.records?.forEach((d) => {
//           const date = d.date.split("T")[0];

//           result[date] =
//             d.status?.toLowerCase() ||
//             (d.isAbsent
//               ? "absent"
//               : d.isLeave
//               ? "leave"
//               : "present");
//         });

//         start.setDate(start.getDate() + 7);
//       }

//       return result;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );


// // 🟣 NEW — PUNCH IN API
// export const punchIn = createAsyncThunk(
//   "attendance/punchIn",
//   async ({ employeeId, latitude, longitude, source }, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.post(
//         `/api/attendance/mark-in`,
//         {
//           employeeId,
//           latitude,
//           longitude,
//           source,
//         }
//       );
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "Punch Failed");
//     }
//   }
// );



// const attendanceSlice = createSlice({
//   name: "attendance",

//   initialState: {
//     summary: {
//       present: 0,
//       absent: 0,
//       leave: 0,
//       holidays: 0,
//       halfDay: 0,
//       late: 0,
//     },

//     calendarDays: {},

//     loading: false,
//     error: null,

//     // 🔥 New Punch State
//     punchLoading: false,
//     punchData: null,
//     punchError: null,
//   },

//   reducers: {},

//   extraReducers: (builder) => {
//     builder

//       // ================= SUMMARY =================
//       .addCase(fetchAttendanceSummary.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchAttendanceSummary.fulfilled, (state, action) => {
//         state.loading = false;
//         state.summary = {
//           present: action.payload?.present || 0,
//           absent: action.payload?.absent || 0,
//           leave: action.payload?.leave || 0,
//           holidays: action.payload?.holidays || 0,
//           halfDay: action.payload?.halfDay || 0,
//           late: action.payload?.late || 0,
//         };
//       })
//       .addCase(fetchAttendanceSummary.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })


//       // ================= MONTH =================
//       .addCase(fetchMonthlyAttendance.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchMonthlyAttendance.fulfilled, (state, action) => {
//         state.loading = false;
//         state.calendarDays = action.payload;
//       })
//       .addCase(fetchMonthlyAttendance.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })


//       // ================= PUNCH IN =================
//       .addCase(punchIn.pending, (state) => {
//         state.punchLoading = true;
//         state.punchError = null;
//       })
//       .addCase(punchIn.fulfilled, (state, action) => {
//         state.punchLoading = false;
//         state.punchData = action.payload;
//       })
//       .addCase(punchIn.rejected, (state, action) => {
//         state.punchLoading = false;
//         state.punchError = action.payload;
//       });
//   },
// });

// export default attendanceSlice.reducer;





// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../services/axiosInstance";

// // 🟢 GET SUMMARY
// export const fetchAttendanceSummary = createAsyncThunk(
//   "attendance/summary",
//   async ({ year, month }, { rejectWithValue }) => {
//     try {
//       const { data } = await axios.get(
//         `/admin/attendance/status-chart?date=${year}-${month}-01`
//       );
//       return data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // 🔵 GET MONTHLY DATA USING WEEKLY API
// export const fetchMonthlyAttendance = createAsyncThunk(
//   "attendance/month",
//   async ({ year, month }, { rejectWithValue }) => {
//     try {
//       let result = {};

//       const first = new Date(year, month - 1, 1);
//       const last = new Date(year, month, 0);
//       let start = new Date(first);

//       while (start <= last) {
//         let end = new Date(start);
//         end.setDate(end.getDate() + 6);
//         if (end > last) end = last;

//         const s = start.toISOString().split("T")[0];
//         const e = end.toISOString().split("T")[0];

//         const { data } = await axios.get(
//           `/admin/attendance/weekly-report?startDate=${s}&endDate=${e}`
//         );

//         data?.records?.forEach((d) => {
//           const date = d.date.split("T")[0];
//           result[date] =
//             d.status?.toLowerCase() ||
//             (d.isAbsent
//               ? "absent"
//               : d.isLeave
//               ? "leave"
//               : "present");
//         });

//         start.setDate(start.getDate() + 7);
//       }

//       return result;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// // 🟣 PUNCH IN API
// export const punchIn = createAsyncThunk(
//   "attendance/punchIn",
//   async ({ employeeId, latitude, longitude, source }, { rejectWithValue }) => {
//     try {
//       console.log("📡 Sending punch-in request:", {
//         employeeId,
//         latitude,
//         longitude,
//         source
//       });
      
//       const { data } = await axios.post(
//         `/api/attendance/mark-in`,
//         {
//           employeeId,
//           latitude,
//           longitude,
//           source: source || "electron",
//         }
//       );
      
//       console.log("✅ Punch-in API response:", data);
//       return data;
      
//     } catch (err) {
//       console.error("❌ Punch-in API error:", err.response?.data || err.message);
//       return rejectWithValue(
//         err.response?.data?.message || 
//         err.response?.data?.error || 
//         "Punch-in failed"
//       );
//     }
//   }
// );

// // 🟠 PUNCH OUT API
// export const punchOut = createAsyncThunk(
//   "attendance/punchOut",
//   async ({ employeeId }, { rejectWithValue }) => {
//     try {
//       console.log("📡 Sending punch-out request:", { employeeId });
      
//       const { data } = await axios.post(
//         `/api/attendance/mark-out`,
//         { employeeId }
//       );
      
//       console.log("✅ Punch-out API response:", data);
//       return data;
      
//     } catch (err) {
//       console.error("❌ Punch-out API error:", err.response?.data || err.message);
//       return rejectWithValue(
//         err.response?.data?.message || 
//         err.response?.data?.error || 
//         "Punch-out failed"
//       );
//     }
//   }
// );

// // 🟡 GET TODAY'S ATTENDANCE STATUS
// export const fetchTodayAttendance = createAsyncThunk(
//   "attendance/today",
//   async (employeeId, { rejectWithValue }) => {
//     try {
//       console.log("📡 Fetching today's attendance for:", employeeId);
      
//       const today = new Date().toISOString().split('T')[0];
//       const { data } = await axios.get(
//         `/api/attendance/today/${employeeId}?date=${today}`
//       );
      
//       console.log("✅ Today's attendance:", data);
//       return data;
      
//     } catch (err) {
//       console.error("❌ Today's attendance error:", err.response?.data || err.message);
//       return rejectWithValue(
//         err.response?.data?.message || 
//         "Failed to fetch today's attendance"
//       );
//     }
//   }
// );

// // 🟤 CHECK PUNCH STATUS
// export const checkPunchStatus = createAsyncThunk(
//   "attendance/checkStatus",
//   async (employeeId, { rejectWithValue }) => {
//     try {
//       console.log("🔍 Checking punch status for:", employeeId);
      
//       const today = new Date().toISOString().split('T')[0];
//       const { data } = await axios.get(
//         `/api/attendance/check/${employeeId}?date=${today}`
//       );
      
//       console.log("✅ Punch status:", data);
//       return data;
      
//     } catch (err) {
//       console.error("❌ Check status error:", err.response?.data || err.message);
//       return rejectWithValue(
//         err.response?.data?.message || 
//         "Failed to check punch status"
//       );
//     }
//   }
// );

// const attendanceSlice = createSlice({
//   name: "attendance",
//   initialState: {
//     summary: {
//       present: 0,
//       absent: 0,
//       leave: 0,
//       holidays: 0,
//       halfDay: 0,
//       late: 0,
//     },
//     calendarDays: {},
    
//     // Punch State
//     punchStatus: {
//       isPunchedIn: false,
//       todayAttendance: null,
//       lastPunchTime: null,
//       location: null,
//       totalHours: 0,
//     },
    
//     // Loading States
//     summaryLoading: false,
//     monthlyLoading: false,
//     punchLoading: false,
//     punchOutLoading: false,
//     todayLoading: false,
    
//     // Error States
//     summaryError: null,
//     monthlyError: null,
//     punchError: null,
//     punchOutError: null,
//     todayError: null,
    
//     // Punch Data
//     punchData: null,
//     punchOutData: null,
//     todayData: null,
//   },

//   reducers: {
//     // Manual state updates
//     setPunchStatus: (state, action) => {
//       state.punchStatus = {
//         ...state.punchStatus,
//         ...action.payload
//       };
//     },
    
//     clearPunchError: (state) => {
//       state.punchError = null;
//       state.punchOutError = null;
//     },
    
//     resetAttendance: (state) => {
//       state.punchStatus = {
//         isPunchedIn: false,
//         todayAttendance: null,
//         lastPunchTime: null,
//         location: null,
//         totalHours: 0,
//       };
//       state.punchData = null;
//       state.punchOutData = null;
//       state.todayData = null;
//       state.punchError = null;
//       state.punchOutError = null;
//     }
//   },

//   extraReducers: (builder) => {
//     builder
//       // ================= SUMMARY =================
//       .addCase(fetchAttendanceSummary.pending, (state) => {
//         state.summaryLoading = true;
//         state.summaryError = null;
//       })
//       .addCase(fetchAttendanceSummary.fulfilled, (state, action) => {
//         state.summaryLoading = false;
//         state.summary = {
//           present: action.payload?.present || 0,
//           absent: action.payload?.absent || 0,
//           leave: action.payload?.leave || 0,
//           holidays: action.payload?.holidays || 0,
//           halfDay: action.payload?.halfDay || 0,
//           late: action.payload?.late || 0,
//         };
//       })
//       .addCase(fetchAttendanceSummary.rejected, (state, action) => {
//         state.summaryLoading = false;
//         state.summaryError = action.payload;
//       })

//       // ================= MONTHLY =================
//       .addCase(fetchMonthlyAttendance.pending, (state) => {
//         state.monthlyLoading = true;
//         state.monthlyError = null;
//       })
//       .addCase(fetchMonthlyAttendance.fulfilled, (state, action) => {
//         state.monthlyLoading = false;
//         state.calendarDays = action.payload;
//       })
//       .addCase(fetchMonthlyAttendance.rejected, (state, action) => {
//         state.monthlyLoading = false;
//         state.monthlyError = action.payload;
//       })

//       // ================= PUNCH IN =================
//       .addCase(punchIn.pending, (state) => {
//         state.punchLoading = true;
//         state.punchError = null;
//       })
//       .addCase(punchIn.fulfilled, (state, action) => {
//         state.punchLoading = false;
//         state.punchData = action.payload;
        
//         if (action.payload?.status) {
//           state.punchStatus.isPunchedIn = true;
//           state.punchStatus.lastPunchTime = new Date().toISOString();
//           state.punchStatus.todayAttendance = action.payload.data;
          
//           if (action.payload.data?.location) {
//             state.punchStatus.location = action.payload.data.location;
//           }
//         }
//       })
//       .addCase(punchIn.rejected, (state, action) => {
//         state.punchLoading = false;
//         state.punchError = action.payload;
//       })

//       // ================= PUNCH OUT =================
//       .addCase(punchOut.pending, (state) => {
//         state.punchOutLoading = true;
//         state.punchOutError = null;
//       })
//       .addCase(punchOut.fulfilled, (state, action) => {
//         state.punchOutLoading = false;
//         state.punchOutData = action.payload;
        
//         if (action.payload?.status) {
//           state.punchStatus.isPunchedIn = false;
//           state.punchStatus.totalHours = action.payload.data?.totalTime || 0;
//         }
//       })
//       .addCase(punchOut.rejected, (state, action) => {
//         state.punchOutLoading = false;
//         state.punchOutError = action.payload;
//       })

//       // ================= TODAY'S ATTENDANCE =================
//       .addCase(fetchTodayAttendance.pending, (state) => {
//         state.todayLoading = true;
//         state.todayError = null;
//       })
//       .addCase(fetchTodayAttendance.fulfilled, (state, action) => {
//         state.todayLoading = false;
//         state.todayData = action.payload;
        
//         if (action.payload?.status) {
//           state.punchStatus.todayAttendance = action.payload.data;
//           state.punchStatus.isPunchedIn = !action.payload.data?.outTime;
          
//           if (action.payload.data?.inTime && !action.payload.data?.outTime) {
//             state.punchStatus.lastPunchTime = action.payload.data.inTime;
//           }
//         }
//       })
//       .addCase(fetchTodayAttendance.rejected, (state, action) => {
//         state.todayLoading = false;
//         state.todayError = action.payload;
//       })

//       // ================= CHECK PUNCH STATUS =================
//       .addCase(checkPunchStatus.pending, (state) => {
//         state.todayLoading = true;
//         state.todayError = null;
//       })
//       .addCase(checkPunchStatus.fulfilled, (state, action) => {
//         state.todayLoading = false;
        
//         if (action.payload?.status) {
//           state.punchStatus.isPunchedIn = action.payload.isPunchedIn || false;
//           state.punchStatus.todayAttendance = action.payload.data;
          
//           if (action.payload.data?.inTime && !action.payload.data?.outTime) {
//             state.punchStatus.lastPunchTime = action.payload.data.inTime;
//           }
//         }
//       })
//       .addCase(checkPunchStatus.rejected, (state, action) => {
//         state.todayLoading = false;
//         state.todayError = action.payload;
//       });
//   },
// });

// export const { 
//   setPunchStatus, 
//   clearPunchError, 
//   resetAttendance 
// } = attendanceSlice.actions;

// export default attendanceSlice.reducer;







/////////adding red


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axiosInstance";

// 🟢 GET SUMMARY
export const fetchAttendanceSummary = createAsyncThunk(
  "attendance/summary",
  async ({ year, month }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/admin/attendance/status-chart?date=${year}-${month}-01`
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🔵 GET MONTHLY DATA USING WEEKLY API
export const fetchMonthlyAttendance = createAsyncThunk(
  "attendance/month",
  async ({ year, month }, { rejectWithValue }) => {
    try {
      let result = {};

      const first = new Date(year, month - 1, 1);
      const last = new Date(year, month, 0);
      let start = new Date(first);

      while (start <= last) {
        let end = new Date(start);
        end.setDate(end.getDate() + 6);
        if (end > last) end = last;

        const s = start.toISOString().split("T")[0];
        const e = end.toISOString().split("T")[0];

        const { data } = await axios.get(
          `/admin/attendance/weekly-report?startDate=${s}&endDate=${e}`
        );

        data?.records?.forEach((d) => {
          const date = d.date.split("T")[0];
          result[date] =
            d.status?.toLowerCase() ||
            (d.isAbsent
              ? "absent"
              : d.isLeave
              ? "leave"
              : "present");
        });

        start.setDate(start.getDate() + 7);
      }

      return result;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🟣 PUNCH IN API (SERVER-SIDE ONLY)
export const punchIn = createAsyncThunk(
  "attendance/punchIn",
  async ({ employeeId, latitude, longitude, source }, { rejectWithValue, dispatch }) => {
    try {
      console.log("📡 [REDUX THUNK] Sending punch-in request to server:", {
        employeeId,
        latitude,
        longitude,
        source
      });
      
      const { data } = await axios.post(
        `/api/attendance/mark-in`,
        {
          employeeId,
          latitude,
          longitude,
          source: source || "electron",
        }
      );
      
      console.log("✅ [REDUX THUNK] Server response:", data);
      
      // ✅ IMPORTANT: Update local state after successful API call
      if (data?.status) {
        dispatch(setPunchStatus({
          isPunchedIn: true,
          lastPunchTime: new Date().toISOString(),
          location: { latitude, longitude }
        }));
      }
      
      return data;
      
    } catch (err) {
      console.error("❌ [REDUX THUNK] Punch-in API error:", err.response?.data || err.message);
      return rejectWithValue(
        err.response?.data?.message || 
        err.response?.data?.error || 
        "Punch-in failed"
      );
    }
  }
);

// 🟠 PUNCH OUT API
export const punchOut = createAsyncThunk(
  "attendance/punchOut",
  async ({ employeeId }, { rejectWithValue, dispatch }) => {
    try {
      console.log("📡 [REDUX THUNK] Sending punch-out request:", { employeeId });
      
      const { data } = await axios.post(
        `/api/attendance/mark-out`,
        { employeeId }
      );
      
      console.log("✅ [REDUX THUNK] Punch-out API response:", data);
      
      // ✅ Update local state after successful API call
      if (data?.status) {
        dispatch(setPunchStatus({
          isPunchedIn: false,
          totalHours: data.data?.totalTime || 0
        }));
      }
      
      return data;
      
    } catch (err) {
      console.error("❌ [REDUX THUNK] Punch-out API error:", err.response?.data || err.message);
      return rejectWithValue(
        err.response?.data?.message || 
        err.response?.data?.error || 
        "Punch-out failed"
      );
    }
  }
);

// 🟡 GET TODAY'S ATTENDANCE STATUS
export const fetchTodayAttendance = createAsyncThunk(
  "attendance/today",
  async (employeeId, { rejectWithValue, dispatch }) => {
    try {
      console.log("📡 [REDUX THUNK] Fetching today's attendance for:", employeeId);
      
      const today = new Date().toISOString().split('T')[0];
      const { data } = await axios.get(
        `/api/attendance/today/${employeeId}?date=${today}`
      );
      
      console.log("✅ [REDUX THUNK] Today's attendance:", data);
      
      if (data?.status) {
        dispatch(setPunchStatus({
          todayAttendance: data.data,
          isPunchedIn: !data.data?.outTime,
          lastPunchTime: data.data?.inTime || null
        }));
      }
      
      return data;
      
    } catch (err) {
      console.error("❌ [REDUX THUNK] Today's attendance error:", err.response?.data || err.message);
      return rejectWithValue(
        err.response?.data?.message || 
        "Failed to fetch today's attendance"
      );
    }
  }
);

// 🟤 CHECK PUNCH STATUS
export const checkPunchStatus = createAsyncThunk(
  "attendance/checkStatus",
  async (employeeId, { rejectWithValue, dispatch }) => {
    try {
      console.log("🔍 [REDUX THUNK] Checking punch status for:", employeeId);
      
      const today = new Date().toISOString().split('T')[0];
      const { data } = await axios.get(
        `/api/attendance/check/${employeeId}?date=${today}`
      );
      
      console.log("✅ [REDUX THUNK] Punch status:", data);
      
      if (data?.status) {
        dispatch(setPunchStatus({
          isPunchedIn: data.isPunchedIn || false,
          todayAttendance: data.data,
          lastPunchTime: data.data?.inTime || null
        }));
      }
      
      return data;
      
    } catch (err) {
      console.error("❌ [REDUX THUNK] Check status error:", err.response?.data || err.message);
      return rejectWithValue(
        err.response?.data?.message || 
        "Failed to check punch status"
      );
    }
  }
);

// 🔥 NEW ACTION: START LOCAL TIMER (NON-API)
// ये action सिर्फ़ local timer start करने के लिए है
export const startLocalTimer = createAsyncThunk(
  "attendance/startLocalTimer",
  async ({ latitude, longitude, source }, { dispatch }) => {
    console.log("⏰ [REDUX THUNK] Starting local timer with location:", {
      latitude, longitude, source
    });
    
    // सिर्फ़ local state update करें, API call नहीं
    dispatch(setPunchStatus({
      isPunchedIn: true,
      location: { latitude, longitude }
    }));
    
    return { success: true, message: "Local timer started" };
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    summary: {
      present: 0,
      absent: 0,
      leave: 0,
      holidays: 0,
      halfDay: 0,
      late: 0,
    },
    calendarDays: {},
    
    // Punch State
    punchStatus: {
      isPunchedIn: false,
      todayAttendance: null,
      lastPunchTime: null,
      location: null,
      totalHours: 0,
      // 🔥 NEW: Local tracking state
      isTimerRunning: false,
      localStartTime: null,
      accumulatedSeconds: 0
    },
    
    // Loading States
    summaryLoading: false,
    monthlyLoading: false,
    punchLoading: false,
    punchOutLoading: false,
    todayLoading: false,
    timerLoading: false,
    
    // Error States
    summaryError: null,
    monthlyError: null,
    punchError: null,
    punchOutError: null,
    todayError: null,
    timerError: null,
    
    // Punch Data
    punchData: null,
    punchOutData: null,
    todayData: null,
  },

  reducers: {
    // Manual state updates
    setPunchStatus: (state, action) => {
      state.punchStatus = {
        ...state.punchStatus,
        ...action.payload
      };
    },
    
    // 🔥 NEW: Timer control actions
    startTimer: (state) => {
      state.punchStatus.isTimerRunning = true;
      state.punchStatus.localStartTime = new Date().toISOString();
      console.log("⏰ [REDUX REDUCER] Timer started");
    },
    
    stopTimer: (state) => {
      if (state.punchStatus.localStartTime) {
        const endTime = new Date();
        const startTime = new Date(state.punchStatus.localStartTime);
        const seconds = Math.floor((endTime - startTime) / 1000);
        
        state.punchStatus.accumulatedSeconds += seconds;
        state.punchStatus.isTimerRunning = false;
        state.punchStatus.localStartTime = null;
        
        console.log(`⏰ [REDUX REDUCER] Timer stopped. Added ${seconds} seconds. Total: ${state.punchStatus.accumulatedSeconds}`);
      }
    },
    
    updateTimer: (state) => {
      if (state.punchStatus.isTimerRunning && state.punchStatus.localStartTime) {
        const currentTime = new Date();
        const startTime = new Date(state.punchStatus.localStartTime);
        const seconds = Math.floor((currentTime - startTime) / 1000);
        
        // Update total hours for display
        const totalSeconds = state.punchStatus.accumulatedSeconds + seconds;
        state.punchStatus.totalHours = totalSeconds / 3600;
        
        // Every 30 seconds log for debugging
        if (seconds % 30 === 0) {
          console.log(`⏱️ [REDUX REDUCER] Timer update: ${totalSeconds} seconds total`);
        }
      }
    },
    
    clearPunchError: (state) => {
      state.punchError = null;
      state.punchOutError = null;
      state.timerError = null;
    },
    
    resetAttendance: (state) => {
      state.punchStatus = {
        isPunchedIn: false,
        todayAttendance: null,
        lastPunchTime: null,
        location: null,
        totalHours: 0,
        isTimerRunning: false,
        localStartTime: null,
        accumulatedSeconds: 0
      };
      state.punchData = null;
      state.punchOutData = null;
      state.todayData = null;
      state.punchError = null;
      state.punchOutError = null;
      state.timerError = null;
    }
  },

  extraReducers: (builder) => {
    builder
      // ================= SUMMARY =================
      .addCase(fetchAttendanceSummary.pending, (state) => {
        state.summaryLoading = true;
        state.summaryError = null;
      })
      .addCase(fetchAttendanceSummary.fulfilled, (state, action) => {
        state.summaryLoading = false;
        state.summary = {
          present: action.payload?.present || 0,
          absent: action.payload?.absent || 0,
          leave: action.payload?.leave || 0,
          holidays: action.payload?.holidays || 0,
          halfDay: action.payload?.halfDay || 0,
          late: action.payload?.late || 0,
        };
      })
      .addCase(fetchAttendanceSummary.rejected, (state, action) => {
        state.summaryLoading = false;
        state.summaryError = action.payload;
      })

      // ================= MONTHLY =================
      .addCase(fetchMonthlyAttendance.pending, (state) => {
        state.monthlyLoading = true;
        state.monthlyError = null;
      })
      .addCase(fetchMonthlyAttendance.fulfilled, (state, action) => {
        state.monthlyLoading = false;
        state.calendarDays = action.payload;
      })
      .addCase(fetchMonthlyAttendance.rejected, (state, action) => {
        state.monthlyLoading = false;
        state.monthlyError = action.payload;
      })

      // ================= PUNCH IN =================
      .addCase(punchIn.pending, (state) => {
        state.punchLoading = true;
        state.punchError = null;
      })
      .addCase(punchIn.fulfilled, (state, action) => {
        state.punchLoading = false;
        state.punchData = action.payload;
        
        if (action.payload?.status) {
          state.punchStatus.isPunchedIn = true;
          state.punchStatus.lastPunchTime = new Date().toISOString();
          state.punchStatus.todayAttendance = action.payload.data;
          
          if (action.payload.data?.location) {
            state.punchStatus.location = action.payload.data.location;
          }
          
          console.log("✅ [REDUX] Punch-in state updated successfully");
        }
      })
      .addCase(punchIn.rejected, (state, action) => {
        state.punchLoading = false;
        state.punchError = action.payload;
        console.error("❌ [REDUX] Punch-in failed:", action.payload);
      })

      // ================= PUNCH OUT =================
      .addCase(punchOut.pending, (state) => {
        state.punchOutLoading = true;
        state.punchOutError = null;
      })
      .addCase(punchOut.fulfilled, (state, action) => {
        state.punchOutLoading = false;
        state.punchOutData = action.payload;
        
        if (action.payload?.status) {
          state.punchStatus.isPunchedIn = false;
          state.punchStatus.totalHours = action.payload.data?.totalTime || 0;
          
          // Stop local timer
          state.punchStatus.isTimerRunning = false;
          state.punchStatus.localStartTime = null;
          
          console.log("✅ [REDUX] Punch-out state updated successfully");
        }
      })
      .addCase(punchOut.rejected, (state, action) => {
        state.punchOutLoading = false;
        state.punchOutError = action.payload;
        console.error("❌ [REDUX] Punch-out failed:", action.payload);
      })

      // ================= TODAY'S ATTENDANCE =================
      .addCase(fetchTodayAttendance.pending, (state) => {
        state.todayLoading = true;
        state.todayError = null;
      })
      .addCase(fetchTodayAttendance.fulfilled, (state, action) => {
        state.todayLoading = false;
        state.todayData = action.payload;
        
        if (action.payload?.status) {
          state.punchStatus.todayAttendance = action.payload.data;
          state.punchStatus.isPunchedIn = !action.payload.data?.outTime;
          
          if (action.payload.data?.inTime && !action.payload.data?.outTime) {
            state.punchStatus.lastPunchTime = action.payload.data.inTime;
          }
        }
      })
      .addCase(fetchTodayAttendance.rejected, (state, action) => {
        state.todayLoading = false;
        state.todayError = action.payload;
      })

      // ================= CHECK PUNCH STATUS =================
      .addCase(checkPunchStatus.pending, (state) => {
        state.todayLoading = true;
        state.todayError = null;
      })
      .addCase(checkPunchStatus.fulfilled, (state, action) => {
        state.todayLoading = false;
        
        if (action.payload?.status) {
          state.punchStatus.isPunchedIn = action.payload.isPunchedIn || false;
          state.punchStatus.todayAttendance = action.payload.data;
          
          if (action.payload.data?.inTime && !action.payload.data?.outTime) {
            state.punchStatus.lastPunchTime = action.payload.data.inTime;
          }
        }
      })
      .addCase(checkPunchStatus.rejected, (state, action) => {
        state.todayLoading = false;
        state.todayError = action.payload;
      })

      // ================= START LOCAL TIMER =================
      .addCase(startLocalTimer.pending, (state) => {
        state.timerLoading = true;
        state.timerError = null;
      })
      .addCase(startLocalTimer.fulfilled, (state) => {
        state.timerLoading = false;
        state.punchStatus.isTimerRunning = true;
        state.punchStatus.localStartTime = new Date().toISOString();
        console.log("✅ [REDUX] Local timer state updated");
      })
      .addCase(startLocalTimer.rejected, (state, action) => {
        state.timerLoading = false;
        state.timerError = action.payload;
      });
  },
});

// 🔥 Export all actions
export const { 
  setPunchStatus, 
  startTimer,
  stopTimer,
  updateTimer,
  clearPunchError, 
  resetAttendance 
} = attendanceSlice.actions;

export default attendanceSlice.reducer;