const { City } = require("../models/index");
const { Op } = require("sequelize");

class CityRepository {
    async createCity({ name }) {
        try {
            const city = await City.create({ name });
            return city;
        } catch (error) {
            console.log(`Something went wrong in the repository layer: ${error}`);
            throw { error };
        }
    }

    async deleteCity(cityId) {
        try {
            await City.destroy({
                where: {
                    id: cityId,
                },
            });
            return true;
        } catch (error) {
            console.log(`Something went wrong in the repository layer: ${error}`);
            throw { error };
        }
    }

    async updateCity(cityId, { name }) {
        try {
            /* const city = await City.update(
                { name },
                {
                    where: {
                        id: cityId,
                    },
                }
            ); */
            const city = await City.findByPk(cityId);
            city.name = name;
            await city.save();
            return city;
        } catch (error) {
            console.log(`Something went wrong in the repository layer: ${error}`);
            throw { error };
        }
    }

    async getCity(cityId) {
        try {
            const city = await City.findByPk(cityId);
            return city;
        } catch (error) {
            console.log(`Something went wrong in the repository layer: ${error}`);
            throw { error };
        }
    }

    async getAllCities(filter) {
        try {
            if (filter.name) {
                const cities = await City.findAll({
                    where: {
                        name: {
                            [Op.startsWith]: filter.name,
                        },
                    },
                });
                return cities;
            }
            const cities = await City.findAll();
            return cities;
        } catch (error) {
            console.log(`Something went wrong in the repository layer: ${error}`);
            throw { error };
        }
    }

    async getAirportsOnCity(city) {
        try {
            const airports = city.getAirports();
            return airports;
        } catch (error) {
            console.log(`Something went wrong in the repository layer: ${error}`);
            throw { error };
        }
    }
}

module.exports = CityRepository;
