const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const verifyAdmin = require('../middleware/authMiddleware'); // Import the admin verification middleware

// Route to create a project, only accessible by admins
router.post('/createProjects', verifyAdmin, projectController.createProjects);

// Route to get all projects, accessible by any user
router.post('/openProject', projectController.openProject);

module.exports = router;
