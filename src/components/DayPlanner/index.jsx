import React from "react";
import { RaisedButton, DatePicker, TimePicker, TextField, Paper, Card, CardHeader, CardMedia} from "material-ui";
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import './style.css';
import "react-big-calendar/lib/css/react-big-calendar.css";
BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);
let allViews = Object.keys(BigCalendar.views).map(k => BigCalendar.views[k])


// Base DayPlanner example page
const DayPlanner = ({addPlan, handleDateChange, handleTimeChange, handlePlanDetailsChange,
                      handleDurationMinuteChange, handleDurationHourChange}) => {
  return (
    <div style={{"margin":"10px"}}>
      <Card className="card-outline" style={{"width": "100%", "padding": "15px"}}>
        <CardHeader
          title="Day Planner"
          subtitle="Build and view your plans"
          style={{"textAlign":"left"}}
        />
        <CardMedia>
          <div style={{"margin": "0 auto", "display": "table"}}>
            <div style={{"display": "table-cell", "position": "inherit", "width": "50%"}}>
              <TextField
                style={{"textAlign":"left"}}
                floatingLabelText="Plan Details"
                multiLine={true}
                onChange={handlePlanDetailsChange} />

              <DatePicker
                floatingLabelText="Select Date"
                mode="landscape"
                onChange={handleDateChange} />
              <TimePicker
                floatingLabelText="Select Time"
                onChange={handleTimeChange} />
              <Paper style={{width:"250px",margin: 10,textAlign: 'center',display: 'inline-block'}} zDepth={1} children={

                <div style={{"display":"inline", "margin": "0 auto", "maxWidth": "220px"}}>
                  <p style={{"display":"inline"}}>Duration: </p>
                  <TextField
                    style = {{width: 60, marginRight: "10px"}}
                    floatingLabelText="Hours"
                  />
                  <TextField
                    style = {{width: 60}}
                    floatingLabelText="Minutes"
                  />
                </div>
              }/>
              <br/>
              <RaisedButton
                label="Add a Plan"
                onTouchTap={addPlan} />
            </div>
            <div style={{"display": "table-cell", "position": "inherit", "width": "50%", "height": "100%"}}>
              <BigCalendar
                {...this.props}
                events={[new Date()]}
                views={allViews}
                defaultDate={new Date(2015, 3, 1)}
                style={{"height":"100%"}}
              />
            </div>
          </div>
        </CardMedia>
      </Card>


    </div>
  );
}

DayPlanner.PropTypes = {
  "addPlan": PropTypes.func.isRequired,
  "handleDateChange": PropTypes.func.isRequired,
  "handleTimeChange": PropTypes.func.isRequired,
  "handlePlanDetailsChange": PropTypes.func.isRequired,
  "handleDurationMinuteChange": PropTypes.func.isRequired,
  "handleDurationHourChange": PropTypes.func.isRequired
};

export default DayPlanner;
