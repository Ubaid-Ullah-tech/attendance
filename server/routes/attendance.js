// routes/attendance.js
import express from 'express';
import Attendance from '../model/Attendance.js'; // Ensure correct path
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// Middleware to verify token and extract user ID
router.use(verifyToken);

// Route to mark attendance
router.post('/mark', async (req, res) => {
    const { date = new Date() } = req.body; // Use current date if none provided
    const userId = req.user.id; // Get user ID from the request (set by authentication middleware)

    // Prevent multiple submissions on the same day
    const existingAttendance = await Attendance.findOne({
        userId,
        date: {
            $gte: new Date(new Date(date).setHours(0, 0, 0, 0)),
            $lt: new Date(new Date(date).setHours(23, 59, 59, 999)),
        },
    });

    if (existingAttendance) {
        return res.status(400).json({ success: false, message: 'Attendance already marked for today' });
    }

    // Create and save new attendance record
    const newAttendance = new Attendance({ userId, date, status: 'Present' }); // Mark as Present
    try {
        await newAttendance.save();
        res.status(201).json({ success: true, message: 'Attendance marked successfully' });
    } catch (error) {
        console.error('Error saving attendance:', error);
        res.status(500).json({ success: false, message: 'Failed to mark attendance' });
    }
});

// Route to mark leave
router.post('/leave', async (req, res) => {
    const { date = new Date() } = req.body; // Use current date if none provided
    const userId = req.user.id; // Get user ID from the request (set by authentication middleware)

    // Prevent multiple submissions on the same day
    const existingAttendance = await Attendance.findOne({
        userId,
        date: {
            $gte: new Date(new Date(date).setHours(0, 0, 0, 0)),
            $lt: new Date(new Date(date).setHours(23, 59, 59, 999)),
        },
    });

    if (existingAttendance) {
        return res.status(400).json({ success: false, message: 'Attendance already marked for today' });
    }

    // Create and save new attendance record with Leave status
    const newLeaveRecord = new Attendance({ userId, date, status: 'Leave' }); // Mark as Leave
    try {
        await newLeaveRecord.save();
        res.status(201).json({ success: true, message: 'Leave marked successfully' });
    } catch (error) {
        console.error('Error saving leave record:', error);
        res.status(500).json({ success: false, message: 'Failed to mark leave' });
    }
});

// Route to view attendance records
router.get('/view', async (req, res) => {
    const userId = req.user.id; // Get user ID from the request (set by authentication middleware)

    try {
        const attendanceRecords = await Attendance.find({ userId }).sort({ date: -1 });
        res.status(200).json(attendanceRecords);
    } catch (error) {
        console.error('Error fetching attendance:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch attendance' });
    }
});

export default router;
