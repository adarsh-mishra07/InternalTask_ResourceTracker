const express = require("express");
const router = express.Router();

const { loginUser } = require("../controllers/auth.controller");
const { registerUser } = require("../controllers/register.controller");

router.post("/login", loginUser);
router.post("/register", registerUser);
module.exports = router;
