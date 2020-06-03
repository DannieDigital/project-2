const config = require(__dirname + "/../config.json")[env]; 
const Sequelize = require ("sequelize");
const env = process.env.NODE_ENV || "development";
const fs = require ("fs");
const path = require ("path");