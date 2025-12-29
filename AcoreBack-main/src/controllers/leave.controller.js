

import Leave from "../models/leave.model.js";
import Attendance from "../models/attendance.model.js";
import User from "../models/user.model.js";
import Holiday from "../models/holiday.model.js";
import moment from "moment-timezone";







export const applySingleLeave = async (req, res) => {
    try {
        const { employeeId, employeeName, leaveType, reason, date } = req.body;
        
        if (!date || !employeeId || !employeeName || !leaveType || !reason) {
            return res
                .status(400)
                .json({ status: false, message: "All fields are required" });
        }

        const requestedISTDate = moment.tz(date, "YYYY-MM-DD", "Asia/Kolkata").startOf('day');
        
        const dayOfWeek = requestedISTDate.day();
        const dayOfMonth = requestedISTDate.date();
        
        let holidayTitle = null;

        if (dayOfWeek === 6) { 
            if (dayOfMonth <= 7) {
                holidayTitle = "1st Saturday Holiday";
            } else if (dayOfMonth >= 15 && dayOfMonth <= 21) {
                const weekOfMonth = Math.ceil(dayOfMonth / 7);
                if (weekOfMonth === 3) {
                    holidayTitle = "3rd Saturday Holiday";
                }
            }
        }
        
        if (holidayTitle) {
            return res
                .status(400)
                .json({ 
                    status: false, 
                    message: `Cannot apply leave. ${holidayTitle} is a designated automatic holiday.` 
                });
        }
        
        const istHolidayQueryDate = requestedISTDate.toDate(); 

        const standardUTCMidnightDate = new Date(date);
        standardUTCMidnightDate.setUTCHours(0, 0, 0, 0); 
        
        const checkHoliday = await Holiday.findOne({ 
            $or: [
                { date: istHolidayQueryDate },
                { date: standardUTCMidnightDate }
            ]
        });
        
        if (checkHoliday) {
            return res
                .status(400)
                .json({ 
                    status: false, 
                    message: `Cannot apply leave. ${checkHoliday.title || 'This date'} is a designated holiday.` 
                });
        }
        
        const finalLeaveDate = standardUTCMidnightDate; 
        
        const exists = await Leave.findOne({
            employeeId,
            fromDate: finalLeaveDate, 
            toDate: finalLeaveDate,  
        });

        if (exists) {
            return res.status(400).json({
                status: false,
                message: "Leave already applied for this date",
            });
        }

        const leave = await Leave.create({
            employeeId,
            employeeName,
            leaveType,
            reason,
            fromDate: finalLeaveDate, 
            toDate: finalLeaveDate,
            applyType: "single",
        });

        res.status(201).json({ status: true, data: leave });
    } catch (error) {
        console.error("Apply Single Leave Error:", error);
        res.status(500).json({ status: false, message: error.message });
    }
};


export const applyRangeLeave = async (req, res) => {
  try {
    const { employeeId, employeeName, leaveType, reason, fromDate, toDate } =
      req.body;

    if (
      !fromDate ||
      !toDate ||
      !employeeId ||
      !employeeName ||
      !leaveType ||
      !reason
    ) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }

    const start = new Date(fromDate);
    const end = new Date(toDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    if (start > end) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid date range" });
    }

    // Check existing leave in range
    const exists = await Leave.findOne({
      employeeId,
      fromDate: { $lte: end },
      toDate: { $gte: start },
    });

    if (exists) {
      return res
        .status(400)
        .json({
          status: false,
          message: "Leave already applied in this range",
        });
    }

    const leave = await Leave.create({
      employeeId,
      employeeName,
      leaveType,
      reason,
      fromDate: start,
      toDate: end,
      applyType: "range",
    });

    res.status(201).json({ status: true, data: leave });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


export const getLeavesByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const leaves = await Leave.find({
      fromDate: { $lte: targetDate },
      toDate: { $gte: targetDate },
    });

    res.status(200).json({ status: true, data: leaves });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

export const getLeavesByEmpId = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const leaves = await Leave.find({ employeeId });
    res.status(200).json({ status: true, data: leaves });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


export const updateLeaveStatus = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const { status, approvedBy } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ status: false, message: "Invalid status" });
    }

    const leave = await Leave.findByIdAndUpdate(
      leaveId,
      { status, approvedBy },
      { new: true }
    );

    if (!leave) {
      return res
        .status(404)
        .json({ status: false, message: "Leave not found" });
    }

    res.status(200).json({ status: true, data: leave });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


