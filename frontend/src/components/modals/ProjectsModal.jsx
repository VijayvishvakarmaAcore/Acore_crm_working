// import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
// import './ProjectsModal.css';

// // Lazy load heavy components for better performance
// const ProjectFilters = lazy(() => import('./ProjectFilters'));
// const ProjectsTable = lazy(() => import('./ProjectsTable'));
// const CreateProjectForm = lazy(() => import('./CreateProjectForm'));

// const ProjectsModal = ({ isOpen, onClose, currentUser }) => {
//   const [projects, setProjects] = useState([]);
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [filters, setFilters] = useState({
//     status: '',
//     clientId: '',
//     userId: '',
//     search: ''
//   });

//   // Sample data - In real app, API se aayega
//   const sampleProjects = useMemo(() => [
//     {
//       id: 1,
//       title: 'Website Redesign',
//       description: 'Complete redesign of company website',
//       tasks: 5,
//       users: ['John Smith', 'Emily Johnson'],
//       client: 'ABC Corp',
//       status: 'In Progress',
//       priority: 'High',
//       startDate: '2024-02-25',
//       endDate: '2024-05-30',
//       progress: 65,
//       remainingDays: 45
//     },
//     {
//       id: 2,
//       title: 'Mobile App Development',
//       description: 'iOS and Android mobile application',
//       tasks: 12,
//       users: ['Michael Brown', 'Sarah Davis'],
//       client: 'XYZ Ltd',
//       status: 'Planning',
//       priority: 'High',
//       startDate: '2024-03-15',
//       endDate: '2024-08-30',
//       progress: 20,
//       remainingDays: 120
//     },
//     {
//       id: 3,
//       title: 'CRM System Implementation',
//       description: 'Implement new CRM system across organization',
//       tasks: 8,
//       users: ['David Taylor', 'Amanda Miller'],
//       client: 'Global Enterprises',
//       status: 'In Progress',
//       priority: 'Medium',
//       startDate: '2024-01-10',
//       endDate: '2024-06-30',
//       progress: 40,
//       remainingDays: 60
//     },
//     {
//       id: 4,
//       title: 'Marketing Campaign Q2',
//       description: 'Quarter 2 digital marketing campaign',
//       tasks: 7,
//       users: ['Jessica Martinez'],
//       client: 'Marketing Pros',
//       status: 'Completed',
//       priority: 'Medium',
//       startDate: '2024-01-01',
//       endDate: '2024-03-31',
//       progress: 100,
//       remainingDays: 0
//     },
//     {
//       id: 5,
//       title: 'Employee Training Portal',
//       description: 'Online portal for employee training',
//       tasks: 6,
//       users: ['Christopher Wilson', 'Lauren Rodriguez'],
//       client: 'HR Solutions',
//       status: 'On Hold',
//       priority: 'Low',
//       startDate: '2024-02-01',
//       endDate: '2024-07-31',
//       progress: 30,
//       remainingDays: 90
//     }
//   ], []);

//   // Fetch projects data
//   useEffect(() => {
//     if (isOpen) {
//       setLoading(true);
//       // Simulate API call
//       const timer = setTimeout(() => {
//         setProjects(sampleProjects);
//         setFilteredProjects(sampleProjects);
//         setLoading(false);
//       }, 800);
      
//       return () => clearTimeout(timer);
//     }
//   }, [isOpen, sampleProjects]);

//   // Apply filters
//   useEffect(() => {
//     let result = [...projects];
    
//     if (filters.status) {
//       result = result.filter(project => project.status === filters.status);
//     }
    
//     if (filters.clientId) {
//       result = result.filter(project => project.client.includes(filters.clientId));
//     }
    
//     if (filters.userId) {
//       result = result.filter(project => 
//         project.users.some(user => user.includes(filters.userId))
//       );
//     }
    
//     if (filters.search) {
//       const searchLower = filters.search.toLowerCase();
//       result = result.filter(project => 
//         project.title.toLowerCase().includes(searchLower) ||
//         project.description.toLowerCase().includes(searchLower)
//       );
//     }
    
//     setFilteredProjects(result);
//   }, [filters, projects]);

//   // Filter handlers
//   const handleFilterChange = useCallback((name, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   }, []);

//   const handleCreateProject = useCallback((projectData) => {
//     const newProject = {
//       id: projects.length + 1,
//       ...projectData,
//       progress: 0,
//       remainingDays: Math.ceil((new Date(projectData.endDate) - new Date()) / (1000 * 60 * 60 * 24))
//     };
    
//     setProjects(prev => [newProject, ...prev]);
//     setShowCreateForm(false);
//   }, [projects.length]);

//   const handleDeleteProject = useCallback((projectId) => {
//     if (window.confirm('Are you sure you want to delete this project?')) {
//       setProjects(prev => prev.filter(project => project.id !== projectId));
//     }
//   }, []);

//   if (!isOpen) return null;

//   return (
//     <div className="projects-modal active" onClick={onClose}>
//       <div className="projects-content" onClick={(e) => e.stopPropagation()}>
//         {/* Modal Header */}
//         <div className="modal-header">
//           <div className="header-left">
//             <h2>
//               <span className="header-icon">📋</span>
//               Projects Management
//             </h2>
//             <p className="header-subtitle">
//               Total Projects: <span className="count-badge">{projects.length}</span>
//             </p>
//           </div>
//           <div className="header-right">
//             <button 
//               className="create-project-btn"
//               onClick={() => setShowCreateForm(true)}
//             >
//               <span className="btn-icon">+</span>
//               Create Project
//             </button>
//             <button className="close-modal" onClick={onClose} aria-label="Close">
//               ✕
//             </button>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="projects-main-content">
//           <Suspense fallback={<div className="loading-placeholder">Loading filters...</div>}>
//             <ProjectFilters 
//               filters={filters}
//               onFilterChange={handleFilterChange}
//               onClearFilters={() => setFilters({
//                 status: '',
//                 clientId: '',
//                 userId: '',
//                 search: ''
//               })}
//             />
//           </Suspense>

//           {/* View Toggle */}
//           <div className="view-toggle">
//             <button className="view-btn active">
//               <span className="view-icon">📋</span>
//               List View
//             </button>
//             <button className="view-btn">
//               <span className="view-icon">🔲</span>
//               Grid View
//             </button>
//           </div>

//           {/* Projects Content */}
//           {loading ? (
//             <div className="loading-container">
//               <div className="loading-spinner"></div>
//               <p>Loading projects...</p>
//             </div>
//           ) : (
//             <Suspense fallback={<div className="loading-placeholder">Loading projects table...</div>}>
//               <ProjectsTable 
//                 projects={filteredProjects}
//                 onDelete={handleDeleteProject}
//                 currentUser={currentUser}
//               />
//             </Suspense>
//           )}

//           {/* Create Project Form (Modal) */}
//           {showCreateForm && (
//             <Suspense fallback={<div className="loading-placeholder">Loading form...</div>}>
//               <CreateProjectForm
//                 onClose={() => setShowCreateForm(false)}
//                 onCreate={handleCreateProject}
//               />
//             </Suspense>
//           )}
//         </div>

//         {/* Stats Footer */}
//         <div className="projects-footer">
//           <div className="stats-grid">
//             <div className="stat-item">
//               <div className="stat-value">{projects.filter(p => p.status === 'In Progress').length}</div>
//               <div className="stat-label">In Progress</div>
//             </div>
//             <div className="stat-item">
//               <div className="stat-value">{projects.filter(p => p.status === 'Completed').length}</div>
//               <div className="stat-label">Completed</div>
//             </div>
//             <div className="stat-item">
//               <div className="stat-value">{projects.filter(p => p.priority === 'High').length}</div>
//               <div className="stat-label">High Priority</div>
//             </div>
//             <div className="stat-item">
//               <div className="stat-value">
//                 {Math.round(projects.reduce((acc, project) => acc + project.progress, 0) / projects.length) || 0}%
//               </div>
//               <div className="stat-label">Avg. Progress</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default React.memo(ProjectsModal);







// import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
// import './ProjectsModal.css';
// import Header from '../common/Header';

// const ProjectsModal = ({ isOpen, onClose, currentUser, attendanceStatus, onCardClick }) => {
//   const [projects, setProjects] = useState([]);
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [viewMode, setViewMode] = useState('list');
//   const [filters, setFilters] = useState({
//     status: '',
//     client: '',
//     priority: '',
//     search: ''
//   });

//   // Scroll state for header hide/show
//   const [isHeaderVisible, setIsHeaderVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
  
//   // Ref for the content wrapper
//   const contentRef = useRef(null);

//   // Scroll event handler
//   useEffect(() => {
//     const handleScroll = () => {
//       const content = contentRef.current;
//       if (!content) return;

//       const currentScrollY = content.scrollTop;
      
//       if (currentScrollY > lastScrollY && currentScrollY > 30) {
//         setIsHeaderVisible(false);
//       } 
//       else if (currentScrollY < lastScrollY) {
//         setIsHeaderVisible(true);
//       }
      
//       setLastScrollY(currentScrollY);
//     };

//     const content = contentRef.current;
//     if (content) {
//       content.addEventListener('scroll', handleScroll, { passive: true });
//     }

//     return () => {
//       if (content) {
//         content.removeEventListener('scroll', handleScroll);
//       }
//     };
//   }, [lastScrollY]);

//   // Scroll to top function
//   const handleScrollToTop = useCallback(() => {
//     if (contentRef.current) {
//       contentRef.current.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//       });
//       setIsHeaderVisible(true);
//     }
//   }, []);

//   // ✅ FIXED: Handle menu item click in ProjectsModal
//   const handleHeaderCardClick = useCallback((itemId) => {
//     console.log('Header item clicked in ProjectsModal:', itemId);
    
//     // First close the ProjectsModal
//     onClose();
    
//     // Then call the parent's onCardClick after a short delay
//     // to ensure modal is closed before opening new one
//     setTimeout(() => {
//       if (onCardClick) {
//         onCardClick(itemId);
//       }
//     }, 100);
//   }, [onClose, onCardClick]);

//   // Handle profile click
//   const handleHeaderProfileClick = useCallback(() => {
//     console.log('Profile clicked in ProjectsModal');
//     onClose();
//     setTimeout(() => {
//       if (onCardClick) {
//         onCardClick('profile');
//       }
//     }, 100);
//   }, [onClose, onCardClick]);

//   // Handle logout
//   const handleHeaderLogout = useCallback(() => {
//     // You might want to handle this differently
//     console.log('Logout from ProjectsModal');
//     // Or call parent's logout function
//   }, []);

//   // Sample data
//   const sampleProjects = useMemo(() => [
//     {
//       id: 1,
//       title: 'Website Redesign',
//       description: 'Complete redesign of company website with modern UI/UX',
//       tasks: 15,
//       users: ['John Smith', 'Emily Johnson', 'Michael Brown'],
//       client: 'ABC Corporation',
//       status: 'In Progress',
//       priority: 'High',
//       startDate: '2024-02-25',
//       endDate: '2024-05-30',
//       progress: 65,
//       remainingDays: 45,
//       budget: '$25,000'
//     },
//     // ... rest of your sample data
//   ], []);

//   // Fetch projects data
//   useEffect(() => {
//     if (isOpen) {
//       setLoading(true);
//       const timer = setTimeout(() => {
//         setProjects(sampleProjects);
//         setFilteredProjects(sampleProjects);
//         setLoading(false);
//       }, 1000);
      
//       return () => clearTimeout(timer);
//     }
//   }, [isOpen, sampleProjects]);

//   // Apply filters
//   useEffect(() => {
//     let result = [...projects];
    
//     if (filters.status) {
//       result = result.filter(project => project.status === filters.status);
//     }
    
//     if (filters.client) {
//       result = result.filter(project => 
//         project.client.toLowerCase().includes(filters.client.toLowerCase())
//       );
//     }
    
//     if (filters.priority) {
//       result = result.filter(project => project.priority === filters.priority);
//     }
    
//     if (filters.search) {
//       const searchLower = filters.search.toLowerCase();
//       result = result.filter(project => 
//         project.title.toLowerCase().includes(searchLower) ||
//         project.description.toLowerCase().includes(searchLower) ||
//         project.client.toLowerCase().includes(searchLower)
//       );
//     }
    
//     setFilteredProjects(result);
//   }, [filters, projects]);

//   // Filter handlers
//   const handleFilterChange = useCallback((name, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   }, []);

//   const handleCreateProject = useCallback((projectData) => {
//     const newProject = {
//       id: projects.length + 1,
//       ...projectData,
//       progress: 0,
//       remainingDays: Math.ceil((new Date(projectData.endDate) - new Date()) / (1000 * 60 * 60 * 24)),
//       users: [currentUser?.name || 'Current User']
//     };
    
//     setProjects(prev => [newProject, ...prev]);
//     setShowCreateForm(false);
//   }, [projects.length, currentUser]);

//   const handleDeleteProject = useCallback((projectId) => {
//     if (window.confirm('Are you sure you want to delete this project?')) {
//       setProjects(prev => prev.filter(project => project.id !== projectId));
//     }
//   }, []);

//   // Get status badge class
//   const getStatusClass = (status) => {
//     switch(status) {
//       case 'In Progress': return 'status-in-progress';
//       case 'Planning': return 'status-planning';
//       case 'Completed': return 'status-completed';
//       case 'On Hold': return 'status-on-hold';
//       default: return '';
//     }
//   };

//   // Get priority badge class
//   const getPriorityClass = (priority) => {
//     switch(priority) {
//       case 'High': return 'priority-high';
//       case 'Medium': return 'priority-medium';
//       case 'Low': return 'priority-low';
//       default: return '';
//     }
//   };

//   // Calculate stats
//   const stats = useMemo(() => ({
//     inProgress: projects.filter(p => p.status === 'In Progress').length,
//     completed: projects.filter(p => p.status === 'Completed').length,
//     highPriority: projects.filter(p => p.priority === 'High').length,
//     averageProgress: Math.round(projects.reduce((acc, project) => acc + project.progress, 0) / projects.length) || 0,
//     totalTasks: projects.reduce((acc, project) => acc + project.tasks, 0),
//     totalBudget: projects.reduce((acc, project) => {
//       const budget = parseInt(project.budget.replace(/[$,]/g, ''));
//       return acc + budget;
//     }, 0)
//   }), [projects]);

//   if (!isOpen) return null;

//   return (
//     <div className="projects-fullpage-container">
//       {/* Main Header with Hide/Show Animation */}
//       <div className={`projects-main-header-wrapper ${isHeaderVisible ? 'visible' : 'hidden'}`}>
//         {/* ✅ FIXED: Pass correct handlers to Header */}
//         <Header
//           currentUser={currentUser}
//           onProfileClick={handleHeaderProfileClick}
//           onLogout={handleHeaderLogout}
//           onCardClick={handleHeaderCardClick} // ✅ This is the fixed handler
//           attendanceStatus={attendanceStatus}
//         />
//       </div>

//       {/* Projects Modal Header */}
//       <div className={`projects-modal-header ${isHeaderVisible ? 'visible' : 'hidden'}`}>
//         <div className="projects-modal-header-content">
//           <div className="projects-modal-header-left">
//             <div className="projects-modal-header-icon">📋</div>
//             <div className="projects-modal-header-title">
//               <h1>Projects Management</h1>
//               <p>
//                 Manage and track all projects • Total: 
//                 <span className="projects-modal-count-badge">{projects.length} Projects</span>
//               </p>
//             </div>
//           </div>
//           <button className="projects-modal-close-btn" onClick={onClose}>✕</button>
//         </div>
//       </div>

//       {/* Floating Scroll to Top Button */}
//       {!isHeaderVisible && (
//         <button 
//           className="projects-floating-top-btn"
//           onClick={handleScrollToTop}
//           aria-label="Scroll to top"
//         >
//           <span className="projects-floating-icon">↑</span>
//         </button>
//       )}

//       {/* Scrollable Content Area */}
//       <div className="projects-content-wrapper" ref={contentRef}>
//         <div className="projects-main-area">
//           {/* Main Content Container */}
//           <div className="projects-main-container">
//             {/* Action Bar */}
//             <div className="projects-action-bar">
//               <button 
//                 className="create-project-main-btn"
//                 onClick={() => setShowCreateForm(true)}
//               >
//                 <span className="btn-icon-main">+</span>
//                 Create New Project
//               </button>

//               <div className="projects-view-toggle">
//                 <button 
//                   className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
//                   onClick={() => setViewMode('list')}
//                 >
//                   <span className="view-toggle-icon">📋</span>
//                   List View
//                 </button>
//                 <button 
//                   className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
//                   onClick={() => setViewMode('grid')}
//                 >
//                   <span className="view-toggle-icon">🔲</span>
//                   Grid View
//                 </button>
//               </div>
//             </div>

//             {/* Filters Section */}
//             <div className="projects-filters-section">
//               <div className="filters-title">Filters</div>
//               <div className="filters-row">
//                 <div className="filter-group">
//                   <label>Status</label>
//                   <select 
//                     value={filters.status}
//                     onChange={(e) => handleFilterChange('status', e.target.value)}
//                     className="filter-select"
//                   >
//                     <option value="">All Status</option>
//                     <option value="Planning">Planning</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Completed">Completed</option>
//                     <option value="On Hold">On Hold</option>
//                   </select>
//                 </div>
                
//                 <div className="filter-group">
//                   <label>Priority</label>
//                   <select 
//                     value={filters.priority}
//                     onChange={(e) => handleFilterChange('priority', e.target.value)}
//                     className="filter-select"
//                   >
//                     <option value="">All Priorities</option>
//                     <option value="High">High</option>
//                     <option value="Medium">Medium</option>
//                     <option value="Low">Low</option>
//                   </select>
//                 </div>
                
//                 <div className="filter-group">
//                   <label>Client</label>
//                   <input
//                     type="text"
//                     value={filters.client}
//                     onChange={(e) => handleFilterChange('client', e.target.value)}
//                     placeholder="Search client..."
//                     className="filter-input"
//                   />
//                 </div>
                
//                 <div className="filter-group">
//                   <label>Search</label>
//                   <input
//                     type="text"
//                     value={filters.search}
//                     onChange={(e) => handleFilterChange('search', e.target.value)}
//                     placeholder="Search projects..."
//                     className="filter-input"
//                   />
//                 </div>
                
//                 <button 
//                   className="clear-filters-btn"
//                   onClick={() => setFilters({
//                     status: '',
//                     client: '',
//                     priority: '',
//                     search: ''
//                   })}
//                 >
//                   Clear Filters
//                 </button>
//               </div>
//             </div>

//             {/* Projects Table */}
//             {loading ? (
//               <div className="projects-loading-container">
//                 <div className="projects-loading-spinner"></div>
//                 <p className="projects-loading-text">Loading projects...</p>
//               </div>
//             ) : (
//               <div className="projects-table-container">
//                 <table className="projects-table">
//                   <thead>
//                     <tr>
//                       <th>Project Title</th>
//                       <th>Client</th>
//                       <th>Status</th>
//                       <th>Priority</th>
//                       <th>Progress</th>
//                       <th>Team</th>
//                       <th>Timeline</th>
//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredProjects.map((project) => (
//                       <tr key={project.id}>
//                         <td>
//                           <div className="project-title-cell">
//                             <div className="project-title">{project.title}</div>
//                             <div className="project-description">{project.description}</div>
//                           </div>
//                         </td>
//                         <td>
//                           <div className="client-name">{project.client}</div>
//                         </td>
//                         <td>
//                           <span className={`status-badge ${getStatusClass(project.status)}`}>
//                             {project.status}
//                           </span>
//                         </td>
//                         <td>
//                           <span className={`priority-badge ${getPriorityClass(project.priority)}`}>
//                             {project.priority}
//                           </span>
//                         </td>
//                         <td>
//                           <div className="progress-cell">
//                             <div className="project-progress-bar">
//                               <div 
//                                 className="project-progress-fill"
//                                 style={{ width: `${project.progress}%` }}
//                               ></div>
//                             </div>
//                             <div className="progress-percentage">{project.progress}%</div>
//                           </div>
//                         </td>
//                         <td>
//                           <div className="team-cell">
//                             <div className="team-count">{project.users.length} members</div>
//                             <div className="team-names">
//                               {project.users.slice(0, 2).join(', ')}
//                               {project.users.length > 2 && '...'}
//                             </div>
//                           </div>
//                         </td>
//                         <td>
//                           <div className="timeline-cell">
//                             <div className="dates">
//                               {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
//                             </div>
//                             <div className="remaining-days">
//                               {project.remainingDays > 0 
//                                 ? `${project.remainingDays} days left` 
//                                 : 'Completed'}
//                             </div>
//                           </div>
//                         </td>
//                         <td>
//                           <div className="action-buttons">
//                             <button className="action-btn view-btn" title="View Details">
//                               👁️
//                             </button>
//                             <button className="action-btn edit-btn" title="Edit Project">
//                               ✏️
//                             </button>
//                             <button 
//                               className="action-btn delete-btn" 
//                               title="Delete Project"
//                               onClick={() => handleDeleteProject(project.id)}
//                             >
//                               🗑️
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
                
//                 {filteredProjects.length === 0 && (
//                   <div className="no-projects-message">
//                     No projects found. Try adjusting your filters or create a new project.
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Stats Footer */}
//           <div className="projects-stats-footer">
//             <div className="stats-grid-main">
//               <div className="stat-item-main">
//                 <div className="stat-value-main">{stats.inProgress}</div>
//                 <div className="stat-label-main">Projects in Progress</div>
//               </div>
//               <div className="stat-item-main">
//                 <div className="stat-value-main">{stats.completed}</div>
//                 <div className="stat-label-main">Completed Projects</div>
//               </div>
//               <div className="stat-item-main">
//                 <div className="stat-value-main">{stats.highPriority}</div>
//                 <div className="stat-label-main">High Priority</div>
//               </div>
//               <div className="stat-item-main">
//                 <div className="stat-value-main">{stats.averageProgress}%</div>
//                 <div className="stat-label-main">Average Progress</div>
//               </div>
//               <div className="stat-item-main">
//                 <div className="stat-value-main">{stats.totalTasks}</div>
//                 <div className="stat-label-main">Total Tasks</div>
//               </div>
//               <div className="stat-item-main">
//                 <div className="stat-value-main">${stats.totalBudget.toLocaleString()}</div>
//                 <div className="stat-label-main">Total Budget</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Create Project Form */}
//       {showCreateForm && (
//         <div className="create-project-overlay">
//           {/* Add your create project form here */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default React.memo(ProjectsModal);






// import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
// import './ProjectsModal.css';
// import Header from '../common/Header';

// const ProjectsModal = ({ isOpen, onClose, currentUser, attendanceStatus, onCardClick }) => {
//   const [projects, setProjects] = useState([]);
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [viewMode, setViewMode] = useState('list');
//   const [filters, setFilters] = useState({
//     status: '',
//     client: '',
//     priority: '',
//     search: ''
//   });

//   // Scroll state for header hide/show
//   const [isHeaderVisible, setIsHeaderVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
  
//   // Ref for the content wrapper
//   const contentRef = useRef(null);

//   // Check screen size for responsive design
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
    
//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);
    
//     return () => {
//       window.removeEventListener('resize', checkScreenSize);
//     };
//   }, []);

//   // Scroll event handler
//   useEffect(() => {
//     const handleScroll = () => {
//       const content = contentRef.current;
//       if (!content) return;

//       const currentScrollY = content.scrollTop;
      
//       if (currentScrollY > lastScrollY && currentScrollY > 30) {
//         setIsHeaderVisible(false);
//       } 
//       else if (currentScrollY < lastScrollY) {
//         setIsHeaderVisible(true);
//       }
      
//       setLastScrollY(currentScrollY);
//     };

//     const content = contentRef.current;
//     if (content) {
//       content.addEventListener('scroll', handleScroll, { passive: true });
//     }

//     return () => {
//       if (content) {
//         content.removeEventListener('scroll', handleScroll);
//       }
//     };
//   }, [lastScrollY]);

//   // Scroll to top function
//   const handleScrollToTop = useCallback(() => {
//     if (contentRef.current) {
//       contentRef.current.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//       });
//       setIsHeaderVisible(true);
//     }
//   }, []);

//   // Handle menu item click in ProjectsModal
//   const handleHeaderCardClick = useCallback((itemId) => {
//     console.log('Header item clicked in ProjectsModal:', itemId);
    
//     // First close the ProjectsModal
//     onClose();
    
//     // Then call the parent's onCardClick after a short delay
//     setTimeout(() => {
//       if (onCardClick) {
//         onCardClick(itemId);
//       }
//     }, 100);
//   }, [onClose, onCardClick]);

//   // Handle profile click
//   const handleHeaderProfileClick = useCallback(() => {
//     console.log('Profile clicked in ProjectsModal');
//     onClose();
//     setTimeout(() => {
//       if (onCardClick) {
//         onCardClick('profile');
//       }
//     }, 100);
//   }, [onClose, onCardClick]);

//   // Handle logout
//   const handleHeaderLogout = useCallback(() => {
//     console.log('Logout from ProjectsModal');
//   }, []);

//   // Complete sample data
//   const sampleProjects = useMemo(() => [
//     {
//       id: 1,
//       title: 'Website Redesign',
//       description: 'Complete redesign of company website with modern UI/UX',
//       tasks: 15,
//       users: ['John Smith', 'Emily Johnson', 'Michael Brown'],
//       client: 'ABC Corporation',
//       status: 'In Progress',
//       priority: 'High',
//       startDate: '2024-02-25',
//       endDate: '2024-05-30',
//       progress: 65,
//       remainingDays: 45,
//       budget: '$25,000'
//     },
//     {
//       id: 2,
//       title: 'Mobile App Development',
//       description: 'iOS and Android application for customer engagement',
//       tasks: 28,
//       users: ['Sarah Wilson', 'David Lee', 'Emma Garcia', 'Robert Chen'],
//       client: 'TechStart Inc',
//       status: 'Planning',
//       priority: 'High',
//       startDate: '2024-03-10',
//       endDate: '2024-08-15',
//       progress: 20,
//       remainingDays: 120,
//       budget: '$45,000'
//     },
//     {
//       id: 3,
//       title: 'E-commerce Platform',
//       description: 'Build online shopping platform with payment integration',
//       tasks: 42,
//       users: ['Michael Brown', 'Lisa Taylor', 'James Wilson'],
//       client: 'Retail Solutions',
//       status: 'Completed',
//       priority: 'Medium',
//       startDate: '2024-01-15',
//       endDate: '2024-04-30',
//       progress: 100,
//       remainingDays: 0,
//       budget: '$38,000'
//     },
//     {
//       id: 4,
//       title: 'CRM System Upgrade',
//       description: 'Upgrade existing CRM with new features and better UX',
//       tasks: 18,
//       users: ['Emily Johnson', 'Daniel Martinez'],
//       client: 'Global Enterprises',
//       status: 'On Hold',
//       priority: 'Low',
//       startDate: '2024-03-01',
//       endDate: '2024-06-30',
//       progress: 40,
//       remainingDays: 90,
//       budget: '$22,000'
//     },
//     {
//       id: 5,
//       title: 'Data Analytics Dashboard',
//       description: 'Interactive dashboard for business intelligence',
//       tasks: 24,
//       users: ['Sophia Davis', 'William Thompson', 'Olivia Anderson'],
//       client: 'DataCorp International',
//       status: 'In Progress',
//       priority: 'Medium',
//       startDate: '2024-02-15',
//       endDate: '2024-07-31',
//       progress: 75,
//       remainingDays: 100,
//       budget: '$35,000'
//     },
//     {
//       id: 6,
//       title: 'Cloud Migration',
//       description: 'Migrate infrastructure to AWS cloud platform',
//       tasks: 32,
//       users: ['Robert Chen', 'Emma Garcia', 'Michael Brown'],
//       client: 'Finance Bank Ltd',
//       status: 'In Progress',
//       priority: 'High',
//       startDate: '2024-03-05',
//       endDate: '2024-09-30',
//       progress: 55,
//       remainingDays: 150,
//       budget: '$60,000'
//     },
//     {
//       id: 7,
//       title: 'Marketing Campaign Website',
//       description: 'Landing pages and microsites for product launch',
//       tasks: 12,
//       users: ['Lisa Taylor', 'David Lee'],
//       client: 'Marketing Pros',
//       status: 'Completed',
//       priority: 'Low',
//       startDate: '2024-02-01',
//       endDate: '2024-03-15',
//       progress: 100,
//       remainingDays: 0,
//       budget: '$15,000'
//     },
//     {
//       id: 8,
//       title: 'API Integration Suite',
//       description: 'Build and integrate multiple third-party APIs',
//       tasks: 20,
//       users: ['Daniel Martinez', 'Sophia Davis', 'John Smith'],
//       client: 'ConnectTech Solutions',
//       status: 'Planning',
//       priority: 'Medium',
//       startDate: '2024-04-01',
//       endDate: '2024-07-15',
//       progress: 10,
//       remainingDays: 95,
//       budget: '$28,000'
//     }
//   ], []);

//   // Fetch projects data
//   useEffect(() => {
//     if (isOpen) {
//       setLoading(true);
//       const timer = setTimeout(() => {
//         setProjects(sampleProjects);
//         setFilteredProjects(sampleProjects);
//         setLoading(false);
//       }, 1000);
      
//       return () => clearTimeout(timer);
//     }
//   }, [isOpen, sampleProjects]);

//   // Apply filters
//   useEffect(() => {
//     let result = [...projects];
    
//     if (filters.status) {
//       result = result.filter(project => project.status === filters.status);
//     }
    
//     if (filters.client) {
//       result = result.filter(project => 
//         project.client.toLowerCase().includes(filters.client.toLowerCase())
//       );
//     }
    
//     if (filters.priority) {
//       result = result.filter(project => project.priority === filters.priority);
//     }
    
//     if (filters.search) {
//       const searchLower = filters.search.toLowerCase();
//       result = result.filter(project => 
//         project.title.toLowerCase().includes(searchLower) ||
//         project.description.toLowerCase().includes(searchLower) ||
//         project.client.toLowerCase().includes(searchLower)
//       );
//     }
    
//     setFilteredProjects(result);
//   }, [filters, projects]);

//   // Filter handlers
//   const handleFilterChange = useCallback((name, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   }, []);

//   const handleCreateProject = useCallback((projectData) => {
//     const newProject = {
//       id: projects.length + 1,
//       ...projectData,
//       progress: 0,
//       remainingDays: Math.ceil((new Date(projectData.endDate) - new Date()) / (1000 * 60 * 60 * 24)),
//       users: [currentUser?.name || 'Current User']
//     };
    
//     setProjects(prev => [newProject, ...prev]);
//     setShowCreateForm(false);
//   }, [projects.length, currentUser]);

//   const handleDeleteProject = useCallback((projectId) => {
//     if (window.confirm('Are you sure you want to delete this project?')) {
//       setProjects(prev => prev.filter(project => project.id !== projectId));
//     }
//   }, []);

//   // Get status badge class
//   const getStatusClass = (status) => {
//     switch(status) {
//       case 'In Progress': return 'status-in-progress';
//       case 'Planning': return 'status-planning';
//       case 'Completed': return 'status-completed';
//       case 'On Hold': return 'status-on-hold';
//       default: return '';
//     }
//   };

//   // Get priority badge class
//   const getPriorityClass = (priority) => {
//     switch(priority) {
//       case 'High': return 'priority-high';
//       case 'Medium': return 'priority-medium';
//       case 'Low': return 'priority-low';
//       default: return '';
//     }
//   };

//   // Calculate stats
//   const stats = useMemo(() => ({
//     inProgress: projects.filter(p => p.status === 'In Progress').length,
//     completed: projects.filter(p => p.status === 'Completed').length,
//     highPriority: projects.filter(p => p.priority === 'High').length,
//     averageProgress: Math.round(projects.reduce((acc, project) => acc + project.progress, 0) / projects.length) || 0,
//     totalTasks: projects.reduce((acc, project) => acc + project.tasks, 0),
//     totalBudget: projects.reduce((acc, project) => {
//       const budget = parseInt(project.budget.replace(/[$,]/g, ''));
//       return acc + budget;
//     }, 0)
//   }), [projects]);

//   // Responsive header class
//   const getHeaderClass = useCallback(() => {
//     if (isMobile) {
//       return isHeaderVisible ? 'visible mobile' : 'hidden mobile';
//     }
//     return isHeaderVisible ? 'visible' : 'hidden';
//   }, [isHeaderVisible, isMobile]);

//   // Handle clear all filters
//   const handleClearFilters = useCallback(() => {
//     setFilters({
//       status: '',
//       client: '',
//       priority: '',
//       search: ''
//     });
//   }, []);

//   if (!isOpen) return null;

//   return (
//     <div className="projects-fullpage-container">
//       {/* Main Header with Hide/Show Animation */}
//       <div className={`projects-main-header-wrapper ${getHeaderClass()}`}>
//         <Header
//           currentUser={currentUser}
//           onProfileClick={handleHeaderProfileClick}
//           onLogout={handleHeaderLogout}
//           onCardClick={handleHeaderCardClick}
//           attendanceStatus={attendanceStatus}
//         />
//       </div>

//       {/* Projects Modal Header */}
//       {/* <div className={`projects-modal-header ${getHeaderClass()}`}>
//         <div className="projects-modal-header-content">
//           <div className="projects-modal-header-left">
//             <div className="projects-modal-header-icon">📋</div>
//             <div className="projects-modal-header-title">
//               <h1>Projects Management</h1>
//               <p>
//                 {isMobile ? (
//                   <>
//                     <span className="projects-modal-count-badge">{projects.length} Projects</span>
//                   </>
//                 ) : (
//                   <>
//                     Manage and track all projects • Total: 
//                     <span className="projects-modal-count-badge">{projects.length} Projects</span>
//                   </>
//                 )}
//               </p>
//             </div>
//           </div>
//           <button 
//             className="projects-modal-close-btn" 
//             onClick={onClose}
//             aria-label="Close projects modal"
//           >
//             ✕
//           </button>
//         </div>


     



//       </div> */}

//       {/* Floating Scroll to Top Button */}
//       {!isHeaderVisible && (
//         <button 
//           className="projects-floating-top-btn"
//           onClick={handleScrollToTop}
//           aria-label="Scroll to top"
//         >
//           <span className="projects-floating-icon">↑</span>
//         </button>
//       )}

//       {/* Scrollable Content Area */}
//       <div className="projects-content-wrapper" ref={contentRef}>
//         <div className="projects-main-area">
//           {/* Main Content Container */}
//           <div className="projects-main-container">
//             {/* Action Bar */}
//             {/* <div className="projects-action-bar">
//               <button 
//                 className="create-project-main-btn"
//                 onClick={() => setShowCreateForm(true)}
//               >
//                 <span className="btn-icon-main">+</span>
//                 {isMobile ? 'New Project' : 'Create New Project'}
//               </button>

//               <div className="projects-view-toggle">
//                 <button 
//                   className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
//                   onClick={() => setViewMode('list')}
//                   aria-label="List view"
//                 >
//                   <span className="view-toggle-icon">📋</span>
//                   {isMobile ? 'List' : 'List View'}
//                 </button>
//                 <button 
//                   className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
//                   onClick={() => setViewMode('grid')}
//                   aria-label="Grid view"
//                 >
//                   <span className="view-toggle-icon">🔲</span>
//                   {isMobile ? 'Grid' : 'Grid View'}
//                 </button>
//               </div>
//             </div> */}

//             {/* Filters Section */}
//             <div className="projects-filters-section">
//               <div className="filters-title">
//                 <span>Filters</span>
//                 {Object.values(filters).some(filter => filter !== '') && (
//                   <button 
//                     onClick={handleClearFilters}
//                     className="clear-all-filters-btn"
//                     style={{
//                       marginLeft: '10px',
//                       fontSize: '12px',
//                       padding: '2px 8px',
//                       background: 'rgba(239, 68, 68, 0.2)',
//                       border: '1px solid rgba(239, 68, 68, 0.3)',
//                       color: '#f87171',
//                       borderRadius: '4px',
//                       cursor: 'pointer'
//                     }}
//                   >
//                     Clear All
//                   </button>
//                 )}
//               </div>
//               <div className="filters-row">
//                 <div className="filter-group">
//                   <label>Status</label>
//                   <select 
//                     value={filters.status}
//                     onChange={(e) => handleFilterChange('status', e.target.value)}
//                     className="filter-select"
//                   >
//                     <option value="">All Status</option>
//                     <option value="Planning">Planning</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Completed">Completed</option>
//                     <option value="On Hold">On Hold</option>
//                   </select>
//                 </div>
                
//                 <div className="filter-group">
//                   <label>Priority</label>
//                   <select 
//                     value={filters.priority}
//                     onChange={(e) => handleFilterChange('priority', e.target.value)}
//                     className="filter-select"
//                   >
//                     <option value="">All Priorities</option>
//                     <option value="High">High</option>
//                     <option value="Medium">Medium</option>
//                     <option value="Low">Low</option>
//                   </select>
//                 </div>
                
//                 <div className="filter-group">
//                   <label>Client</label>
//                   <input
//                     type="text"
//                     value={filters.client}
//                     onChange={(e) => handleFilterChange('client', e.target.value)}
//                     placeholder="Search client..."
//                     className="filter-input"
//                   />
//                 </div>
                
//                 <div className="filter-group">
//                   <label>Search</label>
//                   <input
//                     type="text"
//                     value={filters.search}
//                     onChange={(e) => handleFilterChange('search', e.target.value)}
//                     placeholder="Search projects..."
//                     className="filter-input"
//                   />
//                 </div>
                
//                 <button 
//                   className="clear-filters-btn"
//                   onClick={handleClearFilters}
//                 >
//                   {isMobile ? 'Clear' : 'Clear Filters'}
//                 </button>
//               </div>
//             </div>

//             {/* Projects Table */}
//             {loading ? (
//               <div className="projects-loading-container">
//                 <div className="projects-loading-spinner"></div>
//                 <p className="projects-loading-text">Loading projects...</p>
//               </div>
//             ) : (
//               <div className="projects-table-container">
//                 <div className="table-responsive-wrapper">
//                   <table className="projects-table">
//                     <thead>
//                       <tr>
//                         <th>Project Title</th>
//                         <th>Client</th>
//                         <th>Status</th>
//                         <th>Priority</th>
//                         <th>Progress</th>
//                         <th>Team</th>
//                         <th>Timeline</th>
//                         {/* <th>Actions</th> */}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredProjects.map((project) => (
//                         <tr key={project.id}>
//                           <td>
//                             <div className="project-title-cell">
//                               <div className="project-title">{project.title}</div>
//                               <div className="project-description">{project.description}</div>
//                             </div>
//                           </td>
//                           <td>
//                             <div className="client-name">{project.client}</div>
//                           </td>
//                           <td>
//                             <span className={`status-badge ${getStatusClass(project.status)}`}>
//                               {isMobile ? project.status.split(' ')[0] : project.status}
//                             </span>
//                           </td>
//                           <td>
//                             <span className={`priority-badge ${getPriorityClass(project.priority)}`}>
//                               {isMobile ? project.priority.charAt(0) : project.priority}
//                             </span>
//                           </td>
//                           <td>
//                             <div className="progress-cell">
//                               <div className="project-progress-bar">
//                                 <div 
//                                   className="project-progress-fill"
//                                   style={{ width: `${project.progress}%` }}
//                                 ></div>
//                               </div>
//                               <div className="progress-percentage">{project.progress}%</div>
//                             </div>
//                           </td>
//                           <td>
//                             <div className="team-cell">
//                               <div className="team-count">{project.users.length} members</div>
//                               <div className="team-names">
//                                 {project.users.slice(0, isMobile ? 1 : 2).join(', ')}
//                                 {project.users.length > (isMobile ? 1 : 2) && '...'}
//                               </div>
//                             </div>
//                           </td>
//                           <td>
//                             <div className="timeline-cell">
//                               {isMobile ? (
//                                 <>
//                                   <div className="dates">
//                                     {new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                                   </div>
//                                   <div className="remaining-days">
//                                     {project.remainingDays > 0 
//                                       ? `${project.remainingDays}d left` 
//                                       : 'Done'}
//                                   </div>
//                                 </>
//                               ) : (
//                                 <>
//                                   <div className="dates">
//                                     {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
//                                   </div>
//                                   <div className="remaining-days">
//                                     {project.remainingDays > 0 
//                                       ? `${project.remainingDays} days left` 
//                                       : 'Completed'}
//                                   </div>
//                                 </>
//                               )}
//                             </div>
//                           </td>
//                           <td>
//                             {/* <div className="action-buttons">
//                               <button 
//                                 className="action-btn view-btn" 
//                                 title="View Details"
//                                 onClick={() => console.log('View project', project.id)}
//                               >
//                                 {isMobile ? '👁️' : '👁️'}
//                               </button>
//                               <button 
//                                 className="action-btn edit-btn" 
//                                 title="Edit Project"
//                                 onClick={() => console.log('Edit project', project.id)}
//                               >
//                                 {isMobile ? '✏️' : '✏️'}
//                               </button>
//                               <button 
//                                 className="action-btn delete-btn" 
//                                 title="Delete Project"
//                                 onClick={() => handleDeleteProject(project.id)}
//                               >
//                                 {isMobile ? '🗑️' : '🗑️'}
//                               </button>
//                             </div> */}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
                
//                 {filteredProjects.length === 0 && (
//                   <div className="no-projects-message">
//                     No projects found. Try adjusting your filters or create a new project.
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Stats Footer */}
//           <div className="projects-stats-footer">
//             <div className="stats-grid-main">
//               <div className="stat-item-main">
//                 <div className="stat-value-main">{stats.inProgress}</div>
//                 <div className="stat-label-main">In Progress</div>
//               </div>
//               <div className="stat-item-main">
//                 <div className="stat-value-main">{stats.completed}</div>
//                 <div className="stat-label-main">Completed</div>
//               </div>
//               <div className="stat-item-main">
//                 <div className="stat-value-main">{stats.highPriority}</div>
//                 <div className="stat-label-main">High Priority</div>
//               </div>
//               <div className="stat-item-main">
//                 <div className="stat-value-main">{stats.averageProgress}%</div>
//                 <div className="stat-label-main">Avg Progress</div>
//               </div>
//               {!isMobile && (
//                 <>
//                   <div className="stat-item-main">
//                     <div className="stat-value-main">{stats.totalTasks}</div>
//                     <div className="stat-label-main">Total Tasks</div>
//                   </div>
//                   {/* <div className="stat-item-main">
//                     <div className="stat-value-main">${stats.totalBudget.toLocaleString()}</div>
//                     <div className="stat-label-main">Total Budget</div>
//                   </div> */}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Create Project Form (Simplified for example) */}
//       {showCreateForm && (
//         <div className="create-project-overlay">
//           <div className="create-project-modal">
//             <div className="create-project-header">
//               <h2>Create New Project</h2>
//               <button onClick={() => setShowCreateForm(false)}>✕</button>
//             </div>
//             <div className="create-project-form">
//               <input type="text" placeholder="Project Title" />
//               <textarea placeholder="Description" rows="3"></textarea>
//               <input type="text" placeholder="Client Name" />
//               <div className="form-row">
//                 <select>
//                   <option>Select Status</option>
//                   <option>Planning</option>
//                   <option>In Progress</option>
//                   <option>Completed</option>
//                 </select>
//                 <select>
//                   <option>Select Priority</option>
//                   <option>High</option>
//                   <option>Medium</option>
//                   <option>Low</option>
//                 </select>
//               </div>
//               <div className="form-actions">
//                 <button 
//                   className="cancel-btn"
//                   onClick={() => setShowCreateForm(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   className="submit-btn"
//                   onClick={() => {
//                     handleCreateProject({
//                       title: 'New Project',
//                       description: 'Project description',
//                       client: 'New Client',
//                       status: 'Planning',
//                       priority: 'Medium',
//                       endDate: '2024-12-31'
//                     });
//                   }}
//                 >
//                   Create Project
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default React.memo(ProjectsModal);














