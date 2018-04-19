import React, { Component } from "react";
import Header from "../../components/Common/Header";
import PropTypes from "prop-types";

class HeaderPage extends Component {

  /*
   * Class constructor.
   */
  constructor(props) {

    super(props);

    this.state = {
      "history": props.history || {},
      "authentication": props.authentication || {},
    };

  }

  render() {

    return (
      <Header {...this.state} />
    );

  }

}

HeaderPage.propTypes = {
  "history": PropTypes.object.isRequired,
  "authentication": PropTypes.object.isRequired,
};

export default HeaderPage;
