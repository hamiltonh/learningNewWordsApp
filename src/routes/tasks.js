const express = require('express');
const router = express.Router();

const Word = require('../models/Word');

router.get('/', async (req, res) => {
  const tasks = await Word.find({})
  console.log(tasks);
  res.json(tasks);
});

router.get('/:id', async (req, res) => {
  const task = await Word.findById(req.params.id);
  res.json(task);
});

router.post('/', async (req, res) => {
  const task = new Word(req.body);
  await task.save();
  res.json({
    status: 'Word saved'
  });
});

router.put('/:id', async (req, res) => {
  await Word.findByIdAndUpdate(req.params.id, req.body);
  res.json({
    status: 'Word Updated'
  });
});

router.delete('/:id', async (req, res) => {
  await Word.findByIdAndRemove(req.params.id);
  res.json({
    status: 'Word deleted'
  });
});

module.exports = router;
