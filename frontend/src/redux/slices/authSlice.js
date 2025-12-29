// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../services/axiosInstance";

// /* ================================
//    LOGIN API (ASYNC THUNK)
//    ================================ */
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (loginData, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post(
//         "/api/users/login",
//         loginData
//       );

//       console.log("test")

//       // Agar backend ne status false bheja
//       if (!response.data.status) {
//         return rejectWithValue(response.data.message);
//       }

//       // Success case → poora response bhejo
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Login failed"
//       );
//     }
//   }
// );

// /* ================================
//    INITIAL STATE
//    ================================ */
// const initialState = {
//   user: null,           // employeeId, name, email, profilePicture
//   token: null,          // JWT token
//   loading: false,       // API loading state
//   error: null,          // error message
//   isAuthenticated: false,
// };

// /* ================================
//    AUTH SLICE
//    ================================ */
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logoutUser: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       state.loading = false;
//       state.error = null;

//       // token clear
//       localStorage.removeItem("token");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       /* ---------- LOGIN START ---------- */
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       /* ---------- LOGIN SUCCESS ---------- */
//       .addCase(loginUser.fulfilled, (state, action) => {
//         const data = action.payload.data;

//         state.loading = false;
//         state.user = {
//           employeeId: data.employeeId,
//           name: data.name,
//           email: data.email,
//           profilePicture: data.profilePicture,
//         };
//         state.token = data.token;
//         state.isAuthenticated = true;

//         // token save
//         localStorage.setItem("token", data.token);
//       })

//       /* ---------- LOGIN FAILED ---------- */
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//         state.isAuthenticated = false;
//       });
//   },
// });

// /* ================================
//    EXPORTS
//    ================================ */
// export const { logoutUser } = authSlice.actions;
// export default authSlice.reducer;








// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../services/axiosInstance";

// /* ================================
//    LOGIN API (ASYNC THUNK) - FIXED
//    ================================ */
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (loginData, { rejectWithValue }) => {
//     try {
//       console.log("📤 Sending login request for:", loginData.email);
      
//       // ✅ Send EXACT data format that Postman uses
//       const response = await axiosInstance.post(
//         "/api/users/login",
//         {
//           email: loginData.email,
//           password: loginData.password
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       console.log("📥 API Response:", response.data);

//       // ✅ Check different response formats
//       // Format 1: { success: true, data: {...} }
//       if (response.data.success === true && response.data.data) {
//         return response.data;
//       }
      
//       // Format 2: { status: true, data: {...} }
//       if (response.data.status === true && response.data.data) {
//         return response.data;
//       }
      
//       // Format 3: Direct user data { token: "...", user: {...} }
//       if (response.data.token) {
//         return {
//           status: true,
//           data: {
//             token: response.data.token,
//             ...response.data.user,
//             ...response.data
//           }
//         };
//       }
      
//       // If none of the above, check for error
//       if (response.data.message || response.data.error) {
//         return rejectWithValue(
//           response.data.message || response.data.error || "Login failed"
//         );
//       }
      
//       return rejectWithValue("Invalid response from server");
      
//     } catch (error) {
//       console.error("❌ Login API Error:", {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message
//       });
      
//       // ✅ Handle specific errors
//       if (error.response?.status === 404) {
//         return rejectWithValue("User not found. Please check your email.");
//       }
      
//       if (error.response?.status === 401) {
//         return rejectWithValue("Invalid password. Please try again.");
//       }
      
//       if (error.response?.data?.message) {
//         return rejectWithValue(error.response.data.message);
//       }
      
//       if (error.message === "Network Error") {
//         return rejectWithValue("Cannot connect to server. Check backend.");
//       }
      
//       return rejectWithValue("Server error. Please try again.");
//     }
//   }
// );

// /* ================================
//    INITIAL STATE
//    ================================ */
// const initialState = {
//   user: null,
//   token: localStorage.getItem("token") || null,
//   loading: false,
//   error: null,
//   isAuthenticated: !!localStorage.getItem("token"),
// };

// /* ================================
//    AUTH SLICE
//    ================================ */
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     logoutUser: (state) => {
//       console.log("🚪 Logging out user");
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       state.loading = false;
//       state.error = null;
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//     },
//     clearError: (state) => {
//       state.error = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       /* ---------- LOGIN START ---------- */
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       /* ---------- LOGIN SUCCESS ---------- */
//       .addCase(loginUser.fulfilled, (state, action) => {
//         console.log("✅ Login successful, updating state...");
        
//         // Handle different response formats
//         let userData, token;
        
//         if (action.payload.data) {
//           // Format: { status: true, data: { token, ...userData } }
//           userData = action.payload.data;
//           token = action.payload.data.token;
//         } else if (action.payload.token) {
//           // Format: { token, ...userData }
//           token = action.payload.token;
//           userData = action.payload;
//         } else {
//           // Direct data
//           userData = action.payload;
//           token = action.payload.token;
//         }
        
//         state.loading = false;
//         state.user = {
//           employeeId: userData.employeeId || userData.id || "EMP001",
//           name: userData.name || userData.fullName || "Test User",
//           email: userData.email || "test@acoreithub.com",
//           profilePicture: userData.profilePicture || null,
//           designation: userData.designation || "Software Developer",
//           department: userData.department || "Engineering",
//           ...userData
//         };
//         state.token = token;
//         state.isAuthenticated = true;
//         state.error = null;
        
//         // Save to localStorage
//         if (token) {
//           localStorage.setItem("token", token);
//           localStorage.setItem("user", JSON.stringify(state.user));
//         }
        
//         console.log("🔑 Token saved:", token ? "Yes" : "No");
//         console.log("👤 User set:", state.user);
//       })

//       /* ---------- LOGIN FAILED ---------- */
//       .addCase(loginUser.rejected, (state, action) => {
//         console.log("❌ Login rejected:", action.payload);
//         state.loading = false;
//         state.error = action.payload;
//         state.isAuthenticated = false;
//         state.user = null;
//         state.token = null;
//       });
//   },
// });

// export const { logoutUser, clearError } = authSlice.actions;
// export default authSlice.reducer;











// API adding






import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

// 🔐 LOGIN API
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log("📤 Login request:", { email });
      const res = await axiosInstance.post("/api/users/login", {
        email,
        password,
      });
      console.log("✅ Login response:", res.data);
      return res.data;
    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data || "Login failed");
    }
  }
);

// 📝 REGISTER API
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("📤 Register request:", formData);
      const res = await axiosInstance.post("/api/users/register", formData);
      console.log("✅ Register response:", res.data);
      return res.data;
    } catch (err) {
      console.error("❌ Register error:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data || "Register failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    token: null,
    loading: false,
    error: null,
  },
   reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      localStorage.removeItem("token");
    },

    // 🔥 PROFILE PICTURE UPDATE
    updateProfilePicture: (state, action) => {
      if (state.currentUser) {
        state.currentUser.profilePicture = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.data?.user;
        state.token = action.payload.data?.token;
        if (action.payload.data?.token) {
          localStorage.setItem("token", action.payload.data.token);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout,updateProfilePicture } = authSlice.actions;
export default authSlice.reducer;