import express from "express";
import {
  applySingleLeave,
  applyRangeLeave,
  getLeavesByDate,
  getLeavesByEmpId,
  updateLeaveStatus,
} from "../controllers/leave.controller.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";
import { hasPermission } from "../middlewares/permissionMiddleware.js";

const router = express.Router();

// Apply single-day leave
router.post("/single", protect, applySingleLeave);

// Apply range leave
router.post("/range", protect, applyRangeLeave);

// Get leaves by date
router.get("/date/:date", protect, getLeavesByDate);

// Get leaves by employee ID
router.get("/emp/:employeeId", protect, getLeavesByEmpId);

// Approve / Reject leave
router.put("/status/:leaveId", protect,hasPermission('manage_leave'),  updateLeaveStatus);

export default router;
