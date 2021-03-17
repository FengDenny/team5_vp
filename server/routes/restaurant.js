const express = require("express");
const router = express.Router();
const restController = require("../controller/restController");

router.get("/getAllRestaurants", restController.getAllRestaurants);

module.exports = router;
