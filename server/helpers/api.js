const Axios = require("axios");
const { api_key, api_url } = require("../../config/config.json");

const sendRequest = (req, res, method) => {
  let headers = {
    api_key,
  };

  if (req.headers.hasOwnProperty("token")) {

    headers.token = req.headers.token;

  }

  Axios({
    "url": api_url + req.url,
    method,
    headers,
    "data": req.hasOwnProperty("body") ? req.body : null,
  });

};


module.exports = {
  "get": (req, res) => sendRequest(req, res, "get"),
  "post": (req, res) => sendRequest(req, res, "post"),
  "put": (req, res) => sendRequest(req, res, "put"),
  "delete": (req, res) => sendRequest(req, res, "delete"),
};
