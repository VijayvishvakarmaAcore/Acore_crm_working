
// import React, { useState, useEffect } from 'react';
// import { useAuth } from './hooks/useAuth';
// import  useAttendance  from './hooks/useAttendance';
// import { useToast } from './hooks/useToast';

// // Components
// import Login from './components/auth/Login';
// import Header from './components/common/Header';
// import Toast from './components/common/Toast';
// import AnnouncementSlider from './components/dashboard/AnnouncementSlider';
// // DashboardGrid remove kiya - ab Header ke andar hai

// // Modals
// import AttendanceModal from './components/modals/AttendanceModal';
// import LeaveModal from './components/modals/LeaveModal';
// import BirthdayModal from './components/modals/BirthdayModal';
// import ProfileModal from './components/modals/ProfileModal';
// import CalendarModal from './components/modals/CalendarModal';
// import GithubModal from './components/modals/GithubModal';
// import SalaryModal from './components/modals/SalaryModal';
// import BirthdaySlider from './components/dashboard/BirthdaySlider';

// import './App.css';
// import EmployeeSlider from './components/dashboard/EmployeeSlider';

// function App() {
//   // Authentication
//   const { currentUser, loading: authLoading, login, logout } = useAuth();
  
//   // Attendance
//   const attendance = useAttendance();
  
//   // Toast Notifications
//   const { toast, showToast, hideToast } = useToast();
  
//   // Modal State
//   const [activeModal, setActiveModal] = useState(null);
//   const [leaveLoading, setLeaveLoading] = useState(false);
//   const [githubLoading, setGithubLoading] = useState(false);

//   // Auto close modal when user logs out
//   useEffect(() => {
//     if (!currentUser) {
//       setActiveModal(null);
//     }
//   }, [currentUser]);

//   // Handle Login
//   const handleLogin = async (email, password) => {
//     try {
//       if (!email || !password) {
//         showToast('❌ Please enter both email and password', 'error');
//         return;
//       }