// import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
// import './ProjectsModal.css';
// import Header from '../common/Header';


// import { useDispatch, useSelector } from "react-redux";
// import { fetchUserProjects } from "../../redux/slices/projectsSlice";


// const ProjectsModal = ({ isOpen, onClose, currentUser, attendanceStatus, onCardClick }) => {

//   const dispatch = useDispatch();
//   const { list: projectList  , error } = useSelector(state => state.projects);



//   const [projects, setProjects] = useState([]);
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [viewMode, setViewMode] = useState('list');
//   const [filters, setFilters] = useState({
//     status: '',
//     client: '',
//     priority: '',
//     search: ''
//   });

//   // Scroll state for header hide/show
//   const [isHeaderVisible, setIsHeaderVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
  
//   // Ref for the content wrapper
//   const contentRef = useRef(null);

//   // Check screen size for responsive design
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
    
//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);
    
//     return () => {
//       window.removeEventListener('resize', checkScreenSize);
//     };
//   }, []);

//   // Scroll event handler
//   useEffect(() => {
//     const handleScroll = () => {
//       const content = contentRef.current;
//       if (!content) return;

//       const currentScrollY = content.scrollTop;
      
//       if (currentScrollY > lastScrollY && currentScrollY > 30) {
//         setIsHeaderVisible(false);
//       } 
//       else if (currentScrollY < lastScrollY) {
//         setIsHeaderVisible(true);
//       }
      
