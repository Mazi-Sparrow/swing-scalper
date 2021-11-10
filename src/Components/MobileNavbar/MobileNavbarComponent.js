import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Hidden } from '@mui/material';
import Logo from '../../assets/images/SwingScalp-01 2.png';
import Mobilemenu from './MobileNavbarInnerComponent';
import {Skeleton } from '@progress/kendo-react-indicators';
import './style.css';

export default function ButtonAppBar() {
  return (
    <Box className="mobileNavbar" sx={{ flexGrow: 1 }}  >
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
            <img src={Logo} width="100%" height="auto" alt=<Skeleton shape={"rectangle"} style={{ width: "100%", height: "auto", }} /> />
          </Button>
          <Hidden  mdDown>
          <div className="appbar-btn" ></div>
        
          <Button color="inherit" variant="contained" href="/signup" >signup</Button>
          
          </Hidden>
          <Hidden mdUp>
          <div className="signup-appbar" >
            <Mobilemenu/>
          </div>
          </Hidden>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
