// routes/reportRoutes.js
import express from 'express';
import reportController from '../controller/reportController.js';

const router = express.Router();

// Define the route for generating the report
router.get('/', reportController.generateReport);

// Define the route for deleting a report
router.delete('/:id', reportController.deleteReport); 

// Define the route for updating the report status
router.put('/:id', reportController.updateReportStatus); 


export default router;












// // routes/reportRoutes.js
// import express from 'express';
// import reportController from '../controller/reportController.js';

// const router = express.Router();

// // Define the route for generating the report
// router.get('/', reportController.generateReport);

// // Define the route for deleting a report
// router.delete('/:id', reportController.deleteReport); // Un-commented to enable delete functionality

// // Define the route for updating the report status
// router.put('/:id', reportController.updateReportStatus); // Added route for updating status

// export default router;