const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user"); // Import the User model

// Register (Signup) route
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json("All fields are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (err) {
    console.error("Error during user registration:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("All fields are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("User not found");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json("Invalid password");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token, username: user.username }); // Include the username in the response
  } catch (err) {
    console.error("Error during user login:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

module.exports = router;