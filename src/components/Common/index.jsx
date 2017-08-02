import React, { Component } from 'react';
import HeaderPage from "../../containers/Common/HeaderPage.jsx";
import Footer from "./Footer";

class Layout extends Component {
  render() {
    return (
      <div>
        <HeaderPage/>
        {this.props.children}
        <Footer/>
      </div>
    );
  }
}

export default Layout;
