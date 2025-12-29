// import React, { useState } from 'react';
// import Modal from '../common/Modal';
// import { calculateNetSalary, formatCurrency } from '../../utils/helpers';
// import { SALARY_DATA, MONTHS } from '../../data/mockData';
// import './ProfileModal.css';

// const ProfileModal = ({ isOpen, onClose, currentUser }) => {
//   const [activeTab, setActiveTab] = useState('profile');
//   const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
//   const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

//   const { grossSalary, totalDeductions, netSalary } = calculateNetSalary(SALARY_DATA);

//   const profileDetails = [
//     { label: 'Employee ID', value: currentUser.employeeId, icon: '🆔' },
//     { label: 'Full Name', value: currentUser.name, icon: '👤' },
//     { label: 'Designation', value: currentUser.designation, icon: '💼' },
//     { label: 'Department', value: currentUser.department, icon: '🏢' },
//     { label: 'Email', value: currentUser.email, icon: '📧' },
//     { label: 'Phone', value: currentUser.phone, icon: '📱' },
//     { label: 'Joining Date', value: currentUser.joiningDate, icon: '📅' },
//     { label: 'Birthday', value: currentUser.birthday, icon: '🎂' },
//     { label: 'Gender', value: currentUser.gender, icon: '⚧' },
//     { label: 'Address', value: currentUser.address, icon: '🏠' }
//   ];

//   const salaryBreakdown = [
//     { label: 'Basic Salary', amount: SALARY_DATA.basic, type: 'earning' },
//     { label: 'House Rent Allowance (HRA)', amount: SALARY_DATA.hra, type: 'earning' },
//     { label: 'Dearness Allowance (DA)', amount: SALARY_DATA.da, type: 'earning' },
//     { label: 'Transport Allowance', amount: SALARY_DATA.transport, type: 'earning' },
//     { label: 'Special Allowance', amount: SALARY_DATA.special, type: 'earning' },
//     { label: 'Provident Fund (PF)', amount: SALARY_DATA.pf, type: 'deduction' },
//     { label: 'Professional Tax', amount: SALARY_DATA.professionalTax, type: 'deduction' },
//     { label: 'Income Tax (TDS)', amount: SALARY_DATA.incomeTax, type: 'deduction' },
//     { label: 'Employee State Insurance (ESI)', amount: SALARY_DATA.esi, type: 'deduction' }
//   ];

//   const changeMonth = (direction) => {
//     setCurrentMonth(prev => {
//       let newMonth = prev + direction;
//       if (newMonth > 11) {
//         setCurrentYear(prevYear => prevYear + 1);
//         return 0;
//       } else if (newMonth < 0) {
//         setCurrentYear(prevYear => prevYear - 1);
//         return 11;
//       }
//       return newMonth;
//     });
//   };

//   const downloadSalarySlip = () => {
//     // Simulate download
//     alert(`Downloading salary slip for ${MONTHS[currentMonth]} ${currentYear}`);
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title="👤 Employee Profile"
//       size="large"
//     >
//       <div className="profile-modal-content">
//         {/* Profile Header */}
//         <div className="profile-header">
//           <div className="profile-avatar">
//             {currentUser.name.split(' ').map(n => n[0]).join('')}
//           </div>
//           <div className="profile-info">
//             <h2 className="profile-name">{currentUser.name}</h2>
//             <p className="profile-designation">{currentUser.designation}</p>
//             <p className="profile-department">{currentUser.department} Department</p>
//           </div>
//         </div>

//         {/* Navigation Tabs */}
//         <div className="profile-tabs">
//           <button
//             className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
//             onClick={() => setActiveTab('profile')}
//           >
//             📋 Personal Details
//           </button>
//           <button
//             className={`tab-btn ${activeTab === 'salary' ? 'active' : ''}`}
//             onClick={() => setActiveTab('salary')}
//           >
//             💰 Salary Information
//           </button>
//         </div>

//         {/* Profile Details Tab */}
//         {activeTab === 'profile' && (
//           <div className="tab-content">
//             <div className="details-grid">
//               {profileDetails.map((detail, index) => (
//                 <div key={index} className="detail-card">
//                   <div className="detail-icon">{detail.icon}</div>
//                   <div className="detail-content">
//                     <label className="detail-label">{detail.label}</label>
//                     <p className="detail-value">{detail.value}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Salary Information Tab */}
//         {activeTab === 'salary' && (
//           <div className="tab-content">
//             {/* Salary Slip Header */}
//             <div className="salary-header">
//               <h3 className="salary-title">💰 Salary Slip</h3>
//               <button className="download-btn" onClick={downloadSalarySlip}>
//                 📥 Download Slip
//               </button>
//             </div>

//             {/* Month Navigation */}
//             <div className="month-navigation">
//               <button 
//                 className="nav-btn"
//                 onClick={() => changeMonth(-1)}
//               >
//                 ◀
//               </button>
//               <span className="current-month">
//                 {MONTHS[currentMonth]} {currentYear}
//               </span>
//               <button 
//                 className="nav-btn"
//                 onClick={() => changeMonth(1)}
//               >
//                 ▶
//               </button>
//             </div>

//             {/* Salary Summary Cards */}
//             <div className="salary-summary">
//               <div className="summary-card gross">
//                 <div className="summary-label">Gross Salary</div>
//                 <div className="summary-amount">{formatCurrency(grossSalary)}</div>
//               </div>
//               <div className="summary-card deductions">
//                 <div className="summary-label">Total Deductions</div>
//                 <div className="summary-amount">{formatCurrency(totalDeductions)}</div>
//               </div>
//               <div className="summary-card net">
//                 <div className="summary-label">Net Salary</div>
//                 <div className="summary-amount">{formatCurrency(netSalary)}</div>
//               </div>
//             </div>

//             {/* Detailed Breakdown */}
//             <div className="salary-breakdown">
//               <h4 className="breakdown-title">📊 Detailed Salary Breakdown</h4>
              
//               <div className="breakdown-section">
//                 <h5 className="section-title">💵 Earnings</h5>
//                 {salaryBreakdown
//                   .filter(item => item.type === 'earning')
//                   .map((item, index) => (
//                     <div key={index} className="breakdown-item">
//                       <span className="item-label">{item.label}</span>
//                       <span className="item-amount positive">
//                         +{formatCurrency(item.amount)}
//                       </span>
//                     </div>
//                   ))}
//                 <div className="breakdown-total">
//                   <span className="total-label">Total Earnings</span>
//                   <span className="total-amount positive">
//                     {formatCurrency(grossSalary)}
//                   </span>
//                 </div>
//               </div>

//               <div className="breakdown-section">
//                 <h5 className="section-title">📉 Deductions</h5>
//                 {salaryBreakdown
//                   .filter(item => item.type === 'deduction')
//                   .map((item, index) => (
//                     <div key={index} className="breakdown-item">
//                       <span className="item-label">{item.label}</span>
//                       <span className="item-amount negative">
//                         -{formatCurrency(item.amount)}
//                       </span>
//                     </div>
//                   ))}
//                 <div className="breakdown-total">
//                   <span className="total-label">Total Deductions</span>
//                   <span className="total-amount negative">
//                     {formatCurrency(totalDeductions)}
//                   </span>
//                 </div>
//               </div>

//               {/* Net Salary Card */}
//               <div className="net-salary-card">
//                 <div className="net-label">💰 NET SALARY (Take Home)</div>
//                 <div className="net-amount">{formatCurrency(netSalary)}</div>
//                 <div className="net-note">
//                   Gross Salary {formatCurrency(grossSalary)} - Deductions {formatCurrency(totalDeductions)}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </Modal>
//   );
// };

// export default ProfileModal;



// import React, { useState } from 'react';
// import Modal from '../common/Modal';
// import { calculateNetSalary, formatCurrency } from '../../utils/helpers';
// import { SALARY_DATA } from '../../data/mockData';
// import { MONTHS } from '../../utils/constants'; // ✅ Correct import path
// import './ProfileModal.css';

// const ProfileModal = ({ isOpen, onClose, currentUser }) => {
//   const [activeTab, setActiveTab] = useState('profile');
//   const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
//   const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

//   const { grossSalary, totalDeductions, netSalary } = calculateNetSalary(SALARY_DATA);

