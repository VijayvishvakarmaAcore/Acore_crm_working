// import React, { useState, useEffect } from 'react';
// import './Dashboard.css';
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDashboardData } from "../../redux/slices/dashboardSlice";


// const Dashboard = () => {
//   // const [dashboardData, setDashboardData] = useState({
//   //   projects: 0,
//   //   tasks: 0,
//   //   users: 0,
//   //   clients: 0,
//   //   projectStatus: [],
//   //   taskStatus: [],
//   //   recentUpdates: []
//   // });

//   // const [loading, setLoading] = useState(true);



//   const dispatch = useDispatch();

// const { 
//   projects,
//   tasks,
//   projectStatus,
//   taskStatus,
//   recentUpdates,
//   loading 
// } = useSelector(state => state.dashboard);


//   // Fetch data on component mount
//   // useEffect(() => {
//   //   setLoading(true);
//   //   setTimeout(() => {
//   //     setDashboardData({
//   //       projects: 5,
//   //       tasks: 19,
//   //       users: 32,
//   //       clients: 22,
//   //       projectStatus: [
//   //         { status: 'In Progress', count: 4, color: '#3b82f6' },
//   //         { status: 'Completed', count: 1, color: '#10b981' },
//   //         { status: 'On Hold', count: 0, color: '#f59e0b' },
//   //         { status: 'Cancelled', count: 0, color: '#ef4444' }
//   //       ],
//   //       taskStatus: [
//   //         { status: 'Completed', count: 6, color: '#10b981' },
//   //         { status: 'In Progress', count: 8, color: '#3b82f6' },
//   //         { status: 'Pending', count: 3, color: '#f59e0b' },
//   //         { status: 'On Hold', count: 2, color: '#ef4444' }
//   //       ],
//   //       recentUpdates: [
//   //         { type: 'project', title: 'Customer Satisfaction Improvement Initiative', status: 'In Progress', date: '15-Nov-2024' },
//   //         { type: 'task', title: 'Server Configuration [IT Infrastructure Upgrade]', assignedTo: 'John Smith', dueDate: '24-Nov-2025' },
//   //         { type: 'project', title: 'Website Redesign', status: 'In Progress', date: '25-Feb-2024' },
//   //         { type: 'task', title: 'Homepage Design [Website Redesign]', assignedTo: 'John Smith', dueDate: '14-Oct-2025' }
//   //       ]
//   //     });
//   //     setLoading(false);
//   //   }, 1000);
//   // }, []);


//   const userId = profile?._id || profile?.employeeId; // agar profile already global hai use karo
// // warna jis se tum user le rahe ho woh laga do

// useEffect(() => {
//   if(!userId) return;
//   dispatch(fetchDashboardData(userId));
// }, [userId, dispatch]);


//   // Chart rendering functions (same as before)
//   const renderProjectChart = () => {
//     const total = dashboardData.projectStatus.reduce((sum, item) => sum + item.count, 0);
    
//     return (
//       <div className="chart-container">
//         <div className="chart-title">Projects Status</div>
//         <div className="chart-bar-container">
//           {dashboardData.projectStatus.map((item, index) => {
//             if (total === 0) return null;
//             const percentage = (item.count / total) * 100;
//             return (
//               <div key={index} className="chart-bar-item">
//                 <div className="chart-bar-label">
//                   <span className="chart-status-dot" style={{ backgroundColor: item.color }}></span>
//                   <span className="chart-status-name">{item.status}</span>
//                   <span className="chart-status-count">({item.count})</span>
//                 </div>
//                 <div className="chart-bar-bg">
//                   <div 
//                     className="chart-bar-fill" 
//                     style={{ 
//                       width: `${percentage}%`,
//                       backgroundColor: item.color 
//                     }}
//                   ></div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   const renderTaskChart = () => {
//     const total = dashboardData.taskStatus.reduce((sum, item) => sum + item.count, 0);
    
