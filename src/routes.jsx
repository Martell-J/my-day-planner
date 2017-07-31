import React from 'react';
// Migration from React Router 3 to 4
// See: https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import App from './components/App';
import DayPlannerPage from './containers/DayPlanner';
import NotFound from './components/NotFound';

// Implement browserrouter and switch for route management, implement a 404 page
const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/dayplanner" component={DayPlannerPage} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
