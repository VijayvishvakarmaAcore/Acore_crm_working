// import { useState, useEffect, useRef } from 'react';

// export const useAttendance = () => {
//   const [isPunchedIn, setIsPunchedIn] = useState(false);
//   const [punchInTime, setPunchInTime] = useState(null);
//   const [workingHours, setWorkingHours] = useState(0);
//   const [workingTime, setWorkingTime] = useState('00:00:00');
//   const [canLogout, setCanLogout] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const intervalRef = useRef(null);

//   const handlePunch = async () => {
//     setLoading(true);

//     if (!isPunchedIn) {
//       // Punch In
//       try {
//         // Simulate API call
//         await new Promise(resolve => setTimeout(resolve, 1000));
//         setIsPunchedIn(true);
//         setPunchInTime(new Date());
//         setCanLogout(false);
//         setLoading(false);
//         return { success: true, action: 'in' };
//       } catch (error) {
//         setLoading(false);
//         return { success: false, error: error.message };
//       }
//     } else {
//       // Punch Out
//       if (workingHours >= 7) {
//         try {
//           await new Promise(resolve => setTimeout(resolve, 1000));
//           setIsPunchedIn(false);
//           setPunchInTime(null);
//           setWorkingHours(0);
//           setWorkingTime('00:00:00');
//           setCanLogout(false);
//           setLoading(false);
//           return { success: true, action: 'out' };
//         } catch (error) {
//           setLoading(false);
//           return { success: false, error: error.message };
//         }
//       } else {
//         setLoading(false);
//         return { 
//           success: false, 
//           error: `Complete ${(7 - workingHours).toFixed(2)} more hours before punching out` 
//         };
//       }
//     }
//   };

//   useEffect(() => {
//     if (isPunchedIn && punchInTime) {
//       intervalRef.current = setInterval(() => {
//         const now = new Date();
//         const diff = now - punchInTime;
//         const hours = diff / (1000 * 60 * 60);
//         setWorkingHours(hours);

//         // Update working time display
//         const totalSeconds = Math.floor(diff / 1000);
//         const hoursFormatted = Math.floor(totalSeconds / 3600);
//         const minutesFormatted = Math.floor((totalSeconds % 3600) / 60);
//         const secondsFormatted = totalSeconds % 60;

//         setWorkingTime(
//           `${String(hoursFormatted).padStart(2, '0')}:${String(minutesFormatted).padStart(2, '0')}:${String(secondsFormatted).padStart(2, '0')}`
//         );

//         // Check if 7 hours completed
//         if (hours >= 7) {
//           setCanLogout(true);
//         }
//       }, 1000);
//     } else {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     }

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [isPunchedIn, punchInTime]);

//   return {
//     isPunchedIn,
//     workingHours,
//     workingTime,
//     canLogout,
//     loading,
//     handlePunch
//   };
// };




// import { useState, useEffect } from 'react';
// import useActivityTracker from './useActivityTracker';

// const useAttendance = () => {
//   const [attendance, setAttendance] = useState({
//     isPunchedIn: false,
//     workingHours: 0,
//     workingTime: '00:00',
//     canLogout: false,
//     loading: false,
//     lastPunchIn: null,
//     location: null
//   });

//   const {
//     trackingData,
//     startTracking,
//     stopTracking,
//     getCompletedHours,
//     canLogout,
//     getFormattedTime
//   } = useActivityTracker();

