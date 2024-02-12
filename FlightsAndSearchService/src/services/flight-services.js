const { FlightRepository, AirplaneRepository } = require("../repository/index");
const { compareDateTime } = require("../utils/helper");

class FlightService {
    constructor() {
        this.airplaneRepository = new AirplaneRepository();
        this.flightRepository = new FlightRepository();
    }

    async createFlight(data) {
        try {
            if (!compareDateTime(data.arrivalTime, data.departureTime)) {
                throw new Error("Arrival time cannot be before departure time");
            }
            const airplane = await this.airplaneRepository.getAirplane(data.airplaneId);
            const flight = await this.flightRepository.createFlight({ ...data, totalSeats: airplane.capacity });
            return flight;
        } catch (error) {
            console.log(`Something went wrong in the service layer: ${error}`);
            throw error;
        }
    }

    async getAllFlightData(data) {
        try {
            const flights = await this.flightRepository.getAllFlights(data);
            return flights;
        } catch (error) {
            console.log(`Something went wrong in the service layer: ${error}`);
            throw error;
        }
    }

    async getFlight(flightId) {
        try {
            const flight = await this.flightRepository.getFlight(flightId);
            return flight;
        } catch (error) {
            console.log(`Something went wrong in the service layer: ${error}`);
            throw error;
        }
    }

    async updateFlight(flightId, data) {
        try {
            const response = await this.flightRepository.updateFlight(flightId, data);
            return response;
        } catch (error) {
            console.log(`Something went wrong in the repository layer: ${error}`);
            throw { error };
        }
    }
}

module.exports = FlightService;
