const mongoose = require('mongoose');

// Define the Project schema
const ProjectSchema = new mongoose.Schema({
  projectId: { 
    type: mongoose.Schema.Types.ObjectId, 
    auto: true, // Automatically generate an ObjectId for each project
  },
  title: { 
    type: String, 
    required: true, 
    trim: true  // Trim whitespace from the title
  },
  description: { 
    type: String, 
    trim: true  // Trim whitespace from the description
  },
  createdBy: { 
    type: String, 
    required: true, 
    trim: true    // Ensure a reference to the User model is provided
  },
});

// Create and export the Project model
module.exports = mongoose.model('Project', ProjectSchema);
