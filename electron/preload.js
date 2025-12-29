// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   // Activity tracking methods
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
//   getTrackingData: () => ipcRenderer.invoke('get-tracking-data'),
//   getCurrentApp: () => ipcRenderer.invoke('get-current-app'),

//   // Listen for activity updates
//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },

//   // Remove listeners
//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });


// const { contextBridge, ipcRenderer } = require('electron');

// // Expose protected methods that allow the renderer process to use
// // the ipcRenderer without exposing the entire object
// contextBridge.exposeInMainWorld('electronAPI', {
//   // Activity tracking methods
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
//   getTrackingData: () => ipcRenderer.invoke('get-tracking-data'),
//   getCurrentApp: () => ipcRenderer.invoke('get-current-app'),

//   // Listen for activity updates
//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },

//   // Remove listeners
//   removeAllListeners: (channel) => {
//     ipcRenderer.removeAllListeners(channel);
//   }
// });





// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
//   getTrackingData: () => ipcRenderer.invoke('get-tracking-data'),
//   reportActivity: () => ipcRenderer.invoke('report-activity'),

//   // ✅ Real-time updates
//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },

//   // ✅ Remove listeners
//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });


// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
//   getTrackingData: () => ipcRenderer.invoke('get-tracking-data'),
//   reportActivity: () => ipcRenderer.invoke('report-activity'),

//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },

//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });


// updated code



// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
//   getTrackingData: () => ipcRenderer.invoke('get-tracking-data'),
//   reportActivity: () => ipcRenderer.invoke('report-activity'),

//   // ✅ Add location functions
//   getUserLocation: () => ipcRenderer.invoke('get-user-location'),

//   // Browser geolocation wrapper for Electron
//   getBrowserLocation: () => {
//     return new Promise((resolve) => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             resolve({
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude,
//               accuracy: position.coords.accuracy,
//               source: 'browser'
//             });
//           },
//           (error) => {
//             console.log('Browser geolocation error:', error);
//             resolve(null);
//           },
//           {
//             enableHighAccuracy: true,
//             timeout: 10000,
//             maximumAge: 0
//           }
//         );
//       } else {
//         resolve(null);
//       }
//     });
//   },

//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },

//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });








// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),

//   // ✅ Correctly mapped location function
//   getCurrentLocation: () => ipcRenderer.invoke('get-current-location'),

//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },

//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });

// +++++++++++++++++++++==========>



//   const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),

//   // FINAL: correct IPC name
//   getCurrentLocation: () => ipcRenderer.invoke('get-current-location'),

//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },

//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });



//            111111111111111111111111111111111111111111111111111111111



// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   // Activity Tracking (Existing - NO CHANGE)
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),

//   // Location APIs (Updated with new functions)
//   getCurrentLocation: () => ipcRenderer.invoke('get-current-location'),
//   getLastKnownLocation: () => ipcRenderer.invoke('get-last-known-location'),
  
//   // App Info (New)
//   getCurrentApp: () => ipcRenderer.invoke('get-current-app'),
  
//   // Health Check (New)
//   healthCheck: () => ipcRenderer.invoke('health-check'),

//   // Event Listeners (Updated)
//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },

//   // Location Events (New - optional for future use)
//   onLocationUpdate: (callback) => {
//     // This can be implemented if you want real-time location updates
//     ipcRenderer.on('location-update', (event, data) => callback(data));
//   },

//   // Remove Listeners (Updated)
//   removeActivityListener: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   },
  
//   removeLocationListener: () => {
//     ipcRenderer.removeAllListeners('location-update');
//   },
  
//   // Keep existing removeAllListeners for backward compatibility
//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//     ipcRenderer.removeAllListeners('location-update');
//   }
// });



// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
//   getTrackingData: () => ipcRenderer.invoke('get-tracking-data'),
//   getCurrentLocation: () => ipcRenderer.invoke('get-current-location'),
//   reportActivity: () => ipcRenderer.invoke('report-activity'),
//   healthCheck: () => ipcRenderer.invoke('health-check'),
  
//   // Listen for activity updates
//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },
  
//   // Remove listener
//   removeActivityUpdateListener: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });



// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
//   getTrackingData: () => ipcRenderer.invoke('get-tracking-data'),
//   getCurrentLocation: () => ipcRenderer.invoke('get-current-location'),
//   reportActivity: () => ipcRenderer.invoke('report-activity'),
//   healthCheck: () => ipcRenderer.invoke('health-check'),
  
//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },
  
//   removeActivityUpdateListener: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });

















// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),

//   // ✅ Correctly mapped location function
//   getCurrentLocation: () => ipcRenderer.invoke('get-current-location'),

//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },

//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });


// ye copy kiye he iske niche or ye val working code he thik





















// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),

//   // ✅ Correctly mapped location function
//   getCurrentLocation: () => ipcRenderer.invoke('get-current-location'),

//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },

//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });




// const { contextBridge, ipcRenderer } = require('electron');

