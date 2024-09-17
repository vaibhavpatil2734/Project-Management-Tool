const Project = require('../models/Project');
const Task = require('../models/Task');
const mongoose = require('mongoose');

// Create a new project
exports.createProject = async (req, res) => {
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

// Get a specific project by ID
exports.getProjectById = async (req, res) => {
  try {
    const { projectId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: 'Invalid project ID' });
    }

    const project = await Project.findById(projectId).populate('createdBy', 'username');
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ project });
  } catch (error) {
    console.error('Error retrieving project:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