//   const profileDetails = [
//     { label: 'Employee ID', value: currentUser.employeeId, icon: '🆔' },
//     { label: 'Full Name', value: currentUser.name, icon: '👤' },
//     { label: 'Designation', value: currentUser.designation, icon: '💼' },
//     { label: 'Department', value: currentUser.department, icon: '🏢' },
//     { label: 'Email', value: currentUser.email, icon: '📧' },
//     { label: 'Phone', value: currentUser.phone, icon: '📱' },
//     { label: 'Joining Date', value: currentUser.joiningDate, icon: '📅' },
//     { label: 'Birthday', value: currentUser.birthday, icon: '🎂' },
//     { label: 'Gender', value: currentUser.gender, icon: '⚧' },
//     { label: 'Address', value: currentUser.address, icon: '🏠' }
//   ];

//   const salaryBreakdown = [
//     { label: 'Basic Salary', amount: SALARY_DATA.basic, type: 'earning' },
//     { label: 'House Rent Allowance (HRA)', amount: SALARY_DATA.hra, type: 'earning' },
//     { label: 'Dearness Allowance (DA)', amount: SALARY_DATA.da, type: 'earning' },
//     { label: 'Transport Allowance', amount: SALARY_DATA.transport, type: 'earning' },
//     { label: 'Special Allowance', amount: SALARY_DATA.special, type: 'earning' },
//     { label: 'Provident Fund (PF)', amount: SALARY_DATA.pf, type: 'deduction' },
//     { label: 'Professional Tax', amount: SALARY_DATA.professionalTax, type: 'deduction' },
//     { label: 'Income Tax (TDS)', amount: SALARY_DATA.incomeTax, type: 'deduction' },
//     { label: 'Employee State Insurance (ESI)', amount: SALARY_DATA.esi, type: 'deduction' }
//   ];

//   const changeMonth = (direction) => {
//     setCurrentMonth(prev => {
//       let newMonth = prev + direction;
//       if (newMonth > 11) {
//         setCurrentYear(prevYear => prevYear + 1);
//         return 0;
//       } else if (newMonth < 0) {
//         setCurrentYear(prevYear => prevYear - 1);
//         return 11;
//       }
//       return newMonth;
//     });
//   };

//   const downloadSalarySlip = () => {
//     // Simulate download
//     alert(`Downloading salary slip for ${MONTHS[currentMonth]} ${currentYear}`);
//     showToast(`📥 Salary slip for ${MONTHS[currentMonth]} ${currentYear} downloaded!`, 'success');
//   };

//   // Add showToast function for the download
//   const showToast = (message, type) => {
//     // You can integrate with your toast system here
//     console.log(`${type}: ${message}`);
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title="👤 Employee Profile"
//       size="large"
//     >
//       <div className="profile-modal-content">
//         {/* Profile Header */}
//         <div className="profile-header">
//           <div className="profile-avatar">
//             {currentUser?.name?.split(' ').map(n => n[0]).join('')}
//           </div>
//           <div className="profile-info">
//             <h2 className="profile-name">{currentUser?.name}</h2>
//             <p className="profile-designation">{currentUser?.designation}</p>
//             <p className="profile-department">{currentUser?.department} Department</p>
//           </div>
//         </div>

//         {/* Navigation Tabs */}
//         <div className="profile-tabs">
//           <button
//             className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
//             onClick={() => setActiveTab('profile')}
//           >
//             📋 Personal Details
//           </button>
//           <button
//             className={`tab-btn ${activeTab === 'salary' ? 'active' : ''}`}
//             onClick={() => setActiveTab('salary')}
//           >
//             💰 Salary Information
//           </button>
//         </div>

//         {/* Profile Details Tab */}
//         {activeTab === 'profile' && (
//           <div className="tab-content">
//             <div className="details-grid">
//               {profileDetails.map((detail, index) => (
//                 <div key={index} className="detail-card">
//                   <div className="detail-icon">{detail.icon}</div>
//                   <div className="detail-content">
//                     <label className="detail-label">{detail.label}</label>
//                     <p className="detail-value">{detail.value}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Salary Information Tab */}
//         {activeTab === 'salary' && (
//           <div className="tab-content">
//             {/* Salary Slip Header */}
//             <div className="salary-header">
//               <h3 className="salary-title">💰 Salary Slip</h3>
//               <button className="download-btn" onClick={downloadSalarySlip}>
//                 📥 Download Slip
//               </button>
//             </div>

//             {/* Month Navigation */}
//             <div className="month-navigation">
//               <button 
//                 className="nav-btn"
//                 onClick={() => changeMonth(-1)}
//               >
//                 ◀
//               </button>
//               <span className="current-month">
//                 {MONTHS[currentMonth]} {currentYear}
//               </span>
//               <button 
//                 className="nav-btn"
//                 onClick={() => changeMonth(1)}
//               >
//                 ▶
//               </button>
//             </div>

//             {/* Salary Summary Cards */}
//             <div className="salary-summary">
//               <div className="summary-card gross">
//                 <div className="summary-label">Gross Salary</div>
//                 <div className="summary-amount">{formatCurrency(grossSalary)}</div>
//               </div>
//               <div className="summary-card deductions">
//                 <div className="summary-label">Total Deductions</div>
//                 <div className="summary-amount">{formatCurrency(totalDeductions)}</div>
//               </div>
//               <div className="summary-card net">
//                 <div className="summary-label">Net Salary</div>
//                 <div className="summary-amount">{formatCurrency(netSalary)}</div>
//               </div>
//             </div>

//             {/* Detailed Breakdown */}
//             <div className="salary-breakdown">
//               <h4 className="breakdown-title">📊 Detailed Salary Breakdown</h4>
              
//               <div className="breakdown-section">
//                 <h5 className="section-title">💵 Earnings</h5>
//                 {salaryBreakdown
//                   .filter(item => item.type === 'earning')
//                   .map((item, index) => (
//                     <div key={index} className="breakdown-item">
//                       <span className="item-label">{item.label}</span>
//                       <span className="item-amount positive">
//                         +{formatCurrency(item.amount)}
//                       </span>
//                     </div>
//                   ))}
//                 <div className="breakdown-total">
//                   <span className="total-label">Total Earnings</span>
//                   <span className="total-amount positive">
//                     {formatCurrency(grossSalary)}
//                   </span>
//                 </div>
//               </div>

//               <div className="breakdown-section">
//                 <h5 className="section-title">📉 Deductions</h5>
//                 {salaryBreakdown
//                   .filter(item => item.type === 'deduction')
//                   .map((item, index) => (
//                     <div key={index} className="breakdown-item">
//                       <span className="item-label">{item.label}</span>
//                       <span className="item-amount negative">
//                         -{formatCurrency(item.amount)}
//                       </span>
//                     </div>
//                   ))}
//                 <div className="breakdown-total">
//                   <span className="total-label">Total Deductions</span>
//                   <span className="total-amount negative">
//                     {formatCurrency(totalDeductions)}
//                   </span>
//                 </div>
//               </div>

//               {/* Net Salary Card */}
//               <div className="net-salary-card">
//                 <div className="net-label">💰 NET SALARY (Take Home)</div>
//                 <div className="net-amount">{formatCurrency(netSalary)}</div>
//                 <div className="net-note">
//                   Gross Salary {formatCurrency(grossSalary)} - Deductions {formatCurrency(totalDeductions)}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </Modal>
//   );
// };

// export default ProfileModal;


// import React, { useState } from 'react';
// import Modal from '../common/Modal';
// import { calculateNetSalary, formatCurrency } from '../../utils/helpers';
// import { SALARY_DATA } from '../../data/mockData';
// import { MONTHS } from '../../utils/constants';
// import './ProfileModal.css';

// const ProfileModal = ({ isOpen, onClose, currentUser }) => {
//   const [activeTab, setActiveTab] = useState('profile');
//   const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
//   const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
//   const [resignationLoading, setResignationLoading] = useState(false);
  
//   // Resignation form state
//   const [resignationData, setResignationData] = useState({
//     lastWorkingDay: '',
//     reason: '',
//     details: ''
//   });

//   const { grossSalary, totalDeductions, netSalary } = calculateNetSalary(SALARY_DATA);

