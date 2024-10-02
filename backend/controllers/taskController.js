const mongoose = require('mongoose');
const Task = require('../models/Task');
const Project = require('../models/Project');
const User = require('../models/User'); // Ensure the User model is imported

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, Priority, status, assignedTo } = req.body; // Extract task details from the request body
    const { compId } = req.user; // Extract compId from the decoded token (added in verifyProjectMembership middleware)
    const projectTitle = req.header('Project-Title'); // Retrieve the project title from the request headers

    // Check if the required fields are provided
    if (!title || !projectTitle) {
      return res.status(400).json({ message: 'Title and Project Title are required.' });
    }

    // Find the project based on the project title
    const project = await Project.findOne({ title: projectTitle });

    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    // Ensure the compId is part of the project's members (already checked in middleware, but for safety)
    const isMember = project.members.some(member => member.compId === compId);

    if (!isMember) {
      return res.status(403).json({ message: 'You are not authorized to create tasks for this project.' });
    }

    // Create a new task
    const newTask = new Task({
      title,
      description,
      Priority,
      status,
      assignedTo,
      projectTitle: project.title, // Associate the task with the project
      createdBy: compId // Track who created the task
    });

    // Save the task to the database
    await newTask.save();

    // Respond with success
    res.status(201).json({ message: 'Task created successfully.', task: newTask });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error. Failed to create task.', error: error.message });
  }
};

// Get all tasks by project name
exports.getTasks = async (req, res) => {
  try {
    const { projectName } = req.body; // Extract project name from the request body

    // Check if projectName is provided
    if (!projectName) {
      return res.status(400).json({ error: 'Project name is required.' });
    }

    // Find all tasks that belong to the specified project title
    const tasks = await Task.find({ projectTitle: projectName });

    if (tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this project.' });
    }

    // Return success response with the list of tasks
    res.status(200).json({ message: 'Tasks retrieved successfully', tasks });
  } catch (error) {
    // Return error response in case of failure
    res.status(500).json({ error: 'Failed to retrieve tasks', details: error.message });
  }
};
