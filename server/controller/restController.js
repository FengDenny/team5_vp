const db = require("../config/dbConfig");
exports.getAllRestaurants = async (req, res, next) => {
  db.query("SELECT * FROM restaurants;").then(([results, fields]) => {
    console.log(results);
    res.send(results);
  });
};
