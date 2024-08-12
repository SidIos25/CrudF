const express = require('express');
const router = express.Router();
const Alien = require('../models/alien');

router.get('/', async (req, res) => {
  try {
    const aliens = await Alien.find();
    res.json(aliens);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const alien = await Alien.findById(req.params.id);
    res.json(alien);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

router.post('/', async (req, res) => {
  const alien = new Alien({
    name: req.body.name,
    tech: req.body.tech,
    sub: req.body.sub,
  });

  try {
    const savedAlien = await alien.save();
    res.json(savedAlien);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const alien = await Alien.findById(req.params.id);

    if (!alien) {
      return res.status(404).send('Alien not found');
    }

    alien.sub = req.body.sub || alien.sub;

    const updatedAlien = await alien.save();
    res.json(updatedAlien);
  } catch (err) {
    res.status(500).send('Error: ' + err);
  }
});

module.exports = router;