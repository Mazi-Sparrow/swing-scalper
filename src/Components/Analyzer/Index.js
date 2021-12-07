import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { CardHeader, CircularProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { Grid as MaterialGrid } from "@mui/material";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons'

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
    getToken
  } = React.useContext(AuthContext);
  const {
    state: { errorMessage, isLoading },
    getAnalyzer,
  } = React.useContext(WatchListContext);

  const [stateWatchList, setStateWatchList] = React.useState({});
  const [priceTargetIndicator, setPriceTargetIndicator] = React.useState([]);
  const [isTickerExist, setIsTickerExist] = React.useState(false);
  const [showIncorrectTicker, setShowIncorrectTicker] = React.useState(false);

  const [ticker, setTicker] = React.useState("");

  React.useEffect(() => {
    getToken();
  }, []);

  const handleSearch = async () => {
    setStateWatchList({});
    setIsTickerExist(false);
    setShowIncorrectTicker(false);
    const response = await getAnalyzer({ token, ticker });
    if (response) {
        setStateWatchList(response);
        setPriceTargetIndicator([stateWatchList?.open, stateWatchList?.open])
        setIsTickerExist(true);
    } else if (!response?.ticker) {
        setShowIncorrectTicker(true);
    }
  };

    const hidden = {
        visible: false,
    };
    const tempPlotBands = [
        {
        from: 85,
        to: 100,
        color: "#FF3333",
        opacity: 1,
        },
        {
        from: 70,
        to: 85,
        color: "#FF9933",
        opacity: 1,
        },
        {
        from: 30,
        to: 70,
        color: "#FFFF33",
        opacity: 1,
        },
        {
        from: 15,
        to: 30,
        color: "#33CC33",
        opacity: 1,
        },
        {
        from: 0,
        to: 15,
        color: "#3333CC",
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
        {
        from: 66,
        to: 100,
        color: "#ccc",
        opacity: 0.3,
        },
        {
        from: 100,
        to: 133,
        color: "#ccc",
        opacity: 0.3,
        },
        {
        from: 133,
        to: 166,
        color: "#ccc",
        opacity: 0.3,
        },
        {
        from: 166,
        to: 200,
        color: "#ccc",
        opacity: 0.3,
        },
        {
        from: 200,
        to: 233,
        color: "#ccc",
        opacity: 0.3,
        },
    ];
    const mmhgPlotBands = [
        {
        from: 0,
        to: 10000,
        color: "#ccc",
        opacity: 0.6,
        }
    ];
    const temp = [[25, 22]];
    const hum = [[45, 60]];
    const mmhg = [[stateWatchList.currentPrice, stateWatchList.open]];

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

        {isTickerExist ? 
        <>
            {Object.keys(stateWatchList).length !== 0 &&
                <Box className="analyzer-information-about-company">
                    <Box className="analyzer-information-about-company-column analyzer-information-about-company-main-column">
                        <Box className="analyzer-information-about-company-name">
                            {stateWatchList?.company?.name ? stateWatchList.company.name : ''}
                        </Box>
                        <Box className="analyzer-information-about-company-logo">
                            {stateWatchList?.company?.logo ? 
                                <img src={stateWatchList.company.logo} alt="company logo"/> 
                            : ''}
                        </Box>
                    </Box>
                    <Box className="analyzer-information-about-company-column">
                        <Box className="analyzer-information-about-company-indicators">
                            <Box className="analyzer-information-about-company-title">
                                PRICE
                            </Box>
                            <Box className={"analyzer-information-about-company-price " + (stateWatchList?.currentPrice > stateWatchList?.open ? "positive-text" : "negative-text")}>
                                {stateWatchList?.currentPrice ? stateWatchList.currentPrice : ''}
                                {stateWatchList?.currentPrice > stateWatchList?.open 
                                    ? 
                                    <FontAwesomeIcon className="positive-text analyzer-arrow-icon arrow-up" icon={faLongArrowAltUp} />
                                    :
                                    <FontAwesomeIcon className="negative-text analyzer-arrow-icon arrow-down" icon={faLongArrowAltUp} />
                                }
                            </Box>
                        </Box>
                        <Box className="analyzer-information-about-company-indicators">
                            <Box className="analyzer-information-about-company-title">
                                OPENING PRICE
                            </Box>
                            <Box className="analyzer-information-about-company-opening-price">
                                {stateWatchList?.open ? stateWatchList.open : ''}
                            </Box>
                        </Box>
                        <Box className="analyzer-information-about-company-indicators">
                            <Box className="analyzer-information-about-company-title">
                                PREVIOUS CLOSE
                            </Box>
                            <Box className="analyzer-information-about-company-previous-close">
                                {stateWatchList?.previousClose ? stateWatchList.previousClose : ''}
                            </Box>
                        </Box>
                    </Box>
                    <Box className="analyzer-information-about-company-column">
                        <Box className="analyzer-information-about-company-indicators">
                            <Box className="analyzer-information-about-company-title">
                                PRICE CHANGE
                            </Box>
                            <Box className="analyzer-information-about-company-price-change">
                                {stateWatchList?.priceChange ? stateWatchList.priceChange : ''}
                            </Box>
                        </Box>
                        <Box className="analyzer-information-about-company-indicators">
                            <Box className="analyzer-information-about-company-title">
                                VOLUME
                            </Box>
                            <Box className="analyzer-information-about-company-volume">
                                {stateWatchList?.volume ? stateWatchList.volume : ''}    
                            </Box>
                        </Box>
                        <Box className="analyzer-information-about-company-indicators">
                            <Box className="analyzer-information-about-company-title">
                                VWAP
                            </Box>
                            <Box className={"analyzer-information-about-company-vwap " + (stateWatchList?.vwap > stateWatchList?.currentPrice ? "positive-text" : "negative-text")}>
                                {stateWatchList?.vwap ? stateWatchList.vwap : ''}
                                {stateWatchList?.vwap > stateWatchList?.currentPrice 
                                    ? 
                                    <FontAwesomeIcon className="positive-text analyzer-arrow-icon arrow-up" icon={faLongArrowAltUp} />
                                    :
                                    <FontAwesomeIcon className="negative-text analyzer-arrow-icon arrow-down" icon={faLongArrowAltUp} />
                                }
                            </Box>
                        </Box>
                    </Box>
                </Box>
            }
            {stateWatchList?.buyZone ?
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
                                min={0}
                                max={100}
                                plotBands={tempPlotBands}
                            />
                            </ChartValueAxis>
                            <ChartTooltip render={tooltipRender} />
                        </Chart>
                    </Box>

                    {/* <Box className="analyzer-linear-indicator">
                        <Chart
                            style={{
                            height: 120,
                            }}
                        >
                            <ChartTitle text="SAFE MARGIN" />
                            <ChartSeries>
                            <ChartSeriesItem type="bullet" color="#0058e9" data={priceTargetIndicator} />
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
                                min={stateWatchList?.currentPrice ? stateWatchList.currentPrice : 0}
                                max={200}
                                // max={stateWatchList?.priceTargets ? (stateWatchList.priceTargets[1] ? stateWatchList.priceTargets[1] : stateWatchList.priceTargets[0]) : 100}
                                // min={0}
                                // max={100}
                                plotBands={humPlotBands}
                            />
                            </ChartValueAxis>
                            <ChartTooltip render={tooltipRender} />
                        </Chart>
                    </Box> */}

                    <Box className="analyzer-linear-indicator">
                        <Chart
                            style={{
                            height: 120,
                            }}
                        >
                            <ChartTitle text="DAILY RANGE" />
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
                                min={stateWatchList?.low ? stateWatchList.low : 0}
                                max={stateWatchList?.high ? stateWatchList.high : 0}
                                plotBands={mmhgPlotBands}
                            />
                            </ChartValueAxis>
                            <ChartTooltip render={tooltipRender} />
                        </Chart>
                    </Box>
                </Box>
                :
                <Box className="analyzer-page-no-sage-trade-setup">
                    No Safe Trade Setup
                </Box>
            }
            {Object.keys(stateWatchList).length !== 0 &&
                <Box>
                    <Box className="analyzer-block-title">Analysis</Box>
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
                            </Box>
                            <Box className="analyzer-block-indicator">
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
                                <Box className="analyzer-block-indicator-value negative-text">
                                    {stateWatchList ? (stateWatchList.tradeRisk ? stateWatchList.tradeRisk : '') : ''}
                                </Box>
                            </Box>
                            <Box className="analyzer-block-indicator">
                                <Box className="analyzer-block-indicator-title analyzer-block-indicator-reward">
                                    REWARD
                                </Box>
                                <Box className={"analyzer-block-indicator-value " + (stateWatchList?.tradeReward < 0 ? "negative-text" : (stateWatchList?.tradeReward < stateWatchList?.tradeRisk ? "negative-text" : "positive-text"))}>
                                    {stateWatchList ? (stateWatchList.tradeReward ? stateWatchList.tradeReward : '') : ''}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box className="analyzer-block-indicators-column analyzer-block-indicators-column-boxes">
                        <Box className={`analyzer-block-indicator analyzer-block-indicator-buyZone ${stateWatchList.buyZone === true ? 'positive' : (stateWatchList.buyZone === false ? 'negative' : '')}`}>
                            <Box className="analyzer-block-indicator-title analyzer-block-indicator-title-box">
                                BUY ZONE
                            </Box>
                        </Box>
                        <Box className={`analyzer-block-indicator analyzer-block-indicator-buyTrigger ${stateWatchList.buyTrigger === true ? 'positive' : (stateWatchList.buyTrigger === false ? 'negative' : '')}`}>
                            <Box className="analyzer-block-indicator-title analyzer-block-indicator-title-box">
                                BUY TRIGGER
                            </Box>
                        </Box>
                    </Box>
                </Box>
            }
                <Box className="analyzer-news-block">
                    <Box className="analyzer-news-title">
                        NEWS
                    </Box>
                        {stateWatchList.news.map((item, index) => {
                            return (
                                    <Box key={index} className="analyzer-news-item-wrapper">
                                        <a href={item.url} className="analyzer-news-item">
                                            <Box className="analyzer-news-item-image">
                                                <img src={item.image} alt="news"/>
                                            </Box>
                                            <Box className="analyzer-news-item-info">
                                                <Box className="analyzer-news-item-title">{item.title}</Box>
                                                <Box className="analyzer-news-item-description">{item.description?.length > 300 ? (item.description?.substring(0, 300) + '...') : item.description}</Box>
                                            </Box>
                                        </a>
                                    </Box>
                                )
                            })
                        }
                </Box>
            </>
        :
        <>
        </>
    }
    {showIncorrectTicker &&
        <Box className="analyzer-page-incorrect-ticker-text">
            Information unavailable
        </Box>
    }
            
            <Box className="homepage-bottom-block">
                <Box className="homepage-bottom-info">
                    The information contained in this site is provided for
                    informational purposes only, and should not be construed as
                    financial advice on any subject matter.
                </Box>
                <Box className="homepage-bottom-advice">
                    PLEASE ALWAYS DO YOUR RESEARCH OR CONSULT A FINANCIAL ADVISER.
                </Box>
            </Box>
        </div>
    <Footer />
    </>
  )
}