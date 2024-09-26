const mongoose = require('mongoose');
const Task = require('../models/Task');
const Project = require('../models/Project');
const User = require('../models/User'); // Ensure the User model is imported

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, Priority, status, assignedTo, projectTitle } = req.body;

    // Check if the projectTitle exists in the projects collection
    const project = await Project.findOne({ title: projectTitle });
    if (!project) {
      return res.status(404).json({ error: 'Project not found. Please check the project title.' });
    }

    // Find the user by compId (or any unique identifier you use)
    const user = await User.findOne({ compId: assignedTo }); // Replace assignedToId with assignedTo
    if (!user) {
      return res.status(400).json({ error: 'Invalid assignedTo ID format' });
    }

    // Create a new task using the request body
    const task = new Task({
      title,
      description,
      Priority,
      status,
      assignedTo: user._id, // Use the user's ObjectId here
      projectTitle
    });

    // Save the task to the database
    await task.save();

    // Return success response
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    // Return error response in case of failure
    res.status(500).json({ error: 'Failed to create task', details: error.message });
  }
};
