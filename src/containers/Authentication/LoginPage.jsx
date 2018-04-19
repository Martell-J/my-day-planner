import React, { Component } from "react";
import Login from "../../components/Authentication/Login";

class LoginPage extends Component {

  /*
   * Class constructor.
   */
  constructor(props) {

    super(props);

    this.state = {
    };

  }

  render() {

    return (
      <Login {...this.state} />
    );

  }

}

export default LoginPage;
