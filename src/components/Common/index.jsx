import React from "react";
import HeaderPage from "../../containers/Common/HeaderPage.jsx";
import { Switch } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.css";

const Layout = ({ history, childrenWithProps, authentication }) => {

  return (
    <div className="base">
      <HeaderPage history={history} authentication={authentication} />
      <div className="base-outline-container">
        <div className="base-inner-container">
          <Switch>
            {childrenWithProps}
          </Switch>
        </div>
      </div>
    </div>
  );

};

Layout.propTypes = {
  "childrenWithProps": PropTypes.array.isRequired,
  "history": PropTypes.object.isRequired,
  "authentication": PropTypes.object.isRequired,
};


export default Layout;
