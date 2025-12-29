import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

// ===============================================
// FETCH USER PROJECTS
// ===============================================
export const fetchUserProjects = createAsyncThunk(
  "projects/fetchUserProjects",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/api/projects/users/${userId}/projects`
      );

      // API expected response:
      // { status:true , count:0 , data:[] }

      return res.data?.data || [];

    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch projects"
      );
    }
  }
);

const projectsSlice = createSlice({
  name: "projects",

  initialState: {
    loading: false,
    error: null,
    list: [],          // all projects
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ================= LOADING =================
      .addCase(fetchUserProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ================= SUCCESS =================
      .addCase(fetchUserProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
      })

      // ================= FAILED =================
      .addCase(fetchUserProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
        state.list = [];
      });
  },
});

export default projectsSlice.reducer;
