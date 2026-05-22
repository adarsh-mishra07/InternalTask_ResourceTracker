const express = require("express");
const router = express.Router();

const { createTask, getTasks, assignTask, updateStatus, editTask, deleteTask } = require("../controllers/task.controller");

// routes
router.post("/", createTask);
router.get("/", getTasks);
router.put("/assign", assignTask);
router.put("/status", updateStatus);
router.put("/edit/:id", editTask);
router.delete("/delete/:id", deleteTask);
module.exports = router;