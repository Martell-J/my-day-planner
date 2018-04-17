import React, { Component } from "react";
import HeaderPage from "../../containers/Common/HeaderPage.jsx";
import PropTypes from "prop-types";
import "./style.css";

class Layout extends Component {

  render() {

    return (
      <div className="base">
        <HeaderPage/>
        <div className="base-outline-container">
          <div className="base-inner-container">
            { this.props.children }
          </div>
        </div>
      </div>
    );

  }

}

Layout.propTypes = {
  "children": PropTypes.object.isRequired,
};


export default Layout;
