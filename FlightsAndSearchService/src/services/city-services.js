const { CityRepository } = require("../repository/index");

class CityService {
    constructor() {
        this.cityRepository = new CityRepository();
    }

    async createCity({ name }) {
        try {
            const city = await this.cityRepository.createCity({ name });
            return city;
        } catch (error) {
            console.log(`Something went wrong in the service layer: ${error}`);
            throw { error };
        }
    }

    async deleteCity(cityId) {
        try {
            const response = await this.cityRepository.deleteCity(cityId);
            return response;
        } catch (error) {
            console.log(`Something went wrong in the service layer: ${error}`);
            throw { error };
        }
    }

    async updateCity(cityId, { name }) {
        try {
            const city = await this.cityRepository.updateCity(cityId, { name });
            return city;
        } catch (error) {
            console.log(`Something went wrong in the service layer: ${error}`);
            throw { error };
        }
    }
    async getCity(cityId) {
        try {
            const city = await this.cityRepository.getCity(cityId);
            return city;
        } catch (error) {
            console.log(`Something went wrong in the service layer: ${error}`);
            throw { error };
        }
    }

    async getAirportsOnCity(cityId) {
        try {
            const city = await this.cityRepository.getCity(cityId);
            const airports = await this.cityRepository.getAirportsOnCity(city);
            return airports;
        } catch (error) {
            console.log(`Something went wrong in the service layer: ${error}`);
            throw { error };
        }
    }

    async getAllCities(filter) {
        try {
            const cities = await this.cityRepository.getAllCities({ name: filter.name });
            return cities;
        } catch (error) {
            console.log(`Something went wrong in the service layer: ${error}`);
            throw { error };
        }
    }
}

module.exports = CityService;
