// controllers/reportController.js
import Attendance from '../model/Attendance.js'; // Adjust the import as necessary

const reportController = {
  // Generate report
  generateReport: async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
      // Convert dates to Date objects
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Set end date to the end of the day

      // Fetch attendance data and populate user information
      const attendanceData = await Attendance.find({
        date: { $gte: start, $lte: end },
      }).populate('userId', 'name'); // Assumes userId references a User model

      // Map the data to include userName and status
      const reportData = attendanceData.map((attendance) => ({
        _id: attendance._id,
        userName: attendance.userId ? attendance.userId.name : 'Unknown User',
        status: attendance.status,
        date: attendance.date,
      }));

      res.json(reportData);
    } catch (error) {
      console.error('Error generating report:', error);
      res.status(500).json({ message: 'Error generating report' });
    }
  },

  // Delete report by ID
  deleteReport: async (req, res) => {
    const { id } = req.params; // Get the ID from the request params

    try {
      // Log the ID received for deletion
      console.log(`Deleting report with ID: ${id}`);

      // Attempt to delete the report
      const deletedReport = await Attendance.findByIdAndDelete(id);
      
      // Check if the report was found and deleted
      if (!deletedReport) {
        return res.status(404).json({ message: 'Report not found' });
      }

      // Return success response
      res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
      console.error('Error deleting report:', error);
      res.status(500).json({ message: 'Error deleting report' });
    }
  },

  // Update report status by ID
  updateReportStatus: async (req, res) => {
    const { id } = req.params; // Get the ID from the request params
    const { status } = req.body; // Get the new status from the request body

    try {
      const updatedReport = await Attendance.findByIdAndUpdate(
        id,
        { status },
        { new: true } // Return the updated document
      );

      if (!updatedReport) {
        return res.status(404).json({ message: 'Report not found' });
      }

      res.status(200).json({ message: 'Report updated successfully', report: updatedReport });
    } catch (error) {
      console.error('Error updating report:', error);
      res.status(500).json({ message: 'Error updating report' });
    }
  },

};

export default reportController;