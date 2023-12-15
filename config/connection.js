const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  // When using JAWSDB_URL, it's a complete URL so no additional parameters are needed
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // For local or custom database, pass the options as an object
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: process.env.DB_DIALECT,
      // Additional options can be added here as needed
    }
  );
}

module.exports = sequelize;