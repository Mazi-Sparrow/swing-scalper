import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Hidden } from "@mui/material";
import Logo from "../../assets/images/SwingScalp-01 2.png";
import Mobilemenu from "./Mobilemenu";
export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="appbar-setting">
        <Toolbar>
          <Button
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
            href="/"
          >
            <img src={Logo} width="148px" height="138px" />
          </Button>
          <Hidden mdDown>
            <div className="appbar-btn"></div>

            <Button color="inherit" variant="contained" href="/">
              Login
            </Button>
          </Hidden>
          <Hidden mdUp>
            <div className="signup-appbar">
              <Mobilemenu />
            </div>
          </Hidden>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
