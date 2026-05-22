const pool = require("../config/db.config");

const createTask = async (title, description, user_id) => {
    const result = await pool.query(
        "INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *",
        [title, description, user_id]
    );
    return result.rows[0];
};

const getTasks = async (user_id) => {
    const result = await pool.query(
        "SELECT * FROM tasks WHERE user_id = $1",
        [user_id]
    );
    return result.rows;
};

module.exports = { createTask, getTasks };