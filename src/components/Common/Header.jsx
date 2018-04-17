import React from 'react';
import { AppBar, IconMenu, IconButton, MenuItem } from 'material-ui';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import { withRouter } from "react-router-dom";


const Header = withRouter(({history}) => {

  return(
    <div>

      <AppBar
        title="My Day Planner"
        iconClassNameRight=""
        iconElementLeft={
          <div>
            <IconMenu
              iconStyle={{"color": "white"}}
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
  )
})
export default Header;
