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
import { Context as AuthContext } from "../../context/AuthContext";
import { Context as WatchListContext } from "../../context/WatchListContext";

export default function Index() {
  const {
    state: { token },
  } = React.useContext(AuthContext);
  const {
    state: { errorMessage, isLoading },
    listTrades,
  } = React.useContext(WatchListContext);


  const [stateTrades, setStateTrades] = React.useState([]);
  const [ticker, setTicker] = React.useState("");
  const [sortDirection, setSortDirection] = React.useState("ASC");
  const [limit, setLimit] = React.useState(20);
  const [sortBy, setSortBy] = React.useState("TIME");


  const handleSearch = async () => {
    const response = await listTrades({ token, ticker, sortDirection, limit, sortBy});
    if (response) {
      let trades = response;
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
      setStateTrades(trades);
    }
  };



  // responsive columns on window resize  
  const columns = document.getElementsByClassName('k-header');
  const [columnWidth, setColumnWidth] = React.useState((window.innerWidth+3800)/columns.length);
  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);
  const handleResize = () => {
    if ((window.innerWidth/columns.length) > 100) {
      setColumnWidth(((window.innerWidth+3800)/columns.length) + 'px');
    }
    else {
      setColumnWidth('100px');
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
              data={stateTrades.slice(page.skip, page.take + page.skip)}
              skip={page.skip}
              take={page.take}
              total={stateTrades.length}
              pageable={true}
              onPageChange={pageChange}
            >
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
                field="price"
                title="Price $"
                filterable={false}
                editable={false}
                // width={setWidth()}
                width="150px"
              />
              <Column 
                field="size" 
                title="Size" 
                filterable={false} 
                editable={false}
                // width={setWidth()}
                width="125px"
              />
              <Column 
                field="tape" 
                title="Tape" 
                filterable={false} 
                editable={false} 
                // width={setWidth()}
                width="100px"
              />
              <Column 
                field="time" 
                title="Time" 
                filterable={false} 
                editable={false} 
                // width={setWidth()}
                width="150px"
              />
              <Column 
                field="isSSR" 
                title="is SSR"  
                filterable={false} 
                editable={false} 
                // width={setWidth()}
                width="100px"
              />
              <Column 
                field="conditions" 
                title="Conditions" 
                filterable={false} 
                editable={false}
                // width={setWidth()}
                width="850px"
              />
            </Grid>
          </Box>
        </div>
      </div>
      <Footer />
    </>
  );
}

