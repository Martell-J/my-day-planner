import React, { Component } from 'react';
import HeaderPage from "../../containers/Common/HeaderPage.jsx";
import './style.css';

class Layout extends Component {
  render() {
    return (
      <div className="base">
        <HeaderPage/>
        <div className="base-outline-container">
          <div className="base-inner-container">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
