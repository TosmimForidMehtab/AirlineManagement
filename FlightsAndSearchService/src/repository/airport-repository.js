const { Op } = require("sequelize");
const { Airport } = require("../models/index");
class AirportRepository {
    async createAirport({ name, address, cityId }) {
        try {
            const airport = await Airport.create({ name, address, cityId });
            return airport;
        } catch (error) {
            console.log(`Something went wrong in the repository layer: ${error}`);
            throw { error };
        }
    }

    async getAirport(airportId) {
        try {
            const airport = await Airport.findByPk(airportId);
            return airport;
        } catch (error) {
            console.log(`Something went wrong in the repository layer: ${error}`);
            throw { error };
        }
    }

    async updateAirport(airportId, { name, address, cityId }) {
        try {
            const airport = await Airport.update({ name, address, cityId }, { where: { id: airportId } });
            return airport;
        } catch (error) {
            console.log(`Something went wrong in the repository layer: ${error}`);
            throw { error };
        }
    }

    async deleteAirport(airportId) {
        try {
            const response = await Airport.destroy({ where: { id: airportId } });
            return response;
        } catch (error) {
            console.log(`Something went wrong in the repository layer: ${error}`);
            throw { error };
        }
    }

    async getAllAirports(filter) {
        try {
            if (filter.name) {
                const airports = await Airport.findAll({
                    where: {
                        name: {
                            [Op.startsWith]: filter.name,
                        },
                    },
                });
                return airports;
            }
            const airports = await Airport.findAll();
            return airports;
        } catch (error) {
            console.log(`Something went wrong in the repository layer: ${error}`);
            throw { error };
        }
    }
}

module.exports = AirportRepository;
