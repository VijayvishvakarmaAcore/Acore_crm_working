import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

const API_BASE = "http://localhost:5000/api/admin";


// ================= EMPLOYEES LIST =================
export const fetchEmployees = createAsyncThunk(
  "admin/employees",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`${API_BASE}/employees`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to load employees");
    }
  }
);


// ================= ACTIVITY STATUS =================
export const fetchActivityStatus = createAsyncThunk(
  "admin/activityStatus",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `${API_BASE}/dashboard/activity-status`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to load activity");
    }
  }
);



const adminEmployeesSlice = createSlice({
  name: "adminEmployees",
  initialState: {
    employees: [],
    activitySummary: null,
    activityList: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ***** EMPLOYEES *****
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload?.data || [];
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ***** ACTIVITY STATUS *****
      .addCase(fetchActivityStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchActivityStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.activitySummary = action.payload?.summary || null;
        state.activityList = action.payload?.detailedList || [];
      })
      .addCase(fetchActivityStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminEmployeesSlice.reducer;