//       setLastScrollY(currentScrollY);
//     };

//     const content = contentRef.current;
//     if (content) {
//       content.addEventListener('scroll', handleScroll, { passive: true });
//     }

//     return () => {
//       if (content) {
//         content.removeEventListener('scroll', handleScroll);
//       }
//     };
//   }, [lastScrollY]);

//   // Scroll to top function
//   const handleScrollToTop = useCallback(() => {
//     if (contentRef.current) {
//       contentRef.current.scrollTo({
//         top: 0,
//         behavior: 'smooth'
//       });
//       setIsHeaderVisible(true);
//     }
//   }, []);

//   // Handle menu item click in ProjectsModal
//   const handleHeaderCardClick = useCallback((itemId) => {
//     console.log('Header item clicked in ProjectsModal:', itemId);
    
//     // First close the ProjectsModal
//     onClose();
    
//     // Then call the parent's onCardClick after a short delay
//     setTimeout(() => {
//       if (onCardClick) {
//         onCardClick(itemId);
//       }
//     }, 100);
//   }, [onClose, onCardClick]);

//   // Handle profile click
//   const handleHeaderProfileClick = useCallback(() => {
//     console.log('Profile clicked in ProjectsModal');
//     onClose();
//     setTimeout(() => {
//       if (onCardClick) {
//         onCardClick('profile');
//       }
//     }, 100);
//   }, [onClose, onCardClick]);

