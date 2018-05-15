import React from "react";

import Layout from "./containers/Common";
import Home from "./components/Home";
import DayPlannerPage from "./containers/DayPlanner";
import NotFound from "./components/NotFound";
import LoginPage from "./containers/Authentication/LoginPage";

import { BrowserRouter as Router, Route } from "react-router-dom";

const Routes = () =>
  <Router>
    <Layout>
      <Route exact path="/" componentToRender={Home} />
      <Route path="/dayplanner" componentToRender={DayPlannerPage} />
      <Route path="/login" componentToRender={LoginPage}/>
      <Route component={NotFound}/>
    </Layout>
  </Router>;

export default Routes;
