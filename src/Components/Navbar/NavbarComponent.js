import * as React from "react";
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Logo from "../../assets/images/SwingScalp-01 2.png";
import { AppBar, AppBarSection, AppBarSpacer } from "@progress/kendo-react-layout";
import { Context as AuthContext } from "../../context/AuthContext";
import './style.css';

export default function ButtonAppBar() {
  const history = useHistory();
  const goToPage = React.useCallback((page) => history.push(`/${page}`), [history]);

  const {
    logout,
    state: { isSubscribed, token },
  } = React.useContext(AuthContext);

  return (
    <div className="no-padding navbar">
      <AppBar>
        <AppBarSection>
        </AppBarSection>

        <AppBarSpacer
          style={{
            width: 4,
          }}
        />

        <AppBarSection>
          <a href="/">
            <img
              src={Logo}
              width="100%"
              height="auto"
              alt='logo'
            />
          </a>
        </AppBarSection>

        <AppBarSpacer
          style={{
            width: 32,
          }}
        />

        {token ? (
        <>
          <AppBarSection>
                <Button className="primary-btn-color default-btn-hover navbar-button" color="inherit" href="/dashboard">
                  DASHBOARD
                </Button>

              {isSubscribed === "true" || isSubscribed === true ? (
                <>
                  <Button className="primary-btn-color default-btn-hover navbar-button" color="inherit" href="/journal">
                    JOURNAL
                  </Button>
                  <Button className="primary-btn-color default-btn-hover navbar-button" color="inherit" href="/watchlist">
                    ANALYZER
                  </Button>
                </>
              ) : null}

                <Button className="primary-btn-color default-btn-hover navbar-button" color="inherit" href="/information">
                  Information
                </Button>

                {/* <Button className="navbar-button" color="inherit" href="/subscription">
                  Subscription
                </Button> */}

                <Button className="primary-btn-color default-btn-hover navbar-button" color="inherit" href="/profile">
                  Profile
                </Button>
                
          </AppBarSection>

          <AppBarSpacer />

          <AppBarSection>
            <Button className="primary-btn-color default-btn-hover navbar-logout-btn" size="medium" onClick={() => logout().then(() => goToPage(""))}>
              Logout
            </Button>
          </AppBarSection>
        </>
        ) 
        : 
        <>
          {/* <AppBarSection>
            <ul style={{ fontSize: "16px" }}>
              <li>
                <Button color="inherit" href="/dashboard">
                  HOME
                </Button>
              </li>

              <li>
                <Button color="inherit" href="/journal">
                  FEATURES
                </Button>
              </li>
              <li>
                <Button color="inherit" href="/watchlist">
                  PRICING
                </Button>
              </li>

              <li>
                <Button color="inherit" href="/information">
                  TUTORIALS
                </Button>
              </li>
            </ul>
          </AppBarSection> */}
          
          <AppBarSection className="navbar-button-box">
            <Button className="primary-btn-color default-btn-hover" color="inherit" href="/information">
              Information
            </Button>

            <Button className="primary-btn-color default-btn-hover" color="inherit" href="/subscription">
              Pricing
            </Button>
          </AppBarSection>
          <Box className="nav-button-box">
            {/* <Button className="navbar-button primary-btn-color default-btn-hover" color="inherit" variant="contained" href="/signin" >login</Button> */}
            <Button className="navbar-button primary-btn-color default-btn-hover" color="inherit" variant="contained" href="/signup" >signup</Button>
          </Box>
        </>
        }
      </AppBar>
      <style>
        {`
          .title {
            font - size: 18 px;
            margin: 0;
          }
          ul {
            font - size: 14 px;
            list - style - type: none;
            padding: 0;
            margin: 0;
            display: flex;
          }
          li {
            margin: 0 10 px;
          }
          li: hover {
              cursor: pointer;
              color: #84cef1;
          }
          .k-button {
              padding: 0;
          }
          .k-badge-container {
              margin-right: 8px;
          }     
        `}
      </style>
    </div>
  );
}
