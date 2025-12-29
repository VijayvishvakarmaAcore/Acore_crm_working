

import moment from "moment-timezone";
import Attendance from "../models/attendance.model.js";
import User from "../models/user.model.js";
import TimeLog from "../models/timeLog.model.js";
import Leave from "../models/leave.model.js"

// export const markAttendance = async (req, res) => {
//     try {
       
//         const { employeeId } = req.body; 

//         const user = await User.findOne({ employeeId });
//         if (!user) {
//             return res.status(404).json({
//                 status: false,
//                 message: "User not found",
//             });
//         }

//         // Always create date in India timezone (Asia/Kolkata)
//         const nowIST = moment().tz("Asia/Kolkata");
        
//         // Date key: Midnight IST, stored as UTC Date object (for consistent querying)
//         const dateOnly = nowIST.clone().startOf("day").toDate(); 
        
//         // Exact punch-in time: The moment the server receives the request
//         const inTime = nowIST.toDate(); 

//         const existing = await Attendance.findOne({ employeeId, date: dateOnly });
//         if (existing) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Attendance already marked for today.",
//             });
//         }

//         const attendance = await Attendance.create({
//             employeeId,
//             inTime,
//             date: dateOnly,
//             status: "present",
//         });



//         try {
//              await TimeLog.create({
            
//                 employeeId: user._id, 
//                 startTime: inTime, 
//                 endTime: null,     // Timer is running
             
//             });
//         } catch (timeLogError) {
//             // Log the error but don't halt the attendance process if time log creation fails
//             console.error("TimeLog creation failed during punch-in:", timeLogError);
//         }
//         // ==========================================================

//         res.status(201).json({ 
//             status: true, 
//             data: attendance, 
//             message: "Punch-in successful. Work time tracking started." 
//         });

//         // res.status(201).json({ status: true, data: attendance, message: "Punch-in successful" });
//     } catch (error) {
//         res.status(500).json({ status: false, message: error.message });
//     }
// };


// export const markOutTime = async (req, res) => {
//     try {
//         // SECURITY NOTE: We only take employeeId from the body; outTime is generated on the server.
//         const { employeeId } = req.body; 


//         const user = await User.findOne({ employeeId }).select('_id');
        
//         if (!user) {
//              return res.status(404).json({
//                 status: false,
//                 message: "User not found (by custom ID).",
//             });
//         }
        
//         const mongoUserId = user._id.toString();

//         const nowIST = moment().tz("Asia/Kolkata");
//         const dateOnly = nowIST.clone().startOf("day").toDate();
//         const outTime = nowIST.toDate(); // Server-generated outTime

//         const attendance = await Attendance.findOne({ employeeId, date: dateOnly });

//         if (!attendance) {
//             return res.status(404).json({
//                 status: false,
//                 message: "Attendance not found for today. Did you punch in?",
//             });
//         }
        
//         // Check to prevent punching out twice
//         if (attendance.outTime) {
//              return res.status(400).json({
//                 status: false,
//                 message: "Punch-out already recorded for today.",
//             });
//         }

//         attendance.outTime = outTime;

//         // Calculate total working hours in minutes for accuracy
//         if (attendance.inTime) {
//             // Calculate total milliseconds elapsed
//             const totalMs = outTime.getTime() - new Date(attendance.inTime).getTime();
            
//             // Convert to total minutes
//             const totalMinutes = Math.floor(totalMs / (1000 * 60)); 
            
//             // Convert total minutes into hours and remaining minutes for display format
//             const hours = Math.floor(totalMinutes / 60);
//             const minutes = totalMinutes % 60;

//             attendance.totalTime = `${hours}h ${minutes}m`;
//         }

//         await attendance.save();

//         try {
       
//             const runningTimeLog = await TimeLog.findOne({ 
//                 employeeId: mongoUserId, // Use the same identifier as stored in TimeLog
//                 endTime: null 
//             });

//             if (runningTimeLog) {
//                 // Use the duration calculated from the Attendance process
//                 const durationMinutes = totalMinutesForDisplay; 
                
//                 // Update and close the TimeLog record
//                 await TimeLog.findByIdAndUpdate(
//                     runningTimeLog._id,
//                     { 
//                         endTime: outTime, 
//                         durationMinutes: durationMinutes 
//                     }
//                 );
//                 console.log(`TimeLog closed for ${employeeId}. Duration: ${durationMinutes} minutes.`);

//             } else {
//                 console.warn(`No active TimeLog found for ${employeeId} during punch-out. Proceeding with attendance only.`);
//             }

