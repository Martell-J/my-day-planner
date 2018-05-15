import React from "react";

// Migration from React Router 3 to 4
// See: https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf

import "./index.css";
import Routes from "./Routes";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

// Implement browserrouter and switch for route management, implement a 404 page
// <Route path="/login" component={LoginPage} />
injectTapEventPlugin();
const App = ({ store, persistor }) =>
  <MuiThemeProvider>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Routes/>
      </PersistGate>
    </Provider>
  </MuiThemeProvider>;

export default App;
