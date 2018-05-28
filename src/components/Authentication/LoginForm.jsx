import React from "react";
import PropTypes from "prop-types";
import { TextField, Button } from "@material-ui/core";

const Login = ({ onSubmit, user, onInputChange, isSubmitted }) => {

  const { username, password } = user;

  return (
    <form onSubmit={onSubmit}>
      <TextField
        name="username"
        label={!username && isSubmitted ? "This field is required." : false}
        placeholder="Username"
        value={username}
        fullWidth={true}
        onChange={onInputChange}
        error={(!username && isSubmitted)}
      /><br />
      <TextField
        placeholder="Password"
        name="password"
        label={!password && isSubmitted ? "This field is required." : false}
        error={(!password && isSubmitted)}
        type="password"
        fullWidth={true}
        onChange={onInputChange}
        value={password}
      /><br />
      <Button variant="raised" type="submit" color="secondary" fullWidth={true} style={{ "marginTop": "10px" }}>Submit</Button>
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
