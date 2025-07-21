const express = require('express');
const router = express.Router();
const taskController = require('../controllers/TaskController');

router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
// Add more routes as needed (update, delete, etc.)

module.exports = router; 