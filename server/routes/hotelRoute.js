const express = require("express");
const mongoose = require("mongoose");
const Hotel = require("../models/hotel");

const router = express.Router();

// Fetch All Hotels
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    return res.status(200).json(hotels);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    return res.status(500).json({ error: "Failed to fetch hotels" });
  }
});



// Fetch Single Hotel by ID
router.get("/:hotelId", async (req, res) => {
  const { hotelId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(hotelId)) {
    return res.status(400).json({ error: "Invalid hotel ID format" });
  }

  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }
    return res.status(200).json(hotel);
  } catch (error) {
    console.error("Error fetching hotel:", error);
    return res.status(500).json({ error: "Failed to fetch hotel" });
  }
});

// Add Sample Hotels
router.post("/add-hotels", async (req, res) => {
  try {
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

    const createdHotels = await Hotel.insertMany(hotels);
    return res.status(201).json({ message: "Hotels added successfully", hotels: createdHotels });
  } catch (error) {
    console.error("Error adding hotels:", error);
    return res.status(500).json({ error: "Failed to add hotels" });
  }
});

module.exports = router;
