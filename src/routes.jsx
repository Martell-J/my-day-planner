import React from "react";

// Migration from React Router 3 to 4
// See: https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "./components/App";
import DayPlannerPage from "./containers/DayPlanner";
import NotFound from "./components/NotFound";
import Layout from "./containers/Common";
import LoginPage from "./containers/Authentication/LoginPage";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

import createStore from "./store/createstore";

const { store, persistor } = createStore();

// Implement browserrouter and switch for route management, implement a 404 page
// <Route path="/login" component={LoginPage} />
const Routes = () =>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/dayplanner" component={DayPlannerPage} />
            <Route path="/login" component={LoginPage}/>
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    </PersistGate>
  </Provider>;

export default Routes;
