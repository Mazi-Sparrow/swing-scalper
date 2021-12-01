import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
// import { Box } from "@mui/system";
import Box from "@mui/material/Box";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { CardHeader, CircularProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Grid as MaterialGrid } from "@mui/material";

import Navbar from "../Navbar/NavbarComponent";
import MobileNavbar from "../MobileNavbar/MobileNavbarComponent";

import Footer from "./Footer";
import { LinearGaugeComponent } from "./LinearGaugeComponent";
import { RadialGaugeComponent } from "./RadialGaugeComponent";
import { ArcGaugeComponent } from "./ArcGaugeComponent";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as WatchListContext } from "../../context/WatchListContext";

const zoneBackGround = (props) => {
  const buyZone = props.dataItem.buyZone;

  if (buyZone == true ) {
    return (
      <td
        style={{
          backgroundColor: "rgb(55, 180, 0,0.32)",
        }}
      >
        {buyZone} <span>Green Zone </span>
      </td>
    );
  }

  return (
    <td
      style={{
        backgroundColor: "rgb(243, 23, 0, 0.32)",
      }}
    >
      {buyZone} <span> No Buy Zone </span>
    </td>
  );
};
const triggerBackGround = (props) => {
  const buyTrigger = props.dataItem.buyTrigger;

  if (buyTrigger == true ) {
    return (
      <td
        style={{
          backgroundColor: "rgb(55, 180, 0,0.32)",
        }}
      >
        {buyTrigger} <span> Triggered </span>
      </td>
    );
  }

  return (
    <td
      style={{
        backgroundColor: "rgb(243, 23, 0, 0.32)",
      }}
    >
      {buyTrigger} <span> No Trigger </span>
    </td>
  );
};

const MyLinearGaugeComponent = (props) => {
  return <LinearGaugeComponent {...props} />;
};

const MyRadialGaugeComponent = (props) => {
  return <RadialGaugeComponent {...props} />;
};

const MyArcGaugeComponent = (props) => {
  return <ArcGaugeComponent {...props} />;
};

export default function Index() {
  const {
    state: { token },
  } = React.useContext(AuthContext);
  const {
    state: { errorMessage, isLoading },
    getAnalyzer,
  } = React.useContext(WatchListContext);

  const [stateWatchList, setStateWatchList] = React.useState({});

  const [ticker, setTicker] = React.useState("");

  const handleSearch = async () => {
    const response = await getAnalyzer({ token, ticker });
    if (response) setStateWatchList(response);
  };

  // responsive columns on window resize  
  const columns = document.getElementsByClassName('k-header');
  const [columnWidth, setColumnWidth] = React.useState((window.innerWidth-50)/columns.length);

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  const handleResize = () => {
    if ((window.innerWidth/columns.length) > 100) {
      setColumnWidth(((window.innerWidth-50)/columns.length) + 'px');
    }
    else {
      setColumnWidth('100px');
    }
  }

  const setWidth = () => {
    return columnWidth;
  }

  return (
    <>
      <Box>
        <Navbar />
      </Box>
      <Box>
        <MobileNavbar />
      </Box>

      <div className="watchlist-page-content page-content">
        {errorMessage ? <h4 style={{ color: "red", textAlign: "center" }}>{errorMessage}</h4> : null}
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <MaterialGrid container justifyContent="center" style={{ marginTop: "30px" }}>
            <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: "50%" }}>
              <InputBase
                sx={{ ml: 1, flex: 1, fontSize: "1.5rem" }}
                placeholder="Enter a Ticker"
                inputProps={{ "aria-label": "search watchList" }}
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
              />

              <IconButton
                type="submit"
                sx={{ p: "10px", alignSelf: "center" }}
                aria-label="search"
                onClick={() => handleSearch()}
                disabled={ticker.length === 0}
              >
                <Button
                  className="primary-btn-color"
                  // style={{ backgroundColor: "#9c27b0", color: "white" }}
                  variant="contained"
                  href="#"
                >
                  {isLoading ? <CircularProgress size={20} /> : null}
                  Analyze
                </Button>
              </IconButton>
            </Paper>
          </MaterialGrid>
        </Box>

        <div
          // style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}
        >
          <Box my={12} mb={15}>
            <Grid
              style={{
                textAlign: "justify",
                fontSize: ".9rem",
                width: "100%",
                height: "100%",
              }}
              data={[{ ...stateWatchList }]}
            >
              <Column 
                field="ticker" 
                title="Ticker" 
                filterable={false} 
                editable={false}
                // width="100px" 
                width={setWidth()}
              />
              <Column 
                field="buyPrice" 
                title="Price $" 
                filterable={false} 
                editable={false} 
                width={setWidth()}
              />
              <Column 
                field="stopLoss" 
                title="Stop Loss $" 
                filterable={false} 
                editable={false} 
                width={setWidth()}
              />
              <Column
                field="priceTargets"
                title="Price Target $"
                filterable={false}
                editable={false}
                width={setWidth()}
              />
              <Column 
                field="rsi14" 
                title="RSI" 
                filterable={false} 
                editable={false} 
                width={setWidth()}
              />
              <Column 
                field="tradeRisk" 
                title="Risk $" 
                filterable={false} 
                editable={false} 
                width={setWidth()}
              />
              <Column 
                field="tradeReward" 
                title="Reward $" 
                filterable={false} 
                editable={false} 
                width={setWidth()}
              />
              <Column 
                field="buyZone" 
                title="Buy Zone" 
                cell={zoneBackGround} 
                filterable={false} 
                editable={false} 
                width={setWidth()}
              />
              <Column 
                field="buyTrigger" 
                title="Buy Trigger" 
                cell={triggerBackGround} 
                filterable={false} 
                editable={false}
                width={setWidth()}
              />
            </Grid>
          </Box>
        </div>

        <MaterialGrid sx={{ marginTop: "5rem" }} container>
          <MaterialGrid item xs={12}>
            <MaterialGrid container justifyContent="space-around" spacing={0} style={{ padding: 10 }}>
              {stateWatchList.rsi14 ? (
                <MaterialGrid className="guage" item sx={{ maxWidth: 345, flexBasis: 350 }}>
                  <CardHeader title="RSI" />
                  <MyRadialGaugeComponent watchList={stateWatchList} />
                </MaterialGrid>
              ) : null}

              {stateWatchList.buyZone ? (
                <MaterialGrid item sx={{ maxWidth: 345, flexBasis: 300 }} className="guage">
                  <CardHeader title="Buy Zone" />
                  <MyLinearGaugeComponent watchList={stateWatchList} />
                </MaterialGrid>
              ) : null}

              {stateWatchList.buyTrigger ? (
                <MaterialGrid item sx={{ maxWidth: 345, flexBasis: 300 }} className="guage">
                  <CardHeader title="Buy Trigger" />
                  <MyArcGaugeComponent watchList={stateWatchList} />
                </MaterialGrid>
              ) : null}
            </MaterialGrid>
          </MaterialGrid>
        </MaterialGrid>
      </div>
      <Footer />
    </>
  );
}

