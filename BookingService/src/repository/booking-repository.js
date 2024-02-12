const { StatusCodes } = require("http-status-codes");
const { Booking } = require("../models/index");
const { ValidationError, AppError } = require("../utils/errors");

class BookingRepository {
    async create(data) {
        try {
            const booking = await Booking.create(data);
            return booking;
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                throw new ValidationError(error);
            }
            throw new AppError("RepositoryError", "Error in creating booking", "There was an error in creating booking", 500);
        }
    }

    async update(bookingId, data) {
        try {
            const booking = await Booking.findByPk(bookingId);
            if (data.status) {
                booking.status = data.status;
            }
            await booking.save();
            return booking;
        } catch (error) {
            throw new AppError("RepositoryError", "Cannot update booking", "There was an issue updating the booking. Try again later", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

module.exports = BookingRepository;
