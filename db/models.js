"use strict";

const connection = require("../config/config").db;

const Sequelize = require("sequelize");
const sequelize = new Sequelize(connection, {
  "dialect": "mysql",
  "logging": true,
});
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