//   // Handle logout
//   const handleHeaderLogout = useCallback(() => {
//     console.log('Logout from ProjectsModal');
//   }, []);

//   // Complete sample data
//   // const sampleProjects = useMemo(() => [
//   //   {
//   //     id: 1,
//   //     title: 'Website Redesign',
//   //     description: 'Complete redesign of company website with modern UI/UX',
//   //     tasks: 15,
//   //     users: ['John Smith', 'Emily Johnson', 'Michael Brown'],
//   //     client: 'ABC Corporation',
//   //     status: 'In Progress',
//   //     priority: 'High',
//   //     startDate: '2024-02-25',
//   //     endDate: '2024-05-30',
//   //     progress: 65,
//   //     remainingDays: 45,
//   //     budget: '$25,000'
//   //   },
//   //   {
//   //     id: 2,
//   //     title: 'Mobile App Development',
//   //     description: 'iOS and Android application for customer engagement',
//   //     tasks: 28,
//   //     users: ['Sarah Wilson', 'David Lee', 'Emma Garcia', 'Robert Chen'],
//   //     client: 'TechStart Inc',
//   //     status: 'Planning',
//   //     priority: 'High',
//   //     startDate: '2024-03-10',
//   //     endDate: '2024-08-15',
//   //     progress: 20,
//   //     remainingDays: 120,
//   //     budget: '$45,000'
//   //   },
//   //   {
//   //     id: 3,
//   //     title: 'E-commerce Platform',
//   //     description: 'Build online shopping platform with payment integration',
//   //     tasks: 42,
//   //     users: ['Michael Brown', 'Lisa Taylor', 'James Wilson'],
//   //     client: 'Retail Solutions',
//   //     status: 'Completed',
//   //     priority: 'Medium',
//   //     startDate: '2024-01-15',
//   //     endDate: '2024-04-30',
//   //     progress: 100,
//   //     remainingDays: 0,
//   //     budget: '$38,000'
//   //   },
//   //   {
//   //     id: 4,
//   //     title: 'CRM System Upgrade',
//   //     description: 'Upgrade existing CRM with new features and better UX',
//   //     tasks: 18,
//   //     users: ['Emily Johnson', 'Daniel Martinez'],
//   //     client: 'Global Enterprises',
//   //     status: 'On Hold',
//   //     priority: 'Low',
//   //     startDate: '2024-03-01',
//   //     endDate: '2024-06-30',
//   //     progress: 40,
//   //     remainingDays: 90,
//   //     budget: '$22,000'
//   //   },
//   //   {
//   //     id: 5,
//   //     title: 'Data Analytics Dashboard',
//   //     description: 'Interactive dashboard for business intelligence',
//   //     tasks: 24,
//   //     users: ['Sophia Davis', 'William Thompson', 'Olivia Anderson'],
//   //     client: 'DataCorp International',
//   //     status: 'In Progress',
//   //     priority: 'Medium',
//   //     startDate: '2024-02-15',
//   //     endDate: '2024-07-31',
//   //     progress: 75,
//   //     remainingDays: 100,
//   //     budget: '$35,000'
//   //   },
//   //   {
//   //     id: 6,
//   //     title: 'Cloud Migration',
//   //     description: 'Migrate infrastructure to AWS cloud platform',
//   //     tasks: 32,
//   //     users: ['Robert Chen', 'Emma Garcia', 'Michael Brown'],
//   //     client: 'Finance Bank Ltd',
//   //     status: 'In Progress',
//   //     priority: 'High',
//   //     startDate: '2024-03-05',
//   //     endDate: '2024-09-30',
//   //     progress: 55,
//   //     remainingDays: 150,
//   //     budget: '$60,000'
//   //   },
//   //   {
//   //     id: 7,
//   //     title: 'Marketing Campaign Website',
//   //     description: 'Landing pages and microsites for product launch',
//   //     tasks: 12,
//   //     users: ['Lisa Taylor', 'David Lee'],
//   //     client: 'Marketing Pros',
//   //     status: 'Completed',
//   //     priority: 'Low',
//   //     startDate: '2024-02-01',
//   //     endDate: '2024-03-15',
//   //     progress: 100,
//   //     remainingDays: 0,
//   //     budget: '$15,000'
//   //   },
//   //   {
//   //     id: 8,
//   //     title: 'API Integration Suite',
//   //     description: 'Build and integrate multiple third-party APIs',
//   //     tasks: 20,
//   //     users: ['Daniel Martinez', 'Sophia Davis', 'John Smith'],
//   //     client: 'ConnectTech Solutions',
//   //     status: 'Planning',
//   //     priority: 'Medium',
//   //     startDate: '2024-04-01',
//   //     endDate: '2024-07-15',
//   //     progress: 10,
//   //     remainingDays: 95,
//   //     budget: '$28,000'
//   //   }
//   // ], []);

