// routes/user.js
import express from 'express';
// import User from '../models/User.js'; // Adjust based on your user model path
import User from '../model/User.js'
const router = express.Router();

// Route to fetch user profile
router.get('/profile', async (req, res) => {
    // Assuming you are using some authentication method to get the user ID from the token or session
    const userId = req.userId; // Replace this with the actual way you are getting userId

    if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    try {
        const user = await User.findById(userId).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Failed to fetch user profile' });
    }
});

export default router;

