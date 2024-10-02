const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const verifyProjectMembership = require('../middleware/verifyProjectMembership');
const authMiddleware = require("../middleware/authMiddleware");

// Task creation route
router.post('/createTask', authMiddleware, verifyProjectMembership, taskController.createTask);

// Fetch tasks route
router.post('/getTasks', taskController.getTasks);

// Update task route (change POST to PUT for updating)
router.put('/updateTask/:id', taskController.updateTask);

module.exports = router;
