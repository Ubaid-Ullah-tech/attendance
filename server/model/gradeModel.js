import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
  days: { type: Number, required: true },
  grade: { type: String, required: true },
});

const Grade = mongoose.model('Grade', gradeSchema);
export default Grade;
