import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
// import { Box } from "@mui/system";
import Box from "@mui/material/Box";

import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { CardHeader } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Grid as MaterialGrid } from "@mui/material";

import Navbar from "../Dashboard/navbar";
import Footer from "./Footer";
import { LinearGaugeComponent } from "./LinearGaugeComponent";
import { RadialGaugeComponent } from "./RadialGaugeComponent";
import { ArcGaugeComponent } from "./ArcGaugeComponent";

import { Context as AuthContext } from "../../context/AuthContext";
import { Context as WatchListContext } from "../../context/WatchListContext";

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
    state: { watchList, errorMessage },
    getWatchlist,
  } = React.useContext(WatchListContext);

  const [stateWatchList, setStateWatchList] = React.useState({});

  const [ticker, setTicker] = React.useState("");

  const handleSearch = async () => {
    const response = await getWatchlist({ token, ticker });
    if (response) setStateWatchList(response);
    setTicker("");
  };

  console.log("sm20: ", stateWatchList.sma20);
  console.log("buy price ", stateWatchList.buyPrice);
  console.log("sma200: ", stateWatchList.sma200);
  return (
    <>
      <Navbar />

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
            >
              <Button
                style={{ backgroundColor: "#9F3D65", color: "white" }}
                variant="contained"
                href="#"
              >
                Search
              </Button>
            </IconButton>
          </Paper>
        </MaterialGrid>
      </Box>

      <div
        style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}
      >
        <Box my={12} mb={15}>
          <Grid
            style={{
              textAlign: "center",
              fontSize: "1.3rem",
              height: "100%",
            }}
            data={[{ ...stateWatchList }]}
          >
            <Column field="ticker" title="Ticker" filterable={false} editable={false} />
            <Column field="buyPrice" title="Price" filterable={false} editable={false} />
            <Column field="stopLoss" title="Stop Loss" filterable={false} editable={false} />
            <Column field="priceTargets" title="Price Target" filterable={false} editable={false} />
            <Column field="rsi14" title="Risk/Reward" filterable={false} editable={false} />
          </Grid>
        </Box>
      </div>

      <MaterialGrid sx={{ marginTop: "5rem" }} container>
        <MaterialGrid item xs={12}>
          <MaterialGrid container justifyContent="space-around" spacing={0} style={{ padding: 10 }}>
            {stateWatchList.buyPrice <= stateWatchList.sma200 ? (
              <MaterialGrid className="guage" item sx={{ maxWidth: 345, flexBasis: 350 }}>
                <CardHeader title="Buy Price" />
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
                <CardHeader title="Buy Tigger" />
                <MyArcGaugeComponent watchList={stateWatchList} />
              </MaterialGrid>
            ) : null}
          </MaterialGrid>
        </MaterialGrid>
      </MaterialGrid>
      <Footer />
    </>
  );
}
{
}
