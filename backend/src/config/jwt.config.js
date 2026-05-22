const env = require("./env.config"); // Import environment variables

module.exports = {
    secret: env.JWT_SECRET,
    expiresIN: env.JWT_EXPIRES_IN,
}