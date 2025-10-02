const express = require('express');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const Property = require('../models/Property');
const router = express.Router();

// Add property
router.post('/add-property', authenticate, authorize(['owner']), async (req, res) => {
  try {
    const property = new Property({ owner: req.user._id, ...req.body });
    await property.save();
    res.status(201).json({ message: 'Property added', property });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all properties of this owner
router.get('/my-properties', authenticate, authorize(['owner']), async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user._id });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
