import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

// ====================== FETCH DASHBOARD DATA ======================
export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async (userId, { rejectWithValue }) => {
    try {
      const [projectsRes, tasksRes] = await Promise.all([
        axiosInstance.get(`/api/projects/users/${userId}/projects`),
        axiosInstance.get(`/api/tasks/user/${userId}`)
      ]);

      const projects = projectsRes.data?.data || [];
      const tasks = tasksRes.data?.data || [];

      // -------- Project Status --------
      const projectStatus = [
        { status: "In Progress", key: "in-progress", count: projects.filter(p => p.status === "in-progress").length, color: "#3b82f6" },
        { status: "Completed", key: "completed", count: projects.filter(p => p.status === "completed").length, color: "#10b981" },
        { status: "On Hold", key: "on-hold", count: projects.filter(p => p.status === "on-hold").length, color: "#f59e0b" },
        { status: "Cancelled", key: "cancelled", count: projects.filter(p => p.status === "cancelled").length, color: "#ef4444" },
      ];

      // -------- Task Status --------
      const taskStatus = [
        { status: "Completed", key: "completed", count: tasks.filter(t => t.status === "completed").length, color: "#10b981" },
        { status: "In Progress", key: "in-progress", count: tasks.filter(t => t.status === "in-progress").length, color: "#3b82f6" },
        { status: "Pending", key: "pending", count: tasks.filter(t => t.status === "pending").length, color: "#f59e0b" },
        { status: "On Hold", key: "on-hold", count: tasks.filter(t => t.status === "on-hold").length, color: "#ef4444" },
      ];

      // -------- Recent Updates --------
      const recentUpdates = [
        ...projects.slice(0, 3).map(p => ({
          type: "project",
          title: p.title || "No Title",
          status: p.status || "N/A",
          date: p.updatedAt?.split("T")[0] || "N/A"
        })),

        ...tasks.slice(0, 3).map(t => ({
          type: "task",
          title: t.title || "No Title",
          assignedTo: t.assignedTo?.name || "Employee",
          dueDate: t.dueDate?.split("T")[0] || "N/A"
        }))
      ];

      return {
        projectsCount: projects.length,
        tasksCount: tasks.length,
        projectStatus,
        taskStatus,
        recentUpdates
      };

    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch dashboard");
    }
  }
);


const dashboardSlice = createSlice({
  name: "dashboard",

  initialState: {
    loading: false,
    error: null,

    projects: 0,
    tasks: 0,

    projectStatus: [],
    taskStatus: [],
    recentUpdates: []
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;

        state.projects = action.payload.projectsCount;
        state.tasks = action.payload.tasksCount;

        state.projectStatus = action.payload.projectStatus;
        state.taskStatus = action.payload.taskStatus;
        state.recentUpdates = action.payload.recentUpdates;
      })

      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default dashboardSlice.reducer;