//         } catch (timeLogError) {
//             // Log the error but ensure the punch-out response proceeds
//             console.error("TimeLog closing failed during punch-out:", timeLogError);
//         }
//         // ==========================================================

//         res.json({
//             status: true,
//             message: "Punch-out successful and work time tracking stopped.",
//             data: attendance,
//         });

//         // res.json({
//         //     status: true,
//         //     message: "Punch-out successful",
//         //     data: attendance,
//         // });
//     } catch (error) {
//         res.status(500).json({ status: false, message: error.message });
//     }
// };



//  time from backend 

// export const markAttendance = async (req, res) => {
//     try {
        
//         const { employeeId: customEmployeeId } = req.body; 
//         const user = await User.findOne({ employeeId: customEmployeeId });
//         if (!user) {
//             return res.status(404).json({
//                 status: false,
//                 message: "User not found",
//             });
//         }
        
//         const mongoUserId = user._id.toString(); 
        

       

//         const nowIST = moment().tz("Asia/Kolkata");
//         const dateOnly = nowIST.clone().startOf("day").toDate(); 
//         const inTime = nowIST.toDate(); 

//         const existingAttendance = await Attendance.findOne({ employeeId: customEmployeeId, date: dateOnly });
//         if (existingAttendance) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Attendance already marked for today.",
//             });
//         }
        
//         const existingOpenTimeLog = await TimeLog.findOne({ 
//             employeeId: mongoUserId, 
//             endTime: null 
//         });

//         if (existingOpenTimeLog) {
           
//              return res.status(400).json({ 
//                  status: false,
//                  message: "Previous work session was not properly closed. Please contact support or check out first.",
//              });
//         }


//         const attendance = await Attendance.create({
//             employeeId: customEmployeeId,
//             inTime,
//             date: dateOnly,
//             status: "present",
//         });

//         try {
//              await TimeLog.create({
//                 employeeId: mongoUserId, 
//                 startTime: inTime,
//                 endTime: null,
//             });
//         } catch (timeLogError) {
//             console.error("TimeLog creation failed during punch-in:", timeLogError);
//         }

//         res.status(201).json({ 
//             status: true, 
//             data: attendance, 
//             message: "Punch-in successful. Work time tracking started." 
//         });

//     } catch (error) {
//         res.status(500).json({ status: false, message: error.message });
//     }
// };


// export const markAttendance = async (req, res) => {
//     try {
//         const { employeeId: customEmployeeId } = req.body; 

//         const user = await User.findOne({ employeeId: customEmployeeId });
//         if (!user) {
//             return res.status(404).json({ status: false, message: "User not found" });
//         }

//         const nowIST = moment().tz("Asia/Kolkata");
         
//         const dateStr = nowIST.format("YYYY-MM-DD");  
//         const timeStr = nowIST.format("hh:mm:ss A");  
 
//         const existingAttendance = await Attendance.findOne({ 
//             employeeId: customEmployeeId, 
//             date: dateStr 
//         });

//         if (existingAttendance) {
//             return res.status(400).json({ status: false, message: "Attendance already marked." });
//         }
 
//         const attendance = await Attendance.create({
//             employeeId: customEmployeeId,
//             date: dateStr, 
//             inTime: timeStr, 
//             status: "present",
//         });
 
//         try {
//             await TimeLog.create({
//                 employeeId: user._id, 
//                 startTime: nowIST.toDate(),  
//                 endTime: null,
//             });
//         } catch (err) { console.error(err); }

//         res.status(201).json({ 
//             status: true, 
//             message: "Punch-in successful.",
//             data: attendance  
//         });

//     } catch (error) {
//         res.status(500).json({ status: false, message: error.message });
//     }
// };


