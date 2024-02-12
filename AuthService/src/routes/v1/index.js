const express = require("express");

const UserController = require("../../controllers/user-controller");
const { validateUserAuth, validateIsAdminRequest } = require("../../middlewares/auth-request-validators");

const router = express.Router();

router.post("/signup", validateUserAuth, UserController.createUser);
router.post("/signin", validateUserAuth, UserController.signIn);
router.get("/isAuthenticated", UserController.isAuthenticated);
router.get("/isAdmin", validateIsAdminRequest, UserController.isAdmin);
router.get("/isAirlineBusiness", validateIsAdminRequest, UserController.isAirlineBusiness);

module.exports = router;
