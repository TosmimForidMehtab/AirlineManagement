const { AirportRepository } = require("../repository/index");

class AirportService {
    constructor() {
        this.airportRepository = new AirportRepository();
    }

    async createAirport({ name, address, cityId }) {
        try {
            const airport = await this.airportRepository.createAirport({ name, address, cityId });
            return airport;
        } catch (error) {
            console.log(`Something went wrong in the service layer: ${error}`);
            throw { error };
        }
    }

    async getAirport(airportId) {
        try {
            const airport = await this.airportRepository.getAirport(airportId);
            return airport;
        } catch (error) {
            console.log(`Something went wrong in the service layer: ${error}`);
            throw { error };
        }
    }

    async updateAirport(airportId, { name, address, cityId }) {
        try {
            const airport = await this.airportRepository.updateAirport(airportId, { name, address, cityId });
            return airport;
        } catch (error) {
            console.log(`Something went wrong in the service layer: ${error}`);
            throw { error };
        }
    }

    async deleteAirport(airportId) {
        try {
            const response = await this.airportRepository.deleteAirport(airportId);
            return response;
        } catch (error) {
            console.log(`Something went wrong in the service layer: ${error}`);
            throw { error };
        }
    }

    async getAllAirports(filter) {
        try {
            const airports = this.airportRepository.getAllAirports({ name: filter.name });
            return airports;
        } catch (error) {
            console.log(`Something went wrong in the service layer: ${error}`);
            throw { error };
        }
    }
}

module.exports = AirportService;
