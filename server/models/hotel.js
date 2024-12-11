
const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  amenities: [String],
  images: [String],
  starRating: { type: Number, required: true },
});

module.exports = mongoose.model("Hotel", hotelSchema);

