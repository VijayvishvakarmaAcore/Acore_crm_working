// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../services/axiosInstance";

// export const applyLeave = createAsyncThunk(
//   "leave/apply",
//   async ({ formData, employeeId, employeeName }, { rejectWithValue }) => {
//     try {
//       console.log("📤 Leave Application Data:", {
//         employeeId,
//         employeeName,
//         formData
//       });

//       // ✅ STEP 1: MAPPING TABLE (Frontend -> Backend)
//       const leaveTypeMap = {
//         'CL': 'casual',      // Frontend: 'CL' -> Backend: 'casual'
//         'SL': 'sick',        // Frontend: 'SL' -> Backend: 'sick'
//         'BL': 'birthday'     // Frontend: 'BL' -> Backend: 'birthday'
//       };

//       // ✅ STEP 2: GET BACKEND-COMPATIBLE LEAVE TYPE
//       const backendLeaveType = leaveTypeMap[formData.type];
      
//       if (!backendLeaveType) {
//         console.error("❌ Invalid leave type:", formData.type);
//         return rejectWithValue({
//           message: "Please select a valid leave type (Casual, Sick, or Birthday)"
//         });
//       }

//       console.log(`🔄 Mapping ${formData.type} to ${backendLeaveType}`);

//       // ✅ STEP 3: CHECK IF SINGLE DAY OR RANGE
//       const isSingleDay = formData.startDate === formData.endDate;
      
//       let payload;
//       let url;

//       if (isSingleDay) {
//         // ✅ SINGLE DAY LEAVE
//         payload = {
//           employeeId,
//           employeeName,
//           leaveType: backendLeaveType, // ✅ MAPPED VALUE
//           reason: formData.reason,
//           date: formData.startDate, // ✅ Note: Single day uses 'date' field
//         };
//         url = "/api/leaves/single";
//       } else {
//         // ✅ RANGE LEAVE
//         payload = {
//           employeeId,
//           employeeName,
//           leaveType: backendLeaveType, // ✅ MAPPED VALUE
//           reason: formData.reason,
//           fromDate: formData.startDate,
//           toDate: formData.endDate,
//           applyType: "range",
//         };
//         url = "/api/leaves/range";
//       }

//       console.log("🚀 Payload to Backend:", payload);
//       console.log("🔗 API URL:", url);

//       // ✅ STEP 4: MAKE API CALL
//       const res = await axiosInstance.post(url, payload);
//       console.log("✅ Backend Response:", res.data);

//       if (res.data.status === true) {
//         return res.data;
//       } else {
//         return rejectWithValue({
//           message: res.data.message || "Leave application failed"
//         });
//       }

//     } catch (err) {
//       console.error("❌ API Error:", err.response?.data || err.message);
      
//       if (err.response) {
//         // Server responded with error
//         return rejectWithValue({
//           message: err.response.data?.message || 
//                   `Server error: ${err.response.status}`
//         });
//       } else if (err.request) {
//         // Request made but no response
//         return rejectWithValue({
//           message: "Network error. Please check your connection."
//         });
//       } else {
//         // Request setup error
//         return rejectWithValue({
//           message: "Request configuration error"
//         });
//       }
//     }
//   }
// );

// const leaveSlice = createSlice({
//   name: "leave",
//   initialState: {
//     loading: false,
//     success: false,
//     error: null,
//   },
//   reducers: {
//     resetLeaveStatus: (state) => {
//       state.loading = false;
//       state.success = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(applyLeave.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(applyLeave.fulfilled, (state) => {
//         state.loading = false;
//         state.success = true;
//       })
//       .addCase(applyLeave.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || "Leave application failed";
//         console.log("❌ Redux Error State:", state.error);
//       });
//   },
// });

// export const { resetLeaveStatus } = leaveSlice.actions;
// export default leaveSlice.reducer;







import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

// ================= TOTAL LEAVE QUOTA =================
const LEAVE_BALANCE = {
  casual: 12,
  sick: 8,
  birthday: 1
};

