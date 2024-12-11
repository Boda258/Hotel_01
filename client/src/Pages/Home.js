import React, { useEffect, useState } from "react";
import axios from "axios";
import HotelCard from "../Components/HotelCard";

function Home() {
  const [hotels, setHotels] = useState([]);

 useEffect(() => {
    async function fetchHotels() {
      try {
        const response = await axios.get("http://localhost:8080/api/hotels");
        setHotels(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    }
    fetchHotels();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Hotels in Egypt</h2>
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
