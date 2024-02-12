const { FlightService } = require("../services/index");
const flightService = new FlightService();

const create = async (req, res) => {
    try {
        let { flightNumber, airplaneId, departureAirportId, arrivalAirportId, departureTime, arrivalTime, price } = req.body;
        let flightRequestData = {
            flightNumber,
            airplaneId,
            departureAirportId,
            arrivalAirportId,
            departureTime,
            arrivalTime,
            price,
        };
        const flight = await flightService.createFlight(flightRequestData);
        return res.status(201).json({
            data: flight,
            success: true,
            message: "Flight created successfully",
            error: {},
        });
    } catch (error) {
        return res.status(500).json({ data: {}, success: false, message: "Cannot create flight", error: error.message });
    }
};

const getAll = async (req, res) => {
    try {
        const flights = await flightService.getAllFlightData(req.query);
        return res.status(200).json({ data: flights, success: true, message: "Flights fetched successfully", error: {} });
    } catch (error) {
        return res.status(500).json({ data: {}, success: false, message: "Cannot fetch flights", error: error.message });
    }
};

const get = async (req, res) => {
    try {
        const flight = await flightService.getFlight(req.params.id);
        return res.status(200).json({ data: flight, success: true, message: "Flight fetched successfully", error: {} });
    } catch (error) {
        return res.status(500).json({ data: {}, success: false, message: "Cannot fetch flight", error: error.message });
    }
}

const updateFlight = async (req, res) => {
    try {
        const flight = await flightService.updateFlight(req.params.id, req.body);
        return res.status(200).json({ data: flight, success: true, message: "Flight updated successfully", error: {} });
    } catch (error) {
        return res.status(500).json({ data: {}, success: false, message: "Cannot update flight", error: error.message });
    }
}

module.exports = { create, getAll, get, updateFlight };
