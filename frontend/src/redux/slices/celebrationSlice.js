import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

// 🔥 Fetch Upcoming Celebrations
export const fetchUpcomingCelebrations = createAsyncThunk(
  "celebrations/fetchUpcoming",
  async (days = 30, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/api/celebrations/upcoming?days=${days}`);

      if (res.data.status) return res.data.data;

      return rejectWithValue("Failed to load celebrations");
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Server error"
      );
    }
  }
);

const celebrationSlice = createSlice({
  name: "celebrations",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingCelebrations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingCelebrations.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUpcomingCelebrations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default celebrationSlice.reducer;