//     return (
//       <div className="chart-container">
//         <div className="chart-title">Tasks Overview</div>
//         <div className="chart-donut-container">
//           <div className="donut-chart">
//             {total > 0 && dashboardData.taskStatus.map((item, index, array) => {
//               const percentage = (item.count / total) * 100;
//               const previousPercentages = array.slice(0, index).reduce((sum, i) => sum + (i.count/total)*360, 0);
//               return (
//                 <div 
//                   key={index}
//                   className="donut-segment"
//                   style={{
//                     '--percentage': percentage,
//                     '--rotation': previousPercentages,
//                     '--color': item.color
//                   }}
//                 ></div>
//               );
//             })}
//             <div className="donut-center">
//               <div className="donut-center-text">{total}</div>
//               <div className="donut-center-label">Total Tasks</div>
//             </div>
//           </div>
//           <div className="chart-legend">
//             {dashboardData.taskStatus.map((item, index) => (
//               <div key={index} className="legend-item">
//                 <span className="legend-dot" style={{ backgroundColor: item.color }}></span>
//                 <span className="legend-label">{item.status}</span>
//                 <span className="legend-count">({item.count})</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="dashboard-loading">
//         <div className="loading-spinner"></div>
//         <p>Loading dashboard data...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard">
//       {/* Dashboard Header */}
//       <div className="dashboard-header">
//         <h2>📊 Dashboard Overview</h2>
//       </div>

//       {/* Stats Cards */}
//       <div className="dashboard-stats-grid">
//         <div className="stat-card">
//           {/* <div className="stat-icon bg-project">
//             <i className="fas fa-briefcase"></i>
//           </div> */}
//          <div className="stat-icon-container bg-project">
//   <div className='stat-bg-project'>
//     <img src="/assets/totl project2.jpg" alt="Total Projects" />
//   </div>
// </div>
//           <div className="stat-content">
//             <div className="stat-value">{projects}</div>
//             <div className="stat-label">Total Projects</div>
//           </div>
//         </div>

//         <div className="stat-card">
//           {/* <div className="stat-icon bg-task">
//             <i className="fas fa-newspaper"></i>
//             <img src="/assets/total-task1.jpg" alt="" />
//           </div> */}


//           <div className="stat-icon-container bg-task">
//             <div className='stat-bg-task'>
//             <img src="/assets/total-task1.jpg" alt="Total Tasks" />
//          </div>
//          </div>
//           <div className="stat-content">
//             <div className="stat-value">{dashboardData.tasks}</div>
//             <div className="stat-label">Total Tasks</div>
//           </div>
//         </div>

//         {/* <div className="stat-card">
//           <div className="stat-icon bg-user">
//             <i className="fas fa-user"></i>
//           </div>
//           <div className="stat-content">
//             <div className="stat-value">{dashboardData.users}</div>
//             <div className="stat-label">Users</div>
//           </div>
//         </div> */}

//         {/* <div className="stat-card">
//           <div className="stat-icon bg-client">
//             <i className="fas fa-sticky-note"></i>
//           </div>
//           <div className="stat-content">
//             <div className="stat-value">{dashboardData.clients}</div>
//             <div className="stat-label">Clients</div>
//           </div>
//         </div> */}
//       </div>

//       {/* Charts Section */}
//       <div className="charts-section">
//         <div className="chart-wrapper">
//           {renderProjectChart()}
//         </div>
//         <div className="chart-wrapper">
//           {renderTaskChart()}
//         </div>
//       </div>

//       {/* Recent Updates */}
//       <div className="recent-updates">
//         <div className="updates-header">
//           <h3>📝 Recent Updates</h3>
//         </div>
//         <div className="updates-list">
//           {dashboardData.recentUpdates.slice(0, 5).map((update, index) => (
//             <div key={index} className="update-item">
//               <div className="update-type">
//                 {update.type === 'project' ? '📁' : '✓'}
//               </div>
//               <div className="update-content">
//                 <div className="update-title">{update.title}</div>
//                 <div className="update-details">
//                   {update.type === 'project' ? (
//                     <span className="status-badge in-progress">{update.status}</span>
//                   ) : (
//                     <span className="assigned-to">Assigned to: {update.assignedTo}</span>
//                   )}
//                   <span className="update-date">
//                     {update.type === 'project' ? `Updated: ${update.date}` : `Due: ${update.dueDate}`}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Quick Actions */}
//       {/* <div className="quick-actions">
//         <h3>🚀 Quick Actions</h3>
//         <div className="actions-grid">
//           <button className="action-btn">
//             <span className="action-icon">➕</span>
//             <span className="action-text">New Project</span>
//           </button>
//           <button className="action-btn">
//             <span className="action-icon">📝</span>
//             <span className="action-text">Create Task</span>
//           </button>
//           <button className="action-btn">
//             <span className="action-icon">📊</span>
//             <span className="action-text">Generate Report</span>
//           </button>
//           <button className="action-btn">
//             <span className="action-icon">👥</span>
//             <span className="action-text">Manage Team</span>
//           </button>
//         </div>
//       </div> */}
//     </div>
//   );
// };

