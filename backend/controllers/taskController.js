const Task = require('../models/Task');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, Priority, status, assignedTo } = req.body;

    // Create a new task using the request body
    const task = new Task({
      title,
      description,
      Priority,
      status,
      assignedTo, // should be a valid User ObjectId
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

// Show tasks for a project (assuming tasks are linked to a project through some field like projectId)
exports.getTasks = async (req, res) => {
  try {
    const { projectId } = req.params; // Assuming project ID is passed as a route parameter

    // Fetch tasks related to a specific project (adjust this if tasks have a field like projectId)
    const tasks = await Task.find({ project: projectId }).populate('assignedTo', 'name email'); // populate 'assignedTo' with 'name' and 'email' from the User model

    // Return success response with tasks
    res.status(200).json(tasks);
  } catch (error) {
    // Return error response in case of failure
    res.status(500).json({ error: 'Failed to fetch tasks', details: error.message });
  }
};
