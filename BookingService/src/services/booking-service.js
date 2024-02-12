const { BookingRepository } = require("../repository/index");
const { FLIGHT_SERVICE_URL } = require("../config/serverConfig");
const axios = require("axios");
const { ServiceError } = require("../utils/errors");
const { publishMessage, createChannel } = require("../utils/messageQueue");
const { formatter } = require("../utils/dateFormat");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");

class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data) {
        try {
            const flightId = data.flightId;
            const response = await axios.get(`${FLIGHT_SERVICE_URL}${flightId}`);
            const flightData = response.data.data;
            let priceOfFlight = flightData.price;
            if (data.noOfSeats > flightData.totalSeats) {
                throw new ServiceError("Insufficient seats", "Seats are not available");
            }
            const totalCost = priceOfFlight * data.noOfSeats;
            const booking = await this.bookingRepository.create({
                ...data,
                totalCost,
            });
            await axios.patch(`${FLIGHT_SERVICE_URL}${booking.flightId}`, {
                totalSeats: flightData.totalSeats - booking.noOfSeats,
            });
            const finalBooking = await this.bookingRepository.update(booking.id, { status: "booked" });

            if (!finalBooking) {
                throw new ServiceError("Failed to create booking", "There was an issue creating the booking. Try again later");
            }
            const payload = {
                data: {
                    subject: "Booking Reminder",
                    recepientEmail: data.email,
                    content: `Your booking for flight ${flightData.flightNumber} has been confirmed.You have booked ${
                        data.noOfSeats
                    } seats and your total cost is $${totalCost}. The flight departs at ${formatter(flightData.departureTime)} and arrives at ${formatter(flightData.arrivalTime)}.\nHave a nice trip!`,
                },
                service: "BOOKING",
            };

            const channel = await createChannel();
            publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
            // console.log(JSON.stringify(payload));

            return finalBooking;
        } catch (error) {
            // console.log("Service...");
            // console.log(error);
            if (error.name === "RepositoryError" || error.name === "ValidationError") {
                throw error;
            }
            // console.log(error);
            throw new ServiceError("Failed to create booking", "There was an issue creating the booking. Try again later");
        }
    }
}

module.exports = BookingService;
