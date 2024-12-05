const Project = require('../models/Project');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.createProjects = async (req, res) => {
  try {
    const { title, description, assignedUsers } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description fields are required.' });
    }

    // Check if a project with the same title already exists
    const existingProject = await Project.findOne({ title: title.trim() });
    if (existingProject) {
      return res.status(400).json({ message: 'A project with this title already exists. Please choose another title.' });
    }

    // Check if assignedUsers is provided and non-empty
    if (!assignedUsers || assignedUsers.length === 0) {
      return res.status(400).json({ message: 'Assigned users are required.' });
    }

    // Find users by their compId
    const validUsers = await User.find({ compId: { $in: assignedUsers } });

    // Ensure that all provided compIds have matching users
    if (validUsers.length !== assignedUsers.length) {
      return res.status(400).json({ message: 'Some assigned users do not exist or are missing a compId.' });
    }

    // Proceed with project creation
    const newProject = new Project({
      title: title.trim(),
      description: description.trim(),
      assignedUsers: assignedUsers, // Store compIds directly
    });

    const savedProject = await newProject.save();
    res.status(201).json({ project: savedProject });

  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Server error while creating project', details: error.message });
  }
};



// Open an existing project
exports.openProject = async (req, res) => {
  try {
    const { title } = req.body; // Extract project title from the request body

    // Validate title
    if (!title) {
      return res.status(400).json({ message: 'Project title is required.' });
    }

    // Find the project by title and populate assignedUsers
    const project = await Project.findOne({ title: title.trim() })
      .populate('assignedUsers'); // Assuming you want to get the user documents

    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    // Return the project details including assigned users
    res.status(200).json({ project });

  } catch (error) {
    console.error('Error opening project:', error);
    res.status(500).json({ message: 'Server error: Cannot open project', details: error.message });
  }
};
