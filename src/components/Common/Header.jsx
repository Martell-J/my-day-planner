import React from "react";
import { AppBar, IconMenu, IconButton, MenuItem } from "material-ui";
import MenuIcon from "material-ui/svg-icons/navigation/menu";
import PropTypes from "prop-types";

const Header = ({ history, authentication }) => {

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
              onChange={(event, value) => {

                history.push(value);

              }}
            >
              <MenuItem
                primaryText={"Home"}
                value={"/"}
              />
              <MenuItem
                primaryText={"Day Planner"}
                value={"/dayplanner"}
              />
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
};

export default Header;