//   // Fetch projects data
//   // useEffect(() => {
//   //   if (isOpen) {
//   //     setLoading(true);
//   //     const timer = setTimeout(() => {
//   //       setProjects(sampleProjects);
//   //       setFilteredProjects(sampleProjects);
//   //       setLoading(false);
//   //     }, 1000);
      
//   //     return () => clearTimeout(timer);
//   //   }
//   // }, [isOpen, sampleProjects]);



//   useEffect(() => {
//   if (!isOpen) return;
//   if (!currentUser?._id && !currentUser?.employeeId) return;

//   const userId = currentUser?._id || currentUser?.employeeId;

//   dispatch(fetchUserProjects(userId));
// }, [isOpen, currentUser, dispatch]);


//   // Apply filters
//   useEffect(() => {
//     let result = [...projects];
    
//     if (filters.status) {
//       result = result.filter(project => project.status === filters.status);
//     }
    
//     if (filters.client) {
//       result = result.filter(project => 
//         project.client.toLowerCase().includes(filters.client.toLowerCase())
//       );
//     }
    
//     if (filters.priority) {
//       result = result.filter(project => project.priority === filters.priority);
//     }
    
//     if (filters.search) {
//       const searchLower = filters.search.toLowerCase();
//       result = result.filter(project => 
//         project.title.toLowerCase().includes(searchLower) ||
//         project.description.toLowerCase().includes(searchLower) ||
//         project.client.toLowerCase().includes(searchLower)
//       );
//     }
    
