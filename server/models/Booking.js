const mongoose = require('mongoose');

// Define the schema for Booking
const bookingSchema = new mongoose.Schema({
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true }, // Reference to Hotel
  userId: { type: String, required: true },  // User ID of the customer
  roomType: { type: String, required: true }, // Room type (e.g., Single, Double, Suite)
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true }, // Total cost of the booking
  status: { type: String, default: 'confirmed' },  // Booking status (confirmed, canceled)
});

module.exports = mongoose.model('Booking', bookingSchema);
