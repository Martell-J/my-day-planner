import React, { Component } from "react";
import Login from "../../components/Authentication/Login";
// import PropTypes from "prop-types";
const { loginUser } = require("../../store/actions/authentication.js");

class LoginPage extends Component {

  /*
   * Class constructor.
   */
  constructor(props) {

    super(props);

    console.log(props)

    this.state = {
      "authentication": this.props.authentication || {},
      "history": this.props.history || {},
    };

  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

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
      <Login
        {...this.state}
        onSubmitLogin={this.onSubmitLogin.bind(this)}
      />
    );

  }

}

export default LoginPage;
