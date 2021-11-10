import React, { useContext } from "react";
import Navbar from "../Navbar/NavbarComponent";
import MobileNavbar from "../MobileNavbar/MobileNavbarComponent";
import { Box } from "@mui/system";
import { Grid, GridColumn as Column, GridToolbar } from "@progress/kendo-react-grid";
import Footer from "./Footer";
import { process } from "@progress/kendo-data-query";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { MyCommandCell } from "./myCommandCell";
import { CustomDate } from "./CutomDate";
import { insertItem, getItems, updateItem, deleteItem } from "./services";
import { Context as JournalContext } from "../../context/JournalContext";
import { Context as AuthContext } from "../../context/AuthContext";
import './style.css';

const initialDataState = {
  sort: [
    {
      field: "code",
      dir: "asc",
    },
  ],
  take: 20,
  skip: 0,
};
export default function Index() {
  const {
    state: { token },
  } = React.useContext(AuthContext);
  const {
    listJournals,
    updateJournal,
    createJournal,
    state: { journals, errorMessage },
  } = React.useContext(JournalContext);

  const editField = "inEdit";
  const [editedRecord, setEditedRecord] = React.useState(null);
  const [data, setData] = React.useState(journals);
  const [dataState, setDataState] = React.useState(initialDataState);

  React.useEffect(() => {
    let isMounted = true;
    listJournals({ token }).then((res) => {
      if (isMounted) setData(res);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const CommandCell = (props) => (
    <MyCommandCell
      {...props}
      edit={enterEdit}
      remove={remove}
      add={add}
      discard={discard}
      update={update}
      cancel={cancel}
      editField={editField}
    />
  );

  const remove = (dataItem) => {
    const newData = deleteItem(data, dataItem);
    setData(newData);
  };

  const add = async (dataItem) => {
    dataItem.inEdit = true;

    if (
      !isNaN(dataItem.buyPrice) &&
      !isNaN(dataItem.priceTargets) &&
      !isNaN(dataItem.quantity) &&
      dataItem.ticker &&
      !isNaN(dataItem.stopLoss)
    ) {
      const newData = insertItem(data, dataItem);
      setData([...newData]);

      const isSuccess = await createJournal({
        token,
        quantity: parseInt(dataItem.quantity),
        buyPrice: parseFloat(dataItem.buyPrice),
        priceTargets: [parseFloat(dataItem.priceTargets)],
        ticker: dataItem.ticker,
        stopLoss: parseFloat(dataItem.stopLoss),
      });
    }

    listJournals({ token }).then((res) => {
      setData(res);
    });
  };

  const update = async (dataItem) => {
    dataItem.inEdit = false;
    const newData = updateItem(data, dataItem);

    if (dataItem.sellPrice && dataItem.id) {
      const isUpdated = await updateJournal({
        id: dataItem.id,
        sellPrice: dataItem.sellPrice,
        token,
      });
    }

    setData(newData);
  };

  const discard = (dataItem) => {
    const newData = [...data];
    newData.splice(0, 1);
    setData(newData);
  };

  const cancel = (dataItem) => {
    dataItem.inEdit = false;
    const originalItem = getItems(data).find((p) => p.id === dataItem.id);
    const newData = data.map((item) => (item.id === originalItem.id ? originalItem : item));
    setData([...newData]);
  };

  const enterEdit = (dataItem) => {
    setEditedRecord({ ...dataItem });
    let newData = data.map((item) => {
      if (item.id === dataItem.id) {
        return { ...item, inEdit: true };
      } else return item;
    });

    setData(newData);
  };

  const itemChange = (event) => {
    const field = event.field || "";
    const newData = data.map((item) =>
      item.id === event.dataItem.id ? { ...item, [field]: event.value } : item
    );
    setData(newData);
  };

  const addNew = () => {
    const newDataItem = {
      inEdit: true,
      Discontinued: false,
    };

    setData([newDataItem, ...data]);
  };

  const updateData = () => {
    listJournals({ token }).then((res) => {
      setData(res);
    });
  }

  const setEditable = () => {
    return editedRecord && editedRecord.tradeStatus === "Open";
  };

  // responsive columns on window resize
  const [columnWidth, setColumnWidth] = React.useState((window.innerWidth - 530)/9);

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  const handleResize = () => {
    if (((window.innerWidth - 530)/9) > 100) {
      setColumnWidth(((window.innerWidth - 530)/9) + 'px');
    }
    else {
      setColumnWidth('100px');
    }
  }

  const setWidth = () => {
    return columnWidth;
  }

  const [page, setPage] = React.useState(initialDataState);

  const pageChange = (event) => {
    setPage(event.page);
  };

  return (
    <div>
      <Box>
        <Navbar />
      </Box>
      <Box>
        <MobileNavbar />
      </Box>

      <Box className="journal-page-content page-content" my={12} mb={15}>
        {errorMessage ? <Typography style={{ color: "red" }}>{errorMessage}</Typography> : null}
        <Grid
          pageable={true}
          skip={page.skip}
          take={page.take}
          onPageChange={pageChange}
          total={data.length}
          sortable={true}
          style={{
            textAlign: "justify",
            fontSize: ".9rem",
            height: "100%",
            width: "100%",
          }}
          data={data.slice(page.skip, page.take + page.skip)}
          
          onDataStateChange={(e) => {
            setDataState(e.dataState);
          }}
          onItemChange={itemChange}
          editField={editField}
          dataItemKey={"id"}
        >
          <GridToolbar>
            <Button
              title="Add new"
              className="k-primary k-button k-grid-edit-command"
              style={{ padding: "5px 10px" }}
              onClick={addNew}
            >
              New Trade
            </Button>
            <Button
              title="Add new"
              className="k-primary k-button k-grid-edit-command"
              style={{ padding: "5px 10px" }}
              onClick={updateData}
            >
              Refresh
            </Button>
          </GridToolbar>
          <Column
            cell={CommandCell}
            filterable={false}
            width="100px"
          />

          <Column
            field="createdAt"
            title="OPENED"
            cell={CustomDate}
            filterable={false}
            editable={false}
            width="150px"
          />
          <Column
            field="ticker"
            title="TICKER"
            filterable={false}
            filter="text"
            editable={true}
            width={setWidth()}
          />
          <Column
            field="quantity"
            title="QTY"
            filterable={false}
            editable={true}
            width={setWidth()}
          />
          <Column
            field="buyPrice"
            title="BUY PRICE"
            format="{0:c}"
            filterable={false}
            editable={true}
            width={setWidth()}
          />
          <Column
            field="stopLoss"
            title="S/LOSS"
            format="{0:c}"
            filterable={false}
            editable={true}
            width={setWidth()}
          />
          <Column
            field="priceTargets"
            title="P/TARGET"
            format="{0:c}"
            filterable={false}
            editable={true}
            width={setWidth()}
          />
          <Column
            field="tradeRisk"
            title="RISK"
            format="{0:c}"
            filterable={false}
            editable={false}
            width={setWidth()}
          />
          <Column
            field="tradeReward"
            title="REWARD"
            format="{0:c}"
            filterable={false}
            editable={false}
            width={setWidth()}
          />
          <Column
            field="profitLossPercentage"
            title="P/L"
            format="{0:#.00\%}"
            filterable={false}
            editable={false}
            width={setWidth()}
          />
          <Column
            field="tradeStatus"
            title="STATUS"
            filterable={false}
            editable={false}
            width="80px"
          />
          <Column
            field="sellPrice"
            title="SELL PRICE"
            editor="numeric"
            format="{0:c}"
            filterable={false}
            editable={setEditable()}
            width={setWidth()}
          />
          <Column
            field="updatedAt"
            title="CLOSED"
            editor="date"
            format="{0:d}"
            cell={CustomDate}
            filterable={false}
            editable={false}
            width="150px"
          />
        </Grid>
      </Box>

      <Footer />
    </div>
  );
}
