import React from "react";
import { Button, TextField, Paper, Card, CardHeader, CardContent, Snackbar, Grid } from "@material-ui/core";
import { DatePicker, TimePicker } from "@material-ui/pickers";
import PropTypes from "prop-types";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./style.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const getEmptyDateTimes = {
  "getStartDateTime": () => moment(new Date()).set({ "minute": 0, "second": 0, "millisecond": 0 }).toDate(),
  "getEndDateTime": () => moment(new Date()).set({ "minute": 0, "second": 0, "millisecond": 0 }).add(2, "hours").toDate(),
};

const getMinimumDate = () => getEmptyDateTimes.getStartDateTime();
const getMaximumDate = () => moment(getEmptyDateTimes.getStartDateTime()).add(15, "minutes");

// Base DayPlanner example page
const DayPlanner = ({ addPlan, handleDateChange, handleTimeChange, handlePlanDetailsChange, selectedStartDateTime,
  selectedEndDateTime, planDetails, events, onErrorDismissal, errors }) => {

  /*
    TODO: Implement mobile-handling for BigCalendar
  */
  return (
    <div>
      <Card>
        <CardHeader
          title="Day Planner"
          subtitle="Build and view your plans"
          className="card-header"
        />
        <CardContent>
          <Grid container>
            <Grid container item xl={6} xs={12}>
              <Grid container item xl={12} xs={12}>
                <Grid item xl={6} xs={12}>
                  <Paper style={{ "margin": "10px", "padding": "10px" }}>
                    <Grid container spacing={8}>
                      <Grid item xl={12} xs={12}>
                        <h4>Start Date/Time</h4>
                      </Grid>
                      <Grid item xl={6} xs={12}>
                        <DatePicker
                          label="Select Date"
                          mode="landscape"
                          onChange={(date) => {

                            handleDateChange(date, false);

                          }}
                          value={selectedStartDateTime}
                          minDate={getMinimumDate()}/>
                      </Grid>
                      <Grid item xl={6} xs={12}>
                        <TimePicker
                          label="Select Time"
                          onChange={(time) => {

                            handleTimeChange(time, false);

                          }}
                          value={selectedStartDateTime}/>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xl={6} xs={12}>
                  <Paper style={{ "margin": "10px", "padding": "10px" }}>
                    <Grid container spacing={8}>
                      <Grid item xl={12} xs={12}>
                        <h4>End Date/Time</h4>
                      </Grid>
                      <Grid item xl={6} xs={12}>
                        <DatePicker
                          label="Select Date"
                          mode="landscape"
                          onChange={(date) => {

                            handleDateChange(date, true);

                          }}
                          minDate={getMaximumDate()}
                          value={selectedEndDateTime}/>
                      </Grid>
                      <Grid item xl={6} xs={12}>
                        <TimePicker
                          label="Select Time"
                          onChange={(time) => {

                            handleTimeChange(time, true);

                          }}
                          value={selectedEndDateTime}/>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
              <Grid container item xl={12} xs={12} spacing={16} style={{ "margin": "0px 5px 0px 5px", "padding": "0px 5px 0px 5px" }}>
                <Grid item xl={12} xs={12}>
                  <TextField
                    style={{ "textAlign": "left" }}
                    label="Plan Details"
                    multiline
                    rows={5}
                    rowsMax={10}
                    onChange={handlePlanDetailsChange}
                    fullWidth={true}
                    value={planDetails}/>
                </Grid>
                <Grid item xl={12} xs={12}>
                  <Button
                    variant="raised"
                    color="primary"
                    onClick={addPlan}>Add a Plan</Button>
                </Grid>
              </Grid>
              <Grid item xs/>
            </Grid>
            <Grid item xl={6} xs={12}>
              <Calendar
                events={events}
                localizer={localizer}
                views={[ "month", "agenda" ]}
                style={{ "width": "100%", "height": "100%" }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Snackbar
        open={(errors !== "")}
        message={errors}
        autoHideDuration={4500}
        onClose={onErrorDismissal}
      />
    </div>
  );

};

DayPlanner.propTypes = {
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
