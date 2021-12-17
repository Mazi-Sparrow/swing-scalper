import * as React from 'react';
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { Context as AuthContext } from "../../context/AuthContext";

export default function TemporaryDrawer() {
  const history = useHistory();
  const goToPage = React.useCallback((page) => history.push(`/${page}`), [history]);

  const {
    logout,
    state: { token },
  } = React.useContext(AuthContext);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const Data=[
    {name:"DASHBOARD",  link:"/dashboard"},
    {name:"JOURNAL",  link:"/journal"},
    {name:"ANALYZER",  link:"/watchlist"},
    {name: "INFORMATION", link:"/information"},
    // {name: "SUBSCRIPTION", link:"/subscription"},
    {name: "PROFILE", link:"/profile"},
    {name: "SUPPORT", link:"/support"},
    {name: "TRADE STREAMS", link:"/trade-streams"},
    {name: "WATCHLIST", link:"/watch-list"},
  ]

  const LoggedOutData=[
    {name:"INFORMATION",  link:"/information"},
    {name:"SUBSCRIPTION",  link:"/subscription"},
    // {name:"LOGIN",  link:"/signin"},
    // {name:"SIGNUP",  link:"/signup"},
  ]

  const list = (anchor, isLoggedIn) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className="sidebar-page-list">
        {isLoggedIn === 'true' ? 
          (
            <>
              {Data.map((text, index) => (
              
                <ListItem button key={text}   >
                  <Button href={text.link} > <ListItemText primary={text.name} className="mob-btn" /></Button>
                </ListItem>
              ))}
            <Button className="mob-btn logout-mobile-btn" onClick={() => logout().then(() => goToPage(""))}>
                Logout
            </Button>
            </>
          )
          : 
          (
            <>
              {LoggedOutData.map((text, index) => (
                <ListItem button key={text}   >
                  <Button href={text.link} > <ListItemText primary={text.name} className="mob-btn" /></Button>
                </ListItem>
              ))}
            <Button className="mob-btn login-mobile-btn" onClick={() => logout().then(() => goToPage("signin"))}>
                Login
            </Button>
            <Button className="mob-btn login-mobile-btn" onClick={() => logout().then(() => goToPage("signup"))}>
                Sign up
            </Button>
            </>
          )
        }
      </List>
    
    </Box>
  );

  return (
    <div>
        {token ? (
      <div>
        {[ 'right',].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)} className="mobmenuicon" ><MenuIcon/></Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor, 'true')}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
        ) 
        : 
        <div>
        {[ 'right',].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)} className="mobmenuicon" ><MenuIcon/></Button>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor, 'false')}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
          // <Box className="button-box">
          //   <Button className="navbar-button" color="inherit" variant="contained" href="/signin" >login</Button>
          //   <Button className="navbar-button" color="inherit" variant="contained" href="/signup" >signup</Button>
          // </Box>
        }
    </div>
  );
}