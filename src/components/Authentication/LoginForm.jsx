import React from "react";
import PropTypes from "prop-types";
import { TextField, RaisedButton } from "material-ui";

const Login = ({ onSubmit, user, onInputChange, isSubmitted }) => {

  const { username, password } = user;

  return (
    <form onSubmit={onSubmit}>
      <TextField
        hintText="Username"
        name="username"
        errorText={!username && isSubmitted ? "This field is required." : false}
        floatingLabelText="Username"
        fullWidth={true}
        onChange={onInputChange}
        value={username}
      /><br />
      <TextField
        hintText="Password"
        name="password"
        errorText={!password && isSubmitted ? "This field is required." : false}
        type="password"
        floatingLabelText="Password"
        fullWidth={true}
        onChange={onInputChange}
        value={password}
      /><br />
      <RaisedButton type="submit" color="secondary" fullWidth={true} style={{ "marginTop": "10px" }} >Submit</RaisedButton>
    </form>
  );

};

Login.propTypes = {
  "isSubmitted": PropTypes.bool.isRequired,
  "onSubmit": PropTypes.func.isRequired,
  "user": PropTypes.object.isRequired,
  "onInputChange": PropTypes.func.isRequired,
};

export default Login;
