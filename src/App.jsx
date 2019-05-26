import React from "react";

// Migration from React Router 3 to 4
// See: https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf

import "./index.css";
import Routes from "./Routes";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

// Implement browserrouter and switch for route management, implement a 404 page
// <Route path="/login" component={LoginPage} />

const App = ({ store, persistor }) =>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Routes/>
    </PersistGate>
  </Provider>;

export default App;
