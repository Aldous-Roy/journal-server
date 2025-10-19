const express = require("express");
const Journal = require("../models/Journal");
const multer = require("multer");

const router = express.Router();

// Use in-memory storage for simplicity
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Add a journal note
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { user, text } = req.body;
    if (!user || !text) {
      return res.status(400).json({ success: false, message: "User and text are required" });
    }

    // Convert image to base64 if provided
    const imageUrl = req.file
      ? `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
      : null;

    const newEntry = new Journal({ user, text, imageUrl });
    await newEntry.save();

    res.json({ success: true, entry: newEntry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get all journal entries
router.get("/", async (req, res) => {
  try {
    const entries = await Journal.find().sort({ date: -1 });
    res.json({ success: true, entries });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;