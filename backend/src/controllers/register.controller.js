const bcrypt = require("bcryptjs");
const pool = require("../../db"); // ya "../config/db.config" (tumhare setup ke hisaab se)

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // 🔥 VALIDATION
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // 🔥 CHECK USER EXIST
        const userExists = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // 🔥 HASH PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 🔥 DEFAULT ROLE
        const userRole = role || "user";

        // 🔥 INSERT USER
        const newUser = await pool.query(
            "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, email, hashedPassword, userRole]
        );

        // 🔥 RESPONSE
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: newUser.rows[0],
        });

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports = { registerUser };