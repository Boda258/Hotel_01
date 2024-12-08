import React, { useEffect, useState } from "react";
import axios from "axios";
import HotelCard from "../Components/HotelCard";

function Home() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetchHotels();
  }, []);

  async function fetchHotels() {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const response = await axios.get(`${apiUrl}/api/hotels`); 
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  }

  return (
    <div className="container mt-5">
      <h2>Hotels Available</h2>
      <div className="hotels-list mt-4">
        {hotels.length === 0 ? (
          <p>No hotels available at the moment.</p>
        ) : (
          hotels.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
