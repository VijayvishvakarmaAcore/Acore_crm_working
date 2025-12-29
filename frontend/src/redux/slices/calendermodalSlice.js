// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosInstance from "../../services/axiosInstance";

// // 🔥 Fetch All Holidays
// export const fetchHolidays = createAsyncThunk(
//   "holidays/fetchAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await axiosInstance.get("/api/holidays");

//       if (res.data.status) return res.data.data;

//       return rejectWithValue("Failed to load holidays");
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Server error"
//       );
//     }
//   }
// );

// const holidaySlice = createSlice({
//   name: "holidays",
//   initialState: {
//     list: [],
//     loading: false,
//     error: null,
//   },

//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchHolidays.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchHolidays.fulfilled, (state, action) => {
//         state.loading = false;
//         state.list = action.payload;
//       })
//       .addCase(fetchHolidays.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default holidaySlice.reducer;



// ye slice he jo  long time ki holidays show  karegi 



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

// 🔥 Fetch Upcoming Holidays Only
export const fetchUpcomingHolidays = createAsyncThunk(
  "holidays/fetchUpcoming",
  async (days = 30, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/api/holidays/upcoming?days=${days}`);

      if (res.data.status) return res.data.data;

      return rejectWithValue("Failed to load upcoming holidays");
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Server error"
      );
    }
  }
);

const calendermodalSlice = createSlice({
  name: "holidays",

  initialState: {
    upcoming: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingHolidays.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUpcomingHolidays.fulfilled, (state, action) => {
        state.loading = false;
        state.upcoming = action.payload;
      })

      .addCase(fetchUpcomingHolidays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default calendermodalSlice.reducer;
