// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:5000", // ⚠️ apne backend ka port yahan rakho
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // 🔐 Token interceptor (future APIs ke liye ready)
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default axiosInstance;




import axios from "axios";

// ✅ Simple hardcoded URL - No env issues
const API_BASE_URL = "http://localhost:5000";
console.log("🚀 API URL:", API_BASE_URL);

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false, // ✅ CORS fix
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;