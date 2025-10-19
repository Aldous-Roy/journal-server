const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const journalRoutes = require("./routes/journalRoutes");
const authRoutes = require("./routes/authRoutes");
dotenv.config();

const uploadRoutes = require("./routes/uploadRoutes");

const app = express();
app.use(cors());
app.use(express.json());


//mongoDB Cloud connection 
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB error:", err));


//routes
app.use("/api", uploadRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Couple Journal Backend Running 💖");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});