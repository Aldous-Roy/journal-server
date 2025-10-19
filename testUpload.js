const cloudinary = require("cloudinary").v2;
require("dotenv").config();
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.uploader.upload(
  path.join(__dirname, "test.jpg"),
  { folder: "couple_journal" },
  function(error, result) {
    if (error) console.error("Upload error:", error);
    else console.log("Upload success:", result.secure_url);
  }
);