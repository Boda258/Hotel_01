import dotenv from 'dotenv';
require(dotenv).config();
// const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
// const router = express.Router();

export default async function handler(req, res) {
  

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'GET') {
    return res.status(200).json({ message: 'API is working!' });
  }
  if (req.method === 'POST') {
    // Route based on body content, query parameters, or custom headers
    const { action } = req.body;

    switch (action) {
      case 'login':
        return login(req, res);
      // case 'deleteUser':
      //   return deleteUser(req, res);
      // case 'updateUser':
      //   return updateUser(req, res);
      default:
        res.status(400).json({ message: 'Invalid action' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

// Function to handle "createUser"
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// // Function to handle "deleteUser"
// const deleteUser = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     if (!userId) {
//       return res.status(400).json({ message: 'User ID is required' });
//     }
//     // Add your database logic here
//     res.status(200).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting user', error });
//   }
// };

// // Function to handle "updateUser"
// const updateUser = async (req, res) => {
//   try {
//     const { userId, newData } = req.body;
//     if (!userId || !newData) {
//       return res.status(400).json({ message: 'User ID and new data are required' });
//     }
//     // Add your database logic here
//     res.status(200).json({ message: 'User updated successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating user', error });
//   }
// };

// // Register User
// router.post("/register", async (req, res) => {
//   let { username, email, password, confirmpassword } = req.body;

//   if (!username || !email || !password || !confirmpassword) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   if (password !== confirmpassword) {
//     return res.status(400).json({ error: "Passwords do not match" });
//   }

//   try {
//     // Check if the email is already registered
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "Email is already registered" });
//     }

//     // Ensure unique username
//     let existingUsername = await User.findOne({ username });
//     if (existingUsername) {
//       let suffix = 1;
//       let newUsername = `${username}${suffix}`;
//       while (await User.findOne({ username: newUsername })) {
//         suffix++;
//         newUsername = `${username}${suffix}`;
//       }
//       username = newUsername;
//     }

//     // Hash the password before saving
//     const encryptedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       username,
//       email,
//       password: encryptedPassword,
//     });

//     await newUser.save();

//     // Generate JWT
//     const token = jwt.sign(
//       { id: newUser._id, username: newUser.username, isAdmin: newUser.isAdmin },
//       process.env.SECRET_KEY,
//       { expiresIn: "1h" }
//     );

//     return res.status(201).json({
//       message: "User registered successfully",
//       token,
//       user: {
//         id: newUser._id,
//         username: newUser.username,
//         email: newUser.email,
//       },
//     });
//   } catch (error) {
//     console.error("Error saving user:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Login User
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: "Invalid email or password" });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: "Invalid email or password" });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user._id, username: user.username, isAdmin: user.isAdmin },
//       process.env.SECRET_KEY,
//       { expiresIn: "1h" }
//     );

//     return res.status(200).json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user._id,
//         username: user.username,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.error("Error during login:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

// module.exports = router;
