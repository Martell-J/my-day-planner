import React, { Component } from "react";
import Header from "../../components/Common/Header";

class HeaderPage extends Component {

  /*
   * Class constructor.
   */
  constructor(props) {

    super(props);

    this.state = {
    };

  }

  // Check authorization here.
  componentWillMount() {

    let self = this;



  }

  render() {

    return (
      <Header/>
    );

  }

}

export default HeaderPage;
