import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const ViewAttendance = () => {
  const [attendance, setAttendance] = useState([]);

  const fetchAttendance = async () => {
    const token = localStorage.getItem('token'); // Get token from local storage
    const res = await axios.get('/api/attendance', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setAttendance(res.data);
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <Container>
      <h2>View Attendance</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.map((record, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                <TableCell>{record.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ViewAttendance;
