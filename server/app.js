const express = require("express");
const morgan = require("morgan");
const restaurantRoutes = require("./routes/restaurant");

// express app initialized
const app = express();

// Body Parser
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// development logging
if (process.env.NODE_ENV == "development") {
  app.use(morgan("development"));
} else if (process.env.NODE_ENV == "production") {
  app.use(morgan("production"));
}

// routes
app.use("/api/v1/restaurants", restaurantRoutes);

module.exports = app;
