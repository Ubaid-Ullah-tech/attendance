import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

const Grading = () => {
  const [attendanceDays, setAttendanceDays] = useState('');
  const [totalDays, setTotalDays] = useState('');
  const [userName, setUserName] = useState('');
  const [report, setReport] = useState(null);
  const [selectedAttendance, setSelectedAttendance] = useState(null); // State for selected attendance
  const [newStatus, setNewStatus] = useState(''); // State for new status

  // Fetch grade based on attendance
  const fetchUserGrade = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/grading/user-grade`, { 
        attendanceDays: Number(attendanceDays), 
        totalDays: Number(totalDays), 
        userName 
      });
      setReport(response.data);
    } catch (error) {
      console.error('Error fetching user grade', error);
    }
  };

  // Update report status
  const updateReportStatus = async () => {
    if (!selectedAttendance || !newStatus) {
      console.error('Selected attendance or new status is missing');
      return;
    }
    
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/report/${selectedAttendance._id}`, { status: newStatus });
      console.log('Report status updated:', response.data);
    } catch (error) {
      console.error('Error updating report status', error);
    }
  };

  return (
    <div>
      {/* User Name Input */}
      <TextField
        label="User Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        fullWidth
        margin="normal"
      />

      {/* Fetch grade based on attendance days */}
      <TextField
        label="Attendance Days"
        type="number"
        value={attendanceDays}
        onChange={(e) => setAttendanceDays(e.target.value)}
        fullWidth
        margin="normal"
      />
      
      {/* Total Days Input */}
      <TextField
        label="Total Days"
        type="number"
        value={totalDays}
        onChange={(e) => setTotalDays(e.target.value)}
        fullWidth
        margin="normal"
      />
      
      <Button variant="contained" color="primary" onClick={fetchUserGrade}>
        Get Grade
      </Button>

      {/* Display the report */}
      {report && (
        <div>
          <h4>Grading Report</h4>
          <p>User Name: {report.userName}</p>
          <p>Present Days: {report.attendanceDays}</p>
          <p>Grade: {report.grade}</p>
          
        </div>
      )}
    </div>
  );
};

export default Grading;