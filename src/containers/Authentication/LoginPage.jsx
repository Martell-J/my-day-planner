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
        "passwordConfirmation": "",
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

    this.setState({ "isSubmitted": true }, () => {

      const { username, password, passwordConfirmation } = this.state.data;

      if (username && password && password === passwordConfirmation) {

        // Submit a request using axios to the API (dispatch login request)
        this.props.dispatch(loginUser(username, password))
          .then((result) => {

            console.log(result);

          })
          .catch((err) => {

            console.log(err);

          });

      }

    });

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
};

export default LoginPage;
