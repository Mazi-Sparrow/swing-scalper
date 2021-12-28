import * as React from "react";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Logo from "../../assets/images/SwingScalp-01 2.png";
import { AppBar, AppBarSection, AppBarSpacer } from "@progress/kendo-react-layout";
import { Skeleton } from "@progress/kendo-react-indicators";
import { Context as AuthContext } from "../../context/AuthContext";

export default function ButtonAppBar() {
  const history = useHistory();
  const goToPage = React.useCallback((page) => history.push(`/${page}`), [history]);

  const {
    logout,
    state: { isSubscribed },
  } = React.useContext(AuthContext);

  // console.log(typeof isSubscribed);
  return (
    <>
      <AppBar>
        <AppBarSection>
          <button className="k-button k-button-clear">
            <span className="k-icon k-i-menu" />
          </button>
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
              // alt=<Skeleton shape={"rectangle"} style={{ width: "100%", height: "auto" }} />
            />
          </a>
        </AppBarSection>

        <AppBarSpacer
          style={{
            width: 32,
          }}
        />

        <AppBarSection>
          <ul style={{ fontSize: "16px" }}>
            <li>
              <Button color="inherit" href="/dashboard">
                DASHBOARD
              </Button>
            </li>

            {isSubscribed == "true" || isSubscribed == true ? (
              <>
                <li>
                  <Button color="inherit" href="/journal">
                    JOURNAL
                  </Button>
                </li>
                <li>
                  <Button color="inherit" href="/watchlist">
                    ANALYZER
                  </Button>
                </li>
              </>
            ) : null}

            <li>
              <Button color="inherit" href="/information">
                Information
              </Button>
            </li>

            <li>
              <Button color="inherit" href="/subscription">
                Subscription
              </Button>
            </li>
            <li>
              <Button color="inherit" href="/profile">
                Profile
              </Button>
            </li>
          </ul>
        </AppBarSection>

        <AppBarSpacer />

        <AppBarSection>
          <Button size="medium" color="primary" onClick={() => logout().then(() => goToPage(""))}>
            Logout
          </Button>
        </AppBarSection>
      </AppBar>
      <style>{`
                              .title {
                    font-size: 18px;
                    margin: 0;
                }

                ul {
                    font-size: 14px;
                    list-style-type: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                }
                li {
                    margin: 0 10px;
                }
                li:hover {
                    cursor: pointer;
                    color: #84cef1;
                }
                .k-button {
                    padding: 0;
                }
                .k-badge-container {
                    margin-right: 8px;
                }

                
            `}</style>
    </>
  );
}