//     setFilteredProjects(result);
//   }, [filters, projects]);

//   // Filter handlers
//   const handleFilterChange = useCallback((name, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   }, []);

//   const handleCreateProject = useCallback((projectData) => {
//     const newProject = {
//       id: projects.length + 1,
//       ...projectData,
//       progress: 0,
//       remainingDays: Math.ceil((new Date(projectData.endDate) - new Date()) / (1000 * 60 * 60 * 24)),
//       users: [currentUser?.name || 'Current User']
//     };
    
//     setProjects(prev => [newProject, ...prev]);
//     setShowCreateForm(false);
//   }, [projects.length, currentUser]);

//   const handleDeleteProject = useCallback((projectId) => {
//     if (window.confirm('Are you sure you want to delete this project?')) {
//       setProjects(prev => prev.filter(project => project.id !== projectId));
//     }
//   }, []);

//   // Get status badge class
//   const getStatusClass = (status) => {
//     switch(status) {
//       case 'In Progress': return 'status-in-progress';
//       case 'Planning': return 'status-planning';
//       case 'Completed': return 'status-completed';
//       case 'On Hold': return 'status-on-hold';
//       default: return '';
//     }
//   };

//   // Get priority badge class
//   const getPriorityClass = (priority) => {
//     switch(priority) {
//       case 'High': return 'priority-high';
//       case 'Medium': return 'priority-medium';
//       case 'Low': return 'priority-low';
//       default: return '';
//     }
//   };

//   // Calculate stats
// const stats = useMemo(() => {
//   if (!projects || projects.length === 0)
//     return {
//       inProgress: 0,
//       completed: 0,
//       highPriority: 0,
//       averageProgress: 0,
//       totalTasks: 0,
//     };

//   return {
//     inProgress: projects.filter(p => p.status === 'In Progress').length,
//     completed: projects.filter(p => p.status === 'Completed').length,
//     highPriority: projects.filter(p => p.priority === 'High').length,
//     averageProgress: Math.round(
//       projects.reduce((acc, p) => acc + (p.progress || 0), 0) / projects.length
//     ),
//     totalTasks: projects.reduce((acc, p) => acc + (p.tasks || 0), 0),
//   };
// }, [projects]);


//   // Responsive header class
//   const getHeaderClass = useCallback(() => {
//     if (isMobile) {
//       return isHeaderVisible ? 'visible mobile' : 'hidden mobile';
//     }
//     return isHeaderVisible ? 'visible' : 'hidden';
//   }, [isHeaderVisible, isMobile]);

//   // Handle clear all filters
//   const handleClearFilters = useCallback(() => {
//     setFilters({
//       status: '',
//       client: '',
//       priority: '',
//       search: ''
//     });
//   }, []);

//   if (!isOpen) return null;

//   return (
//     <div className="projects-fullpage-container">
//       {/* Main Header with Hide/Show Animation */}
//       <div className={`projects-main-header-wrapper ${getHeaderClass()}`}>
//         <Header
//           currentUser={currentUser}
//           onProfileClick={handleHeaderProfileClick}
//           onLogout={handleHeaderLogout}
//           onCardClick={handleHeaderCardClick}
//           attendanceStatus={attendanceStatus}
//         />
//       </div>

//       {/* Projects Modal Header */}
//       {/* <div className={`projects-modal-header ${getHeaderClass()}`}>
//         <div className="projects-modal-header-content">
//           <div className="projects-modal-header-left">
//             <div className="projects-modal-header-icon">📋</div>
//             <div className="projects-modal-header-title">
//               <h1>Projects Management</h1>
//               <p>
//                 {isMobile ? (
//                   <>
//                     <span className="projects-modal-count-badge">{projects.length} Projects</span>
//                   </>
//                 ) : (
//                   <>
//                     Manage and track all projects • Total: 
//                     <span className="projects-modal-count-badge">{projects.length} Projects</span>
//                   </>
//                 )}
//               </p>
//             </div>
//           </div>
//           <button 
//             className="projects-modal-close-btn" 
//             onClick={onClose}
//             aria-label="Close projects modal"
//           >
//             ✕
//           </button>
//         </div>


     



//       </div> */}

//       {/* Floating Scroll to Top Button */}
//       {!isHeaderVisible && (
//         <button 
//           className="projects-floating-top-btn"
//           onClick={handleScrollToTop}
//           aria-label="Scroll to top"
//         >
//           <span className="projects-floating-icon">↑</span>
//         </button>
//       )}

//       {/* Scrollable Content Area */}
//       <div className="projects-content-wrapper" ref={contentRef}>
//         <div className="projects-main-area">
//           {/* Main Content Container */}
//           <div className="projects-main-container">
//             {/* Action Bar */}
//             {/* <div className="projects-action-bar">
//               <button 
//                 className="create-project-main-btn"
//                 onClick={() => setShowCreateForm(true)}
//               >
//                 <span className="btn-icon-main">+</span>
//                 {isMobile ? 'New Project' : 'Create New Project'}
//               </button>

//               <div className="projects-view-toggle">
//                 <button 
//                   className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
//                   onClick={() => setViewMode('list')}
//                   aria-label="List view"
//                 >
//                   <span className="view-toggle-icon">📋</span>
//                   {isMobile ? 'List' : 'List View'}
//                 </button>
//                 <button 
//                   className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
//                   onClick={() => setViewMode('grid')}
//                   aria-label="Grid view"
//                 >
//                   <span className="view-toggle-icon">🔲</span>
//                   {isMobile ? 'Grid' : 'Grid View'}
//                 </button>
//               </div>
//             </div> */}

//             {/* Filters Section */}
//             <div className="projects-filters-section">
//               <div className="filters-title">
//                 <span>Filters</span>
//                 {Object.values(filters).some(filter => filter !== '') && (
//                   <button 
//                     onClick={handleClearFilters}
//                     className="clear-all-filters-btn"
//                     style={{
//                       marginLeft: '10px',
//                       fontSize: '12px',
//                       padding: '2px 8px',
//                       background: 'rgba(239, 68, 68, 0.2)',
//                       border: '1px solid rgba(239, 68, 68, 0.3)',
//                       color: '#f87171',
//                       borderRadius: '4px',
//                       cursor: 'pointer'
//                     }}
//                   >
//                     Clear All
//                   </button>
//                 )}
//               </div>
//               <div className="filters-row">
//                 <div className="filter-group">
//                   <label>Status</label>
//                   <select 
//                     value={filters.status}
//                     onChange={(e) => handleFilterChange('status', e.target.value)}
//                     className="filter-select"
//                   >
//                     <option value="">All Status</option>
//                     <option value="Planning">Planning</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Completed">Completed</option>
//                     <option value="On Hold">On Hold</option>
//                   </select>
//                 </div>
                
//                 <div className="filter-group">
//                   <label>Priority</label>
//                   <select 
//                     value={filters.priority}
//                     onChange={(e) => handleFilterChange('priority', e.target.value)}
//                     className="filter-select"
//                   >
//                     <option value="">All Priorities</option>
//                     <option value="High">High</option>
//                     <option value="Medium">Medium</option>
//                     <option value="Low">Low</option>
//                   </select>
//                 </div>
                
//                 <div className="filter-group">
//                   <label>Client</label>
//                   <input
//                     type="text"
//                     value={filters.client}
//                     onChange={(e) => handleFilterChange('client', e.target.value)}
//                     placeholder="Search client..."
//                     className="filter-input"
//                   />
//                 </div>
                
//                 <div className="filter-group">
//                   <label>Search</label>
//                   <input
//                     type="text"
//                     value={filters.search}
//                     onChange={(e) => handleFilterChange('search', e.target.value)}
//                     placeholder="Search projects..."
//                     className="filter-input"
//                   />
//                 </div>
                
//                 <button 
//                   className="clear-filters-btn"
//                   onClick={handleClearFilters}
//                 >
//                   {isMobile ? 'Clear' : 'Clear Filters'}
//                 </button>
//               </div>
//             </div>

