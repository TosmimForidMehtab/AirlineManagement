const { Flight } = require("../models/index");
const { Op } = require("sequelize");

class FlightsRepository {
    #createFilter(data) {
        let filter = {};
        if (data.arrivalAirportId) filter.arrivalAirportId = data.arrivalAirportId;
        if (data.departureAirportId) filter.departureAirportId = data.departureAirportId;
        if (data.arrivalTime) filter.arrivalTime = data.arrivalTime;
        if (data.departureTime) filter.departureTime = data.departureTime;
        if (data.flightNumber) filter.flightNumber = data.flightNumber;
        if (data.totalSeats) filter.totalSeats = { [Op.gte]: data.totalSeats };

        let priceFilter = [];
        if (data.minPrice) {
            priceFilter.push({ price: { [Op.gte]: data.minPrice } });
        }
        if (data.maxPrice) {
            priceFilter.push({ price: { [Op.lte]: data.maxPrice } });
        }
        Object.assign(filter, { [Op.and]: priceFilter });

        return filter;
    }
    async createFlight(data) {
        try {
            const flight = await Flight.create(data);
            return flight;
        } catch (error) {
            console.log(`Something went wrong in the repository layer: ${error}`);
            throw { error };
        }
    }

    async getFlight(flightId) {
        try {
            const flight = await Flight.findByPk(flightId);
            return flight;
        } catch (error) {
            console.log(error);
            console.log(`Something went wrong in the repository layer: ${error}`);
            throw { error };
        }
    }

    async getAllFlights(filters) {
        try {
            const filter = this.#createFilter(filters);
            const flights = await Flight.findAll({
                where: filter,
            });
            return flights;
        } catch (error) {
            console.log(`Something went wrong in the repository layer: ${error}`);
            throw { error };
        }
    }

    async updateFlight(flightId, data) {
        try {
            const flight = await Flight.update(data, {
                where: {
                    id: flightId
                }
            })
            return true;
        } catch (error) {
            console.log(`Something went wrong in the repository layer: ${error}`);
            throw { error };
        }
    }
}

module.exports = FlightsRepository;
