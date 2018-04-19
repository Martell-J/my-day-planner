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
      "rehydrate": props.rehydrate || {},
    };

  }

  render() {

    // Render once all dispatched requests complete
    return (
      this.state.rehydrate.isRehydrated ? <Layout {...this.state} /> : false
    );

  }

}

const mapStateToProps = (state) => {

  const { authentication, rehydrate } = state;

  return {
    authentication,
    rehydrate,
  };

};

LayoutPage.propTypes = {
  "authentication": PropTypes.object.isRequired,
  "children": PropTypes.object.isRequired,
  "history": PropTypes.object.isRequired,
  "location": PropTypes.object.isRequired,
  "match": PropTypes.object.isRequired,
  "rehydrate": PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps)(LayoutPage));
