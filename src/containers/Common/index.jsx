import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";

import Layout from "../../components/Common";

class LayoutPage extends React.Component {

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

  componentWillReceiveProps(nextProps) {

    this.setState({
      "authentication": nextProps.authentication,
      "rehydrate": nextProps.rehydrate,
    });

  }

  render() {

    if (this.state.rehydrate.isRehydrated) {

      // Whitelist items to pass down to the child
      const includeFromState = [ "authentication", "history", "location", "match", "rehydrate" ];

      const stateKeys = Object.keys(this.state);

      const reducedState = {};

      stateKeys.forEach((key) => {

        if (~includeFromState.findIndex((i) => i === key)) {

          reducedState[key] = this.state[key];

        }

      });

      //TODO: fix this not passing down state.
      const childrenWithProps = React.Children.map(this.props.children, (child) => {

        // Clone element with props
        return React.cloneElement(child, { ...reducedState });

      });

      // Render once all dispatched requests complete
      return <Layout { ...{ ...reducedState, "children": childrenWithProps } } />;

    }

    return false;

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
