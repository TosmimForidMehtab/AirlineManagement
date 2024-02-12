const validateCreateFlight = (req, res, next) => {
    let { flightNumber, airplaneId, departureAirportId, arrivalAirportId, departureTime, arrivalTime, price } = req.body;

    if ([flightNumber, airplaneId, departureAirportId, arrivalAirportId, departureTime, arrivalTime, price].includes(undefined)) {
        return res.status(400).json({ data: {}, success: false, message: "All fields are required", error: {} });
    }

    next();
};

module.exports = {
    validateCreateFlight,
};
