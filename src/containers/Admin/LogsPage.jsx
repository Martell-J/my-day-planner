import React, { Component } from "react";
import Logs from "../../components/Admin/Logs";
import PropTypes from "prop-types";
import { isUserValid } from "../../helpers/auth";

const MINIMUM_VALID_ROLE = "admin";

class LogsPage extends Component {

  /*
   * Class constructor.
   */
  constructor(props) {

    super(props);

  }

  componentWillMount() {

    if (!isUserValid(this.props.authentication, MINIMUM_VALID_ROLE)) {

      this.props.history.push("/");

    }

  }

  render() {

    return (
      <Logs
      />
    );

  }

}

LogsPage.propTypes = {
  "authentication": PropTypes.object.isRequired,
  "history": PropTypes.object.isRequired,
};

export default LogsPage;
