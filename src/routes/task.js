const express = require('express');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Route to create a new task
router.post('/', authMiddleware, createTask);

// Route to get all tasks
router.get('/', authMiddleware, getTasks);

// Route to get a specific task by its ID
router.get('/:id', authMiddleware, getTaskById);

// Route to update a specific task by its ID
router.put('/:id', authMiddleware, updateTask);

// Route to delete a specific task by its ID
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;

