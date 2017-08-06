import Axios from "axios";
import moment from "moment";
const _ = require("underscore");
const Promise = require("bluebird");

const mapEvents = (events) => {
  return _.map(events, (ev) => {
    return {
      "title": ev.plan_details,
      "start": moment(ev.plan_start_datetime).toDate(),
      "end": moment(ev.plan_end_datetime).toDate(),
    }
  })
}

export const queries = {

  "getPlans": () => {
    return new Promise((resolve, reject) => {
      Axios.get('/db/getplans')
      .then((result) =>  {
        return resolve(mapEvents(result.data.data));
      })
      .catch((err) => {
        return reject(err);
      })
    })
  },

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
  }

}
