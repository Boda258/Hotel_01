const express = require('express');
const Hotel = require('../models/hotel');
const router = express.Router();


router.get('/', async (req, res) => {
  const { location, priceMin, priceMax, amenities, starRating } = req.query;

  try {
    const query = {};

    
    if (location) query.location = new RegExp(location, 'i');  // Case-insensitive search
    if (priceMin && priceMax) query.pricePerNight = { $gte: priceMin, $lte: priceMax };
    if (starRating) query.starRating = { $gte: starRating };
    if (amenities) query.amenities = { $in: amenities.split(',') };

    
    const hotels = await Hotel.find(query);
    res.json(hotels);  // Return the list of hotels
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
