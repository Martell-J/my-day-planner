const express = require("express");
const router = new express.Router();
const Promise = require("bluebird");
const _ = require("underscore");

module.exports = (app) => {

  const sequelize = app.sequelize;

  router.get("/getplans", (req, res) => {

    const getPlans = () => {

      return new Promise((resolve, reject) => {

        sequelize.models.Plan.findAll()
        .then((results)=>{

          let data = _.map(results, (result) => {

            return result.get();


          });
          res.status(200).json({
            "message": "Records retrieved.",
            data ,
          });

        })
        .catch((err) => {
          res.status(400).json({
            "message": "Error retrieving records.",
          });
        })

      })

    };

    return getPlans();

  });

  router.post("/addplan", (req, res) => {

    let postData = req.body;

    const addPlan = () => {

      return new Promise((resolve, reject) => {

        sequelize.models.Plan.create(postData)
        .then((results)=>{
          res.status(200).json({
            "message": "Record successfully inserted."
          });
        })
        .catch((err)=>{
          res.status(400).json({
            "message": "Error inserting record.",
          });
        })

      });

    };

    return addPlan();
  })

  return router;
}
