// import { useState } from 'react';
// import { EMPLOYEE_DATA } from '../data/mockData';

// export const useAuth = () => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const login = (email, password) => {
//     return new Promise((resolve, reject) => {
//       setLoading(true);
      
//       setTimeout(() => {
//         if (email && password) {
//           setCurrentUser(EMPLOYEE_DATA);
//           setLoading(false);
//           resolve(EMPLOYEE_DATA);
//         } else {
//           setLoading(false);
//           reject(new Error('Please enter email and password'));
//         }
//       }, 1500);
//     });
//   };

//   const logout = () => {
//     setCurrentUser(null);
//   };

//   return {
//     currentUser,
//     loading,
//     login,
//     logout
//   };
// };




// API adding






// import { useDispatch, useSelector } from "react-redux";
// import { loginUser, registerUser, logout as logoutAction } from "../redux/slices/authSlice";

// export const useAuth = () => {
//   const dispatch = useDispatch();

//   // Redux se state lo
//   const { currentUser, loading } = useSelector((state) => state.auth);

//   // 🔐 LOGIN (API via Redux)
//   const login = (email, password) => {
//     return dispatch(loginUser({ email, password })).unwrap();
//   };

//   // 📝 REGISTER (API via Redux)
//   const register = (data) => {
//     return dispatch(registerUser(data)).unwrap();
//   };

//   // 🚪 LOGOUT (Frontend best practice)
//   const logout = () => {
//     dispatch(logoutAction());
//     localStorage.removeItem("token");
//   };

//   return {
//     currentUser,
//     loading,
//     login,
//     register,
//     logout,
//   };
// };



import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser, logout as logoutAction } from "../redux/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth || {});
  
  const { currentUser = null, loading = false, error = null } = auth;

  const login = async (email, password) => {
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { 
        success: false, 
        error: error?.message || "Login failed" 
      };
    }
  };

  const register = async (formData) => {
    try {
      const result = await dispatch(registerUser(formData)).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { 
        success: false, 
        error: error?.message || "Registration failed" 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(logoutAction());
  };

  return {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
  };
};