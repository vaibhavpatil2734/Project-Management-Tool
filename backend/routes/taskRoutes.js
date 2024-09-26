const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/createTask', taskController.createTask);
// router.get('/:projectId', taskController.getTasks);

module.exports = router;
