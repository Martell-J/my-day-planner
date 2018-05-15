// Following Start Up Guide
// SEE: https://medium.com/@patriciolpezjuri/using-create-react-app-with-react-router-express-js-8fa658bf892d

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// For when we expand to a universal app (With HMR)
import createStore from "./store/createstore";

const { store, persistor } = createStore();

ReactDOM.render(
  <App store={store} persistor={persistor} />,
  document.getElementById("root")
);
