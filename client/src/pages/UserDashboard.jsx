// UserDashboard.jsx
import * as jwt_decode from "jwt-decode";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog } from "@mui/material";
import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

const UserDashboard = () => {
  const [attendance, setAttendance] = useState([]); 
  // const [profilePicture, setProfilePicture] = useState(null);
  const apiBaseUrl = import.meta.env.VITE_API_URL;

  // Mark attendance for the current date
  const markAttendance = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${apiBaseUrl}/api/attendance/mark`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Attendance marked as Present successfully");
      getAttendance(); // Refresh attendance records
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to mark attendance");
    }
  };

  // Mark leave for the current date
  const markLeave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${apiBaseUrl}/api/attendance/leave`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Leave marked successfully");
      getAttendance(); // Refresh attendance records
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to mark leave");
    }
  };

  // Fetch attendance records
  const getAttendance = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${apiBaseUrl}/api/attendance/view`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAttendance(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load attendance");
    }
  };

  // Handle profile picture change
  // const handleProfilePictureChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append("profilePicture", file);
  //     try {
  //       const token = localStorage.getItem("token");
  //       const res = await axios.post(`${apiBaseUrl}/api/profile/update-picture`, formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setProfilePicture(res.data.profilePicture);
  //       toast.success("Profile picture updated!");
  //     } catch (error) {
  //       toast.error(error.response?.data?.message || "Failed to update profile picture");
  //     }
  //   }
  // };

  useEffect(() => {
    getAttendance(); 
  }, []);

  return (
    <div className="pl-4">
      <h1 className="text-xl font-bold mb-4">User Dashboard</h1>

      {/* Profile Picture */}
      {/* <div className="flex items-center mb-6">
        <Avatar alt="Profile Picture" src={profilePicture} sx={{ width: 56, height: 56 }} />
        <input type="file" onChange={handleProfilePictureChange} className="ml-4" />
      </div> */}

      {/* Buttons */}
      <div className="mb-6 space-x-4">
        <Button variant="contained" color="primary" onClick={markAttendance}>
          Mark Attendance
        </Button>
        <Button variant="contained" color="secondary" onClick={markLeave}>
          Mark Leave
        </Button>
      </div>

      {/* Attendance Table */}
      <h2 className="text-lg font-semibold mb-4">Attendance Records</h2>
      <div className="mr-4">
      {Array.isArray(attendance) && attendance.length > 0 ? (
        <TableContainer component={Paper}>
          <Table >
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendance.map((record) => (
                <TableRow  key={record.date}>
                  <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                  <TableCell>{record.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) 
      : (
        <p>No attendance records found.</p>
      )}
      </div>
    </div>
  );
};

export default UserDashboard;
