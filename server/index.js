import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js'; // Database connection
import authRoutes from './routes/auth.js'; // Authentication routes
import attendanceRoutes from './routes/attendance.js'; // Attendance routes
import userRoutes from './routes/user.js'; // User management routes
import gradingRoutes from './routes/gradingRoutes.js'; // Grading routes
import reportRoutes from './routes/reportRoutes.js'; // Report routes

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Connect to the database
connectDB();

// Middleware
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS || '*', // Replace '*' with allowed domains in production
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
};
app.use(cors(corsOptions)); // Configure CORS
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Parse URL-encoded bodies
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies
app.use(morgan('dev')); // Log HTTP requests

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/user', userRoutes);
app.use('/api/grading', gradingRoutes);
app.use('/api/report', reportRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: process.env.NODE_ENV === 'production' 
      ? 'An unexpected error occurred!' 
      : err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
});

// Uncaught exceptions and unhandled rejections
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  process.exit(1);
});

// Export serverless handler for deployment
const handler = serverless(app);
export { handler as default };

// Start the server locally (for development)
const PORT = process.env.PORT || 8000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}


















// import express from 'express';
// import serverless from 'serverless-http';
// import cors from 'cors';
// import connectDB from './config/db.js'; // Database connection
// import authRoutes from './routes/auth.js'; // Authentication routes
// import attendanceRoutes from './routes/attendance.js'; // Attendance routes
// import userRoutes from './routes/user.js'; // User management routes
// // import profileRoutes from './routes/profile.js'; // Profile routes
// import gradingRoutes from './routes/gradingRoutes.js'; // Grading routes
// import reportRoutes from './routes/reportRoutes.js'; // Report routes
// import dotenv from 'dotenv'; // For loading environment variables
// import morgan from 'morgan'; // For logging requests

// // Load environment variables from .env file
// dotenv.config();

// const app = express();

// // Connect to the database
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// app.use(express.json({ limit: '10mb' }));
// app.use(morgan('dev')); // Log requests to the console

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/attendance', attendanceRoutes);
// app.use('/api/user', userRoutes);
// // app.use('/api/profile', profileRoutes);
// app.use('/api/grading', gradingRoutes);
// app.use('/api/report', reportRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!' });
// });

// // Export the serverless handler after the app is created
// const handler = serverless(app);
// export { handler as default };

// // Start the server (for local testing, this will be ignored during serverless deployment)
// const PORT = process.env.PORT || 8000;
// if (process.env.NODE_ENV !== 'production') {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }