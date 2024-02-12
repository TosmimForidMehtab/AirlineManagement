const cron = require("node-cron");
const emailService = require("../services/email-service");

const setupJob = () => {
    cron.schedule("*/1 * * * *", async () => {
        const response = await emailService.getPendingNotifications();
        response.forEach((ticket) => {
            emailService.sendMailAndUpdate(ticket.recepientEmail, ticket.subject, ticket.content, ticket.id);
        });
    });
};

module.exports = {
    setupJob,
};
