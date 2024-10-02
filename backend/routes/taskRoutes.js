const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const verifyProjectMembership = require('../middleware/verifyProjectMembership')

router.post('/createTask', verifyProjectMembership,taskController.createTask);
router.post('/getTasks', taskController.getTasks);

module.exports = router;
