import React from "react";
import { AppBar, IconButton, MenuItem, Toolbar, Typography, Menu } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";

const Header = ({ history, authentication, overridableMenuItems, overrideMenuItemCallback }) => {

  const handleMenuItemNavigate = (event, value) => {

    if (~overridableMenuItems.indexOf(value)) {

      overrideMenuItemCallback(value);

    } else {

      history.push(value);

    }

  };

  const authenticatedItems = [
    <MenuItem
      primaryText="Day Planner"
      value="/dayplanner"
      key="dayplanner"
      onClick={handleMenuItemNavigate}
    />,
    <MenuItem
      primaryText="Logout"
      value="/logout"
      key="logout"
      onClick={handleMenuItemNavigate}
    />,
  ];

  const unauthenticatedItems = [
    <MenuItem
      primaryText="Login"
      value="/login"
      key="login"
      onClick={handleMenuItemNavigate}
    />,
  ];

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography color="inherit" variant="title">
            My Day Planner
          </Typography>
          <Menu>
            <MenuItem
              primaryText={"Home"}
              value={"/"}
              onClick={handleMenuItemNavigate}
            />
            {
              authentication.isAuthenticated
                ? authenticatedItems
                : unauthenticatedItems
            }
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );

};

Header.propTypes = {
  "history": PropTypes.object.isRequired,
  "authentication": PropTypes.object.isRequired,
  "overridableMenuItems": PropTypes.array.isRequired,
  "overrideMenuItemCallback": PropTypes.func.isRequired,
};

export default Header;
