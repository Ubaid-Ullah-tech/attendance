import express from 'express';
import {
  addGradeRule,
  getGradeRules,
  getGradeForUser,
} from '../controller/gradingController.js';

const router = express.Router();

// Routes for grading system
router.post('/add-grade', addGradeRule);
router.get('/grade-rules', getGradeRules);
router.post('/user-grade', getGradeForUser);

export default router;
