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
    // Sample From http://docs.sequelizejs.com/manual/installation/getting-started.html
    const Plan = sequelize.define('plan', {
      "plan_datetime": {
        "type": Sequelize.DATE
      },
      "plan_details": {
        "type": Sequelize.STRING
      },

    }, {
      "underscored": true,
      "underscoredAll": true,
    });

    // force: true will drop the table if it already exists
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
