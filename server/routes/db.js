const express = require("express");
const router = new express.Router();
const Promise = require("bluebird");
const _ = require("underscore");

module.exports = (app) => {

  const sequelize = app.sequelize;

  const getAllRecords = () => {
    return new Promise((resolve, reject) => {
      sequelize.models.Plan.findAll()
      .then((results) => {
        let data = _.map(results, (result) => {

          return result.get();

        });

        return resolve(data);
      })
      .catch((err) => (
        reject(err)
      ))
    })
  };

  const insertRecord = (record) => {
    return new Promise((resolve, reject) => {
      sequelize.models.Plan.create(record)
      .then((results) => (resolve(getAllRecords())))
      .catch((err) => (
        reject(err)
      ))
    })
  }

  router.get("/getplans", (req, res) => {

    const getPlans = () => {

      getAllRecords()
      .then((data)=>{

        res.status(200).json({
          "message": "Records retrieved.",
          data,
        });

      })
      .catch((err) => {
        res.status(400).json({
          "message": "Error retrieving records.",
          err
        });
      })

    };

    return getPlans();

  });

  router.post("/addplan", (req, res) => {

    let postData = req.body;

    const addPlan = () => {
      insertRecord(postData)
      .then((data)=>{
        res.status(200).json({
          "message": "Record successfully inserted.",
          data
        });
      })
      .catch((err)=>{
        res.status(400).json({
          "message": "Error inserting record.",
          err
        });
      })

    };

    return addPlan();
  })

  return router;
}
