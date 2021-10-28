import React, { useContext } from "react";
import Navbar from "../Dashboard/navbar";
import { Box } from "@mui/system";
import Footer from "./Footer";
import { Grid, GridColumn as Column, GridToolbar } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { MyCommandCell } from "./myCommandCell";
import { CustomDate } from "./CutomDate";
import { insertItem, getItems, updateItem, deleteItem } from "./services";
import { Context as JournalContext } from "../../context/JournalContext";
import { Context as AuthContext } from "../../context/AuthContext";

const initialDataState = {
  sort: [
    {
      field: "code",
      dir: "asc",
    },
  ],
  take: 40,
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
      add={add}
      discard={discard}
      update={update}
      cancel={cancel}
      editField={editField}
    />
  );

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
      setData(newData);

      const isSucess = await createJournal({
        token,
        quantity: parseInt(dataItem.quantity),
        buyPrice: parseFloat(dataItem.buyPrice),
        priceTargets: [parseFloat(dataItem.priceTargets)],
        ticker: dataItem.ticker,
        stopLoss: parseFloat(dataItem.stopLoss),
      });
    }
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
      console.log(isUpdated);
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
      if (item.id == dataItem.id) {
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

  const setEditable = () => {
    return editedRecord && editedRecord.tradeStatus === "Open";
  };

  return (
    <div>
      <Navbar />

      <Box my={12} mb={15}>
        {errorMessage ? <Typography style={{ color: "red" }}>{errorMessage}</Typography> : null}
        <Grid
          pageable={true}
          sortable={true}
          filterable={true}
          style={{
            height: "100%",
            width: "100%",
          }}
          data={process(data, dataState)}
          onDataStateChange={(e) => {
            setDataState(e.dataState);
          }}
          onItemChange={itemChange}
          editField={editField}
          dataItemKey={"id"}
        >
          <GridToolbar>
            <Button title="Add new" className="k-primary k-button k-grid-edit-command" style={{ padding: "5px 10px" }} onClick={addNew} > New Trade </Button>
          </GridToolbar>
          <Column cell={CommandCell} width="80px" filterable={false} />
          <Column field="createdAt" title="Date Openned" editor="date" format="{0:d}" cell={CustomDate} width="150px" filterable={false} editable={false} />
          <Column field="ticker" title="Ticker" filterable={false} editable={true} />
          <Column field="quantity" title="Qty" editor="numeric" filterable={false} editable={true} sortable={false} filter="numeric" />
          <Column field="buyPrice" title="Avg Price $" filterable={false} editable={true} sortable={false} />
          <Column field="stopLoss" title="Stop Loss $" filterable={false} editable={true} sortable={false} />
          <Column field="priceTargets" title="Price Target $" filterable={false} editable={true} sortable={false} />
          <Column field="tradeRisk" title="Risk $" editable={false} filterable={false} sortable={false} />
          <Column field="tradeReward" title="Reward $" editable={false} filterable={false} sortable={false} />
          <Column field="profitLossPercentage" title="P/L %" editable={false} filterable={false} />
          <Column field="tradeStatus" title="Status" width="100px" editable={false} filterable={false} />
          <Column field="sellPrice" title="Sell Price $" filterable={false} editable={setEditable()} sortable={false} />
          <Column field="updatedAt" title="Date Sold" editor="date" format="{0:d}" cell={CustomDate} filterable={false} editable={false} width="150px" />
        </Grid>
      </Box>

      <Footer />
    </div>
  );
}
