import Grade from '../model/gradeModel.js';

// Add a new grading rule
export const addGradeRule = async (req, res) => {
  const { days, grade } = req.body;
  try {
    const newGradeRule = new Grade({ days, grade });
    await newGradeRule.save();
    res.json(newGradeRule);
  } catch (error) {
    res.status(500).json({ message: 'Error adding grade rule', error });
  }
};

// Get all grade rules
export const getGradeRules = async (req, res) => {
  try {
    const gradeRules = await Grade.find();
    res.json(gradeRules);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching grade rules', error });
  }
};

// Get grade for a user based on attendance days
export const getGradeForUser = async (req, res) => {
  const { attendanceDays, totalDays, userName } = req.body;

  try {
    const attendancePercentage = (attendanceDays / totalDays) * 100;

    let grade;
    if (attendancePercentage === 100) {
      grade = 'A';
    } else if (attendancePercentage >= 50) {
      grade = 'B';
    } else {
      grade = 'F';
    }

    // Prepare report
    const report = {
      userName,
      attendanceDays,
      grade,
    };

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching grade', error });
  }
};