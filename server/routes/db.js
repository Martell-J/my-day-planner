const express = require("express");
const router = new express.Router();
const Promise = require("bluebird");

module.exports = (app) => {

  const sequelize = app.sequelize;

  const getAllRecords = () => (
    new Promise((resolve, reject) => (
      sequelize.models.Plan.findAll()
      .then((results) => (
        resolve(results.map((result) => (result.get())))
      ))
      .catch((err) => (
        reject(err)
      ))
    ))
  );

  const insertRecord = (record) => (
    new Promise((resolve, reject) => (
      sequelize.models.Plan.create(record)
      .then((results) => (
        resolve(getAllRecords())
      ))
      .catch((err) => (
        reject(err)
      ))
    ))
  );

  router.get("/getplans", (req, res) => (
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
  ));

  router.post("/addplan", (req, res) => (
    insertRecord(req.body)
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
  ));

  return router;
}
