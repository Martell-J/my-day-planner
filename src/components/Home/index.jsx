import React, { Component } from "react";
import "./style.css";
import { Paper, Grid, Typography } from "@material-ui/core";
let navigationExample = "/media/navexample.webm";
let dayPlannerExample = "/media/rmrecord.webm";

// Application root (Home page)
class Home extends Component {

  render() {

    return (
      <Paper style={{ "padding": "16px" }} >
        <Typography align="center" variant="h4" component="h1">
          My Day Planner
        </Typography>
        <Typography align="center" variant="subtitle1" component="h4">
          Landing Page
        </Typography>
        <br/>
        <Typography align="center" variant="h5" component="h3">
          What is it?
        </Typography>
        <Typography component="p">
          &#39;My Day Planner&#39; is an example application demonstrating the implementation
          of various react packages to achieve a basic-functioning &#39;day planner&#39;, utilizing
          a remotely-hosted database accessed via an API which refreshes on API-server run-time.
          It features JSON Web Token (JWT)-based authentication features accessed via a modal popover format, access rights restrictions,
          comprehensive and detailed response messages for errors, successful operations, and simple notices.
          The &#39;Day Planner&#39; page utilizes basic validation, the implementation of promises for standard error-handling and proper-order of code-execution.
          Server-side querying is handled via the Axios API to establish communication between the client and the server.
          The API is standardized to return customized Errors, ensuring that there&#39;s no data-leaking from the
          api to the user (E.G: Server-side stack traces which may expose sensitive information such-as file structures).
          Each error is logged to an external NOSQL database, with user-information tied to the operation that caused it. This
          helps in narrowing down errors and allowing the developer to easily reproduce them.
        </Typography>
        <br/>
        <Grid container>
          <Grid container item xl={6} xs={12}>
            <Grid item xl={12} xs={12}>
              <Typography align="center" variant="h6">
                Navigation
              </Typography>
              <Typography component="p">
                The video below shows operation of the app&#39;s navigation feature
              </Typography>
            </Grid>
            <Grid item xl={12} xs={12}>
              <video controls={true} loop={true}>
                <source type="video/webm" src={navigationExample}/>
              </video>
            </Grid>
          </Grid>
          <Grid container item xl={6} xs={12}>
            <Grid item xl={12} xs={12}>
              <Typography align="center" variant="h6">
                Example Usage
              </Typography>
              <Typography component="p">
                The video below demonstrates usage of the Day Planner
              </Typography>
            </Grid>
            <Grid item xl={12} xs={12}>
              <video controls={true} loop={true}>
                <source type="video/webm" src={dayPlannerExample}/>
              </video>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid container alignItems="center" item xl={12}>
            <Grid item xl xs/>
            <Grid item xl={6} xs={12}>
              {/* I am not a designer... */}
              <Typography align="center" variant="h6">
                Notes:
              </Typography>
              <ul>
                <li>
                  If you cannot operate the DayPlanner page, you may not have MySQL properly installed.
                </li>
                <li>
                  This example app is in a constant-state of development. As such, bugs are expected, and examples/operability may change
                  at unexpected intervals.
                </li>
                <li>
                  This example app may be expanded into a list of example feature apps, in order to demonstrate proficiency and understanding
                  of other package implementations with react. When this occurs, the repository handling this data may purged.
                </li>
                <li>
                  All styled-components (Header, Cards, Buttons etc.) are generated through the implementation of @material-ui/core (See: <a href="https://github.com/callemall/@material-ui/core">Their Repository</a> ). This example
                  heavily relies on the consistency in functionality of these components (Date Pickers, Text Entry Fields), and related packages
                  as well (BigCalendar, Sequelize, Axios). If any bugs are found related to package changes after example updates, feel free
                  to open an issue request on the repository containing this project.
                </li>
              </ul>
              <Typography align="center" variant="h6">
                A few more things...
              </Typography>
              <ul>
                <li>
                  The functionality of this repo now REQUIRES running the external my-day-planner-api repository (See: <a href="https://github.com/Martell-J/my-day-planner-api">That Repository</a> ). For everything
                    to operate smoothly, please run my-day-planner-api first, then build a production-version of this repo to allow cross-origin requests via a locally-running server. This can now be accomplished with
                    the script &#39;yarn dev-server&#39; (or npm run dev-server if you&#39;re not using yarn.)
                </li>
                <li>
                  Not everything in this repository is to be coded &#39;to spec&#39;, sometimes interesting ideas or features may be implmented simply for
                  learning purposes (or fun, because I&#39;m insane and enjoy this...).
                </li>
              </ul>
            </Grid>
            <Grid item xl xs/>
          </Grid>
        </Grid>
      </Paper>
    );

  }

}

export default Home;
