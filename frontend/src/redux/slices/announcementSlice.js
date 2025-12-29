import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

// 🔥 Get ALL announcements
export const fetchAnnouncements = createAsyncThunk(
  "announcements/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/api/announcements");
      if (res.data.status) return res.data.data;
      return rejectWithValue("Failed to load announcements");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Server error");
    }
  }
);

// 🔥 Get ACTIVE announcements
export const fetchActiveAnnouncements = createAsyncThunk(
  "announcements/fetchActive",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/api/announcements/active");
      if (res.data.status) return res.data.data;
      return rejectWithValue("Failed to load active announcements");
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Server error");
    }
  }
);

const announcementSlice = createSlice({
  name: "announcements",
  initialState: {
    list: [],
    active: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder

      // ===== ACTIVE =====
      .addCase(fetchActiveAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveAnnouncements.fulfilled, (state, action) => {
        state.loading = false;
        state.active = action.payload;
      })
      .addCase(fetchActiveAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== ALL =====
      .addCase(fetchAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default announcementSlice.reducer;
