import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Hidden } from '@mui/material';
import Logo from '../../assets/images/SwingScalp-01 2.png';
import Mobilemenu from './Mobilemenu';
import './style.css';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}  >
      <AppBar position="static" className="appbar-setting">
        <Toolbar>
          <Button
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
            href="/"
            class="swing-scalp-logo"
          >
            <img src={Logo} width="100%" height="auto" alt="swing scalp logo"/>
          </Button>
          <Hidden  mdDown>
          <div className="appbar-btn" >
          
         
          </div>

          <div class="button-box nav-button login-btn">
            <Button color="inherit" variant="contained" href="/signin">login</Button>
          </div> 
          <div class="button-box nav-button signup-btn">
            <Button color="inherit" variant="contained" href="/signup">sign up</Button>
          </div>
          
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
