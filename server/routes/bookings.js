const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

// Create a new booking
router.post('/', async (req, res) => {
  const { hotelId, userId, roomType, checkInDate, checkOutDate, totalPrice } = req.body;

  try {
    const booking = new Booking({
      hotelId,
      userId,
      roomType,
      checkInDate,
      checkOutDate,
      totalPrice,
    });

    await booking.save();  // Save the booking to the database
    res.status(201).json({ message: 'Booking confirmed', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking' });
  }
});

module.exports = router;