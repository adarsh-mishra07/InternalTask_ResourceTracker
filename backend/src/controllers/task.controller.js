const pool = require("../config/db.config");

/* ======================================================
   CREATE TASK
====================================================== */
const createTask = async (req, res) => {

    try {

        const { title, description } = req.body;

        const result = await pool.query(
            "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
            [title, description]
        );

        res.status(201).json({
            success: true,
            data: result.rows[0],
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};


/* ======================================================
   GET ALL TASKS
====================================================== */
const getTasks = async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM tasks ORDER BY id DESC"
        );

        res.status(200).json({
            success: true,
            data: result.rows,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};


/* ======================================================
   ASSIGN TASK
====================================================== */
const assignTask = async (req, res) => {

    try {

        const { taskId, userId } = req.body;

        const result = await pool.query(
            "UPDATE tasks SET assigned_to=$1 WHERE id=$2 RETURNING *",
            [userId, taskId]
        );

        res.status(200).json({
            success: true,
            data: result.rows[0],
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};


/* ======================================================
   UPDATE TASK STATUS
====================================================== */
const updateStatus = async (req, res) => {

    try {

        const { taskId, status } = req.body;

        const result = await pool.query(
            "UPDATE tasks SET status=$1 WHERE id=$2 RETURNING *",
            [status, taskId]
        );

        res.status(200).json({
            success: true,
            data: result.rows[0],
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};


/* ======================================================
   EDIT TASK
====================================================== */
const editTask = async (req, res) => {

    try {

        const { id } = req.params;

        const { title, description } = req.body;

        const result = await pool.query(
            `
            UPDATE tasks
            SET title=$1, description=$2
            WHERE id=$3
            RETURNING *
            `,
            [title, description, id]
        );

        res.status(200).json({
            success: true,
            data: result.rows[0],
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};


/* ======================================================
   DELETE TASK
====================================================== */
const deleteTask = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(
            "DELETE FROM tasks WHERE id=$1",
            [id]
        );

        res.status(200).json({
            success: true,
            message: "Task Deleted Successfully",
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};


/* ======================================================
   EXPORTS
====================================================== */
module.exports = {
    createTask,
    getTasks,
    assignTask,
    updateStatus,
    editTask,
    deleteTask,
};