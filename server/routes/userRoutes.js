const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth'); 

// create new user 
router.post('/', async (req, res) => {
    try{
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch(err){
    res.status(400).json({error: err.message });
    }
});

// get all users 
router.get('/', auth, async (req, res) => {
    try { 
        const users = await User.find();
        res.json(users);
    } catch(err){
        res.status(500).json({error: err.message});
    }
});

// Get a single user by ID
router.get('/:id', auth, async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Update a user
  router.put('/:id', auth, async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Delete a user
  router.delete('/:id', auth, async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  module.exports = router;
