import React from "react";
import { RaisedButton, DatePicker, TimePicker, TextField, Paper, Card, CardHeader, CardMedia, Snackbar} from "material-ui";
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import './style.css';
import "react-big-calendar/lib/css/react-big-calendar.css";
BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

// Base DayPlanner example page
const DayPlanner = ({addPlan, handleDateChange, handleTimeChange, handlePlanDetailsChange,
                    handleDurationMinuteChange, handleDurationHourChange, selectedStartDateTime,
                    selectedEndDateTime, planDetails, events, onErrorDismissal, errors}) => {
  return (
    <div className="dayplanner-container">
      <Card className="card-outline" style={{}}>
        <CardHeader
          title="Day Planner"
          subtitle="Build and view your plans"
          className="card-header"
        />
        <CardMedia>
          <div className="card-media-outer-container">
            <div className="card-media-inner-left-container">
              <div className="day-picker-container">
                <div className="day-picker paper-left">
                  <Paper zDepth={1} children={
                    <div className="paper-inner">
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
                <div className="day-picker paper-right">
                  <Paper zDepth={1} children={
                    <div className="paper-inner">
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
              <div className="day-picker-bottom-entry">
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
            <div className="card-media-inner-right-container">
              <BigCalendar
                {...this.props}
                events={events}
                style={{"height":"100%"}}
              />
            </div>
          </div>
        </CardMedia>
      </Card>

      <Snackbar
        open={(errors !== "")}
        message={errors}
        autoHideDuration={4500}
        onRequestClose={onErrorDismissal}
      />
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
  "onErrorDismissal": PropTypes.func.isRequired,
};

export default DayPlanner;
