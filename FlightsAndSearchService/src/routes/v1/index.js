const express = require("express");
const CityController = require("../../controllers/city-controllers");
const AirportController = require("../../controllers/airport-controllers");
const FlightController = require("../../controllers/flight-controllers");
const { flightMiddlewares } = require("../../middlewares/index");

const router = express.Router();

router.post("/city", CityController.create);
router.delete("/city/:cityId", CityController.destroy);
router.get("/city/:cityId", CityController.get);
router.get("/city", CityController.getAll);
router.patch("/city/:cityId", CityController.update);
router.get("/city/:cityId/airports", CityController.getAirportsOnCity);

router.post("/airport", AirportController.create);
router.delete("/airport/:airportId", AirportController.destroy);
router.get("/airport/:airportId", AirportController.get);
router.get("/airport", AirportController.getAll);
router.patch("/airport/:airportId", AirportController.update);

router.post("/flights", flightMiddlewares.validateCreateFlight, FlightController.create);
router.get("/flights", FlightController.getAll);
router.get("/flights/:id", FlightController.get);
router.patch("/flights/:id", FlightController.updateFlight)

module.exports = router;
