import React from 'react';
// Migration from React Router 3 to 4
// See: https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import App from './components/App';
import DayPlannerPage from './containers/DayPlanner';
import NotFound from './components/NotFound';
import Layout from "./components/Common";

// Implement browserrouter and switch for route management, implement a 404 page
const Routes = () => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/dayplanner" component={DayPlannerPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  </Router>
);

export default Routes;
