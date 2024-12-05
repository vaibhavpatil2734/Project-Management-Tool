const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const verifyAdmin = require('../middleware/authMiddleware'); // Middleware for admin verification
const verifyProjectMembership = require('../middleware/verifyProjectMembership')

// Route to create a project (admin-only access)
router.post('/createProjects',  verifyAdmin,projectController.createProjects);

// Route to open a project (accessible by any user)
router.post('/openProject', verifyProjectMembership,projectController.openProject);

module.exports = router;
