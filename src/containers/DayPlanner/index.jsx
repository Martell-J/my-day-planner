import React, { Component } from "react";
import Axios from "axios";
import DayPlanner from "../../components/DayPlanner";

class DayPlannerPage extends Component {

  /*
   * Class constructor.
   */
  constructor(props, context) {

    super(props, context);

    this.state = {
      "selectedDate": null,
      "selectedTime": null,
      "selectedDurationMinutes": null,
      "selectedDurationHours": null,
      "planDetails": null
    }

  }

  addPlan() {
    let date = new Date().toISOString();
    /*
    Axios.post('/db/addplan', {
      "plan_datetime": date,
      "plan_details": "Do some cool stuff"
    })
    .then((result) =>  {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
    */
    console.log(this.state);
  }

  handleDateChange(event, date) {
    let self = this;
    self.setState({"selectedDate": date})
  }

  handleTimeChange(event, time) {
    let self = this;

    let date = new Date(this.state.selectedDate);

    date.setHours(time.getHours());
    date.setMinutes(time.getMinutes());

    self.setState({"selectedTime": time})
  }

  handlePlanDetailsChange(event, details) {
    console.log(details)
    let self = this;
    self.setState({"planDetails": details})
  }

  handleDurationMinuteChange(event, minutes) {
    console.log(minutes)
  }

  handleDurationHourChange(event, hours) {
    console.log(hours)
  }

  render() {

    return (
      <DayPlanner
          addPlan={this.addPlan.bind(this)}
          handleDateChange={this.handleDateChange.bind(this)}
          handleTimeChange={this.handleTimeChange.bind(this)}
          handlePlanDetailsChange={this.handlePlanDetailsChange.bind(this)}
          handleDurationMinuteChange={this.handleDurationMinuteChange.bind(this)}
          handleDurationHourChange={this.handleDurationHourChange.bind(this)}
        />
    );

  }

}

export default DayPlannerPage;
