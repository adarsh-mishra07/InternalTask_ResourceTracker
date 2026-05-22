const bcrypt = require("bcrypt");
const { findUserByEmail, createUser } = require("../models/user.model");

const registerService = async (email, password, role) => {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        throw new Error("User already exists");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await createUser(email, hashedPassword, role);

    return user;
};

module.exports = { registerService };
