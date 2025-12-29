// // utils/attendanceSync.js - Production sync utility

// class AttendanceSyncManager {
//   constructor() {
//     this.retryQueue = [];
//     this.maxRetries = 3;
//     this.retryDelay = 30000; // 30 seconds
//     this.isSyncing = false;
//   }

//   // Store punch for later retry
//   storeForRetry(punchData) {
//     const retryItem = {
//       ...punchData,
//       id: `retry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
//       createdAt: new Date().toISOString(),
//       attempts: 0,
//       lastAttempt: null
//     };
    
//     this.retryQueue.push(retryItem);
//     this.saveToStorage();
    
//     console.log(`📦 Stored for retry: ${retryItem.id}`, retryItem);
//     return retryItem.id;
//   }

//   // Process retry queue
//   async processRetryQueue() {
//     if (this.isSyncing || this.retryQueue.length === 0) {
//       return;
//     }
    
//     this.isSyncing = true;
    
//     try {
//       const item = this.retryQueue[0];
      
//       if (item.attempts >= this.maxRetries) {
//         console.warn(`⚠️ Max retries reached for ${item.id}`);
//         this.retryQueue.shift();
//         this.saveToStorage();
//         return;
//       }
      
//       console.log(`🔄 Attempting sync for ${item.id} (attempt ${item.attempts + 1})`);
      
//       let result;
//       if (item.type === 'punch-in') {
//         result = await this.syncPunchIn(item.data);
//       } else if (item.type === 'punch-out') {
//         result = await this.syncPunchOut(item.data);
//       }
      
//       if (result.success) {
//         console.log(`✅ Sync successful for ${item.id}`);
//         this.retryQueue.shift();
//         this.saveToStorage();
//       } else {
//         console.warn(`❌ Sync failed for ${item.id}:`, result.error);
//         item.attempts += 1;
//         item.lastAttempt = new Date().toISOString();
//         this.saveToStorage();
//       }
      
//     } catch (error) {
//       console.error('❌ Sync process error:', error);
//     } finally {
//       this.isSyncing = false;
      
//       // Schedule next retry if queue not empty
//       if (this.retryQueue.length > 0) {
//         setTimeout(() => this.processRetryQueue(), this.retryDelay);
//       }
//     }
//   }

//   async syncPunchIn(punchData) {
//     try {
//       const response = await fetch('/api/attendance/mark-in', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify(punchData)
//       });
      
//       const data = await response.json();
      
//       return {
//         success: data.status === true,
//         data: data,
//         error: data.message
//       };
      
//     } catch (error) {
//       return {
//         success: false,
//         error: error.message
//       };
//     }
//   }

//   async syncPunchOut(punchData) {
//     try {
//       const response = await fetch('/api/attendance/mark-out', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify(punchData)
//       });
      
//       const data = await response.json();
      
//       return {
//         success: data.status === true,
//         data: data,
//         error: data.message
//       };
      
//     } catch (error) {
//       return {
//         success: false,
//         error: error.message
//       };
//     }
//   }

//   saveToStorage() {
//     try {
//       localStorage.setItem('attendance_retry_queue', JSON.stringify(this.retryQueue));
//     } catch (error) {
//       console.error('Failed to save retry queue:', error);
//     }
//   }

//   loadFromStorage() {
//     try {
//       const saved = localStorage.getItem('attendance_retry_queue');
//       if (saved) {
//         this.retryQueue = JSON.parse(saved);
//       }
//     } catch (error) {
//       console.error('Failed to load retry queue:', error);
//     }
//   }

//   getQueueLength() {
//     return this.retryQueue.length;
//   }

//   clearQueue() {
//     this.retryQueue = [];
//     this.saveToStorage();
//   }
// }

// // Singleton instance
// export const attendanceSync = new AttendanceSyncManager();

// // Initialize on load
// if (typeof window !== 'undefined') {
//   attendanceSync.loadFromStorage();
  
//   // Start processing queue
//   setTimeout(() => attendanceSync.processRetryQueue(), 10000);
  
//   // Listen for online/offline events
//   window.addEventListener('online', () => {
//     console.log('🌐 Device online - attempting sync');
//     attendanceSync.processRetryQueue();
//   });
// }




// utils/attendanceSync.js

class AttendanceSyncManager {
  constructor() {
    this.retryQueue = [];
    this.maxRetries = 3;
    this.retryDelay = 30000; // 30 seconds
    this.isSyncing = false;
    this.syncListeners = [];
    this.initialize();
  }

  initialize() {
    this.loadFromStorage();
    console.log(`📦 Sync Manager initialized with ${this.retryQueue.length} pending items`);
    
    // Auto-retry when coming online
    window.addEventListener('online', () => {
      console.log('🌐 Network online - starting sync');
      this.processRetryQueue();
    });
    
    // Start processing queue
    setTimeout(() => this.processRetryQueue(), 5000);
  }

  // Add sync status listener
  addSyncListener(callback) {
    this.syncListeners.push(callback);
  }

  removeSyncListener(callback) {
    this.syncListeners = this.syncListeners.filter(listener => listener !== callback);
  }

  notifyListeners(event, data) {
    this.syncListeners.forEach(listener => {
      try {
        listener(event, data);
      } catch (error) {
        console.error('Sync listener error:', error);
      }
    });
  }

