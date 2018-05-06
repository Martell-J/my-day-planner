import React from "react";
import HeaderPage from "../../containers/Common/HeaderPage.jsx";
import { Switch } from "react-router-dom";
import { Snackbar } from "material-ui";
import PropTypes from "prop-types";
import "./style.css";

const Layout = ({ history, childrenWithProps, authentication,
  displayMessage, displayMessageType, onCloseDisplayMessage, onOpenDisplayMessage,
  displayMessageTimeout, onGenerateDialog, dialog, dispatch }) => {

  return (
    <div className="base">
      <HeaderPage history={history} authentication={authentication} dispatch={dispatch}
        onOpenDisplayMessage={onOpenDisplayMessage} onGenerateDialog={onGenerateDialog} />
      <div className="base-outline-container">
        <div className="base-inner-container">
          <Switch>
            {childrenWithProps}
          </Switch>
        </div>
      </div>
      {dialog ? dialog : false}
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
  "onOpenDisplayMessage": PropTypes.func.isRequired,
  "onCloseDisplayMessage": PropTypes.func.isRequired,
  "displayMessageTimeout": PropTypes.number.isRequired,
  "onGenerateDialog": PropTypes.func.isRequired,
  "dispatch": PropTypes.func.isRequired,
  "dialog": PropTypes.optionalNode,
};


export default Layout;
