import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'], // Add the valid enum values here
    default: 'pending',
  },
});

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

export default Task;
