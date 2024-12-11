import React from "react";
import "./HotelCard.css";
import { Link } from 'react-router-dom';

function HotelCard({ hotel }) {
  return (
    <div className="hotel-card">
      <img src={hotel.images[0]} alt={hotel.name} className="hotel-image" />
      <div className="hotel-info">
        <h3>{hotel.name}</h3>
        <p>{hotel.description}</p>
        
        {/* View Details Link */}
        <Link to={`/hotel/${hotel._id}`} className="btn btn-primary">View Details</Link>
        
        
        <p><b>Location:</b> {hotel.location}</p>
        <p><b>Price per Night:</b> ${hotel.pricePerNight}</p>
        <p><b>Rating:</b> {hotel.starRating} stars</p>
      </div>
    </div>
  );
}

export default HotelCard;


