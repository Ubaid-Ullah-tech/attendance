import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import Reports from './Reports'; // Ensure this path is correct
import Grading from './Grading'; // Ensure this path is correct
import axios from 'axios'; // Import Axios for data fetching

const AdminDashboard = () => {
  const [attendanceCount, setAttendanceCount] = useState({ presentCount: 0, absentCount: 0 });

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Reports Section */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Attendance Reports
              </Typography>
              <Typography variant="body1">
                Present Students: {attendanceCount.presentCount}
              </Typography>
              <Typography variant="body1">
                Leave Students: {attendanceCount.absentCount}
              </Typography>
              <Reports setAttendanceCount={setAttendanceCount} />
            </CardContent>
          </Card>
        </Grid>

        {/* Grading System Section */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Grading System
              </Typography>
              <Grading />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;