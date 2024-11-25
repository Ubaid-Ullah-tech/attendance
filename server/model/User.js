import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Add roles
    // profilePicture: { type: String, default: "" }
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
export default User;
