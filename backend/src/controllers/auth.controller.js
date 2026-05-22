const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const pool = require("../config/db.config");

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check user exist
        const userResult = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (userResult.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        const user = userResult.rows[0];

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }

        // 3. Create token
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
        };

        const token = generateToken(payload);

        // 4. Response
        res.status(200).json({
            success: true,
            message: "Login successful",
            token: token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports = { loginUser };