//       await login(email, password);
//       showToast('✅ Login successful! Welcome to Acore IT Hub', 'success');
//     } catch (error) {
//       showToast('❌ Login failed. Please check your credentials.', 'error');
//     }
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     if (attendance.isPunchedIn) {
//       showToast('⛔ Please punch out before logging out', 'warning');
//       return;
//     }
    
//     if (window.confirm('Are you sure you want to logout?')) {
//       logout();
//       showToast('👋 Logged out successfully!', 'success');
//     }
//   };

//   // Handle Punch In/Out
//   const handlePunch = async () => {
//     try {
//       const result = await attendance.handlePunch();
      
//       if (result.success) {
//         if (result.action === 'in') {
//           showToast('✅ Punched in successfully! Have a productive day.', 'success');
//         } else {
//           showToast('✅ Punched out successfully! See you tomorrow.', 'success');
//           closeModal();
//         }
//       } else {
//         showToast(result.error, 'warning');
//       }
//     } catch (error) {
//       showToast('❌ Error processing attendance', 'error');
//     }
//   };

//   // Handle Leave Application
//   const handleLeaveSubmit = async (formData) => {
//     setLeaveLoading(true);
    
//     try {
//       // Validate form data
//       if (!formData.type || !formData.startDate || !formData.endDate || !formData.reason) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Leave application submitted successfully!', 'success');
//       setActiveModal(null);
//     } catch (error) {
//       showToast('❌ Failed to submit leave application', 'error');
//     } finally {
//       setLeaveLoading(false);
//     }
//   };

//   // Handle GitHub Push
//   const handleGithubPush = async (formData) => {
//     setGithubLoading(true);
    
//     try {
//       // Validate form data
//       if (!formData.repository || !formData.commitMessage) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Code pushed to GitHub successfully!', 'success');
//     } catch (error) {
//       showToast('❌ Failed to push code to GitHub', 'error');
//     } finally {
//       setGithubLoading(false);
//     }
//   };

//   // Open Modal
//   const openModal = (modalName) => {
//     setActiveModal(modalName);
//   };

//   // Close Modal
//   const closeModal = () => {
//     setActiveModal(null);
//   };

//   // Render Login Page if not authenticated
//   if (!currentUser) {
//     return (
//       <>
//         <Login onLogin={handleLogin} loading={authLoading} />
//         <Toast toast={toast} onClose={hideToast} />
//       </>
//     );
//   }

//   // Main Dashboard
//   return (
//     <div className="app">
//       <div className="app-container">
//         <Header
//           currentUser={currentUser}
//           onProfileClick={() => openModal('profile')}
//           onLogout={handleLogout}
//           onCardClick={openModal}
//           attendanceStatus={attendance}
//         />

//         {/* ✅ DIRECT ATTENDANCE TRACKER - SIMPLE DIV HATA KAR */}
//         <AttendanceModal
//           attendance={attendance}
//           onPunch={handlePunch}
//         />

//         <AnnouncementSlider />
//          <BirthdaySlider />
//          <EmployeeSlider/>
        

//         {/* Other Modals */}
//         <LeaveModal
//           isOpen={activeModal === 'leave'}
//           onClose={closeModal}
//           onLeaveSubmit={handleLeaveSubmit}
//           loading={leaveLoading}
//         />

//         <BirthdayModal
//           isOpen={activeModal === 'birthday'}
//           onClose={closeModal}
//         />

//         <ProfileModal
//           isOpen={activeModal === 'profile'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <CalendarModal
//           isOpen={activeModal === 'calendar'}
//           onClose={closeModal}
//         />

//         <GithubModal
//           isOpen={activeModal === 'github'}
//           onClose={closeModal}
//           onPushCode={handleGithubPush}
//           loading={githubLoading}
//         />

//         <SalaryModal
//           isOpen={activeModal === 'salary'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <Toast toast={toast} onClose={hideToast} />
//       </div>
//     </div>
//   );
// }

// export default App;










// import React, { useState, useEffect } from 'react';
// import { useAuth } from './hooks/useAuth';
// import useAttendance from './hooks/useAttendance';
// import { useToast } from './hooks/useToast';



// import Swal from "sweetalert2";


// // Components
// import Login from './components/auth/Login';
// import Header from './components/common/Header';
// import Toast from './components/common/Toast';
// import AnnouncementSlider from './components/dashboard/AnnouncementSlider';
// import BirthdaySlider from './components/dashboard/BirthdaySlider';
// import EmployeeSlider from './components/dashboard/EmployeeSlider';

// // Modals
// import AttendanceModal from './components/modals/AttendanceModal';
// import LeaveModal from './components/modals/LeaveModal';
// import BirthdayModal from './components/modals/BirthdayModal';
// import ProfileModal from './components/modals/ProfileModal';
// import CalendarModal from './components/modals/CalendarModal';
// import GithubModal from './components/modals/GithubModal';
// import SalaryModal from './components/modals/SalaryModal';

// import './App.css';

// function App() {
//   // Authentication
//   const { currentUser, loading: authLoading, login, logout } = useAuth();
  
//   // Attendance - CORRECT USAGE
//   const { attendance, punchIn, punchOut } = useAttendance();
  
//   // Toast Notifications
//   const { toast, showToast, hideToast } = useToast();
  
//   // Modal State
//   const [activeModal, setActiveModal] = useState(null);
//   const [leaveLoading, setLeaveLoading] = useState(false);
//   const [githubLoading, setGithubLoading] = useState(false);

//   // Auto close modal when user logs out
//   useEffect(() => {
//     if (!currentUser) {
//       setActiveModal(null);
//     }
//   }, [currentUser]);

//   // Handle Login
//   const handleLogin = async (email, password) => {
//     try {
//       if (!email || !password) {
//         showToast('❌ Please enter both email and password', 'error');
//         return;
//       }

//       await login(email, password);
//       showToast('✅ Login successful! Welcome to Acore IT Hub', 'success');
//     } catch (error) {
//       showToast('❌ Login failed. Please check your credentials.', 'error');
//     }
//   };

//   // Handle Logout
//   // const handleLogout = () => {
//   //   if (attendance.isPunchedIn) {
//   //     showToast('⛔ Please punch out before logging out', 'warning');
//   //     return;
//   //   }
    
//   //   if (window.confirm('Are you sure you want to logout?')) {
//   //     logout();
//   //     showToast('👋 Logged out successfully!', 'success');
//   //   }
//   // };


//   const handleLogout = () => {
//   Swal.fire({
//     title: "Logout?",
//     text: "Are you sure you want to logout?",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, Logout",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       logout();
//       showToast("👋 Logged out successfully!", "success");
//     }
//   });
// };


//   // Handle Punch In/Out - CORRECTED
//   const handlePunch = async () => {
//     try {
//       if (attendance.isPunchedIn) {
//         // Punch out
//         const result = await punchOut();
//         if (result && result.success) {
//           showToast('✅ Punched out successfully! See you tomorrow.', 'success');
//         } else {
//           showToast(result?.error || '❌ Punch out failed', 'error');
//         }
//       } else {
//         // Punch in
//         const result = await punchIn();
//         if (result && result.success) {
//           showToast('✅ Punched in successfully! Have a productive day.', 'success');
//         } else {
//           showToast(result?.error || '❌ Punch in failed', 'error');
//         }
//       }
//     } catch (error) {
//       showToast('❌ Error processing attendance', 'error');
//       console.error('Punch error:', error);
//     }
//   };

//   // Handle Leave Application
//   const handleLeaveSubmit = async (formData) => {
//     setLeaveLoading(true);
    
//     try {
//       // Validate form data
//       if (!formData.type || !formData.startDate || !formData.endDate || !formData.reason) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Leave application submitted successfully!', 'success');
//       setActiveModal(null);
//     } catch (error) {
//       showToast('❌ Failed to submit leave application', 'error');
//     } finally {
//       setLeaveLoading(false);
//     }
//   };

//   // Handle GitHub Push
//   const handleGithubPush = async (formData) => {
//     setGithubLoading(true);
    
//     try {
//       // Validate form data
//       if (!formData.repository || !formData.commitMessage) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Code pushed to GitHub successfully!', 'success');
//     } catch (error) {
//       showToast('❌ Failed to push code to GitHub', 'error');
//     } finally {
//       setGithubLoading(false);
//     }
//   };

//   // Open Modal
//   const openModal = (modalName) => {
//     setActiveModal(modalName);
//   };

//   // Close Modal
//   const closeModal = () => {
//     setActiveModal(null);
//   };

//   // Render Login Page if not authenticated
//   if (!currentUser) {
//     return (
//       <>
//         <Login onLogin={handleLogin} loading={authLoading} />
//         <Toast toast={toast} onClose={hideToast} />
//       </>
//     );
//   }

//   // Main Dashboard
//   return (
//     <div className="app">
//       <div className="app-container">
//         <Header
//           currentUser={currentUser}
//           onProfileClick={() => openModal('profile')}
//           onLogout={handleLogout}
//           onCardClick={openModal}
//           attendanceStatus={attendance}
//         />

//         {/* ✅ ATTENDANCE MODAL */}
//         <AttendanceModal
//           attendance={attendance}
//           onPunch={handlePunch}
//         />

//         <AnnouncementSlider />
//         <BirthdaySlider />
//         <EmployeeSlider/>

//         {/* Other Modals */}
//         <LeaveModal
//           isOpen={activeModal === 'leave'}
//           onClose={closeModal}
//           onLeaveSubmit={handleLeaveSubmit}
//           loading={leaveLoading}
//         />

//         <BirthdayModal
//           isOpen={activeModal === 'birthday'}
//           onClose={closeModal}
//         />

//         <ProfileModal
//           isOpen={activeModal === 'profile'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <CalendarModal
//           isOpen={activeModal === 'calendar'}
//           onClose={closeModal}
//         />

//         <GithubModal
//           isOpen={activeModal === 'github'}
//           onClose={closeModal}
//           onPushCode={handleGithubPush}
//           loading={githubLoading}
//         />

//         <SalaryModal
//           isOpen={activeModal === 'salary'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <Toast toast={toast} onClose={hideToast} />
//       </div>
//     </div>
//   );
// }

// export default App;


// ---------------------------------------->>




// import React, { useState, useEffect } from 'react';
// import { useAuth } from './hooks/useAuth';
// import useAttendance from './hooks/useAttendance';
// import { useToast } from './hooks/useToast';
// import Swal from "sweetalert2";

// // Components
// import Login from './components/auth/Login';
// import Header from './components/common/Header';
// import Toast from './components/common/Toast';
// import AnnouncementSlider from './components/dashboard/AnnouncementSlider';
// import BirthdaySlider from './components/dashboard/BirthdaySlider';
// import EmployeeSlider from './components/dashboard/EmployeeSlider';


// // Modals
// import AttendanceModal from './components/modals/AttendanceModal';
// import LeaveModal from './components/modals/LeaveModal';
// import BirthdayModal from './components/modals/BirthdayModal';
// import ProfileModal from './components/modals/ProfileModal';
// import CalendarModal from './components/modals/CalendarModal';
// import GithubModal from './components/modals/GithubModal';
// import SalaryModal from './components/modals/SalaryModal';
// import DashboardModal from './components/modals/DashboardModal';

// // NEW: Attendance Calendar Modal
// import AttendanceCalendarModal from './components/modals/AttendanceCalendarModal';

// import './App.css';

// function App() {
//   // Authentication
//   const { currentUser, loading: authLoading, login, logout } = useAuth();
  
//   // Attendance - CORRECT USAGE
//   const { attendance, punchIn, punchOut } = useAttendance();
  
//   // Toast Notifications
//   const { toast, showToast, hideToast } = useToast();
  
//   // Modal State
//   const [activeModal, setActiveModal] = useState(null);
//   const [showAttendanceCalendar, setShowAttendanceCalendar] = useState(false); // NEW STATE
//   const [leaveLoading, setLeaveLoading] = useState(false);
//   const [githubLoading, setGithubLoading] = useState(false);
//   const [showDashboard, setShowDashboard] = useState(false);

//   // Auto close modal when user logs out
//   useEffect(() => {
//     if (!currentUser) {
//       setActiveModal(null);
//       setShowAttendanceCalendar(false);
//     }
//   }, [currentUser]);

//   // Handle Login
//   const handleLogin = async (email, password) => {
//     try {
//       if (!email || !password) {
//         showToast('❌ Please enter both email and password', 'error');
//         return;
//       }

//       await login(email, password);
//       showToast('✅ Login successful! Welcome to Acore IT Hub', 'success');
//     } catch (error) {
//       showToast('❌ Login failed. Please check your credentials.', 'error');
//     }
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     Swal.fire({
//       title: "Logout?",
//       text: "Are you sure you want to logout?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Logout",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout();
//         showToast("👋 Logged out successfully!", "success");
//       }
//     });
//   };

//   // Handle Punch In/Out - CORRECTED
//   const handlePunch = async () => {
//     try {
//       if (attendance.isPunchedIn) {
//         // Punch out
//         const result = await punchOut();
//         if (result && result.success) {
//           showToast('✅ Punched out successfully! See you tomorrow.', 'success');
//         } else {
//           showToast(result?.error || '❌ Punch out failed', 'error');
//         }
//       } else {
//         // Punch in
//         const result = await punchIn();
//         if (result && result.success) {
//           showToast('✅ Punched in successfully! Have a productive day.', 'success');
//         } else {
//           showToast(result?.error || '❌ Punch in failed', 'error');
//         }
//       }
//     } catch (error) {
//       showToast('❌ Error processing attendance', 'error');
//       console.error('Punch error:', error);
//     }
//   };

//   // Handle Leave Application
//   const handleLeaveSubmit = async (formData) => {
//     setLeaveLoading(true);
    
//     try {
//       // Validate form data
//       if (!formData.type || !formData.startDate || !formData.endDate || !formData.reason) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Leave application submitted successfully!', 'success');
//       setActiveModal(null);
//     } catch (error) {
//       showToast('❌ Failed to submit leave application', 'error');
//     } finally {
//       setLeaveLoading(false);
//     }
//   };

//   // Handle GitHub Push
//   const handleGithubPush = async (formData) => {
//     setGithubLoading(true);
    
//     try {
//       // Validate form data
//       if (!formData.repository || !formData.commitMessage) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Code pushed to GitHub successfully!', 'success');
//     } catch (error) {
//       showToast('❌ Failed to push code to GitHub', 'error');
//     } finally {
//       setGithubLoading(false);
//     }
//   };

//   // Open Modal - UPDATED to handle attendance calendar
//   // const openModal = (modalName) => {
//   //   if (modalName === 'attendance-calendar') {
//   //     setShowAttendanceCalendar(true);
//   //   } else {
//   //     setActiveModal(modalName);
//   //   }
//   // };


//   const openModal = (modalName) => {
//   if (modalName === 'attendance-calendar') {
//     setShowAttendanceCalendar(true);
//   } else if (modalName === 'dashboard') {
//     setShowDashboard(true);
//   } else {
//     setActiveModal(modalName);
//   }
// };

//   // Close Modal - UPDATED
//   // const closeModal = () => {
//   //   setActiveModal(null);
//   //   setShowAttendanceCalendar(false);
//   // };


//   const closeModal = () => {
//   setActiveModal(null);
//   setShowAttendanceCalendar(false);
//   setShowDashboard(false);
// };

//   // Close Attendance Calendar Only
//   const closeAttendanceCalendar = () => {
//     setShowAttendanceCalendar(false);
//   };

//   // Render Login Page if not authenticated
//   if (!currentUser) {
//     return (
//       <>
//         <Login onLogin={handleLogin} loading={authLoading} />
//         <Toast toast={toast} onClose={hideToast} />
//       </>
//     );
//   }

//   // Main Dashboard
//   return (
//     <div className="app">
//       <div className="app-container">
//         <Header
//           currentUser={currentUser}
//           onProfileClick={() => openModal('profile')}
//           onLogout={handleLogout}
//           onCardClick={openModal} // This will handle all menu clicks including attendance-calendar
//           attendanceStatus={attendance}
//         />

//         {/* ✅ ATTENDANCE MODAL */}
//         <AttendanceModal
//           attendance={attendance}
//           onPunch={handlePunch}
//         />

//         <AnnouncementSlider />
//         <BirthdaySlider />
//         <EmployeeSlider/>

//         {/* NEW: ATTENDANCE CALENDAR MODAL */}
//         <AttendanceCalendarModal
//           isOpen={showAttendanceCalendar}
//           onClose={closeAttendanceCalendar}
//           currentUser={currentUser}
//           attendanceData={attendance}
//         />

//         {/* Other Modals */}
//         <LeaveModal
//           isOpen={activeModal === 'leave'}
//           onClose={closeModal}
//           onLeaveSubmit={handleLeaveSubmit}
//           loading={leaveLoading}
//         />

//         <DashboardModal
//   isOpen={showDashboard}
//   onClose={() => setShowDashboard(false)}
// />

//         <BirthdayModal
//           isOpen={activeModal === 'birthday'}
//           onClose={closeModal}
//         />

//         <ProfileModal
//           isOpen={activeModal === 'profile'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <CalendarModal
//           isOpen={activeModal === 'calendar'}
//           onClose={closeModal}
//         />

//         <GithubModal
//           isOpen={activeModal === 'github'}
//           onClose={closeModal}
//           onPushCode={handleGithubPush}
//           loading={githubLoading}
//         />

//         <SalaryModal
//           isOpen={activeModal === 'salary'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <Toast toast={toast} onClose={hideToast} />
//       </div>
//     </div>
//   );
// }

// export default App;



// dashboard in humberger btn 





// import React, { useState, useEffect } from 'react';
// import { useAuth } from './hooks/useAuth';
// import useAttendance from './hooks/useAttendance';
// import { useToast } from './hooks/useToast';
// import Swal from "sweetalert2";

// // Components
// import Login from './components/auth/Login';
// import Header from './components/common/Header';
// import Toast from './components/common/Toast';
// import AnnouncementSlider from './components/dashboard/AnnouncementSlider';
// import BirthdaySlider from './components/dashboard/BirthdaySlider';
// import EmployeeSlider from './components/dashboard/EmployeeSlider';
// import Dashboard from './components/dashboard/Dashboard'; // NEW: Regular Dashboard Component

// // Modals
// import AttendanceModal from './components/modals/AttendanceModal';
// import LeaveModal from './components/modals/LeaveModal';
// import BirthdayModal from './components/modals/BirthdayModal';
// import ProfileModal from './components/modals/ProfileModal';
// import CalendarModal from './components/modals/CalendarModal';
// import GithubModal from './components/modals/GithubModal';
// import SalaryModal from './components/modals/SalaryModal';
// import AttendanceCalendarModal from './components/modals/AttendanceCalendarModal';

// import './App.css';

// function App() {
//   const { currentUser, loading: authLoading, login, logout } = useAuth();
//   const { attendance, punchIn, punchOut } = useAttendance();
//   const { toast, showToast, hideToast } = useToast();
  
//   // Modal State
//   const [activeModal, setActiveModal] = useState(null);
//   const [showAttendanceCalendar, setShowAttendanceCalendar] = useState(false);
//   const [leaveLoading, setLeaveLoading] = useState(false);
//   const [githubLoading, setGithubLoading] = useState(false);
//   // [IMPORTANT] Dashboard modal ko remove karo, regular component use karo

//   // Auto close modal when user logs out
//   useEffect(() => {
//     if (!currentUser) {
//       setActiveModal(null);
//       setShowAttendanceCalendar(false);
//     }
//   }, [currentUser]);

//   // Handle Login
//   const handleLogin = async (email, password) => {
//     try {
//       if (!email || !password) {
//         showToast('❌ Please enter both email and password', 'error');
//         return;
//       }

//       await login(email, password);
//       showToast('✅ Login successful! Welcome to Acore IT Hub', 'success');
//     } catch (error) {
//       showToast('❌ Login failed. Please check your credentials.', 'error');
//     }
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     Swal.fire({
//       title: "Logout?",
//       text: "Are you sure you want to logout?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Logout",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout();
//         showToast("👋 Logged out successfully!", "success");
//       }
//     });
//   };

//   // Handle Punch In/Out
//   const handlePunch = async () => {
//     try {
//       if (attendance.isPunchedIn) {
//         const result = await punchOut();
//         if (result && result.success) {
//           showToast('✅ Punched out successfully! See you tomorrow.', 'success');
//         } else {
//           showToast(result?.error || '❌ Punch out failed', 'error');
//         }
//       } else {
//         const result = await punchIn();
//         if (result && result.success) {
//           showToast('✅ Punched in successfully! Have a productive day.', 'success');
//         } else {
//           showToast(result?.error || '❌ Punch in failed', 'error');
//         }
//       }
//     } catch (error) {
//       showToast('❌ Error processing attendance', 'error');
//       console.error('Punch error:', error);
//     }
//   };

//   // Handle Leave Application
//   const handleLeaveSubmit = async (formData) => {
//     setLeaveLoading(true);
    
//     try {
//       if (!formData.type || !formData.startDate || !formData.endDate || !formData.reason) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Leave application submitted successfully!', 'success');
//       setActiveModal(null);
//     } catch (error) {
//       showToast('❌ Failed to submit leave application', 'error');
//     } finally {
//       setLeaveLoading(false);
//     }
//   };

//   // Handle GitHub Push
//   const handleGithubPush = async (formData) => {
//     setGithubLoading(true);
    
//     try {
//       if (!formData.repository || !formData.commitMessage) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Code pushed to GitHub successfully!', 'success');
//     } catch (error) {
//       showToast('❌ Failed to push code to GitHub', 'error');
//     } finally {
//       setGithubLoading(false);
//     }
//   };

//   // Open Modal
//   // const openModal = (modalName) => {
//   //   if (modalName === 'attendance-calendar') {
//   //     setShowAttendanceCalendar(true);
//   //   } else {
//   //     setActiveModal(modalName);
//   //   }
//   // };



//   // Open Modal function mein AttendanceModal handle karo:
// const openModal = (modalName) => {
//   if (modalName === 'attendance-calendar') {
//     setShowAttendanceCalendar(true);
//   } else if (modalName === 'attendance') { // ✅ YEH ADD KARO
//     setActiveModal('attendance'); // Attendance modal ko open karo
//   } else {
//     setActiveModal(modalName);
//   }
// };

//   // Close Modal
//   const closeModal = () => {
//     setActiveModal(null);
//     setShowAttendanceCalendar(false);
//   };

//   // Render Login Page if not authenticated
//   if (!currentUser) {
//     return (
//       <>
//         <Login onLogin={handleLogin} loading={authLoading} />
//         <Toast toast={toast} onClose={hideToast} />
//       </>
//     );
//   }

//   // Main Dashboard
//   return (
//     <div className="app">
//       <div className="app-container">
//         <Header
//           currentUser={currentUser}
//           onProfileClick={() => openModal('profile')}
//           onLogout={handleLogout}
//           onCardClick={openModal}
//           attendanceStatus={attendance}
//         />

//         {/* ✅ ATTENDANCE MODAL */}
//         {/* <AttendanceModal
//           attendance={attendance}
//           onPunch={handlePunch}
//         /> */}

//         {/* ✅ DASHBOARD - As a regular component, not modal */}
//         <div className="dashboard-wrapper">
//           <Dashboard />
//         </div>

//         {/* Other content */}
//         <AnnouncementSlider />
//         <BirthdaySlider />
//         <EmployeeSlider/>

//         {/* ATTENDANCE CALENDAR MODAL */}
//         <AttendanceCalendarModal
//           isOpen={showAttendanceCalendar}
//           onClose={closeModal}
//           currentUser={currentUser}
//           attendanceData={attendance}
//         />

//            <AttendanceModal  // ✅ YEH ADD KARO
//         isOpen={activeModal === 'attendance'}
//         onClose={closeModal}
//         attendance={attendance}
//         onPunch={handlePunch}
//       />

    

//         {/* Other Modals */}
//         <LeaveModal
//           isOpen={activeModal === 'leave'}
//           onClose={closeModal}
//           onLeaveSubmit={handleLeaveSubmit}
//           loading={leaveLoading}
//         />

//         <BirthdayModal
//           isOpen={activeModal === 'birthday'}
//           onClose={closeModal}
//         />

//         <ProfileModal
//           isOpen={activeModal === 'profile'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <CalendarModal
//           isOpen={activeModal === 'calendar'}
//           onClose={closeModal}
//         />

//         <GithubModal
//           isOpen={activeModal === 'github'}
//           onClose={closeModal}
//           onPushCode={handleGithubPush}
//           loading={githubLoading}
//         />

//         <SalaryModal
//           isOpen={activeModal === 'salary'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <Toast toast={toast} onClose={hideToast} />
//       </div>
//     </div>
//   );
// }

// export default App;





// import React, { useState, useEffect } from 'react';
// import { useAuth } from './hooks/useAuth';
// import useAttendance from './hooks/useAttendance';
// import { useToast } from './hooks/useToast';
// import Swal from "sweetalert2";

// // Components
// import Login from './components/auth/Login';
// import Header from './components/common/Header';
// import Toast from './components/common/Toast';
// import AnnouncementSlider from './components/dashboard/AnnouncementSlider';
// import BirthdaySlider from './components/dashboard/BirthdaySlider';
// import EmployeeSlider from './components/dashboard/EmployeeSlider';
// import Dashboard from './components/dashboard/Dashboard';

// // Modals
// import AttendanceModal from './components/modals/AttendanceModal';
// import LeaveModal from './components/modals/LeaveModal';
// import BirthdayModal from './components/modals/BirthdayModal';
// import ProfileModal from './components/modals/ProfileModal';
// import CalendarModal from './components/modals/CalendarModal';
// import GithubModal from './components/modals/GithubModal';
// import SalaryModal from './components/modals/SalaryModal';
// import AttendanceCalendarModal from './components/modals/AttendanceCalendarModal';

// import './App.css';

// function App() {
//   const { currentUser, loading: authLoading, login, logout } = useAuth();
//   const { attendance, punchIn, punchOut } = useAttendance();
//   const { toast, showToast, hideToast } = useToast();
  
//   // Modal State
//   const [activeModal, setActiveModal] = useState(null);
//   const [showAttendanceCalendar, setShowAttendanceCalendar] = useState(false);
//   const [leaveLoading, setLeaveLoading] = useState(false);
//   const [githubLoading, setGithubLoading] = useState(false);

//   // Auto close modal when user logs out
//   useEffect(() => {
//     if (!currentUser) {
//       setActiveModal(null);
//       setShowAttendanceCalendar(false);
//     }
//   }, [currentUser]);

//   // Handle Login
//   const handleLogin = async (email, password) => {
//     try {
//       if (!email || !password) {
//         showToast('❌ Please enter both email and password', 'error');
//         return;
//       }

//       await login(email, password);
//       showToast('✅ Login successful! Welcome to Acore IT Hub', 'success');
//     } catch (error) {
//       showToast('❌ Login failed. Please check your credentials.', 'error');
//     }
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     Swal.fire({
//       title: "Logout?",
//       text: "Are you sure you want to logout?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Logout",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout();
//         showToast("👋 Logged out successfully!", "success");
//       }
//     });
//   };

//   // Handle Punch In/Out
//   const handlePunch = async () => {
//     try {
//       if (attendance.isPunchedIn) {
//         const result = await punchOut();
//         if (result && result.success) {
//           showToast('✅ Punched out successfully! See you tomorrow.', 'success');
//         } else {
//           showToast(result?.error || '❌ Punch out failed', 'error');
//         }
//       } else {
//         const result = await punchIn();
//         if (result && result.success) {
//           showToast('✅ Punched in successfully! Have a productive day.', 'success');
//         } else {
//           showToast(result?.error || '❌ Punch in failed', 'error');
//         }
//       }
//     } catch (error) {
//       showToast('❌ Error processing attendance', 'error');
//       console.error('Punch error:', error);
//     }
//   };

//   // Handle Leave Application
//   const handleLeaveSubmit = async (formData) => {
//     setLeaveLoading(true);
    
//     try {
//       if (!formData.type || !formData.startDate || !formData.endDate || !formData.reason) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Leave application submitted successfully!', 'success');
//       setActiveModal(null);
//     } catch (error) {
//       showToast('❌ Failed to submit leave application', 'error');
//     } finally {
//       setLeaveLoading(false);
//     }
//   };

//   // Handle GitHub Push
//   const handleGithubPush = async (formData) => {
//     setGithubLoading(true);
    
//     try {
//       if (!formData.repository || !formData.commitMessage) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Code pushed to GitHub successfully!', 'success');
//     } catch (error) {
//       showToast('❌ Failed to push code to GitHub', 'error');
//     } finally {
//       setGithubLoading(false);
//     }
//   };

//   // Open Modal
//   const openModal = (modalName) => {
//     if (modalName === 'attendance-calendar') {
//       setShowAttendanceCalendar(true);
//     } else if (modalName === 'attendance') {
//       setActiveModal('attendance');
//     } else {
//       setActiveModal(modalName);
//     }
//   };

//   // Close Modal
//   const closeModal = () => {
//     setActiveModal(null);
//     setShowAttendanceCalendar(false);
//   };

//   // Render Login Page if not authenticated
//   if (!currentUser) {
//     return (
//       <>
//         <Login onLogin={handleLogin} loading={authLoading} />
//         <Toast toast={toast} onClose={hideToast} />
//       </>
//     );
//   }

//   // Main Dashboard
//   return (
//     <div className="app">
//       <div className="app-container">
//         <Header
//           currentUser={currentUser}
//           onProfileClick={() => openModal('profile')}
//           onLogout={handleLogout}
//           onCardClick={openModal}
//           attendanceStatus={attendance}
//         />

//         {/* ✅ DASHBOARD */}
//         <div className="dashboard-wrapper">
//           <Dashboard />
//         </div>

//         {/* ✅ SLIDERS */}
//         <AnnouncementSlider />
//         <BirthdaySlider />
//         <EmployeeSlider/>

//         {/* ✅ ATTENDANCE MODAL - Hamburger se open hoga */}
//         <AttendanceModal
//           isOpen={activeModal === 'attendance'}
//           onClose={closeModal}
//           attendance={attendance}
//           onPunch={handlePunch}
//         />

//         {/* ✅ ATTENDANCE CALENDAR MODAL */}
//         <AttendanceCalendarModal
//           isOpen={showAttendanceCalendar}
//           onClose={closeModal}
//           currentUser={currentUser}
//           attendanceData={attendance}
//         />

//         {/* ✅ OTHER MODALS */}
//         <LeaveModal
//           isOpen={activeModal === 'leave'}
//           onClose={closeModal}
//           onLeaveSubmit={handleLeaveSubmit}
//           loading={leaveLoading}
//         />

//         <BirthdayModal
//           isOpen={activeModal === 'birthday'}
//           onClose={closeModal}
//         />

//         <ProfileModal
//           isOpen={activeModal === 'profile'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <CalendarModal
//           isOpen={activeModal === 'calendar'}
//           onClose={closeModal}
//         />

//         <GithubModal
//           isOpen={activeModal === 'github'}
//           onClose={closeModal}
//           onPushCode={handleGithubPush}
//           loading={githubLoading}
//         />

//         <SalaryModal
//           isOpen={activeModal === 'salary'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <Toast toast={toast} onClose={hideToast} />
//       </div>
//     </div>
//   );
// }

// export default App;




// import React, { useState, useEffect } from 'react';
// import { useAuth } from './hooks/useAuth';
// import useAttendance from './hooks/useAttendance';
// import { useToast } from './hooks/useToast';
// import Swal from "sweetalert2";

// // Components
// import Login from './components/auth/Login';
// import Header from './components/common/Header';
// import Toast from './components/common/Toast';
// import AnnouncementSlider from './components/dashboard/AnnouncementSlider';
// import BirthdaySlider from './components/dashboard/BirthdaySlider';
// import EmployeeSlider from './components/dashboard/EmployeeSlider';
// import Dashboard from './components/dashboard/Dashboard';

// // Modals
// import AttendanceModal from './components/modals/AttendanceModal';
// import LeaveModal from './components/modals/LeaveModal';
// import BirthdayModal from './components/modals/BirthdayModal';
// import ProfileModal from './components/modals/ProfileModal';
// import CalendarModal from './components/modals/CalendarModal';
// import GithubModal from './components/modals/GithubModal';
// import SalaryModal from './components/modals/SalaryModal';
// import AttendanceCalendarModal from './components/modals/AttendanceCalendarModal';

// // ✅ NEW: Import ProjectsModal
// import ProjectsModal from './components/modals/ProjectsModal';
// import TasksModal from './components/modals/TasksModal';

// import './App.css';

// function App() {
//   const { currentUser, loading: authLoading, login, logout } = useAuth();
//   const { attendance, punchIn, punchOut } = useAttendance();
//   const { toast, showToast, hideToast } = useToast();
  
//   // Modal State
//   const [activeModal, setActiveModal] = useState(null);
//   const [showAttendanceCalendar, setShowAttendanceCalendar] = useState(false);
//   const [leaveLoading, setLeaveLoading] = useState(false);
//   const [githubLoading, setGithubLoading] = useState(false);
//   const [showTasks, setShowTasks] = useState(false);

//   // Auto close modal when user logs out
//   useEffect(() => {
//     if (!currentUser) {
//       setActiveModal(null);
//       setShowAttendanceCalendar(false);
//     }
//   }, [currentUser]);

//   // Handle Login
//   const handleLogin = async (email, password) => {
//     try {
//       if (!email || !password) {
//         showToast('❌ Please enter both email and password', 'error');
//         return;
//       }

//       await login(email, password);
//       showToast('✅ Login successful! Welcome to Acore IT Hub', 'success');
//     } catch (error) {
//       showToast('❌ Login failed. Please check your credentials.', 'error');
//     }
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     Swal.fire({
//       title: "Logout?",
//       text: "Are you sure you want to logout?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Logout",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout();
//         showToast("👋 Logged out successfully!", "success");
//       }
//     });
//   };

//   // Handle Punch In/Out
//   const handlePunch = async () => {
//     try {
//       if (attendance.isPunchedIn) {
//         const result = await punchOut();
//         if (result && result.success) {
//           showToast('✅ Punched out successfully! See you tomorrow.', 'success');
//         } else {
//           showToast(result?.error || '❌ Punch out failed', 'error');
//         }
//       } else {
//         const result = await punchIn();
//         if (result && result.success) {
//           showToast('✅ Punched in successfully! Have a productive day.', 'success');
//         } else {
//           showToast(result?.error || '❌ Punch in failed', 'error');
//         }
//       }
//     } catch (error) {
//       showToast('❌ Error processing attendance', 'error');
//       console.error('Punch error:', error);
//     }
//   };

//   // Handle Leave Application
//   const handleLeaveSubmit = async (formData) => {
//     setLeaveLoading(true);
    
//     try {
//       if (!formData.type || !formData.startDate || !formData.endDate || !formData.reason) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Leave application submitted successfully!', 'success');
//       setActiveModal(null);
//     } catch (error) {
//       showToast('❌ Failed to submit leave application', 'error');
//     } finally {
//       setLeaveLoading(false);
//     }
//   };

//   // Handle GitHub Push
//   const handleGithubPush = async (formData) => {
//     setGithubLoading(true);
    
//     try {
//       if (!formData.repository || !formData.commitMessage) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Code pushed to GitHub successfully!', 'success');
//     } catch (error) {
//       showToast('❌ Failed to push code to GitHub', 'error');
//     } finally {
//       setGithubLoading(false);
//     }
//   };

//   // ✅ UPDATED: Open Modal function with Projects support
// const openModal = (modalName) => {
//   if (modalName === 'attendance-calendar') {
//     setShowAttendanceCalendar(true);
//   } else if (modalName === 'attendance') {
//     setActiveModal('attendance');
//   } else if (modalName === 'projects') {
//     setActiveModal('projects');
//   } else if (modalName === 'tasks') {
//     setActiveModal('tasks'); // ✅ NEW
//   } else {
//     setActiveModal(modalName);
//   }
// };

//   // ✅ UPDATED: Close Modal function with Projects support
//  const closeModal = () => {
//   setActiveModal(null);
//   setShowAttendanceCalendar(false);
// };

//   // Render Login Page if not authenticated
//   if (!currentUser) {
//     return (
//       <>
//         <Login onLogin={handleLogin} loading={authLoading} />
//         <Toast toast={toast} onClose={hideToast} />
//       </>
//     );
//   }

//   // Main Dashboard
//   return (
//     <div className="app">
//       <div className="app-container">
//         <Header
//           currentUser={currentUser}
//           onProfileClick={() => openModal('profile')}
//           onLogout={handleLogout}
//           onCardClick={openModal}
//           attendanceStatus={attendance}
//         />

//         {/* ✅ DASHBOARD */}
//         <div className="dashboard-wrapper">
//           <Dashboard />
//         </div>

//         {/* ✅ SLIDERS */}
//         <AnnouncementSlider />
//         <BirthdaySlider />
//         <EmployeeSlider/>

//         {/* ✅ ATTENDANCE MODAL */}
//         {/* <AttendanceModal
//           isOpen={activeModal === 'attendance'}
//           onClose={closeModal}
//           attendance={attendance}
//           onPunch={handlePunch}
//         /> */}

//         {activeModal === 'attendance' && (
//   <AttendanceModal
//     onClose={closeModal}
//     attendance={attendance}
//     onPunch={handlePunch}
//   />
// )}

//         {/* ✅ NEW: PROJECTS MODAL */}
//         <ProjectsModal
//           isOpen={activeModal === 'projects'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <TasksModal
//          isOpen={activeModal === 'tasks'}
//          onClose={closeModal}
//          currentUser={currentUser}
//        />

//         {/* ✅ ATTENDANCE CALENDAR MODAL */}
//         <AttendanceCalendarModal
//           isOpen={showAttendanceCalendar}
//           onClose={closeModal}
//           currentUser={currentUser}
//           attendanceData={attendance}
//         />

//         {/* ✅ OTHER MODALS */}
//         <LeaveModal
//           isOpen={activeModal === 'leave'}
//           onClose={closeModal}
//           onLeaveSubmit={handleLeaveSubmit}
//           loading={leaveLoading}
//         />

//         <BirthdayModal
//           isOpen={activeModal === 'birthday'}
//           onClose={closeModal}
//         />

//         <ProfileModal
//           isOpen={activeModal === 'profile'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <CalendarModal
//           isOpen={activeModal === 'calendar'}
//           onClose={closeModal}
//         />

//         <GithubModal
//           isOpen={activeModal === 'github'}
//           onClose={closeModal}
//           onPushCode={handleGithubPush}
//           loading={githubLoading}
//         />

//         <SalaryModal
//           isOpen={activeModal === 'salary'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <Toast toast={toast} onClose={hideToast} />
//       </div>
//     </div>
//   );
// }

// export default App;








// import React, { useState, useEffect } from 'react';
// import { useAuth } from './hooks/useAuth';
// import useAttendance from './hooks/useAttendance';
// import { useToast } from './hooks/useToast';
// import Swal from "sweetalert2";

// // Components
// import Login from './components/auth/Login';
// import Header from './components/common/Header';
// import Toast from './components/common/Toast';
// import AnnouncementSlider from './components/dashboard/AnnouncementSlider';
// import BirthdaySlider from './components/dashboard/BirthdaySlider';
// import EmployeeSlider from './components/dashboard/EmployeeSlider';
// import Dashboard from './components/dashboard/Dashboard';

// // Modals
// import AttendanceModal from './components/modals/AttendanceModal';
// import LeaveModal from './components/modals/LeaveModal';
// import BirthdayModal from './components/modals/BirthdayModal';
// import ProfileModal from './components/modals/ProfileModal';
// import CalendarModal from './components/modals/CalendarModal';
// import GithubModal from './components/modals/GithubModal';
// import SalaryModal from './components/modals/SalaryModal';
// import AttendanceCalendarModal from './components/modals/AttendanceCalendarModal';
// import ProjectsModal from './components/modals/ProjectsModal';
// import TasksModal from './components/modals/TasksModal';

// import './App.css';

// function App() {
//   const { currentUser, loading: authLoading, login, logout } = useAuth();
//   const { attendance, punchIn, punchOut } = useAttendance();
//   const { toast, showToast, hideToast } = useToast();
  
//   // Modal State
//   const [activeModal, setActiveModal] = useState(null);
//   const [showAttendanceCalendar, setShowAttendanceCalendar] = useState(false);
//   const [leaveLoading, setLeaveLoading] = useState(false);
//   const [githubLoading, setGithubLoading] = useState(false);
//   const [showTasks, setShowTasks] = useState(false);

//   // Auto close modal when user logs out
//   useEffect(() => {
//     if (!currentUser) {
//       setActiveModal(null);
//       setShowAttendanceCalendar(false);
//     }
//   }, [currentUser]);

//   // Handle Login
//   const handleLogin = async (email, password) => {
//     try {
//       if (!email || !password) {
//         showToast('❌ Please enter both email and password', 'error');
//         return;
//       }

//       await login(email, password);
//       showToast('✅ Login successful! Welcome to Acore IT Hub', 'success');
//     } catch (error) {
//       showToast('❌ Login failed. Please check your credentials.', 'error');
//     }
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     Swal.fire({
//       title: "Logout?",
//       text: "Are you sure you want to logout?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Logout",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout();
//         showToast("👋 Logged out successfully!", "success");
//       }
//     });
//   };

//   // Handle Punch In/Out
//   const handlePunch = async () => {
//     try {
//       if (attendance.isPunchedIn) {
//         const result = await punchOut();
//         if (result && result.success) {
//           showToast('✅ Punched out successfully! See you tomorrow.', 'success');
//         } else {
//           showToast(result?.error || '❌ Punch out failed', 'error');
//         }
//       } else {
//         const result = await punchIn();
//         if (result && result.success) {
//           showToast('✅ Punched in successfully! Have a productive day.', 'success');
//         } else {
//           showToast(result?.error || '❌ Punch in failed', 'error');
//         }
//       }
//     } catch (error) {
//       showToast('❌ Error processing attendance', 'error');
//       console.error('Punch error:', error);
//     }
//   };

//   // Handle Leave Application
//   const handleLeaveSubmit = async (formData) => {
//     setLeaveLoading(true);
    
//     try {
//       if (!formData.type || !formData.startDate || !formData.endDate || !formData.reason) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Leave application submitted successfully!', 'success');
//       setActiveModal(null);
//     } catch (error) {
//       showToast('❌ Failed to submit leave application', 'error');
//     } finally {
//       setLeaveLoading(false);
//     }
//   };

//   // Handle GitHub Push
//   const handleGithubPush = async (formData) => {
//     setGithubLoading(true);
    
//     try {
//       if (!formData.repository || !formData.commitMessage) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Code pushed to GitHub successfully!', 'success');
//     } catch (error) {
//       showToast('❌ Failed to push code to GitHub', 'error');
//     } finally {
//       setGithubLoading(false);
//     }
//   };

//   // Open Modal function
//   const openModal = (modalName) => {
//     if (modalName === 'attendance-calendar') {
//       setShowAttendanceCalendar(true);
//     } else if (modalName === 'attendance') {
//       setActiveModal('attendance');
//     } else if (modalName === 'projects') {
//       setActiveModal('projects');
//     } else if (modalName === 'tasks') {
//       setActiveModal('tasks');
//     } else {
//       setActiveModal(modalName);
//     }
//   };

//   // Close Modal function
//   const closeModal = () => {
//     setActiveModal(null);
//     setShowAttendanceCalendar(false);
//   };

//   // Render Login Page if not authenticated
//   if (!currentUser) {
//     return (
//       <>
//         <Login onLogin={handleLogin} loading={authLoading} />
//         <Toast toast={toast} onClose={hideToast} />
//       </>
//     );
//   }

//   // Main Dashboard
//   return (
//     <div className="app">
//       <div className="app-container">
//         <Header
//           currentUser={currentUser}
//           onProfileClick={() => openModal('profile')}
//           onLogout={handleLogout}
//           onCardClick={openModal}
//           attendanceStatus={attendance}
//         />

//         {/* ✅ DASHBOARD */}
//         <div className="dashboard-wrapper">
//           <Dashboard />
//         </div>

//         {/* ✅ SLIDERS */}
//         <AnnouncementSlider />
//         <BirthdaySlider />
//         <EmployeeSlider/>

//         {/* ✅ ATTENDANCE MODAL - सही तरीका */}
//         <AttendanceModal
//           isOpen={activeModal === 'attendance'}
//           onClose={closeModal}
//           attendance={attendance}
//           onPunch={handlePunch}
//         />

//         {/* ✅ NEW: PROJECTS MODAL */}
//         <ProjectsModal
//           isOpen={activeModal === 'projects'}
//           onClose={closeModal}
//           currentUser={currentUser}
//            onCardClick={openModal}
//         />

//         <TasksModal
//           isOpen={activeModal === 'tasks'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         {/* ✅ ATTENDANCE CALENDAR MODAL */}
//         <AttendanceCalendarModal
//           isOpen={showAttendanceCalendar}
//           onClose={closeModal}
//           currentUser={currentUser}
//           attendanceData={attendance}
//         />

//         {/* ✅ OTHER MODALS */}
//         <LeaveModal
//           isOpen={activeModal === 'leave'}
//           onClose={closeModal}
//           onLeaveSubmit={handleLeaveSubmit}
//           loading={leaveLoading}
//         />

//         <BirthdayModal
//           isOpen={activeModal === 'birthday'}
//           onClose={closeModal}
//         />

//         <ProfileModal
//           isOpen={activeModal === 'profile'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <CalendarModal
//           isOpen={activeModal === 'calendar'}
//           onClose={closeModal}
//         />

//         <GithubModal
//           isOpen={activeModal === 'github'}
//           onClose={closeModal}
//           onPushCode={handleGithubPush}
//           loading={githubLoading}
//         />

//         <SalaryModal
//           isOpen={activeModal === 'salary'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <Toast toast={toast} onClose={hideToast} />
//       </div>
//     </div>
//   );
// }

// export default App;





// API adding 




// import React, { useState, useEffect } from 'react';
// import { useAuth } from './hooks/useAuth';
// import useAttendance from './hooks/useAttendance';
// import { useToast } from './hooks/useToast';
// import Swal from "sweetalert2";

// // Components
// import Login from './components/auth/Login';
// import Header from './components/common/Header';
// import Toast from './components/common/Toast';
// import AnnouncementSlider from './components/dashboard/AnnouncementSlider';
// import BirthdaySlider from './components/dashboard/BirthdaySlider';
// import EmployeeSlider from './components/dashboard/EmployeeSlider';
// import Dashboard from './components/dashboard/Dashboard';

// // Modals
// import AttendanceModal from './components/modals/AttendanceModal';
// import LeaveModal from './components/modals/LeaveModal';
// import BirthdayModal from './components/modals/BirthdayModal';
// import ProfileModal from './components/modals/ProfileModal';
// import CalendarModal from './components/modals/CalendarModal';
// import GithubModal from './components/modals/GithubModal';
// import SalaryModal from './components/modals/SalaryModal';
// import AttendanceCalendarModal from './components/modals/AttendanceCalendarModal';
// import ProjectsModal from './components/modals/ProjectsModal';
// import TasksModal from './components/modals/TasksModal';

// import './App.css';

// function App() {
//   const { 
//     currentUser, 
//     loading: authLoading, 
//     error: authError,
//     loginMessage,
//     registerLoading,
//     registerError,
//     registerSuccess,
//     registerMessage,
//     login, 
//     logout,
//     clearErrors
//   } = useAuth();
  
//   const { attendance, punchIn, punchOut } = useAttendance();
//   const { toast, showToast, hideToast } = useToast();
  
//   // Modal State
//   const [activeModal, setActiveModal] = useState(null);
//   const [showAttendanceCalendar, setShowAttendanceCalendar] = useState(false);
//   const [leaveLoading, setLeaveLoading] = useState(false);
//   const [githubLoading, setGithubLoading] = useState(false);
//   const [showTasks, setShowTasks] = useState(false);

//   // Auto close modal when user logs out
//   useEffect(() => {
//     if (!currentUser) {
//       setActiveModal(null);
//       setShowAttendanceCalendar(false);
//     }
//   }, [currentUser]);

//   // Show success message after registration
//   useEffect(() => {
//     if (registerSuccess && registerMessage) {
//       showToast(`✅ ${registerMessage}`, 'success');
//       clearErrors();
//     }
//   }, [registerSuccess, registerMessage]);

//   // Show login message
//   useEffect(() => {
//     if (loginMessage) {
//       showToast(`✅ ${loginMessage}`, 'success');
//     }
//   }, [loginMessage]);

//   // Show auth error
//   useEffect(() => {
//     if (authError) {
//       showToast(`❌ ${authError}`, 'error');
//     }
//   }, [authError]);

//   // Handle Login
//   const handleLogin = async (email, password) => {
//     try {
//       if (!email || !password) {
//         showToast('❌ Please enter both email and password', 'error');
//         return;
//       }

//       await login(email, password);
//       // Success toast will be shown via useEffect listening to loginMessage
      
//     } catch (error) {
//       // Error toast will be shown via useEffect listening to authError
//       console.error('Login error:', error);
//     }
//   };

//   // Handle Register
//   const handleRegister = async (userData) => {
//     try {
//       await register(userData);
//       // Success toast will be shown via useEffect listening to registerMessage
//     } catch (error) {
//       // Error toast will be shown via useEffect listening to registerError
//       console.error('Register error:', error);
//     }
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     Swal.fire({
//       title: "Logout?",
//       text: "Are you sure you want to logout?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Logout",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout();
//         showToast("👋 Logged out successfully!", "success");
//       }
//     });
//   };

//   // Handle Punch In/Out
//   const handlePunch = async () => {
//     try {
//       if (attendance.isPunchedIn) {
//         const result = await punchOut();
//         if (result && result.success) {
//           showToast('✅ Punched out successfully! See you tomorrow.', 'success');
//         } else {
//           showToast(result?.error || '❌ Punch out failed', 'error');
//         }
//       } else {
//         const result = await punchIn();
//         if (result && result.success) {
//           showToast('✅ Punched in successfully! Have a productive day.', 'success');
//         } else {
//           showToast(result?.error || '❌ Punch in failed', 'error');
//         }
//       }
//     } catch (error) {
//       showToast('❌ Error processing attendance', 'error');
//       console.error('Punch error:', error);
//     }
//   };

//   // Handle Leave Application
//   const handleLeaveSubmit = async (formData) => {
//     setLeaveLoading(true);
    
//     try {
//       if (!formData.type || !formData.startDate || !formData.endDate || !formData.reason) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Leave application submitted successfully!', 'success');
//       setActiveModal(null);
//     } catch (error) {
//       showToast('❌ Failed to submit leave application', 'error');
//     } finally {
//       setLeaveLoading(false);
//     }
//   };

//   // Handle GitHub Push
//   const handleGithubPush = async (formData) => {
//     setGithubLoading(true);
    
//     try {
//       if (!formData.repository || !formData.commitMessage) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Code pushed to GitHub successfully!', 'success');
//     } catch (error) {
//       showToast('❌ Failed to push code to GitHub', 'error');
//     } finally {
//       setGithubLoading(false);
//     }
//   };

//   // Open Modal function
//   const openModal = (modalName) => {
//     if (modalName === 'attendance-calendar') {
//       setShowAttendanceCalendar(true);
//     } else if (modalName === 'attendance') {
//       setActiveModal('attendance');
//     } else if (modalName === 'projects') {
//       setActiveModal('projects');
//     } else if (modalName === 'tasks') {
//       setActiveModal('tasks');
//     } else {
//       setActiveModal(modalName);
//     }
//   };

//   // Close Modal function
//   const closeModal = () => {
//     setActiveModal(null);
//     setShowAttendanceCalendar(false);
//   };

//   // Render Login Page if not authenticated
//   if (!currentUser) {
//     return (
//       <>
//         <Login 
//           onLogin={handleLogin} 
//           onRegister={handleRegister}
//           loading={authLoading}
//           registerLoading={registerLoading}
//           registerError={registerError}
//           loginError={authError}
//           clearErrors={clearErrors}
//         />
//         <Toast toast={toast} onClose={hideToast} />
//       </>
//     );
//   }

//   // Main Dashboard
//   return (
//     <div className="app">
//       <div className="app-container">
//         <Header
//           currentUser={currentUser}
//           onProfileClick={() => openModal('profile')}
//           onLogout={handleLogout}
//           onCardClick={openModal}
//           attendanceStatus={attendance}
//         />

//         {/* ✅ DASHBOARD */}
//         <div className="dashboard-wrapper">
//           <Dashboard />
//         </div>

//         {/* ✅ SLIDERS */}
//         <AnnouncementSlider />
//         <BirthdaySlider />
//         <EmployeeSlider/>

//         {/* ✅ ATTENDANCE MODAL */}
//         <AttendanceModal
//           isOpen={activeModal === 'attendance'}
//           onClose={closeModal}
//           attendance={attendance}
//           onPunch={handlePunch}
//         />

//         {/* ✅ PROJECTS MODAL */}
//         <ProjectsModal
//           isOpen={activeModal === 'projects'}
//           onClose={closeModal}
//           currentUser={currentUser}
//           onCardClick={openModal}
//         />

//         <TasksModal
//           isOpen={activeModal === 'tasks'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         {/* ✅ ATTENDANCE CALENDAR MODAL */}
//         <AttendanceCalendarModal
//           isOpen={showAttendanceCalendar}
//           onClose={closeModal}
//           currentUser={currentUser}
//           attendanceData={attendance}
//         />

//         {/* ✅ OTHER MODALS */}
//         <LeaveModal
//           isOpen={activeModal === 'leave'}
//           onClose={closeModal}
//           onLeaveSubmit={handleLeaveSubmit}
//           loading={leaveLoading}
//         />

//         <BirthdayModal
//           isOpen={activeModal === 'birthday'}
//           onClose={closeModal}
//         />

//         <ProfileModal
//           isOpen={activeModal === 'profile'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <CalendarModal
//           isOpen={activeModal === 'calendar'}
//           onClose={closeModal}
//         />

//         <GithubModal
//           isOpen={activeModal === 'github'}
//           onClose={closeModal}
//           onPushCode={handleGithubPush}
//           loading={githubLoading}
//         />

//         <SalaryModal
//           isOpen={activeModal === 'salary'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <Toast toast={toast} onClose={hideToast} />
//       </div>
//     </div>
//   );
// }

// export default App;



// api adding11

// import React, { useState, useEffect } from 'react';
// import { useAuth } from './hooks/useAuth';
// import useAttendance from './hooks/useAttendance';
// import { useToast } from './hooks/useToast';
// import Swal from "sweetalert2";

// // Components
// import Login from './components/auth/Login';
// import Header from './components/common/Header';
// import Toast from './components/common/Toast';
// import AnnouncementSlider from './components/dashboard/AnnouncementSlider';
// import BirthdaySlider from './components/dashboard/BirthdaySlider';
// import EmployeeSlider from './components/dashboard/EmployeeSlider';
// import Dashboard from './components/dashboard/Dashboard';

// // Modals
// import AttendanceModal from './components/modals/AttendanceModal';
// import LeaveModal from './components/modals/LeaveModal';
// import BirthdayModal from './components/modals/BirthdayModal';
// import ProfileModal from './components/modals/ProfileModal';
// import CalendarModal from './components/modals/CalendarModal';
// import GithubModal from './components/modals/GithubModal';
// import SalaryModal from './components/modals/SalaryModal';
// import AttendanceCalendarModal from './components/modals/AttendanceCalendarModal';
// import ProjectsModal from './components/modals/ProjectsModal';
// import TasksModal from './components/modals/TasksModal';

// import './App.css';

// function App() {
//   const { 
//     currentUser, 
//     isAuthenticated,
//     loginLoading,
//     loginError,
//     registerLoading,
//     registerError,
//     registerSuccess,
//     message,
//     login, 
//     register,
//     logout,
//     clearErrors,
//     clearRegisterStatus
//   } = useAuth();
  
//   const { attendance, punchIn, punchOut } = useAttendance();
//   const { toast, showToast, hideToast } = useToast();
  
//   // Modal State
//   const [activeModal, setActiveModal] = useState(null);
//   const [showAttendanceCalendar, setShowAttendanceCalendar] = useState(false);
//   const [leaveLoading, setLeaveLoading] = useState(false);
//   const [githubLoading, setGithubLoading] = useState(false);

//   // Handle login/register messages
//   useEffect(() => {
//     if (message) {
//       showToast(`ℹ️ ${message}`, 'info');
//     }
//   }, [message, showToast]);

//   // Handle login success
//   useEffect(() => {
//     if (isAuthenticated && currentUser) {
//       showToast(`✅ Welcome back, ${currentUser.name}!`, 'success');
//     }
//   }, [isAuthenticated, currentUser, showToast]);

//   // Handle login error
//   useEffect(() => {
//     if (loginError) {
//       showToast(`❌ ${loginError}`, 'error');
//     }
//   }, [loginError, showToast]);

//   // Handle register success
//   useEffect(() => {
//     if (registerSuccess) {
//       showToast('✅ Registration successful! Please login.', 'success');
//       clearRegisterStatus();
//     }
//   }, [registerSuccess, showToast, clearRegisterStatus]);

//   // Handle register error
//   useEffect(() => {
//     if (registerError) {
//       showToast(`❌ ${registerError}`, 'error');
//     }
//   }, [registerError, showToast]);

//   // Auto close modal when user logs out
//   useEffect(() => {
//     if (!isAuthenticated) {
//       setActiveModal(null);
//       setShowAttendanceCalendar(false);
//     }
//   }, [isAuthenticated]);

//   // Handle Login
//   const handleLogin = async (email, password) => {
//     try {
//       if (!email || !password) {
//         showToast('❌ Please enter both email and password', 'error');
//         return;
//       }

//       await login(email, password);
//       // Success toast will be shown via useEffect
      
//     } catch (error) {
//       // Error toast will be shown via useEffect
//       console.error('Login error:', error);
//     }
//   };

//   // Handle Register
//   const handleRegister = async (userData) => {
//     try {
//       await register(userData);
//       // Success toast will be shown via useEffect
//     } catch (error) {
//       // Error toast will be shown via useEffect
//       console.error('Register error:', error);
//     }
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     Swal.fire({
//       title: "Logout?",
//       text: "Are you sure you want to logout?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Logout",
//       cancelButtonText: "Cancel"
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout();
//         showToast("👋 Logged out successfully!", "success");
//       }
//     });
//   };

//   // Handle Punch In/Out
//   const handlePunch = async () => {
//     try {
//       if (attendance.isPunchedIn) {
//         const result = await punchOut();
//         if (result && result.success) {
//           showToast('✅ Punched out successfully! See you tomorrow.', 'success');
//         } else {
//           showToast(result?.error || '❌ Punch out failed', 'error');
//         }
//       } else {
//         const result = await punchIn();
//         if (result && result.success) {
//           showToast('✅ Punched in successfully! Have a productive day.', 'success');
//         } else {
//           showToast(result?.error || '❌ Punch in failed', 'error');
//         }
//       }
//     } catch (error) {
//       showToast('❌ Error processing attendance', 'error');
//       console.error('Punch error:', error);
//     }
//   };

//   // Handle Leave Application
//   const handleLeaveSubmit = async (formData) => {
//     setLeaveLoading(true);
    
//     try {
//       if (!formData.type || !formData.startDate || !formData.endDate || !formData.reason) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Leave application submitted successfully!', 'success');
//       setActiveModal(null);
//     } catch (error) {
//       showToast('❌ Failed to submit leave application', 'error');
//     } finally {
//       setLeaveLoading(false);
//     }
//   };

//   // Handle GitHub Push
//   const handleGithubPush = async (formData) => {
//     setGithubLoading(true);
    
//     try {
//       if (!formData.repository || !formData.commitMessage) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Code pushed to GitHub successfully!', 'success');
//     } catch (error) {
//       showToast('❌ Failed to push code to GitHub', 'error');
//     } finally {
//       setGithubLoading(false);
//     }
//   };

//   // Open Modal function
//   const openModal = (modalName) => {
//     if (modalName === 'attendance-calendar') {
//       setShowAttendanceCalendar(true);
//     } else if (modalName === 'attendance') {
//       setActiveModal('attendance');
//     } else if (modalName === 'projects') {
//       setActiveModal('projects');
//     } else if (modalName === 'tasks') {
//       setActiveModal('tasks');
//     } else {
//       setActiveModal(modalName);
//     }
//   };

//   // Close Modal function
//   const closeModal = () => {
//     setActiveModal(null);
//     setShowAttendanceCalendar(false);
//   };

//   // Render Login Page if not authenticated
//   if (!isAuthenticated) {
//     return (
//       <>
//         <Login 
//           onLogin={handleLogin}
//           onRegister={handleRegister}
//           loading={loginLoading}
//           registerLoading={registerLoading}
//           registerError={registerError}
//           loginError={loginError}
//           clearErrors={clearErrors}
//         />
//         <Toast toast={toast} onClose={hideToast} />
//       </>
//     );
//   }

//   // Main Dashboard
//   return (
//     <div className="app">
//       <div className="app-container">
//         <Header
//           currentUser={currentUser}
//           onProfileClick={() => openModal('profile')}
//           onLogout={handleLogout}
//           onCardClick={openModal}
//           attendanceStatus={attendance}
//         />

//         {/* ✅ DASHBOARD */}
//         <div className="dashboard-wrapper">
//           <Dashboard />
//         </div>

//         {/* ✅ SLIDERS */}
//         <AnnouncementSlider />
//         <BirthdaySlider />
//         <EmployeeSlider/>

//         {/* ✅ ATTENDANCE MODAL */}
//         <AttendanceModal
//           isOpen={activeModal === 'attendance'}
//           onClose={closeModal}
//           attendance={attendance}
//           onPunch={handlePunch}
//         />

//         {/* ✅ PROJECTS MODAL */}
//         <ProjectsModal
//           isOpen={activeModal === 'projects'}
//           onClose={closeModal}
//           currentUser={currentUser}
//           onCardClick={openModal}
//         />

//         <TasksModal
//           isOpen={activeModal === 'tasks'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         {/* ✅ ATTENDANCE CALENDAR MODAL */}
//         <AttendanceCalendarModal
//           isOpen={showAttendanceCalendar}
//           onClose={closeModal}
//           currentUser={currentUser}
//           attendanceData={attendance}
//         />

//         {/* ✅ OTHER MODALS */}
//         <LeaveModal
//           isOpen={activeModal === 'leave'}
//           onClose={closeModal}
//           onLeaveSubmit={handleLeaveSubmit}
//           loading={leaveLoading}
//         />

//         <BirthdayModal
//           isOpen={activeModal === 'birthday'}
//           onClose={closeModal}
//         />

//         <ProfileModal
//           isOpen={activeModal === 'profile'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <CalendarModal
//           isOpen={activeModal === 'calendar'}
//           onClose={closeModal}
//         />

//         <GithubModal
//           isOpen={activeModal === 'github'}
//           onClose={closeModal}
//           onPushCode={handleGithubPush}
//           loading={githubLoading}
//         />

//         <SalaryModal
//           isOpen={activeModal === 'salary'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <Toast toast={toast} onClose={hideToast} />
//       </div>
//     </div>
//   );
// }

// export default App;

























// import React, { useState, useEffect } from 'react';
// import { useAuth } from './hooks/useAuth';
// import useAttendance from './hooks/useAttendance';
// import { useToast } from './hooks/useToast';
// import Swal from "sweetalert2";

// // Components
// import Login from './components/auth/Login';
// import Header from './components/common/Header';
// import Toast from './components/common/Toast';
// import AnnouncementSlider from './components/dashboard/AnnouncementSlider';
// import BirthdaySlider from './components/dashboard/BirthdaySlider';
// import EmployeeSlider from './components/dashboard/EmployeeSlider';
// import Dashboard from './components/dashboard/Dashboard';

// // Modals
// import AttendanceModal from './components/modals/AttendanceModal';
// import LeaveModal from './components/modals/LeaveModal';
// import BirthdayModal from './components/modals/BirthdayModal';
// import ProfileModal from './components/modals/ProfileModal';
// import CalendarModal from './components/modals/CalendarModal';
// import GithubModal from './components/modals/GithubModal';
// import SalaryModal from './components/modals/SalaryModal';
// import AttendanceCalendarModal from './components/modals/AttendanceCalendarModal';
// import ProjectsModal from './components/modals/ProjectsModal';
// import TasksModal from './components/modals/TasksModal';

// import './App.css';


// // slices

// import { useDispatch } from "react-redux";
// import { applyLeave } from "./redux/slices/leaveSlice";


// function App() {

//   const dispatch = useDispatch();
//   const { currentUser, loading: authLoading, login, register, logout } = useAuth();
//   const { attendance, punchIn, punchOut } = useAttendance();
//   const { toast, showToast, hideToast } = useToast();
  
//   // Modal State
//   const [activeModal, setActiveModal] = useState(null);
//   const [showAttendanceCalendar, setShowAttendanceCalendar] = useState(false);
//   const [leaveLoading, setLeaveLoading] = useState(false);
//   const [githubLoading, setGithubLoading] = useState(false);
//   const [showTasks, setShowTasks] = useState(false);

//   // Auto close modal when user logs out
//   useEffect(() => {
//     if (!currentUser) {
//       setActiveModal(null);
//       setShowAttendanceCalendar(false);
//     }
//   }, [currentUser]);

//   // Handle Login
//   const handleLogin = async (email, password) => {
//     try {
//       if (!email || !password) {
//         showToast('❌ Please enter both email and password', 'error');
//         return;
//       }

//       const result = await login(email, password);
//       if (result && result.success) {
//         showToast('✅ Login successful! Welcome to Acore IT Hub', 'success');
//       } else {
//         showToast(result?.error || '❌ Login failed', 'error');
//       }
//     } catch (error) {
//       showToast('❌ Login failed. Please check your credentials.', 'error');
//     }
//   };

//   // Handle Register
//   const handleRegister = async (formData) => {
//     try {
//       console.log("📤 Original Form Data:", formData);
      
//       // ✅ Password match check
//       if (formData.password !== formData.confirmPassword) {
//         showToast('❌ Passwords do not match!', 'error');
//         return;
//       }

//       // ✅ Transform data to match backend schema
//       const dataToSend = {
//         // Personal Info (MAPPED to backend fields)
//         name: formData.fullName, // ✅ 'fullName' -> 'name'
//         email: formData.email,
//         mobile: formData.mobile,
//         birthday: formData.dob, // ✅ 'dob' -> 'birthday'
//         gender: formData.gender?.toLowerCase() || 'male', // ✅ lowercase
//         address: formData.address,
        
//         // Emergency Contact (backend requires 3 fields!)
//         emergencyContactName: formData.emergencyContactName || formData.fullName, // ✅ default to user's name
//         emergencyContactRelation: formData.emergencyContactRelation || "Self", // ✅ default value
//         emergencyContactNumber: formData.emergencyContact,
        
//         // Professional Info
//         designation: formData.designation,
//         department: formData.department,
//         dateOfJoining: formData.dateOfJoining,
//         employeeType: formData.employeeType?.toLowerCase().replace(" ", "-") || 'full-time', // ✅ 'Full Time' -> 'full-time'
//         githubUsername: formData.git || '',
        
//         // Account Info
//         password: formData.password,
        
//         // Financial Info (MAPPED)
//         aadhaarNumber: formData.aadharNumber || '', // ✅ SPELLING FIX: 'aadharNumber' -> 'aadhaarNumber'
//         panNumber: formData.panNumber || '',
//         accountNumber: formData.bankAccount || '', // ✅ 'bankAccount' -> 'accountNumber'
//         bankName: formData.bankName || '',
//         ifscCode: formData.ifscCode || '',
        
//         // Optional fields with defaults
//         bloodGroup: formData.bloodGroup || '',
//       };

//       console.log("🚀 Transformed Data for Backend:", JSON.stringify(dataToSend, null, 2));
      
//       // ✅ Call API
//       const result = await register(dataToSend);
      
//       if (result && result.success) {
//         showToast('✅ Registration successful! Please login.', 'success');
//       } else {
//         const errorMsg = result?.error?.message || result?.error || 'Registration failed';
//         showToast(`❌ ${errorMsg}`, 'error');
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       showToast('❌ Registration failed. Please try again.', 'error');
//     }
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     Swal.fire({
//       title: "Logout?",
//       text: "Are you sure you want to logout?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Logout",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout();
//         showToast("👋 Logged out successfully!", "success");
//       }
//     });
//   };

//   // Handle Punch In/Out
//   const handlePunch = async () => {
//     try {
//       if (attendance.isPunchedIn) {
//         const result = await punchOut();
//         if (result && result.success) {
//           showToast('✅ Punched out successfully! See you tomorrow.', 'success');
//         } else {
//           showToast(result?.error || '❌ Punch out failed', 'error');
//         }
//       } else {
//         const result = await punchIn();
//         if (result && result.success) {
//           showToast('✅ Punched in successfully! Have a productive day.', 'success');
//         } else {
//           showToast(result?.error || '❌ Punch in failed', 'error');
//         }
//       }
//     } catch (error) {
//       showToast('❌ Error processing attendance', 'error');
//       console.error('Punch error:', error);
//     }
//   };

//   // Handle Leave Application
//   // const handleLeaveSubmit = async (formData) => {
//   //   setLeaveLoading(true);
    
//   //   try {
//   //     if (!formData.type || !formData.startDate || !formData.endDate || !formData.reason) {
//   //       showToast('❌ Please fill all required fields', 'error');
//   //       return;
//   //     }

//   //     await new Promise(resolve => setTimeout(resolve, 2000));
//   //     showToast('✅ Leave application submitted successfully!', 'success');
//   //     setActiveModal(null);
//   //   } catch (error) {
//   //     showToast('❌ Failed to submit leave application', 'error');
//   //   } finally {
//   //     setLeaveLoading(false);
//   //   }
//   // };

// // const handleLeaveSubmit = async (formData) => {
// //   setLeaveLoading(true);

// //   try {
// //     if (!currentUser || !currentUser.employeeId) {
// //       showToast("❌ Employee not found. Please login again.", "error");
// //       return;
// //     }

// //     if (
// //       !formData.type ||
// //       !formData.startDate ||
// //       !formData.endDate ||
// //       !formData.reason
// //     ) {
// //       showToast("❌ Please fill all required fields", "error");
// //       return;
// //     }

// //     await dispatch(
// //       applyLeave({
// //         formData,
// //         employeeId: currentUser.employeeId,
// //         employeeName: currentUser.name,
// //       })
// //     ).unwrap();

// //     showToast("✅ Leave application submitted successfully!", "success");
// //     setActiveModal(null);
// //   } catch (error) {
// //     showToast(
// //       error?.message || "❌ Failed to submit leave application",
// //       "error"
// //     );
// //   } finally {
// //     setLeaveLoading(false);
// //   }
// // };


// // App.js me handleLeaveSubmit
// // const handleLeaveSubmit = async (formData) => {
// //   setLeaveLoading(true);

// //   try {
// //     if (!currentUser || !currentUser.employeeId) {
// //       showToast("❌ Employee not found. Please login again.", "error");
// //       return;
// //     }

// //     // ✅ Validate dates
// //     const start = new Date(formData.startDate);
// //     const end = new Date(formData.endDate);
    
// //     if (end < start) {
// //       showToast("❌ End date cannot be before start date", "error");
// //       setLeaveLoading(false);
// //       return;
// //     }

// //     // ✅ Dispatch leave application
// //     const resultAction = await dispatch(
// //       applyLeave({
// //         formData,
// //         employeeId: currentUser.employeeId,
// //         employeeName: currentUser.name,
// //       })
// //     );

// //     console.log("🔄 Dispatch Result:", resultAction);
    
// //     if (applyLeave.fulfilled.match(resultAction)) {
// //       showToast("✅ Leave application submitted successfully!", "success");
// //       setActiveModal(null);
// //     } else {
// //       const errorMessage = resultAction.payload?.message || 
// //                           resultAction.error?.message || 
// //                           "❌ Failed to submit leave application";
// //       showToast(errorMessage, "error");
// //     }

// //   } catch (error) {
// //     console.error("❌ Unexpected Error:", error);
// //     showToast("❌ An unexpected error occurred", "error");
// //   } finally {
// //     setLeaveLoading(false);
// //   }
// // };


// const handleLeaveSubmit = async (formData) => {
//   setLeaveLoading(true);

//   try {
//     if (!currentUser || !currentUser.employeeId) {
//       showToast("❌ Employee not found. Please login again.", "error");
//       return;
//     }

//     console.log("📝 Submitting leave with:", formData);

//     // ✅ Dispatch with mapping (Redux handle karega)
//     const result = await dispatch(
//       applyLeave({
//         formData,
//         employeeId: currentUser.employeeId,
//         employeeName: currentUser.name,
//       })
//     ).unwrap();

//     console.log("✅ Leave Result:", result);
//     showToast("✅ Leave application submitted successfully!", "success");
//     setActiveModal(null);

//   } catch (error) {
//     console.error("❌ Leave Error:", error);
    
//     // ✅ User-friendly error messages
//     let errorMessage = "❌ Failed to submit leave application";
    
//     if (typeof error === 'string') {
//       if (error.includes("holiday")) {
//         errorMessage = error;
//       } else if (error.includes("already applied")) {
//         errorMessage = error;
//       }
//     } else if (error?.message) {
//       errorMessage = error.message;
//     }
    
//     showToast(errorMessage, "error");
//   } finally {
//     setLeaveLoading(false);
//   }
// };



//   // Handle GitHub Push
//   const handleGithubPush = async (formData) => {
//     setGithubLoading(true);
    
//     try {
//       if (!formData.repository || !formData.commitMessage) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Code pushed to GitHub successfully!', 'success');
//     } catch (error) {
//       showToast('❌ Failed to push code to GitHub', 'error');
//     } finally {
//       setGithubLoading(false);
//     }
//   };

//   // Open Modal function
//   const openModal = (modalName) => {
//     if (modalName === 'attendance-calendar') {
//       setShowAttendanceCalendar(true);
//     } else if (modalName === 'attendance') {
//       setActiveModal('attendance');
//     } else if (modalName === 'projects') {
//       setActiveModal('projects');
//     } else if (modalName === 'tasks') {
//       setActiveModal('tasks');
//     } else {
//       setActiveModal(modalName);
//     }
//   };

//   // Close Modal function
//   const closeModal = () => {
//     setActiveModal(null);
//     setShowAttendanceCalendar(false);
//   };

//   // Render Login Page if not authenticated
//   if (!currentUser) {
//     return (
//       <>
//         <Login 
//           onLogin={handleLogin} 
//           onRegister={handleRegister}
//           loading={authLoading}
//           registerLoading={false}
//         />
//         <Toast toast={toast} onClose={hideToast} />
//       </>
//     );
//   }

//   // Main Dashboard
//   return (
//     <div className="app">
//       <div className="app-container">
//         <Header
//           currentUser={currentUser}
//           onProfileClick={() => openModal('profile')}
//           onLogout={handleLogout}
//           onCardClick={openModal}
//           attendanceStatus={attendance}
//         />

//         {/* ✅ DASHBOARD */}
//         <div className="dashboard-wrapper">
//           {/* <Dashboard /> */}
     
// <Dashboard currentUser={currentUser} />
//         </div>

//         {/* ✅ SLIDERS */}
//         <AnnouncementSlider />
//         <BirthdaySlider />
//         <EmployeeSlider/>

//         {/* ✅ ATTENDANCE MODAL */}
//         <AttendanceModal
//           isOpen={activeModal === 'attendance'}
//           onClose={closeModal}
//           attendance={attendance}
//           onPunch={handlePunch}
//         />


//         // App.jsx में
// {/* <AttendanceModal
//   isOpen={activeModal === 'attendance'}
//   onClose={closeModal}
//   attendance={attendance || {
//     isPunchedIn: false,
//     workingHours: 0,
//     workingTime: "0h 0m",
//     canLogout: false,
//     loading: false,
//     isIdle: false,
//     currentApp: "None"
//   }}
//   onPunch={handlePunch}
// /> */}



// // App.jsx में AttendanceModal को ऐसे pass करें
// {/* <AttendanceModal
//   isOpen={activeModal === 'attendance'}
//   onClose={closeModal}
//   attendance={attendance || {
//     isPunchedIn: false,
//     workingHours: 0,
//     workingTime: "0h 0m",
//     canLogout: false,
//     loading: false,
//     isIdle: false,
//     currentApp: "None"
//   }}
//   onPunch={handlePunch}
// /> */}

//         {/* ✅ PROJECTS MODAL */}
//         <ProjectsModal
//           isOpen={activeModal === 'projects'}
//           onClose={closeModal}
//           currentUser={currentUser}
//            onCardClick={openModal}
//         />

//         <TasksModal
//           isOpen={activeModal === 'tasks'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         {/* ✅ ATTENDANCE CALENDAR MODAL */}
//         {/* <AttendanceCalendarModal
//           isOpen={showAttendanceCalendar}
//           onClose={closeModal}
//           currentUser={currentUser}
//           attendanceData={attendance}
//         /> */}


//         <AttendanceCalendarModal
//   isOpen={showAttendanceCalendar}
//   onClose={closeModal}
//   empId={currentUser?.employeeId}  // ✅ सिर्फ empId pass करें
//   attendanceData={attendance}
// />

//         {/* ✅ OTHER MODALS */}
//         <LeaveModal
//           isOpen={activeModal === 'leave'}
//           onClose={closeModal}
//           onLeaveSubmit={handleLeaveSubmit}
//           loading={leaveLoading}
//         />

//         <BirthdayModal
//           isOpen={activeModal === 'birthday'}
//           onClose={closeModal}
//         />

//         <ProfileModal
//           isOpen={activeModal === 'profile'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <CalendarModal
//           isOpen={activeModal === 'calendar'}
//           onClose={closeModal}
//         />

//         <GithubModal
//           isOpen={activeModal === 'github'}
//           onClose={closeModal}
//           onPushCode={handleGithubPush}
//           loading={githubLoading}
//         />

//         <SalaryModal
//           isOpen={activeModal === 'salary'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <Toast toast={toast} onClose={hideToast} />
//       </div>
//     </div>
//   );
// }

// export default App;



// upper val originall or working he bas mene isem attendace model ko hi updat3e kiya tha 











































// import React, { useState, useEffect } from 'react';
// import { useAuth } from './hooks/useAuth';
// import useAttendance from './hooks/useAttendance';
// import { useToast } from './hooks/useToast';
// import Swal from "sweetalert2";

// // Components
// import Login from './components/auth/Login';
// import Header from './components/common/Header';
// import Toast from './components/common/Toast';
// import AnnouncementSlider from './components/dashboard/AnnouncementSlider';
// import BirthdaySlider from './components/dashboard/BirthdaySlider';
// import EmployeeSlider from './components/dashboard/EmployeeSlider';
// import Dashboard from './components/dashboard/Dashboard';

// // Modals
// import AttendanceModal from './components/modals/AttendanceModal';
// import LeaveModal from './components/modals/LeaveModal';
// import BirthdayModal from './components/modals/BirthdayModal';
// import ProfileModal from './components/modals/ProfileModal';
// import CalendarModal from './components/modals/CalendarModal';
// import GithubModal from './components/modals/GithubModal';
// import SalaryModal from './components/modals/SalaryModal';
// import AttendanceCalendarModal from './components/modals/AttendanceCalendarModal';
// import ProjectsModal from './components/modals/ProjectsModal';
// import TasksModal from './components/modals/TasksModal';

// import './App.css';

// // Redux
// import { useDispatch } from "react-redux";
// import { applyLeave } from "./redux/slices/leaveSlice";

// function App() {
//   const dispatch = useDispatch();
//   const { currentUser, loading: authLoading, login, register, logout } = useAuth();
//   const { attendance, punchIn, punchOut } = useAttendance();
//   const { toast, showToast, hideToast } = useToast();
  
//   // Modal State
//   const [activeModal, setActiveModal] = useState(null);
//   const [showAttendanceCalendar, setShowAttendanceCalendar] = useState(false);
//   const [leaveLoading, setLeaveLoading] = useState(false);
//   const [githubLoading, setGithubLoading] = useState(false);
//   const [showTasks, setShowTasks] = useState(false);

//   // Auto close modal when user logs out
//   useEffect(() => {
//     if (!currentUser) {
//       setActiveModal(null);
//       setShowAttendanceCalendar(false);
//     }
//   }, [currentUser]);

//   // Handle Login
//   const handleLogin = async (email, password) => {
//     try {
//       if (!email || !password) {
//         showToast('❌ Please enter both email and password', 'error');
//         return;
//       }

//       const result = await login(email, password);
//       if (result && result.success) {
//         showToast('✅ Login successful! Welcome to Acore IT Hub', 'success');
//       } else {
//         showToast(result?.error || '❌ Login failed', 'error');
//       }
//     } catch (error) {
//       showToast('❌ Login failed. Please check your credentials.', 'error');
//     }
//   };

//   // Handle Register
//   const handleRegister = async (formData) => {
//     try {
//       console.log("📤 Original Form Data:", formData);
      
//       // ✅ Password match check
//       if (formData.password !== formData.confirmPassword) {
//         showToast('❌ Passwords do not match!', 'error');
//         return;
//       }

//       // ✅ Transform data to match backend schema
//       const dataToSend = {
//         name: formData.fullName,
//         email: formData.email,
//         mobile: formData.mobile,
//         birthday: formData.dob,
//         gender: formData.gender?.toLowerCase() || 'male',
//         address: formData.address,
        
//         emergencyContactName: formData.emergencyContactName || formData.fullName,
//         emergencyContactRelation: formData.emergencyContactRelation || "Self",
//         emergencyContactNumber: formData.emergencyContact,
        
//         designation: formData.designation,
//         department: formData.department,
//         dateOfJoining: formData.dateOfJoining,
//         employeeType: formData.employeeType?.toLowerCase().replace(" ", "-") || 'full-time',
//         githubUsername: formData.git || '',
        
//         password: formData.password,
        
//         aadhaarNumber: formData.aadharNumber || '',
//         panNumber: formData.panNumber || '',
//         accountNumber: formData.bankAccount || '',
//         bankName: formData.bankName || '',
//         ifscCode: formData.ifscCode || '',
        
//         bloodGroup: formData.bloodGroup || '',
//       };

//       console.log("🚀 Transformed Data for Backend:", JSON.stringify(dataToSend, null, 2));
      
//       const result = await register(dataToSend);
      
//       if (result && result.success) {
//         showToast('✅ Registration successful! Please login.', 'success');
//       } else {
//         const errorMsg = result?.error?.message || result?.error || 'Registration failed';
//         showToast(`❌ ${errorMsg}`, 'error');
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       showToast('❌ Registration failed. Please try again.', 'error');
//     }
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     Swal.fire({
//       title: "Logout?",
//       text: "Are you sure you want to logout?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Logout",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout();
//         showToast("👋 Logged out successfully!", "success");
//       }
//     });
//   };

//   // Handle Punch In/Out
//   const handlePunch = async () => {
//     try {
//       if (attendance.isPunchedIn) {
//         const result = await punchOut();
//         if (result && result.success) {
//           showToast('✅ Punched out successfully!', 'success');
//         } else {
//           showToast('❌ Punch out failed', 'error');
//         }
//       } else {
//         const result = await punchIn();
//         if (result && result.success) {
//           showToast('✅ Punched in successfully!', 'success');
//         } else {
//           showToast('❌ Punch in failed', 'error');
//         }
//       }
//     } catch (error) {
//       console.error('Punch error:', error);
//       showToast('❌ Error processing attendance', 'error');
//     }
//   };

//   // Handle Leave Application
//   const handleLeaveSubmit = async (formData) => {
//     setLeaveLoading(true);

//     try {
//       if (!currentUser || !currentUser.employeeId) {
//         showToast("❌ Employee not found. Please login again.", "error");
//         return;
//       }

//       console.log("📝 Submitting leave with:", formData);

//       const result = await dispatch(
//         applyLeave({
//           formData,
//           employeeId: currentUser.employeeId,
//           employeeName: currentUser.name,
//         })
//       ).unwrap();

//       console.log("✅ Leave Result:", result);
//       showToast("✅ Leave application submitted successfully!", "success");
//       setActiveModal(null);

//     } catch (error) {
//       console.error("❌ Leave Error:", error);
      
//       let errorMessage = "❌ Failed to submit leave application";
      
//       if (typeof error === 'string') {
//         if (error.includes("holiday")) {
//           errorMessage = error;
//         } else if (error.includes("already applied")) {
//           errorMessage = error;
//         }
//       } else if (error?.message) {
//         errorMessage = error.message;
//       }
      
//       showToast(errorMessage, "error");
//     } finally {
//       setLeaveLoading(false);
//     }
//   };

//   // Handle GitHub Push
//   const handleGithubPush = async (formData) => {
//     setGithubLoading(true);
    
//     try {
//       if (!formData.repository || !formData.commitMessage) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Code pushed to GitHub successfully!', 'success');
//     } catch (error) {
//       showToast('❌ Failed to push code to GitHub', 'error');
//     } finally {
//       setGithubLoading(false);
//     }
//   };

//   // Open Modal function
//   const openModal = (modalName) => {
//     if (modalName === 'attendance-calendar') {
//       setShowAttendanceCalendar(true);
//     } else if (modalName === 'attendance') {
//       setActiveModal('attendance');
//     } else if (modalName === 'projects') {
//       setActiveModal('projects');
//     } else if (modalName === 'tasks') {
//       setActiveModal('tasks');
//     } else {
//       setActiveModal(modalName);
//     }
//   };

//   // Close Modal function
//   const closeModal = () => {
//     setActiveModal(null);
//     setShowAttendanceCalendar(false);
//   };

//   // Render Login Page if not authenticated
//   if (!currentUser) {
//     return (
//       <>
//         <Login 
//           onLogin={handleLogin} 
//           onRegister={handleRegister}
//           loading={authLoading}
//           registerLoading={false}
//         />
//         <Toast toast={toast} onClose={hideToast} />
//       </>
//     );
//   }

//   // Main Dashboard
//   return (
//     <div className="app">
//       <div className="app-container">
//         <Header
//           currentUser={currentUser}
//           onProfileClick={() => openModal('profile')}
//           onLogout={handleLogout}
//           onCardClick={openModal}
//           attendanceStatus={attendance}
//         />

//         {/* ✅ DASHBOARD */}
//         <div className="dashboard-wrapper">
//           <Dashboard currentUser={currentUser} />
//         </div>

//         {/* ✅ SLIDERS */}
//         <AnnouncementSlider />
//         <BirthdaySlider />
//         <EmployeeSlider/>

//         {/* ✅ MODALS */}
//         <AttendanceModal
//           isOpen={activeModal === 'attendance'}
//           onClose={closeModal}
//           attendance={attendance || {
//             isPunchedIn: false,
//             workingHours: 0,
//             workingTime: "0h 0m",
//             canLogout: false,
//             loading: false,
//             isIdle: false,
//             currentApp: "None"
//           }}
//           onPunch={handlePunch}
//         />

//         <ProjectsModal
//           isOpen={activeModal === 'projects'}
//           onClose={closeModal}
//           currentUser={currentUser}
//           onCardClick={openModal}
//         />

//         <TasksModal
//           isOpen={activeModal === 'tasks'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <AttendanceCalendarModal
//           isOpen={showAttendanceCalendar}
//           onClose={closeModal}
//           empId={currentUser?.employeeId}
//         />

//         <LeaveModal
//           isOpen={activeModal === 'leave'}
//           onClose={closeModal}
//           onLeaveSubmit={handleLeaveSubmit}
//           loading={leaveLoading}
//         />

//         <BirthdayModal
//           isOpen={activeModal === 'birthday'}
//           onClose={closeModal}
//         />

//         <ProfileModal
//           isOpen={activeModal === 'profile'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <CalendarModal
//           isOpen={activeModal === 'calendar'}
//           onClose={closeModal}
//         />

//         <GithubModal
//           isOpen={activeModal === 'github'}
//           onClose={closeModal}
//           onPushCode={handleGithubPush}
//           loading={githubLoading}
//         />

//         <SalaryModal
//           isOpen={activeModal === 'salary'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <Toast toast={toast} onClose={hideToast} />
//       </div>
//     </div>
//   );
// }

// export default App;



















// import React, { useState, useEffect } from 'react';
// import { useAuth } from './hooks/useAuth';
// import useAttendance from './hooks/useAttendance';
// import { useToast } from './hooks/useToast';
// import Swal from "sweetalert2";

// // Components
// import Login from './components/auth/Login';
// import Header from './components/common/Header';
// import Toast from './components/common/Toast';
// import AnnouncementSlider from './components/dashboard/AnnouncementSlider';
// import BirthdaySlider from './components/dashboard/BirthdaySlider';
// import EmployeeSlider from './components/dashboard/EmployeeSlider';
// import Dashboard from './components/dashboard/Dashboard';

// // Modals
// import AttendanceModal from './components/modals/AttendanceModal';
// import LeaveModal from './components/modals/LeaveModal';
// import BirthdayModal from './components/modals/BirthdayModal';
// import ProfileModal from './components/modals/ProfileModal';
// import CalendarModal from './components/modals/CalendarModal';
// import GithubModal from './components/modals/GithubModal';
// import SalaryModal from './components/modals/SalaryModal';
// import AttendanceCalendarModal from './components/modals/AttendanceCalendarModal';
// import ProjectsModal from './components/modals/ProjectsModal';
// import TasksModal from './components/modals/TasksModal';

// import './App.css';


// // slices

// import { useDispatch } from "react-redux";
// import { applyLeave } from "./redux/slices/leaveSlice";
// import { useAttendanceAPI } from './hooks/useAttendanceAPI'; // ✅ ADD THIS


// function App() {
// const { apiPunchIn, apiPunchOut, loading: apiLoading } = useAttendanceAPI();
//   const dispatch = useDispatch();
//   const { currentUser, loading: authLoading, login, register, logout } = useAuth();
//   const { attendance, punchIn, punchOut } = useAttendance();
//   const { toast, showToast, hideToast } = useToast();
  
//   // Modal State
//   const [activeModal, setActiveModal] = useState(null);
//   const [showAttendanceCalendar, setShowAttendanceCalendar] = useState(false);
//   const [leaveLoading, setLeaveLoading] = useState(false);
//   const [githubLoading, setGithubLoading] = useState(false);
//   const [showTasks, setShowTasks] = useState(false);

//   // Auto close modal when user logs out
//   useEffect(() => {
//     if (!currentUser) {
//       setActiveModal(null);
//       setShowAttendanceCalendar(false);
//     }
//   }, [currentUser]);

//   // Handle Login
//   const handleLogin = async (email, password) => {
//     try {
//       if (!email || !password) {
//         showToast('❌ Please enter both email and password', 'error');
//         return;
//       }

//       const result = await login(email, password);
//       if (result && result.success) {
//         showToast('✅ Login successful! Welcome to Acore IT Hub', 'success');
//       } else {
//         showToast(result?.error || '❌ Login failed', 'error');
//       }
//     } catch (error) {
//       showToast('❌ Login failed. Please check your credentials.', 'error');
//     }
//   };

//   // Handle Register
//   const handleRegister = async (formData) => {
//     try {
//       console.log("📤 Original Form Data:", formData);
      
//       // ✅ Password match check
//       if (formData.password !== formData.confirmPassword) {
//         showToast('❌ Passwords do not match!', 'error');
//         return;
//       }

//       // ✅ Transform data to match backend schema
//       const dataToSend = {
//         // Personal Info (MAPPED to backend fields)
//         name: formData.fullName, // ✅ 'fullName' -> 'name'
//         email: formData.email,
//         mobile: formData.mobile,
//         birthday: formData.dob, // ✅ 'dob' -> 'birthday'
//         gender: formData.gender?.toLowerCase() || 'male', // ✅ lowercase
//         address: formData.address,
        
//         // Emergency Contact (backend requires 3 fields!)
//         emergencyContactName: formData.emergencyContactName || formData.fullName, // ✅ default to user's name
//         emergencyContactRelation: formData.emergencyContactRelation || "Self", // ✅ default value
//         emergencyContactNumber: formData.emergencyContact,
        
//         // Professional Info
//         designation: formData.designation,
//         department: formData.department,
//         dateOfJoining: formData.dateOfJoining,
//         employeeType: formData.employeeType?.toLowerCase().replace(" ", "-") || 'full-time', // ✅ 'Full Time' -> 'full-time'
//         githubUsername: formData.git || '',
        
//         // Account Info
//         password: formData.password,
        
//         // Financial Info (MAPPED)
//         aadhaarNumber: formData.aadharNumber || '', // ✅ SPELLING FIX: 'aadharNumber' -> 'aadhaarNumber'
//         panNumber: formData.panNumber || '',
//         accountNumber: formData.bankAccount || '', // ✅ 'bankAccount' -> 'accountNumber'
//         bankName: formData.bankName || '',
//         ifscCode: formData.ifscCode || '',
        
//         // Optional fields with defaults
//         bloodGroup: formData.bloodGroup || '',
//       };

//       console.log("🚀 Transformed Data for Backend:", JSON.stringify(dataToSend, null, 2));
      
//       // ✅ Call API
//       const result = await register(dataToSend);
      
//       if (result && result.success) {
//         showToast('✅ Registration successful! Please login.', 'success');
//       } else {
//         const errorMsg = result?.error?.message || result?.error || 'Registration failed';
//         showToast(`❌ ${errorMsg}`, 'error');
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       showToast('❌ Registration failed. Please try again.', 'error');
//     }
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     Swal.fire({
//       title: "Logout?",
//       text: "Are you sure you want to logout?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Logout",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout();
//         showToast("👋 Logged out successfully!", "success");
//       }
//     });
//   };

//   // Handle Punch In/Out
//   // const handlePunch = async () => {
//   //   try {
//   //     if (attendance.isPunchedIn) {
//   //       const result = await punchOut();
//   //       if (result && result.success) {
//   //         showToast('✅ Punched out successfully! See you tomorrow.', 'success');
//   //       } else {
//   //         showToast(result?.error || '❌ Punch out failed', 'error');
//   //       }
//   //     } else {
//   //       const result = await punchIn();
//   //       if (result && result.success) {
//   //         showToast('✅ Punched in successfully! Have a productive day.', 'success');
//   //       } else {
//   //         showToast(result?.error || '❌ Punch in failed', 'error');
//   //       }
//   //     }
//   //   } catch (error) {
//   //     showToast('❌ Error processing attendance', 'error');
//   //     console.error('Punch error:', error);
//   //   }
//   // };




//   // App.js में handlePunch function
// // const handlePunch = async () => {
// //   try {
// //     // Get location first
// //     let location = null;
// //     let source = 'browser';
    
// //     if (window.electronAPI && window.electronAPI.getCurrentLocation) {
// //       try {
// //         const locResult = await window.electronAPI.getCurrentLocation();
// //         if (locResult.success) {
// //           location = locResult;
// //           source = locResult.source || 'electron';
// //         }
// //       } catch (error) {
// //         console.error("Location error:", error);
// //       }
// //     }

// //     if (attendance.isPunchedIn) {
// //       // Punch Out
// //       const result = await punchOut();
      
// //       // Call backend API
// //       if (currentUser?.employeeId) {
// //         await apiPunchOut(currentUser.employeeId);
// //       }

// //       if (result.success) {
// //         showToast('✅ Punched out successfully!', 'success');
// //       }
// //     } else {
// //       // Punch In
// //       // Check if we have location
// //       if (!location) {
// //         showToast('❌ Location access required for punch in', 'error');
// //         return;
// //       }

// //       // Call backend API first
// //       if (currentUser?.employeeId) {
// //         const apiResult = await apiPunchIn(
// //           currentUser.employeeId,
// //           location.latitude,
// //           location.longitude,
// //           source
// //         );

// //         if (!apiResult.success) {
// //           showToast(`❌ ${apiResult.error}`, 'error');
// //           return;
// //         }
// //       }

// //       // Then call frontend punch in
// //       const result = await punchIn();
// //       if (result.success) {
// //         showToast('✅ Punched in successfully!', 'success');
// //       }
// //     }
// //   } catch (error) {
// //     showToast('❌ Error processing attendance', 'error');
// //     console.error('Punch error:', error);
// //   }
// // };


// // working but location required 



// // App.js में handlePunch function
// // App.js में handlePunch function
// const handlePunch = async () => {
//   try {
//     // Basic checks
//     if (!currentUser || !currentUser.employeeId) {
//       showToast('❌ Please login first', 'error');
//       return;
//     }

//     const token = localStorage.getItem('token');
    
//     if (attendance.isPunchedIn) {
//       // 🔴 PUNCH OUT
//       const activeSeconds = attendance.activeSeconds || 0;
//       const requiredSeconds = 25200; // 7 hours
      
//       // Check minimum hours
//       if (activeSeconds < requiredSeconds) {
//         const remaining = requiredSeconds - activeSeconds;
//         const hours = Math.floor(remaining / 3600);
//         const minutes = Math.floor((remaining % 3600) / 60);
        
//         showToast(`⏳ Complete ${hours}h ${minutes}m more`, 'warning');
//         return;
//       }

//       // Call backend
//       try {
//         const response = await axios.put(
//           '/attendance/mark-out',
//           {
//             employeeId: currentUser.employeeId,
//             activeSeconds: activeSeconds
//           },
//           {
//             headers: {
//               'Authorization': `Bearer ${token}`,
//               'Content-Type': 'application/json'
//             }
//           }
//         );

//         if (response.data.status) {
//           await punchOut();
//           showToast('✅ Punch out successful!', 'success');
//         } else {
//           showToast(`❌ ${response.data.message}`, 'error');
//         }
//       } catch (apiError) {
//         console.error('Punch out API error:', apiError);
        
//         if (apiError.response?.status === 400) {
//           showToast(`❌ ${apiError.response.data.message}`, 'error');
//         } else if (apiError.response?.status === 401) {
//           showToast('🔐 Session expired', 'error');
//           logout();
//         } else {
//           await punchOut();
//           showToast('⚠️ Punch out recorded locally', 'warning');
//         }
//       }
      
//     } else {
//       // 🟢 PUNCH IN
      
//       // Get location
//       let location = { latitude: 22.7494444, longitude: 75.8991667 };
//       let source = 'default';
      
//       if (window.electronAPI?.getCurrentLocation) {
//         try {
//           const result = await window.electronAPI.getCurrentLocation();
//           if (result.success) {
//             location = result;
//             source = result.source || 'electron';
//           }
//         } catch (error) {
//           console.log('Location error:', error);
//         }
//       }

//       // Frontend punch in first
//       await punchIn();

//       // Call backend
//       try {
//         const response = await axios.post(
//           '/attendance/mark-in',
//           {
//             employeeId: currentUser.employeeId,
//             latitude: location.latitude,
//             longitude: location.longitude,
//             source: source
//           },
//           {
//             headers: {
//               'Authorization': `Bearer ${token}`,
//               'Content-Type': 'application/json'
//             }
//           }
//         );

//         if (response.data.status) {
//           showToast('✅ Punch in successful!', 'success');
//         } else {
//           showToast(`⚠️ ${response.data.message}`, 'warning');
//         }
//       } catch (apiError) {
//         console.error('Punch in API error:', apiError);
        
//         if (apiError.response?.status === 401) {
//           showToast('🔐 Session expired', 'error');
//           logout();
//           await punchOut(); // Rollback
//         } else if (apiError.response?.status === 403) {
//           showToast(`📍 ${apiError.response.data.message}`, 'warning');
//         } else {
//           showToast('⚠️ Punch in recorded locally', 'warning');
//         }
//       }
//     }
    
//   } catch (error) {
//     console.error('Punch error:', error);
//     showToast(`❌ ${error.message}`, 'error');
//   }
// };
//   // Handle Leave Application
//   // const handleLeaveSubmit = async (formData) => {
//   //   setLeaveLoading(true);
    
//   //   try {
//   //     if (!formData.type || !formData.startDate || !formData.endDate || !formData.reason) {
//   //       showToast('❌ Please fill all required fields', 'error');
//   //       return;
//   //     }

//   //     await new Promise(resolve => setTimeout(resolve, 2000));
//   //     showToast('✅ Leave application submitted successfully!', 'success');
//   //     setActiveModal(null);
//   //   } catch (error) {
//   //     showToast('❌ Failed to submit leave application', 'error');
//   //   } finally {
//   //     setLeaveLoading(false);
//   //   }
//   // };

// // const handleLeaveSubmit = async (formData) => {
// //   setLeaveLoading(true);

// //   try {
// //     if (!currentUser || !currentUser.employeeId) {
// //       showToast("❌ Employee not found. Please login again.", "error");
// //       return;
// //     }

// //     if (
// //       !formData.type ||
// //       !formData.startDate ||
// //       !formData.endDate ||
// //       !formData.reason
// //     ) {
// //       showToast("❌ Please fill all required fields", "error");
// //       return;
// //     }

// //     await dispatch(
// //       applyLeave({
// //         formData,
// //         employeeId: currentUser.employeeId,
// //         employeeName: currentUser.name,
// //       })
// //     ).unwrap();

// //     showToast("✅ Leave application submitted successfully!", "success");
// //     setActiveModal(null);
// //   } catch (error) {
// //     showToast(
// //       error?.message || "❌ Failed to submit leave application",
// //       "error"
// //     );
// //   } finally {
// //     setLeaveLoading(false);
// //   }
// // };


// // App.js me handleLeaveSubmit
// // const handleLeaveSubmit = async (formData) => {
// //   setLeaveLoading(true);

// //   try {
// //     if (!currentUser || !currentUser.employeeId) {
// //       showToast("❌ Employee not found. Please login again.", "error");
// //       return;
// //     }

// //     // ✅ Validate dates
// //     const start = new Date(formData.startDate);
// //     const end = new Date(formData.endDate);
    
// //     if (end < start) {
// //       showToast("❌ End date cannot be before start date", "error");
// //       setLeaveLoading(false);
// //       return;
// //     }

// //     // ✅ Dispatch leave application
// //     const resultAction = await dispatch(
// //       applyLeave({
// //         formData,
// //         employeeId: currentUser.employeeId,
// //         employeeName: currentUser.name,
// //       })
// //     );

// //     console.log("🔄 Dispatch Result:", resultAction);
    
// //     if (applyLeave.fulfilled.match(resultAction)) {
// //       showToast("✅ Leave application submitted successfully!", "success");
// //       setActiveModal(null);
// //     } else {
// //       const errorMessage = resultAction.payload?.message || 
// //                           resultAction.error?.message || 
// //                           "❌ Failed to submit leave application";
// //       showToast(errorMessage, "error");
// //     }

// //   } catch (error) {
// //     console.error("❌ Unexpected Error:", error);
// //     showToast("❌ An unexpected error occurred", "error");
// //   } finally {
// //     setLeaveLoading(false);
// //   }
// // };


// const handleLeaveSubmit = async (formData) => {
//   setLeaveLoading(true);

//   try {
//     if (!currentUser || !currentUser.employeeId) {
//       showToast("❌ Employee not found. Please login again.", "error");
//       return;
//     }

//     console.log("📝 Submitting leave with:", formData);

//     // ✅ Dispatch with mapping (Redux handle karega)
//     const result = await dispatch(
//       applyLeave({
//         formData,
//         employeeId: currentUser.employeeId,
//         employeeName: currentUser.name,
//       })
//     ).unwrap();

//     console.log("✅ Leave Result:", result);
//     showToast("✅ Leave application submitted successfully!", "success");
//     setActiveModal(null);

//   } catch (error) {
//     console.error("❌ Leave Error:", error);
    
//     // ✅ User-friendly error messages
//     let errorMessage = "❌ Failed to submit leave application";
    
//     if (typeof error === 'string') {
//       if (error.includes("holiday")) {
//         errorMessage = error;
//       } else if (error.includes("already applied")) {
//         errorMessage = error;
//       }
//     } else if (error?.message) {
//       errorMessage = error.message;
//     }
    
//     showToast(errorMessage, "error");
//   } finally {
//     setLeaveLoading(false);
//   }
// };



//   // Handle GitHub Push
//   const handleGithubPush = async (formData) => {
//     setGithubLoading(true);
    
//     try {
//       if (!formData.repository || !formData.commitMessage) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Code pushed to GitHub successfully!', 'success');
//     } catch (error) {
//       showToast('❌ Failed to push code to GitHub', 'error');
//     } finally {
//       setGithubLoading(false);
//     }
//   };

//   // Open Modal function
//   const openModal = (modalName) => {
//     if (modalName === 'attendance-calendar') {
//       setShowAttendanceCalendar(true);
//     } else if (modalName === 'attendance') {
//       setActiveModal('attendance');
//     } else if (modalName === 'projects') {
//       setActiveModal('projects');
//     } else if (modalName === 'tasks') {
//       setActiveModal('tasks');
//     } else {
//       setActiveModal(modalName);
//     }
//   };

//   // Close Modal function
//   const closeModal = () => {
//     setActiveModal(null);
//     setShowAttendanceCalendar(false);
//   };

//   // Render Login Page if not authenticated
//   if (!currentUser) {
//     return (
//       <>
//         <Login 
//           onLogin={handleLogin} 
//           onRegister={handleRegister}
//           loading={authLoading}
//           registerLoading={false}
//         />
//         <Toast toast={toast} onClose={hideToast} />
//       </>
//     );
//   }

//   // Main Dashboard
//   return (
//     <div className="app">
//       <div className="app-container">
//         <Header
//           currentUser={currentUser}
//           onProfileClick={() => openModal('profile')}
//           onLogout={handleLogout}
//           onCardClick={openModal}
//           attendanceStatus={attendance}
//         />

//         {/* ✅ DASHBOARD */}
//         <div className="dashboard-wrapper">
//           {/* <Dashboard /> */}
     
// <Dashboard currentUser={currentUser} />
//         </div>

//         {/* ✅ SLIDERS */}
//         <AnnouncementSlider />
//         <BirthdaySlider />
//         <EmployeeSlider/>

//         {/* ✅ ATTENDANCE MODAL */}
//         {/* <AttendanceModal
//           isOpen={activeModal === 'attendance'}
//           onClose={closeModal}
//           attendance={attendance}
//           onPunch={handlePunch}
//         /> */}


// // App.js में AttendanceModal को ऐसे pass करें
// <AttendanceModal
//   isOpen={activeModal === 'attendance'}
//   onClose={closeModal}
//   currentUser={currentUser}
//   attendance={attendance}
//   onPunch={handlePunch}
// />


//         // App.jsx में
// {/* <AttendanceModal
//   isOpen={activeModal === 'attendance'}
//   onClose={closeModal}
//   attendance={attendance || {
//     isPunchedIn: false,
//     workingHours: 0,
//     workingTime: "0h 0m",
//     canLogout: false,
//     loading: false,
//     isIdle: false,
//     currentApp: "None"
//   }}
//   onPunch={handlePunch}
// /> */}



// // App.jsx में AttendanceModal को ऐसे pass करें
// {/* <AttendanceModal
//   isOpen={activeModal === 'attendance'}
//   onClose={closeModal}
//   attendance={attendance || {
//     isPunchedIn: false,
//     workingHours: 0,
//     workingTime: "0h 0m",
//     canLogout: false,
//     loading: false,
//     isIdle: false,
//     currentApp: "None"
//   }}
//   onPunch={handlePunch}
// /> */}

//         {/* ✅ PROJECTS MODAL */}
//         <ProjectsModal
//           isOpen={activeModal === 'projects'}
//           onClose={closeModal}
//           currentUser={currentUser}
//            onCardClick={openModal}
//         />

//         <TasksModal
//           isOpen={activeModal === 'tasks'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         {/* ✅ ATTENDANCE CALENDAR MODAL */}
//         {/* <AttendanceCalendarModal
//           isOpen={showAttendanceCalendar}
//           onClose={closeModal}
//           currentUser={currentUser}
//           attendanceData={attendance}
//         /> */}


//         <AttendanceCalendarModal
//   isOpen={showAttendanceCalendar}
//   onClose={closeModal}
//   empId={currentUser?.employeeId}  // ✅ सिर्फ empId pass करें
//   attendanceData={attendance}
// />

//         {/* ✅ OTHER MODALS */}
//         <LeaveModal
//           isOpen={activeModal === 'leave'}
//           onClose={closeModal}
//           onLeaveSubmit={handleLeaveSubmit}
//           loading={leaveLoading}
//         />

//         <BirthdayModal
//           isOpen={activeModal === 'birthday'}
//           onClose={closeModal}
//         />

//         <ProfileModal
//           isOpen={activeModal === 'profile'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <CalendarModal
//           isOpen={activeModal === 'calendar'}
//           onClose={closeModal}
//         />

//         <GithubModal
//           isOpen={activeModal === 'github'}
//           onClose={closeModal}
//           onPushCode={handleGithubPush}
//           loading={githubLoading}
//         />

//         <SalaryModal
//           isOpen={activeModal === 'salary'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <Toast toast={toast} onClose={hideToast} />
//       </div>
//     </div>
//   );
// }

// export default App;







// import React, { useState, useEffect } from 'react';
// import { useAuth } from './hooks/useAuth';
// import useAttendance from './hooks/useAttendance';
// import { useToast } from './hooks/useToast';
// import Swal from "sweetalert2";
// import { useDispatch } from "react-redux";

// // Components
// import Login from './components/auth/Login';
// import Header from './components/common/Header';
// import Toast from './components/common/Toast';
// import AnnouncementSlider from './components/dashboard/AnnouncementSlider';
// import BirthdaySlider from './components/dashboard/BirthdaySlider';
// import EmployeeSlider from './components/dashboard/EmployeeSlider';
// import Dashboard from './components/dashboard/Dashboard';

// // Modals
// import AttendanceModal from './components/modals/AttendanceModal';
// import LeaveModal from './components/modals/LeaveModal';
// import BirthdayModal from './components/modals/BirthdayModal';
// import ProfileModal from './components/modals/ProfileModal';
// import CalendarModal from './components/modals/CalendarModal';
// import GithubModal from './components/modals/GithubModal';
// import SalaryModal from './components/modals/SalaryModal';
// import AttendanceCalendarModal from './components/modals/AttendanceCalendarModal';
// import ProjectsModal from './components/modals/ProjectsModal';
// import TasksModal from './components/modals/TasksModal';
// import EarlyPunchOutModal from './components/modals/EarlyPunchOutModal';

// import './App.css';

// // Slices
// import { applyLeave } from "./redux/slices/leaveSlice";

// function App() {
//   const dispatch = useDispatch();
//   const { currentUser, loading: authLoading, login, register, logout } = useAuth();
//   const { attendance, punchIn, punchOut, requestEarlyPunchOut } = useAttendance();
//   const { toast, showToast, hideToast } = useToast();
  
//   // Modal State
//   const [activeModal, setActiveModal] = useState(null);
//   const [showAttendanceCalendar, setShowAttendanceCalendar] = useState(false);
//   const [leaveLoading, setLeaveLoading] = useState(false);
//   const [githubLoading, setGithubLoading] = useState(false);
//   const [showTasks, setShowTasks] = useState(false);
//   const [showEarlyPunchOut, setShowEarlyPunchOut] = useState(false);

//   // Auto close modal when user logs out
//   useEffect(() => {
//     if (!currentUser) {
//       setActiveModal(null);
//       setShowAttendanceCalendar(false);
//       setShowEarlyPunchOut(false);
//     }
//   }, [currentUser]);

//   // Handle Login
//   const handleLogin = async (email, password) => {
//     try {
//       if (!email || !password) {
//         showToast('❌ Please enter both email and password', 'error');
//         return;
//       }

//       const result = await login(email, password);
//       if (result && result.success) {
//         showToast('✅ Login successful! Welcome to Acore IT Hub', 'success');
//       } else {
//         showToast(result?.error || '❌ Login failed', 'error');
//       }
//     } catch (error) {
//       showToast('❌ Login failed. Please check your credentials.', 'error');
//     }
//   };

//   // Handle Register
//   const handleRegister = async (formData) => {
//     try {
//       console.log("📤 Original Form Data:", formData);
      
//       // ✅ Password match check
//       if (formData.password !== formData.confirmPassword) {
//         showToast('❌ Passwords do not match!', 'error');
//         return;
//       }

//       // ✅ Transform data to match backend schema
//       const dataToSend = {
//         // Personal Info (MAPPED to backend fields)
//         name: formData.fullName, // ✅ 'fullName' -> 'name'
//         email: formData.email,
//         mobile: formData.mobile,
//         birthday: formData.dob, // ✅ 'dob' -> 'birthday'
//         gender: formData.gender?.toLowerCase() || 'male', // ✅ lowercase
//         address: formData.address,
        
//         // Emergency Contact (backend requires 3 fields!)
//         emergencyContactName: formData.emergencyContactName || formData.fullName, // ✅ default to user's name
//         emergencyContactRelation: formData.emergencyContactRelation || "Self", // ✅ default value
//         emergencyContactNumber: formData.emergencyContact,
        
//         // Professional Info
//         designation: formData.designation,
//         department: formData.department,
//         dateOfJoining: formData.dateOfJoining,
//         employeeType: formData.employeeType?.toLowerCase().replace(" ", "-") || 'full-time', // ✅ 'Full Time' -> 'full-time'
//         githubUsername: formData.git || '',
        
//         // Account Info
//         password: formData.password,
        
//         // Financial Info (MAPPED)
//         aadhaarNumber: formData.aadharNumber || '', // ✅ SPELLING FIX: 'aadharNumber' -> 'aadhaarNumber'
//         panNumber: formData.panNumber || '',
//         accountNumber: formData.bankAccount || '', // ✅ 'bankAccount' -> 'accountNumber'
//         bankName: formData.bankName || '',
//         ifscCode: formData.ifscCode || '',
        
//         // Optional fields with defaults
//         bloodGroup: formData.bloodGroup || '',
//       };

//       console.log("🚀 Transformed Data for Backend:", JSON.stringify(dataToSend, null, 2));
      
//       // ✅ Call API
//       const result = await register(dataToSend);
      
//       if (result && result.success) {
//         showToast('✅ Registration successful! Please login.', 'success');
//       } else {
//         const errorMsg = result?.error?.message || result?.error || 'Registration failed';
//         showToast(`❌ ${errorMsg}`, 'error');
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       showToast('❌ Registration failed. Please try again.', 'error');
//     }
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     Swal.fire({
//       title: "Logout?",
//       text: "Are you sure you want to logout?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Logout",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout();
//         showToast("👋 Logged out successfully!", "success");
//       }
//     });
//   };

//   // Handle Punch In/Out
//   const handlePunch = async () => {
//     try {
//       if (attendance.isPunchedIn) {
//         // Check if minimum hours reached
//         if (attendance.minimumHoursReached) {
//           const result = await punchOut();
//           if (result && result.success) {
//             showToast('✅ Punched out successfully! See you tomorrow.', 'success');
//             setActiveModal(null);
//           } else {
//             showToast(result?.error || '❌ Punch out failed', 'error');
//           }
//         } else {
//           // Show early punch-out modal
//           setShowEarlyPunchOut(true);
//         }
//       } else {
//         // Punch In
//         const result = await punchIn();
//         if (result && result.success) {
//           showToast('✅ Punched in successfully! Have a productive day.', 'success');
//         } else {
//           showToast(result?.error || '❌ Punch in failed', 'error');
//         }
//       }
//     } catch (error) {
//       showToast('❌ Error processing attendance', 'error');
//       console.error('Punch error:', error);
//     }
//   };

//   // Handle Early Punch Out Request
//   const handleEarlyPunchOut = async (reason) => {
//     try {
//       const result = await requestEarlyPunchOut(reason);
//       if (result && result.success) {
//         showToast('✅ Early punch-out request submitted successfully!', 'success');
//         setShowEarlyPunchOut(false);
//         setActiveModal(null);
//       } else {
//         showToast(result?.error || '❌ Failed to submit request', 'error');
//       }
//     } catch (error) {
//       showToast('❌ Error submitting early punch-out request', 'error');
//     }
//   };

//   // Handle Leave Application
//   const handleLeaveSubmit = async (formData) => {
//     setLeaveLoading(true);

//     try {
//       if (!currentUser || !currentUser.employeeId) {
//         showToast("❌ Employee not found. Please login again.", "error");
//         return;
//       }

//       console.log("📝 Submitting leave with:", formData);

//       // ✅ Dispatch with mapping (Redux handle karega)
//       const result = await dispatch(
//         applyLeave({
//           formData,
//           employeeId: currentUser.employeeId,
//           employeeName: currentUser.name,
//         })
//       ).unwrap();

//       console.log("✅ Leave Result:", result);
//       showToast("✅ Leave application submitted successfully!", "success");
//       setActiveModal(null);

//     } catch (error) {
//       console.error("❌ Leave Error:", error);
      
//       // ✅ User-friendly error messages
//       let errorMessage = "❌ Failed to submit leave application";
      
//       if (typeof error === 'string') {
//         if (error.includes("holiday")) {
//           errorMessage = error;
//         } else if (error.includes("already applied")) {
//           errorMessage = error;
//         }
//       } else if (error?.message) {
//         errorMessage = error.message;
//       }
      
//       showToast(errorMessage, "error");
//     } finally {
//       setLeaveLoading(false);
//     }
//   };

//   // Handle GitHub Push
//   const handleGithubPush = async (formData) => {
//     setGithubLoading(true);
    
//     try {
//       if (!formData.repository || !formData.commitMessage) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Code pushed to GitHub successfully!', 'success');
//     } catch (error) {
//       showToast('❌ Failed to push code to GitHub', 'error');
//     } finally {
//       setGithubLoading(false);
//     }
//   };

//   // Admin override punch-out (for emergencies)
//   const handleAdminOverridePunchOut = async () => {
//     Swal.fire({
//       title: "Admin Override Punch Out",
//       text: "Are you sure you want to punch out with admin override?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Punch Out",
//       input: "text",
//       inputLabel: "Reason for override",
//       inputPlaceholder: "Enter reason...",
//       inputValidator: (value) => {
//         if (!value) {
//           return "Please provide a reason";
//         }
//       }
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const result = await punchOut(true, result.value);
//         if (result && result.success) {
//           showToast('✅ Punched out with admin override!', 'success');
//           setActiveModal(null);
//         } else {
//           showToast(result?.error || '❌ Punch out failed', 'error');
//         }
//       }
//     });
//   };

//   // Open Modal function
//   const openModal = (modalName) => {
//     if (modalName === 'attendance-calendar') {
//       setShowAttendanceCalendar(true);
//     } else if (modalName === 'attendance') {
//       setActiveModal('attendance');
//     } else if (modalName === 'projects') {
//       setActiveModal('projects');
//     } else if (modalName === 'tasks') {
//       setActiveModal('tasks');
//     } else {
//       setActiveModal(modalName);
//     }
//   };

//   // Close Modal function
//   const closeModal = () => {
//     setActiveModal(null);
//     setShowAttendanceCalendar(false);
//     setShowEarlyPunchOut(false);
//   };

//   // Render Login Page if not authenticated
//   if (!currentUser) {
//     return (
//       <>
//         <Login 
//           onLogin={handleLogin} 
//           onRegister={handleRegister}
//           loading={authLoading}
//           registerLoading={false}
//         />
//         <Toast toast={toast} onClose={hideToast} />
//       </>
//     );
//   }

//   // Main Dashboard
//   return (
//     <div className="app">
//       <div className="app-container">
//         <Header
//           currentUser={currentUser}
//           onProfileClick={() => openModal('profile')}
//           onLogout={handleLogout}
//           onCardClick={openModal}
//           attendanceStatus={attendance}
//         />

//         {/* ✅ DASHBOARD */}
//         <div className="dashboard-wrapper">
//           <Dashboard currentUser={currentUser} />
//         </div>

//         {/* ✅ SLIDERS */}
//         <AnnouncementSlider />
//         <BirthdaySlider />
//         <EmployeeSlider/>

//         {/* ✅ ATTENDANCE MODAL */}
//         <AttendanceModal
//           isOpen={activeModal === 'attendance'}
//           onClose={closeModal}
//           attendance={attendance || {
//             isPunchedIn: false,
//             workingHours: 0,
//             workingTime: "0h 0m",
//             canPunchOut: false,
//             loading: false,
//             isIdle: false,
//             currentApp: "None",
//             minimumHoursReached: false
//           }}
//           onPunch={handlePunch}
//           onRequestEarlyPunchOut={() => setShowEarlyPunchOut(true)}
//           isAdmin={currentUser?.role === 'admin'}
//           onAdminOverride={handleAdminOverridePunchOut}
//         />

//         {/* ✅ EARLY PUNCH-OUT MODAL */}
//         <EarlyPunchOutModal
//           isOpen={showEarlyPunchOut}
//           onClose={() => setShowEarlyPunchOut(false)}
//           onSubmit={handleEarlyPunchOut}
//           workedHours={attendance?.workingHours || 0}
//           requiredHours={7}
//         />

//         {/* ✅ PROJECTS MODAL */}
//         <ProjectsModal
//           isOpen={activeModal === 'projects'}
//           onClose={closeModal}
//           currentUser={currentUser}
//           onCardClick={openModal}
//         />

//         <TasksModal
//           isOpen={activeModal === 'tasks'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         {/* ✅ ATTENDANCE CALENDAR MODAL */}
//         <AttendanceCalendarModal
//           isOpen={showAttendanceCalendar}
//           onClose={closeModal}
//           empId={currentUser?.employeeId}
//           attendanceData={attendance}
//         />

//         {/* ✅ OTHER MODALS */}
//         <LeaveModal
//           isOpen={activeModal === 'leave'}
//           onClose={closeModal}
//           onLeaveSubmit={handleLeaveSubmit}
//           loading={leaveLoading}
//         />

//         <BirthdayModal
//           isOpen={activeModal === 'birthday'}
//           onClose={closeModal}
//         />

//         <ProfileModal
//           isOpen={activeModal === 'profile'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <CalendarModal
//           isOpen={activeModal === 'calendar'}
//           onClose={closeModal}
//         />

//         <GithubModal
//           isOpen={activeModal === 'github'}
//           onClose={closeModal}
//           onPushCode={handleGithubPush}
//           loading={githubLoading}
//         />

//         <SalaryModal
//           isOpen={activeModal === 'salary'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <Toast toast={toast} onClose={hideToast} />
//       </div>
//     </div>
//   );
// }

// export default App;








// import React, { useState, useEffect } from 'react';
// import { useAuth } from './hooks/useAuth';
// import useAttendance from './hooks/useAttendance';
// import { useToast } from './hooks/useToast';
// import Swal from "sweetalert2";

// // Components
// import Login from './components/auth/Login';
// import Header from './components/common/Header';
// import Toast from './components/common/Toast';
// import AnnouncementSlider from './components/dashboard/AnnouncementSlider';
// import BirthdaySlider from './components/dashboard/BirthdaySlider';
// import EmployeeSlider from './components/dashboard/EmployeeSlider';
// import Dashboard from './components/dashboard/Dashboard';

// // Modals
// import AttendanceModal from './components/modals/AttendanceModal';
// import LeaveModal from './components/modals/LeaveModal';
// import BirthdayModal from './components/modals/BirthdayModal';
// import ProfileModal from './components/modals/ProfileModal';
// import CalendarModal from './components/modals/CalendarModal';
// import GithubModal from './components/modals/GithubModal';
// import SalaryModal from './components/modals/SalaryModal';
// import AttendanceCalendarModal from './components/modals/AttendanceCalendarModal';
// import ProjectsModal from './components/modals/ProjectsModal';
// import TasksModal from './components/modals/TasksModal';

// import './App.css';

// // Redux
// import { useDispatch } from "react-redux";
// import { applyLeave } from "./redux/slices/leaveSlice";

// function App() {
//   const dispatch = useDispatch();
//   const { currentUser, loading: authLoading, login, register, logout } = useAuth();
//   const { attendance, punchIn, punchOut } = useAttendance();
//   const { toast, showToast, hideToast } = useToast();
  
//   // Modal State
//   const [activeModal, setActiveModal] = useState(null);
//   const [showAttendanceCalendar, setShowAttendanceCalendar] = useState(false);
//   const [leaveLoading, setLeaveLoading] = useState(false);
//   const [githubLoading, setGithubLoading] = useState(false);
//   const [showTasks, setShowTasks] = useState(false);

//   // Auto close modal when user logs out
//   useEffect(() => {
//     if (!currentUser) {
//       setActiveModal(null);
//       setShowAttendanceCalendar(false);
//     }
//   }, [currentUser]);

//   // Handle Login
//   const handleLogin = async (email, password) => {
//     try {
//       if (!email || !password) {
//         showToast('❌ Please enter both email and password', 'error');
//         return;
//       }

//       const result = await login(email, password);
//       if (result && result.success) {
//         showToast('✅ Login successful! Welcome to Acore IT Hub', 'success');
//       } else {
//         showToast(result?.error || '❌ Login failed', 'error');
//       }
//     } catch (error) {
//       showToast('❌ Login failed. Please check your credentials.', 'error');
//     }
//   };

//   // Handle Register
//   const handleRegister = async (formData) => {
//     try {
//       console.log("📤 Original Form Data:", formData);
      
//       // ✅ Password match check
//       if (formData.password !== formData.confirmPassword) {
//         showToast('❌ Passwords do not match!', 'error');
//         return;
//       }

//       // ✅ Transform data to match backend schema
//       const dataToSend = {
//         name: formData.fullName,
//         email: formData.email,
//         mobile: formData.mobile,
//         birthday: formData.dob,
//         gender: formData.gender?.toLowerCase() || 'male',
//         address: formData.address,
        
//         emergencyContactName: formData.emergencyContactName || formData.fullName,
//         emergencyContactRelation: formData.emergencyContactRelation || "Self",
//         emergencyContactNumber: formData.emergencyContact,
        
//         designation: formData.designation,
//         department: formData.department,
//         dateOfJoining: formData.dateOfJoining,
//         employeeType: formData.employeeType?.toLowerCase().replace(" ", "-") || 'full-time',
//         githubUsername: formData.git || '',
        
//         password: formData.password,
        
//         aadhaarNumber: formData.aadharNumber || '',
//         panNumber: formData.panNumber || '',
//         accountNumber: formData.bankAccount || '',
//         bankName: formData.bankName || '',
//         ifscCode: formData.ifscCode || '',
        
//         bloodGroup: formData.bloodGroup || '',
//       };

//       console.log("🚀 Transformed Data for Backend:", JSON.stringify(dataToSend, null, 2));
      
//       const result = await register(dataToSend);
      
//       if (result && result.success) {
//         showToast('✅ Registration successful! Please login.', 'success');
//       } else {
//         const errorMsg = result?.error?.message || result?.error || 'Registration failed';
//         showToast(`❌ ${errorMsg}`, 'error');
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       showToast('❌ Registration failed. Please try again.', 'error');
//     }
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     Swal.fire({
//       title: "Logout?",
//       text: "Are you sure you want to logout?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Logout",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         logout();
//         showToast("👋 Logged out successfully!", "success");
//       }
//     });
//   };

//   // Handle Punch In/Out
//   // const handlePunch = async () => {
//   //   try {
//   //     if (attendance.isPunchedIn) {
//   //       const result = await punchOut();
//   //       if (result && result.success) {
//   //         showToast('✅ Punched out successfully!', 'success');
//   //       } else {
//   //         showToast('❌ Punch out failed', 'error');
//   //       }
//   //     } else {
//   //       const result = await punchIn();
//   //       if (result && result.success) {
//   //         showToast('✅ Punched in successfully!', 'success');
//   //       } else {
//   //         showToast('❌ Punch in failed', 'error');
//   //       }
//   //     }
//   //   } catch (error) {
//   //     console.error('Punch error:', error);
//   //     showToast('❌ Error processing attendance', 'error');
//   //   }
//   // };


//   // Handle Punch In/Out
// // const handlePunch = async (locationData) => {
// //   try {

// //     // ---------- Punch OUT ----------
// //     if (attendance.isPunchedIn) {
// //       const result = await punchOut();
// //       if (result && result.success) {
// //         showToast('✅ Punched out successfully!', 'success');
// //       } else {
// //         showToast(result?.message || '❌ Punch out failed', 'error');
// //       }
// //       return;
// //     }

// //     // ---------- Punch IN ----------
// //     // Ensure location exists
// //     if (
// //       !attendance?.location?.latitude ||
// //       !attendance?.location?.longitude
// //     ) {
// //       showToast("❌ Location not available. Please wait or restart app.", "error");
// //       return;
// //     }

// //     const result = await punchIn({
// //       employeeId: currentUser.employeeId,
// //       latitude: attendance.location.latitude,
// //       longitude: attendance.location.longitude,
// //       source: "electron"
// //     });

// //     if (result && result.success) {
// //       showToast('✅ Punched in successfully!', 'success');
// //     } else {
// //       showToast(result?.message || '❌ Punch in failed', 'error');
// //     }

// //   } catch (error) {
// //     console.error('Punch error:', error);
// //     showToast('❌ Error processing attendance', 'error');
// //   }
// // };


// // const handlePunch = async (locationData) => {
// //   try {

// //     // ---------- Punch OUT ----------
// //     if (attendance.isPunchedIn) {
// //       const result = await punchOut();
// //       if (result && result.success) {
// //         showToast('✅ Punched out successfully!', 'success');
// //       } else {
// //         showToast(result?.message || '❌ Punch out failed', 'error');
// //       }
// //       return;
// //     }

// //     // ---------- Punch IN ----------
// //     if (!locationData?.latitude || !locationData?.longitude) {
// //       showToast("❌ Location not available. Please check again.", "error");
// //       return;
// //     }

// //     const result = await punchIn({
// //       employeeId: currentUser.employeeId,
// //       latitude: locationData.latitude,
// //       longitude: locationData.longitude,
// //       source: locationData?.source || "electron"
// //     });

// //     if (result && result.success) {
// //       showToast('✅ Punched in successfully!', 'success');
// //     } else {
// //       showToast(result?.message || '❌ Punch in failed', 'error');
// //     }

// //   } catch (error) {
// //     console.error('Punch error:', error);
// //     showToast('❌ Error processing attendance', 'error');
// //   }
// // };


// // Handle Punch In/Out
// // const handlePunch = async (locationData) => {
// //   console.log("🔵 handlePunch called with:", locationData);
  
// //   try {
// //     // ---------- Punch OUT ----------
// //     if (attendance.isPunchedIn) {
// //       console.log("🟡 Punching OUT...");
// //       const result = await punchOut();
      
// //       if (result && result.success) {
// //         showToast('✅ Punched out successfully!', 'success');
// //       } else {
// //         const errorMsg = result?.message || result?.error || 'Punch out failed';
// //         console.error("❌ Punch Out Error:", errorMsg);
// //         showToast(`❌ ${errorMsg}`, 'error');
// //       }
// //       return;
// //     }

// //     // ---------- Punch IN ----------
// //     console.log("🟢 Punching IN...");
    
// //     // Validate location data
// //     if (!locationData?.latitude || !locationData?.longitude) {
// //       console.error("❌ Missing location data:", locationData);
// //       showToast("❌ Location not available. Please check location and try again.", "error");
// //       return;
// //     }

// //     console.log("📍 Location data validated:", {
// //       lat: locationData.latitude,
// //       lng: locationData.longitude,
// //       source: locationData.source,
// //       employeeId: currentUser?.employeeId
// //     });

// //     // First call local punchIn (for timer and state)
// //     const localResult = await punchIn(locationData);
    
// //     if (!localResult?.success) {
// //       console.error("❌ Local punchIn failed:", localResult);
// //       showToast(localResult?.error || '❌ Failed to start tracking', 'error');
// //       return;
// //     }

// //     console.log("✅ Local punchIn successful, calling API...");

// //     // Then call API punchIn via Redux
// //     try {
// //       const apiResult = await dispatch(punchIn({
// //         employeeId: currentUser.employeeId,
// //         latitude: locationData.latitude,
// //         longitude: locationData.longitude,
// //         source: locationData?.source || "electron"
// //       })).unwrap();

// //       console.log("✅ API punchIn result:", apiResult);
      
// //       if (apiResult?.status) {
// //         showToast('✅ Punched in successfully!', 'success');
// //       } else {
// //         showToast(apiResult?.message || '❌ Server punch-in failed', 'error');
// //       }
      
// //     } catch (apiError) {
// //       console.error("❌ API punchIn error:", apiError);
// //       showToast(apiError?.message || '❌ Server error during punch-in', 'error');
      
// //       // Rollback local punch-in if API fails
// //       await punchOut();
// //     }

// //   } catch (error) {
// //     console.error('🔥 handlePunch error:', error);
// //     showToast('❌ Error processing attendance', 'error');
// //   }
// // };

// // Handle Punch In/Out
// // const handlePunch = async (locationData) => {
// //   console.log("🔵 handlePunch called with:", locationData);
  
// //   try {
// //     // ---------- Punch OUT ----------
// //     if (attendance.isPunchedIn) {
// //       console.log("🟡 Punching OUT...");
// //       const result = await punchOut();
      
// //       if (result && result.success) {
// //         showToast('✅ Punched out successfully!', 'success');
// //       } else {
// //         const errorMsg = result?.message || result?.error || 'Punch out failed';
// //         console.error("❌ Punch Out Error:", errorMsg);
// //         showToast(`❌ ${errorMsg}`, 'error');
// //       }
// //       return;
// //     }

// //     // ---------- Punch IN ----------
// //     console.log("🟢 Punching IN...");
    
// //     // Validate location data
// //     if (!locationData?.latitude || !locationData?.longitude) {
// //       console.error("❌ Missing location data:", locationData);
// //       showToast("❌ Location not available. Please check location and try again.", "error");
// //       return;
// //     }

// //     console.log("📍 Location data validated:", {
// //       lat: locationData.latitude,
// //       lng: locationData.longitude,
// //       source: locationData.source,
// //       employeeId: currentUser?.employeeId
// //     });

// //     // First call local punchIn (for timer and state)
// //     const localResult = await punchIn(locationData);
    
// //     if (!localResult?.success) {
// //       console.error("❌ Local punchIn failed:", localResult);
// //       showToast(localResult?.error || '❌ Failed to start tracking', 'error');
// //       return;
// //     }

// //     console.log("✅ Local punchIn successful, calling API...");

// //     // Then call API punchIn via Redux
// //     try {
// //       const apiResult = await dispatch(punchIn({
// //         employeeId: currentUser.employeeId,
// //         latitude: locationData.latitude,
// //         longitude: locationData.longitude,
// //         source: locationData?.source || "electron"
// //       })).unwrap();

// //       console.log("✅ API punchIn result:", apiResult);
      
// //       if (apiResult?.status) {
// //         showToast('✅ Punched in successfully!', 'success');
// //       } else {
// //         showToast(apiResult?.message || '❌ Server punch-in failed', 'error');
// //       }
      
// //     } catch (apiError) {
// //       console.error("❌ API punchIn error:", apiError);
// //       showToast(apiError?.message || '❌ Server error during punch-in', 'error');
      
// //       // Rollback local punch-in if API fails
// //       await punchOut();
// //     }

// //   } catch (error) {
// //     console.error('🔥 handlePunch error:', error);
// //     showToast('❌ Error processing attendance', 'error');
// //   }
// // };



// // App.js में handlePunch function को पूरी तरह बदलें:

// // const handlePunch = async (locationData) => {
// //   console.log("🔵 handlePunch called with:", locationData);
  
// //   // Validate current user
// //   if (!currentUser || !currentUser.employeeId) {
// //     showToast("❌ User not authenticated", "error");
// //     return;
// //   }

// //   try {
// //     // ---------- PUNCH OUT ----------
// //     if (attendance.isPunchedIn) {
// //       console.log("🟡 Punching OUT...");
      
// //       // Step 1: Stop local timer
// //       const localResult = await punchOut();
      
// //       if (!localResult?.success) {
// //         showToast('❌ Failed to stop local tracking', 'error');
// //         return;
// //       }
      
// //       console.log("✅ Local timer stopped");

// //       // Step 2: Call API via Redux
// //       try {
// //         console.log("📡 Calling punch-out API...");
// //         const result = await dispatch(punchOut({ employeeId: currentUser.employeeId })).unwrap();
        
// //         if (result?.status) {
// //           showToast('✅ Punched out successfully!', 'success');
// //         } else {
// //           showToast(result?.message || '❌ Punch out failed', 'error');
// //         }
// //       } catch (apiError) {
// //         console.error("❌ Punch-out API error:", apiError);
// //         showToast(apiError?.message || '❌ Server error', 'error');
// //       }
      
// //       return;
// //     }

// //     // ---------- PUNCH IN ----------
// //     console.log("🟢 Punching IN...");
    
// //     // Validate location data
// //     if (!locationData?.latitude || !locationData?.longitude) {
// //       showToast("❌ Location not available. Please check location.", "error");
// //       return;
// //     }

// //     console.log("📍 Location validated:", {
// //       lat: locationData.latitude,
// //       lng: locationData.longitude,
// //       source: locationData.source,
// //       employeeId: currentUser.employeeId
// //     });

// //     // 🔥 CRITICAL FIX: CORRECT SEQUENCE
    
// //     // STEP 1: FIRST start LOCAL timer (from useAttendance hook)
// //     console.log("1️⃣ Starting local timer...");
// //     const localPunchResult = await punchIn({
// //       latitude: locationData.latitude,
// //       longitude: locationData.longitude,
// //       source: locationData.source
// //     });
    
// //     if (!localPunchResult?.success) {
// //       console.error("❌ Local punchIn failed:", localPunchResult);
// //       showToast(localPunchResult?.error || '❌ Failed to start tracking', 'error');
// //       return;
// //     }
    
// //     console.log("✅ Local timer started");

// //     // STEP 2: THEN call REDUX API (server-side punch-in)
// //     console.log("2️⃣ Calling Redux API...");
// //     try {
// //       // This is the Redux thunk from attendanceSlice.js
// //       const apiResult = await dispatch(
// //         punchIn({
// //           employeeId: currentUser.employeeId,
// //           latitude: locationData.latitude,
// //           longitude: locationData.longitude,
// //           source: locationData?.source || "electron"
// //         })
// //       ).unwrap();
      
// //       console.log("✅ API response:", apiResult);
      
// //       if (apiResult?.status) {
// //         showToast('✅ Punched in successfully!', 'success');
// //       } else {
// //         // If server fails, rollback local punch
// //         showToast(apiResult?.message || '❌ Server punch-in failed', 'error');
// //         await punchOut(); // Rollback local timer
// //       }
      
// //     } catch (apiError) {
// //       console.error("❌ API call error:", apiError);
// //       showToast(apiError?.message || '❌ Server connection failed', 'error');
      
// //       // Rollback local punch if API fails
// //       await punchOut(); // Stop the local timer
// //     }

// //   } catch (error) {
// //     console.error('🔥 Unexpected error:', error);
// //     showToast('❌ Error processing attendance', 'error');
// //   }
// // };

// // App.js में handlePunch function (PRODUCTION READY):

// const handlePunch = async (locationData) => {
//   console.group('🎯 Attendance Punch Process');
//   console.log('Phase 1: Validation');
  
//   // ========== PHASE 1: VALIDATION ==========
//   if (!currentUser?.employeeId) {
//     console.error('❌ Validation failed: No authenticated user');
//     showToast('Please login to continue', 'error');
//     console.groupEnd();
//     return;
//   }

//   if (!locationData?.latitude || !locationData?.longitude) {
//     console.error('❌ Validation failed: Invalid location data');
//     showToast('Location verification required', 'error');
//     console.groupEnd();
//     return;
//   }

//   console.log('✅ Validation passed:', {
//     employeeId: currentUser.employeeId,
//     locationAvailable: true,
//     isPunchedIn: attendance.isPunchedIn
//   });

//   try {
//     // ========== PUNCH OUT FLOW ==========
//     if (attendance.isPunchedIn) {
//       console.log('Phase 2: Punch Out Flow');
      
//       // Step 1: Show loading
//       showToast('Processing punch out...', 'info');
      
//       // Step 2: Stop local timer
//       console.log('Step 1: Stopping local timer');
//       const localStopResult = await punchOut();
      
//       if (!localStopResult?.success) {
//         console.error('❌ Local timer stop failed');
//         showToast('Failed to stop tracking', 'error');
//         console.groupEnd();
//         return;
//       }
      
//       console.log('✅ Local timer stopped');
      
//       // Step 3: Send to server
//       console.log('Step 2: Sending to server');
//       try {
//         const apiResponse = await axios.post(
//           '/api/attendance/mark-out',
//           { employeeId: currentUser.employeeId },
//           {
//             headers: {
//               'Authorization': `Bearer ${localStorage.getItem('token')}`,
//               'Content-Type': 'application/json'
//             },
//             timeout: 10000 // 10 second timeout
//           }
//         );
        
//         if (apiResponse.data?.status) {
//           console.log('✅ Server punch-out recorded');
//           showToast('Punched out successfully!', 'success');
          
//           // Update Redux state
//           dispatch(setPunchStatus({
//             isPunchedIn: false,
//             totalHours: localStopResult.totalHours || 0
//           }));
//         } else {
//           console.warn('⚠️ Server returned non-success status');
//           showToast(apiResponse.data?.message || 'Punch out completed locally', 'warning');
//         }
        
//       } catch (serverError) {
//         console.error('❌ Server sync failed:', {
//           message: serverError.message,
//           status: serverError.response?.status,
//           data: serverError.response?.data
//         });
        
//         // Offline mode: Still successful locally
//         showToast('Punched out (offline mode)', 'info');
        
//         // Store for later sync
//         storeOfflinePunch({
//           type: 'punch-out',
//           employeeId: currentUser.employeeId,
//           timestamp: new Date().toISOString(),
//           localHours: localStopResult.totalHours
//         });
//       }
      
//       console.groupEnd();
//       return;
//     }

//     // ========== PUNCH IN FLOW ==========
//     console.log('Phase 2: Punch In Flow');
    
//     // Check if already punched in today (prevent duplicates)
//     try {
//       const todayCheck = await axios.get(
//         `/api/attendance/today/${currentUser.employeeId}`,
//         { timeout: 5000 }
//       );
      
//       if (todayCheck.data?.data?.inTime && !todayCheck.data?.data?.outTime) {
//         console.warn('⚠️ User already punched in today');
//         showToast('Already punched in for today', 'warning');
//         console.groupEnd();
//         return;
//       }
//     } catch (checkError) {
//       console.log('ℹ️ Today check skipped:', checkError.message);
//     }

//     // Step 1: Start local timer
//     console.log('Step 1: Starting local timer and Electron tracking');
//     showToast('Starting work tracking...', 'info');
    
//     const localStartResult = await punchIn(locationData);
    
//     if (!localStartResult?.success) {
//       console.error('❌ Local timer start failed');
//       showToast('Failed to start tracking', 'error');
//       console.groupEnd();
//       return;
//     }
    
//     console.log('✅ Local timer started');
//     showToast('Work tracking started!', 'success');
    
//     // Step 2: Record on server (with retry logic)
//     console.log('Step 2: Recording on server');
    
//     const punchRecord = {
//       employeeId: currentUser.employeeId,
//       latitude: locationData.latitude,
//       longitude: locationData.longitude,
//       source: locationData?.source || 'electron',
//       accuracy: locationData.accuracy,
//       timestamp: new Date().toISOString()
//     };
    
//     // Try immediate server sync
//     let serverSyncSuccess = false;
    
//     try {
//       const apiResponse = await axios.post(
//         '/api/attendance/mark-in',
//         punchRecord,
//         {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'application/json'
//           },
//           timeout: 15000 // 15 second timeout for punch-in
//         }
//       );
      
//       if (apiResponse.data?.status) {
//         serverSyncSuccess = true;
//         console.log('✅ Server punch-in recorded:', apiResponse.data);
        
//         // Update Redux state
//         dispatch(setPunchStatus({
//           isPunchedIn: true,
//           lastPunchTime: new Date().toISOString(),
//           location: {
//             latitude: locationData.latitude,
//             longitude: locationData.longitude
//           }
//         }));
        
//       } else {
//         console.warn('⚠️ Server validation failed:', apiResponse.data);
//         showToast(apiResponse.data?.message || 'Server validation failed', 'warning');
//       }
      
//     } catch (serverError) {
//       console.error('❌ Server sync failed:', {
//         message: serverError.message,
//         status: serverError.response?.status
//       });
      
//       // Store for background retry
//       storeForRetry({
//         type: 'punch-in',
//         data: punchRecord,
//         attempt: 1,
//         maxAttempts: 3,
//         nextRetry: Date.now() + 30000 // 30 seconds
//       });
      
//       showToast('Working offline - will sync when possible', 'info');
//     }
    
//     // Step 3: Start background sync if needed
//     if (!serverSyncSuccess) {
//       startBackgroundSync();
//     }
    
//     console.log('Phase 3: Process completed');
//     console.log('✅ Punch process completed successfully');
    
//   } catch (error) {
//     console.error('🔥 CRITICAL ERROR in punch process:', error);
//     showToast('System error - please contact support', 'error');
    
//     // Log error for monitoring
//     logError({
//       type: 'ATTENDANCE_PUNCH_ERROR',
//       error: error.message,
//       stack: error.stack,
//       userId: currentUser?.employeeId,
//       timestamp: new Date().toISOString()
//     });
//   } finally {
//     console.groupEnd();
//   }
// };

//   // Handle Leave Application
//   const handleLeaveSubmit = async (formData) => {
//     setLeaveLoading(true);

//     try {
//       if (!currentUser || !currentUser.employeeId) {
//         showToast("❌ Employee not found. Please login again.", "error");
//         return;
//       }

//       console.log("📝 Submitting leave with:", formData);

//       const result = await dispatch(
//         applyLeave({
//           formData,
//           employeeId: currentUser.employeeId,
//           employeeName: currentUser.name,
//         })
//       ).unwrap();

//       console.log("✅ Leave Result:", result);
//       showToast("✅ Leave application submitted successfully!", "success");
//       setActiveModal(null);

//     } catch (error) {
//       console.error("❌ Leave Error:", error);
      
//       let errorMessage = "❌ Failed to submit leave application";
      
//       if (typeof error === 'string') {
//         if (error.includes("holiday")) {
//           errorMessage = error;
//         } else if (error.includes("already applied")) {
//           errorMessage = error;
//         }
//       } else if (error?.message) {
//         errorMessage = error.message;
//       }
      
//       showToast(errorMessage, "error");
//     } finally {
//       setLeaveLoading(false);
//     }
//   };

//   // Handle GitHub Push
//   const handleGithubPush = async (formData) => {
//     setGithubLoading(true);
    
//     try {
//       if (!formData.repository || !formData.commitMessage) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Code pushed to GitHub successfully!', 'success');
//     } catch (error) {
//       showToast('❌ Failed to push code to GitHub', 'error');
//     } finally {
//       setGithubLoading(false);
//     }
//   };

//   // Open Modal function
//   const openModal = (modalName) => {
//     if (modalName === 'attendance-calendar') {
//       setShowAttendanceCalendar(true);
//     } else if (modalName === 'attendance') {
//       setActiveModal('attendance');
//     } else if (modalName === 'projects') {
//       setActiveModal('projects');
//     } else if (modalName === 'tasks') {
//       setActiveModal('tasks');
//     } else {
//       setActiveModal(modalName);
//     }
//   };

//   // Close Modal function
//   const closeModal = () => {
//     setActiveModal(null);
//     setShowAttendanceCalendar(false);
//   };

//   // Render Login Page if not authenticated
//   if (!currentUser) {
//     return (
//       <>
//         <Login 
//           onLogin={handleLogin} 
//           onRegister={handleRegister}
//           loading={authLoading}
//           registerLoading={false}
//         />
//         <Toast toast={toast} onClose={hideToast} />
//       </>
//     );
//   }

//   // Main Dashboard
//   return (
//     <div className="app">
//       <div className="app-container">
//         <Header
//           currentUser={currentUser}
//           onProfileClick={() => openModal('profile')}
//           onLogout={handleLogout}
//           onCardClick={openModal}
//           attendanceStatus={attendance}
//         />

//         {/* ✅ DASHBOARD */}
//         <div className="dashboard-wrapper">
//           <Dashboard currentUser={currentUser} />
//         </div>

//         {/* ✅ SLIDERS */}
//         <AnnouncementSlider />
//         <BirthdaySlider />
//         <EmployeeSlider/>

//         {/* ✅ MODALS */}
//         <AttendanceModal
//           isOpen={activeModal === 'attendance'}
//           onClose={closeModal}
//           attendance={attendance || {
//             isPunchedIn: false,
//             workingHours: 0,
//             workingTime: "0h 0m",
//             canLogout: false,
//             loading: false,
//             isIdle: false,
//             currentApp: "None"
//           }}
//           onPunch={handlePunch}
//         />

//         <ProjectsModal
//           isOpen={activeModal === 'projects'}
//           onClose={closeModal}
//           currentUser={currentUser}
//           onCardClick={openModal}
//         />

//         <TasksModal
//           isOpen={activeModal === 'tasks'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <AttendanceCalendarModal
//           isOpen={showAttendanceCalendar}
//           onClose={closeModal}
//           empId={currentUser?.employeeId}
//         />

//         <LeaveModal
//           isOpen={activeModal === 'leave'}
//           onClose={closeModal}
//           onLeaveSubmit={handleLeaveSubmit}
//           loading={leaveLoading}
//         />

//         <BirthdayModal
//           isOpen={activeModal === 'birthday'}
//           onClose={closeModal}
//         />

//         <ProfileModal
//           isOpen={activeModal === 'profile'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <CalendarModal
//           isOpen={activeModal === 'calendar'}
//           onClose={closeModal}
//         />

//         <GithubModal
//           isOpen={activeModal === 'github'}
//           onClose={closeModal}
//           onPushCode={handleGithubPush}
//           loading={githubLoading}
//         />

//         <SalaryModal
//           isOpen={activeModal === 'salary'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <Toast toast={toast} onClose={hideToast} />
//       </div>
//     </div>
//   );
// }

// export default App;







// aadding sync 


// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { useAuth } from './hooks/useAuth';
// import useAttendance from './hooks/useAttendance';
// import { useToast } from './hooks/useToast';
// import Swal from "sweetalert2";

// // Components
// import Login from './components/auth/Login';
// import Header from './components/common/Header';
// import Toast from './components/common/Toast';
// import AnnouncementSlider from './components/dashboard/AnnouncementSlider';
// import BirthdaySlider from './components/dashboard/BirthdaySlider';
// import EmployeeSlider from './components/dashboard/EmployeeSlider';
// import Dashboard from './components/dashboard/Dashboard';

// // Modals
// import AttendanceModal from './components/modals/AttendanceModal';
// import LeaveModal from './components/modals/LeaveModal';
// import BirthdayModal from './components/modals/BirthdayModal';
// import ProfileModal from './components/modals/ProfileModal';
// import CalendarModal from './components/modals/CalendarModal';
// import GithubModal from './components/modals/GithubModal';
// import SalaryModal from './components/modals/SalaryModal';
// import AttendanceCalendarModal from './components/modals/AttendanceCalendarModal';
// import ProjectsModal from './components/modals/ProjectsModal';
// import TasksModal from './components/modals/TasksModal';

// import './App.css';

// // Redux
// import { useDispatch } from "react-redux";
// import { applyLeave } from "./redux/slices/leaveSlice";
// import { setPunchStatus } from "./redux/slices/attendanceSlice";

// // Sync Manager
// import { attendanceSync } from './utils/attendanceSync';

// function App() {
//   const dispatch = useDispatch();
//   const { currentUser, loading: authLoading, login, register, logout } = useAuth();
//   const { attendance, punchIn, punchOut } = useAttendance();
//   const { toast, showToast, hideToast } = useToast();
  
//   // Modal State
//   const [activeModal, setActiveModal] = useState(null);
//   const [showAttendanceCalendar, setShowAttendanceCalendar] = useState(false);
//   const [leaveLoading, setLeaveLoading] = useState(false);
//   const [githubLoading, setGithubLoading] = useState(false);
//   const [showTasks, setShowTasks] = useState(false);
  
//   // Sync State
//   const [isOnline, setIsOnline] = useState(navigator.onLine);
//   const [pendingSyncs, setPendingSyncs] = useState(0);
//   const syncIntervalRef = useRef(null);

//   // Auto close modal when user logs out
//   useEffect(() => {
//     if (!currentUser) {
//       setActiveModal(null);
//       setShowAttendanceCalendar(false);
//     }
//   }, [currentUser]);

//   // Network status monitoring
//   useEffect(() => {
//     const handleOnline = () => {
//       setIsOnline(true);
//       console.log('🌐 Device came online');
//       showToast('Connection restored', 'success');
//       // Trigger sync when online
//       attendanceSync.processRetryQueue();
//     };

//     const handleOffline = () => {
//       setIsOnline(false);
//       console.log('📴 Device went offline');
//       showToast('Working offline - sync when connected', 'warning');
//     };

//     // Update pending syncs count
//     const updatePendingSyncs = () => {
//       setPendingSyncs(attendanceSync.getQueueLength());
//     };

//     window.addEventListener('online', handleOnline);
//     window.addEventListener('offline', handleOffline);
    
//     // Listen for sync queue changes
//     const interval = setInterval(updatePendingSyncs, 5000);
//     syncIntervalRef.current = interval;

//     // Initial load
//     updatePendingSyncs();

//     return () => {
//       window.removeEventListener('online', handleOnline);
//       window.removeEventListener('offline', handleOffline);
//       if (syncIntervalRef.current) {
//         clearInterval(syncIntervalRef.current);
//       }
//     };
//   }, [showToast]);

//   // Handle Login
//   const handleLogin = async (email, password) => {
//     try {
//       if (!email || !password) {
//         showToast('❌ Please enter both email and password', 'error');
//         return;
//       }

//       const result = await login(email, password);
//       if (result && result.success) {
//         showToast('✅ Login successful! Welcome to Acore IT Hub', 'success');
//         // After login, check for pending syncs
//         setTimeout(() => {
//           if (attendanceSync.getQueueLength() > 0) {
//             showToast(`${attendanceSync.getQueueLength()} pending syncs found`, 'info');
//             attendanceSync.processRetryQueue();
//           }
//         }, 2000);
//       } else {
//         showToast(result?.error || '❌ Login failed', 'error');
//       }
//     } catch (error) {
//       showToast('❌ Login failed. Please check your credentials.', 'error');
//     }
//   };

//   // Handle Register
//   const handleRegister = async (formData) => {
//     try {
//       console.log("📤 Original Form Data:", formData);
      
//       // ✅ Password match check
//       if (formData.password !== formData.confirmPassword) {
//         showToast('❌ Passwords do not match!', 'error');
//         return;
//       }

//       // ✅ Transform data to match backend schema
//       const dataToSend = {
//         name: formData.fullName,
//         email: formData.email,
//         mobile: formData.mobile,
//         birthday: formData.dob,
//         gender: formData.gender?.toLowerCase() || 'male',
//         address: formData.address,
        
//         emergencyContactName: formData.emergencyContactName || formData.fullName,
//         emergencyContactRelation: formData.emergencyContactRelation || "Self",
//         emergencyContactNumber: formData.emergencyContact,
        
//         designation: formData.designation,
//         department: formData.department,
//         dateOfJoining: formData.dateOfJoining,
//         employeeType: formData.employeeType?.toLowerCase().replace(" ", "-") || 'full-time',
//         githubUsername: formData.git || '',
        
//         password: formData.password,
        
//         aadhaarNumber: formData.aadharNumber || '',
//         panNumber: formData.panNumber || '',
//         accountNumber: formData.bankAccount || '',
//         bankName: formData.bankName || '',
//         ifscCode: formData.ifscCode || '',
        
//         bloodGroup: formData.bloodGroup || '',
//       };

//       console.log("🚀 Transformed Data for Backend:", JSON.stringify(dataToSend, null, 2));
      
//       const result = await register(dataToSend);
      
//       if (result && result.success) {
//         showToast('✅ Registration successful! Please login.', 'success');
//       } else {
//         const errorMsg = result?.error?.message || result?.error || 'Registration failed';
//         showToast(`❌ ${errorMsg}`, 'error');
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       showToast('❌ Registration failed. Please try again.', 'error');
//     }
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     Swal.fire({
//       title: "Logout?",
//       text: "Are you sure you want to logout?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Logout",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // Process any pending syncs before logout
//         if (attendanceSync.getQueueLength() > 0) {
//           showToast(`Processing ${attendanceSync.getQueueLength()} pending syncs...`, 'info');
//           attendanceSync.processRetryQueue();
//         }
        
//         logout();
//         showToast("👋 Logged out successfully!", "success");
//       }
//     });
//   };

//   // ========== PRODUCTION-READY HANDLE PUNCH FUNCTION ==========
//   const handlePunch = async (locationData) => {
//     console.group('🎯 Attendance Punch Process');
    
//     try {
//       // ========== PHASE 1: VALIDATION ==========
//       console.log('Phase 1: Validation');
      
//       if (!currentUser?.employeeId) {
//         showToast('Please login to continue', 'error');
//         console.error('❌ Validation failed: No authenticated user');
//         console.groupEnd();
//         return;
//       }

//       if (!locationData?.latitude || !locationData?.longitude) {
//         showToast('Location verification required', 'error');
//         console.error('❌ Validation failed: Invalid location data');
//         console.groupEnd();
//         return;
//       }

//       console.log('✅ Validation passed:', {
//         employeeId: currentUser.employeeId,
//         locationAvailable: true,
//         isPunchedIn: attendance.isPunchedIn
//       });

//       // ========== PUNCH OUT FLOW ==========
//       if (attendance.isPunchedIn) {
//         console.log('Phase 2: Punch Out Flow');
        
//         // Step 1: Show loading
//         showToast('Processing punch out...', 'info');
        
//         // Step 2: Stop local timer
//         console.log('Step 1: Stopping local timer');
//         const localStopResult = await punchOut();
        
//         if (!localStopResult?.success) {
//           showToast('Failed to stop tracking', 'error');
//           console.error('❌ Local timer stop failed');
//           console.groupEnd();
//           return;
//         }
        
//         console.log('✅ Local timer stopped');
        
//         // Step 3: Prepare punch-out data
//         const punchOutData = {
//           employeeId: currentUser.employeeId,
//           timestamp: new Date().toISOString(),
//           totalHours: localStopResult.totalHours || 0
//         };
        
//         // Step 4: Try to sync with server
//         console.log('Step 2: Attempting server sync');
        
//         if (isOnline) {
//           try {
//             const apiResponse = await axios.post(
//               '/api/attendance/mark-out',
//               { employeeId: currentUser.employeeId },
//               {
//                 headers: {
//                   'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                   'Content-Type': 'application/json'
//                 },
//                 timeout: 10000
//               }
//             );
            
//             if (apiResponse.data?.status) {
//               console.log('✅ Server punch-out recorded');
//               showToast('Punched out successfully!', 'success');
              
//               // Update Redux state
//               dispatch(setPunchStatus({
//                 isPunchedIn: false,
//                 totalHours: localStopResult.totalHours || 0
//               }));
//             } else {
//               console.warn('⚠️ Server validation failed:', apiResponse.data);
//               showToast(apiResponse.data?.message || 'Punch out completed locally', 'warning');
//             }
            
//           } catch (serverError) {
//             console.error('❌ Server sync failed, storing for retry:', {
//               message: serverError.message,
//               status: serverError.response?.status
//             });
            
//             // Store for offline retry
//             attendanceSync.storeForRetry({
//               type: 'punch-out',
//               data: { employeeId: currentUser.employeeId },
//               attempts: 0
//             });
            
//             showToast('Punched out (offline mode)', 'info');
//             setPendingSyncs(prev => prev + 1);
//           }
//         } else {
//           // Offline mode - store for later sync
//           console.log('📴 Device offline, storing punch-out for later');
//           attendanceSync.storeForRetry({
//             type: 'punch-out',
//             data: { employeeId: currentUser.employeeId },
//             attempts: 0
//           });
          
//           showToast('Punched out - will sync when online', 'info');
//           setPendingSyncs(prev => prev + 1);
//         }
        
//         console.groupEnd();
//         return;
//       }

//       // ========== PUNCH IN FLOW ==========
//       console.log('Phase 2: Punch In Flow');
      
//       // Optional: Check if already punched in today (prevent duplicates)
//       if (isOnline) {
//         try {
//           const todayCheck = await axios.get(
//             `/api/attendance/today/${currentUser.employeeId}`,
//             { 
//               headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
//               timeout: 5000 
//             }
//           );
          
//           if (todayCheck.data?.data?.inTime && !todayCheck.data?.data?.outTime) {
//             console.warn('⚠️ User already punched in today');
//             showToast('Already punched in for today', 'warning');
//             console.groupEnd();
//             return;
//           }
//         } catch (checkError) {
//           console.log('ℹ️ Today check skipped:', checkError.message);
//         }
//       }

//       // Step 1: Start local timer
//       console.log('Step 1: Starting local timer and Electron tracking');
//       showToast('Starting work tracking...', 'info');
      
//       const localStartResult = await punchIn(locationData);
      
//       if (!localStartResult?.success) {
//         showToast('Failed to start tracking', 'error');
//         console.error('❌ Local timer start failed');
//         console.groupEnd();
//         return;
//       }
      
//       console.log('✅ Local timer started');
//       showToast('Work tracking started!', 'success');
      
//       // Step 2: Prepare punch-in data
//       const punchRecord = {
//         employeeId: currentUser.employeeId,
//         latitude: locationData.latitude,
//         longitude: locationData.longitude,
//         source: locationData?.source || 'electron',
//         accuracy: locationData.accuracy || 50,
//         timestamp: new Date().toISOString()
//       };
      
//       // Step 3: Try to sync with server
//       console.log('Step 2: Attempting server sync');
      
//       if (isOnline) {
//         try {
//           const apiResponse = await axios.post(
//             '/api/attendance/mark-in',
//             punchRecord,
//             {
//               headers: {
//                 'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                 'Content-Type': 'application/json'
//               },
//               timeout: 15000
//             }
//           );
          
//           if (apiResponse.data?.status) {
//             console.log('✅ Server punch-in recorded:', apiResponse.data);
            
//             // Update Redux state
//             dispatch(setPunchStatus({
//               isPunchedIn: true,
//               lastPunchTime: new Date().toISOString(),
//               location: {
//                 latitude: locationData.latitude,
//                 longitude: locationData.longitude
//               }
//             }));
            
//           } else {
//             console.warn('⚠️ Server validation failed:', apiResponse.data);
//             showToast(apiResponse.data?.message || 'Server validation failed', 'warning');
//           }
          
//         } catch (serverError) {
//           console.error('❌ Server sync failed, storing for retry:', {
//             message: serverError.message,
//             status: serverError.response?.status
//           });
          
//           // Store for offline retry
//           attendanceSync.storeForRetry({
//             type: 'punch-in',
//             data: punchRecord,
//             attempts: 0
//           });
          
//           showToast('Working offline - will sync when possible', 'info');
//           setPendingSyncs(prev => prev + 1);
//         }
//       } else {
//         // Offline mode - store for later sync
//         console.log('📴 Device offline, storing punch-in for later');
//         attendanceSync.storeForRetry({
//           type: 'punch-in',
//           data: punchRecord,
//           attempts: 0
//         });
        
//         showToast('Working offline - will sync when online', 'info');
//         setPendingSyncs(prev => prev + 1);
//       }
      
//       console.log('Phase 3: Process completed');
//       console.log('✅ Punch process completed successfully');
      
//     } catch (error) {
//       console.error('🔥 CRITICAL ERROR in punch process:', error);
//       showToast('System error - please contact support', 'error');
      
//       // Log error
//       logError({
//         type: 'ATTENDANCE_PUNCH_ERROR',
//         error: error.message,
//         userId: currentUser?.employeeId,
//         timestamp: new Date().toISOString()
//       });
//     } finally {
//       console.groupEnd();
//     }
//   };

//   // Handle Leave Application
//   const handleLeaveSubmit = async (formData) => {
//     setLeaveLoading(true);

//     try {
//       if (!currentUser || !currentUser.employeeId) {
//         showToast("❌ Employee not found. Please login again.", "error");
//         return;
//       }

//       console.log("📝 Submitting leave with:", formData);

//       const result = await dispatch(
//         applyLeave({
//           formData,
//           employeeId: currentUser.employeeId,
//           employeeName: currentUser.name,
//         })
//       ).unwrap();

//       console.log("✅ Leave Result:", result);
//       showToast("✅ Leave application submitted successfully!", "success");
//       setActiveModal(null);

//     } catch (error) {
//       console.error("❌ Leave Error:", error);
      
//       let errorMessage = "❌ Failed to submit leave application";
      
//       if (typeof error === 'string') {
//         if (error.includes("holiday")) {
//           errorMessage = error;
//         } else if (error.includes("already applied")) {
//           errorMessage = error;
//         }
//       } else if (error?.message) {
//         errorMessage = error.message;
//       }
      
//       showToast(errorMessage, "error");
//     } finally {
//       setLeaveLoading(false);
//     }
//   };

//   // Handle GitHub Push
//   const handleGithubPush = async (formData) => {
//     setGithubLoading(true);
    
//     try {
//       if (!formData.repository || !formData.commitMessage) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Code pushed to GitHub successfully!', 'success');
//     } catch (error) {
//       showToast('❌ Failed to push code to GitHub', 'error');
//     } finally {
//       setGithubLoading(false);
//     }
//   };

//   // Manual sync function
//   const handleManualSync = async () => {
//     if (!isOnline) {
//       showToast('No internet connection', 'error');
//       return;
//     }

//     if (pendingSyncs === 0) {
//       showToast('No pending syncs', 'info');
//       return;
//     }

//     showToast(`Syncing ${pendingSyncs} pending records...`, 'info');
    
//     try {
//       const result = await attendanceSync.processRetryQueue();
//       setPendingSyncs(attendanceSync.getQueueLength());
      
//       if (pendingSyncs === 0) {
//         showToast('All records synced successfully!', 'success');
//       } else {
//         showToast(`${pendingSyncs} records still pending`, 'warning');
//       }
//     } catch (error) {
//       console.error('Manual sync error:', error);
//       showToast('Sync failed', 'error');
//     }
//   };

//   // Open Modal function
//   const openModal = (modalName) => {
//     if (modalName === 'attendance-calendar') {
//       setShowAttendanceCalendar(true);
//     } else if (modalName === 'attendance') {
//       setActiveModal('attendance');
//     } else if (modalName === 'projects') {
//       setActiveModal('projects');
//     } else if (modalName === 'tasks') {
//       setActiveModal('tasks');
//     } else {
//       setActiveModal(modalName);
//     }
//   };

//   // Close Modal function
//   const closeModal = () => {
//     setActiveModal(null);
//     setShowAttendanceCalendar(false);
//   };

//   // Error logging utility
//   const logError = (errorData) => {
//     console.error('🚨 ERROR LOG:', errorData);
    
//     // Store in localStorage for debugging
//     try {
//       const errors = JSON.parse(localStorage.getItem('app_errors') || '[]');
//       errors.push({
//         ...errorData,
//         timestamp: new Date().toISOString()
//       });
      
//       // Keep only last 50 errors
//       if (errors.length > 50) {
//         errors.shift();
//       }
      
//       localStorage.setItem('app_errors', JSON.stringify(errors));
//     } catch (e) {
//       console.error('Failed to log error:', e);
//     }
//   };

//   // Render Login Page if not authenticated
//   if (!currentUser) {
//     return (
//       <>
//         <Login 
//           onLogin={handleLogin} 
//           onRegister={handleRegister}
//           loading={authLoading}
//           registerLoading={false}
//         />
//         <Toast toast={toast} onClose={hideToast} />
//       </>
//     );
//   }

//   // Main Dashboard
//   return (
//     <div className="app">
//       <div className="app-container">
//         <Header
//           currentUser={currentUser}
//           onProfileClick={() => openModal('profile')}
//           onLogout={handleLogout}
//           onCardClick={openModal}
//           attendanceStatus={attendance}
//           pendingSyncs={pendingSyncs}
//           isOnline={isOnline}
//           onManualSync={handleManualSync}
//         />

//         {/* ✅ DASHBOARD */}
//         <div className="dashboard-wrapper">
//           <Dashboard currentUser={currentUser} />
//         </div>

//         {/* ✅ SLIDERS */}
//         <AnnouncementSlider />
//         <BirthdaySlider />
//         <EmployeeSlider/>

//         {/* ✅ MODALS */}
//         <AttendanceModal
//           isOpen={activeModal === 'attendance'}
//           onClose={closeModal}
//           attendance={attendance || {
//             isPunchedIn: false,
//             workingHours: 0,
//             workingTime: "0h 0m",
//             canLogout: false,
//             loading: false,
//             isIdle: false,
//             currentApp: "None"
//           }}
//           onPunch={handlePunch}
//           pendingSyncs={pendingSyncs}
//           isOnline={isOnline}
//         />

//         <ProjectsModal
//           isOpen={activeModal === 'projects'}
//           onClose={closeModal}
//           currentUser={currentUser}
//           onCardClick={openModal}
//         />

//         <TasksModal
//           isOpen={activeModal === 'tasks'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <AttendanceCalendarModal
//           isOpen={showAttendanceCalendar}
//           onClose={closeModal}
//           empId={currentUser?.employeeId}
//         />

//         <LeaveModal
//           isOpen={activeModal === 'leave'}
//           onClose={closeModal}
//           onLeaveSubmit={handleLeaveSubmit}
//           loading={leaveLoading}
//         />

//         <BirthdayModal
//           isOpen={activeModal === 'birthday'}
//           onClose={closeModal}
//         />

//         <ProfileModal
//           isOpen={activeModal === 'profile'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <CalendarModal
//           isOpen={activeModal === 'calendar'}
//           onClose={closeModal}
//         />

//         <GithubModal
//           isOpen={activeModal === 'github'}
//           onClose={closeModal}
//           onPushCode={handleGithubPush}
//           loading={githubLoading}
//         />

//         <SalaryModal
//           isOpen={activeModal === 'salary'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <Toast toast={toast} onClose={hideToast} />
//       </div>
//     </div>
//   );
// }

// export default App;




// niche vale ko update kiya he timer restart problem 



// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { useAuth } from './hooks/useAuth';
// import useAttendance from './hooks/useAttendance';
// import { useToast } from './hooks/useToast';
// import Swal from "sweetalert2";

// // Components
// import Login from './components/auth/Login';
// import Header from './components/common/Header';
// import Toast from './components/common/Toast';
// import AnnouncementSlider from './components/dashboard/AnnouncementSlider';
// import BirthdaySlider from './components/dashboard/BirthdaySlider';
// import EmployeeSlider from './components/dashboard/EmployeeSlider';
// import Dashboard from './components/dashboard/Dashboard';

// // Modals
// import AttendanceModal from './components/modals/AttendanceModal';
// import LeaveModal from './components/modals/LeaveModal';
// import BirthdayModal from './components/modals/BirthdayModal';
// import ProfileModal from './components/modals/ProfileModal';
// import CalendarModal from './components/modals/CalendarModal';
// import GithubModal from './components/modals/GithubModal';
// import SalaryModal from './components/modals/SalaryModal';
// import AttendanceCalendarModal from './components/modals/AttendanceCalendarModal';
// import ProjectsModal from './components/modals/ProjectsModal';
// import TasksModal from './components/modals/TasksModal';

// import './App.css';

// // Redux
// import { useDispatch } from "react-redux";
// import { applyLeave } from "./redux/slices/leaveSlice";
// import { setPunchStatus } from "./redux/slices/attendanceSlice";

// // Sync Manager
// import { attendanceSync } from './utils/attendanceSync';

// function App() {
//   const dispatch = useDispatch();
//   const { currentUser, loading: authLoading, login, register, logout } = useAuth();
//   const { attendance, punchIn, punchOut } = useAttendance();
//   const { toast, showToast, hideToast } = useToast();
  
//   // Modal State
//   const [activeModal, setActiveModal] = useState(null);
//   const [showAttendanceCalendar, setShowAttendanceCalendar] = useState(false);
//   const [leaveLoading, setLeaveLoading] = useState(false);
//   const [githubLoading, setGithubLoading] = useState(false);
//   const [showTasks, setShowTasks] = useState(false);
  
//   // Network & Sync State
//   const [networkStatus, setNetworkStatus] = useState({
//     isOnline: navigator.onLine,
//     lastChecked: null,
//     connectionType: 'unknown'
//   });
  
//   const [pendingSyncs, setPendingSyncs] = useState(0);
//   const syncIntervalRef = useRef(null);
//   const networkCheckIntervalRef = useRef(null);

//   // Auto close modal when user logs out
//   useEffect(() => {
//     if (!currentUser) {
//       setActiveModal(null);
//       setShowAttendanceCalendar(false);
//     }
//   }, [currentUser]);

//   // Enhanced Network Detection
//   useEffect(() => {
//     console.log('🔧 Initializing enhanced network detection');
    
//     const checkNetworkStatus = async () => {
//       const newStatus = {
//         isOnline: navigator.onLine,
//         connectionType: 'unknown',
//         lastChecked: new Date().toISOString()
//       };
      
//       // Try to detect actual connection type
//       if (navigator.connection) {
//         newStatus.connectionType = navigator.connection.effectiveType || 'unknown';
//       }
      
//       // For now, trust browser's online status
//       // In production, you might want to ping your own server
//       setNetworkStatus(prev => {
//         if (prev.isOnline !== newStatus.isOnline) {
//           console.log(`🌐 Network status: ${newStatus.isOnline ? 'Online' : 'Offline'}`);
          
//           if (newStatus.isOnline) {
//             showToast('✅ Internet connection available', 'success');
//             // Process pending syncs when coming online
//             if (attendanceSync.getQueueLength() > 0) {
//               setTimeout(() => {
//                 attendanceSync.processRetryQueue();
//                 setPendingSyncs(attendanceSync.getQueueLength());
//               }, 2000);
//             }
//           } else {
//             showToast('📶 Working in offline mode', 'info');
//           }
//         }
//         return newStatus;
//       });
//     };
    
//     const handleOnline = () => {
//       console.log('📡 Browser online event');
//       checkNetworkStatus();
//     };
    
//     const handleOffline = () => {
//       console.log('📴 Browser offline event');
//       checkNetworkStatus();
//     };
    
//     // Add event listeners
//     window.addEventListener('online', handleOnline);
//     window.addEventListener('offline', handleOffline);
    
//     // Initial check
//     checkNetworkStatus();
    
//     // Periodic checks (every 60 seconds)
//     networkCheckIntervalRef.current = setInterval(checkNetworkStatus, 60000);
    
//     // Update pending syncs count
//     const updatePendingSyncs = () => {
//       const queueLength = attendanceSync.getQueueLength();
//       if (queueLength !== pendingSyncs) {
//         setPendingSyncs(queueLength);
//       }
//     };
    
//     syncIntervalRef.current = setInterval(updatePendingSyncs, 3000);
    
//     // Initial load
//     updatePendingSyncs();
    
//     return () => {
//       window.removeEventListener('online', handleOnline);
//       window.removeEventListener('offline', handleOffline);
      
//       if (networkCheckIntervalRef.current) {
//         clearInterval(networkCheckIntervalRef.current);
//       }
      
//       if (syncIntervalRef.current) {
//         clearInterval(syncIntervalRef.current);
//       }
//     };
//   }, [showToast, pendingSyncs]);

//   // Handle Login
//   const handleLogin = async (email, password) => {
//     try {
//       if (!email || !password) {
//         showToast('❌ Please enter both email and password', 'error');
//         return;
//       }

//       const result = await login(email, password);
//       if (result && result.success) {
//         showToast('✅ Login successful! Welcome to Acore IT Hub', 'success');
        
//         // Check for pending syncs after login
//         setTimeout(() => {
//           const pendingCount = attendanceSync.getQueueLength();
//           if (pendingCount > 0 && networkStatus.isOnline) {
//             showToast(`${pendingCount} pending sync${pendingCount !== 1 ? 's' : ''} found`, 'info');
//             attendanceSync.processRetryQueue();
//           }
//         }, 1000);
//       } else {
//         showToast(result?.error || '❌ Login failed', 'error');
//       }
//     } catch (error) {
//       showToast('❌ Login failed. Please check your credentials.', 'error');
//     }
//   };

//   // Handle Register
//   const handleRegister = async (formData) => {
//     try {
//       console.log("📤 Original Form Data:", formData);
      
//       if (formData.password !== formData.confirmPassword) {
//         showToast('❌ Passwords do not match!', 'error');
//         return;
//       }

//       const dataToSend = {
//         name: formData.fullName,
//         email: formData.email,
//         mobile: formData.mobile,
//         birthday: formData.dob,
//         gender: formData.gender?.toLowerCase() || 'male',
//         address: formData.address,
        
//         emergencyContactName: formData.emergencyContactName || formData.fullName,
//         emergencyContactRelation: formData.emergencyContactRelation || "Self",
//         emergencyContactNumber: formData.emergencyContact,
        
//         designation: formData.designation,
//         department: formData.department,
//         dateOfJoining: formData.dateOfJoining,
//         employeeType: formData.employeeType?.toLowerCase().replace(" ", "-") || 'full-time',
//         githubUsername: formData.git || '',
        
//         password: formData.password,
        
//         aadhaarNumber: formData.aadharNumber || '',
//         panNumber: formData.panNumber || '',
//         accountNumber: formData.bankAccount || '',
//         bankName: formData.bankName || '',
//         ifscCode: formData.ifscCode || '',
        
//         bloodGroup: formData.bloodGroup || '',
//       };

//       console.log("🚀 Transformed Data for Backend:", JSON.stringify(dataToSend, null, 2));
      
//       const result = await register(dataToSend);
      
//       if (result && result.success) {
//         showToast('✅ Registration successful! Please login.', 'success');
//       } else {
//         const errorMsg = result?.error?.message || result?.error || 'Registration failed';
//         showToast(`❌ ${errorMsg}`, 'error');
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       showToast('❌ Registration failed. Please try again.', 'error');
//     }
//   };

//   // Handle Logout
//   const handleLogout = () => {
//     Swal.fire({
//       title: "Logout?",
//       text: "Are you sure you want to logout?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, Logout",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         if (pendingSyncs > 0 && networkStatus.isOnline) {
//           showToast(`Syncing ${pendingSyncs} pending record${pendingSyncs !== 1 ? 's' : ''} before logout...`, 'info');
//           attendanceSync.processRetryQueue();
//         }
        
//         logout();
//         showToast("👋 Logged out successfully!", "success");
//       }
//     });
//   };

//   // ========== PRODUCTION-READY ATTENDANCE HANDLER ==========
//   const handlePunch = async (locationData) => {
//     console.group('🎯 Attendance Punch Process');
    
//     try {
//       // Phase 1: Validation
//       if (!currentUser?.employeeId) {
//         showToast('Please login to continue', 'error');
//         console.error('❌ Validation failed: No authenticated user');
//         console.groupEnd();
//         return;
//       }

//       if (!locationData?.latitude || !locationData?.longitude) {
//         showToast('Location verification required', 'error');
//         console.error('❌ Validation failed: Invalid location data');
//         console.groupEnd();
//         return;
//       }

//       console.log('✅ Validation passed:', {
//         employeeId: currentUser.employeeId,
//         location: `${locationData.latitude}, ${locationData.longitude}`,
//         isPunchedIn: attendance.isPunchedIn,
//         network: networkStatus.isOnline ? 'Online' : 'Offline'
//       });

//       // ========== PUNCH OUT FLOW ==========
//       if (attendance.isPunchedIn) {
//         console.log('Processing Punch Out');
//         showToast('Processing punch out...', 'info');
        
//         // Stop local timer
//         const localStopResult = await punchOut();
        
//         if (!localStopResult?.success) {
//           showToast('Failed to stop tracking', 'error');
//           console.error('❌ Local timer stop failed');
//           console.groupEnd();
//           return;
//         }
        
//         console.log(`✅ Local timer stopped. Worked: ${localStopResult.workingTime}`);
//         showToast(`Punched out! Total time: ${localStopResult.workingTime}`, 'success');
        
//         // Try server sync if online
//         if (networkStatus.isOnline) {
//           try {
//             const apiResponse = await axios.post(
//               '/api/attendance/mark-out',
//               { employeeId: currentUser.employeeId },
//               {
//                 headers: {
//                   'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                   'Content-Type': 'application/json'
//                 },
//                 timeout: 10000
//               }
//             );
            
//             if (apiResponse.data?.status) {
//               console.log('✅ Server punch-out recorded');
//               showToast('✅ Punch-out synced with server', 'success');
              
//               dispatch(setPunchStatus({
//                 isPunchedIn: false,
//                 totalHours: localStopResult.totalHours || 0
//               }));
//             } else {
//               console.warn('⚠️ Server validation failed:', apiResponse.data);
//               showToast('Punch-out completed locally', 'info');
//             }
            
//           } catch (serverError) {
//             console.error('❌ Server sync failed:', serverError.message);
            
//             // Store for retry
//             attendanceSync.storeForRetry({
//               type: 'punch-out',
//               data: { employeeId: currentUser.employeeId },
//               attempts: 0
//             });
            
//             setPendingSyncs(prev => prev + 1);
//             showToast('Punch-out saved for later sync', 'info');
//           }
//         } else {
//           // Offline - store for later
//           attendanceSync.storeForRetry({
//             type: 'punch-out',
//             data: { employeeId: currentUser.employeeId },
//             attempts: 0
//           });
          
//           setPendingSyncs(prev => prev + 1);
//           showToast('Punch-out saved - will sync when online', 'info');
//         }
        
//         console.groupEnd();
//         return;
//       }

//       // ========== PUNCH IN FLOW ==========
//       console.log('Processing Punch In');
      
//       // Start local timer (ALWAYS works)
//       showToast('Starting work tracking...', 'info');
      
//       const localStartResult = await punchIn(locationData);
      
//       if (!localStartResult?.success) {
//         showToast('Failed to start tracking', 'error');
//         console.error('❌ Local timer start failed');
//         console.groupEnd();
//         return;
//       }
      
//       console.log('✅ Local timer started');
//       showToast('✅ Work tracking started!', 'success');
      
//       // Prepare data for server
//       const punchRecord = {
//         employeeId: currentUser.employeeId,
//         latitude: locationData.latitude,
//         longitude: locationData.longitude,
//         source: locationData?.source || 'electron',
//         accuracy: locationData.accuracy || 50,
//         timestamp: new Date().toISOString()
//       };
      
//       // Try server sync if online
//       if (networkStatus.isOnline) {
//         try {
//           const apiResponse = await axios.post(
//             '/api/attendance/mark-in',
//             punchRecord,
//             {
//               headers: {
//                 'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                 'Content-Type': 'application/json'
//               },
//               timeout: 15000
//             }
//           );
          
//           if (apiResponse.data?.status) {
//             console.log('✅ Server punch-in recorded');
//             showToast('✅ Punch-in recorded on server', 'success');
            
//             dispatch(setPunchStatus({
//               isPunchedIn: true,
//               lastPunchTime: new Date().toISOString(),
//               location: {
//                 latitude: locationData.latitude,
//                 longitude: locationData.longitude
//               }
//             }));
            
//           } else {
//             console.warn('⚠️ Server validation failed:', apiResponse.data);
//             showToast(apiResponse.data?.message || 'Server validation failed', 'warning');
//           }
          
//         } catch (serverError) {
//           console.error('❌ Server sync failed:', serverError.message);
          
//           attendanceSync.storeForRetry({
//             type: 'punch-in',
//             data: punchRecord,
//             attempts: 0
//           });
          
//           setPendingSyncs(prev => prev + 1);
//           showToast('✅ Tracking started (will sync later)', 'info');
//         }
//       } else {
//         // Offline - store for later
//         attendanceSync.storeForRetry({
//           type: 'punch-in',
//           data: punchRecord,
//           attempts: 0
//         });
        
//         setPendingSyncs(prev => prev + 1);
//         showToast('✅ Tracking started (offline mode)', 'info');
//       }
      
//       console.log('✅ Punch process completed successfully');
      
//     } catch (error) {
//       console.error('🔥 CRITICAL ERROR in punch process:', error);
//       showToast('System error - please try again', 'error');
      
//       // Log error for debugging
//       logError({
//         type: 'ATTENDANCE_PUNCH_ERROR',
//         error: error.message,
//         userId: currentUser?.employeeId,
//         timestamp: new Date().toISOString()
//       });
//     } finally {
//       console.groupEnd();
//     }
//   };

//   // Handle Leave Application
//   const handleLeaveSubmit = async (formData) => {
//     setLeaveLoading(true);

//     try {
//       if (!currentUser || !currentUser.employeeId) {
//         showToast("❌ Employee not found. Please login again.", "error");
//         return;
//       }

//       console.log("📝 Submitting leave with:", formData);

//       const result = await dispatch(
//         applyLeave({
//           formData,
//           employeeId: currentUser.employeeId,
//           employeeName: currentUser.name,
//         })
//       ).unwrap();

//       console.log("✅ Leave Result:", result);
//       showToast("✅ Leave application submitted successfully!", "success");
//       setActiveModal(null);

//     } catch (error) {
//       console.error("❌ Leave Error:", error);
      
//       let errorMessage = "❌ Failed to submit leave application";
      
//       if (typeof error === 'string') {
//         if (error.includes("holiday")) {
//           errorMessage = error;
//         } else if (error.includes("already applied")) {
//           errorMessage = error;
//         }
//       } else if (error?.message) {
//         errorMessage = error.message;
//       }
      
//       showToast(errorMessage, "error");
//     } finally {
//       setLeaveLoading(false);
//     }
//   };

//   // Handle GitHub Push
//   const handleGithubPush = async (formData) => {
//     setGithubLoading(true);
    
//     try {
//       if (!formData.repository || !formData.commitMessage) {
//         showToast('❌ Please fill all required fields', 'error');
//         return;
//       }

//       await new Promise(resolve => setTimeout(resolve, 2000));
//       showToast('✅ Code pushed to GitHub successfully!', 'success');
//     } catch (error) {
//       showToast('❌ Failed to push code to GitHub', 'error');
//     } finally {
//       setGithubLoading(false);
//     }
//   };

//   // Manual sync function
//   const handleManualSync = async () => {
//     if (!networkStatus.isOnline) {
//       showToast('No internet connection', 'error');
//       return;
//     }

//     if (pendingSyncs === 0) {
//       showToast('No pending syncs', 'info');
//       return;
//     }

//     showToast(`Syncing ${pendingSyncs} pending records...`, 'info');
    
//     try {
//       const results = await attendanceSync.processRetryQueue();
//       setPendingSyncs(attendanceSync.getQueueLength());
      
//       if (results.success > 0) {
//         showToast(`✅ ${results.success} record${results.success !== 1 ? 's' : ''} synced`, 'success');
//       }
      
//       if (results.failed > 0) {
//         showToast(`⚠️ ${results.failed} record${results.failed !== 1 ? 's' : ''} failed`, 'warning');
//       }
      
//     } catch (error) {
//       console.error('Manual sync error:', error);
//       showToast('Sync failed', 'error');
//     }
//   };

//   // Open Modal function
//   const openModal = (modalName) => {
//     if (modalName === 'attendance-calendar') {
//       setShowAttendanceCalendar(true);
//     } else if (modalName === 'attendance') {
//       setActiveModal('attendance');
//     } else if (modalName === 'projects') {
//       setActiveModal('projects');
//     } else if (modalName === 'tasks') {
//       setActiveModal('tasks');
//     } else {
//       setActiveModal(modalName);
//     }
//   };

//   // Close Modal function
//   const closeModal = () => {
//     setActiveModal(null);
//     setShowAttendanceCalendar(false);
//   };

//   // Error logging utility
//   const logError = (errorData) => {
//     console.error('🚨 ERROR LOG:', errorData);
    
//     try {
//       const errors = JSON.parse(localStorage.getItem('app_errors') || '[]');
//       errors.push({
//         ...errorData,
//         timestamp: new Date().toISOString()
//       });
      
//       if (errors.length > 50) {
//         errors.shift();
//       }
      
//       localStorage.setItem('app_errors', JSON.stringify(errors));
//     } catch (e) {
//       console.error('Failed to log error:', e);
//     }
//   };

//   // Render Login Page if not authenticated
//   if (!currentUser) {
//     return (
//       <>
//         <Login 
//           onLogin={handleLogin} 
//           onRegister={handleRegister}
//           loading={authLoading}
//           registerLoading={false}
//         />
//         <Toast toast={toast} onClose={hideToast} />
//       </>
//     );
//   }

//   // Main Dashboard
//   return (
//     <div className="app">
//       <div className="app-container">
//         <Header
//           currentUser={currentUser}
//           onProfileClick={() => openModal('profile')}
//           onLogout={handleLogout}
//           onCardClick={openModal}
//           attendanceStatus={attendance}
//           pendingSyncs={pendingSyncs}
//           networkStatus={networkStatus}
//           onManualSync={handleManualSync}
//         />

//         {/* ✅ DASHBOARD */}
//         <div className="dashboard-wrapper">
//           <Dashboard currentUser={currentUser} />
//         </div>

//         {/* ✅ SLIDERS */}
//         <AnnouncementSlider />
//         <BirthdaySlider />
//         <EmployeeSlider/>

//         {/* ✅ MODALS */}
//         <AttendanceModal
//           isOpen={activeModal === 'attendance'}
//           onClose={closeModal}
//           attendance={attendance}
//           onPunch={handlePunch}
//           pendingSyncs={pendingSyncs}
//           networkStatus={networkStatus}
//         />

//         <ProjectsModal
//           isOpen={activeModal === 'projects'}
//           onClose={closeModal}
//           currentUser={currentUser}
//           onCardClick={openModal}
//         />

//         <TasksModal
//           isOpen={activeModal === 'tasks'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <AttendanceCalendarModal
//           isOpen={showAttendanceCalendar}
//           onClose={closeModal}
//           empId={currentUser?.employeeId}
//         />

//         <LeaveModal
//           isOpen={activeModal === 'leave'}
//           onClose={closeModal}
//           onLeaveSubmit={handleLeaveSubmit}
//           loading={leaveLoading}
//         />

//         <BirthdayModal
//           isOpen={activeModal === 'birthday'}
//           onClose={closeModal}
//         />

//         <ProfileModal
//           isOpen={activeModal === 'profile'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <CalendarModal
//           isOpen={activeModal === 'calendar'}
//           onClose={closeModal}
//         />

//         <GithubModal
//           isOpen={activeModal === 'github'}
//           onClose={closeModal}
//           onPushCode={handleGithubPush}
//           loading={githubLoading}
//         />

//         <SalaryModal
//           isOpen={activeModal === 'salary'}
//           onClose={closeModal}
//           currentUser={currentUser}
//         />

//         <Toast toast={toast} onClose={hideToast} />
//       </div>
//     </div>
//   );
// }

// export default App;






import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import useAttendance from './hooks/useAttendance';
import { useToast } from './hooks/useToast';
import Swal from "sweetalert2";

// Components
import Login from './components/auth/Login';
import Header from './components/common/Header';
import Toast from './components/common/Toast';
import AnnouncementSlider from './components/dashboard/AnnouncementSlider';
import BirthdaySlider from './components/dashboard/BirthdaySlider';
import EmployeeSlider from './components/dashboard/EmployeeSlider';
import Dashboard from './components/dashboard/Dashboard';

// Modals
import AttendanceModal from './components/modals/AttendanceModal';
import LeaveModal from './components/modals/LeaveModal';
import BirthdayModal from './components/modals/BirthdayModal';
import ProfileModal from './components/modals/ProfileModal';
import CalendarModal from './components/modals/CalendarModal';
import GithubModal from './components/modals/GithubModal';
import SalaryModal from './components/modals/SalaryModal';
import AttendanceCalendarModal from './components/modals/AttendanceCalendarModal';
import ProjectsModal from './components/modals/ProjectsModal';
import TasksModal from './components/modals/TasksModal';

import './App.css';

// Redux
import { useDispatch } from "react-redux";
import { applyLeave } from "./redux/slices/leaveSlice";

function App() {
  const dispatch = useDispatch();
  const { currentUser, loading: authLoading, login, register, logout } = useAuth();
  const { attendance, punchIn, punchOut } = useAttendance();
  const { toast, showToast, hideToast } = useToast();
  
  // Modal State
  const [activeModal, setActiveModal] = useState(null);
  const [showAttendanceCalendar, setShowAttendanceCalendar] = useState(false);
  const [leaveLoading, setLeaveLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  // Auto close modal when user logs out
  useEffect(() => {
    if (!currentUser) {
      setActiveModal(null);
      setShowAttendanceCalendar(false);
    }
  }, [currentUser]);

  // ✅ Handle Login
  const handleLogin = async (email, password) => {
    try {
      if (!email || !password) {
        showToast('❌ Please enter both email and password', 'error');
        return;
      }

      const result = await login(email, password);
      if (result && result.success) {
        showToast('✅ Login successful! Welcome to Acore IT Hub', 'success');
      } else {
        showToast(result?.error || '❌ Login failed', 'error');
      }
    } catch (error) {
      showToast('❌ Login failed. Please check your credentials.', 'error');
    }
  };

  // ✅ Handle Register
  const handleRegister = async (formData) => {
    try {
      console.log("📤 Original Form Data:", formData);
      
      // ✅ Password match check
      if (formData.password !== formData.confirmPassword) {
        showToast('❌ Passwords do not match!', 'error');
        return;
      }

      // ✅ Transform data to match backend schema
      const dataToSend = {
        name: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        birthday: formData.dob,
        gender: formData.gender?.toLowerCase() || 'male',
        address: formData.address,
        
        emergencyContactName: formData.emergencyContactName || formData.fullName,
        emergencyContactRelation: formData.emergencyContactRelation || "Self",
        emergencyContactNumber: formData.emergencyContact,
        
        designation: formData.designation,
        department: formData.department,
        dateOfJoining: formData.dateOfJoining,
        employeeType: formData.employeeType?.toLowerCase().replace(" ", "-") || 'full-time',
        githubUsername: formData.git || '',
        
        password: formData.password,
        
        aadhaarNumber: formData.aadharNumber || '',
        panNumber: formData.panNumber || '',
        accountNumber: formData.bankAccount || '',
        bankName: formData.bankName || '',
        ifscCode: formData.ifscCode || '',
        
        bloodGroup: formData.bloodGroup || '',
      };

      console.log("🚀 Transformed Data for Backend:", JSON.stringify(dataToSend, null, 2));
      
      const result = await register(dataToSend);
      
      if (result && result.success) {
        showToast('✅ Registration successful! Please login.', 'success');
      } else {
        const errorMsg = result?.error?.message || result?.error || 'Registration failed';
        showToast(`❌ ${errorMsg}`, 'error');
      }
    } catch (error) {
      console.error('Registration error:', error);
      showToast('❌ Registration failed. Please try again.', 'error');
    }
  };

  // ✅ Handle Logout
  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        showToast("👋 Logged out successfully!", "success");
      }
    });
  };

  // ✅ Handle Punch In/Out
  const handlePunch = async () => {
    try {
      if (attendance.isPunchedIn) {
        const result = await punchOut();
        if (result && result.success) {
          showToast('✅ Punched out successfully! See you tomorrow.', 'success');
          setActiveModal(null);
        } else {
          showToast(result?.error || '❌ Punch out failed', 'error');
        }
      } else {
        const result = await punchIn();
        if (result && result.success) {
          showToast('✅ Punched in successfully! Have a productive day.', 'success');
        } else {
          showToast(result?.error || '❌ Punch in failed', 'error');
        }
      }
    } catch (error) {
      showToast('❌ Error processing attendance', 'error');
      console.error('Punch error:', error);
    }
  };

  // ✅ Handle Leave Application
  const handleLeaveSubmit = async (formData) => {
    setLeaveLoading(true);

    try {
      if (!currentUser || !currentUser.employeeId) {
        showToast("❌ Employee not found. Please login again.", "error");
        return;
      }

      console.log("📝 Submitting leave with:", formData);

      const result = await dispatch(
        applyLeave({
          formData,
          employeeId: currentUser.employeeId,
          employeeName: currentUser.name,
        })
      ).unwrap();

      console.log("✅ Leave Result:", result);
      showToast("✅ Leave application submitted successfully!", "success");
      setActiveModal(null);

    } catch (error) {
      console.error("❌ Leave Error:", error);
      
      let errorMessage = "❌ Failed to submit leave application";
      
      if (typeof error === 'string') {
        if (error.includes("holiday")) {
          errorMessage = error;
        } else if (error.includes("already applied")) {
          errorMessage = error;
        }
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      showToast(errorMessage, "error");
    } finally {
      setLeaveLoading(false);
    }
  };

  // ✅ Handle GitHub Push
  const handleGithubPush = async (formData) => {
    setGithubLoading(true);
    
    try {
      if (!formData.repository || !formData.commitMessage) {
        showToast('❌ Please fill all required fields', 'error');
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 2000));
      showToast('✅ Code pushed to GitHub successfully!', 'success');
      setActiveModal(null);
    } catch (error) {
      showToast('❌ Failed to push code to GitHub', 'error');
    } finally {
      setGithubLoading(false);
    }
  };

  // ✅ Open Modal function
  const openModal = (modalName) => {
    if (modalName === 'attendance-calendar') {
      setShowAttendanceCalendar(true);
    } else if (modalName === 'attendance') {
      setActiveModal('attendance');
    } else if (modalName === 'projects') {
      setActiveModal('projects');
    } else if (modalName === 'tasks') {
      setActiveModal('tasks');
    } else {
      setActiveModal(modalName);
    }
  };

  // ✅ Close Modal function
  const closeModal = () => {
    setActiveModal(null);
    setShowAttendanceCalendar(false);
  };

  // ✅ Render Login Page if not authenticated
  if (!currentUser) {
    return (
      <>
        <Login 
          onLogin={handleLogin} 
          onRegister={handleRegister}
          loading={authLoading}
          registerLoading={false}
        />
        <Toast toast={toast} onClose={hideToast} />
      </>
    );
  }

  // ✅ Main Dashboard
  return (
    <div className="app">
      <div className="app-container">
        <Header
          currentUser={currentUser}
          onProfileClick={() => openModal('profile')}
          onLogout={handleLogout}
          onCardClick={openModal}
          attendanceStatus={attendance}
        />

        {/* ✅ DASHBOARD */}
        <div className="dashboard-wrapper">
          <Dashboard currentUser={currentUser} />
        </div>

        {/* ✅ SLIDERS */}
        <AnnouncementSlider />
        <BirthdaySlider />
        <EmployeeSlider/>

        {/* ✅ ATTENDANCE MODAL */}
        <AttendanceModal
          isOpen={activeModal === 'attendance'}
          onClose={closeModal}
          attendance={attendance}
          onPunch={handlePunch}
        />

        {/* ✅ PROJECTS MODAL */}
        <ProjectsModal
          isOpen={activeModal === 'projects'}
          onClose={closeModal}
          currentUser={currentUser}
          onCardClick={openModal}
        />

        {/* ✅ TASKS MODAL */}
        <TasksModal
          isOpen={activeModal === 'tasks'}
          onClose={closeModal}
          currentUser={currentUser}
        />

        {/* ✅ ATTENDANCE CALENDAR MODAL */}
        <AttendanceCalendarModal
          isOpen={showAttendanceCalendar}
          onClose={closeModal}
          empId={currentUser?.employeeId}
          attendanceData={attendance}
        />

        {/* ✅ OTHER MODALS */}
        <LeaveModal
          isOpen={activeModal === 'leave'}
          onClose={closeModal}
          onLeaveSubmit={handleLeaveSubmit}
          loading={leaveLoading}
        />

        <BirthdayModal
          isOpen={activeModal === 'birthday'}
          onClose={closeModal}
        />

        <ProfileModal
          isOpen={activeModal === 'profile'}
          onClose={closeModal}
          currentUser={currentUser}
        />

        <CalendarModal
          isOpen={activeModal === 'calendar'}
          onClose={closeModal}
        />

        <GithubModal
          isOpen={activeModal === 'github'}
          onClose={closeModal}
          onPushCode={handleGithubPush}
          loading={githubLoading}
        />

        <SalaryModal
          isOpen={activeModal === 'salary'}
          onClose={closeModal}
          currentUser={currentUser}
        />

        <Toast toast={toast} onClose={hideToast} />
      </div>
    </div>
  );
}

export default App;