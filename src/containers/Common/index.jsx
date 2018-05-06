import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";

import Layout from "../../components/Common";

const DEFAULT_DISPLAY_MESSAGE_TIMEOUT = 3000;

class LayoutPage extends React.Component {

  /*
   * Class constructor.
   */
  constructor(props, context) {

    super(props, context);

    this.state = {
      "dialog": null,
      "displayMessage": "",
      "displayMessageType": "danger",
      "displayMessageRedirect": null,
      "displayMessageTimeout": DEFAULT_DISPLAY_MESSAGE_TIMEOUT,
    };

  }

  onOpenDisplayMessage(message, type = "danger", redirectMethod = null, hideAfterMS = DEFAULT_DISPLAY_MESSAGE_TIMEOUT) {

    this.setState({
      "displayMessage": message,
      "displayMessageType": type,
      "displayMessageRedirect": redirectMethod,
      "displayMessageTimeout": hideAfterMS,
    });

  }

  onCloseDisplayMessage() {

    const { displayMessageRedirect } = this.state;

    if (displayMessageRedirect) {

      this.setState({
        "displayMessage": "",
        "displayMessageRedirect": null,
        "displayMessageTimeout": DEFAULT_DISPLAY_MESSAGE_TIMEOUT },
      displayMessageRedirect);

    } else {

      this.setState({
        "displayMessage": "",
        "displayMessageTimeout": DEFAULT_DISPLAY_MESSAGE_TIMEOUT,
      });

    }

  }

  // Unmounts any existing dialogs, then mounts the one passed
  onGenerateDialog(element) {

    this.setState({
      "dialog": null,
    }, () => {

      this.setState({ "dialog": element });

    });

  }

  render() {

    const { isRehydrated } = this.props.rehydrate;

    if (isRehydrated) {

      // Whitelist items to pass down to the child
      const includeFromState = [ "displayMessage", "displayMessageType", "displayMessageRedirect", "displayMessageTimeout", "dialog" ];

      const includeFromProps = [ "authentication", "history", "location", "match", "rehydrate", "dispatch" ];

      const stateKeys = Object.keys(this.state);

      const propKeys = Object.keys(this.props);

      const reducedState = {};

      const extraProps = {};

      stateKeys.forEach((key) => {

        if (~includeFromState.findIndex((i) => i === key)) {

          reducedState[key] = this.state[key];

        }

      });

      propKeys.forEach((key) => {

        if (~includeFromProps.findIndex((i) => i === key)) {

          extraProps[key] = this.props[key];

        }

      });

      // Override the render of each Route component to feature props from both
      // route as well as the reducedState determined in this component
      const childrenWithProps = React.Children.map(this.props.children, (rChild) =>
        React.cloneElement(rChild, {
          "render": (routeProps) =>
            <rChild.props.componentToRender
              { ...{ ...extraProps, ...reducedState, ...routeProps } }
              onOpenDisplayMessage={this.onOpenDisplayMessage.bind(this)}
            />,
        }));

      // Render once all dispatched requests complete
      return <Layout
        { ...{ ...extraProps, ...reducedState, childrenWithProps } }
        onOpenDisplayMessage={this.onOpenDisplayMessage.bind(this)}
        onCloseDisplayMessage={this.onCloseDisplayMessage.bind(this)}
        onGenerateDialog={this.onGenerateDialog.bind(this)}
      />;

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
  "children": PropTypes.array.isRequired,
  "history": PropTypes.object.isRequired,
  "location": PropTypes.object.isRequired,
  "match": PropTypes.object.isRequired,
  "rehydrate": PropTypes.object.isRequired,
  "dispatch": PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps)(LayoutPage));
