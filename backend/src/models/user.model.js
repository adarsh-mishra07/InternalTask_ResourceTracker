const pool = require("../config/db.config");

/**
 * Get user by email
 */
const findUserByEmail = async (email) => {
    const query = `
    SELECT id, email, password, role
    FROM users
    WHERE email = $1
  `;
    const result = await pool.query(query, [email]);
    return result.rows[0];
};

/**
 * Create new user
 */
const createUser = async (email, hashedPassword, role = "intern") => {
    const query = `
    INSERT INTO users (email, password, role)
    VALUES ($1, $2, $3)
    RETURNING id, email, role
  `;
    const result = await pool.query(query, [
        email,
        hashedPassword,
        role,
    ]);
    return result.rows[0];
};

module.exports = {
    findUserByEmail,
    createUser,
};
