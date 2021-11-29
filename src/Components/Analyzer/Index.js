import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { CardHeader, CircularProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { Grid as MaterialGrid } from "@mui/material";

import {
    Chart,
    ChartTitle,
    ChartTooltip,
    ChartSeries,
    ChartSeriesItem,
    ChartCategoryAxis,
    ChartCategoryAxisItem,
    ChartValueAxis,
    ChartValueAxisItem,
  } from "@progress/kendo-react-charts";
  import "hammerjs";

import Navbar from "../Navbar/NavbarComponent";
import MobileNavbar from "../MobileNavbar/MobileNavbarComponent";

import Footer from "./Footer";

import { Context as AuthContext } from "../../context/AuthContext";
import { Context as WatchListContext } from "../../context/WatchListContext";

import './style.css'

export default function Index() {
  const {
    state: { token },
  } = React.useContext(AuthContext);
  const {
    state: { errorMessage, isLoading },
    getWatchlist,
  } = React.useContext(WatchListContext);

  const [stateWatchList, setStateWatchList] = React.useState({});

  const [ticker, setTicker] = React.useState("");

  const handleSearch = async () => {
    const response = await getWatchlist({ token, ticker });
    if (response) setStateWatchList(response);
  };

    const hidden = {
        visible: false,
    };
    const tempPlotBands = [
        {
        from: 80,
        to: 100,
        color: "#e62325",
        opacity: 1,
        },
        {
        from: 60,
        to: 80,
        color: "#ffc000",
        opacity: 1,
        },
        {
        from: 30,
        to: 60,
        color: "#37b400",
        opacity: 1,
        },
        {
        from: -10,
        to: 30,
        color: "#5392ff",
        opacity: 1,
        },
    ];
    const humPlotBands = [
        {
        from: 0,
        to: 33,
        color: "#ccc",
        opacity: 0.6,
        },
        {
        from: 33,
        to: 66,
        color: "#ccc",
        opacity: 0.3,
        },
    ];
    const mmhgPlotBands = [
        {
        from: 715,
        to: 752,
        color: "#ccc",
        opacity: 0.6,
        },
        {
        from: 752,
        to: 772,
        color: "#ccc",
        opacity: 0.3,
        },
    ];
    const temp = [[25, 22]];
    const hum = [[45, 60]];
    const mmhg = [[750, 762]];

    const tooltipRender = ({ point }) => {
        const { value } = point;
        return (
        <span>
            Maximum: {value.target}
            <br />
            Average: {value.current}
        </span>
        );
    };


  return (
    <>
      <Box>
        <Navbar />
      </Box>
      <Box>
        <MobileNavbar />
      </Box>

    <div className="analyzer-page-content page-content">
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

        <Box className="analyzer-information-about-company">
            
        </Box>

        <Box className="analyzer-linear-indicators">
            <Box className="analyzer-linear-indicator">
                <Chart
                    style={{
                    height: 120,
                    }}
                >
                    <ChartTitle text="RSI" />
                    <ChartSeries>
                    <ChartSeriesItem type="bullet" color="#fff" data={[[stateWatchList.rsi14, 0]]} />
                    </ChartSeries>
                    <ChartCategoryAxis>
                    <ChartCategoryAxisItem
                        majorGridLines={hidden}
                        minorGridLines={hidden}
                    />
                    </ChartCategoryAxis>
                    <ChartValueAxis>
                    <ChartValueAxisItem
                        majorGridLines={hidden}
                        minorTicks={hidden}
                        min={-10}
                        max={100}
                        plotBands={tempPlotBands}
                    />
                    </ChartValueAxis>
                    <ChartTooltip render={tooltipRender} />
                </Chart>
            </Box>

            <Box className="analyzer-linear-indicator">
                <Chart
                    style={{
                    height: 120,
                    }}
                >
                    <ChartTitle text="PRICE" />
                    <ChartSeries>
                    <ChartSeriesItem type="bullet" color="#0058e9" data={hum} />
                    </ChartSeries>
                    <ChartCategoryAxis>
                    <ChartCategoryAxisItem
                        majorGridLines={hidden}
                        minorGridLines={hidden}
                    />
                    </ChartCategoryAxis>
                    <ChartValueAxis>
                    <ChartValueAxisItem
                        majorGridLines={hidden}
                        minorTicks={hidden}
                        min={0}
                        max={100}
                        plotBands={humPlotBands}
                    />
                    </ChartValueAxis>
                    <ChartTooltip render={tooltipRender} />
                </Chart>
            </Box>

            <Box className="analyzer-linear-indicator">
                <Chart
                    style={{
                    height: 120,
                    }}
                >
                    <ChartTitle text="PRICE" />
                    <ChartSeries>
                    <ChartSeriesItem type="bullet" color="#111" data={mmhg} />
                    </ChartSeries>
                    <ChartCategoryAxis>
                    <ChartCategoryAxisItem
                        majorGridLines={hidden}
                        minorGridLines={hidden}
                    />
                    </ChartCategoryAxis>
                    <ChartValueAxis>
                    <ChartValueAxisItem
                        majorGridLines={hidden}
                        minorTicks={hidden}
                        min={715}
                        max={795}
                        plotBands={mmhgPlotBands}
                    />
                    </ChartValueAxis>
                    <ChartTooltip render={tooltipRender} />
                </Chart>
            </Box>
        </Box>
        <Box className="analyzer-block-indicators">
            <Box className="analyzer-block-indicators-column">
                <Box className="analyzer-block-indicator">
                    <Box className="analyzer-block-indicator-title">
                        STOP LOSS
                    </Box>
                    <Box className="analyzer-block-indicator-value">
                        {stateWatchList ? (stateWatchList.stopLoss ? stateWatchList.stopLoss : '') : ''}
                    </Box>
                </Box>
                <Box className="analyzer-block-indicator">
                    <Box className="analyzer-block-indicator-title">
                        PRICE TARGET 1
                    </Box>
                    <Box className="analyzer-block-indicator-value">
                        {stateWatchList ? (stateWatchList.priceTargets ? (stateWatchList.priceTargets[0] ? stateWatchList.priceTargets[0] : '') : '') : ''}
                    </Box>
                    <Box className="analyzer-block-indicator-title">
                        PRICE TARGET 2
                    </Box>
                    <Box className="analyzer-block-indicator-value">
                        {stateWatchList ? (stateWatchList.priceTargets ? (stateWatchList.priceTargets[1] ? stateWatchList.priceTargets[1] : '') : '') : ''}
                    </Box>
                </Box>
            </Box>
            <Box className="analyzer-block-indicators-column">
                <Box className="analyzer-block-indicator">
                    <Box className="analyzer-block-indicator-title">
                        RISK
                    </Box>
                    <Box className="analyzer-block-indicator-value">
                        {stateWatchList ? (stateWatchList.tradeRisk ? stateWatchList.tradeRisk : '') : ''}
                    </Box>
                </Box>
                <Box className="analyzer-block-indicator">
                    <Box className="analyzer-block-indicator-title">
                        REWARD
                    </Box>
                    <Box className="analyzer-block-indicator-value">
                        {stateWatchList ? (stateWatchList.tradeReward ? stateWatchList.tradeReward : '') : ''}
                    </Box>
                </Box>
            </Box>
            <Box className="analyzer-block-indicators-column">
                <Box className={`analyzer-block-indicator ${stateWatchList.buyZone === true ? 'positive' : (stateWatchList.buyZone === false ? 'negative' : '')}`}>
                    <Box className="analyzer-block-indicator-title">
                        BUY ZONE
                    </Box>
                </Box>
                <Box className={`analyzer-block-indicator ${stateWatchList.buyTrigger === true ? 'positive' : (stateWatchList.buyTrigger === false ? 'negative' : '')}`}>
                    <Box className="analyzer-block-indicator-title">
                        BUY TRIGGER
                    </Box>
                </Box>
            </Box>
        </Box>
    </div>
    </>
  )
}