//             {/* Projects Table */}
//             {loading ? (
//               <div className="projects-loading-container">
//                 <div className="projects-loading-spinner"></div>
//                 <p className="projects-loading-text">Loading projects...</p>
//               </div>
//             ) : (
//               <div className="projects-table-container">
//                 <div className="table-responsive-wrapper">
//                   <table className="projects-table">
//                     <thead>
//                       <tr>
//                         <th>Project Title</th>
//                         <th>Client</th>
//                         <th>Status</th>
//                         <th>Priority</th>
//                         <th>Progress</th>
//                         <th>Team</th>
//                         <th>Timeline</th>
//                         {/* <th>Actions</th> */}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredProjects.map((project) => (
//                         <tr key={project.id}>
//                           <td>
//                             <div className="project-title-cell">
//                               <div className="project-title">{project.title}</div>
//                               <div className="project-description">{project.description}</div>
//                             </div>
//                           </td>
//                           <td>
//                             <div className="client-name">{project.client}</div>
//                           </td>
//                           <td>
//                             <span className={`status-badge ${getStatusClass(project.status)}`}>
//                               {isMobile ? project.status.split(' ')[0] : project.status}
//                             </span>
//                           </td>
//                           <td>
//                             <span className={`priority-badge ${getPriorityClass(project.priority)}`}>
//                               {isMobile ? project.priority.charAt(0) : project.priority}
//                             </span>
//                           </td>
//                           <td>
//                             <div className="progress-cell">
//                               <div className="project-progress-bar">
//                                 <div 
//                                   className="project-progress-fill"
//                                   style={{ width: `${project.progress}%` }}
//                                 ></div>
//                               </div>
//                               <div className="progress-percentage">{project.progress}%</div>
//                             </div>
//                           </td>
//                           <td>
//                             <div className="team-cell">
//                               <div className="team-count">{project.users.length} members</div>
//                               <div className="team-names">
//                                 {project.users.slice(0, isMobile ? 1 : 2).join(', ')}
//                                 {project.users.length > (isMobile ? 1 : 2) && '...'}
//                               </div>
//                             </div>
//                           </td>
//                           <td>
//                             <div className="timeline-cell">
//                               {isMobile ? (
//                                 <>
//                                   <div className="dates">
//                                     {new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                                   </div>
//                                   <div className="remaining-days">
//                                     {project.remainingDays > 0 
//                                       ? `${project.remainingDays}d left` 
//                                       : 'Done'}
//                                   </div>
//                                 </>
//                               ) : (
//                                 <>
//                                   <div className="dates">
//                                     {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
//                                   </div>
//                                   <div className="remaining-days">
//                                     {project.remainingDays > 0 
//                                       ? `${project.remainingDays} days left` 
//                                       : 'Completed'}
//                                   </div>
//                                 </>
//                               )}
//                             </div>
//                           </td>
//                           <td>
//                             {/* <div className="action-buttons">
//                               <button 
//                                 className="action-btn view-btn" 
//                                 title="View Details"
//                                 onClick={() => console.log('View project', project.id)}
//                               >
//                                 {isMobile ? '👁️' : '👁️'}
//                               </button>
//                               <button 
//                                 className="action-btn edit-btn" 
//                                 title="Edit Project"
//                                 onClick={() => console.log('Edit project', project.id)}
//                               >
//                                 {isMobile ? '✏️' : '✏️'}
//                               </button>
//                               <button 
//                                 className="action-btn delete-btn" 
//                                 title="Delete Project"
//                                 onClick={() => handleDeleteProject(project.id)}
//                               >
//                                 {isMobile ? '🗑️' : '🗑️'}
//                               </button>
//                             </div> */}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
                
//                 {filteredProjects.length === 0 && (
//                   <div className="no-projects-message">
//                     No projects found. Try adjusting your filters or create a new project.
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Stats Footer */}
//           <div className="projects-stats-footer">
//             <div className="stats-grid-main">
//               <div className="stat-item-main">
//                 <div className="stat-value-main">{stats.inProgress}</div>
//                 <div className="stat-label-main">In Progress</div>
//               </div>
//               <div className="stat-item-main">
//                 <div className="stat-value-main">{stats.completed}</div>
//                 <div className="stat-label-main">Completed</div>
//               </div>
//               <div className="stat-item-main">
//                 <div className="stat-value-main">{stats.highPriority}</div>
//                 <div className="stat-label-main">High Priority</div>
//               </div>
//               <div className="stat-item-main">
//                 <div className="stat-value-main">{stats.averageProgress}%</div>
//                 <div className="stat-label-main">Avg Progress</div>
//               </div>
//               {!isMobile && (
//                 <>
//                   <div className="stat-item-main">
//                     <div className="stat-value-main">{stats.totalTasks}</div>
//                     <div className="stat-label-main">Total Tasks</div>
//                   </div>
//                   {/* <div className="stat-item-main">
//                     <div className="stat-value-main">${stats.totalBudget.toLocaleString()}</div>
//                     <div className="stat-label-main">Total Budget</div>
//                   </div> */}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Create Project Form (Simplified for example) */}
//       {showCreateForm && (
//         <div className="create-project-overlay">
//           <div className="create-project-modal">
//             <div className="create-project-header">
//               <h2>Create New Project</h2>
//               <button onClick={() => setShowCreateForm(false)}>✕</button>
//             </div>
//             <div className="create-project-form">
//               <input type="text" placeholder="Project Title" />
//               <textarea placeholder="Description" rows="3"></textarea>
//               <input type="text" placeholder="Client Name" />
//               <div className="form-row">
//                 <select>
//                   <option>Select Status</option>
//                   <option>Planning</option>
//                   <option>In Progress</option>
//                   <option>Completed</option>
//                 </select>
//                 <select>
//                   <option>Select Priority</option>
//                   <option>High</option>
//                   <option>Medium</option>
//                   <option>Low</option>
//                 </select>
//               </div>
//               <div className="form-actions">
//                 <button 
//                   className="cancel-btn"
//                   onClick={() => setShowCreateForm(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   className="submit-btn"
//                   onClick={() => {
//                     handleCreateProject({
//                       title: 'New Project',
//                       description: 'Project description',
//                       client: 'New Client',
//                       status: 'Planning',
//                       priority: 'Medium',
//                       endDate: '2024-12-31'
//                     });
//                   }}
//                 >
//                   Create Project
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default React.memo(ProjectsModal);






import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import './ProjectsModal.css';
import Header from '../common/Header';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProjects } from "../../redux/slices/projectsSlice";

