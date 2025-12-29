import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

// 🔥 PROFILE PICTURE UPLOAD THUNK
export const uploadProfilePicture = createAsyncThunk(
  "profile/uploadProfilePicture",
  async ({ employeeId, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await axiosInstance.put(
        `/api/users/profile/picture/${employeeId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Upload failed" }
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetProfileState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadProfilePicture.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(uploadProfilePicture.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Upload error";
      });
  },
});

export const { resetProfileState } = profileSlice.actions;
export default profileSlice.reducer;
