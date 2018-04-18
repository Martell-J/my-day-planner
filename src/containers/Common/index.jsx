import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";

import Layout from "../../components/Common";

class LayoutPage extends Component {

  /*
   * Class constructor.
   */
  constructor(props, context) {

    super(props, context);

    this.state = {
      "authentication": props.authentication || {},
      "children": props.children || {},
      "history": props.history || {},
      "location": props.location || {},
      "match": props.match || {},
    };

  }

  // Check authorization here.
  componentWillMount() {

    let self = this;

    console.log(self);

  }

  render() {

    return (
      <Layout {...this.state} />
    );

  }

}

const mapStateToProps = (state) => {

  const { authentication } = state;

  return {
    authentication,
  };

};

LayoutPage.propTypes = {
  "authentication": PropTypes.object.isRequired,
  "children": PropTypes.object.isRequired,
  "history": PropTypes.object.isRequired,
  "location": PropTypes.object.isRequired,
  "match": PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps)(LayoutPage));