const ProjectsModal = ({ isOpen, onClose, currentUser, attendanceStatus, onCardClick }) => {
  const dispatch = useDispatch();
  const { list: projectList, loading: reduxLoading, error: reduxError } = useSelector(state => state.projects);

  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const [filters, setFilters] = useState({
    status: '',
    client: '',
    priority: '',
    search: ''
  });

  // Scroll state for header hide/show
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Ref for the content wrapper
  const contentRef = useRef(null);

  // Check screen size for responsive design
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Scroll event handler
  useEffect(() => {
    const handleScroll = () => {
      const content = contentRef.current;
      if (!content) return;

      const currentScrollY = content.scrollTop;
      
      if (currentScrollY > lastScrollY && currentScrollY > 30) {
        setIsHeaderVisible(false);
      } 
      else if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    const content = contentRef.current;
    if (content) {
      content.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (content) {
        content.removeEventListener('scroll', handleScroll);
      }
    };
  }, [lastScrollY]);

  // Scroll to top function
  const handleScrollToTop = useCallback(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      setIsHeaderVisible(true);
    }
  }, []);

  // Handle menu item click in ProjectsModal
  const handleHeaderCardClick = useCallback((itemId) => {
    console.log('Header item clicked in ProjectsModal:', itemId);
    
    // First close the ProjectsModal
    onClose();
    
    // Then call the parent's onCardClick after a short delay
    setTimeout(() => {
      if (onCardClick) {
        onCardClick(itemId);
      }
    }, 100);
  }, [onClose, onCardClick]);

  // Handle profile click
  const handleHeaderProfileClick = useCallback(() => {
    console.log('Profile clicked in ProjectsModal');
    onClose();
    setTimeout(() => {
      if (onCardClick) {
        onCardClick('profile');
      }
    }, 100);
  }, [onClose, onCardClick]);

  // Handle logout
  const handleHeaderLogout = useCallback(() => {
    console.log('Logout from ProjectsModal');
  }, []);

  // Fetch projects data from API
  useEffect(() => {
    if (!isOpen) return;
    if (!currentUser?._id && !currentUser?.employeeId) return;

    const userId = currentUser?._id || currentUser?.employeeId;
    console.log("Fetching projects for user:", userId);
    dispatch(fetchUserProjects(userId));
  }, [isOpen, currentUser, dispatch]);

  // Update projects state when Redux data changes
  useEffect(() => {
    if (projectList && Array.isArray(projectList)) {
      console.log("Setting projects from Redux:", projectList.length);
      setProjects(projectList);
      setFilteredProjects(projectList);
    }
  }, [projectList]);

  // Apply filters
  useEffect(() => {
    let result = [...projects];
    
    if (filters.status) {
      result = result.filter(project => project.status === filters.status);
    }
    
    if (filters.client) {
      result = result.filter(project => 
        project.client && project.client.toLowerCase().includes(filters.client.toLowerCase())
      );
    }
    
    if (filters.priority) {
      result = result.filter(project => project.priority === filters.priority);
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(project => 
        (project.title && project.title.toLowerCase().includes(searchLower)) ||
        (project.description && project.description.toLowerCase().includes(searchLower)) ||
        (project.client && project.client.toLowerCase().includes(searchLower))
      );
    }
    
    setFilteredProjects(result);
  }, [filters, projects]);

  // Filter handlers
  const handleFilterChange = useCallback((name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleCreateProject = useCallback((projectData) => {
    const newProject = {
      id: projects.length + 1,
      ...projectData,
      progress: 0,
      remainingDays: Math.ceil((new Date(projectData.endDate) - new Date()) / (1000 * 60 * 60 * 24)),
      users: [currentUser?.name || 'Current User']
    };
    
    setProjects(prev => [newProject, ...prev]);
    setShowCreateForm(false);
  }, [projects.length, currentUser]);

  const handleDeleteProject = useCallback((projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(project => project.id !== projectId));
    }
  }, []);

  // Get status badge class
  const getStatusClass = (status) => {
    if (!status) return '';
    switch(status.toLowerCase()) {
      case 'in progress': 
      case 'in-progress': return 'status-in-progress';
      case 'planning': return 'status-planning';
      case 'completed': return 'status-completed';
      case 'on hold': 
      case 'on-hold': return 'status-on-hold';
      default: return '';
    }
  };

  // Get priority badge class
  const getPriorityClass = (priority) => {
    if (!priority) return '';
    switch(priority.toLowerCase()) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  // Calculate stats
  const stats = useMemo(() => {
    if (!projects || projects.length === 0) {
      return {
        inProgress: 0,
        completed: 0,
        highPriority: 0,
        averageProgress: 0,
        totalTasks: 0,
      };
    }

    const inProgress = projects.filter(p => 
      p.status && p.status.toLowerCase().includes('progress')
    ).length;
    
    const completed = projects.filter(p => 
      p.status && p.status.toLowerCase().includes('complete')
    ).length;
    
    const highPriority = projects.filter(p => 
      p.priority && p.priority.toLowerCase() === 'high'
    ).length;
    
    const totalProgress = projects.reduce((acc, p) => 
      acc + (p.progress || 0), 0
    );
    
    const averageProgress = projects.length > 0 
      ? Math.round(totalProgress / projects.length) 
      : 0;
    
    const totalTasks = projects.reduce((acc, p) => 
      acc + (p.tasks || p.taskCount || 0), 0
    );

    return {
      inProgress,
      completed,
      highPriority,
      averageProgress,
      totalTasks,
    };
  }, [projects]);

  // Responsive header class
  const getHeaderClass = useCallback(() => {
    if (isMobile) {
      return isHeaderVisible ? 'visible mobile' : 'hidden mobile';
    }
    return isHeaderVisible ? 'visible' : 'hidden';
  }, [isHeaderVisible, isMobile]);

  // Handle clear all filters
  const handleClearFilters = useCallback(() => {
    setFilters({
      status: '',
      client: '',
      priority: '',
      search: ''
    });
  }, []);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric' 
      });
    } catch (error) {
      return dateString;
    }
  };

  // Calculate remaining days
  const calculateRemainingDays = (endDate) => {
    if (!endDate) return 0;
    try {
      const end = new Date(endDate);
      const today = new Date();
      const diffTime = end - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    } catch (error) {
      return 0;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="projects-fullpage-container">
      {/* Main Header with Hide/Show Animation */}
      <div className={`projects-main-header-wrapper ${getHeaderClass()}`}>
        <Header
          currentUser={currentUser}
          onProfileClick={handleHeaderProfileClick}
          onLogout={handleHeaderLogout}
          onCardClick={handleHeaderCardClick}
          attendanceStatus={attendanceStatus}
        />
      </div>

      {/* Floating Scroll to Top Button */}
      {!isHeaderVisible && (
        <button 
          className="projects-floating-top-btn"
          onClick={handleScrollToTop}
          aria-label="Scroll to top"
        >
          <span className="projects-floating-icon">↑</span>
        </button>
      )}

      {/* Scrollable Content Area */}
      <div className="projects-content-wrapper" ref={contentRef}>
        <div className="projects-main-area">
          {/* Main Content Container */}
          <div className="projects-main-container">
            {/* Filters Section */}
            <div className="projects-filters-section">
              <div className="filters-title">
                <span>Filters</span>
                {Object.values(filters).some(filter => filter !== '') && (
                  <button 
                    onClick={handleClearFilters}
                    className="clear-all-filters-btn"
                    style={{
                      marginLeft: '10px',
                      fontSize: '12px',
                      padding: '2px 8px',
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#f87171',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Clear All
                  </button>
                )}
              </div>
              <div className="filters-row">
                <div className="filter-group">
                  <label>Status</label>
                  <select 
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="filter-select"
                  >
                    <option value="">All Status</option>
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>Priority</label>
                  <select 
                    value={filters.priority}
                    onChange={(e) => handleFilterChange('priority', e.target.value)}
                    className="filter-select"
                  >
                    <option value="">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                
                <div className="filter-group">
                  <label>Client</label>
                  <input
                    type="text"
                    value={filters.client}
                    onChange={(e) => handleFilterChange('client', e.target.value)}
                    placeholder="Search client..."
                    className="filter-input"
                  />
                </div>
                
                <div className="filter-group">
                  <label>Search</label>
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    placeholder="Search projects..."
                    className="filter-input"
                  />
                </div>
                
                <button 
                  className="clear-filters-btn"
                  onClick={handleClearFilters}
                >
                  {isMobile ? 'Clear' : 'Clear Filters'}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {reduxError && (
              <div className="projects-error-container">
                <div className="projects-error-message">
                  ⚠️ Error: {reduxError}
                </div>
                <button 
                  className="retry-btn"
                  onClick={() => {
                    const userId = currentUser?._id || currentUser?.employeeId;
                    if (userId) {
                      dispatch(fetchUserProjects(userId));
                    }
                  }}
                >
                  Retry
                </button>
              </div>
            )}

            {/* Projects Table */}
            {reduxLoading ? (
              <div className="projects-loading-container">
                <div className="projects-loading-spinner"></div>
                <p className="projects-loading-text">Loading projects...</p>
              </div>
            ) : (
              <div className="projects-table-container">
                <div className="table-responsive-wrapper">
                  <table className="projects-table">
                    <thead>
                      <tr>
                        <th>Project Title</th>
                        <th>Client</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Progress</th>
                        <th>Team</th>
                        <th>Timeline</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProjects.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="no-data-message">
                            {projects.length === 0 
                              ? "No projects found. Start by creating your first project!" 
                              : "No projects match your filters. Try changing filter criteria."}
                          </td>
                        </tr>
                      ) : (
                        filteredProjects.map((project) => {
                          const remainingDays = calculateRemainingDays(project.endDate);
                          const teamMembers = project.teamMembers || project.users || [];
                          
                          return (
                            <tr key={project._id || project.id || Math.random()}>
                              <td>
                                <div className="project-title-cell">
                                  <div className="project-title">{project.title || 'Untitled Project'}</div>
                                  <div className="project-description">{project.description || 'No description'}</div>
                                </div>
                              </td>
                              <td>
                                <div className="client-name">{project.client || 'N/A'}</div>
                              </td>
                              <td>
                                <span className={`status-badge ${getStatusClass(project.status)}`}>
                                  {isMobile ? (project.status ? project.status.split(' ')[0] : 'N/A') : (project.status || 'N/A')}
                                </span>
                              </td>
                              <td>
                                <span className={`priority-badge ${getPriorityClass(project.priority)}`}>
                                  {isMobile ? (project.priority ? project.priority.charAt(0) : 'N/A') : (project.priority || 'N/A')}
                                </span>
                              </td>
                              <td>
                                <div className="progress-cell">
                                  <div className="project-progress-bar">
                                    <div 
                                      className="project-progress-fill"
                                      style={{ width: `${project.progress || 0}%` }}
                                    ></div>
                                  </div>
                                  <div className="progress-percentage">{project.progress || 0}%</div>
                                </div>
                              </td>
                              <td>
                                <div className="team-cell">
                                  <div className="team-count">{teamMembers.length} member(s)</div>
                                  <div className="team-names">
                                    {Array.isArray(teamMembers) 
                                      ? teamMembers.slice(0, isMobile ? 1 : 2).join(', ')
                                      : 'N/A'}
                                    {teamMembers.length > (isMobile ? 1 : 2) && '...'}
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="timeline-cell">
                                  {isMobile ? (
                                    <>
                                      <div className="dates">
                                        {project.startDate 
                                          ? formatDate(project.startDate).split(' ')[0] + ' ' + formatDate(project.startDate).split(' ')[1]
                                          : 'N/A'}
                                      </div>
                                      <div className="remaining-days">
                                        {remainingDays > 0 
                                          ? `${remainingDays}d left` 
                                          : 'Done'}
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div className="dates">
                                        {project.startDate ? formatDate(project.startDate) : 'N/A'} - {project.endDate ? formatDate(project.endDate) : 'N/A'}
                                      </div>
                                      <div className="remaining-days">
                                        {remainingDays > 0 
                                          ? `${remainingDays} days left` 
                                          : 'Completed'}
                                      </div>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* Project count info */}
                <div className="projects-count-info">
                  Showing {filteredProjects.length} of {projects.length} projects
                </div>
              </div>
            )}
          </div>

          {/* Stats Footer */}
          <div className="projects-stats-footer">
            <div className="stats-grid-main">
              <div className="stat-item-main">
                <div className="stat-value-main">{stats.inProgress}</div>
                <div className="stat-label-main">In Progress</div>
              </div>
              <div className="stat-item-main">
                <div className="stat-value-main">{stats.completed}</div>
                <div className="stat-label-main">Completed</div>
              </div>
              <div className="stat-item-main">
                <div className="stat-value-main">{stats.highPriority}</div>
                <div className="stat-label-main">High Priority</div>
              </div>
              <div className="stat-item-main">
                <div className="stat-value-main">{stats.averageProgress}%</div>
                <div className="stat-label-main">Avg Progress</div>
              </div>
              {!isMobile && (
                <div className="stat-item-main">
                  <div className="stat-value-main">{stats.totalTasks}</div>
                  <div className="stat-label-main">Total Tasks</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Project Form (Simplified for example) */}
      {showCreateForm && (
        <div className="create-project-overlay">
          <div className="create-project-modal">
            <div className="create-project-header">
              <h2>Create New Project</h2>
              <button onClick={() => setShowCreateForm(false)}>✕</button>
            </div>
            <div className="create-project-form">
              <input type="text" placeholder="Project Title" />
              <textarea placeholder="Description" rows="3"></textarea>
              <input type="text" placeholder="Client Name" />
              <div className="form-row">
                <select>
                  <option>Select Status</option>
                  <option>Planning</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
                <select>
                  <option>Select Priority</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div className="form-actions">
                <button 
                  className="cancel-btn"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </button>
                <button 
                  className="submit-btn"
                  onClick={() => {
                    handleCreateProject({
                      title: 'New Project',
                      description: 'Project description',
                      client: 'New Client',
                      status: 'Planning',
                      priority: 'Medium',
                      endDate: '2024-12-31'
                    });
                  }}
                >
                  Create Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(ProjectsModal);