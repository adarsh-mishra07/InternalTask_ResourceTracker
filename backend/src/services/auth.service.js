const pool = require("../config/db.config");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const loginService = async (email, password) => {
    const user = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    if (user.rows.length === 0) {
        throw new Error("User not found");
    }

    const validPassword = await bcrypt.compare(
        password,
        user.rows[0].password
    );

    if (!validPassword) {
        throw new Error("Invalid password");
    }

    const payload = {
        id: user.rows[0].id,
        email: user.rows[0].email,
        role: user.rows[0].role,
    };

    return generateToken(payload);
};

module.exports = { loginService };