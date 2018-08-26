import axios from "axios";
import { RequestCancelledError } from "../resources/errors.js";

/*
  Here, we handle request throttling/debouncing for EVERY request

  This is what we want. Generic, fast, efficient throttling so a user cannot
  issue multiple actions of the same type in such a short-span of time.

  Q/A:

  Q. This is really ugly, are you looking into fixing it?
  A: Yes, it is ugly. But so is the way Axios handles responses and promise-cancellation.
     I would love to fix this, but I can't find many solutions (I've looked)

  Q: Why not just fork the axios repository and use it here?
  A: I'm lazy.

  Q: Are you aware this comes with limitations? How are you going to handle multiple
     requests of relatively the same type (but with different data-passed)!?
  A: I don't think that will happen in such a simple app. Also see answer #2.

*/

// Use an interceptor to handle debouncing on axios-based requests
axios.interceptors.request.use((config) => {

  const key = config.method + "--" + config.url;

  // After doing that, we need to store a reference to this request in an object that can
  // contain both the config, and the function to execute.
  const requestSchema = {
    key,
  };

  config.extra = requestSchema;

  // 'pending' is our key for requests currently 'pending'-heh
  if (axios.hasOwnProperty("pending")) {

    // Check if a request matching the previously-created key exists
    const keyIndex = axios.pending.findIndex((p) => p.key === key);

    // If it doesn't, push it into the array
    if (!~keyIndex) {

      axios.pending.push(requestSchema);

    // If it does, we know a request is currently pending for this op--cancel it.

    } else {

      // Remove it from the array
      axios.pending.splice(keyIndex, 1);

      // Reject with a cancellation error
      return Promise.reject(new axios.Cancel({
        key, // Passing context through the error (Evil-genius stutff *I swear I'm not insane*)
      }));

    }

  } else {

    // If it doesn't exist, create it
    axios.pending = [requestSchema];

  }

  return Promise.resolve(config);

}, (err) => Promise.reject(err));

const removePendingRequest = (key) => {

  const existing = axios.pending.findIndex((c) => c.key === key);

  if (~existing) {

    axios.pending.splice(existing, 1);

  }

};

axios.interceptors.response.use((response) => {

  // If the response came back, we know we havn't cancelled it. So remove it from 'pending'
  removePendingRequest(response.config.extra.key);
  return Promise.resolve(response);

}, (err) => {

  // Axios error handling (Interchangably network errors and typed errors. AMAZING STRATEGY!)
  // The goal here is to have the same response schema for all errors so we know what to expect

  // For some reason--axios is not standardized to return a response with typeerrors...why?
  // who knows. It's really not a fun time though.

  // So, let's make some fake network-errors.
  const FAKE_NETWORK_ERROR = {
    "response": {
      "data": {
        "message": "A generic network error occurred.",
      },
    },
  };

  // Yes--this is a thing. Sometimes when a request is cancelled during a concurrent request--
  // it will reject the promise with an undefined error object
  if (typeof err !== "undefined") {

    const errorKeys = [ "name", "message", "code" ];

    errorKeys.forEach((key) => {

      if (err[key]) {

        FAKE_NETWORK_ERROR.response.data[key] = err[key];

      }

    });


    // If we have a network error, the response is finished--burn the pending request, same deal
    // for a cancellation error (as far as I know, I will only ever be handling these two.)

    if (err.response) {

      removePendingRequest(err.response.config.extra.key);

      // Yes--this is really janky. Axios cannot access the scope of a response error if the response
      // error is generated by a cancelled Promise. If this markup is the case, we know we have a cancellation error

    } else if (axios.isCancel(err) && err.message && err.message.key) {

      FAKE_NETWORK_ERROR.response.data = new RequestCancelledError().toJson();

      removePendingRequest(err.message.key);
      return Promise.reject(FAKE_NETWORK_ERROR);

    }

  } else {

    return Promise.reject(FAKE_NETWORK_ERROR);

  }

  return Promise.reject(err);

});