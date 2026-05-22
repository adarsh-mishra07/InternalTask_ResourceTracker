const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ IMPORT ROUTES
const authRoutes = require("./src/routes/auth.routes");
const taskRoutes = require("./src/routes/task.routes");

// ✅ IMPORT DB
const pool = require("./db");

// =======================
// 🔥 MIDDLEWARES (FIRST)
// =======================
app.use(cors());
app.use(express.json());

// =======================
// 🚀 ROUTES (AFTER MIDDLEWARE)
// =======================

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", require("./src/routes/users.routes"));
// =======================
// 🧪 TEST ROUTE
// =======================
app.get("/", (req, res) => {
    res.send("Backend running 🚀");
});

// =======================
// 📦 RESOURCE ROUTES
// =======================

// GET all resources
app.get("/api/resources", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM resources");
        res.json(result.rows);
    } catch (err) {
        console.error("GET resources error:", err.message);
        res.status(500).json({ message: "Server Error" });
    }
});

// POST resource
app.post("/api/resources", async (req, res) => {
    try {
        const { name, type, assigned_to } = req.body;

        if (!name || !type) {
            return res.status(400).json({
                success: false,
                message: "Name and type are required",
            });
        }

        const newResource = await pool.query(
            "INSERT INTO resources (name, type, assigned_to) VALUES ($1, $2, $3) RETURNING *",
            [name, type, assigned_to]
        );

        res.status(201).json({
            success: true,
            data: newResource.rows[0],
        });
    } catch (err) {
        console.error("POST resource error:", err.message);
        res.status(500).json({ message: "Server Error" });
    }
});

// =======================
// ❌ GLOBAL ERROR HANDLER
// =======================
app.use((err, req, res, next) => {
    console.error("Global Error:", err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong",
    });
});

// =======================
// 🚀 SERVER START
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});