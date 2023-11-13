const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET specific task
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params 
    const task = await Task.findById(id)
    res.json(task)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Server error' });
  }
})

// POST a new task
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT update a task
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed || task.completed;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndRemove(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
