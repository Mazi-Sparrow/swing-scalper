import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
// import { Box } from "@mui/system";
import Box from "@mui/material/Box";
import { Grid, GridColumn as Column, GridToolbar } from "@progress/kendo-react-grid";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import Select from 'react-select'
import { CardHeader, CircularProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Grid as MaterialGrid } from "@mui/material";

import Navbar from "../Navbar/NavbarComponent";
import MobileNavbar from "../MobileNavbar/MobileNavbarComponent";

import Footer from "./Footer";
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as WatchListContext } from "../../context/WatchListContext";

import './style.css'

export default function Index() {
  const {
    state: { token },
    getUser,
  } = React.useContext(AuthContext);
  const {
    state: { errorMessage, isLoading },
    listTrades,
  } = React.useContext(WatchListContext);

  async function loadData () {
    const response = await listTrades({ token, ticker, sortDirection, limit, sortBy });
    // console.log(response);
    if (response) {
      // console.log(response);
      prepareData(response);
    }
  }
  
  const getRealTimeData = () => {
    let currentIntervalId = setInterval(() => {
      loadData();
    }, 50000)
    setIntervalId(currentIntervalId);
  }

  React.useEffect(() => {
    loadData();
    getRealTimeData();
  }, [])


  const [intervalId, setIntervalId] = React.useState(0);


  const [stateTrades, setStateTrades] = React.useState([]);
  const [ticker, setTicker] = React.useState("");
  const [sortDirection, setSortDirection] = React.useState("ASC");
  const [limit, setLimit] = React.useState(1000);
  const [sortBy, setSortBy] = React.useState("TIME");

  
  const [dataLoaded, setDataLoaded] = React.useState(true);
  
  const history = useHistory();
  const goToPage = React.useCallback((page) => history.push(`/${page}`), [history]);
  

  const sortByList = [
    { value: 'TICKER', label: 'Ticker' },
    { value: 'SIZE', label: 'Size' },
    { value: 'PRICE', label: 'Price' },
    { value: 'TIME', label: 'Time' },
  ];

  const sortDirectionList = [
    { value: 'ASC', label: 'Ascending' },
    { value: 'DESC', label: 'Descending' },
  ];

  const [premiumSubcription, setPremiumSubscription] = React.useState(false);
  const [standardSubcription, setStandardSubscription] = React.useState(false);
  const [freeSubcription, setFreeSubscription] = React.useState(false);

  React.useEffect(() => {
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


  const prepareData = (data) => {
    let trades = data;
    trades.forEach(item => {
      let conditions = [];
      item.conditions.forEach((item, index, array) => {
        let condition = ''
        if (array.length > 1 && index === 0) {
          condition += '1) ';
        }
        if (index !== 0) {
          condition += (index+1) + ') ';
        }
        condition += item.title + ': ' + item.description;
        conditions.push(condition);
      });
      let conditionString = conditions.join('; ');
      item.conditions = conditionString;
    });
    // console.log(trades)
    setStateTrades(trades);
  };

  const updateData = () => {
    clearInterval(intervalId);
    loadData();
    getRealTimeData();
  }

  // responsive columns on window resize  
  const columns = document.getElementsByClassName('k-header');
  const [columnWidth, setColumnWidth] = React.useState((window.innerWidth)/columns.length);
  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);
  const handleResize = () => {
    if (window.innerWidth < 1000) {
      setColumnWidth('150px');
    }
    else {
      setColumnWidth(((window.innerWidth)/columns.length) + 'px');
    }
  }
  const setWidth = () => {
    return columnWidth;
  }




  const initialDataState = {
    skip: 0,
    take: 10,
  };
  const [page, setPage] = React.useState(initialDataState);
  const pageChange = (event) => {
    setPage(event.page);
  };


  const handleOptionSortByChange = (selectedOption) => {
    setSortBy(selectedOption.value);
    // loadData();
  }
  const handleOptionSortDirectionChange = (selectedOption) => {
    setSortDirection(selectedOption.value);
    // loadData();
  }



  return (
    <>
      <Box>
        <Navbar />
      </Box>
      <Box>
        <MobileNavbar />
      </Box>

      {premiumSubcription ? 
      <div className="watchlist-page-content page-content">
        {errorMessage ? (
          <h4 style={{ color: "red", textAlign: "center" }}>{errorMessage}</h4>
        ) : null}
        <div className="options-block">
          <Box className="filter-option">
            <Box className="filter-option-name">Sort by</Box>
            <Select options={sortByList} onChange={handleOptionSortByChange} />
          </Box>
          <Box className="filter-option">
            <Box className="filter-option-name">Sort direction</Box>
            <Select
              options={sortDirectionList}
              onChange={handleOptionSortDirectionChange}
            />
          </Box>
          <Button
            className="primary-btn-color default-btn-hover default-button entry-close-btn"
            onClick={updateData}
          >
            APPLY FILTERS
          </Button>
        </div>
        {Object.keys(stateTrades).length === 0 ? (
          <Box my={5} mb={5}>
            <Box className="grid-loading-panel">
              <Box className="spinner-loader"></Box>
            </Box>
          </Box>
        ) : (
          <>
            <div>
              <Box my={3} mb={15}>
                <Grid
                  style={{
                    textAlign: "justify",
                    fontSize: ".9rem",
                    width: "100%",
                    height: "100%",
                  }}
                  data={stateTrades.slice(page.skip, page.take + page.skip)}
                  skip={page.skip}
                  take={page.take}
                  total={stateTrades.length}
                  pageable={true}
                  onPageChange={pageChange}
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
                  {/* <Column 
                field="exchangeID" 
                title="Exchange ID" 
                filterable={false} 
                editable={false} 
                width={setWidth()}
              />
              <Column 
                field="tradeID" 
                title="Trade ID" 
                filterable={false} 
                editable={false} 
                width={setWidth()}
              /> */}
                  <Column
                    field="ticker"
                    title="Ticker"
                    filterable={false}
                    editable={false}
                    width={setWidth()}
                    // width="100px"
                  />
                  <Column
                    field="price"
                    title="Price $"
                    filterable={false}
                    editable={false}
                    width={setWidth()}
                    // width="150px"
                  />
                  <Column
                    field="size"
                    title="Size"
                    filterable={false}
                    editable={false}
                    width={setWidth()}
                    // width="125px"
                  />
                  <Column
                    field="tape"
                    title="Tape"
                    filterable={false}
                    editable={false}
                    width={setWidth()}
                    // width="100px"
                  />
                  <Column
                    field="time"
                    title="Time"
                    filterable={false}
                    editable={false}
                    width={setWidth()}
                    // width="150px"
                  />
                  <Column
                    field="isSSR"
                    title="is SSR"
                    filterable={false}
                    editable={false}
                    width={setWidth()}
                    // width="100px"
                  />
                  <Column
                    field="conditions"
                    title="Conditions"
                    filterable={false}
                    editable={false}
                    // width={setWidth()}
                    width="750px"
                  />
                </Grid>
              </Box>
            </div>
          </>
        )}
      </div>
            : <Box className="permission-warning-block">
            <Box className="permission-warning">You don't have permissions to view this page</Box>
            <Button
                    className="primary-btn-color default-btn-hover default-button entry-close-btn"
                    onClick={() => {
                        goToPage('subscription');
                      }
                    }
                  >
                    Upgrade subscription
                  </Button>
              </Box>
          }
      <Footer />
    </>
  );
}

