const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  Priority: { type: String, required: true },
  status: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Should reference the User model
  projectTitle: { type: String, required: true },
  // Include any other fields you need
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
