const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Simple in-memory auth (for single-user demonstration)
let isAuthenticated = false;
let currentUser = null;

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.json({ success: true, message: "User created" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ isAuthenticated: false, message: "User not found" });

    const match = await user.comparePassword(password);
    if (!match)
      return res.json({ isAuthenticated: false, message: "Wrong password" });

    isAuthenticated = true;
    currentUser = username;

    res.json({ isAuthenticated: true, user: username });
  } catch (err) {
    res
      .status(500)
      .json({ isAuthenticated: false, message: err.message });
  }
});

// Logout route
router.post("/logout", (req, res) => {
  isAuthenticated = false;
  currentUser = null;
  res.json({ isAuthenticated: false, message: "Logged out successfully" });
});

// Export both the router and auth state if needed elsewhere
router.authState = { get isAuthenticated() { return isAuthenticated; }, get currentUser() { return currentUser; } };

module.exports = router;