export const markAttendance = async (req, res) => {
    try {
        const { employeeId: customEmployeeId, latitude, longitude } = req.body;

        if (!latitude || !longitude) {
            return res.status(400).json({
                status: false,
                message: "Location is required for punch-in"
            });
        }

        // ********* OFFICE LOCATION **********
        const OFFICE_LAT = 22.7494444;
        const OFFICE_LNG = 75.8991667;
        const ALLOWED_RADIUS = 200; // meters

        function calculateDistance(lat1, lon1, lat2, lon2) {
            const R = 6371000;
            const φ1 = lat1 * Math.PI / 180;
            const φ2 = lat2 * Math.PI / 180;
            const Δφ = (lat2 - lat1) * Math.PI / 180;
            const Δλ = (lon2 - lon1) * Math.PI / 180;

            const a =
                Math.sin(Δφ / 2) ** 2 +
                Math.cos(φ1) *
                Math.cos(φ2) *
                Math.sin(Δλ / 2) ** 2;

            return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
        }

        const distance = calculateDistance(latitude, longitude, OFFICE_LAT, OFFICE_LNG);

        if (distance > ALLOWED_RADIUS) {
            return res.status(401).json({
                status: false,
                message: `You are ${Math.floor(distance)}m away! Punch-In allowed only inside office range`
            });
        }

        const user = await User.findOne({ employeeId: customEmployeeId });
        if (!user) return res.status(404).json({ status: false, message: "User not found" });

        const nowIST = moment().tz("Asia/Kolkata");
        const dateStr = nowIST.format("YYYY-MM-DD");
        const timeStr = nowIST.format("hh:mm:ss A");

        const existingAttendance = await Attendance.findOne({
            employeeId: customEmployeeId,
            date: dateStr
        });

        if (existingAttendance) {
            return res.status(400).json({ status: false, message: "Attendance already marked." });
        }

        const attendance = await Attendance.create({
            employeeId: customEmployeeId,
            date: dateStr,
            inTime: timeStr,
            status: "present",
            location: {
                lat: latitude,
                lng: longitude
            },
            punchSource: "electron/web"
        });

        try {
            await TimeLog.create({
                employeeId: user._id,
                startTime: nowIST.toDate(),
                endTime: null
            });
        } catch (err) {
            console.error("TimeLog Error:", err);
        }

        res.status(201).json({
            status: true,
            message: "Punch-in successful",
            data: attendance
        });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// time from clien side 

// export const markAttendance = async (req, res) => {
//     try {
//         // 1. Get custom employeeId AND the client-side inTime
//         const { employeeId: customEmployeeId, clientInTime } = req.body;

//         if (!clientInTime) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Check-in time is required from the client.",
//             });
//         }

//         const user = await User.findOne({ employeeId: customEmployeeId });
//         if (!user) {
//             return res.status(404).json({
//                 status: false,
//                 message: "User not found",
//             });
//         }

//         const mongoUserId = user._id.toString();
        
//         const inTime = new Date(clientInTime); 
//         const dateOnly = moment(inTime).tz("Asia/Kolkata").startOf("day").toDate();

//         const existingAttendance = await Attendance.findOne({ 
//             employeeId: customEmployeeId, 
//             date: dateOnly 
//         });

//         if (existingAttendance) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Attendance already marked for today.",
//             });
//         }

//         const existingOpenTimeLog = await TimeLog.findOne({ 
//             employeeId: mongoUserId, 
//             endTime: null 
//         });

//         if (existingOpenTimeLog) {
//             return res.status(400).json({ 
//                 status: false,
//                 message: "Previous work session was not properly closed.",
//             });
//         }

//         const attendance = await Attendance.create({
//             employeeId: customEmployeeId,
//             inTime: inTime, 
//             date: dateOnly,
//             status: "present",
//         });

//         try {
         
//             await TimeLog.create({
//                 employeeId: mongoUserId, 
//                 startTime: inTime, 
//                 endTime: null,
//             });
//         } catch (timeLogError) {
//             console.error("TimeLog creation failed:", timeLogError);
//         }

//         res.status(201).json({ 
//             status: true, 
//             data: attendance, 
//             message: "Punch-in successful using client-provided time." 
//         });

//     } catch (error) {
//         res.status(500).json({ status: false, message: error.message });
//     }
// };


// export const markOutTime = async (req, res) => {
//     try {
//         const { employeeId: customEmployeeId } = req.body; 
        
//         let totalMinutesTracked = 0; 
        
    
//         const user = await User.findOne({ employeeId: customEmployeeId }).select('_id');
        
//         if (!user) {
//              return res.status(404).json({
//                 status: false,
//                 message: "User not found (by custom ID).",
//             });
//         }
        
//         const mongoUserId = user._id.toString(); 

//         // 2. Setup Time Variables and Find Attendance
//         const nowIST = moment().tz("Asia/Kolkata");
//         const dateOnly = nowIST.clone().startOf("day").toDate();
//         const outTime = nowIST.toDate(); 

//         const attendance = await Attendance.findOne({ employeeId: customEmployeeId, date: dateOnly });
        
//         // --- Attendance Validation Checks (Preserving original functionality) ---
//         if (!attendance) {
//             return res.status(404).json({ status: false, message: "Attendance not found for today. Did you punch in?" });
//         }
//         if (attendance.outTime) {
//             return res.status(400).json({ status: false, message: "Punch-out already recorded for today." });
//         }
        
//         // 3. Update Attendance Record and Calculate Time
//         attendance.outTime = outTime;

//         if (attendance.inTime) {
//             const totalMs = outTime.getTime() - new Date(attendance.inTime).getTime();
//             totalMinutesTracked = Math.floor(totalMs / (1000 * 60)); 
            
//             const hours = Math.floor(totalMinutesTracked / 60);
//             const minutes = totalMinutesTracked % 60;

//             attendance.totalTime = `${hours}h ${minutes}m`; 
//         }

//         await attendance.save(); 


//         try {
//             // Find the single, most recently started open TimeLog record
//             const runningTimeLog = await TimeLog.findOne({ 
//                 employeeId: mongoUserId, 
//                 endTime: null 
//             }).sort({ startTime: -1 }); 

//             if (runningTimeLog) {
//                 const durationMinutes = totalMinutesTracked; 
                
//                 const updateResult = await TimeLog.updateOne(
//                     { _id: runningTimeLog._id }, 
//                     { $set: { endTime: outTime, durationMinutes: durationMinutes } }
//                 );
                
//                 if (updateResult.modifiedCount > 0) {
//                      console.log(`TimeLog successfully closed. ID: ${runningTimeLog._id}. Duration: ${totalMinutesTracked} minutes.`);
//                 } else {
//                      console.warn(`TimeLog update failed, modifiedCount is 0 for ID: ${runningTimeLog._id}.`);
//                 }
                
//             } else {
//                  console.warn(`No active TimeLog found for ${customEmployeeId} using User ID ${mongoUserId}. Proceeding with attendance only.`);
//             }

//         } catch (timeLogError) {
//             console.error("TimeLog closing failed during punch-out:", timeLogError);
//         }
//         // ==========================================================

//         res.json({
//             status: true,
//             message: "Punch-out successful and work time tracking stopped.",
//             data: attendance,
//         });

//     } catch (error) {
//         res.status(500).json({ status: false, message: error.message });
//     }
// };


// export const markOutTime = async (req, res) => {
//     try {
//         const { employeeId: customEmployeeId } = req.body; 
//         let totalMinutesTracked = 0; 
    
//         // 1. Validate User
//         const user = await User.findOne({ employeeId: customEmployeeId }).select('_id');
//         if (!user) {
//              return res.status(404).json({ status: false, message: "User not found." });
//         }
//         const mongoUserId = user._id.toString(); 

//         // 2. Setup IST Time
//         const nowIST = moment().tz("Asia/Kolkata");
//         const dateStr = nowIST.format("YYYY-MM-DD"); 
//         const outTimeStr = nowIST.format("hh:mm:ss A"); 
//         const outTimeDate = nowIST.toDate(); 

//         // 3. Find Attendance by String Date
//         const attendance = await Attendance.findOne({ 
//             employeeId: customEmployeeId, 
//             date: dateStr 
//         });
        
//         if (!attendance) {
//             return res.status(404).json({ status: false, message: "No punch-in record found for today." });
//         }
//         if (attendance.outTime) {
//             return res.status(400).json({ status: false, message: "Punch-out already recorded." });
//         }
        
//         // 4. Update TimeLog and Calculate Duration
//         if (attendance.inTime) {
//             const runningTimeLog = await TimeLog.findOne({ 
//                 employeeId: mongoUserId, 
//                 endTime: null 
//             }).sort({ startTime: -1 });

//             if (runningTimeLog) {
//                 const start = moment(runningTimeLog.startTime);
//                 const end = moment(outTimeDate);
                
//                 // Use moment duration for accurate math
//                 const duration = moment.duration(end.diff(start));
//                 totalMinutesTracked = Math.floor(duration.asMinutes());

//                 const hours = Math.floor(totalMinutesTracked / 60);
//                 const minutes = totalMinutesTracked % 60;

//                 attendance.totalTime = `${hours}h ${minutes}m`;
                
//                 // Close TimeLog with Reason
//                 runningTimeLog.endTime = outTimeDate;
//                 runningTimeLog.durationMinutes = totalMinutesTracked;
//                 runningTimeLog.closureReason = "User Punch Out"; // <--- Added for tracking
//                 await runningTimeLog.save();
//             }
//         }

//         // 5. Save String Out-Time to Attendance
//         attendance.outTime = outTimeStr; 
//         await attendance.save(); 

//         res.json({
//             status: true,
//             message: "Punch-out successful.",
//             data: {
//                 ...attendance._doc,
//                 inTime: attendance.inTime, 
//                 outTime: attendance.outTime,
//                 totalTime: attendance.totalTime
//             },
//         });

//     } catch (error) {
//         res.status(500).json({ status: false, message: error.message });
//     }
// };

export const markOutTime = async (req, res) => {
    try {
        const { employeeId: customEmployeeId } = req.body;
        let totalMinutesTracked = 0;

        const user = await User.findOne({ employeeId: customEmployeeId }).select('_id');
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found." });
        }

        const mongoUserId = user._id.toString();

        const nowIST = moment().tz("Asia/Kolkata");
        const dateStr = nowIST.format("YYYY-MM-DD");
        const outTimeStr = nowIST.format("hh:mm:ss A");
        const outTimeDate = nowIST.toDate();

        const attendance = await Attendance.findOne({
            employeeId: customEmployeeId,
            date: dateStr
        });

        if (!attendance) {
            return res.status(404).json({
                status: false,
                message: "No punch-in record found for today."
            });
        }

        if (attendance.outTime) {
            return res.status(400).json({
                status: false,
                message: "Punch-out already recorded."
            });
        }

        const runningTimeLog = await TimeLog.findOne({
            employeeId: mongoUserId,
            endTime: null
        }).sort({ startTime: -1 });

        if (runningTimeLog) {
            const start = moment(runningTimeLog.startTime);
            const end = moment(outTimeDate);

            const duration = moment.duration(end.diff(start));
            totalMinutesTracked = Math.floor(duration.asMinutes());

            const hours = Math.floor(totalMinutesTracked / 60);
            const minutes = totalMinutesTracked % 60;

            attendance.totalTime = `${hours}h ${minutes}m`;

            // *********** MAIN RULE ************
            if (totalMinutesTracked < 420) {
                return res.status(400).json({
                    status: false,
                    message: `You worked only ${hours}h ${minutes}m. Minimum 7h required to punch out.`
                });
            }

            runningTimeLog.endTime = outTimeDate;
            runningTimeLog.durationMinutes = totalMinutesTracked;
            runningTimeLog.closureReason = "User Punch Out";
            await runningTimeLog.save();
        }

        attendance.outTime = outTimeStr;
        await attendance.save();

        res.json({
            status: true,
            message: "Punch-out successful.",
            data: {
                ...attendance._doc,
                inTime: attendance.inTime,
                outTime: attendance.outTime,
                totalTime: attendance.totalTime
            },
        });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};



export const getAttendanceByEmpId = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const attendanceRecords = await Attendance.find({ employeeId }).sort({ date: -1 });
        const leaveRecords = await Leave.find({employeeId}).sort({ fromDate: -1 });

        const absent = leaveRecords.filter(leave => leave.applyType === "absent");
        const leave = leaveRecords.filter(leave => leave.applyType !== "absent");

        res.json({ status: true, present:  attendanceRecords, leaves: leave, absent: absent });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};
 
// export const getAttendanceByDate = async (req, res) => {
//     try {
//         const date = new Date(req.params.date);
//         const records = await Attendance.find({ date });
// console.log("test get attendence :", date)
//         res.json({ status: true, data: records });
//     } catch (error) {
//         res.status(500).json({ status: false, message: error.message });
//     }
// };
 

export const getAttendanceByDate = async (req, res) => {
    try {
        const queryDateString = req.params.date; 

        const startOfDay = new Date(queryDateString);
        startOfDay.setHours(0, 0, 0, 0); 
        
 
        const endOfDay = new Date(startOfDay);
        endOfDay.setDate(startOfDay.getDate() + 1); 

        console.log("Start of Day:", startOfDay);
        console.log("End of Day (Next Day):", endOfDay);
 
        const records = await Attendance.find({ 
            date: {
                $gte: startOfDay,  
                $lt: endOfDay      
            }
        });

        res.json({ status: true, data: records });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const requestPartialDayLeave = async (req, res)=>{
    try{

        const {employeeId,leaveType , reason} = req.body;

        if(!employeeId || !leaveType || !reason){
            return res.status(400).json({status:false, message:"Employee ID, leave type, and reason are required."})
        }

        const nowIST  = moment().tz("Asia/Kolkata");
        const dateOnly = nowIST.clone().startOf("day").toDate();
        
        const attendance = await Attendance.findOne({employeeId, date:dateOnly});

        if(!attendance){
            return res.status(404).json({ status: false, message: "Cannot apply partial leave. Employee has not punched in today." });
        }

        if (attendance.isPartialLeave) {
            return res.status(400).json({ status: false, message: "Partial leave is already logged for today." });
        }

        attendance.isPartialLeave = true;
        attendance.partialLeaveType=leaveType;
        attendance.partialLeaveReason=reason;

        await attendance.save();

        res.status(200).json({
            status:true,
           message: `Partial leave (${leaveType}) logged successfully for today.`,
           data:attendance
        })

    }catch(error){
console.error("Request Partial Leave Error:", error);
        res.status(500).json({ status: false, message: error.message });
    }
}