const express = require("express");
const router = new express.Router();
const API = require("../helpers/api");

module.exports = () => {

  router.get("*", (req, res) => API.get(req, res));

  return router;

};
