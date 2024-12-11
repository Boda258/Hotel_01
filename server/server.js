require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require('./db');
const usersRoute = require('./routes/usersRoute');
const reviewRoute = require('./routes/reviewRoute');
const hotelRoute = require('./routes/hotelRoute');  // Import the hotelRoute file
const Hotel = require('./models/hotel'); // Import the Hotel model
const bookings = require("./routes/bookings");



const mongoose = require('mongoose');
const bodyParser = require('body-parser');



const paymentRoute = require('./routes/paymentRoute');

const app = express();



// Enable CORS (you can customize this as per your needs)
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Serve static files (e.g., images, CSS, JS)
app.use(express.static('public'));

// Register routes
app.use('/api/users', usersRoute);
app.use('/api/reviews', reviewRoute);
app.use('/api/hotels', hotelRoute);  // Register the hotel routes here
app.use('/api/payments', paymentRoute);
app.use('/api/bookings', bookings);



// Error Handling Middleware (optional)
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ error: "Internal server error" });
});
// Connect to the database
connectDB().then(() => {
  console.log("Connected to the database.");
  addhotels();  // Add hotels if not present when DB connects
});

// Function to add hotels if they do not exist
async function addhotels() {
  try {
    const existinghotels = await Hotel.find();
    if (existinghotels.length === 0) {
      const hotels = [
        {
          name: "Marriott Mena House",
          description: "Luxury hotel with a view of the Great Pyramids of Giza.",
          location: "Giza, Egypt",
          pricePerNight: 250,
          amenities: ["Free Wifi", "Swimming Pool", "Spa", "Fitness Center", "Restaurant"],
          images: ["/images/marriot-mena-house.jpg"],
          starRating: 5,
        },
        {
          name: "Four Seasons Hotel Cairo at Nile Plaza",
          description: "Sophisticated luxury hotel overlooking the Nile River.",
          location: "Cairo, Egypt",
          pricePerNight: 300,
          amenities: ["Free Wifi", "Rooftop Pool", "Spa", "Restaurant", "Bar"],
          images: ["/images/four-seasons-cairo.jpg"],
          starRating: 5,
        },
        {
          name: "Steigenberger Cecil Hotel",
          description: "Historic hotel in Alexandria with stunning Mediterranean views.",
          location: "Alexandria, Egypt",
          pricePerNight: 120,
          amenities: ["Free Wifi", "Restaurant", "Bar", "Beach Access"],
          images: ["/images/steigenberger-cecil.jpg"],
          starRating: 4,
        },
        {
          name: "Hilton Luxor Resort & Spa",
          description: "Upscale resort with a spa and views of the Nile in Luxor.",
          location: "Luxor, Egypt",
          pricePerNight: 180,
          amenities: ["Free Wifi", "Spa", "Infinity Pool", "Restaurant", "Bar"],
          images: ["/images/hilton-luxor.jpg"],
          starRating: 5,
        },
        {
          name: "Jaz Mirabel Resort",
          description: "Family-friendly resort with private beach access in Sharm El-Sheikh.",
          location: "Sharm El-Sheikh, Egypt",
          pricePerNight: 200,
          amenities: ["Private Beach", "Water Park", "Free Wifi", "Restaurant"],
          images: ["/images/jaz-mirabel.jpg"],
          starRating: 4.5,
        },
        {
          name: "Kempinski Nile Hotel Garden City",
          description: "Boutique hotel with personalized services and Nile views.",
          location: "Cairo, Egypt",
          pricePerNight: 220,
          amenities: ["Free Wifi", "Restaurant", "Spa", "Rooftop Pool"],
          images: ["/images/kempinski-nile.jpg"],
          starRating: 5,
        },
        {
          name: "Old Cataract Hotel",
          description: "Iconic historic hotel in Aswan with luxurious interiors.",
          location: "Aswan, Egypt",
          pricePerNight: 300,
          amenities: ["Spa", "Infinity Pool", "Free Wifi", "Restaurant", "Bar"],
          images: ["/images/old-cataract.jpg"],
          starRating: 5,
        },
        {
          name: "Sheraton Sharm Hotel",
          description: "Spacious resort located along the pristine beaches of Sharm El-Sheikh.",
          location: "Sharm El-Sheikh, Egypt",
          pricePerNight: 160,
          amenities: ["Private Beach", "Spa", "Free Wifi", "Restaurant", "Bar"],
          images: ["/images/sheraton-sharm.jpg"],
          starRating: 4,
        },
        {
          name: "Steigenberger Al Dau Beach Hotel",
          description: "Stylish beachfront hotel offering premium amenities in Hurghada.",
          location: "Hurghada, Egypt",
          pricePerNight: 190,
          amenities: ["Private Beach", "Golf Course", "Water Park", "Free Wifi"],
          images: ["/images/steigenberger-hurghada.jpg"],
          starRating: 5,
        },
        {
          name: "Movenpick Resort Aswan",
          description: "Island resort on the Nile with serene surroundings.",
          location: "Aswan, Egypt",
          pricePerNight: 240,
          amenities: ["Free Wifi", "Spa", "Restaurant", "Bar", "Infinity Pool"],
          images: ["/images/movenpick-aswan.jpg"],
          starRating: 4.5,
        },
    ];
    
    await Hotel.insertMany(hotels);
    console.log("hotels added successfully.");
  } else {
    console.log("hotels already exist.");
  }
} catch (error) {
  console.error("Error adding  hotels:", error);
}
}
      

// Start server on port 8080
app.listen(8080, () => {
  console.log("Server running on port 8080");
});
