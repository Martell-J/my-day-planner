import React from "react";
import { AppBar, IconMenu, IconButton, MenuItem } from "material-ui";
import MenuIcon from "material-ui/svg-icons/navigation/menu";
import PropTypes from "prop-types";

const Header = ({ history, authentication, overridableMenuItems, overrideMenuItemCallback }) => {

  const authenticatedItems = [
    <MenuItem
      primaryText="Day Planner"
      value="/dayplanner"
      key="dayplanner"
    />,
    <MenuItem
      primaryText="Logout"
      value="/logout"
      key="logout"
    />,
  ];

  const unauthenticatedItems = [
    <MenuItem
      primaryText="Login"
      value="/login"
      key="login"
    />,
  ];

  return (
    <div>

      <AppBar
        title="My Day Planner"
        iconClassNameRight=""
        iconElementLeft={
          <div>
            <IconMenu
              iconStyle={{ "color": "white" }}
              iconButtonElement={<IconButton><MenuIcon /></IconButton>}
              onChange={
                (event, value) => {

                  if (~overridableMenuItems.indexOf(value)) {

                    overrideMenuItemCallback(value);

                  } else {

                    history.push(value);

                  }

                }
              }
            >
              <MenuItem
                primaryText={"Home"}
                value={"/"}
              />
              {
                authentication.isAuthenticated
                  ? authenticatedItems
                  : unauthenticatedItems
              }
            </IconMenu>
          </div>
        }
      />
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