// export default Dashboard;








import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../../redux/slices/dashboardSlice";

const Dashboard = ({ currentUser }) => {
  const dispatch = useDispatch();
  
  // Redux state से data लें
  const { 
    projects,
    tasks,
    projectStatus,
    taskStatus,
    recentUpdates,
    loading,
    error
  } = useSelector(state => state.dashboard);

  console.log("🔍 Dashboard Redux State:", { 
    projects, 
    tasks, 
    loading, 
    error,
    projectStatus,
    taskStatus,
    recentUpdates
  });

  // Fetch data on component mount
  useEffect(() => {
    console.log("🚀 Dashboard mounted with currentUser:", currentUser);
    
    if (!currentUser) {
      console.log("❌ No currentUser found");
      return;
    }

    // Get userId from currentUser
    const userId = currentUser._id || currentUser.employeeId;
    console.log("📋 Fetching data for userId:", userId);
    
    if (userId) {
      dispatch(fetchDashboardData(userId));
    } else {
      console.log("❌ No userId found in currentUser");
    }
  }, [currentUser, dispatch]);

  // Chart rendering functions
  const renderProjectChart = () => {
    console.log("📊 Rendering project chart with data:", projectStatus);
    
    if (!projectStatus || projectStatus.length === 0) {
      return (
        <div className="chart-container">
          <div className="chart-title">Projects Status</div>
          <div className="no-data-message">
            No project data available
          </div>
        </div>
      );
    }
    
    const total = projectStatus.reduce((sum, item) => sum + (item.count || 0), 0);
    console.log("📊 Project chart total:", total);
    
    return (
      <div className="chart-container">
        <div className="chart-title">Projects Status</div>
        <div className="chart-bar-container">
          {projectStatus.map((item, index) => {
            if (total === 0) return null;
            const percentage = (item.count / total) * 100;
            console.log(`📊 Project ${item.status}: ${item.count} (${percentage}%)`);
            
            return (
              <div key={index} className="chart-bar-item">
                <div className="chart-bar-label">
                  <span className="chart-status-dot" style={{ backgroundColor: item.color || '#3b82f6' }}></span>
                  <span className="chart-status-name">{item.status || 'Unknown'}</span>
                  <span className="chart-status-count">({item.count || 0})</span>
                </div>
                <div className="chart-bar-bg">
                  <div 
                    className="chart-bar-fill" 
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: item.color || '#3b82f6'
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTaskChart = () => {
    console.log("📊 Rendering task chart with data:", taskStatus);
    
    if (!taskStatus || taskStatus.length === 0) {
      return (
        <div className="chart-container">
          <div className="chart-title">Tasks Overview</div>
          <div className="no-data-message">
            No task data available
          </div>
        </div>
      );
    }
    
    const total = taskStatus.reduce((sum, item) => sum + (item.count || 0), 0);
    console.log("📊 Task chart total:", total);
    
    return (
      <div className="chart-container">
        <div className="chart-title">Tasks Overview</div>
        <div className="chart-donut-container">
          <div className="donut-chart">
            {total > 0 && taskStatus.map((item, index, array) => {
              const percentage = (item.count / total) * 100;
              const previousPercentages = array.slice(0, index).reduce((sum, i) => 
                sum + ((i.count || 0)/total) * 360, 0
              );
              
              console.log(`📊 Task ${item.status}: ${item.count} (${percentage}%)`);
              
              return (
                <div 
                  key={index}
                  className="donut-segment"
                  style={{
                    '--percentage': percentage,
                    '--rotation': previousPercentages,
                    '--color': item.color || '#3b82f6'
                  }}
                ></div>
              );
            })}
            <div className="donut-center">
              <div className="donut-center-text">{total}</div>
              <div className="donut-center-label">Total Tasks</div>
            </div>
          </div>
          <div className="chart-legend">
            {taskStatus.map((item, index) => (
              <div key={index} className="legend-item">
                <span className="legend-dot" style={{ backgroundColor: item.color || '#3b82f6' }}></span>
                <span className="legend-label">{item.status || 'Unknown'}</span>
                <span className="legend-count">({item.count || 0})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Loading state
  if (loading) {
    console.log("⏳ Dashboard loading...");
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    console.log("❌ Dashboard error:", error);
    return (
      <div className="dashboard-error">
        <div className="error-icon">⚠️</div>
        <p>Error loading dashboard: {error}</p>
        <button 
          className="retry-btn"
          onClick={() => {
            const userId = currentUser?._id || currentUser?.employeeId;
            if (userId) dispatch(fetchDashboardData(userId));
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  console.log("✅ Dashboard rendering with data:", { 
    projects, 
    tasks, 
    recentUpdates 
  });

  return (
    <div className="dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <h2>📊 Dashboard Overview</h2>
        <div className="dashboard-subtitle">
          Welcome back, {currentUser?.name || 'User'}! Here's what's happening today.
        </div>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-stats-grid">
        <div className="stat-card">
          <div className="stat-icon-container bg-project">
            <div className='stat-bg-project'>
              <img src="/assets/totl project2.jpg" alt="Total Projects" />
            </div>
          </div>
          <div className="stat-content">
            <div className="stat-value">{projects || 0}</div>
            <div className="stat-label">Total Projects</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-container bg-task">
            <div className='stat-bg-task'>
              <img src="/assets/total-task1.jpg" alt="Total Tasks" />
            </div>
          </div>
          <div className="stat-content">
            <div className="stat-value">{tasks || 0}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
        </div>

        {/* Optional: Add more stat cards if needed */}
        {/* <div className="stat-card">
          <div className="stat-icon bg-user">
            <i className="fas fa-user"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">0</div>
            <div className="stat-label">Users</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon bg-client">
            <i className="fas fa-sticky-note"></i>
          </div>
          <div className="stat-content">
            <div className="stat-value">0</div>
            <div className="stat-label">Clients</div>
          </div>
        </div> */}
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-wrapper">
          {renderProjectChart()}
        </div>
        <div className="chart-wrapper">
          {renderTaskChart()}
        </div>
      </div>

      {/* Recent Updates */}
      <div className="recent-updates">
        <div className="updates-header">
          <h3>📝 Recent Updates</h3>
        </div>
        <div className="updates-list">
          {recentUpdates && recentUpdates.length > 0 ? (
            recentUpdates.slice(0, 5).map((update, index) => {
              console.log(`📝 Recent update ${index}:`, update);
              return (
                <div key={index} className="update-item">
                  <div className="update-type">
                    {update.type === 'project' ? '📁' : '✓'}
                  </div>
                  <div className="update-content">
                    <div className="update-title">{update.title || 'No Title'}</div>
                    <div className="update-details">
                      {update.type === 'project' ? (
                        <span className={`status-badge ${update.status?.toLowerCase().replace(' ', '-') || 'in-progress'}`}>
                          {update.status || 'In Progress'}
                        </span>
                      ) : (
                        <span className="assigned-to">Assigned to: {update.assignedTo || 'Unassigned'}</span>
                      )}
                      <span className="update-date">
                        {update.type === 'project' 
                          ? `Updated: ${update.date || 'N/A'}`
                          : `Due: ${update.dueDate || 'N/A'}`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-updates-message">
              No recent updates available
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions - Optional */}
      {/* <div className="quick-actions">
        <h3>🚀 Quick Actions</h3>
        <div className="actions-grid">
          <button className="action-btn">
            <span className="action-icon">➕</span>
            <span className="action-text">New Project</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">📝</span>
            <span className="action-text">Create Task</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">📊</span>
            <span className="action-text">Generate Report</span>
          </button>
          <button className="action-btn">
            <span className="action-icon">👥</span>
            <span className="action-text">Manage Team</span>
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;