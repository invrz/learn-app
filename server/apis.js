// apis.js
const express = require('express');
const { getUser, createUser } = require('./models'); // or './orm-models' if using ORM
const router = express.Router();

// Endpoint to get a user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to create a new user
router.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await createUser(name, email);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
