const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const verifyProjectMembership = require('../middleware/verifyProjectMembership')
const authMiddleware = require("../middleware/authMiddleware")

router.post('/createTask',authMiddleware,verifyProjectMembership, taskController.createTask);
router.post('/getTasks', taskController.getTasks);

module.exports = router;
