const { AirportService } = require("../services/index");

const airportService = new AirportService();

const create = async (req, res) => {
    const { name, address, cityId } = req.body;

    try {
        if (!name || !address || !cityId) {
            return res.status(400).json({ data: {}, success: false, message: "All fields are required", err: {} });
        }
        const airport = await airportService.createAirport({ name, address, cityId });
        return res.status(201).json({ data: airport, success: true, message: "Airport created successfully", err: {} });
    } catch (error) {
        return res.status(500).json({ data: {}, success: false, message: "Cannot create airport", err: error });
    }
};

const destroy = async (req, res) => {
    const { airportId } = req.params;
    try {
        const response = await airportService.deleteAirport(airportId);
        return res.status(200).json({ data: response, success: true, message: "Airport deleted successfully", err: {} });
    } catch (error) {
        return res.status(500).json({ data: {}, success: false, message: "Cannot delete airport", err: error });
    }
};

const update = async (req, res) => {
    const { name, address, cityId } = req.body;
    const { airportId } = req.params;
    try {
        if (!name || !address || !cityId) {
            return res.status(400).json({ data: {}, success: false, message: "All fields are required", err: {} });
        }
        const airport = await airportService.updateAirport(airportId, { name, address, cityId });
        return res.status(200).json({ data: airport, success: true, message: "Airport updated successfully", err: {} });
    } catch (error) {
        return res.status(500).json({ data: {}, success: false, message: "Cannot update airport", err: error });
    }
};

const get = async (req, res) => {
    const { airportId } = req.params;
    try {
        const airport = await airportService.getAirport(airportId);
        return res.status(200).json({ data: airport, success: true, message: "Airport fetched successfully", err: {} });
    } catch (error) {
        return res.status(500).json({ data: {}, success: false, message: "Cannot fetch airport", err: error });
    }
};

const getAll = async (req, res) => {
    try {
        const airports = await airportService.getAllAirports(req.query);
        return res.status(200).json({ data: airports, success: true, message: "Airports fetched successfully", err: {} });
    } catch (error) {
        return res.status(500).json({ data: {}, success: false, message: "Cannot fetch airports", err: error });
    }
};

module.exports = {
    create,
    destroy,
    update,
    get,
    getAll,
};
