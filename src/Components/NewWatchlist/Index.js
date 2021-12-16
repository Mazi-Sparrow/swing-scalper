import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
// import { Box } from "@mui/system";
import Box from "@mui/material/Box";
import { Grid, GridColumn as Column, GridToolbar } from "@progress/kendo-react-grid";
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

  if (buyTrigger === true ) {
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
    listWatchlist,
  } = React.useContext(WatchListContext);

  const [stateWatchList, setStateWatchList] = React.useState({});
  const [dataLoaded, setDataLoaded] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  async function loadData () {
    const response = await listWatchlist({ token });
    if (response) {
      setStateWatchList(response);
    }
  }
  const getRealTimeData = () => {
    setInterval(() => {
      loadData()
    }, 5000)
  }
  React.useEffect(() => {
    loadData();
    getRealTimeData();
  }, [])


  React.useEffect(() => {
    if (stateWatchList?.items?.length !== 0) {
      setDataLoaded(false);
      setLoading(false);
      setDataLoaded(true);
    }
  }, [stateWatchList])

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

  const updateData = () => {
    loadData();
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
        {dataLoaded && 
        <>
          {errorMessage ? <h4 style={{ color: "red", textAlign: "center" }}>{errorMessage}</h4> : null}
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
                  data={stateWatchList.items}
                >
                  <GridToolbar>
                    <Button
                      title="Refresh"
                      className="k-primary k-button k-grid-edit-command"
                      style={{ padding: "5px 10px" }}
                      onClick={updateData}
                    >
                      Refresh
                    </Button>
                  </GridToolbar>
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
        </>        
        }
      </div>
      <Footer />
    </>
  );
}

