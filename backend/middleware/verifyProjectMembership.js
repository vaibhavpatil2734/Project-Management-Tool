const jwt = require('jsonwebtoken');
const Project = require('../models/Project'); // Assuming the Project model is used

const verifyProjectMembership = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  // Check if the Authorization header is provided
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided or incorrect format. Please log in.' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token

  try {
    // Verify the token and extract the user data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the user (decoded token) to req object

    const { compId } = decoded; // Extract compId from the token payload
    if (!compId) {
      return res.status(400).json({ message: 'Invalid token, compId not found.' });
    }

    // Get the project title from the request body (passed from the frontend)
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Project title is missing.' });
    }

    // Check if the project exists and if the compId is part of the project members
    const project = await Project.findOne({ title });

    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    // Check if compId exists in assignedUsers array
    const isMember = project.assignedUsers.includes(compId);

    if (!isMember) {
      return res.status(403).json({ message: 'Access denied. You are not a member of this project.' });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error in verifying project membership:', error.message);
    return res.status(400).json({ message: 'Invalid token or failed verification.', error: error.message });
  }
};

module.exports = verifyProjectMembership;
