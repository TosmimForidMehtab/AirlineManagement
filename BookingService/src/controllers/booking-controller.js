const { BookingService } = require("../services/index");
const { StatusCodes } = require("http-status-codes");
const { publishMessage, createChannel } = require("../utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");

const bookingService = new BookingService();

class BookingController {
    constructor() {}
    async createBooking(req, res) {
        try {
            const response = await bookingService.createBooking(req.body);
            res.status(StatusCodes.OK).json({
                data: response,
                success: true,
                message: "Booking created successfully",
                error: null,
            });
        } catch (error) {
            // console.log(error);
            return res.status(error.statusCode).json({
                data: null,
                success: false,
                message: "Error while creating booking",
                error: error.message,
            });
        }
    }

    async sendMessageToQueue(req, res) {
        const channel = await createChannel();
        const data = { message: "Hello World" };
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(data));
        return res.status(StatusCodes.OK).json({ data: null, success: true, message: "Message sent to queue", error: null });
    }
}

/* const createBooking = async (req, res) => {
    try {
        const response = await bookingService.createBooking(req.body);
        res.status(StatusCodes.OK).json({
            data: response,
            success: true,
            message: "Booking created successfully",
            error: null,
        });
    } catch (error) {
        return res.status(error.StatusCode).json({
            data: null,
            success: false,
            message: "Error while creating booking",
            error: error.message,
        });
    }
}; */

/* module.exports = {
    createBooking,
}; */

module.exports = BookingController;
