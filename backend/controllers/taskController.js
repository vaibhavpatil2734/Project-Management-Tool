const mongoose = require('mongoose');
const Task = require('../models/Task');
const Project = require('../models/Project');
const User = require('../models/User'); // Ensure the User model is imported

exports.createTask = async (req, res) => {
  try {
    const { Tasktitle, description, Priority, status, assignedTo, title } = req.body; // Extract task details from the request body
    
    console.log("Task controller is activated", Tasktitle);
    
    // Validate required fields
    if (!Tasktitle || !title) {
      return res.status(400).json({ message: 'Title and Project Title are required.' });
    }

    // Find the project based on the project title
    const project = await Project.findOne({ title: title.trim() });

    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    // Create a new task
    const newTask = new Task({
      Tasktitle,
      description,
      Priority,
      status,
      assignedTo,
      title
    });
    
    // Log the task object to check its contents
    console.log("New Task Object:", newTask);

    // Save the task to the database
    await newTask.save();

    // Return the response
    res.status(201).json({ message: 'Task created successfully.', task: newTask });
  } catch (error) {
    console.error('Error creating task:', error.message); // Log the error
    res.status(500).json({ message: 'Server error. Failed to create task.', error: error.message });
  }
};
exports.getTasks = async (req, res) => {
  try {
    const { title } = req.body; // Extract project title from the request body

    if (!title) {
      return res.status(400).json({ error: 'Project title is required.' });
    }

    // Find all tasks that belong to the specified project title
    const project = await Project.findOne({ title });

    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    const tasks = await Task.find({ title: project.title });

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

// Update an existing task by ID

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params; // Get the task ID from the URL
    const updatedFields = req.body; // Get the fields to update from the request body

    // Find the task by ID and update only the provided fields
    const updatedTask = await Task.findByIdAndUpdate(id, { $set: updatedFields }, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ message: 'Failed to update task' });
  }
};
