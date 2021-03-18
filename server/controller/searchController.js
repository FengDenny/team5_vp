const db = require("../config/dbConfig");
const CatchAsync = require("../utility/CatchAsync");
const AppError = require("../utility/AppError");

exports.searchItems = CatchAsync(async (req, res, next) => {
  // req.query.search MUST match the front end url
  // example: localhost:3000/api/v1/search/items?SEARCH=value
  let searchTerm = req.query.search;
  //    if no searchTerm return success, and show all the restaurant results
  if (!searchTerm) {
    await db
      .query(
        "SELECT id, restaurant_name, restaurant_logo, cuisine_type FROM restaurants ",
        []
      )
      .then(([results, fields]) => {
        res.json({
          status: "success",
          message:
            "No search term was given, so we're showing all the results!",
          results: results,
        });
      })
      .catch((err) => {
        return next(new AppError(err, 500));
      });
  } else {
    //   if searchTerm does exist run our baseSQL statement and show the results
    let baseSQL =
      "SELECT id, restaurant_name, restaurant_logo, cuisine_type, concat_ws(' ', restaurant_name, cuisine_type  ) \
      AS haystack FROM restaurants HAVING haystack like ? ;";
    let searches = "%" + searchTerm + "%";
    await db
      .execute(baseSQL, [searches])
      .then(([results, fields]) => {
        if (results && results.length) {
          res.json({
            status: "success",
            message: `${results.length} results found`,
            results: results,
          });
        } else {
          // if no results were found, just show all of the restaurants results
          db.query(
            "SELECT id, restaurant_name, restaurant_logo, cuisine_type FROM restaurants ",
            []
          ).then(([results, fields]) => {
            res.json({
              status: "success",
              message:
                "Results not found, but checkout our latest restaurants!",
              results: results,
            });
          });
        }
      })
      .catch((err) => {
        return next(new AppError(err, 500));
      });
  }
});
