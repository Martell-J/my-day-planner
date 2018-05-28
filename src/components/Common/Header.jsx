import React from "react";
import { AppBar, IconButton, MenuItem, Toolbar, Typography, Menu } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";

const Header = ({ history, authentication, overridableMenuItems, overrideMenuItemCallback, menuAnchor, onToggleMenu }) => {

  const handleMenuItemNavigate = (event) => {

    // Can't by-default tie a value into LI elements generated via MUI. So we
    // pull it directly from the attributes map
    const value = event.currentTarget.attributes.value.value;

    if (~overridableMenuItems.indexOf(value)) {

      overrideMenuItemCallback(value);

    } else {

      history.push(value);

    }

  };

  const authenticatedItems = [
    <MenuItem
      value="/dayplanner"
      key="dayplanner"
      onClick={handleMenuItemNavigate}
    >Day Planner</MenuItem>,
    <MenuItem
      value="/logout"
      key="logout"
      onClick={handleMenuItemNavigate}
    >Logout</MenuItem>,
  ];

  const unauthenticatedItems = [
    <MenuItem
      value={"/login"}
      key="login"
      onClick={handleMenuItemNavigate}
    >Login</MenuItem>,
  ];

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={onToggleMenu}>
            <MenuIcon />
          </IconButton>
          <Menu
            open={menuAnchor !== null}
            onClose={onToggleMenu}
            anchorEl={menuAnchor}
            anchorOrigin={{
              "vertical": "top",
              "horizontal": "left",
            }}
            transformOrigin={{
              "vertical": "top",
              "horizontal": "left",
            }}>
            <MenuItem
              value={"/"}
              onClick={handleMenuItemNavigate}>Home</MenuItem>
            {
              authentication.isAuthenticated
                ? authenticatedItems
                : unauthenticatedItems
            }
          </Menu>
          <Typography color="inherit" variant="title">
            My Day Planner
          </Typography>
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
  "menuAnchor": PropTypes.object,
  "onToggleMenu": PropTypes.func.isRequired,
};

export default Header;
