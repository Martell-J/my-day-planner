import React, { Component } from "react";
import DayPlanner from "../../components/DayPlanner";

class DayPlannerPage extends Component {

  /*
   * Class constructor.
   */
  constructor(props, context) {

    super(props, context);

    this.state = {
      "test": 1
    };

  }

  render() {

    return (
      <DayPlanner
          test={this.state.test}
        />
    );

  }

}

export default DayPlannerPage;
