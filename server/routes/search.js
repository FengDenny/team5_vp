const express = require("express");
const router = express.Router();

const { searchItems } = require("../controller/searchController");

router.get("/items", searchItems);

module.exports = router;
