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
                    handleDurationMinuteChange, handleDurationHourChange, selectedStartDateTime,
                    selectedEndDateTime, planDetails, events}) => {
  return (
    <div style={{"margin":"10px"}}>
      <Card className="card-outline" style={{"width": "100%", "padding": "5px"}}>
        <CardHeader
          title="Day Planner"
          subtitle="Build and view your plans"
          style={{"textAlign":"left"}}
        />
        <CardMedia>
          <div style={{"margin": "0 auto", "display": "table"}}>
            <div style={{"float": "left", "padding": "10px", "width": "50%"}}>

              <div style={{"margin": "0 auto", "display": "inline-block", "width": "100%", "padding": "10px"}}>
                <div style={{textAlign: 'center', "display": "inline", "float": "left", "width": "49%"}} >
                  <Paper zDepth={1} children={
                    <div style={{"padding": "10px"}}>
                      <h4>Start Date/Time</h4>
                      <DatePicker
                        floatingLabelText="Select Date"
                        mode="landscape"
                        onChange={(ev, date) => {
                          handleDateChange(ev, date, false)
                        }}
                        value={selectedStartDateTime}
                        minDate={new Date()}/>
                      <TimePicker
                        floatingLabelText="Select Time"
                        onChange={(ev, time) => {
                          handleTimeChange(ev, time, false)
                        }}
                        value={selectedStartDateTime}/>
                    </div>
                  }/>
                </div>
                <div style={{textAlign: 'center', "display": "inline", "float": "right", "width": "49%"}} >
                  <Paper zDepth={1} children={
                    <div style={{"padding": "10px"}}>
                      <h4>End Date/Time</h4>
                      <DatePicker
                        floatingLabelText="Select Date"
                        mode="landscape"
                        onChange={(ev, date) => {
                          handleDateChange(ev, date, true)
                        }}
                        minDate={selectedStartDateTime}
                        value={selectedEndDateTime}/>
                      <TimePicker
                        floatingLabelText="Select Time"
                        onChange={(ev, time) => {
                          handleTimeChange(ev, time, true)
                        }}
                        value={selectedEndDateTime}/>
                    </div>
                  }/>
                </div>
              </div>
              <div style={{"margin": "0 auto", "display": "inline-block", "width": "100%", "padding": "10px"}}>
                <TextField
                   style={{"textAlign":"left"}}
                   floatingLabelText="Plan Details"
                   multiLine={true}
                   onChange={handlePlanDetailsChange}
                   fullWidth={true}
                   value={planDetails}/>
                <br/>
                <br/>
                <RaisedButton
                  label="Add a Plan"
                  onTouchTap={addPlan} />

              </div>

            </div>
            <div style={{"float": "right", "padding": "10px", "width": "50%", "height": "100%"}}>
              <BigCalendar
                {...this.props}
                events={events}
                views={allViews}
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
  "selectedStartDateTime": PropTypes.instanceOf(Date).isRequired,
  "selectedEndDateTime": PropTypes.instanceOf(Date).isRequired,
  "planDetails": PropTypes.string.isRequired,
  "errors": PropTypes.string.isRequired,
  "events": PropTypes.array.isRequired,
};

export default DayPlanner;