  // Store punch for later retry
  storeForRetry(punchData) {
    const retryItem = {
      ...punchData,
      id: `sync_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      attempts: punchData.attempts || 0,
      lastAttempt: null,
      status: 'pending'
    };
    
    this.retryQueue.push(retryItem);
    this.saveToStorage();
    
    console.log(`📦 Stored for retry: ${retryItem.id}`, retryItem);
    this.notifyListeners('item_added', retryItem);
    
    return retryItem.id;
  }

  // Process retry queue
  async processRetryQueue() {
    if (this.isSyncing || this.retryQueue.length === 0) {
      return { processed: 0, success: 0, failed: 0 };
    }
    
    this.isSyncing = true;
    const results = { processed: 0, success: 0, failed: 0 };
    
    try {
      console.log(`🔄 Processing ${this.retryQueue.length} pending sync items`);
      this.notifyListeners('sync_started', { count: this.retryQueue.length });
      
      // Process items one by one
      while (this.retryQueue.length > 0) {
        const item = this.retryQueue[0];
        
        if (item.attempts >= this.maxRetries) {
          console.warn(`⚠️ Max retries reached for ${item.id}, removing from queue`);
          this.retryQueue.shift();
          results.failed++;
          this.notifyListeners('item_failed', { ...item, reason: 'max_retries' });
          continue;
        }
        
        console.log(`🔄 Attempting sync for ${item.id} (attempt ${item.attempts + 1}/${this.maxRetries})`);
        
        let result;
        if (item.type === 'punch-in') {
          result = await this.syncPunchIn(item.data);
        } else if (item.type === 'punch-out') {
          result = await this.syncPunchOut(item.data);
        } else {
          console.error(`❌ Unknown sync type: ${item.type}`);
          this.retryQueue.shift();
          results.failed++;
          continue;
        }
        
        results.processed++;
        
        if (result.success) {
          console.log(`✅ Sync successful for ${item.id}`);
          this.retryQueue.shift();
          results.success++;
          this.notifyListeners('item_success', { ...item, response: result.data });
        } else {
          console.warn(`❌ Sync failed for ${item.id}:`, result.error);
          item.attempts += 1;
          item.lastAttempt = new Date().toISOString();
          item.status = 'failed';
          results.failed++;
          this.notifyListeners('item_retry', { ...item, error: result.error });
          
          // Move to end of queue for retry
          this.retryQueue.shift();
          this.retryQueue.push(item);
        }
        
        this.saveToStorage();
        
        // Small delay between syncs to avoid overwhelming server
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
    } catch (error) {
      console.error('❌ Sync process error:', error);
      this.notifyListeners('sync_error', { error: error.message });
    } finally {
      this.isSyncing = false;
      this.saveToStorage();
      
      console.log(`✅ Sync completed: ${results.processed} processed, ${results.success} successful, ${results.failed} failed`);
      this.notifyListeners('sync_completed', results);
      
      // Schedule next retry if queue not empty
      if (this.retryQueue.length > 0) {
        console.log(`⏳ Scheduling next retry in ${this.retryDelay / 1000} seconds`);
        setTimeout(() => this.processRetryQueue(), this.retryDelay);
      }
    }
    
    return results;
  }

  async syncPunchIn(punchData) {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      if (!token) {
        return {
          success: false,
          error: 'No authentication token'
        };
      }
      
      const response = await fetch('/api/attendance/mark-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(punchData),
        signal: AbortSignal.timeout(15000) // 15 second timeout
      });
      
      const data = await response.json();
      
      return {
        success: data.status === true,
        data: data,
        error: data.message
      };
      
    } catch (error) {
      return {
        success: false,
        error: error.name === 'TimeoutError' ? 'Request timeout' : error.message
      };
    }
  }

  async syncPunchOut(punchData) {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      if (!token) {
        return {
          success: false,
          error: 'No authentication token'
        };
      }
      
      const response = await fetch('/api/attendance/mark-out', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(punchData),
        signal: AbortSignal.timeout(10000) // 10 second timeout
      });
      
      const data = await response.json();
      
      return {
        success: data.status === true,
        data: data,
        error: data.message
      };
      
    } catch (error) {
      return {
        success: false,
        error: error.name === 'TimeoutError' ? 'Request timeout' : error.message
      };
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem('attendance_sync_queue', JSON.stringify(this.retryQueue));
    } catch (error) {
      console.error('Failed to save sync queue:', error);
    }
  }

  loadFromStorage() {
    try {
      const saved = localStorage.getItem('attendance_sync_queue');
      if (saved) {
        this.retryQueue = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to load sync queue:', error);
      this.retryQueue = [];
    }
  }

  getQueueLength() {
    return this.retryQueue.length;
  }

  getQueue() {
    return [...this.retryQueue];
  }

  clearQueue() {
    this.retryQueue = [];
    this.saveToStorage();
    this.notifyListeners('queue_cleared', {});
    console.log('🧹 Sync queue cleared');
  }

  removeItem(itemId) {
    const initialLength = this.retryQueue.length;
    this.retryQueue = this.retryQueue.filter(item => item.id !== itemId);
    this.saveToStorage();
    
    if (this.retryQueue.length < initialLength) {
      console.log(`🗑️ Removed sync item: ${itemId}`);
      this.notifyListeners('item_removed', { itemId });
    }
  }
}

// Singleton instance
export const attendanceSync = new AttendanceSyncManager();