// ======================================================
// APPLY LEAVE
// ======================================================
export const applyLeave = createAsyncThunk(
  "leave/apply",
  async ({ formData, employeeId, employeeName }, { rejectWithValue }) => {
    try {
      
      const leaveTypeMap = {
        CL: "casual",
        SL: "sick",
        BL: "birthday",
      };

      const backendLeaveType = leaveTypeMap[formData.type];

      if (!backendLeaveType) {
        return rejectWithValue({
          message: "Please select a valid leave type (Casual, Sick, or Birthday)",
        });
      }

      const isSingleDay = formData.startDate === formData.endDate;

      let payload;
      let url;

      if (isSingleDay) {
        payload = {
          employeeId,
          employeeName,
          leaveType: backendLeaveType,
          reason: formData.reason,
          date: formData.startDate,
        };
        url = "/api/leaves/single";
      } else {
        payload = {
          employeeId,
          employeeName,
          leaveType: backendLeaveType,
          reason: formData.reason,
          fromDate: formData.startDate,
          toDate: formData.endDate,
          applyType: "range",
        };
        url = "/api/leaves/range";
      }

      const res = await axiosInstance.post(url, payload);

      if (res.data.status === true) return res.data;

      return rejectWithValue({
        message: res.data.message || "Leave application failed",
      });

    } catch (err) {
      if (err.response) {
        return rejectWithValue({
          message: err.response.data?.message || `Server error: ${err.response.status}`,
        });
      } else if (err.request) {
        return rejectWithValue({
          message: "Network error. Please check your connection.",
        });
      } else {
        return rejectWithValue({
          message: "Request configuration error",
        });
      }
    }
  }
);


// ======================================================
// FETCH EMPLOYEE LEAVES + USED + REMAINING
// ======================================================
export const fetchEmployeeLeaves = createAsyncThunk(
  "leave/fetchEmployeeLeaves",
  async (employeeId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/api/leaves/emp/${employeeId}`);

      if (res.data.status) return res.data.data;

      return rejectWithValue({
        message: "Failed to fetch leave data",
      });

    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || "Something went wrong",
      });
    }
  }
);


// ======================================================
// SLICE
// ======================================================
const leaveSlice = createSlice({
  name: "leave",
  initialState: {
    loading: false,
    success: false,
    error: null,

    employeeLeaves: [],

    leaveStats: {
      casualUsed: 0,
      sickUsed: 0,
      birthdayUsed: 0,

      casualRemaining: LEAVE_BALANCE.casual,
      sickRemaining: LEAVE_BALANCE.sick,
      birthdayRemaining: LEAVE_BALANCE.birthday
    }
  },

  reducers: {
    resetLeaveStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= APPLY LEAVE =================
      .addCase(applyLeave.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(applyLeave.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(applyLeave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Leave application failed";
      })


      // ================= FETCH LEAVES =================
      .addCase(fetchEmployeeLeaves.fulfilled, (state, action) => {
        state.employeeLeaves = action.payload;

        let sick = 0,
          casual = 0,
          birthday = 0;

        action.payload.forEach((leave) => {
          if (leave.leaveType === "sick") sick += leave.days;
          if (leave.leaveType === "casual") casual += leave.days;
          if (leave.leaveType === "birthday") birthday += leave.days;
        });

        state.leaveStats = {
          casualUsed: casual,
          sickUsed: sick,
          birthdayUsed: birthday,

          casualRemaining: Math.max(LEAVE_BALANCE.casual - casual, 0),
          sickRemaining: Math.max(LEAVE_BALANCE.sick - sick, 0),
          birthdayRemaining: Math.max(LEAVE_BALANCE.birthday - birthday, 0),
        };
      })

      .addCase(fetchEmployeeLeaves.rejected, (state, action) => {
        state.employeeLeaves = [];
        state.leaveStats = {
          casualUsed: 0,
          sickUsed: 0,
          birthdayUsed: 0,
          casualRemaining: LEAVE_BALANCE.casual,
          sickRemaining: LEAVE_BALANCE.sick,
          birthdayRemaining: LEAVE_BALANCE.birthday,
        };
        state.error = action.payload?.message;
      });
  },
});

export const { resetLeaveStatus } = leaveSlice.actions;
export default leaveSlice.reducer;
