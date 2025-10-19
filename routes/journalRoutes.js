const express = require("express");
const Journal = require("../models/Journal");
const { upload } = require("../cloudinary.js");

const router = express.Router();

// Add note with optional image
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { user, text } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const newEntry = new Journal({ user, text, imageUrl });
    await newEntry.save();

    res.json({ success: true, entry: newEntry });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all notes (latest first)
router.get("/", async (req, res) => {
  try {
    const entries = await Journal.find().sort({ date: -1 });
    res.json({ success: true, entries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;