import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // To link to individual hotel pages

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/hotels");
        setHotels(response.data); // Store hotel data in state
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch hotels");
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return <p>Loading hotels...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="hotel-list">
      <h1>Hotel Listings</h1>
      <div className="hotels">
        {hotels.map((hotel) => (
          <div key={hotel._id} className="hotel-card">
            <img src={hotel.images[0]} alt={hotel.name} />
            <h2>{hotel.name}</h2>
            <p>{hotel.description}</p>
            <p>Location: {hotel.location}</p>
            <p>Price per Night: ${hotel.pricePerNight}</p>
            <p>Amenities: {hotel.amenities.join(", ")}</p>
            <p>Star Rating: {hotel.starRating}</p>
            <Link to={`/hotel/${hotel._id}`}>View Details</Link> {/* Link to hotel details */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
