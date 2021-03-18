const db = require("../config/dbConfig");
const CatchAsync = require("../utility/CatchAsync");
const AppError = require("../utility/AppError");

exports.getAllRestaurants = CatchAsync(async (req, res, next) => {
  await db.query("SELECT * FROM restaurants;").then(([results, fields]) => {
    if (results && results.length == 0) {
      return next(new AppError("No restaurant were found!", 200));
    } else {
      return res.json({
        status: "success",
        message: `${results.length} restaurants were successfully found`,
        restaurants: results,
      });
    }
  });
});
