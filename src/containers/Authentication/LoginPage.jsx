import React, { Component } from "react";
import LoginForm from "../../components/Authentication/LoginForm";
import PropTypes from "prop-types";
const { loginUser } = require("../../store/actions/authentication.js");

class LoginPage extends Component {

  /*
   * Class constructor.
   */
  constructor(props) {

    super(props);

    this.state = {
      "authentication": this.props.authentication || {},
      "data": {
        "username": null,
        "password": null,
        "passwordConfirmation": null,
      },
    };

  }

  componentWillMount() {

    if (this.state.authentication.isAuthenticated) {

      this.props.history.push("/");

    }

  }

  onSubmitLogin(username, password) {

    // Submit a request using axios to the API (dispatch login request)
    loginUser(username, password)
      .then((result) => {

        console.log(result);

      })
      .catch((err) => {

        console.log(err);

      });

  }

  render() {

    return (
      <LoginForm
        {...this.state}
        onSubmitLogin={this.onSubmitLogin.bind(this)}
      />
    );

  }

}

LoginPage.propTypes = {
  "authentication": PropTypes.object.isRequired,
  "history": PropTypes.object.isRequired,
};

export default LoginPage;
