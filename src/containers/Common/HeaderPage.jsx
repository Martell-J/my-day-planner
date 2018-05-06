import React, { Component } from "react";
import Header from "../../components/Common/Header";
import PropTypes from "prop-types";
import { logoutUser } from "../../store/actions/authentication";
import FormDialogPage from "./FormDialogPage";
import LoginPage from "../Authentication/LoginPage";

class HeaderPage extends Component {

  onOpenDisplayMessage(message, type = "danger") {

    this.props.onOpenDisplayMessage(message, type);

  }

  onGenerateDialog(element) {

    this.props.onGenerateDialog(element);

  }

  logoutUser() {

    const self = this;
    self.props.dispatch(logoutUser());

    this.onOpenDisplayMessage("You have successfully logged out!", "success");

  }

  overrideMenuItemCallback(value) {

    const self = this;

    // logic here.
    if (value === "/logout") {

      self.logoutUser();

    } else if (value === "/login") {

      // generate a modal
      self.onGenerateDialog(
        <FormDialogPage
          title="Login"
          isModal={false}
          openOnRender={true}
          onOpenDisplayMessage={this.onOpenDisplayMessage.bind(this)}
          subComponent={
            <LoginPage
              authentication={self.props.authentication}
              history={self.props.history}
              dispatch={self.props.dispatch}
              onOpenDisplayMessage={self.onOpenDisplayMessage.bind(this)}
            />
          }
        />
      );

    }

  }

  render() {

    const overridableMenuItems = [ "/logout", "/login" ];

    const { history, authentication } = this.props;

    return (
      <Header
        history={history}
        authentication={authentication}
        overridableMenuItems={overridableMenuItems}
        overrideMenuItemCallback={this.overrideMenuItemCallback.bind(this)}
      />
    );

  }

}

HeaderPage.propTypes = {
  "history": PropTypes.object.isRequired,
  "authentication": PropTypes.object.isRequired,
  "onOpenDisplayMessage": PropTypes.func.isRequired,
  "dispatch": PropTypes.func.isRequired,
  "onGenerateDialog": PropTypes.func.isRequired,
};

export default HeaderPage;
