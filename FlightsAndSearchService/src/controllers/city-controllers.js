const { CityService } = require("../services/index");

const cityService = new CityService();
const create = async (req, res) => {
    try {
        const { name } = req.body;
        const city = await cityService.createCity({ name });

        return res.status(201).json({ data: city, success: true, message: "City created successfully", err: {} });
    } catch (error) {
        console.log(`Something went wrong in the controller layer: ${error}`);
        res.status(500).json({ data: {}, success: false, message: "Cannot create city", err: error });
    }
};

const destroy = async (req, res) => {
    try {
        const response = await cityService.deleteCity(req.params.cityId);
        return res.status(200).json({ data: response, success: true, message: "City deleted successfully", err: {} });
    } catch (error) {
        console.log(`Something went wrong in the controller layer: ${error}`);
        res.status(500).json({ data: {}, success: false, message: "Cannot delete city", err: error });
    }
};

const update = async (req, res) => {
    try {
        const { name } = req.body;
        const city = await cityService.updateCity(req.params.cityId, { name });
        return res.status(200).json({ data: city, success: true, message: "City updated successfully", err: {} });
    } catch (error) {
        console.log(`Something went wrong in the controller layer: ${error}`);
        res.status(500).json({ data: {}, success: false, message: "Cannot update city", err: error });
    }
};

const get = async (req, res) => {
    try {
        const city = await cityService.getCity(req.params.cityId);

        return res.status(200).json({ data: city, success: true, message: "City fetched successfully", err: {} });
    } catch (error) {
        console.log(`Something went wrong in the controller layer: ${error}`);
        res.status(500).json({ data: {}, success: false, message: "Cannot fetch city", err: error });
    }
};

const getAll = async (req, res) => {
    try {
        const cities = await cityService.getAllCities(req.query);
        return res.status(200).json({ data: cities, success: true, message: "Cities fetched successfully", err: {} });
    } catch (error) {
        console.log(`Something went wrong in the controller layer: ${error}`);
        res.status(500).json({ data: {}, success: false, message: "Cannot fetch cities", err: error });
    }
};

const getAirportsOnCity = async (req, res) => {
    try {
        const { cityId } = req.params;
        const airports = await cityService.getAirportsOnCity(cityId);
        return res.status(200).json({ data: airports, success: true, message: "Airports fetched successfully", err: {} });
    } catch (error) {
        console.log(`Something went wrong in the controller layer: ${error}`);
        res.status(500).json({ data: {}, success: false, message: "Cannot fetch airports", err: error });
    }
};

module.exports = {
    create,
    destroy,
    update,
    get,
    getAll,
    getAirportsOnCity,
};
