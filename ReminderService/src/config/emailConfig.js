const nodemailer = require("nodemailer");

const sender = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});

module.exports = sender;
