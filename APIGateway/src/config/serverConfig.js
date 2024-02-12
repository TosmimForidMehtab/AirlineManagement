const dotenv = require("dotenv");
dotenv.config();
module.exports = {
    PORT: process.env.PORT,
    WINDOW: process.env.WINDOW,
    LIMIT: process.env.LIMIT
};