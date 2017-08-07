import Axios from "axios";
import moment from "moment";
const _ = require("underscore");
const Promise = require("bluebird");

// Iterates through a list of events, and converts each returned value to a Date
// type object, and builds it in a format that BigCalendar can parse
const mapEvents = (events) => {
  return _.map(events, (ev) => {
    return {
      "title": ev.plan_details,
      "start": moment(ev.plan_start_datetime).toDate(),
      "end": moment(ev.plan_end_datetime).toDate(),
    }
  })
}

// A helper for DB-Oriented queries
export const queries = {

  // Returns a list of 'events' to send to a bigcalendar component
  "getPlans": () => {
    return new Promise((resolve, reject) => {
      // Query the local /db/getplans route
      Axios.get('/db/getplans')
      .then((result) =>  {
        // Iterate through the returned events and pull that data out of the response.
        // and resolve that array data
        return resolve(mapEvents(result.data.data));
      })
      .catch((err) => {
        return reject(err);
      })
    })
  },

  // Inserts a plan which the user has built, and returns an updated list
  // of all events added to-date
  "insertPlan": (postJSON) => {
    return new Promise((resolve, reject) => {
      Axios.post('/db/addplan', postJSON)
      .then((result) =>  {
        resolve(mapEvents(result.data.data));
      })
      .catch((err) => {
        return reject(err);
      })
    })
  },

  // More-intricate validators relative to the above queries
  "validators": {

    // Discover whether or not a plan conflicts with the timeframe of an existing plan
    "isConflictingPlan": (events, plan) => {

      let startDate = moment(plan.plan_start_datetime);
      let endDate = moment(plan.plan_end_datetime);

      let confliction = false;

      // Iterate through each event, and check whether or not it falls within
      // an existing date range within a plan. If it does, set a flag and return it
      _.map(events, (event) => {
        if(moment(startDate) <= moment(event.end) &&
          moment(event.start) <= moment(endDate)){
            confliction = true;
        }
      });

      return confliction;

    },

  }

}
