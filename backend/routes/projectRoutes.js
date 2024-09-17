const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.post('/createProjects', projectController.createProject);
router.get('/getProjects', projectController.getProjects);

module.exports = router;
