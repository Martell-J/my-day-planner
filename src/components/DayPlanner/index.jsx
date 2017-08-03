import React from "react";
import { RaisedButton, DatePicker, TimePicker, TextField } from "material-ui";
import './style.css';

// Base DayPlanner example page
const DayPlanner = ({addPlan, handleDateChange, handleTimeChange, handlePlanDetailsChange}) => {
  return (
    <div>
      <DatePicker
        hintText="Select Date"
        mode="landscape"
        onChange={handleDateChange} />
      <TimePicker
        hintText="Select Time"
        onChange={handleTimeChange} />
      <TextField
        hintText="Plan Details"
        multiLine={true}
        onChange={handlePlanDetailsChange} />
      <br/>
      <RaisedButton
        label="Add a Plan"
        onTouchTap={addPlan} />
    </div>
  );
}

export default DayPlanner;
