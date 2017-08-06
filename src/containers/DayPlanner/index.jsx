import React, { Component } from "react";
import Axios from "axios";
import DayPlanner from "../../components/DayPlanner";
import moment from "moment";
const _ = require("underscore");
const { queries } = require("../../helpers/queries.js");

let emptyDateTimes = {};

emptyDateTimes.startDateTime = new Date();
emptyDateTimes.startDateTime.setHours(0);
emptyDateTimes.startDateTime.setMinutes(0);
emptyDateTimes.startDateTime.setSeconds(0);
emptyDateTimes.startDateTime.setMilliseconds(0);

emptyDateTimes.endDateTime = new Date(emptyDateTimes.startDateTime);
emptyDateTimes.endDateTime.setHours(10);

class DayPlannerPage extends Component {

  /*
   * Class constructor.
   */
  constructor(props, context) {

    super(props, context);

    this.state = {
      "selectedStartDateTime": emptyDateTimes.startDateTime,
      "selectedEndDateTime": emptyDateTimes.endDateTime,
      "planDetails": "",
      "errors": "",
      "events": [],
    }

  }

  addPlan() {
    let self = this;
    let postJSON = {
      "plan_start_datetime": moment(this.state.selectedStartDateTime).format('YYYY/MM/DD HH:mm:ss'),
      "plan_end_datetime": moment(this.state.selectedEndDateTime).format('YYYY/MM/DD HH:mm:ss'),
      "plan_details": this.state.planDetails,
    }

    queries.insertPlan(postJSON)
    .then((events) => {
      self.setState({events})
    })
    .catch((err) => {
      console.log(err);
    })

  }

  // Handles changes for startDateTimes and endDateTimes
  handleDateChange(event, date, isEndDate) {
    let self = this;
    let errors = "";
    let parameterName = "selected" + (isEndDate ? "End" : "Start") + "DateTime";
    let newDate = moment(this.state[parameterName])
      .set({
        "year": date.getFullYear(),
        "month": date.getMonth(),
        "date": date.getDate()
      });

    // If we're working with the start date, ensure it can't exceed the enddate
    if(!isEndDate){

      if(newDate.isAfter(moment(this.state.selectedEndDateTime), "day")){
        // Handle Error Here
        errors = "You can't plan backwards in time.";
        newDate = moment(this.state.selectedStartDateTime);

      }

    }
    self.setState({
      [parameterName]: newDate.toDate(),
      errors
    });
  }

  handleTimeChange(event, time, isEndTime) {
    let self = this;
    let stateUpdate = {};

    const paramString = (isEndTime ? "End" : "Start");

    // Build whichever 'time' component called this function into a parametername
    const parameterName = "selected" + paramString + "DateTime";

    let selectedEndDateTime = moment(this.state.selectedEndDateTime);
    let selectedStartDateTime = moment(this.state.selectedStartDateTime);

    // Build the dateTime (Or rather, JUST the time concatenated into a moment())
    // MaterialUI handles times as date objects, so build js Date() data into a moment()
    let timeJSON = {hour: time.getHours(), minute: time.getMinutes(), second:0, millisecond:0};
    let dateTime = null;
    // Determine data to validate by
    if(isEndTime){

      dateTime = moment(selectedEndDateTime).set(timeJSON);

    }else{

      dateTime = moment(selectedStartDateTime).set(timeJSON);

    }

    stateUpdate = {[parameterName]: dateTime.toDate()};

    if(selectedEndDateTime.isSame(selectedStartDateTime, "day")){

      if(selectedStartDateTime.isAfter(dateTime) || selectedStartDateTime.isSame(dateTime)){

        // Handle Error Here
        stateUpdate[parameterName] = emptyDateTimes[paramString.toLowerCase()+"DateTime"];
        stateUpdate.errors = "You cannot plan backwards in time.";

      }

    }

    self.setState(stateUpdate);

  }

  handlePlanDetailsChange(event, details) {
    let self = this;
    self.setState({"planDetails": details})
  }

  componentWillMount(){
    let self = this;
    queries.getPlans()
    .then((events) => {
      self.setState({events})
    })
    .catch((err) => {
      console.log(err);
    })

  }

  render() {
    return (
      <DayPlanner
          addPlan={this.addPlan.bind(this)}
          selectedStartDateTime={this.state.selectedStartDateTime}
          selectedEndDateTime={this.state.selectedEndDateTime}
          handleTimeChange={this.handleTimeChange.bind(this)}
          handleDateChange={this.handleDateChange.bind(this)}
          handlePlanDetailsChange={this.handlePlanDetailsChange.bind(this)}
          planDetails={this.state.planDetails}
          events={this.state.events}
        />
    );

  }

}

export default DayPlannerPage;