//   const profileDetails = [
//     { label: 'Employee ID', value: currentUser.employeeId, icon: '🆔' },
//     { label: 'Full Name', value: currentUser.name, icon: '👤' },
//     { label: 'Designation', value: currentUser.designation, icon: '💼' },
//     { label: 'Department', value: currentUser.department, icon: '🏢' },
//     { label: 'Email', value: currentUser.email, icon: '📧' },
//     { label: 'Phone', value: currentUser.phone, icon: '📱' },
//     { label: 'Joining Date', value: currentUser.joiningDate, icon: '📅' },
//     { label: 'Work Anniversary', value: currentUser.anniversary, icon: '🎉' },
//     { label: 'Birthday', value: currentUser.birthday, icon: '🎂' },
//     { label: 'Gender', value: currentUser.gender, icon: '⚧' },
//     { label: 'Address', value: currentUser.address, icon: '🏠' },
//     { label: 'Employee Type', value: currentUser.empType, icon: '💰' }
//   ];

//   const salaryBreakdown = [
//     { label: 'Basic Salary', amount: SALARY_DATA.basic, type: 'earning' },
//     { label: 'House Rent Allowance (HRA)', amount: SALARY_DATA.hra, type: 'earning' },
//     { label: 'Dearness Allowance (DA)', amount: SALARY_DATA.da, type: 'earning' },
//     { label: 'Transport Allowance', amount: SALARY_DATA.transport, type: 'earning' },
//     { label: 'Special Allowance', amount: SALARY_DATA.special, type: 'earning' },
//     { label: 'Provident Fund (PF)', amount: SALARY_DATA.pf, type: 'deduction' },
//     { label: 'Professional Tax', amount: SALARY_DATA.professionalTax, type: 'deduction' },
//     { label: 'Income Tax (TDS)', amount: SALARY_DATA.incomeTax, type: 'deduction' },
//     { label: 'Employee State Insurance (ESI)', amount: SALARY_DATA.esi, type: 'deduction' }
//   ];

//   const changeMonth = (direction) => {
//     setCurrentMonth(prev => {
//       let newMonth = prev + direction;
//       if (newMonth > 11) {
//         setCurrentYear(prevYear => prevYear + 1);
//         return 0;
//       } else if (newMonth < 0) {
//         setCurrentYear(prevYear => prevYear - 1);
//         return 11;
//       }
//       return newMonth;
//     });
//   };

//   const downloadSalarySlip = () => {
//     // Simulate download
//     alert(`Downloading salary slip for ${MONTHS[currentMonth]} ${currentYear}`);
//     showToast(`📥 Salary slip for ${MONTHS[currentMonth]} ${currentYear} downloaded!`, 'success');
//   };

//   const handleResignation = async (e) => {
//     e.preventDefault();
//     setResignationLoading(true);
    
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       console.log('Resignation submitted:', resignationData);
//       showToast('📤 Resignation request submitted successfully!', 'success');
      
//       // Reset form
//       setResignationData({
//         lastWorkingDay: '',
//         reason: '',
//         details: ''
//       });
      
//     } catch (error) {
//       showToast('❌ Failed to submit resignation request', 'error');
//     } finally {
//       setResignationLoading(false);
//     }
//   };

//   const handleResignationChange = (field, value) => {
//     setResignationData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const showToast = (message, type) => {
//     // You can integrate with your toast system here
//     console.log(`${type}: ${message}`);
//     // If you have a toast context, use it here
//     // toastContext.showToast(message, type);
//   };

//   // Get user initials for profile picture
//   const userInitials = currentUser?.name?.split(' ').map(n => n[0]).join('') || 'AU';

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title="👤 Employee Profile & Salary"
//       size="large"
//     >
//       <div className="profile-modal-content">
//         {/* Profile Header */}
//         <div className="profile-header">
//           <div className="profile-picture">{userInitials}</div>
//           <div className="profile-info">
//             <h2 className="profile-name">{currentUser?.name}</h2>
//             <p className="profile-designation">{currentUser?.designation}</p>
//           </div>
//         </div>

//         {/* Navigation Tabs */}
//         <div className="profile-tabs">
//           <button
//             className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
//             onClick={() => setActiveTab('profile')}
//           >
//             📋 Personal Details
//           </button>
//           <button
//             className={`tab-btn ${activeTab === 'salary' ? 'active' : ''}`}
//             onClick={() => setActiveTab('salary')}
//           >
//             💰 Salary Information
//           </button>
//           <button
//             className={`tab-btn ${activeTab === 'resignation' ? 'active' : ''}`}
//             onClick={() => setActiveTab('resignation')}
//           >
//             📝 Resignation
//           </button>
//         </div>

//         {/* Profile Details Tab */}
//         {activeTab === 'profile' && (
//           <div className="tab-content">
//             <h3 className="section-title">📋 Personal Details</h3>
//             <div className="employee-details">
//               {profileDetails.map((detail, index) => (
//                 <div key={index} className="detail-item">
//                   <div className="detail-label">{detail.icon} {detail.label}</div>
//                   <div className="detail-value">{detail.value}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Salary Information Tab */}
//         {activeTab === 'salary' && (
//           <div className="tab-content">
//             {/* Salary Slip Section */}
//             <div className="salary-slip-section">
//               <div className="salary-header">
//                 <h3 className="salary-title">💰 Salary Slip</h3>
//                 <button className="download-btn" onClick={downloadSalarySlip}>
//                   📥 Download Slip
//                 </button>
//               </div>

//               {/* Month Navigation */}
//               <div className="month-navigation">
//                 <button 
//                   className="nav-btn"
//                   onClick={() => changeMonth(-1)}
//                 >
//                   ◀
//                 </button>
//                 <span className="current-month">
//                   {MONTHS[currentMonth]} {currentYear}
//                 </span>
//                 <button 
//                   className="nav-btn"
//                   onClick={() => changeMonth(1)}
//                 >
//                   ▶
//                 </button>
//               </div>

//               {/* Salary Summary Cards */}
//               <div className="salary-grid">
//                 <div className="salary-card earnings">
//                   <div className="salary-label">💵 Gross Salary</div>
//                   <div className="salary-value">{formatCurrency(grossSalary)}</div>
//                 </div>
//                 <div className="salary-card deductions">
//                   <div className="salary-label">📉 Total Deductions</div>
//                   <div className="salary-value">{formatCurrency(totalDeductions)}</div>
//                 </div>
//                 <div className="salary-card net">
//                   <div className="salary-label">💰 Net Salary</div>
//                   <div className="salary-value">{formatCurrency(netSalary)}</div>
//                 </div>
//               </div>

//               {/* Detailed Breakdown */}
//               <div className="salary-breakdown">
//                 <h4 className="breakdown-title">📊 Detailed Salary Breakdown</h4>
                
//                 <div className="breakdown-content">
//                   <div className="breakdown-section">
//                     <h5 className="section-title">💵 Earnings</h5>
//                     {salaryBreakdown
//                       .filter(item => item.type === 'earning')
//                       .map((item, index) => (
//                         <div key={index} className="breakdown-item">
//                           <span className="breakdown-label">{item.label}</span>
//                           <span className="breakdown-amount positive">
//                             {formatCurrency(item.amount)}
//                           </span>
//                         </div>
//                       ))}
//                     <div className="breakdown-total">
//                       <span className="total-label">Total Earnings</span>
//                       <span className="total-amount positive">
//                         {formatCurrency(grossSalary)}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="breakdown-section">
//                     <h5 className="section-title">📉 Deductions</h5>
//                     {salaryBreakdown
//                       .filter(item => item.type === 'deduction')
//                       .map((item, index) => (
//                         <div key={index} className="breakdown-item">
//                           <span className="breakdown-label">{item.label}</span>
//                           <span className="breakdown-amount negative">
//                             {formatCurrency(item.amount)}
//                           </span>
//                         </div>
//                       ))}
//                     <div className="breakdown-total">
//                       <span className="total-label">Total Deductions</span>
//                       <span className="total-amount negative">
//                         {formatCurrency(totalDeductions)}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Net Salary Card */}
//                 <div className="net-salary-card">
//                   <div className="net-salary-label">💰 NET SALARY (Take Home)</div>
//                   <div className="net-salary-value">{formatCurrency(netSalary)}</div>
//                   <div className="net-salary-note">
//                     Gross Salary {formatCurrency(grossSalary)} - Deductions {formatCurrency(totalDeductions)}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Resignation Tab */}
//         {activeTab === 'resignation' && (
//           <div className="tab-content">
//             <h3 className="section-title">📝 Resignation Request</h3>
//             <div className="resignation-form">
//               <div className="resignation-warning">
//                 <p>⚠️ Please fill this form carefully if you wish to resign from your position.</p>
//               </div>
              