//   // Get user's current location
//   const getCurrentLocation = () => {
//     return new Promise((resolve, reject) => {
//       if (!navigator.geolocation) {
//         reject(new Error('Geolocation is not supported'));
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           resolve({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             timestamp: new Date().toISOString()
//           });
//         },
//         (error) => {
//           reject(error);
//         },
//         {
//           enableHighAccuracy: true,
//           timeout: 10000,
//           maximumAge: 60000
//         }
//       );
//     });
//   };

//   // Punch in function
//   const punchIn = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       // Get location first
//       const location = await getCurrentLocation();

//       // Start activity tracking
//       const trackingStarted = await startTracking();

//       if (trackingStarted) {
//         setAttendance(prev => ({
//           ...prev,
//           isPunchedIn: true,
//           loading: false,
//           lastPunchIn: new Date().toISOString(),
//           location: location,
//           workingHours: 0,
//           workingTime: '00:00',
//           canLogout: false
//         }));

//         // Save to localStorage or send to backend
//         localStorage.setItem('punchInTime', new Date().toISOString());
//         localStorage.setItem('punchInLocation', JSON.stringify(location));

//         return { success: true, location };
//       } else {
//         throw new Error('Failed to start activity tracking');
//       }
//     } catch (error) {
//       console.error('Punch in failed:', error);
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Punch out function
//   const punchOut = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       // Stop activity tracking
//       const trackingResult = await stopTracking();

//       if (trackingResult && trackingResult.success) {
//         const completedHours = getCompletedHours();

//         setAttendance(prev => ({
//           ...prev,
//           isPunchedIn: false,
//           loading: false,
//           workingHours: completedHours,
//           workingTime: getFormattedTime(),
//           canLogout: false
//         }));

//         // Clear localStorage
//         localStorage.removeItem('punchInTime');
//         localStorage.removeItem('punchInLocation');

//         return { 
//           success: true, 
//           totalHours: completedHours,
//           trackingData: trackingResult.data
//         };
//       } else {
//         throw new Error('Failed to stop activity tracking');
//       }
//     } catch (error) {
//       console.error('Punch out failed:', error);
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Update attendance data when tracking data changes
//   useEffect(() => {
//     if (trackingData.isTracking) {
//       const completedHours = getCompletedHours();
//       const canLogoutNow = canLogout();

//       setAttendance(prev => ({
//         ...prev,
//         workingHours: completedHours,
//         workingTime: getFormattedTime(),
//         canLogout: canLogoutNow
//       }));
//     }
//   }, [trackingData, getCompletedHours, canLogout, getFormattedTime]);

//   // Check for existing punch in on component mount
//   useEffect(() => {
//     const punchInTime = localStorage.getItem('punchInTime');
//     if (punchInTime) {
//       // If there's a punch in time in localStorage, resume tracking
//       setAttendance(prev => ({
//         ...prev,
//         isPunchedIn: true,
//         lastPunchIn: punchInTime
//       }));

//       // Resume tracking
//       startTracking();
//     }
//   }, [startTracking]);

//   return {
//     attendance,
//     punchIn,
//     punchOut,
//     trackingData
//   };
// };

// export default useAttendance;



// import { useState, useEffect } from 'react';

// const useAttendance = () => {
//   const [attendance, setAttendance] = useState({
//     isPunchedIn: false,
//     workingHours: 0,
//     workingTime: '00:00',
//     canLogout: false,
//     loading: false
//   });

//   const [startTime, setStartTime] = useState(null);
//   const [activeTime, setActiveTime] = useState(0);

//   // Simple punch in function
//   const punchIn = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       // Get location (optional)
//       const location = await getCurrentLocation();

//       // Start tracking
//       setStartTime(Date.now());
//       setActiveTime(0);

//       setAttendance({
//         isPunchedIn: true,
//         workingHours: 0,
//         workingTime: '00:00',
//         canLogout: false,
//         loading: false
//       });

//       console.log('Punch in successful');
//       return { success: true, location };

//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Simple punch out function
//   const punchOut = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const totalHours = activeTime / (1000 * 60 * 60);

//       setAttendance({
//         isPunchedIn: false,
//         workingHours: totalHours,
//         workingTime: formatTime(totalHours),
//         canLogout: false,
//         loading: false
//       });

//       setStartTime(null);
//       setActiveTime(0);

//       console.log('Punch out successful');
//       return { success: true, totalHours };

//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Get location (simplified)
//   const getCurrentLocation = () => {
//     return new Promise((resolve) => {
//       if (!navigator.geolocation) {
//         resolve({ latitude: null, longitude: null });
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           resolve({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude
//           });
//         },
//         () => {
//           resolve({ latitude: null, longitude: null });
//         }
//       );
//     });
//   };

//   // Format time
//   const formatTime = (hours) => {
//     const totalMinutes = Math.floor(hours * 60);
//     const hrs = Math.floor(totalMinutes / 60);
//     const mins = totalMinutes % 60;
//     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
//   };

//   // Track active time
//   useEffect(() => {
//     let interval;

//     if (attendance.isPunchedIn && startTime) {
//       interval = setInterval(() => {
//         const currentTime = Date.now();
//         const elapsed = currentTime - startTime;
//         setActiveTime(elapsed);

//         const hours = elapsed / (1000 * 60 * 60);
//         const canLogoutNow = hours >= 7;

//         setAttendance(prev => ({
//           ...prev,
//           workingHours: hours,
//           workingTime: formatTime(hours),
//           canLogout: canLogoutNow
//         }));
//       }, 1000);
//     }

//     return () => clearInterval(interval);
//   }, [attendance.isPunchedIn, startTime]);

//   return {
//     attendance,
//     punchIn,
//     punchOut
//   };
// };

// export default useAttendance;









// import { useState, useEffect } from 'react';

// const useAttendance = () => {
//   const [attendance, setAttendance] = useState({
//     isPunchedIn: false,
//     workingHours: 0,
//     workingTime: '00:00',
//     canLogout: false,
//     loading: false,
//     lastPunchIn: null,
//     location: null
//   });

//   const [startTime, setStartTime] = useState(null);

//   // Get user's current location
//   const getCurrentLocation = () => {
//     return new Promise((resolve) => {
//       if (!navigator.geolocation) {
//         resolve({ latitude: null, longitude: null });
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           resolve({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             timestamp: new Date().toISOString()
//           });
//         },
//         () => {
//           resolve({ latitude: null, longitude: null });
//         },
//         {
//           enableHighAccuracy: false,
//           timeout: 10000,
//           maximumAge: 60000
//         }
//       );
//     });
//   };

//   // Punch in function
//   const punchIn = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const location = await getCurrentLocation();
//       const now = Date.now();

//       setStartTime(now);
//       setAttendance({
//         isPunchedIn: true,
//         workingHours: 0,
//         workingTime: '00:00',
//         canLogout: false,
//         loading: false,
//         lastPunchIn: new Date().toISOString(),
//         location: location
//       });

//       // Save to localStorage
//       localStorage.setItem('punchInTime', now.toString());
//       localStorage.setItem('punchInLocation', JSON.stringify(location));

//       return { success: true, location };
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Punch out function
//   const punchOut = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const currentTime = Date.now();
//       const elapsedTime = startTime ? (currentTime - startTime) : 0;
//       const totalHours = elapsedTime / (1000 * 60 * 60);

//       setAttendance({
//         isPunchedIn: false,
//         workingHours: totalHours,
//         workingTime: formatTime(totalHours),
//         canLogout: false,
//         loading: false,
//         lastPunchIn: null,
//         location: null
//       });

//       setStartTime(null);

//       // Clear localStorage
//       localStorage.removeItem('punchInTime');
//       localStorage.removeItem('punchInLocation');

//       return { success: true, totalHours };
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Format time
//   const formatTime = (hours) => {
//     const totalSeconds = Math.floor(hours * 3600);
//     const hrs = Math.floor(totalSeconds / 3600);
//     const mins = Math.floor((totalSeconds % 3600) / 60);
//     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
//   };

//   // Track time when punched in
//   useEffect(() => {
//     let interval;

//     if (attendance.isPunchedIn && startTime) {
//       interval = setInterval(() => {
//         const currentTime = Date.now();
//         const elapsedTime = currentTime - startTime;
//         const hours = elapsedTime / (1000 * 60 * 60);
//         const canLogoutNow = hours >= 7;

//         setAttendance(prev => ({
//           ...prev,
//           workingHours: hours,
//           workingTime: formatTime(hours),
//           canLogout: canLogoutNow
//         }));
//       }, 1000);
//     }

//     return () => clearInterval(interval);
//   }, [attendance.isPunchedIn, startTime]);

//   // Check for existing punch in on component mount
//   useEffect(() => {
//     const punchInTime = localStorage.getItem('punchInTime');
//     if (punchInTime) {
//       const time = parseInt(punchInTime);
//       const currentTime = Date.now();
//       const elapsedTime = currentTime - time;

//       // Only resume if punch in was within last 24 hours
//       if (elapsedTime < 24 * 60 * 60 * 1000) {
//         setStartTime(time);
//         setAttendance(prev => ({
//           ...prev,
//           isPunchedIn: true,
//           lastPunchIn: new Date(time).toISOString()
//         }));
//       } else {
//         // Clear expired punch in
//         localStorage.removeItem('punchInTime');
//         localStorage.removeItem('punchInLocation');
//       }
//     }
//   }, []);

//   return {
//     attendance,
//     punchIn,
//     punchOut
//   };
// };

// export default useAttendance;












// import { useState, useEffect } from 'react';

// const useAttendance = () => {
//   const [attendance, setAttendance] = useState({
//     isPunchedIn: false,
//     workingHours: 0,
//     workingTime: '00:00:00', // ✅ Seconds add kiye
//     canLogout: false,
//     loading: false,
//     lastPunchIn: null,
//     location: null
//   });

//   const [startTime, setStartTime] = useState(null);
//   const [elapsedSeconds, setElapsedSeconds] = useState(0);

//   // Get user's current location
//   const getCurrentLocation = () => {
//     return new Promise((resolve) => {
//       if (!navigator.geolocation) {
//         resolve({ latitude: null, longitude: null });
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           resolve({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             timestamp: new Date().toISOString()
//           });
//         },
//         () => {
//           resolve({ latitude: null, longitude: null });
//         },
//         {
//           enableHighAccuracy: false,
//           timeout: 10000,
//           maximumAge: 60000
//         }
//       );
//     });
//   };

//   // Punch in function
//   const punchIn = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const location = await getCurrentLocation();
//       const now = Date.now();

//       setStartTime(now);
//       setElapsedSeconds(0);
//       setAttendance({
//         isPunchedIn: true,
//         workingHours: 0,
//         workingTime: '00:00:00', // ✅ Initial time with seconds
//         canLogout: false,
//         loading: false,
//         lastPunchIn: new Date().toISOString(),
//         location: location
//       });

//       // Save to localStorage
//       localStorage.setItem('punchInTime', now.toString());
//       localStorage.setItem('punchInLocation', JSON.stringify(location));

//       return { success: true, location };
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Punch out function
//   const punchOut = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const totalHours = elapsedSeconds / 3600;

//       setAttendance({
//         isPunchedIn: false,
//         workingHours: totalHours,
//         workingTime: formatTime(totalHours),
//         canLogout: false,
//         loading: false,
//         lastPunchIn: null,
//         location: null
//       });

//       setStartTime(null);
//       setElapsedSeconds(0);

//       // Clear localStorage
//       localStorage.removeItem('punchInTime');
//       localStorage.removeItem('punchInLocation');

//       return { success: true, totalHours };
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Format time with seconds - ✅ UPDATED
//   const formatTime = (hours) => {
//     const totalSeconds = Math.floor(hours * 3600);
//     const hrs = Math.floor(totalSeconds / 3600);
//     const mins = Math.floor((totalSeconds % 3600) / 60);
//     const secs = totalSeconds % 60;
//     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Track time when punched in - ✅ UPDATED for seconds
//   useEffect(() => {
//     let interval;

//     if (attendance.isPunchedIn && startTime) {
//       interval = setInterval(() => {
//         const currentTime = Date.now();
//         const elapsedTime = currentTime - startTime;
//         const seconds = Math.floor(elapsedTime / 1000);
//         const hours = seconds / 3600;
//         const canLogoutNow = hours >= 7;

//         setElapsedSeconds(seconds);
//         setAttendance(prev => ({
//           ...prev,
//           workingHours: hours,
//           workingTime: formatTime(hours), // ✅ Live updating with seconds
//           canLogout: canLogoutNow
//         }));
//       }, 1000); // ✅ Every second update
//     }

//     return () => clearInterval(interval);
//   }, [attendance.isPunchedIn, startTime]);

//   // Check for existing punch in on component mount
//   useEffect(() => {
//     const punchInTime = localStorage.getItem('punchInTime');
//     if (punchInTime) {
//       const time = parseInt(punchInTime);
//       const currentTime = Date.now();
//       const elapsedTime = currentTime - time;

//       // Only resume if punch in was within last 24 hours
//       if (elapsedTime < 24 * 60 * 60 * 1000) {
//         const seconds = Math.floor(elapsedTime / 1000);
//         const hours = seconds / 3600;

//         setStartTime(time);
//         setElapsedSeconds(seconds);
//         setAttendance(prev => ({
//           ...prev,
//           isPunchedIn: true,
//           workingHours: hours,
//           workingTime: formatTime(hours),
//           lastPunchIn: new Date(time).toISOString(),
//           canLogout: hours >= 7
//         }));
//       } else {
//         // Clear expired punch in
//         localStorage.removeItem('punchInTime');
//         localStorage.removeItem('punchInLocation');
//       }
//     }
//   }, []);

//   return {
//     attendance,
//     punchIn,
//     punchOut
//   };
// };

// export default useAttendance;






// import { useState, useEffect } from 'react';

// const useAttendance = () => {
//   const [attendance, setAttendance] = useState({
//     isPunchedIn: false,
//     workingHours: 0,
//     workingTime: '00:00:00',
//     canLogout: false,
//     loading: false,
//     lastPunchIn: null,
//     location: null
//   });

//   const [startTime, setStartTime] = useState(null);

//   // Get user's current location
//   const getCurrentLocation = () => {
//     return new Promise((resolve) => {
//       if (!navigator.geolocation) {
//         resolve({ latitude: null, longitude: null });
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           resolve({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             timestamp: new Date().toISOString()
//           });
//         },
//         () => {
//           resolve({ latitude: null, longitude: null });
//         }
//       );
//     });
//   };

//   // Punch in function
//   const punchIn = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const location = await getCurrentLocation();
//       const now = Date.now();

//       setStartTime(now);
//       setAttendance({
//         isPunchedIn: true,
//         workingHours: 0,
//         workingTime: '00:00:00',
//         canLogout: false,
//         loading: false,
//         lastPunchIn: new Date().toISOString(),
//         location: location
//       });

//       // ✅ NO storage - complete reset on refresh
//       return { success: true, location };
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Punch out function
//   const punchOut = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const currentTime = Date.now();
//       const elapsedTime = startTime ? (currentTime - startTime) : 0;
//       const totalHours = elapsedTime / 3600000;

//       setAttendance({
//         isPunchedIn: false,
//         workingHours: totalHours,
//         workingTime: formatTime(totalHours),
//         canLogout: false,
//         loading: false,
//         lastPunchIn: null,
//         location: null
//       });

//       setStartTime(null);

//       return { success: true, totalHours };
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Format time with seconds
//   const formatTime = (hours) => {
//     const totalSeconds = Math.floor(hours * 3600);
//     const hrs = Math.floor(totalSeconds / 3600);
//     const mins = Math.floor((totalSeconds % 3600) / 60);
//     const secs = totalSeconds % 60;
//     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Track time when punched in
//   useEffect(() => {
//     let interval;

//     if (attendance.isPunchedIn && startTime) {
//       interval = setInterval(() => {
//         const currentTime = Date.now();
//         const elapsedTime = currentTime - startTime;
//         const hours = elapsedTime / 3600000;
//         const canLogoutNow = hours >= 7;

//         setAttendance(prev => ({
//           ...prev,
//           workingHours: hours,
//           workingTime: formatTime(hours),
//           canLogout: canLogoutNow
//         }));
//       }, 1000);
//     }

//     return () => clearInterval(interval);
//   }, [attendance.isPunchedIn, startTime]);

//   // ✅ NO resume logic - complete reset on page load
//   useEffect(() => {
//     // Clear any existing storage on component mount
//     sessionStorage.removeItem('punchInTime');
//     sessionStorage.removeItem('punchInLocation');
//     localStorage.removeItem('punchInTime');
//     localStorage.removeItem('punchInLocation');
//   }, []);

//   return {
//     attendance,
//     punchIn,
//     punchOut
//   };
// };

// export default useAttendance;













// import { useState, useEffect } from 'react';

// const useAttendance = () => {
//   const [attendance, setAttendance] = useState({
//     isPunchedIn: false,
//     workingHours: 0,
//     workingTime: '00:00:00',
//     canLogout: false,
//     loading: false,
//     lastPunchIn: null,
//     location: null,
//     isIdle: false, // ✅ NEW: Idle status
//     currentApp: 'Browser' // ✅ NEW: Current app
//   });

//   const [startTime, setStartTime] = useState(null);
//   const [elapsedSeconds, setElapsedSeconds] = useState(0);
//   const [isTrackingPaused, setIsTrackingPaused] = useState(false); // ✅ NEW: Pause state

//   // Get user's current location
//   const getCurrentLocation = () => {
//     return new Promise((resolve) => {
//       if (!navigator.geolocation) {
//         resolve({ latitude: null, longitude: null });
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           resolve({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             timestamp: new Date().toISOString()
//           });
//         },
//         () => {
//           resolve({ latitude: null, longitude: null });
//         }
//       );
//     });
//   };

//   // Punch in function
//   const punchIn = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const location = await getCurrentLocation();
//       const now = Date.now();

//       setStartTime(now);
//       setElapsedSeconds(0);
//       setIsTrackingPaused(false);

//       setAttendance({
//         isPunchedIn: true,
//         workingHours: 0,
//         workingTime: '00:00:00',
//         canLogout: false,
//         loading: false,
//         lastPunchIn: new Date().toISOString(),
//         location: location,
//         isIdle: false,
//         currentApp: 'Browser'
//       });

//       // ✅ Setup Electron tracking if available
//       if (window.electronAPI) {
//         await window.electronAPI.startTracking();

//         // ✅ Listen for real-time updates from Electron
//         window.electronAPI.onActivityUpdate((data) => {
//           console.log('🔄 Electron Activity Update:', data);

//           setAttendance(prev => ({
//             ...prev,
//             isIdle: data.isIdle,
//             currentApp: data.currentApp || 'Browser'
//           }));

//           setIsTrackingPaused(data.isIdle);
//         });
//       }

//       return { success: true, location };
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Punch out function
//   const punchOut = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const totalHours = elapsedSeconds / 3600;

//       // ✅ Stop Electron tracking if available
//       if (window.electronAPI) {
//         await window.electronAPI.stopTracking();
//       }

//       setAttendance({
//         isPunchedIn: false,
//         workingHours: totalHours,
//         workingTime: formatTime(totalHours),
//         canLogout: false,
//         loading: false,
//         lastPunchIn: null,
//         location: null,
//         isIdle: false,
//         currentApp: 'Browser'
//       });

//       setStartTime(null);
//       setElapsedSeconds(0);
//       setIsTrackingPaused(false);

//       return { success: true, totalHours };
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Format time with seconds
//   const formatTime = (hours) => {
//     const totalSeconds = Math.floor(hours * 3600);
//     const hrs = Math.floor(totalSeconds / 3600);
//     const mins = Math.floor((totalSeconds % 3600) / 60);
//     const secs = totalSeconds % 60;
//     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Track time when punched in
//   useEffect(() => {
//     let interval;

//     if (attendance.isPunchedIn && startTime && !isTrackingPaused) {
//       interval = setInterval(() => {
//         const currentTime = Date.now();
//         const elapsedTime = currentTime - startTime;
//         const seconds = Math.floor(elapsedTime / 1000);
//         const hours = seconds / 3600;
//         const canLogoutNow = hours >= 7;

//         setElapsedSeconds(seconds);
//         setAttendance(prev => ({
//           ...prev,
//           workingHours: hours,
//           workingTime: formatTime(hours),
//           canLogout: canLogoutNow
//         }));
//       }, 1000);
//     }

//     return () => clearInterval(interval);
//   }, [attendance.isPunchedIn, startTime, isTrackingPaused]);

//   return {
//     attendance,
//     punchIn,
//     punchOut
//   };
// };

// export default useAttendance;










// import { useState, useEffect } from 'react';

// const useAttendance = () => {
//   const [attendance, setAttendance] = useState({
//     isPunchedIn: false,
//     workingHours: 0,
//     workingTime: '00:00:00',
//     canLogout: false,
//     loading: false,
//     lastPunchIn: null,
//     location: null,
//     isIdle: false,
//     currentApp: 'Browser'
//   });

//   const [startTime, setStartTime] = useState(null);
//   const [accumulatedTime, setAccumulatedTime] = useState(0); // ✅ TOTAL accumulated time
//   const [idleStartTime, setIdleStartTime] = useState(null); // ✅ When idle started

//   // Get user's current location
//   const getCurrentLocation = () => {
//     return new Promise((resolve) => {
//       if (!navigator.geolocation) {
//         resolve({ latitude: null, longitude: null });
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           resolve({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             timestamp: new Date().toISOString()
//           });
//         },
//         () => {
//           resolve({ latitude: null, longitude: null });
//         }
//       );
//     });
//   };

//   // Punch in function
//   const punchIn = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const location = await getCurrentLocation();
//       const now = Date.now();

//       setStartTime(now);
//       setAccumulatedTime(0);
//       setIdleStartTime(null);

//       setAttendance({
//         isPunchedIn: true,
//         workingHours: 0,
//         workingTime: '00:00:00',
//         canLogout: false,
//         loading: false,
//         lastPunchIn: new Date().toISOString(),
//         location: location,
//         isIdle: false,
//         currentApp: 'Browser'
//       });

//       // ✅ Setup Electron tracking
//       if (window.electronAPI) {
//         await window.electronAPI.startTracking();

//         // ✅ Listen for real-time idle updates
//         window.electronAPI.onActivityUpdate((data) => {
//           console.log('🔄 Electron Activity Update:', data);

//           if (data.isIdle && !attendance.isIdle) {
//             // ✅ IDLE STARTED - Record the time when idle started
//             setIdleStartTime(Date.now());
//           } 
//           else if (!data.isIdle && attendance.isIdle) {
//             // ✅ IDLE ENDED - Add the accumulated time before idle
//             const idleEndTime = Date.now();
//             const idleDuration = idleEndTime - idleStartTime;

//             // ✅ DON'T add idle time to accumulated time
//             // Just continue from where we left
//             setStartTime(prev => prev + idleDuration); // Adjust start time
//           }

//           setAttendance(prev => ({
//             ...prev,
//             isIdle: data.isIdle,
//             currentApp: data.currentApp || 'Browser'
//           }));
//         });
//       }

//       return { success: true, location };
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Punch out function
//   const punchOut = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const totalHours = accumulatedTime / 3600000; // Convert ms to hours

//       // ✅ Stop Electron tracking
//       if (window.electronAPI) {
//         await window.electronAPI.stopTracking();
//         window.electronAPI.removeAllListeners('activity-update');
//       }

//       setAttendance({
//         isPunchedIn: false,
//         workingHours: totalHours,
//         workingTime: formatTime(totalHours),
//         canLogout: false,
//         loading: false,
//         lastPunchIn: null,
//         location: null,
//         isIdle: false,
//         currentApp: 'Browser'
//       });

//       setStartTime(null);
//       setAccumulatedTime(0);
//       setIdleStartTime(null);

//       return { success: true, totalHours };
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Format time with seconds
//   const formatTime = (hours) => {
//     const totalSeconds = Math.floor(hours * 3600);
//     const hrs = Math.floor(totalSeconds / 3600);
//     const mins = Math.floor((totalSeconds % 3600) / 60);
//     const secs = totalSeconds % 60;
//     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   // ✅ UPDATED: Track time with proper idle handling
//   useEffect(() => {
//     let interval;

//     if (attendance.isPunchedIn && startTime && !attendance.isIdle) {
//       interval = setInterval(() => {
//         const currentTime = Date.now();
//         const elapsedTime = currentTime - startTime;
//         const hours = elapsedTime / 3600000; // ms to hours
//         const canLogoutNow = hours >= 7;

//         setAccumulatedTime(elapsedTime);
//         setAttendance(prev => ({
//           ...prev,
//           workingHours: hours,
//           workingTime: formatTime(hours),
//           canLogout: canLogoutNow
//         }));
//       }, 1000);
//     }

//     return () => clearInterval(interval);
//   }, [attendance.isPunchedIn, startTime, attendance.isIdle]);

//   // ✅ Handle component unmount
//   useEffect(() => {
//     return () => {
//       if (window.electronAPI) {
//         window.electronAPI.removeAllListeners('activity-update');
//       }
//     };
//   }, []);

//   return {
//     attendance,
//     punchIn,
//     punchOut
//   };
// };

// export default useAttendance;







// import { useState, useEffect, useRef } from 'react';

// const useAttendance = () => {
//   const [attendance, setAttendance] = useState({
//     isPunchedIn: false,
//     workingHours: 0,
//     workingTime: '00:00:00',
//     canLogout: false,
//     loading: false,
//     lastPunchIn: null,
//     location: null,
//     isIdle: false,
//     currentApp: 'Browser'
//   });

//   // ✅ useRef for stable values
//   const accumulatedSecondsRef = useRef(0);
//   const timerIntervalRef = useRef(null);
//   const isIdleRef = useRef(false);

//   // Get user's current location
//   const getCurrentLocation = () => {
//     return new Promise((resolve) => {
//       if (!navigator.geolocation) {
//         resolve({ latitude: null, longitude: null });
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           resolve({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             timestamp: new Date().toISOString()
//           });
//         },
//         () => {
//           resolve({ latitude: null, longitude: null });
//         }
//       );
//     });
//   };

//   // Format time with seconds
//   const formatTime = (seconds) => {
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Start/Stop timer
//   const manageTimer = (shouldStart) => {
//     if (timerIntervalRef.current) {
//       clearInterval(timerIntervalRef.current);
//       timerIntervalRef.current = null;
//     }

//     if (shouldStart && !isIdleRef.current) {
//       console.log('⏰ Timer STARTED');

//       timerIntervalRef.current = setInterval(() => {
//         accumulatedSecondsRef.current += 1;

//         const hours = accumulatedSecondsRef.current / 3600;
//         const canLogoutNow = hours >= 7;

//         setAttendance(prev => ({
//           ...prev,
//           workingHours: hours,
//           workingTime: formatTime(accumulatedSecondsRef.current),
//           canLogout: canLogoutNow
//         }));

//         // Log every 30 seconds
//         if (accumulatedSecondsRef.current % 30 === 0) {
//           console.log(`⏱️ Timer: ${formatTime(accumulatedSecondsRef.current)}`);
//         }
//       }, 1000);
//     } else {
//       console.log('⏸️ Timer STOPPED');
//     }
//   };

//   // Punch in function
//   const punchIn = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const location = await getCurrentLocation();

//       accumulatedSecondsRef.current = 0;
//       isIdleRef.current = false;

//       setAttendance(prev => ({ // Updated to use functional update to ensure no stale state
//         ...prev,
//         isPunchedIn: true,
//         workingHours: 0,
//         workingTime: '00:00:00',
//         canLogout: false,
//         loading: false, // Ensure loading is set to false here
//         lastPunchIn: new Date().toISOString(),
//         location: location,
//         isIdle: false,
//         currentApp: 'Browser'
//       }));

//       // ✅ Setup Electron tracking
//       if (window.electronAPI) {
//         await window.electronAPI.startTracking();

//         window.electronAPI.onActivityUpdate((data) => {
//           console.log('🔄 Electron Update:', {
//             isIdle: data.isIdle,
//             wasIdle: isIdleRef.current,
//             seconds: accumulatedSecondsRef.current
//           });

//           // ✅ Handle idle state change
//           if (data.isIdle !== isIdleRef.current) {
//             isIdleRef.current = data.isIdle;

//             setAttendance(prev => ({
//               ...prev,
//               isIdle: data.isIdle,
//               currentApp: data.currentApp || 'Browser'
//             }));

//             // ✅ Manage timer based on idle state
//             if (data.isIdle) {
//               console.log('⏸️ Going IDLE - Timer PAUSED');
//               manageTimer(false); // Stop timer
//             } else {
//               console.log('🎯 Becoming ACTIVE - Timer RESUMING');
//               manageTimer(true); // Start timer
//             }
//           }
//         });
//       }

//       // Start timer initially - IMPORTANT: This must run after state update
//       manageTimer(true);

//       return { success: true, location };
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Punch out function
//   const punchOut = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const totalHours = accumulatedSecondsRef.current / 3600;

//       // Stop everything
//       manageTimer(false);

//       if (window.electronAPI) {
//         await window.electronAPI.stopTracking();
//         window.electronAPI.removeAllListeners('activity-update');
//       }

//       setAttendance(prev => ({ // Functional update
//         ...prev,
//         isPunchedIn: false,
//         workingHours: totalHours,
//         workingTime: formatTime(accumulatedSecondsRef.current),
//         canLogout: false,
//         loading: false,
//         lastPunchIn: null,
//         location: null,
//         isIdle: false,
//         currentApp: 'Browser'
//       }));

//       accumulatedSecondsRef.current = 0;
//       isIdleRef.current = false;

//       return { success: true, totalHours };
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (timerIntervalRef.current) {
//         clearInterval(timerIntervalRef.current);
//       }
//       if (window.electronAPI) {
//         window.electronAPI.removeAllListeners('activity-update');
//       }
//     };
//   }, []);

//   return {
//     attendance,
//     punchIn,
//     punchOut
//   };
// };

// export default useAttendance;




























// import { useState, useEffect, useRef } from 'react';

// const useAttendance = () => {
//   const [attendance, setAttendance] = useState({
//     isPunchedIn: false,
//     workingHours: 0,
//     workingTime: '00:00:00',
//     canLogout: false,
//     loading: false,
//     lastPunchIn: null,
//     location: null,
//     isIdle: false,
//     currentApp: 'Browser'
//   });

//   // ✅ useRef for stable values
//   const accumulatedSecondsRef = useRef(0);
//   const timerIntervalRef = useRef(null);
//   const isIdleRef = useRef(false);

//   // Get user's current location
//   const getCurrentLocation = () => {
//     return new Promise((resolve) => {
//       if (!navigator.geolocation) {
//         resolve({ latitude: null, longitude: null });
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           resolve({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             timestamp: new Date().toISOString()
//           });
//         },
//         () => {
//           resolve({ latitude: null, longitude: null });
//         }
//       );
//     });
//   };

//   // Format time with seconds
//   const formatTime = (seconds) => {
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Start/Stop timer
//   const manageTimer = (shouldStart) => {
//     if (timerIntervalRef.current) {
//       clearInterval(timerIntervalRef.current);
//       timerIntervalRef.current = null;
//     }

//     if (shouldStart && !isIdleRef.current) {
//       console.log('⏰ Timer STARTED');

//       timerIntervalRef.current = setInterval(() => {
//         accumulatedSecondsRef.current += 1;

//         const hours = accumulatedSecondsRef.current / 3600;
//         const canLogoutNow = hours >= 7;

//         setAttendance(prev => ({
//           ...prev,
//           workingHours: hours,
//           workingTime: formatTime(accumulatedSecondsRef.current),
//           canLogout: canLogoutNow
//         }));

//         // Log every 30 seconds
//         if (accumulatedSecondsRef.current % 30 === 0) {
//           console.log(`⏱️ Timer: ${formatTime(accumulatedSecondsRef.current)}`);
//         }
//       }, 1000);
//     } else {
//       console.log('⏸️ Timer STOPPED');
//     }
//   };

//   // Punch in function
//   const punchIn = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const location = await getCurrentLocation();

//       accumulatedSecondsRef.current = 0;
//       isIdleRef.current = false;

//       setAttendance(prev => ({ // Updated to use functional update to ensure no stale state
//         ...prev,
//         isPunchedIn: true,
//         workingHours: 0,
//         workingTime: '00:00:00',
//         canLogout: false,
//         loading: false, // Ensure loading is set to false here
//         lastPunchIn: new Date().toISOString(),
//         location: location,
//         isIdle: false,
//         currentApp: 'Browser'
//       }));

//       // ✅ Setup Electron tracking
//       if (window.electronAPI) {
//         await window.electronAPI.startTracking();

//         window.electronAPI.onActivityUpdate((data) => {
//           console.log('🔄 Electron Update:', {
//             isIdle: data.isIdle,
//             wasIdle: isIdleRef.current,
//             seconds: accumulatedSecondsRef.current
//           });

//           // ✅ Handle idle state change
//           if (data.isIdle !== isIdleRef.current) {
//             isIdleRef.current = data.isIdle;

//             setAttendance(prev => ({
//               ...prev,
//               isIdle: data.isIdle,
//               currentApp: data.currentApp || 'Browser'
//             }));

//             // ✅ Manage timer based on idle state
//             if (data.isIdle) {
//               console.log('⏸️ Going IDLE - Timer PAUSED');
//               manageTimer(false); // Stop timer
//             } else {
//               console.log('🎯 Becoming ACTIVE - Timer RESUMING');
//               manageTimer(true); // Start timer
//             }
//           }
//         });
//       }

//       // Start timer initially - IMPORTANT: This must run after state update
//       manageTimer(true);

//       return { success: true, location };
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Punch out function
//   const punchOut = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const totalHours = accumulatedSecondsRef.current / 3600;

//       // Stop everything
//       manageTimer(false);

//       if (window.electronAPI) {
//         await window.electronAPI.stopTracking();
//         window.electronAPI.removeAllListeners('activity-update');
//       }

//       setAttendance(prev => ({ // Functional update
//         ...prev,
//         isPunchedIn: false,
//         workingHours: totalHours,
//         workingTime: formatTime(accumulatedSecondsRef.current),
//         canLogout: false,
//         loading: false,
//         lastPunchIn: null,
//         location: null,
//         isIdle: false,
//         currentApp: 'Browser'
//       }));

//       accumulatedSecondsRef.current = 0;
//       isIdleRef.current = false;

//       return { success: true, totalHours };
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (timerIntervalRef.current) {
//         clearInterval(timerIntervalRef.current);
//       }
//       if (window.electronAPI) {
//         window.electronAPI.removeAllListeners('activity-update');
//       }
//     };
//   }, []);

//   return {
//     attendance,
//     punchIn,
//     punchOut
//   };
// };

// export default useAttendance;




// ye originall vala he 


































// import { useState, useEffect, useRef } from 'react';

// const useAttendance = () => {
//   const [attendance, setAttendance] = useState({
//     isPunchedIn: false,
//     workingHours: 0,
//     workingTime: '0h 0m',
//     canLogout: false,
//     loading: false,
//     isIdle: false,
//     currentApp: 'Browser'
//   });

//   const accumulatedSecondsRef = useRef(0);
//   const timerIntervalRef = useRef(null);
//   const activityCleanupRef = useRef(null);

//   // Check Electron
//   const isElectron = !!window.electronAPI;

//   // Format time
//   const formatTime = (seconds) => {
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     return `${hrs}h ${mins}m`;
//   };

//   // Timer management
//   const manageTimer = (shouldStart) => {
//     if (timerIntervalRef.current) {
//       clearInterval(timerIntervalRef.current);
//     }

//     if (shouldStart) {
//       timerIntervalRef.current = setInterval(() => {
//         accumulatedSecondsRef.current += 1;
//         const hours = accumulatedSecondsRef.current / 3600;
        
//         setAttendance(prev => ({
//           ...prev,
//           workingHours: hours,
//           workingTime: formatTime(accumulatedSecondsRef.current),
//           canLogout: hours >= 7
//         }));
//       }, 1000);
//     }
//   };

//   // Setup Electron tracking
//   const setupElectronTracking = () => {
//     if (!isElectron || !window.electronAPI?.onActivityUpdate) return null;

//     const cleanup = window.electronAPI.onActivityUpdate((data) => {
//       setAttendance(prev => ({
//         ...prev,
//         isIdle: data.isIdle,
//         currentApp: data.currentApp || 'Desktop'
//       }));

//       // Pause/resume timer based on idle state
//       if (data.isIdle) {
//         manageTimer(false);
//       } else {
//         manageTimer(true);
//       }
//     });

//     return cleanup;
//   };

//   // Punch in
//   const punchIn = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       accumulatedSecondsRef.current = 0;
      
//       const newState = {
//         isPunchedIn: true,
//         workingHours: 0,
//         workingTime: '0h 0m',
//         canLogout: false,
//         loading: false,
//         isIdle: false,
//         currentApp: isElectron ? 'Desktop' : 'Browser'
//       };

//       setAttendance(newState);

//       // Start timer
//       manageTimer(true);

//       // Setup Electron tracking
//       if (isElectron) {
//         activityCleanupRef.current = setupElectronTracking();
//       }

//       return { success: true };

//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Punch out
//   const punchOut = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const totalHours = accumulatedSecondsRef.current / 3600;

//       // Stop timer
//       manageTimer(false);

//       // Cleanup Electron
//       if (activityCleanupRef.current) {
//         activityCleanupRef.current();
//         activityCleanupRef.current = null;
//       }

//       // Stop Electron tracking
//       if (isElectron && window.electronAPI?.stopTracking) {
//         try {
//           await window.electronAPI.stopTracking();
//         } catch (err) {
//           console.warn("Stop tracking error:", err);
//         }
//       }

//       setAttendance({
//         isPunchedIn: false,
//         workingHours: totalHours,
//         workingTime: formatTime(accumulatedSecondsRef.current),
//         canLogout: false,
//         loading: false,
//         isIdle: false,
//         currentApp: 'Browser'
//       });

//       accumulatedSecondsRef.current = 0;

//       return { success: true, totalHours };

//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Cleanup
//   useEffect(() => {
//     return () => {
//       if (timerIntervalRef.current) {
//         clearInterval(timerIntervalRef.current);
//       }
//       if (activityCleanupRef.current) {
//         activityCleanupRef.current();
//       }
//     };
//   }, []);

//   return {
//     attendance,
//     punchIn,
//     punchOut
//   };
// };

// export default useAttendance;


// counter miss he yaha se 














// import { useState, useEffect, useRef } from 'react';

// const useAttendance = () => {
//   const [attendance, setAttendance] = useState({
//     isPunchedIn: false,
//     workingHours: 0,
//     workingTime: '00:00:00',
//     canLogout: false,
//     loading: false,
//     isIdle: false,
//     currentApp: 'Browser'
//   });

//   const accumulatedSecondsRef = useRef(0);
//   const timerIntervalRef = useRef(null);
//   const isIdleRef = useRef(false);

//   // Format time function
//   const formatTime = (seconds) => {
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Manage timer function
//   const manageTimer = (shouldStart) => {
//     if (timerIntervalRef.current) {
//       clearInterval(timerIntervalRef.current);
//       timerIntervalRef.current = null;
//     }

//     if (shouldStart && !isIdleRef.current) {
//       timerIntervalRef.current = setInterval(() => {
//         accumulatedSecondsRef.current += 1;
//         const hours = accumulatedSecondsRef.current / 3600;
//         const canLogoutNow = hours >= 7;

//         setAttendance(prev => ({
//           ...prev,
//           workingHours: hours,
//           workingTime: formatTime(accumulatedSecondsRef.current),
//           canLogout: canLogoutNow
//         }));
//       }, 1000);
//     }
//   };

//   // Punch in function
//   const punchIn = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       // Get location before punching in
//       let location = null;
//       let locationSource = 'browser';

//       if (window.electronAPI && window.electronAPI.getCurrentLocation) {
//         try {
//           const result = await window.electronAPI.getCurrentLocation();
//           if (result.success) {
//             location = result;
//             locationSource = result.source || 'electron';
//           }
//         } catch (error) {
//           console.error("Electron location error:", error);
//         }
//       }

//       // Reset timer
//       accumulatedSecondsRef.current = 0;
//       isIdleRef.current = false;

//       setAttendance({
//         isPunchedIn: true,
//         workingHours: 0,
//         workingTime: '00:00:00',
//         canLogout: false,
//         loading: false,
//         isIdle: false,
//         currentApp: 'Browser'
//       });

//       // Start Electron tracking if available
//       if (window.electronAPI) {
//         await window.electronAPI.startTracking();

//         window.electronAPI.onActivityUpdate((data) => {
//           if (data.isIdle !== isIdleRef.current) {
//             isIdleRef.current = data.isIdle;

//             setAttendance(prev => ({
//               ...prev,
//               isIdle: data.isIdle,
//               currentApp: data.currentApp || 'Browser'
//             }));

//             // Manage timer based on idle state
//             if (data.isIdle) {
//               manageTimer(false);
//             } else {
//               manageTimer(true);
//             }
//           }
//         });
//       }

//       // Start timer
//       manageTimer(true);

//       return { success: true, location, source: locationSource };
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Punch out function
//   const punchOut = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const totalHours = accumulatedSecondsRef.current / 3600;

//       // Stop everything
//       manageTimer(false);

//       if (window.electronAPI) {
//         await window.electronAPI.stopTracking();
//         window.electronAPI.removeAllListeners('activity-update');
//       }

//       setAttendance({
//         isPunchedIn: false,
//         workingHours: totalHours,
//         workingTime: formatTime(accumulatedSecondsRef.current),
//         canLogout: false,
//         loading: false,
//         isIdle: false,
//         currentApp: 'Browser'
//       });

//       accumulatedSecondsRef.current = 0;
//       isIdleRef.current = false;

//       return { success: true, totalHours };
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Cleanup
//   useEffect(() => {
//     return () => {
//       if (timerIntervalRef.current) {
//         clearInterval(timerIntervalRef.current);
//       }
//       if (window.electronAPI) {
//         window.electronAPI.removeAllListeners('activity-update');
//       }
//     };
//   }, []);

//   return {
//     attendance,
//     punchIn,
//     punchOut
//   };
// };

// export default useAttendance;




// but location required 
//  running 
















// import { useState, useEffect, useRef } from 'react';

// const useAttendance = () => {
//   const [attendance, setAttendance] = useState({
//     isPunchedIn: false,
//     workingHours: 0,
//     workingTime: '00:00:00',
//     canLogout: false,
//     loading: false,
//     lastPunchIn: null,
//     location: null,
//     isIdle: false,
//     currentApp: 'Browser'
//   });

//   // ✅ useRef for stable values
//   const accumulatedSecondsRef = useRef(0);
//   const timerIntervalRef = useRef(null);
//   const isIdleRef = useRef(false);

//   // Get user's current location
//   const getCurrentLocation = () => {
//     return new Promise((resolve) => {
//       if (!navigator.geolocation) {
//         resolve({ latitude: null, longitude: null });
//         return;
//       }

//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           resolve({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             timestamp: new Date().toISOString()
//           });
//         },
//         () => {
//           resolve({ latitude: null, longitude: null });
//         }
//       );
//     });
//   };

//   // Format time with seconds
//   const formatTime = (seconds) => {
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   // Start/Stop timer
//   const manageTimer = (shouldStart) => {
//     if (timerIntervalRef.current) {
//       clearInterval(timerIntervalRef.current);
//       timerIntervalRef.current = null;
//     }

//     if (shouldStart && !isIdleRef.current) {
//       console.log('⏰ Timer STARTED');

//       timerIntervalRef.current = setInterval(() => {
//         accumulatedSecondsRef.current += 1;

//         const hours = accumulatedSecondsRef.current / 3600;
//         const canLogoutNow = hours >= 7;

//         setAttendance(prev => ({
//           ...prev,
//           workingHours: hours,
//           workingTime: formatTime(accumulatedSecondsRef.current),
//           canLogout: canLogoutNow
//         }));

//         // Log every 30 seconds
//         if (accumulatedSecondsRef.current % 30 === 0) {
//           console.log(`⏱️ Timer: ${formatTime(accumulatedSecondsRef.current)}`);
//         }
//       }, 1000);
//     } else {
//       console.log('⏸️ Timer STOPPED');
//     }
//   };

//   // Punch in function
//   // const punchIn = async () => {
//   //   setAttendance(prev => ({ ...prev, loading: true }));

//   //   try {
//   //     const location = await getCurrentLocation();

//   //     accumulatedSecondsRef.current = 0;
//   //     isIdleRef.current = false;

//   //     setAttendance(prev => ({ // Updated to use functional update to ensure no stale state
//   //       ...prev,
//   //       isPunchedIn: true,
//   //       workingHours: 0,
//   //       workingTime: '00:00:00',
//   //       canLogout: false,
//   //       loading: false, // Ensure loading is set to false here
//   //       lastPunchIn: new Date().toISOString(),
//   //       location: location,
//   //       isIdle: false,
//   //       currentApp: 'Browser'
//   //     }));

//   //     // ✅ Setup Electron tracking
//   //     if (window.electronAPI) {
//   //       await window.electronAPI.startTracking();

//   //       window.electronAPI.onActivityUpdate((data) => {
//   //         console.log('🔄 Electron Update:', {
//   //           isIdle: data.isIdle,
//   //           wasIdle: isIdleRef.current,
//   //           seconds: accumulatedSecondsRef.current
//   //         });

//   //         // ✅ Handle idle state change
//   //         if (data.isIdle !== isIdleRef.current) {
//   //           isIdleRef.current = data.isIdle;

//   //           setAttendance(prev => ({
//   //             ...prev,
//   //             isIdle: data.isIdle,
//   //             currentApp: data.currentApp || 'Browser'
//   //           }));

//   //           // ✅ Manage timer based on idle state
//   //           if (data.isIdle) {
//   //             console.log('⏸️ Going IDLE - Timer PAUSED');
//   //             manageTimer(false); // Stop timer
//   //           } else {
//   //             console.log('🎯 Becoming ACTIVE - Timer RESUMING');
//   //             manageTimer(true); // Start timer
//   //           }
//   //         }
//   //       });
//   //     }

//   //     // Start timer initially - IMPORTANT: This must run after state update
//   //     manageTimer(true);

//   //     return { success: true, location };
//   //   } catch (error) {
//   //     setAttendance(prev => ({ ...prev, loading: false }));
//   //     return { success: false, error: error.message };
//   //   }
//   // };



//   // Punch in function
// // const punchIn = async (locationData = null) => {  // ✅ Accept location data
// //   setAttendance(prev => ({ ...prev, loading: true }));

// //   try {
// //     // ✅ Use provided location data OR get new location
// //     let location = locationData;
// //     if (!location) {
// //       location = await getCurrentLocation();
// //     }

// //     accumulatedSecondsRef.current = 0;
// //     isIdleRef.current = false;

// //     const newAttendance = {
// //       isPunchedIn: true,
// //       workingHours: 0,
// //       workingTime: '00:00:00',
// //       canLogout: false,
// //       loading: false,
// //       lastPunchIn: new Date().toISOString(),
// //       location: location,
// //       isIdle: false,
// //       currentApp: 'Browser'
// //     };

// //     setAttendance(prev => ({ ...prev, ...newAttendance }));

// //     // ... rest of your electron setup ...

// //     // Start timer
// //     manageTimer(true);

// //     return { success: true, location };
// //   } catch (error) {
// //     setAttendance(prev => ({ ...prev, loading: false }));
// //     return { success: false, error: error.message };
// //   }
// // };

// // Punch in function
// // const punchIn = async (locationData) => {
// //   console.log("⏰ punchIn called with location:", locationData);
  
// //   setAttendance(prev => ({ ...prev, loading: true }));

// //   try {
// //     // Use provided location data
// //     const location = locationData || await getCurrentLocation();
    
// //     console.log("📍 Using location:", location);

// //     if (!location?.latitude || !location?.longitude) {
// //       throw new Error("Location not available");
// //     }

// //     accumulatedSecondsRef.current = 0;
// //     isIdleRef.current = false;

// //     setAttendance(prev => ({
// //       ...prev,
// //       isPunchedIn: true,
// //       workingHours: 0,
// //       workingTime: '00:00:00',
// //       canLogout: false,
// //       loading: false,
// //       lastPunchIn: new Date().toISOString(),
// //       location: location,
// //       isIdle: false,
// //       currentApp: 'Browser'
// //     }));

// //     // Start timer
// //     manageTimer(true);

// //     console.log("✅ Local punchIn completed successfully");
// //     return { success: true, location };
    
// //   } catch (error) {
// //     console.error("❌ punchIn error:", error);
// //     setAttendance(prev => ({ ...prev, loading: false }));
// //     return { success: false, error: error.message };
// //   }
// // };


// // useAttendance.js में punchIn function:

// const punchIn = async (locationData) => {
//   console.log("⏰ [LOCAL] punchIn called with:", locationData);
  
//   setAttendance(prev => ({ ...prev, loading: true }));

//   try {
//     // Use provided location data
//     const location = locationData || await getCurrentLocation();
    
//     console.log("📍 [LOCAL] Using location:", location);

//     if (!location?.latitude || !location?.longitude) {
//       throw new Error("Location not available");
//     }

//     // Reset counters
//     accumulatedSecondsRef.current = 0;
//     isIdleRef.current = false;

//     // Update local state
//     setAttendance(prev => ({
//       ...prev,
//       isPunchedIn: true,
//       workingHours: 0,
//       workingTime: '00:00:00',
//       canLogout: false,
//       loading: false,
//       lastPunchIn: new Date().toISOString(),
//       location: location,
//       isIdle: false,
//       currentApp: 'Browser'
//     }));

//     // 🔥 START THE TIMER - This was missing!
//     manageTimer(true);

//     console.log("✅ [LOCAL] Timer started successfully");

//     // Setup Electron tracking if available
//     if (window.electronAPI) {
//       await window.electronAPI.startTracking();

//       window.electronAPI.onActivityUpdate((data) => {
//         console.log('🔄 Electron Update:', data);
        
//         if (data.isIdle !== isIdleRef.current) {
//           isIdleRef.current = data.isIdle;
          
//           setAttendance(prev => ({
//             ...prev,
//             isIdle: data.isIdle,
//             currentApp: data.currentApp || 'Browser'
//           }));

//           // Manage timer based on idle state
//           if (data.isIdle) {
//             console.log('⏸️ Going IDLE - Timer PAUSED');
//             manageTimer(false);
//           } else {
//             console.log('🎯 Becoming ACTIVE - Timer RESUMING');
//             manageTimer(true);
//           }
//         }
//       });
//     }

//     return { success: true, location };
    
//   } catch (error) {
//     console.error("❌ [LOCAL] punchIn error:", error);
//     setAttendance(prev => ({ ...prev, loading: false }));
//     return { success: false, error: error.message };
//   }
// };

//   // Punch out function
//   const punchOut = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const totalHours = accumulatedSecondsRef.current / 3600;

//       // Stop everything
//       manageTimer(false);

//       if (window.electronAPI) {
//         await window.electronAPI.stopTracking();
//         window.electronAPI.removeAllListeners('activity-update');
//       }

//       setAttendance(prev => ({ // Functional update
//         ...prev,
//         isPunchedIn: false,
//         workingHours: totalHours,
//         workingTime: formatTime(accumulatedSecondsRef.current),
//         canLogout: false,
//         loading: false,
//         lastPunchIn: null,
//         location: null,
//         isIdle: false,
//         currentApp: 'Browser'
//       }));

//       accumulatedSecondsRef.current = 0;
//       isIdleRef.current = false;

//       return { success: true, totalHours };
//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       return { success: false, error: error.message };
//     }
//   };

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (timerIntervalRef.current) {
//         clearInterval(timerIntervalRef.current);
//       }
//       if (window.electronAPI) {
//         window.electronAPI.removeAllListeners('activity-update');
//       }
//     };
//   }, []);

//   return {
//     attendance,
//     punchIn,
//     punchOut
//   };
// };

// export default useAttendance;







// hooks/useAttendance.js (PRODUCTION READY):

// import { useState, useEffect, useRef, useCallback } from 'react';
// import { useDispatch } from 'react-redux';
// import { setPunchStatus } from '../redux/slices/attendanceSlice';

// const useAttendance = () => {
//   const dispatch = useDispatch();
  
//   const [attendance, setAttendance] = useState({
//     isPunchedIn: false,
//     workingHours: 0,
//     workingTime: '00:00:00',
//     canLogout: false,
//     loading: false,
//     lastPunchIn: null,
//     location: null,
//     isIdle: false,
//     currentApp: 'Browser',
//     syncStatus: 'synced' // 'synced', 'pending', 'failed'
//   });

//   // Refs for stable values
//   const accumulatedSecondsRef = useRef(0);
//   const timerIntervalRef = useRef(null);
//   const isIdleRef = useRef(false);
//   const lastActivityRef = useRef(Date.now());

//   // Format time with seconds
//   const formatTime = useCallback((seconds) => {
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   }, []);

//   // Start/Stop timer with proper cleanup
//   const manageTimer = useCallback((shouldStart) => {
//     console.log(`⏱️ Timer management: shouldStart=${shouldStart}, currentRef=${accumulatedSecondsRef.current}s`);
    
//     // Clear existing timer
//     if (timerIntervalRef.current) {
//       clearInterval(timerIntervalRef.current);
//       timerIntervalRef.current = null;
//     }

//     if (shouldStart && !isIdleRef.current) {
//       console.log('🚀 Starting attendance timer');
      
//       const startTime = Date.now();
//       timerIntervalRef.current = setInterval(() => {
//         const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
//         const totalSeconds = accumulatedSecondsRef.current + elapsedSeconds;
        
//         const hours = totalSeconds / 3600;
//         const canLogoutNow = hours >= 7;
        
//         // Update local state
//         setAttendance(prev => ({
//           ...prev,
//           workingHours: hours,
//           workingTime: formatTime(totalSeconds),
//           canLogout: canLogoutNow
//         }));
        
//         // Sync with Redux every 30 seconds
//         if (totalSeconds % 30 === 0) {
//           dispatch(setPunchStatus({
//             totalHours: hours,
//             workingTime: formatTime(totalSeconds)
//           }));
//         }
        
//       }, 1000); // Update every second
      
//       console.log('✅ Timer interval started');
      
//     } else {
//       console.log('⏸️ Timer stopped or paused');
//     }
//   }, [dispatch, formatTime]);

//   // Punch in function with proper error handling
//   const punchIn = useCallback(async (locationData) => {
//     console.group('🏁 Local Punch In Process');
    
//     // Set loading state
//     setAttendance(prev => ({ ...prev, loading: true, syncStatus: 'pending' }));
    
//     try {
//       // Validate location data
//       if (!locationData?.latitude || !locationData?.longitude) {
//         throw new Error('INVALID_LOCATION: Location coordinates required');
//       }
      
//       console.log('📍 Location validated:', locationData);
      
//       // Reset counters
//       accumulatedSecondsRef.current = 0;
//       isIdleRef.current = false;
//       lastActivityRef.current = Date.now();
      
//       // Update local state
//       const newState = {
//         isPunchedIn: true,
//         workingHours: 0,
//         workingTime: '00:00:00',
//         canLogout: false,
//         loading: false,
//         lastPunchIn: new Date().toISOString(),
//         location: locationData,
//         isIdle: false,
//         currentApp: 'Browser',
//         syncStatus: 'pending'
//       };
      
//       setAttendance(prev => ({ ...prev, ...newState }));
      
//       // Start timer
//       manageTimer(true);
//       console.log('✅ Local state updated and timer started');
      
//       // Setup Electron tracking if available
//       if (window.electronAPI) {
//         try {
//           await window.electronAPI.startTracking();
//           console.log('✅ Electron tracking started');
          
//           // Setup activity listeners
//           window.electronAPI.onActivityUpdate((data) => {
//             console.log('🔄 Activity update:', data);
            
//             if (data.isIdle !== isIdleRef.current) {
//               isIdleRef.current = data.isIdle;
              
//               setAttendance(prev => ({
//                 ...prev,
//                 isIdle: data.isIdle,
//                 currentApp: data.currentApp || 'Browser'
//               }));
              
//               // Manage timer based on idle state
//               if (data.isIdle) {
//                 console.log('⏸️ Idle detected - pausing timer');
//                 manageTimer(false);
//               } else {
//                 console.log('▶️ Activity resumed - resuming timer');
//                 manageTimer(true);
//               }
//             }
//           });
          
//         } catch (electronError) {
//           console.error('❌ Electron setup failed:', electronError);
//           // Continue without Electron - timer still works
//         }
//       }
      
//       // Update Redux state
//       dispatch(setPunchStatus({
//         isPunchedIn: true,
//         location: locationData,
//         lastPunchTime: new Date().toISOString()
//       }));
      
//       console.log('✅ Punch in completed successfully');
//       console.groupEnd();
      
//       return {
//         success: true,
//         location: locationData,
//         timestamp: new Date().toISOString()
//       };
      
//     } catch (error) {
//       console.error('❌ Punch in failed:', error);
      
//       // Reset on error
//       setAttendance(prev => ({
//         ...prev,
//         loading: false,
//         syncStatus: 'failed'
//       }));
      
//       console.groupEnd();
      
//       return {
//         success: false,
//         error: error.message,
//         code: error.code || 'UNKNOWN_ERROR'
//       };
//     }
//   }, [dispatch, manageTimer]);

//   // Punch out function
//   const punchOut = useCallback(async () => {
//     console.group('🛑 Local Punch Out Process');
    
//     setAttendance(prev => ({ ...prev, loading: true }));
    
//     try {
//       // Stop timer
//       manageTimer(false);
      
//       // Calculate final time
//       const totalHours = accumulatedSecondsRef.current / 3600;
//       const formattedTime = formatTime(accumulatedSecondsRef.current);
      
//       console.log(`📊 Work session: ${formattedTime} (${totalHours.toFixed(2)} hours)`);
      
//       // Stop Electron tracking
//       if (window.electronAPI) {
//         try {
//           await window.electronAPI.stopTracking();
//           window.electronAPI.removeAllListeners('activity-update');
//           console.log('✅ Electron tracking stopped');
//         } catch (electronError) {
//           console.error('❌ Electron stop error:', electronError);
//         }
//       }
      
//       // Update local state
//       const newState = {
//         isPunchedIn: false,
//         workingHours: totalHours,
//         workingTime: formattedTime,
//         canLogout: false,
//         loading: false,
//         lastPunchIn: null,
//         location: null,
//         isIdle: false,
//         currentApp: 'Browser',
//         syncStatus: 'pending'
//       };
      
//       setAttendance(prev => ({ ...prev, ...newState }));
      
//       // Update Redux
//       dispatch(setPunchStatus({
//         isPunchedIn: false,
//         totalHours: totalHours
//       }));
      
//       // Reset refs
//       accumulatedSecondsRef.current = 0;
//       isIdleRef.current = false;
      
//       console.log('✅ Punch out completed');
//       console.groupEnd();
      
//       return {
//         success: true,
//         totalHours: totalHours,
//         workingTime: formattedTime,
//         timestamp: new Date().toISOString()
//       };
      
//     } catch (error) {
//       console.error('❌ Punch out failed:', error);
      
//       setAttendance(prev => ({ ...prev, loading: false }));
      
//       console.groupEnd();
      
//       return {
//         success: false,
//         error: error.message
//       };
//     }
//   }, [dispatch, formatTime, manageTimer]);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (timerIntervalRef.current) {
//         clearInterval(timerIntervalRef.current);
//       }
      
//       if (window.electronAPI) {
//         window.electronAPI.removeAllListeners('activity-update');
//       }
      
//       console.log('🧹 Attendance hook cleanup completed');
//     };
//   }, []);

//   return {
//     attendance,
//     punchIn,
//     punchOut,
//     // Additional methods for production
//     getCurrentSessionTime: () => accumulatedSecondsRef.current,
//     forceSync: async () => {
//       // Manual sync method
//       console.log('🔄 Manual sync requested');
//     }
//   };
// };

// export default useAttendance;






// import { useState, useEffect, useRef } from 'react';

// const useAttendance = () => {
//   const [attendance, setAttendance] = useState({
//     isPunchedIn: false,
//     workingHours: 0,
//     workingTime: '0h 0m',
//     canLogout: false,
//     loading: false,
//     isIdle: false,
//     currentApp: 'None'
//   });

//   // ✅ useRef variables for tracking
//   const accumulatedSecondsRef = useRef(0);
//   const timerIntervalRef = useRef(null);
//   const isIdleRef = useRef(false);
//   const isFirstPunchRef = useRef(true);

//   // ✅ Format time function
//   const formatTime = (seconds) => {
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     return `${hrs}h ${mins}m`;
//   };

//   // ✅ Start/Restart timer function
//   const startTimer = () => {
//     console.log('⏰ Starting timer, accumulated seconds:', accumulatedSecondsRef.current);
    
//     if (timerIntervalRef.current) {
//       clearInterval(timerIntervalRef.current);
//     }

//     timerIntervalRef.current = setInterval(() => {
//       // Only increment if NOT idle
//       if (!isIdleRef.current) {
//         accumulatedSecondsRef.current += 1;
        
//         const hours = accumulatedSecondsRef.current / 3600;
//         const canLogoutNow = hours >= 7;

//         setAttendance(prev => ({
//           ...prev,
//           workingHours: hours,
//           workingTime: formatTime(accumulatedSecondsRef.current),
//           canLogout: canLogoutNow
//         }));

//         // Log every minute
//         if (accumulatedSecondsRef.current % 60 === 0) {
//           console.log(`⏱️ Timer: ${formatTime(accumulatedSecondsRef.current)}`);
//         }
//       }
//     }, 1000);
//   };

//   // ✅ Handle Electron activity updates
//   const handleActivityUpdate = (data) => {
//     console.log('🔄 Activity Update:', {
//       isIdle: data.isIdle,
//       wasIdle: isIdleRef.current,
//       currentSeconds: accumulatedSecondsRef.current
//     });

//     // If idle state changed
//     if (data.isIdle !== isIdleRef.current) {
//       isIdleRef.current = data.isIdle;
      
//       if (data.isIdle) {
//         // User became idle - PAUSE timer
//         console.log('⏸️ PAUSING timer (User idle)');
//         if (timerIntervalRef.current) {
//           clearInterval(timerIntervalRef.current);
//           timerIntervalRef.current = null;
//         }
        
//         setAttendance(prev => ({
//           ...prev,
//           isIdle: true,
//           currentApp: 'Idle'
//         }));
//       } else {
//         // User became active - RESUME timer
//         console.log('▶️ RESUMING timer (User active)');
        
//         setAttendance(prev => ({
//           ...prev,
//           isIdle: false,
//           currentApp: data.currentApp || 'Active'
//         }));
        
//         // ✅ RESUME timer from where it left off
//         startTimer();
//       }
//     }
//   };

//   // ✅ Punch in function
//   const punchIn = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       // Reset only on first punch of the day
//       if (isFirstPunchRef.current) {
//         accumulatedSecondsRef.current = 0;
//         isFirstPunchRef.current = false;
//       }
      
//       isIdleRef.current = false;

//       // ✅ Setup Electron tracking
//       if (window.electronAPI) {
//         await window.electronAPI.startTracking();

//         // Listen for activity updates
//         window.electronAPI.onActivityUpdate(handleActivityUpdate);
//       }

//       // Start timer
//       startTimer();

//       setAttendance({
//         isPunchedIn: true,
//         workingHours: accumulatedSecondsRef.current / 3600,
//         workingTime: formatTime(accumulatedSecondsRef.current),
//         canLogout: false,
//         loading: false,
//         isIdle: false,
//         currentApp: 'Active'
//       });

//       console.log('✅ PUNCH IN successful');
//       return { success: true };

//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       console.error('❌ Punch in error:', error);
//       return { success: false, error: error.message };
//     }
//   };

//   // ✅ Punch out function
//   const punchOut = async () => {
//     setAttendance(prev => ({ ...prev, loading: true }));

//     try {
//       const totalSeconds = accumulatedSecondsRef.current;
//       const totalHours = totalSeconds / 3600;

//       console.log('🛑 PUNCH OUT - Total time:', totalSeconds, 'seconds');

//       // Stop timer
//       if (timerIntervalRef.current) {
//         clearInterval(timerIntervalRef.current);
//         timerIntervalRef.current = null;
//       }

//       // Stop Electron tracking
//       if (window.electronAPI) {
//         await window.electronAPI.stopTracking();
//         window.electronAPI.removeAllListeners('activity-update');
//       }

//       setAttendance({
//         isPunchedIn: false,
//         workingHours: totalHours,
//         workingTime: formatTime(totalSeconds),
//         canLogout: false,
//         loading: false,
//         isIdle: false,
//         currentApp: 'None'
//       });

//       // Reset first punch flag for next day
//       isFirstPunchRef.current = true;

//       return { 
//         success: true, 
//         totalSeconds, 
//         totalHours 
//       };

//     } catch (error) {
//       setAttendance(prev => ({ ...prev, loading: false }));
//       console.error('❌ Punch out error:', error);
//       return { success: false, error: error.message };
//     }
//   };

//   // ✅ Cleanup function
//   useEffect(() => {
//     return () => {
//       console.log('🧹 Cleaning up attendance hook');
//       if (timerIntervalRef.current) {
//         clearInterval(timerIntervalRef.current);
//       }
//       if (window.electronAPI) {
//         window.electronAPI.removeAllListeners('activity-update');
//       }
//     };
//   }, []);

//   return {
//     attendance,
//     punchIn,
//     punchOut
//   };
// };

// export default useAttendance;


// this is working 


import { useState, useEffect, useRef } from 'react';

const useAttendance = () => {
  const [attendance, setAttendance] = useState({
    isPunchedIn: false,
    workingHours: 0,
    workingTime: '0h 0m 0s',
    canLogout: false,
    loading: false,
    isIdle: false,
    currentApp: 'None'
  });

  // ✅ useRef variables for tracking
  const accumulatedSecondsRef = useRef(0);
  const timerIntervalRef = useRef(null);
  const isIdleRef = useRef(false);
  const isFirstPunchRef = useRef(true);

  // ✅ Format time function WITH SECONDS
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60; // ✅ Seconds added
    return `${hrs}h ${mins}m ${secs}s`;
  };

  // ✅ Start/Restart timer function
  const startTimer = () => {
    console.log('⏰ Starting timer, accumulated seconds:', accumulatedSecondsRef.current);
    
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    timerIntervalRef.current = setInterval(() => {
      // Only increment if NOT idle
      if (!isIdleRef.current) {
        accumulatedSecondsRef.current += 1;
        
        const hours = accumulatedSecondsRef.current / 3600;
        const canLogoutNow = hours >= 7;

        setAttendance(prev => ({
          ...prev,
          workingHours: hours,
          workingTime: formatTime(accumulatedSecondsRef.current), // ✅ Now includes seconds
          canLogout: canLogoutNow
        }));

        // Log every minute
        if (accumulatedSecondsRef.current % 60 === 0) {
          console.log(`⏱️ Timer: ${formatTime(accumulatedSecondsRef.current)}`);
        }
      }
    }, 1000);
  };

  // ✅ Handle Electron activity updates
  const handleActivityUpdate = (data) => {
    console.log('🔄 Activity Update:', {
      isIdle: data.isIdle,
      wasIdle: isIdleRef.current,
      currentSeconds: accumulatedSecondsRef.current
    });

    // If idle state changed
    if (data.isIdle !== isIdleRef.current) {
      isIdleRef.current = data.isIdle;
      
      if (data.isIdle) {
        // User became idle - PAUSE timer
        console.log('⏸️ PAUSING timer (User idle)');
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
        }
        
        setAttendance(prev => ({
          ...prev,
          isIdle: true,
          currentApp: 'Idle'
        }));
      } else {
        // User became active - RESUME timer
        console.log('▶️ RESUMING timer (User active)');
        
        setAttendance(prev => ({
          ...prev,
          isIdle: false,
          currentApp: data.currentApp || 'Active'
        }));
        
        // ✅ RESUME timer from where it left off
        startTimer();
      }
    }
  };

  // ✅ Punch in function
  const punchIn = async () => {
    setAttendance(prev => ({ ...prev, loading: true }));

    try {
      // Reset only on first punch of the day
      if (isFirstPunchRef.current) {
        accumulatedSecondsRef.current = 0;
        isFirstPunchRef.current = false;
      }
      
      isIdleRef.current = false;

      // ✅ Setup Electron tracking
      if (window.electronAPI) {
        await window.electronAPI.startTracking();

        // Listen for activity updates
        window.electronAPI.onActivityUpdate(handleActivityUpdate);
      }

      // Start timer
      startTimer();

      setAttendance({
        isPunchedIn: true,
        workingHours: accumulatedSecondsRef.current / 3600,
        workingTime: formatTime(accumulatedSecondsRef.current), // ✅ With seconds
        canLogout: false,
        loading: false,
        isIdle: false,
        currentApp: 'Active'
      });

      console.log('✅ PUNCH IN successful');
      return { success: true };

    } catch (error) {
      setAttendance(prev => ({ ...prev, loading: false }));
      console.error('❌ Punch in error:', error);
      return { success: false, error: error.message };
    }
  };

  // ✅ Punch out function
  const punchOut = async () => {
    setAttendance(prev => ({ ...prev, loading: true }));

    try {
      const totalSeconds = accumulatedSecondsRef.current;
      const totalHours = totalSeconds / 3600;

      console.log('🛑 PUNCH OUT - Total time:', totalSeconds, 'seconds');

      // Stop timer
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }

      // Stop Electron tracking
      if (window.electronAPI) {
        await window.electronAPI.stopTracking();
        window.electronAPI.removeAllListeners('activity-update');
      }

      setAttendance({
        isPunchedIn: false,
        workingHours: totalHours,
        workingTime: formatTime(totalSeconds), // ✅ With seconds
        canLogout: false,
        loading: false,
        isIdle: false,
        currentApp: 'None'
      });

      // Reset first punch flag for next day
      isFirstPunchRef.current = true;

      return { 
        success: true, 
        totalSeconds, 
        totalHours 
      };

    } catch (error) {
      setAttendance(prev => ({ ...prev, loading: false }));
      console.error('❌ Punch out error:', error);
      return { success: false, error: error.message };
    }
  };

  // ✅ Cleanup function
  useEffect(() => {
    return () => {
      console.log('🧹 Cleaning up attendance hook');
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      if (window.electronAPI) {
        window.electronAPI.removeAllListeners('activity-update');
      }
    };
  }, []);

  return {
    attendance,
    punchIn,
    punchOut
  };
};

export default useAttendance;