import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

// ===============================================
// FETCH Employee + Leaves + Holidays Together
// ===============================================
export const fetchAttendanceCalendarData = createAsyncThunk(
  "attendanceCalendar/fetchAll",
  async (empId, { rejectWithValue }) => {
    try {
      const [empRes, leavesRes, holidayRes] = await Promise.all([
        axiosInstance.get(`/api/users/emp/${empId}`),
        axiosInstance.get(`/api/leaves/emp/${empId}`),
        axiosInstance.get(`/api/holidays`)
      ]);

      return {
        employee: empRes.data?.data || null,
        leaves: leavesRes.data?.data || [],
        holidays: holidayRes.data?.data || []
      };

    } catch (err) {
      return rejectWithValue({
        message: err.response?.data?.message || "Calendar data fetching failed"
      });
    }
  }
);


const attendanceCalendarSlice = createSlice({
  name: "attendanceCalendar",
  initialState: {
    loading: false,
    error: null,

    employee: null,
    leaves: [],
    holidays: [],
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendanceCalendarData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAttendanceCalendarData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.employee = payload.employee;
        state.leaves = payload.leaves;
        state.holidays = payload.holidays;
      })

      .addCase(fetchAttendanceCalendarData.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message;
      });
  },
});

export default attendanceCalendarSlice.reducer;
