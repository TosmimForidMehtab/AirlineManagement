const { NotificationTicket } = require("../models/index");
const { ClientError, ServerError } = require("../utils/errors");
const { Op } = require("sequelize");
class NotificationRepository {
    async createNotificationTicket(data) {
        try {
            const notificationTicket = await NotificationTicket.create(data);
            if (!notificationTicket) {
                throw new ServerError("RepositoryError", "Unable to create notification ticket");
            }
            // console.log(notificationTicket);
            return notificationTicket;
        } catch (error) {
            console.log(error);
            if (error.name === "SequelizeValidationError") {
                throw new ClientError("ValidationError", error.message);
            }
            throw new ServerError("RepositoryError", "Unable to create notification ticket");
        }
    }

    async updateNotificationTicket(id, data) {
        try {
            const notificationTicket = await NotificationTicket.findByPk(id);
            if (data.status) notificationTicket.status = data.status;
            await notificationTicket.save();
            return notificationTicket;
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                throw new ClientError("ValidationError", error.message);
            }
            throw new ServerError("RepositoryError", "Unable to update notification ticket");
        }
    }

    async getAllNotificationTickets(filter) {
        try {
            const notificationTickets = await NotificationTicket.findAll({
                where: {
                    status: filter.status,
                    notificationTime: {
                        [Op.lte]: new Date(),
                    },
                },
            });
            return notificationTickets;
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                throw new ClientError("ValidationError", error.message);
            }
            throw new ServerError("RepositoryError", "Unable to get notification tickets");
        }
    }
}

module.exports = NotificationRepository;
