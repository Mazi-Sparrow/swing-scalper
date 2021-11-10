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
    {name:"WATCHLIST",  link:"/watchlist"},
    {name: "INFORMATION", link:"/information"},
    {name: "SUBSCRIPTION", link:"/subscription"},
    {name: "PROFILE", link:"/profile"},
  ]

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List className="sidebar-page-list">
        {Data.map((text, index) => (
         
          <ListItem button key={text}   >
            <Button href={text.link} > <ListItemText primary={text.name} className="mob-btn" /></Button>
          </ListItem>
          
        ))}
        <Button className="mob-btn logout-mobile-btn" onClick={() => logout().then(() => goToPage(""))}>
            Logout
        </Button>
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
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
        ) : <div></div>}
    </div>
  );
}