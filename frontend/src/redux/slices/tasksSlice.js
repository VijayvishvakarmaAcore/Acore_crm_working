import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

// ===============================================
// FETCH USER TASKS
// ===============================================
export const fetchUserTasks = createAsyncThunk(
  "tasks/fetchUserTasks",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/api/tasks/user/${userId}`
      );

      // API Response:
      // {
      //   status: true,
      //   count: 0,
      //   data: []
      // }

      return res.data?.data || [];

    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch tasks"
      );
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",

  initialState: {
    loading: false,
    error: null,
    list: [],
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ================= LOADING =================
      .addCase(fetchUserTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ================= SUCCESS =================
      .addCase(fetchUserTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
      })

      // ================= FAILED =================
      .addCase(fetchUserTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        state.list = [];
      });
  },
});

export default tasksSlice.reducer;
