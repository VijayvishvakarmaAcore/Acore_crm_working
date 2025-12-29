import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

// 1️⃣ GET SALARY BY MONTH
export const fetchSalaryByMonth = createAsyncThunk(
  "salary/fetchByMonth",
  async ({ employeeId, month, year }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/api/salary/${employeeId}/${month}/${year}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Salary not found");
    }
  }
);

// 2️⃣ DOWNLOAD SALARY SLIP
export const downloadSalarySlip = createAsyncThunk(
  "salary/downloadSlip",
  async (salaryId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/api/salary/slip/${salaryId}`,
        { responseType: "blob" }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue("Slip download failed");
    }
  }
);

const salarySlice = createSlice({
  name: "salary",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSalary: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalaryByMonth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalaryByMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchSalaryByMonth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSalary } = salarySlice.actions;
export default salarySlice.reducer;
