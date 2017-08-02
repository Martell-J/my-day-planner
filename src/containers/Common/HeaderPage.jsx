import React, { Component } from "react";
import Header from "../../components/Common/Header";

class HeaderPage extends Component {

  // In-case we end up programatically setting links based on an auth status...
  // Render a smart component

  render() {

    return (
      <Header/>
    );

  }

}

export default HeaderPage;
