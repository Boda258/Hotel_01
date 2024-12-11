import React, { useState } from 'react';
import axios from 'axios';

const HotelSearch = ({ setSelectedHotel }) => {
  const [location, setLocation] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [amenities, setAmenities] = useState('');
  const [starRating, setStarRating] = useState('');
  const [hotels, setHotels] = useState([]);

  const searchHotels = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/hotels', {
        params: {
          location,
          priceMin,
          priceMax,
          amenities,
          starRating,
        },
      });
      setHotels(response.data);  // Set the hotels to state
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  return (
    <div>
      <h2>Search for Hotels</h2>
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="number"
        placeholder="Min Price"
        value={priceMin}
        onChange={(e) => setPriceMin(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={priceMax}
        onChange={(e) => setPriceMax(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amenities (comma separated)"
        value={amenities}
        onChange={(e) => setAmenities(e.target.value)}
      />
      <input
        type="number"
        placeholder="Min Star Rating"
        value={starRating}
        onChange={(e) => setStarRating(e.target.value)}
      />
      <button onClick={searchHotels}>Search</button>

      <div>
        {hotels.length > 0 ? (
          hotels.map((hotel) => (
            <div key={hotel._id} onClick={() => setSelectedHotel(hotel)}>
              <h3>{hotel.name}</h3>
              <p>{hotel.location}</p>
              <p>Price: ${hotel.pricePerNight} per night</p>
              <p>Rating: {hotel.starRating} stars</p>
            </div>
          ))
        ) : (
          <p>No hotels found</p>
        )}
      </div>
    </div>
  );
};

export default HotelSearch;
