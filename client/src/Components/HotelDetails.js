import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // For accessing route params

const HotelDetails = () => {
  const { hotelId } = useParams(); // Get the hotelId from the URL
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/hotels/${hotelId}`);
        const data = await response.json();
        setHotel(data); // Save the hotel data
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch hotel details");
        setLoading(false);
      }
    };

    fetchHotel();
  }, [hotelId]);

  if (loading) {
    return <p>Loading hotel details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="hotel-details">
      <h1>{hotel.name}</h1>
      <img src={hotel.images[0]} alt={hotel.name} />
      <p>{hotel.description}</p>
      <p>Location: {hotel.location}</p>
      <p>Price per Night: ${hotel.pricePerNight}</p>
      <p>Amenities: {hotel.amenities.join(", ")}</p>
      <p>Star Rating: {hotel.starRating}</p>
    </div>
  );
};

export default HotelDetails;
