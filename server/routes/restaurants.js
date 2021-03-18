const express = require("express");
const router = express.Router();
const { getAllRestaurants } = require("../controller/restaurantController");

router.get("/getAllRestaurants", getAllRestaurants);

// router.post("/createRestaurant", imageUpload.single("image"), createRestaurant);

module.exports = router;
