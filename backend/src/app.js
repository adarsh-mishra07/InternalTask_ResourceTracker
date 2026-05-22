const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes"); // Import authentication routes

const app = express(); /// Initialize express app

app.use(cors()); // Enable CORS to allow cross-origin requests and it is use to access the api from different domains
app.use(express.json()); // Parse JSON request bodies

app.use("/api/auth", authRoutes);  // Mount authentication routes

module.exports = app; // Export the Express app
