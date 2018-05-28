import React, { Component } from "react";
import Header from "../../components/Common/Header";
import PropTypes from "prop-types";
import { logoutUser } from "../../store/actions/authentication";
import FormDialogPage from "./FormDialogPage";
import LoginPage from "../Authentication/LoginPage";

class HeaderPage extends Component {

  constructor(props) {

    super(props);

    this.state = {
      "menuAnchor": null,
    };

  }

  onToggleMenu(event) {

    // If the anchor exists, it's showing.
    this.setState({
      "menuAnchor": this.state.menuAnchor ? null : event.currentTarget,
    });

  }

  onOpenDisplayMessage(message, type = "danger", cb = null) {

    this.props.onOpenDisplayMessage(message, type, cb);

  }

  onGenerateDialog(element) {

    this.props.onGenerateDialog(element);

  }

  logoutUser() {

    const self = this;
    self.props.dispatch(logoutUser());

    self.onOpenDisplayMessage("You have successfully logged out!", "success", () => {

      self.props.history.push("/");

    });

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
        menuAnchor={this.state.menuAnchor}
        onToggleMenu={this.onToggleMenu.bind(this)}
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
