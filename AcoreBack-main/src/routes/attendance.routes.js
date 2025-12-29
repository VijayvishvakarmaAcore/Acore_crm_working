import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getAttendanceByDate,
  getAttendanceByEmpId,
  markAttendance,
  markOutTime,
  requestPartialDayLeave,
} from "../controllers/attendance.controller.js";
import { verifyGitCommit } from "../middlewares/gitHubMiddleware.js";

const router = express.Router();

router.post("/mark-in", protect, markAttendance);
router.put("/mark-out", protect, markOutTime);

router.post('/partial-leave', protect, requestPartialDayLeave);
router.get("/employee/:employeeId", protect, getAttendanceByEmpId);
router.get("/date/:date", protect, getAttendanceByDate);

export default router;
