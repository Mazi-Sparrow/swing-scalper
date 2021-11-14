import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Hidden } from "@mui/material";
import Logo from "../../assets/images/SwingScalp-01 2.png";
import Mobilemenu from "./Mobilemenu";
import Fab from "@mui/material/Fab";

import { Context as AuthContext } from "../../context/AuthContext";

export default function ButtonAppBar() {
  const {
    state: { isSubscribed },
  } = React.useContext(AuthContext);
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
            <div className="appbar-btn">
              <Button color="inherit" href="/dashboard">
                DASHBOARD
              </Button>
              {isSubscribed == "true" || isSubscribed == true ? (
                <>
                  <Button color="inherit" href="/journal">
                    JOURNAL
                  </Button>
                  <Button color="inherit" href="/watchlist">
                    ANALYZER
                  </Button>
                </>
              ) : null}
              <Button color="inherit" href="/trade">
                TRADE STREAMS
              </Button>
              <Button color="inherit" href="/subscription">
                Subscription
              </Button>

              <Button color="inherit" href="/profile">
                Profile
              </Button>
              <Fab color="primary" aria-label="add" className="fab-setting">
                js
              </Fab>
              <Button className="trial-btn"> Trial</Button>
            </div>

            <Button color="inherit" variant="contained" href="/signup">
              signup
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
