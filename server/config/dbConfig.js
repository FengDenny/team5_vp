const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 50,
  debug: false,
});

const promisePool = pool.promise();

module.exports = promisePool;
