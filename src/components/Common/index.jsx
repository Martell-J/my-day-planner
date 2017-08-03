import React, { Component } from 'react';
import HeaderPage from "../../containers/Common/HeaderPage.jsx";
import Footer from "./Footer";

class Layout extends Component {
  render() {
    return (
      <div>
        <HeaderPage/>
        <div style={{
            "minHeight": "100%",
            "textAlign": "center"
          }} >
          <div style={{
              "position": "relative",
              "marginLeft": "100px",
              "marginRight": "100px",
              "marginTop": "30px",
              "display": "block",
              "overflowY": "auto",
            }}>
            {this.props.children}
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Layout;
