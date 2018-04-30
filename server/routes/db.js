const express = require("express");
const router = new express.Router();
const API = require("../helpers/api.js");

const serverRequestMethods = [ "get", "post", "put", "delete" ];

// Generify each server-handled request method and inject the pertinent type
// into express Router
serverRequestMethods.forEach((srm) => {

  router[srm]("*", (req, res) => API[srm](req, res));

});

module.exports = router;
