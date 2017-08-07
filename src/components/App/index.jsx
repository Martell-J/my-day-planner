import React, { Component } from 'react';
import './style.css';
import { Card, CardHeader, CardMedia} from "material-ui";
let navigationExample = '/media/navexample.webm';
let dayPlannerExample = '/media/rmrecord.webm';

// Application root (Home page)
class App extends Component {
  render() {
    return (
      <div className="App">
        <Card className="card-outline">
          <CardHeader
            title="My Day Planner"
            subtitle="Landing Page"
            className="card-header"
          />
        <CardMedia className="card-content">
            <h3>What is it?</h3>
            <p style={{fontSize: "15px"}}>My Day Planner is an example application demonstrating the implementation
            of various react packages to achieve a basic-functioning 'day planner', utilizing
            a locally-hosted database which refreshes on server run-time. The 'Day Planner' page utilizes basic validation
            and the implementation of promises for standard error-handling, and proper-order of code-execution. Server-side
            querying is handled via the Axios API to establish communication between the client and the server.</p>

          <h3>Navigation</h3>
            <p>The video below shows operation of the app's navigation feature</p>
              <div className="video-container">

                <video width="100%" height="100%" autoPlay={true} controls={true} loop={true}>
                  <source type="video/webm" src={navigationExample}/>
                </video>
              </div>
          <h3>Example Usage</h3>
            <p>The video below demonstrates usage of the Day Planner</p>
            <div className="video-container">

              <video width="100%" height="100%" autoPlay={true} controls={true} loop={true}>
                <source type="video/webm" src={dayPlannerExample}/>
              </video>
            </div>
          <h3>Notes:</h3>
          <ul>
            <li>
              <p>If you cannot operate the DayPlanner page, you may not have MySQL properly installed.</p>
            </li>
            <li>
              <p>This example app is in a constant-state of development. As such, bugs are expected, and examples/operability may change
              at unexpected intervals.</p>
            </li>
            <li>
              <p>This example app may be expanded into a list of example feature apps, in order to demonstrate proficiency and understanding
              of other package implementations with react. When this occurs, the repository handling this data may purged.</p>
            </li>
            <li>
              <p>All styled-components (Header, Cards, Buttons etc.) are generated through the implementation of Material-UI (See: <a href="https://github.com/callemall/material-ui">Their Repository</a> ). This example
              heavily relies on the consistency in functionality of these components (Date Pickers, Text Entry Fields), and related packages
              as well (BigCalendar, Sequelize, Axios). If any bugs are found related to package changes after example updates, feel free
              to open an issue request on the repository containing this project.</p>
            </li>
          </ul>
          </CardMedia>
        </Card>
      </div>
    );
  }
}

export default App;
