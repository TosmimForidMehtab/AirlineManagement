const express = require("express");
const { create } = require("../../controllers/ticket-controller");
const router = express.Router();

router.post("/create", create);

module.exports = router;
