const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to parse JSON in requests

// --- ROUTES ---
// This is the line you couldn't paste earlier!
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes")); // <-- Add this line

// Basic test route
app.get("/", (req, res) => {
  res.send("ATS Backend is running!");
});

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Failed: ", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
