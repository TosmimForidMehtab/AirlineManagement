const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    EMAIL: process.env.EMAIL,
    PASS: process.env.PASS,
    MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
    EXCHANGE_NAME: process.env.EXCHANGE_NAME,
    QUEUE_NAME: process.env.QUEUE_NAME,
    REMINDER_BINDING_KEY: process.env.REMINDER_BINDING_KEY,
};
