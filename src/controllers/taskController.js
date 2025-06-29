const Task = require('../models/task');
const { StatusCodes } = require('http-status-codes');

const createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      userId: req.user.id,
    });
    return res
      .status(StatusCodes.CREATED)
      .json({ success: true, data: task });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    return res
      .status(StatusCodes.OK)
      .json({ success: true, data: tasks });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error.message });
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: 'Task not found' });
    }
    return res.status(StatusCodes.OK).json({ success: true, data: task });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error.message });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: 'Task not found' });
    }

    await task.update({ title, description, status });
    return res.status(StatusCodes.OK).json({ success: true, data: task });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: 'Task not found' });
    }

    await task.destroy();
    return res
      .status(StatusCodes.OK)
      .json({ success: true, message: 'Task deleted' });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, error: error.message });
  }
};


module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};
