require("dotenv").config(); // Load environment variables from .env file

const env = {
    PORT: process.env.PORT || 5000, // Server port
    NODE_ENV: process.env.NODE_ENV || "development", // Node environment

    JWT_SECRET: process.env.JWT_SECRET, // Secret key for JWT
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN, // JWT expiration time

    DB_HOST: process.env.DB_HOST, // Database host
    DB_PORT: process.env.DB_PORT, // Database port
    DB_NAME: process.env.DB_NAME, // Database name
    DB_USER: process.env.DB_USER, // Database user
    DB_PASSWORD: process.env.DB_PASSWORD, // Database password

};

module.exports = env; // Export the configuration object