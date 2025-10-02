const express = require('express');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const Booking = require('../models/Booking');
const Property = require('../models/Property');
const router = express.Router();

// Get all bookings (admin)
router.get('/', authenticate, authorize(['admin']), async (req, res) => {
  const bookings = await Booking.find().populate('student property');
  res.json(bookings);
});

// Book a property (student)
router.post('/book/:property_id', authenticate, authorize(['student']), async (req, res) => {
  try {
    const { property_id } = req.params;
    const { mealsSelected, startDate, endDate } = req.body;

    const property = await Property.findById(property_id);
    if (!property || !property.isAvailable) {
      return res.status(400).json({ message: 'Property not available' });
    }

    const booking = await Booking.create({
      student: req.user._id,
      property: property._id,
      mealsSelected,
      startDate,
      endDate,
      status: 'Pending'
    });

    res.status(201).json({ message: 'Booking created', booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Approve or Reject booking (admin)
router.patch('/admin/:booking_id', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { booking_id } = req.params;
    const { status } = req.body;

    if (!['Confirmed', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const booking = await Booking.findByIdAndUpdate(
      booking_id,
      { status },
      { new: true }
    ).populate('student property');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: `Booking ${status}`, booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
