const Axios = require("axios");
// eslint-disable-next-line camelcase
const config = require("../config/config.json");
const api_key = process.env.API_KEY || config.api_key;
const api_url = process.env.API_URL || config.api_url;
const { ServerError } = require("../../src/resources/errors.js");

// Tie in an interceptor to handle all errors (response errors, or network errors),
// So we can expect a standard in how errors return (always with code+message, typed
// as JSON.)

Axios.interceptors.response.use((response) => response, (err) => {

  let newError = new ServerError({});

  if (!err.response) {

    const sErrorParams = {};

    if (err.code) {

      sErrorParams.code = err.code;

    }

    // If no response returned, it was a network error. Wrap it.
    newError = new ServerError(sErrorParams);

  } else if (err.response.data && err.response.data.message) {

    const sErrorParams = {
      "message": err.response.data.message,
      "code": err.response.data.code,
    };

    if (err.response.data.name) {

      sErrorParams.name = err.response.data.name;

    }

    // If a response was returned, and meets the markup typical of an API error response
    // wrap it up, boys
    newError = new ServerError(sErrorParams);

  }

  return Promise.reject(newError);

});

const sendRequest = (req, res, method) => {

  let headers = {
  // eslint-disable-next-line camelcase
    api_key,
    ...req.headers,
  };

  const body = req.hasOwnProperty("body") ? req.body : null;
  const url = api_url + req.url;

  const conf = {
    // eslint-disable-next-line camelcase
    "url": url,
    method,
    headers,
    "data": body,
    "validateStatus": (status) => {
      return status < 400; // Reject only if the status code is greater than or equal to 400
    }
  };

  // Return the request to the external API,
  // if an error is thrown, it should always be typed as a ServerError, so call .toJSON()
  // so Axios will passback the request to the client-side call as a JSON-typed error.
  Axios(conf)
    .then((externalResponse) => res.status(externalResponse.status).json(externalResponse.data))
    .catch((err) => {

      if (err && err.toJson) {

        return res.status(400).json(err.toJson());

      }

      return res.status(400).json(new ServerError({}).toJson());

    });

};

const serverRequestMethods = [ "get", "post", "put", "delete" ];

const requestMethods = {};

// Generify the requests. If we need to pass conditional data based on the type
// outside of data we can reasonably pull from the req object (E.G: IP Logging),
// expand this, but for brevity we'll leave it as it is.
serverRequestMethods.forEach((srm) => {

  requestMethods[srm] = (req, res) => sendRequest(req, res, srm);

});

module.exports = requestMethods;
