const express = require("express");
const router = express.Router();
const pool = require("../../db");

// GET USERS
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT id, name FROM users");
        res.json({ success: true, data: result.rows });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

module.exports = router;