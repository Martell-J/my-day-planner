// Following Start Up Guide
// SEE: https://medium.com/@patriciolpezjuri/using-create-react-app-with-react-router-express-js-8fa658bf892d
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import createStore from "./store/createstore";
import blue from "@material-ui/core/colors/blue";
import deepPurple from "@material-ui/core/colors/deepPurple";

import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

/*
  import "./handlers/requestHandler.js";

  <script>
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = function () {}
  </script>
*/

const { store, persistor } = createStore();

const theme = createMuiTheme({
  "palette": {
    "primary": blue,
    "secondary": deepPurple,
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <App store={store} persistor={persistor} />
    </MuiPickersUtilsProvider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
