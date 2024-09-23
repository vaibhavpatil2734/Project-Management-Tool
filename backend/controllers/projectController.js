const Project = require('../models/Project');
const User = require('../models/User'); // Import the User model
const mongoose = require('mongoose');

// Create a new project
exports.createProjects = async (req, res) => {
  try {
    const { title, description, assignedUsers } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description fields are required.' });
    }

    // Check if assignedUsers is provided and non-empty
    if (!assignedUsers || assignedUsers.length === 0) {
      return res.status(400).json({ message: 'Assigned users are required.' });
    }

    try {
      // Find users by their compId
      const validUsers = await User.find({ compId: { $in: assignedUsers } });

      // Ensure that all provided compIds have matching users
      if (validUsers.length !== assignedUsers.length) {
        return res.status(400).json({ message: 'Some assigned users do not exist or are missing a compId.' });
      }

      // Extract ObjectId's from the valid users
      const userIds = validUsers.map(user => user._id);

      // Proceed with project creation
      const newProject = new Project({
        title: title.trim(),
        description: description.trim(),
        assignedUsers: userIds, // Use ObjectId's here
      });

      const savedProject = await newProject.save();
      res.status(201).json({ project: savedProject });
      
    } catch (error) {
      console.error('Error finding users:', error);
      return res.status(500).json({ message: 'Error finding users' });
    }

  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// exports.openProject = async (req, res)=>{
//   try {
//   } catch (error) {
//     res.status(500).json({message:'Server error openning projedt fail!!'})
//   }
// }
// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find()
      .populate('assignedUsers', 'name compId') // Populate user details including name and compId
      .populate('createdBy', 'username'); // Adjust the fields to populate as necessary

    res.status(200).json({ projects });
  } catch (error) {
    console.error('Error retrieving projects:', error);
    res.status(500).json({ message: 'Server error in getProjects' });
  }
};
