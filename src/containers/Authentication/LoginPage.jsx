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
      "isSubmitted": false,
      "data": {
        "username": "",
        "password": "",
      },
    };

  }

  componentWillMount() {

    if (this.state.authentication.isAuthenticated) {

      this.props.history.push("/");

    }

  }

  onInputChange(event) {

    const { name, value } = event.target;

    const { data } = this.state;

    data[name] = value;

    this.setState({ data, "isSubmitted": false });

  }

  onSubmit(event) {

    event.preventDefault();

    const os = () =>
      new Promise((resolve, reject) => {

        this.setState({ "isSubmitted": true }, () => {

          const { username, password } = this.state.data;

          if (username && password) {

            // Submit a request using axios to the API (dispatch login request)
            this.props.dispatch(loginUser(username, password))
              .then(() => {

                return resolve("You have successfully logged in!");

              })
              .catch((err) => {

                let errorMessage = err.message ? err.message : err.error ? err.error.message : "";

                return reject(errorMessage);

              });

          }

        });

      });

    this.props.onSubmit(os) || os();


  }

  render() {

    return (
      <LoginForm
        user={this.state.data}
        authentication={this.state.authentication}
        onSubmit={this.onSubmit.bind(this)}
        isSubmitted={this.state.isSubmitted}
        onInputChange={this.onInputChange.bind(this)}
      />
    );

  }

}

LoginPage.propTypes = {
  "authentication": PropTypes.object.isRequired,
  "history": PropTypes.object.isRequired,
  "dispatch": PropTypes.func.isRequired,
  "onSubmit": PropTypes.optionalFunc,
  "onOpenDisplayMessage": PropTypes.func.isRequired,
};

export default LoginPage;
