import React, { Component } from "react";
import DayPlanner from "../../components/DayPlanner";
import moment from "moment";

const { queries } = require("../../helpers/queries.js");

// Utilizing the above JSON items, initialize two dates with parameters relative to
// the date 'type' (Start/end)
const getEmptyDateTimes = {
  "getStartDateTime": () => moment(new Date()).set({ "minute": 0, "second": 0, "millisecond": 0 }).toDate(),
  "getEndDateTime": () => moment(new Date()).set({ "minute": 0, "second": 0, "millisecond": 0 }).add(2, "hours").toDate(),
};

class DayPlannerPage extends Component {

  /*
   * Class constructor.
   */
  constructor(props, context) {

    super(props, context);

    this.state = {
      "selectedStartDateTime": getEmptyDateTimes.getStartDateTime(),
      "selectedEndDateTime": getEmptyDateTimes.getEndDateTime(),
      "planDetails": "",
      "errors": "",
      "events": [],
    };

  }

  // Before the component mounts, initialize the 'events'
  componentWillMount() {

    let self = this;

    if (!self.props.authentication.isAuthenticated) {

      self.props.history.push("/");

    }

    queries.getPlans()
      .then((events) => {

        self.setState({ events });

      });

  }

  componentWillReceiveProps(nextProps) {

    this.setState({
      ...nextProps,
    });

  }

  // To be fired when the user clicks the 'add plan' button in the respective component
  // Goes through validation, if successful--insert a record
  addPlan() {

    let self = this;

    // Build post-data to be interpreted by the DB
    let postJSON = {
      "plan_start_datetime": moment(this.state.selectedStartDateTime),
      "plan_end_datetime": moment(this.state.selectedEndDateTime),
      "plan_details": this.state.planDetails,
    };

    // Check if the dates currently-set conflict with an existing plan
    if (queries.validators.isConflictingPlan(this.state.events, postJSON)) {

      self.setState({ "errors": "Your plan conflicts with an existing plan!" });

    // Check if the user has set a title/detail line for the plan

    } else if (this.state.planDetails === "") {

      self.setState({ "errors": "Please enter some plan details." });

    } else {

      // When validation passes, format each date item in the post-data JSON Object
      // as a date-string which can be interpreted by MySQL
      Object.keys(postJSON).forEach((key) => {

        if (postJSON[key] instanceof Date) {

          postJSON[key] = postJSON[key].format("YYYY/MM/DD HH:mm:ss");

        }

      });

      // Insert the plan using the relevant data, and update the events to reflect
      // the insertion
      queries.insertPlan(postJSON)
        .then(queries.getPlans)
        .then((events) => {

          self.setState({ events });

        });

    }


  }

  // Handles changes for startDateTimes and endDateTimes
  handleDateChange(date, isEndDate) {

    let self = this;
    let newState = this.state;
    let errors = "";

    // Clone the passed object
    let newDate = moment(date);

    const { selectedStartDateTime, selectedEndDateTime } = newState;

    // Since we're handling validation and managing two incredibly similar controls,
    // we can simply determine the 'source' date type, and the 'other' date type
    const parameterName = "selected" + (isEndDate ? "End" : "Start") + "DateTime";
    const otherParameterName = "selected" + (!isEndDate ? "End" : "Start") + "DateTime";

    // If we're working with the start date, ensure it can't exceed the enddate
    if (!isEndDate && date.isAfter(moment(selectedEndDateTime), "day")) {

      errors = "You can't plan backwards in time.";
      newDate = moment(selectedStartDateTime);

    } else if (isEndDate && date.isBefore(moment(selectedStartDateTime), "day")) {

      errors = "You can't plan backwards in time.";
      newDate = moment(selectedEndDateTime);

    }

    newState[parameterName] = newDate.toDate();
    newState.errors = errors;

    // Reset the times if they set the date to the 'same day' to negate time conflictions
    // Compares the 'opposite' date parameter to the one we're currently changing for equality.
    // If they are BOTH the same date, negate the user's capability to encroach on conflicting times
    if (moment(this.state[otherParameterName]).isSame(newDate, "day")) {

      // confirm via time as well.
      const MINIMUM_MINUTES_AHEAD = 15;

      const baseStart = moment(newState.selectedStartDateTime).add(MINIMUM_MINUTES_AHEAD, "minutes");
      const baseEnd = moment(newState.selectedEndDateTime);

      // If we're not at-least 15 minutes ahead of the start time, set it to be that way. (Min)
      if (!baseStart.isSame(baseEnd, "minute") && baseStart.isAfter(baseEnd, "minute")) {

        newState.selectedStartDateTime = moment(newState.selectedStartDateTime).toDate();
        newState.selectedEndDateTime = moment(newState.selectedStartDateTime).add(MINIMUM_MINUTES_AHEAD, "minutes").toDate();

      }

    }

    self.setState(newState);

  }

  handleTimeChange(time, isEndTime) {

    let self = this;
    let stateUpdate = {};

    const paramString = isEndTime ? "End" : "Start";

    // Build whichever 'time' component called this function into a parametername
    const parameterName = "selected" + paramString + "DateTime";

    let selectedEndDateTime = moment(this.state.selectedEndDateTime);
    let selectedStartDateTime = moment(this.state.selectedStartDateTime);

    // Build the dateTime (Or rather, JUST the time concatenated into a moment())
    // MaterialUI handles times as date objects, so build js Date() data into a moment()
    let timeJSON = { "hour": time.hours(), "minute": time.minutes(), "second": 0, "millisecond": 0 };
    let dateTime = null;

    // Determine data to validate by
    if (isEndTime) {

      dateTime = moment(selectedEndDateTime).set(timeJSON);

    } else {

      dateTime = moment(selectedStartDateTime).set(timeJSON);

    }

    stateUpdate = { [parameterName]: dateTime.toDate() };

    // If it's the same date...
    if (selectedEndDateTime.isSame(selectedStartDateTime, "day")) {

      // If we're in the end times...
      if (isEndTime) {

        // Check to see if this 'end time' comes before the start date, or is the exact same time overall
        if (selectedStartDateTime.isAfter(dateTime) || selectedStartDateTime.isSame(dateTime)) {

          // If it's invalid, set the time to its default.
          stateUpdate[parameterName] = getEmptyDateTimes["get" + paramString + "DateTime"]();
          stateUpdate.errors = "You cannot plan backwards in time.";

        }

      // Check to see if this 'end time' comes before the start date, or is the exact same time overall

      } else if (selectedEndDateTime.isBefore(dateTime) || selectedEndDateTime.isSame(dateTime)) {

        // If it's invalid, set the time to its default.
        stateUpdate[parameterName] = getEmptyDateTimes["get" + paramString + "DateTime"]();
        stateUpdate.errors = "You cannot plan backwards in time.";

      }

    }

    self.setState(stateUpdate);

  }

  handlePlanDetailsChange(event) {

    const { value } = event.target;

    let self = this;
    self.setState({ "planDetails": value });

  }

  // When the snackbar is dismissed, wipe the errors.
  onErrorDismissal() {

    this.setState({ "errors": "" });

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
        errors={this.state.errors}
        onErrorDismissal={this.onErrorDismissal.bind(this)}
      />
    );

  }

}

export default DayPlannerPage;
