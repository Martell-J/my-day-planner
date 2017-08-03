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
      "planDetails": null,
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
    console.log(date);
    let self = this;
    self.setState({"selectedDate": date})
  }

  handleTimeChange(event, time) {
    console.log(time)
    let self = this;
    self.setState({"selectedTime": time})
  }

  handlePlanDetailsChange(event, details) {
    console.log(details)
    let self = this;
    self.setState({"planDetails": details})
  }

  render() {

    return (
      <DayPlanner
          addPlan={this.addPlan.bind(this)}
          handleDateChange={this.handleDateChange.bind(this)}
          handleTimeChange={this.handleTimeChange.bind(this)}
          handlePlanDetailsChange={this.handlePlanDetailsChange.bind(this)}
        />
    );

  }

}

export default DayPlannerPage;
