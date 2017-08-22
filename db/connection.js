"use strict";

const connection = require("../config/config").db;

const Sequelize = require("sequelize");
const sequelize = new Sequelize(connection, {
  "dialect": "mysql",
  "logging": false,
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

    const Plan = sequelize.define('plan', {
      "plan_start_datetime": {
        "type": Sequelize.DATE
      },
      "plan_end_datetime": {
        "type": Sequelize.DATE
      },
      "plan_details": {
        "type": Sequelize.STRING
      },

    }, {
      "underscored": true,
      "underscoredAll": true,
    });

    // Refresh this table on each server run
    Plan.sync({"force": true});

    sequelize.models = {
      Plan,
    }

  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
module.exports = {
  Sequelize, sequelize
}