//               <form onSubmit={handleResignation}>
//                 <div className="form-group">
//                   <label htmlFor="resignationDate">Last Working Day</label>
//                   <input 
//                     type="date" 
//                     id="resignationDate"
//                     value={resignationData.lastWorkingDay}
//                     onChange={(e) => handleResignationChange('lastWorkingDay', e.target.value)}
//                     required 
//                   />
//                 </div>
                
//                 <div className="form-group">
//                   <label htmlFor="resignationReason">Reason for Resignation *</label>
//                   <select 
//                     id="resignationReason"
//                     value={resignationData.reason}
//                     onChange={(e) => handleResignationChange('reason', e.target.value)}
//                     required
//                   >
//                     <option value="">Select reason...</option>
//                     <option value="Better Opportunity">Better Opportunity</option>
//                     <option value="Higher Studies">Higher Studies</option>
//                     <option value="Personal Reasons">Personal Reasons</option>
//                     <option value="Health Issues">Health Issues</option>
//                     <option value="Relocation">Relocation</option>
//                     <option value="Career Change">Career Change</option>
//                     <option value="Work-Life Balance">Work-Life Balance</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
                
//                 <div className="form-group">
//                   <label htmlFor="resignationDetails">Additional Details</label>
//                   <textarea 
//                     id="resignationDetails" 
//                     placeholder="Please provide more details about your resignation..."
//                     value={resignationData.details}
//                     onChange={(e) => handleResignationChange('details', e.target.value)}
//                     required
//                   ></textarea>
//                 </div>
                
//                 <button 
//                   type="submit" 
//                   className="submit-btn resignation-submit"
//                   disabled={resignationLoading}
//                 >
//                   {resignationLoading ? "Submitting..." : "📤 Submit Resignation Request"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </Modal>
//   );
// };

// export default ProfileModal;






// import React, { useState } from 'react';
// import Modal from '../common/Modal';
// import { calculateNetSalary, formatCurrency, getInitials } from '../../utils/helpers';
// import { SALARY_DATA, EMPLOYEE_DATA } from '../../data/mockData';
// import { MONTHS } from '../../utils/constants';
// import './ProfileModal.css';

// const ProfileModal = ({ isOpen, onClose, currentUser = EMPLOYEE_DATA }) => {
//   const [activeTab, setActiveTab] = useState('profile');
//   const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
//   const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
//   const [resignationLoading, setResignationLoading] = useState(false);
  
//   // Resignation form state
//   const [resignationData, setResignationData] = useState({
//     lastWorkingDay: '',
//     reason: '',
//     details: ''
//   });

//   const { grossSalary, totalDeductions, netSalary } = calculateNetSalary(SALARY_DATA);

//   // Calculate work anniversary
//   const calculateWorkAnniversary = () => {
//     const joinDate = new Date('2022-01-15'); // Based on EMPLOYEE_DATA.joiningDate
//     const today = new Date();
//     const years = today.getFullYear() - joinDate.getFullYear();
//     const months = today.getMonth() - joinDate.getMonth();
    
//     if (months < 0) {
//       return `${years - 1} years ${12 + months} months`;
//     }
//     return `${years} years ${months} months`;
//   };

//   const profileDetails = [
//     { label: 'Employee ID', value: currentUser.employeeId, icon: '🆔' },
//     { label: 'Full Name', value: currentUser.name, icon: '👤' },
//     { label: 'Designation', value: currentUser.designation, icon: '💼' },
//     { label: 'Department', value: currentUser.department, icon: '🏢' },
//     { label: 'Email', value: currentUser.email, icon: '📧' },
//     { label: 'Mobile', value: currentUser.phone, icon: '📱' },
//     { label: 'Date of Joining', value: currentUser.joiningDate, icon: '📅' },
//     { label: 'Work Anniversary', value: calculateWorkAnniversary(), icon: '🎉' },
//     { label: 'Birthday', value: currentUser.birthday, icon: '🎂' },
//     { label: 'Gender', value: currentUser.gender, icon: '⚧' },
//     { label: 'Address', value: currentUser.address, icon: '🏠' },
//     { label: 'Employee Type', value: 'Full Time', icon: '💰' }
//   ];

//   const salaryBreakdown = [
//     { label: 'Basic Salary', amount: SALARY_DATA.basic, type: 'earning' },
//     { label: 'House Rent Allowance (HRA)', amount: SALARY_DATA.hra, type: 'earning' },
//     { label: 'Dearness Allowance (DA)', amount: SALARY_DATA.da, type: 'earning' },
//     { label: 'Transport Allowance', amount: SALARY_DATA.transport, type: 'earning' },
//     { label: 'Special Allowance', amount: SALARY_DATA.special, type: 'earning' },
//     { label: 'Provident Fund (PF)', amount: SALARY_DATA.pf, type: 'deduction' },
//     { label: 'Professional Tax', amount: SALARY_DATA.professionalTax, type: 'deduction' },
//     { label: 'Income Tax (TDS)', amount: SALARY_DATA.incomeTax, type: 'deduction' },
//     { label: 'Employee State Insurance (ESI)', amount: SALARY_DATA.esi, type: 'deduction' }
//   ];

//   const changeMonth = (direction) => {
//     setCurrentMonth(prev => {
//       let newMonth = prev + direction;
//       if (newMonth > 11) {
//         setCurrentYear(prevYear => prevYear + 1);
//         return 0;
//       } else if (newMonth < 0) {
//         setCurrentYear(prevYear => prevYear - 1);
//         return 11;
//       }
//       return newMonth;
//     });
//   };

//   const downloadSalarySlip = () => {
//     // Simulate download
//     const slipData = {
//       employeeName: currentUser.name,
//       employeeId: currentUser.employeeId,
//       designation: currentUser.designation,
//       department: currentUser.department,
//       month: MONTHS[currentMonth],
//       year: currentYear,
//       grossSalary,
//       totalDeductions,
//       netSalary,
//       breakdown: salaryBreakdown
//     };
    
//     console.log('Downloading salary slip:', slipData);
    
//     // Create a downloadable PDF simulation
//     const blob = new Blob([JSON.stringify(slipData, null, 2)], { type: 'application/json' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `salary-slip-${MONTHS[currentMonth]}-${currentYear}.json`;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
    
//     showToast(`📥 Salary slip for ${MONTHS[currentMonth]} ${currentYear} downloaded!`, 'success');
//   };

