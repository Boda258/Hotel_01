import React, { useState } from 'react';
import axios from 'axios';

const Booking = ({ hotel }) => {
  const [userId, setUserId] = useState('');
  const [roomType, setRoomType] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [totalPrice, setTotalPrice] = useState('');

  const handleBooking = async () => {
    const bookingData = {
      hotelId: hotel._id,
      userId,
      roomType,
      checkInDate,
      checkOutDate,
      totalPrice,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/bookings', bookingData);
      alert('Booking confirmed!');
    } catch (error) {
      console.error('Error booking room:', error);
    }
  };

  return (
    <div>
      <h2>Book {hotel.name}</h2>
      <div>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Room Type"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
        />
        <input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
        />
        <input
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
        />
        <input
          type="number"
          placeholder="Total Price"
          value={totalPrice}
          onChange={(e) => setTotalPrice(e.target.value)}
        />
      </div>
      <button onClick={handleBooking}>Book Now</button>
    </div>
  );
};

export default Booking;
