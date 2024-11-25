// // routes/profile.js
// import express from 'express';
// import User from '../model/User.js'; // Adjust the path as necessary
// import verifyToken from '../middleware/verifyToken.js';
// import multer from 'multer';

// const router = express.Router();

// // const upload = multer({ dest: 'uploads/' }); // Set destination for uploaded files

// router.use(verifyToken); // Protect all routes with token verification

// // Route to update profile picture


// router.post('/update-picture', upload.single('profilePicture'), async (req, res) => {
//     const userId = req.user.id; // Get user ID from the request (set by authentication middleware)

//     // Assuming you want to store the file path in the user document
//     const profilePicturePath = req.file.path;

//     try {
//         await User.findByIdAndUpdate(userId, { profilePicture: profilePicturePath });
//         res.status(200).json({ profilePicture: profilePicturePath });
//     } catch (error) {
//         console.error('Error updating profile picture:', error);
//         res.status(500).json({ message: 'Failed to update profile picture' });
//     }
// });

// export default router;