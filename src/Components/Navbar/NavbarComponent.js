import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Logo from "../../assets/images/SwingScalp-01 2.png";
import { AppBar, AppBarSection, AppBarSpacer } from "@progress/kendo-react-layout";

import { Modal } from 'react-responsive-modal';

import { Context as AuthContext } from "../../context/AuthContext";
import './style.css';

export default function ButtonAppBar() {
  const history = useHistory();
  const goToPage = React.useCallback((page) => history.push(`/${page}`), [history]);

  const [premiumSubcription, setPremiumSubscription] = useState(false);
  const [standardSubcription, setStandardSubscription] = useState(false);
  const [freeSubcription, setFreeSubscription] = useState(false);

  const [notAllowedPageModal, setNotAllowedPageModal] = useState(false);

  const onCloseNotAllowedPageModal = () => {
    setNotAllowedPageModal(false);
  }

  const {
    logout,
    state: { isSubscribed, token },
    getUser,
  } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      getUser({ token }).then((res) => {
        if (res.subscriptions !== null) {
          res.subscriptions.forEach(element => {
            if (element.name.toLowerCase().indexOf('free') !== -1) {
              setFreeSubscription(true);
            }
            if (element.name.toLowerCase().indexOf('standard') !== -1) {
              setStandardSubscription(true);
            }
            if ((element.name.toLowerCase().indexOf('premium') !== -1) || (element.name.toLowerCase().indexOf('private') !== -1)) {
              setPremiumSubscription(true);
            }
          });
        }
        // console.log(res)
      })
    }
  }, [token]);

  return (
    <div className="no-padding navbar">
      
      <Modal
          open={notAllowedPageModal}
          onClose={onCloseNotAllowedPageModal}
          center
          animationDuration={500}
          classNames={{modal:"not-allowed-page-modal responsive-modal"}}
          data-testid="2"
          focusTrapped={false}
        >
          <Box className="modal-title">
            You don't have permissions to view this page. You can upgrade your subscription to access the page.
          </Box>
          <Box className="delete-user-button-box">
            <Button
              className="primary-btn-color default-btn-hover default-button entry-close-btn"
              onClick={() => {
                  goToPage('subscription');
                  setNotAllowedPageModal(false);
                }
              }
            >
              Upgrade subscription
            </Button>
            <Button
              className="primary-btn-color default-btn-hover default-button entry-close-btn"
              onClick={() => {
                  setNotAllowedPageModal(false);
                }
              }
            >
              Cancel
            </Button>
          </Box>
        </Modal>
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
                  <Button className="primary-btn-color default-btn-hover navbar-button" color="inherit" href="/analyzer">
                    ANALYZER
                  </Button>
                  <Button className={"primary-btn-color default-btn-hover navbar-button " + (!premiumSubcription ? "not-allowed" : "")}  color="inherit" href={!premiumSubcription ? "" : "/trade-streams"}
                  onClick={premiumSubcription ? () => {} : () => {
                    setNotAllowedPageModal(true);
                  }}
                  >
                    TRADE STREAMS
                  </Button>
                  <Button className={"primary-btn-color default-btn-hover navbar-button " + ((!premiumSubcription || !standardSubcription) ? "not-allowed" : "")} color="inherit" href={(!premiumSubcription || !standardSubcription) ? "" : "/watch-list"}
                  onClick={(premiumSubcription || standardSubcription) ? () => {} : () => {
                    setNotAllowedPageModal(true);
                  }}
                  >
                    WATCHLIST
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

                
                <Button className="primary-btn-color default-btn-hover navbar-button" color="inherit" href="/support">
                  Support
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
            <Button className="primary-btn-color logged-out-button-style" color="inherit" href="/information">
              Information
            </Button>

            <Button className="primary-btn-color logged-out-button-style" color="inherit" href="/subscription">
              Pricing
            </Button>
          </AppBarSection>
          <Box className="nav-button-box">
            <Button className="navbar-button primary-btn-color logged-out-button-style signin-button" color="inherit" variant="contained" href="/signin" >login</Button>
            {/*  default-btn-hover */}
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
