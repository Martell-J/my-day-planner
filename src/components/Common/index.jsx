import React from "react";
import HeaderPage from "../../containers/Common/HeaderPage.jsx";
import PropTypes from "prop-types";
import "./style.css";

const Layout = ({ history, children }) => {

  return (
    <div className="base">
      <HeaderPage history={history} />
      <div className="base-outline-container">
        <div className="base-inner-container">
          { children }
        </div>
      </div>
    </div>
  );

};

Layout.propTypes = {
  "children": PropTypes.object.isRequired,
  "history": PropTypes.object.isRequired,
};


export default Layout;
