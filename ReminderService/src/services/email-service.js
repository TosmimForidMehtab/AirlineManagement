const sender = require("../config/emailConfig");
const NotificationRepository = require("../repository/notification-repository");
const { ClientError, ServerError } = require("../utils/errors");
const notificationRepository = new NotificationRepository();

const sendBasicEmail = (to, subject, text) => {
    sender.sendMail({
        from: '"<Support>"<support@airline.com>',
        to: to,
        subject: subject,
        text: text,
        replyTo: "support@airline.com",
    });
};

const sendMailAndUpdate = (to, subject, text, ticketId) => {
    sender.sendMail(
        {
            from: '"<Support>"<support@airline.com>',
            to: to,
            subject: subject,
            // Send beautiful html email
            html: `<div style="background-color: #0c0c1d; color: white">
                <img src="https://calaero.edu/wp-content/uploads/2018/05/Airplane-Transponder.jpg" alt="Airplane" width="330" height="100"/>
                <br/>
                <h3 >${text}</h3>
            </div>`,
            replyTo: "support@airline.com",
        },
        async (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
                await notificationRepository.updateNotificationTicket(ticketId, { status: "sent" });
            }
        }
    );
};

const getPendingNotifications = async (timestamp) => {
    try {
        const notificationTickets = await notificationRepository.getAllNotificationTickets({ status: "pending" });

        return notificationTickets;
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            throw new ClientError("ValidationError", error.message);
        }
        throw new ServerError("ServiceError", "Unable to get notification tickets");
    }
};

const createNotification = async (data) => {
    try {
        const response = await notificationRepository.createNotificationTicket(data);
        return response;
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            throw new ClientError("ValidationError", error.message);
        }
        throw new ServerError("ServiceError", "Unable to create notification ticket");
    }
};

const updateNotification = async (id, status) => {
    try {
        const response = notificationRepository.updateNotificationTicket(id, status);
        return response;
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            throw new ClientError("ValidationError", error.message);
        }
        throw new ServerError("ServiceError", "Unable to update notification ticket");
    }
};

const subscribeEvents = async (payload) => {
    // console.log("Inside subscribeEvents");
    payload = JSON.parse(payload);
    // console.log(typeof payload);
    let data = payload.data;
    let service = payload.service;
    // console.log(data);
    switch (service) {
        case "BOOKING": {
            let notification = {
                subject: data.subject,
                recepientEmail: data.recepientEmail,
                notificationTime: new Date(),
                status: "pending",
                content: data.content,
            };
            await createNotification(notification);
            break;
        }
        case "FLIGHT": {
            // Send notification before 48 hours with pdf
            break;
        }
        case "CANCELLATION": {
            break;
        }
        case "PAYMENT": {
            break;
        }
        default: {
            break;
        }
    }
};
module.exports = {
    sendBasicEmail,
    sendMailAndUpdate,
    getPendingNotifications,
    createNotification,
    updateNotification,
    subscribeEvents,
};
