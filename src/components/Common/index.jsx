import React from "react";
import HeaderPage from "../../containers/Common/HeaderPage.jsx";
import PropTypes from "prop-types";
import "./style.css";

const Layout = ({ history, children, authentication }) => {

  return (
    <div className="base">
      <HeaderPage history={history} authentication={authentication} />
      <div className="base-outline-container">
        <div className="base-inner-container">
          { children }
        </div>
      </div>
    </div>
  );

};

Layout.propTypes = {
  "children": PropTypes.array.isRequired,
  "history": PropTypes.object.isRequired,
  "authentication": PropTypes.object.isRequired,
};


export default Layout;
