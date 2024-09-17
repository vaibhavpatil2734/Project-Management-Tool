const Project = require('../models/Project');
const Task = require('../models/Task');
const mongoose = require('mongoose');

// Create a new project
exports.createProjects = async (req, res) => {
  try {
    const { title, description, createdBy } = req.body;

    if (!title || !createdBy) {
      return res.status(400).json({ message: 'Title and createdBy fields are required.' });
    }

    const newProject = new Project({
      title,
      description,
      createdBy,
    });

    const savedProject = await newProject.save();

    res.status(201).json({ project: savedProject });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('createdBy', 'username'); // Adjust the population field if needed

    res.status(200).json({ projects });
  } catch (error) {
    console.error('Error retrieving projects:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

