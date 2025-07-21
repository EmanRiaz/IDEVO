const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: String,
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Urgent'], default: 'Low' },
  status: { type: String, default: 'todo' }, // Removed enum to allow custom column names
  // assignees field removed since TeamMember model is deleted
  comments: { type: Number, default: 0 },
  dueDate: String,
  completion: { type: Number, default: 0 },
});

module.exports = mongoose.model('Task', TaskSchema); 