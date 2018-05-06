import React from "react";
import HeaderPage from "../../containers/Common/HeaderPage.jsx";
import { Switch } from "react-router-dom";
import { Snackbar } from "material-ui";
import PropTypes from "prop-types";
import "./style.css";

const Layout = ({ history, childrenWithProps, authentication,
  displayMessage, displayMessageType, onCloseDisplayMessage, displayMessageTimeout }) => {

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
      <Snackbar
        open={displayMessage.length !== 0}
        message={displayMessage}
        autoHideDuration={displayMessageTimeout}
        onRequestClose={onCloseDisplayMessage}
        className={("notify " + displayMessageType)}
      />
    </div>
  );

};

Layout.propTypes = {
  "childrenWithProps": PropTypes.array.isRequired,
  "history": PropTypes.object.isRequired,
  "authentication": PropTypes.object.isRequired,
  "displayMessage": PropTypes.string.isRequired,
  "displayMessageType": PropTypes.string.isRequired,
  "onCloseDisplayMessage": PropTypes.func.isRequired,
  "displayMessageTimeout": PropTypes.number.isRequired,
};


export default Layout;
