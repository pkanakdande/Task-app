import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  about: { type: String },
  profileUrl: { type: String },
});

// Check if the User model exists, otherwise define it
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
