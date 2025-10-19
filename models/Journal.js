const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: false },
  imageUrl: { type: String, required: false },
  date: { type: Date, default: Date.now }
});

const Journal = mongoose.model("Journal", journalSchema);

module.exports = Journal;