//   const handleResignation = async (e) => {
//     e.preventDefault();
//     setResignationLoading(true);
    
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       const resignationPayload = {
//         ...resignationData,
//         employeeId: currentUser.employeeId,
//         employeeName: currentUser.name,
//         designation: currentUser.designation,
//         department: currentUser.department,
//         submittedAt: new Date().toISOString()
//       };
      
//       console.log('Resignation submitted:', resignationPayload);
      
//       showToast('📤 Resignation request submitted successfully!', 'success');
      
//       // Reset form
//       setResignationData({
//         lastWorkingDay: '',
//         reason: '',
//         details: ''
//       });
      
//       // Optionally switch back to profile tab
//       setTimeout(() => setActiveTab('profile'), 1000);
      
//     } catch (error) {
//       showToast('❌ Failed to submit resignation request', 'error');
//     } finally {
//       setResignationLoading(false);
//     }
//   };

//   const handleResignationChange = (field, value) => {
//     setResignationData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const showToast = (message, type) => {
//     // You can integrate with your toast system here
//     console.log(`${type}: ${message}`);
//     // If you have a toast context, use it here
//     // toastContext.showToast(message, type);
    
//     // Simple browser alert for demo
//     alert(message);
//   };

//   // Get user initials for profile picture
//   const userInitials = getInitials(currentUser.name);

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title="👤 Employee Profile & Salary"
//       size="large"
//     >
//       <div className="profile-modal-content">
//         {/* Profile Header */}
//         <div className="profile-header">
//           <div className="profile-picture">{userInitials}</div>
//           <h3>{currentUser.name}</h3>
//           <p>{currentUser.designation}</p>
//         </div>

//         {/* Navigation Tabs */}
//         <div className="profile-tabs">
//           <button
//             className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
//             onClick={() => setActiveTab('profile')}
//           >
//             📋 Personal Details
//           </button>
//           <button
//             className={`tab-btn ${activeTab === 'salary' ? 'active' : ''}`}
//             onClick={() => setActiveTab('salary')}
//           >
//             💰 Salary Information
//           </button>
//           <button
//             className={`tab-btn ${activeTab === 'resignation' ? 'active' : ''}`}
//             onClick={() => setActiveTab('resignation')}
//           >
//             📝 Resignation
//           </button>
//         </div>

//         {/* Profile Details Tab */}
//         {activeTab === 'profile' && (
//           <div className="tab-content">
//             <h3 style={{ margin: "30px 0 20px 0", color: "#1e293b", fontSize: "22px" }}>
//               📋 Personal Details
//             </h3>
//             <div className="employee-details">
//               {profileDetails.map((detail, index) => (
//                 <div key={index} className="detail-item">
//                   <div className="detail-label">{detail.icon} {detail.label}</div>
//                   <div className="detail-value">{detail.value}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Salary Information Tab */}
//         {activeTab === 'salary' && (
//           <div className="tab-content">
//             {/* Salary Slip Section */}
//             <div className="salary-slip-section">
//               <div className="salary-header">
//                 <h3>💰 Salary Slip</h3>
//                 <button className="download-slip-btn" onClick={downloadSalarySlip}>
//                   <span>📥</span>
//                   <span>Download Slip</span>
//                 </button>
//               </div>

//               {/* Month Navigation */}
//               <div className="salary-month">
//                 <div className="salary-month-nav">
//                   <button className="month-btn" onClick={() => changeMonth(-1)} title="Previous Month">
//                     ◀
//                   </button>
//                   <span className="current-month">
//                     {MONTHS[currentMonth]} {currentYear}
//                   </span>
//                   <button className="month-btn" onClick={() => changeMonth(1)} title="Next Month">
//                     ▶
//                   </button>
//                 </div>
//               </div>

//               {/* Salary Summary Cards */}
//               <div className="salary-grid">
//                 <div className="salary-card earnings">
//                   <div className="salary-label">💵 Gross Salary</div>
//                   <div className="salary-value">{formatCurrency(grossSalary)}</div>
//                 </div>
//                 <div className="salary-card deductions">
//                   <div className="salary-label">📉 Total Deductions</div>
//                   <div className="salary-value">{formatCurrency(totalDeductions)}</div>
//                 </div>
//                 <div className="salary-card earnings">
//                   <div className="salary-label">💰 Net Salary</div>
//                   <div className="salary-value">{formatCurrency(netSalary)}</div>
//                 </div>
//               </div>

//               {/* Detailed Breakdown */}
//               <div className="salary-breakdown">
//                 <div className="breakdown-header">
//                   📊 Detailed Salary Breakdown
//                 </div>
//                 <div className="breakdown-content">
//                   <div className="breakdown-section">
//                     <div className="breakdown-title">💵 Earnings</div>
//                     {salaryBreakdown
//                       .filter(item => item.type === 'earning')
//                       .map((item, index) => (
//                         <div key={index} className="breakdown-item">
//                           <span className="breakdown-label">{item.label}</span>
//                           <span className="breakdown-amount positive">
//                             {formatCurrency(item.amount)}
//                           </span>
//                         </div>
//                       ))}
//                     <div className="breakdown-item total-item">
//                       <span className="breakdown-label total-label">Total Earnings</span>
//                       <span className="breakdown-amount positive total-amount">
//                         {formatCurrency(grossSalary)}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="breakdown-section">
//                     <div className="breakdown-title">📉 Deductions</div>
//                     {salaryBreakdown
//                       .filter(item => item.type === 'deduction')
//                       .map((item, index) => (
//                         <div key={index} className="breakdown-item">
//                           <span className="breakdown-label">{item.label}</span>
//                           <span className="breakdown-amount negative">
//                             {formatCurrency(item.amount)}
//                           </span>
//                         </div>
//                       ))}
//                     <div className="breakdown-item total-item">
//                       <span className="breakdown-label total-label">Total Deductions</span>
//                       <span className="breakdown-amount negative total-amount">
//                         {formatCurrency(totalDeductions)}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Net Salary Card */}
//               <div className="net-salary-card">
//                 <div className="net-salary-label">💰 NET SALARY (Take Home)</div>
//                 <div className="net-salary-value">{formatCurrency(netSalary)}</div>
//                 <div className="net-salary-note">
//                   Gross Salary {formatCurrency(grossSalary)} - Deductions {formatCurrency(totalDeductions)}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Resignation Tab */}
//         {activeTab === 'resignation' && (
//           <div className="tab-content">
//             <h3 style={{ margin: "30px 0 20px 0", color: "#1e293b", fontSize: "22px" }}>
//               📝 Resignation Request
//             </h3>
//             <div className="leave-form resignation-form">
//               <p style={{ color: "#991b1b", marginBottom: "20px", fontWeight: "600", fontSize: "14px" }}>
//                 ⚠️ Please fill this form carefully if you wish to resign from your position.
//               </p>
              
//               <form onSubmit={handleResignation}>
//                 <div className="form-group">
//                   <label htmlFor="resignationDate">Last Working Day</label>
//                   <input 
//                     type="date" 
//                     id="resignationDate"
//                     value={resignationData.lastWorkingDay}
//                     onChange={(e) => handleResignationChange('lastWorkingDay', e.target.value)}
//                     required 
//                   />
//                 </div>
                
//                 <div className="form-group">
//                   <label htmlFor="resignationReason">Reason for Resignation *</label>
//                   <select 
//                     id="resignationReason"
//                     value={resignationData.reason}
//                     onChange={(e) => handleResignationChange('reason', e.target.value)}
//                     required
//                   >
//                     <option value="">Select reason...</option>
//                     <option value="Better Opportunity">Better Opportunity</option>
//                     <option value="Higher Studies">Higher Studies</option>
//                     <option value="Personal Reasons">Personal Reasons</option>
//                     <option value="Health Issues">Health Issues</option>
//                     <option value="Relocation">Relocation</option>
//                     <option value="Career Change">Career Change</option>
//                     <option value="Work-Life Balance">Work-Life Balance</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
                
//                 <div className="form-group">
//                   <label htmlFor="resignationDetails">Additional Details</label>
//                   <textarea 
//                     id="resignationDetails" 
//                     placeholder="Please provide more details about your resignation..."
//                     value={resignationData.details}
//                     onChange={(e) => handleResignationChange('details', e.target.value)}
//                     required
//                   ></textarea>
//                 </div>
                
//                 <button 
//                   type="submit" 
//                   className="submit-btn resignation-submit-btn"
//                   disabled={resignationLoading}
//                 >
//                   {resignationLoading ? "Submitting..." : "📤 Submit Resignation Request"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </Modal>
//   );
// };

// export default ProfileModal;









// import React, { useState } from 'react';
// import Modal from '../common/Modal';
// import { getInitials } from '../../utils/helpers';
// import { EMPLOYEE_DATA } from '../../data/mockData';
// import './ProfileModal.css';

// const ProfileModal = ({ isOpen, onClose, currentUser = EMPLOYEE_DATA }) => {
//   const [resignationLoading, setResignationLoading] = useState(false);
  
//   // Resignation form state
//   const [resignationData, setResignationData] = useState({
//     lastWorkingDay: '',
//     reason: '',
//     details: ''
//   });

//   // Calculate work anniversary
//   const calculateWorkAnniversary = () => {
//     const joinDate = new Date('2022-01-15'); // Based on EMPLOYEE_DATA.joiningDate
//     const today = new Date();
//     const years = today.getFullYear() - joinDate.getFullYear();
//     const months = today.getMonth() - joinDate.getMonth();
    
//     if (months < 0) {
//       return `${years - 1} years ${12 + months} months`;
//     }
//     return `${years} years ${months} months`;
//   };

//   const profileDetails = [
//     { label: 'Employee ID', value: currentUser.employeeId, icon: '🆔' },
//     { label: 'Full Name', value: currentUser.name, icon: '👤' },
//     { label: 'Designation', value: currentUser.designation, icon: '💼' },
//     { label: 'Department', value: currentUser.department, icon: '🏢' },
//     { label: 'Email', value: currentUser.email, icon: '📧' },
//     { label: 'Mobile', value: currentUser.phone, icon: '📱' },
//     { label: 'Date of Joining', value: currentUser.joiningDate, icon: '📅' },
//     { label: 'Work Anniversary', value: calculateWorkAnniversary(), icon: '🎉' },
//     { label: 'Birthday', value: currentUser.birthday, icon: '🎂' },
//     { label: 'Gender', value: currentUser.gender, icon: '⚧' },
//     { label: 'Address', value: currentUser.address, icon: '🏠' },
//     { label: 'Employee Type', value: 'Full Time', icon: '💰' }
//   ];

//   const handleResignation = async (e) => {
//     e.preventDefault();
//     setResignationLoading(true);
    
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       const resignationPayload = {
//         ...resignationData,
//         employeeId: currentUser.employeeId,
//         employeeName: currentUser.name,
//         designation: currentUser.designation,
//         department: currentUser.department,
//         submittedAt: new Date().toISOString()
//       };
      
//       console.log('Resignation submitted:', resignationPayload);
      
//       showToast('📤 Resignation request submitted successfully!', 'success');
      
//       // Reset form
//       setResignationData({
//         lastWorkingDay: '',
//         reason: '',
//         details: ''
//       });
      
//     } catch (error) {
//       showToast('❌ Failed to submit resignation request', 'error');
//     } finally {
//       setResignationLoading(false);
//     }
//   };

//   const handleResignationChange = (field, value) => {
//     setResignationData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const showToast = (message, type) => {
//     // You can integrate with your toast system here
//     console.log(`${type}: ${message}`);
//     // Simple browser alert for demo
//     alert(message);
//   };

//   // Get user initials for profile picture
//   const userInitials = getInitials(currentUser.name);

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title="👤 Employee Profile"
//       size="large"
//     >
//       <div className="profile-modal-content">
//         {/* Profile Header */}
//         <div className="profile-header">
//           <div className="profile-picture">{userInitials}</div>
//           <h3>{currentUser.name}</h3>
//           <p>{currentUser.designation}</p>
//         </div>

//         {/* Personal Details Section */}
//         <div className="section-container">
//           <h3 className="section-title">📋 Personal Details</h3>
//           <div className="employee-details">
//             {profileDetails.map((detail, index) => (
//               <div key={index} className="detail-item">
//                 <div className="detail-label">{detail.icon} {detail.label}</div>
//                 <div className="detail-value">{detail.value}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Resignation Section */}
//         <div className="section-container">
//           <h3 className="section-title">📝 Resignation Request</h3>
//           <div className="leave-form resignation-form">
//             <p className="resignation-warning-text">
//               ⚠️ Please fill this form carefully if you wish to resign from your position.
//             </p>
            
//             <form onSubmit={handleResignation}>
//               <div className="form-group">
//                 <label htmlFor="resignationDate">Last Working Day</label>
//                 <input 
//                   type="date" 
//                   id="resignationDate"
//                   value={resignationData.lastWorkingDay}
//                   onChange={(e) => handleResignationChange('lastWorkingDay', e.target.value)}
//                   required 
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label htmlFor="resignationReason">Reason for Resignation *</label>
//                 <select 
//                   id="resignationReason"
//                   value={resignationData.reason}
//                   onChange={(e) => handleResignationChange('reason', e.target.value)}
//                   required
//                 >
//                   <option value="">Select reason...</option>
//                   <option value="Better Opportunity">Better Opportunity</option>
//                   <option value="Higher Studies">Higher Studies</option>
//                   <option value="Personal Reasons">Personal Reasons</option>
//                   <option value="Health Issues">Health Issues</option>
//                   <option value="Relocation">Relocation</option>
//                   <option value="Career Change">Career Change</option>
//                   <option value="Work-Life Balance">Work-Life Balance</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
              
//               <div className="form-group">
//                 <label htmlFor="resignationDetails">Additional Details</label>
//                 <textarea 
//                   id="resignationDetails" 
//                   placeholder="Please provide more details about your resignation..."
//                   value={resignationData.details}
//                   onChange={(e) => handleResignationChange('details', e.target.value)}
//                   required
//                 ></textarea>
//               </div>
              
//               <button 
//                 type="submit" 
//                 className="submit-btn resignation-submit-btn"
//                 disabled={resignationLoading}
//               >
//                 {resignationLoading ? "Submitting..." : "📤 Submit Resignation Request"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default ProfileModal;



// api ====+++



// import React, { useState } from 'react';
// import Modal from '../common/Modal';
// import { getInitials } from '../../utils/helpers';
// import { EMPLOYEE_DATA } from '../../data/mockData';
// import './ProfileModal.css';

// const ProfileModal = ({ isOpen, onClose, currentUser = EMPLOYEE_DATA }) => {
//   // ✅ FIX: Ensure currentUser is never null
//   const user = currentUser || EMPLOYEE_DATA;
  
//   const [resignationLoading, setResignationLoading] = useState(false);
  
//   // Resignation form state
//   const [resignationData, setResignationData] = useState({
//     lastWorkingDay: '',
//     reason: '',
//     details: ''
//   });

//   // Calculate work anniversary
//   const calculateWorkAnniversary = () => {
//     const joinDate = new Date('2022-01-15'); // Based on EMPLOYEE_DATA.joiningDate
//     const today = new Date();
//     const years = today.getFullYear() - joinDate.getFullYear();
//     const months = today.getMonth() - joinDate.getMonth();
    
//     if (months < 0) {
//       return `${years - 1} years ${12 + months} months`;
//     }
//     return `${years} years ${months} months`;
//   };

//   const profileDetails = [
//     { label: 'Employee ID', value: user.employeeId, icon: '🆔' },
//     { label: 'Full Name', value: user.name, icon: '👤' },
//     { label: 'Designation', value: user.designation, icon: '💼' },
//     { label: 'Department', value: user.department, icon: '🏢' },
//     { label: 'Email', value: user.email, icon: '📧' },
//     { label: 'Mobile', value: user.phone, icon: '📱' },
//     { label: 'Date of Joining', value: user.joiningDate, icon: '📅' },
//     { label: 'Work Anniversary', value: calculateWorkAnniversary(), icon: '🎉' },
//     { label: 'Birthday', value: user.birthday, icon: '🎂' },
//     { label: 'Gender', value: user.gender, icon: '⚧' },
//     { label: 'Address', value: user.address, icon: '🏠' },
//     { label: 'Employee Type', value: 'Full Time', icon: '💰' }
//   ];

//   const handleResignation = async (e) => {
//     e.preventDefault();
//     setResignationLoading(true);
    
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       const resignationPayload = {
//         ...resignationData,
//         employeeId: user.employeeId,
//         employeeName: user.name,
//         designation: user.designation,
//         department: user.department,
//         submittedAt: new Date().toISOString()
//       };
      
//       console.log('Resignation submitted:', resignationPayload);
      
//       showToast('📤 Resignation request submitted successfully!', 'success');
      
//       // Reset form
//       setResignationData({
//         lastWorkingDay: '',
//         reason: '',
//         details: ''
//       });
      
//     } catch (error) {
//       showToast('❌ Failed to submit resignation request', 'error');
//     } finally {
//       setResignationLoading(false);
//     }
//   };

//   const handleResignationChange = (field, value) => {
//     setResignationData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const showToast = (message, type) => {
//     console.log(`${type}: ${message}`);
//     alert(message);
//   };

//   // Get user initials for profile picture
//   const userInitials = getInitials(user.name);

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title="👤 Employee Profile"
//       size="large"
//     >
//       <div className="profile-modal-content">
//         {/* Profile Header */}
//         <div className="profile-header">
//           <div className="profile-picture">{userInitials}</div>
//           <h3>{user.name}</h3>
//           <p>{user.designation}</p>
//         </div>

//         {/* Personal Details Section */}
//         <div className="section-container">
//           <h3 className="section-title">📋 Personal Details</h3>
//           <div className="employee-details">
//             {profileDetails.map((detail, index) => (
//               <div key={index} className="detail-item">
//                 <div className="detail-label">{detail.icon} {detail.label}</div>
//                 <div className="detail-value">{detail.value}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Resignation Section */}
//         <div className="section-container">
//           <h3 className="section-title">📝 Resignation Request</h3>
//           <div className="leave-form resignation-form">
//             <p className="resignation-warning-text">
//               ⚠️ Please fill this form carefully if you wish to resign from your position.
//             </p>
            
//             <form onSubmit={handleResignation}>
//               <div className="form-group">
//                 <label htmlFor="resignationDate">Last Working Day</label>
//                 <input 
//                   type="date" 
//                   id="resignationDate"
//                   value={resignationData.lastWorkingDay}
//                   onChange={(e) => handleResignationChange('lastWorkingDay', e.target.value)}
//                   required 
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label htmlFor="resignationReason">Reason for Resignation *</label>
//                 <select 
//                   id="resignationReason"
//                   value={resignationData.reason}
//                   onChange={(e) => handleResignationChange('reason', e.target.value)}
//                   required
//                 >
//                   <option value="">Select reason...</option>
//                   <option value="Better Opportunity">Better Opportunity</option>
//                   <option value="Higher Studies">Higher Studies</option>
//                   <option value="Personal Reasons">Personal Reasons</option>
//                   <option value="Health Issues">Health Issues</option>
//                   <option value="Relocation">Relocation</option>
//                   <option value="Career Change">Career Change</option>
//                   <option value="Work-Life Balance">Work-Life Balance</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
              
//               <div className="form-group">
//                 <label htmlFor="resignationDetails">Additional Details</label>
//                 <textarea 
//                   id="resignationDetails" 
//                   placeholder="Please provide more details about your resignation..."
//                   value={resignationData.details}
//                   onChange={(e) => handleResignationChange('details', e.target.value)}
//                   required
//                 ></textarea>
//               </div>
              
//               <button 
//                 type="submit" 
//                 className="submit-btn resignation-submit-btn"
//                 disabled={resignationLoading}
//               >
//                 {resignationLoading ? "Submitting..." : "📤 Submit Resignation Request"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default ProfileModal;



// +++++++++profile api


import React, { useState, useEffect, useRef } from 'react';
import Modal from '../common/Modal';
import { getInitials } from '../../utils/helpers';
import { EMPLOYEE_DATA } from '../../data/mockData';
import { useDispatch, useSelector } from "react-redux";
import {
  uploadProfilePicture,
  resetProfileState,
} from "../../redux/slices/profileSlice";

import { FiCamera } from "react-icons/fi";

import { updateProfilePicture } from "../../redux/slices/authSlice";


import './ProfileModal.css';

const ProfileModal = ({ isOpen, onClose, currentUser = EMPLOYEE_DATA }) => {
  // ✅ FIX: Ensure currentUser is never null
  const user = currentUser || EMPLOYEE_DATA;



  const dispatch = useDispatch();

const { loading, success, error } = useSelector(
  (state) => state.profile
);

  
  // ✅ NEW STATES FOR PROFILE PICTURE UPLOAD
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [profileData, setProfileData] = useState(user);
  
  const fileInputRef = useRef(null);
  
  const [resignationLoading, setResignationLoading] = useState(false);
  
  // Resignation form state
  const [resignationData, setResignationData] = useState({
    lastWorkingDay: '',
    reason: '',
    details: ''
  });

  // ✅ INITIALIZE PROFILE PICTURE ON LOAD
  // useEffect(() => {
  //   if (user) {
  //     setProfileData(user);
      
  //     // Load existing profile picture
  //     if (user.profilePicture && user.profilePicture !== 'default_avatar_url') {
  //       // Check if it's already a full URL or just filename
  //       if (user.profilePicture.startsWith('http')) {
  //         setPreviewUrl(user.profilePicture);
  //       } else {
  //         setPreviewUrl(`http://localhost:5000/uploads/${user.profilePicture}`);
  //       }
  //     }
  //   }
  // }, [user, isOpen]);


  useEffect(() => {
  if (!user) return;

  // user data load
  setProfileData(user);

  // ✅ Cloudinary / absolute URL direct use karo
  if (user.profilePicture) {
    setPreviewUrl(user.profilePicture);

  } else {
    setPreviewUrl(""); // ya default avatar
  }
}, [user, isOpen]);

  // ✅ HANDLE FILE SELECTION
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setUploadMessage('❌ Please select a valid image (JPEG, PNG, GIF, WebP)');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setUploadMessage('❌ File size should be less than 5MB');
        return;
      }
      
      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      
      setUploadMessage('');
    }
  };

  // ✅ HANDLE PROFILE PICTURE UPLOAD API
  // const handleUpload = async () => {
  //   if (!selectedFile) {
  //     setUploadMessage('❌ Please select an image first');
  //     return;
  //   }

  //   if (!user?.employeeId) {
  //     setUploadMessage('❌ Employee ID not found');
  //     return;
  //   }

  //   setUploadLoading(true);
  //   setUploadMessage('Uploading...');

  //   try {
  //     const formData = new FormData();
  //     formData.append('profilePicture', selectedFile);
      
  //     // Get token from localStorage
  //     const token = localStorage.getItem('token');
      
  //     if (!token) {
  //       setUploadMessage('❌ Authentication required. Please login again.');
  //       return;
  //     }
      
  //     // ✅ API CALL TO UPLOAD PROFILE PICTURE
  //     const response = await axios.post(
  //       `http://localhost:5000/api/users/profile/picture/${user.employeeId}`,
  //       formData,
  //       {
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //           'Content-Type': 'multipart/form-data'
  //         }
  //       }
  //     );

  //     console.log('Upload API Response:', response.data);

  //     if (response.data.status === true) {
  //       setUploadMessage('✅ Profile picture updated successfully!');
        
  //       // Update preview with new image
  //       if (response.data.data?.profilePicture) {
  //         const newImageUrl = `http://localhost:5000/uploads/${response.data.data.profilePicture}?t=${Date.now()}`;
  //         setPreviewUrl(newImageUrl);
          
  //         // Update profile data
  //         setProfileData(prev => ({
  //           ...prev,
  //           profilePicture: response.data.data.profilePicture
  //         }));
  //       }
        
  //       // Clear selected file
  //       setSelectedFile(null);
  //       if (fileInputRef.current) {
  //         fileInputRef.current.value = '';
  //       }
        
  //       // Show success message for 3 seconds
  //       setTimeout(() => {
  //         setUploadMessage('');
  //       }, 3000);
  //     } else {
  //       setUploadMessage(`❌ ${response.data.message || 'Upload failed'}`);
  //     }
  //   } catch (error) {
  //     console.error('Upload API Error:', error);
  //     let errorMsg = 'Upload failed. Please try again.';
      
  //     if (error.response) {
  //       errorMsg = error.response.data?.message || `Server error: ${error.response.status}`;
  //     } else if (error.request) {
  //       errorMsg = 'Network error. Check your connection.';
  //     }
      
  //     setUploadMessage(`❌ ${errorMsg}`);
  //   } finally {
  //     setUploadLoading(false);
  //   }
  // };

// const handleUpload = async () => {
//   if (!selectedFile) {
//     setUploadMessage("❌ Please select an image first");
//     return;
//   }

//   if (!user?.employeeId) {
//     setUploadMessage("❌ Employee ID not found");
//     return;
//   }

//   try {
//     await dispatch(
//       uploadProfilePicture({
//         employeeId: user.employeeId,
//         file: selectedFile,
//       })
//     ).unwrap();

//     setUploadMessage("✅ Profile picture updated successfully!");

//     // const newImageUrl = `http://localhost:5000/uploads/${selectedFile.name}?t=${Date.now()}`;
//     // setPreviewUrl(newImageUrl);

//     const newImageUrl = `http://localhost:5000/uploads/${user.employeeId}?t=${Date.now()}`;
//     setPreviewUrl(newImageUrl);

//     setSelectedFile(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";

//     setTimeout(() => {
//       dispatch(resetProfileState());
//       setUploadMessage("");
//     }, 3000);
//   } catch (err) {
//     setUploadMessage(
//       err?.message || "❌ Upload failed. Please try again."
//     );
//   }
// };


// const handleUpload = async () => {
//   if (!selectedFile) {
//     setUploadMessage("❌ Please select an image first");
//     return;
//   }

//   try {
//     const result = await dispatch(
//       uploadProfilePicture({
//         employeeId: user.employeeId,
//         file: selectedFile,
//       })
//     ).unwrap();

//     // ✅ YAHI MAIN FIX HAI
//     const uploadedImageUrl = result.data.profilePicture;

//     // ✅ UI ko bolo: naya image ye hai
//     setPreviewUrl(uploadedImageUrl);

//     // ✅ local profile data bhi update karo
//     setProfileData((prev) => ({
//       ...prev,
//       profilePicture: uploadedImageUrl,
//     }));

//     dispatch(updateProfilePicture(uploadedImageUrl));

//     setUploadMessage("✅ Profile picture updated successfully!");
//     setSelectedFile(null);

//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }

//   } catch (err) {
//     setUploadMessage("❌ Upload failed");
//   }
// };


const handleUpload = async () => {
  if (!selectedFile) {
    setUploadMessage("❌ Please select an image first");

    // ⏳ auto clear error
    setTimeout(() => setUploadMessage(""), 2500);
    return;
  }

  try {
    const result = await dispatch(
      uploadProfilePicture({
        employeeId: user.employeeId,
        file: selectedFile,
      })
    ).unwrap();

    const uploadedImageUrl = result.data.profilePicture;

    setPreviewUrl(uploadedImageUrl);
    setProfileData((prev) => ({
      ...prev,
      profilePicture: uploadedImageUrl,
    }));

    dispatch(updateProfilePicture(uploadedImageUrl));

    setUploadMessage("✅ Profile picture updated successfully!");

    // ⏳ AUTO HIDE SUCCESS MESSAGE
    setTimeout(() => {
      setUploadMessage("");
    }, 2500);

    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

  } catch (err) {
    setUploadMessage("❌ Upload failed");

    // ⏳ auto clear error
    setTimeout(() => setUploadMessage(""), 2500);
  }
};


  // ✅ TRIGGER FILE INPUT CLICK
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Calculate work anniversary
  const calculateWorkAnniversary = () => {
    const joinDate = new Date(user.joiningDate || '2022-01-15');
    const today = new Date();
    const years = today.getFullYear() - joinDate.getFullYear();
    const months = today.getMonth() - joinDate.getMonth();
    
    if (months < 0) {
      return `${years - 1} years ${12 + months} months`;
    }
    return `${years} years ${months} months`;
  };

  // ✅ UPDATED PROFILE DETAILS WITH API DATA
  const profileDetails = [
    { label: 'Employee ID', value: profileData.employeeId || user.employeeId, icon: '🆔' },
    { label: 'Full Name', value: profileData.name || user.name, icon: '👤' },
    { label: 'Designation', value: profileData.designation || user.designation, icon: '💼' },
    { label: 'Department', value: profileData.department || user.department, icon: '🏢' },
    { label: 'Email', value: profileData.email || user.email, icon: '📧' },
    { label: 'Mobile', value: profileData.mobile || user.phone, icon: '📱' },
    { label: 'Date of Joining', value: user.joiningDate, icon: '📅' },
    { label: 'Work Anniversary', value: calculateWorkAnniversary(), icon: '🎉' },
    { label: 'Birthday', value: user.birthday || profileData.birthday, icon: '🎂' },
    { label: 'Gender', value: user.gender || profileData.gender, icon: '⚧' },
    { label: 'Address', value: user.address || profileData.address, icon: '🏠' },
    { label: 'Employee Type', value: 'Full Time', icon: '💰' }
  ];

  const handleResignation = async (e) => {
    e.preventDefault();
    setResignationLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const resignationPayload = {
        ...resignationData,
        employeeId: user.employeeId,
        employeeName: user.name,
        designation: user.designation,
        department: user.department,
        submittedAt: new Date().toISOString()
      };
      
      console.log('Resignation submitted:', resignationPayload);
      
      showToast('📤 Resignation request submitted successfully!', 'success');
      
      // Reset form
      setResignationData({
        lastWorkingDay: '',
        reason: '',
        details: ''
      });
      
    } catch (error) {
      showToast('❌ Failed to submit resignation request', 'error');
    } finally {
      setResignationLoading(false);
    }
  };

  const handleResignationChange = (field, value) => {
    setResignationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const showToast = (message, type) => {
    console.log(`${type}: ${message}`);
    alert(message);
  };

  // ✅ GET USER INITIALS OR SHOW PROFILE PICTURE
  const userInitials = getInitials(profileData.name || user.name);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="👤 Employee Profile"
      size="large"
    >
      <div className="profile-modal-content">
        {/* ✅ UPDATED PROFILE HEADER WITH PICTURE UPLOAD */}
        <div className="profile-header">
          <div className="profile-picture-container">
            {/* {previewUrl ? (
              <img 
                src={previewUrl} 
                alt="Profile" 
                className="profile-picture-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null} */}



             {previewUrl ? (
    <img 
      src={previewUrl} 
      alt="Profile" 
      className="profile-picture-img"
      onError={(e) => {
        // If image fails to load, hide it and show fallback
        e.target.style.display = 'none';
        // Find the fallback element and show it
        const container = e.target.closest('.profile-picture-container');
        const fallback = container?.querySelector('.profile-picture-fallback');
        if (fallback) {
          fallback.style.display = 'flex';
          fallback.classList.remove('hidden');
        }
      }}
    />
  ) : null}
            
            {/* <div className={`profile-picture-fallback ${previewUrl ? 'hidden' : ''}`}>
              {userInitials}
            </div> */}

             <div 
    className={`profile-picture-fallback ${previewUrl ? 'hidden' : ''}`}
    style={{ display: previewUrl ? 'none' : 'flex' }}
  >
    {userInitials}
  </div>
            
            {/* Profile Picture Upload Controls */}
            <div className="profile-upload-controls">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                style={{ display: 'none' }}
              />
              
              {/* <button 
                className="upload-change-btn"
                onClick={triggerFileInput}
                disabled={uploadLoading}
              >
                📁 Change Photo
              </button> */}


              <button
  className="upload-change-btn"
  onClick={triggerFileInput}
  disabled={uploadLoading}
>
  <span className="upload-icon"><FiCamera /></span>
  <span className="upload-text">
    {uploadLoading ? "Uploading..." : "Change Photo"}
  </span>
</button>

              
              {selectedFile && (
                // <button 
                //   className="upload-submit-btn"
                //   onClick={handleUpload}
                //   disabled={uploadLoading}
                // >
                //   {uploadLoading ? '⏳ Uploading...' : '📤 Upload'}
                // </button>

                <button
  className="upload-submit-btn"
  onClick={handleUpload}
  disabled={loading}
>
  {loading ? "⏳ Uploading..." : "📤 Upload"}
</button>

              )}
            </div>
          </div>
          
          <h3>{profileData.name || user.name}</h3>
          <p>{profileData.designation || user.designation}</p>
          
          {/* Upload Message Display */}
          {uploadMessage && (
            <div className={`upload-message ${uploadMessage.includes('✅') ? 'success' : 'error'}`}>
              {uploadMessage}
            </div>
          )}
          
          {selectedFile && (
            <div className="file-info">
              Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
            </div>
          )}
        </div>

        {/* Personal Details Section */}
        <div className="section-container">
          <h3 className="section-title">📋 Personal Details</h3>
          <div className="employee-details">
            {profileDetails.map((detail, index) => (
              <div key={index} className="detail-item">
                <div className="detail-label">{detail.icon} {detail.label}</div>
                <div className="detail-value">{detail.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Resignation Section */}
        <div className="section-container">
          <h3 className="section-title">📝 Resignation Request</h3>
          <div className="leave-form resignation-form">
            <p className="resignation-warning-text">
              ⚠️ Please fill this form carefully if you wish to resign from your position.
            </p>
            
            <form onSubmit={handleResignation}>
              <div className="form-group">
                <label htmlFor="resignationDate">Last Working Day</label>
                <input 
                  type="date" 
                  id="resignationDate"
                  value={resignationData.lastWorkingDay}
                  onChange={(e) => handleResignationChange('lastWorkingDay', e.target.value)}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="resignationReason">Reason for Resignation *</label>
                <select 
                  id="resignationReason"
                  value={resignationData.reason}
                  onChange={(e) => handleResignationChange('reason', e.target.value)}
                  required
                >
                  <option value="">Select reason...</option>
                  <option value="Better Opportunity">Better Opportunity</option>
                  <option value="Higher Studies">Higher Studies</option>
                  <option value="Personal Reasons">Personal Reasons</option>
                  <option value="Health Issues">Health Issues</option>
                  <option value="Relocation">Relocation</option>
                  <option value="Career Change">Career Change</option>
                  <option value="Work-Life Balance">Work-Life Balance</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="resignationDetails">Additional Details</label>
                <textarea 
                  id="resignationDetails" 
                  placeholder="Please provide more details about your resignation..."
                  value={resignationData.details}
                  onChange={(e) => handleResignationChange('details', e.target.value)}
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="submit-btn resignation-submit-btn"
                disabled={resignationLoading || uploadLoading}
              >
                {resignationLoading ? "Submitting..." : "📤 Submit Resignation Request"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;