// // ✅ SAFE API EXPOSURE - Only expose what's needed
// contextBridge.exposeInMainWorld('electronAPI', {
//   // ============= LOCATION API =============
//   getCurrentLocation: () => {
//     console.log('[PRELOAD] getCurrentLocation called');
//     return ipcRenderer.invoke('get-current-location');
//   },

//   // ============= ACTIVITY TRACKING =============
//   startTracking: () => {
//     console.log('[PRELOAD] startTracking called');
//     return ipcRenderer.invoke('start-tracking');
//   },

//   stopTracking: () => {
//     console.log('[PRELOAD] stopTracking called');
//     return ipcRenderer.invoke('stop-tracking');
//   },

//   // ============= ACTIVITY UPDATES =============
//   onActivityUpdate: (callback) => {
//     console.log('[PRELOAD] Setting up activity update listener');
//     const wrappedCallback = (event, data) => {
//       console.log('[PRELOAD] Activity update received:', data);
//       callback(data);
//     };
    
//     // Remove any existing listeners first
//     ipcRenderer.removeAllListeners('activity-update');
//     // Add new listener
//     ipcRenderer.on('activity-update', wrappedCallback);
    
//     // Return cleanup function
//     return () => {
//       console.log('[PRELOAD] Removing activity update listener');
//       ipcRenderer.removeListener('activity-update', wrappedCallback);
//     };
//   },

//   // ============= CLEANUP =============
//   removeActivityListeners: () => {
//     console.log('[PRELOAD] Removing all activity listeners');
//     ipcRenderer.removeAllListeners('activity-update');
//   },

//   // ============= UTILITY FUNCTIONS =============
//   isElectron: () => {
//     return true; // Indicate that we're running in Electron
//   },

//   // ============= ERROR HANDLING =============
//   onError: (callback) => {
//     const wrappedCallback = (event, error) => {
//       console.error('[PRELOAD] Error received:', error);
//       callback(error);
//     };
//     ipcRenderer.on('electron-error', wrappedCallback);
    
//     return () => {
//       ipcRenderer.removeListener('electron-error', wrappedCallback);
//     };
//   }
// });

// // ✅ Console log for debugging
// console.log('[PRELOAD] Electron preload script loaded successfully');



// ui chla rha he lekin main js ka nahi chal raha h e



// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   getCurrentLocation: () => ipcRenderer.invoke('get-current-location'),
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
//   onActivityUpdate: (callback) => {
//     const wrappedCallback = (event, data) => {
//       console.log('[PRELOAD] Sending activity update to renderer:', data);
//       callback(data);
//     };
    
//     ipcRenderer.on('activity-update', wrappedCallback);
    
//     // Return cleanup function
//     return () => {
//       console.log('[PRELOAD] Removing activity listener');
//       ipcRenderer.removeListener('activity-update', wrappedCallback);
//     };
//   }
// });






// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   // Location
//   getCurrentLocation: () => ipcRenderer.invoke('get-current-location'),
  
//   // Tracking
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
  
//   // Activity Updates
//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//     // Return cleanup function
//     return () => ipcRenderer.removeAllListeners('activity-update');
//   }
// });


// // preload.js - SIMPLE VERSION
// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   // Location - simple call
//   getCurrentLocation: () => {
//     return ipcRenderer.invoke('get-current-location');
//   },
  
//   // Tracking
//   startTracking: () => {
//     return ipcRenderer.invoke('start-tracking');
//   },
  
//   stopTracking: () => {
//     return ipcRenderer.invoke('stop-tracking');
//   },
  
//   // Activity updates
//   onActivityUpdate: (callback) => {
//     const wrappedCallback = (event, data) => {
//       callback(data);
//     };
    
//     ipcRenderer.on('activity-update', wrappedCallback);
    
//     // Return cleanup function
//     return () => {
//       ipcRenderer.removeListener('activity-update', wrappedCallback);
//     };
//   }
// });















// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),
//   getCurrentLocation: () => ipcRenderer.invoke('get-current-location'),
//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },
//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });


// lcation required vali problem he 




















// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//   startTracking: () => ipcRenderer.invoke('start-tracking'),
//   stopTracking: () => ipcRenderer.invoke('stop-tracking'),

//   // ✅ Correctly mapped location function
//   getCurrentLocation: () => ipcRenderer.invoke('get-current-location'),

//   onActivityUpdate: (callback) => {
//     ipcRenderer.on('activity-update', (event, data) => callback(data));
//   },

//   removeAllListeners: () => {
//     ipcRenderer.removeAllListeners('activity-update');
//   }
// });




const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  startTracking: () => ipcRenderer.invoke('start-tracking'),
  stopTracking: () => ipcRenderer.invoke('stop-tracking'),
  
  // ✅ Location function
  getCurrentLocation: () => ipcRenderer.invoke('get-current-location'),

  onActivityUpdate: (callback) => {
    ipcRenderer.on('activity-update', (event, data) => callback(data));
  },

  removeAllListeners: () => {
    ipcRenderer.removeAllListeners('activity-update');
  }
});