const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  Tasktitle: { type: String, required: true },
  description: { type: String },
  Priority: { type: String, required: true },
  status: { type: String, required: true },
  assignedTo: { type: String, required: true, trim: true },
  title: { type: String, required: true },
  // Include any other fields you need
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
