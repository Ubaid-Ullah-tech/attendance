import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const Reports = ({ setAttendanceCount }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Edit state
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  const fetchReport = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/report`, {
        params: { startDate, endDate },
      });
      console.log('API Response:', response.data); // Log the entire response
      setReportData(response.data);

      // Calculate present and absent counts
      const presentCount = response.data.filter(student => student.status === 'Present').length;
      const absentCount = response.data.filter(student => student.status === 'Leave').length;

      // Pass counts back to AdminDashboard
      setAttendanceCount({ presentCount, absentCount });

    } catch (error) {
      console.error('Error fetching report', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (attendance) => {
    setSelectedAttendance(attendance);
    setNewStatus(attendance.status); // Set current status for editing
    setEditDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/report/${id}`); // Fixed the URL
      setReportData((prevReports) => prevReports.filter((report) => report._id !== id));
      toast.success('User Attendance Deleted Successfully');
    } catch (error) {
      console.error('Error deleting report:', error);
      toast.error('Error in Delete');
    }
  };

  const handleUpdateStatus = async () => {
    if (!selectedAttendance) return; // Ensure we have a selected attendance
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/report/${selectedAttendance._id}`, { status: newStatus });
      console.log(response.data); // Success message
      setReportData((prevReports) => prevReports.map((report) =>
        report._id === selectedAttendance._id ? { ...report, status: newStatus } : report
      ));
      toast.success('User Attendance Updated Successfully');
      setEditDialogOpen(false); // Close dialog after update
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Generate Attendance Report
      </Typography>
      <TextField
        label="Start Date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="End Date"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <Button variant="contained" color="primary" onClick={fetchReport} disabled={loading}>
        {loading ? 'Loading...' : 'Generate Report'}
      </Button>

      {reportData.length > 0 ? (
        <div>
          <h4>Attendance Report Data:</h4>
          {reportData.map((attendance) => (
            <Box
              key={attendance._id}
              border={1}
              borderColor="grey.400"
              borderRadius={2}
              padding={2}
              marginY={2}
              display="flex"
              flexDirection="column"
              alignItems="start"
            >
              <Typography variant="body1">
                User: {attendance.userName} - Status: {attendance.status} on{' '}
                {new Date(attendance.date).toLocaleDateString()}
              </Typography>
              <Box display="flex" gap={1} marginTop={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEdit(attendance)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDelete(attendance._id)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <Typography variant="body1">
            No attendance data found for the selected dates.
          </Typography>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Attendance Status</DialogTitle>
        <DialogContent>
          <TextField
            label="New Status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateStatus} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Reports;



















// import React, { useState } from 'react';
// import { Button, TextField, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const Reports = () => {
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
  
//   // Edit state
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [selectedAttendance, setSelectedAttendance] = useState(null);
//   const [newStatus, setNewStatus] = useState('');

//   const fetchReport = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/report`, {
//         params: { startDate, endDate },
//       });
//       console.log('API Response:', response.data); // Log the entire response
//       setReportData(response.data);
//     } catch (error) {
//       console.error('Error fetching report', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (attendance) => {
//     setSelectedAttendance(attendance);
//     setNewStatus(attendance.status); // Set current status for editing
//     setEditDialogOpen(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${import.meta.env.VITE_API_URL}/api/report/${id}`); // Fixed the URL
//       setReportData((prevReports) => prevReports.filter((report) => report._id !== id));
//       toast.success('user Attendance Deleted Succesfully');
//     } catch (error) {
//       console.error('Error deleting report:', error);
//       toast.error('Error in Delete')
//     }
//   };

//   const handleUpdateStatus = async () => {
//     if (!selectedAttendance) return; // Ensure we have a selected attendance
//     try {
//       const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/report/${selectedAttendance._id}`, { status: newStatus });
//       console.log(response.data); // Success message
//       setReportData((prevReports) => prevReports.map((report) =>
//         report._id === selectedAttendance._id ? { ...report, status: newStatus } : report
//     ));
//     toast.success('User Attendance Updated Succesfully')
//       setEditDialogOpen(false); // Close dialog after update
//     } catch (error) {
//       console.error('Error updating status:', error);
//     }
//   };

//   return (
//     <div>
//       <Typography variant="h5" gutterBottom>
//         Generate Attendance Report
//       </Typography>
//       <TextField
//         label="Start Date"
//         type="date"
//         value={startDate}
//         onChange={(e) => setStartDate(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputLabelProps={{ shrink: true }}
//       />
//       <TextField
//         label="End Date"
//         type="date"
//         value={endDate}
//         onChange={(e) => setEndDate(e.target.value)}
//         fullWidth
//         margin="normal"
//         InputLabelProps={{ shrink: true }}
//       />
//       <Button variant="contained" color="primary" onClick={fetchReport} disabled={loading}>
//         {loading ? 'Loading...' : 'Generate Report'}
//       </Button>

//       {reportData.length > 0 ? (
//         <div>
//           <h4>Attendance Report Data:</h4>
//           {reportData.map((attendance) => (
//             <Box
//               key={attendance._id}
//               border={1}
//               borderColor="grey.400"
//               borderRadius={2}
//               padding={2}
//               marginY={2}
//               display="flex"
//               flexDirection="column"
//               alignItems="start"
//             >
//               <Typography variant="body1">
//                 User: {attendance.userName} - Status: {attendance.status} on{' '}
//                 {new Date(attendance.date).toLocaleDateString()}
//               </Typography>
//               <Box display="flex" gap={1} marginTop={2}>
//                 <Button
//                   variant="outlined"
//                   color="primary"
//                   onClick={() => handleEdit(attendance)}
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   color="secondary"
//                   onClick={() => handleDelete(attendance._id)}
//                 >
//                   Delete
//                 </Button>
//               </Box>
//             </Box>
//           ))}
//         </div>
//       ) : (
//         <div className="mt-6">
//           <Typography variant="body1">
//             No attendance data found for the selected dates.
//           </Typography>
//         </div>
//       )}

//       {/* Edit Dialog */}
//       <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
//         <DialogTitle>Edit Attendance Status</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="New Status"
//             value={newStatus}
//             onChange={(e) => setNewStatus(e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setEditDialogOpen(false)} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleUpdateStatus} color="primary">
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default Reports;