import React, { useContext } from "react";
import Navbar from "../Dashboard/navbar";
import { Box } from "@mui/system";
import { Grid, GridColumn as Column, GridToolbar } from "@progress/kendo-react-grid";
import Footer from "./Footer";
import { process } from "@progress/kendo-data-query";
import { filterBy } from "@progress/kendo-data-query";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { MyCommandCell } from "./myCommandCell";
import { DateRangeFilter } from "../filters/DateRangeFilter";

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

  const [filter, setFilter] = React.useState([]);

  const [dateRange, setDateRange] = React.useState({ minDateFilter: null, maxDateFilter: null });

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

  const filterChange = (event) => {
    console.log(event);
    // setFilter({ ...event.filter });
  };
  const handleClearDateFilter = () => {
    let currentFilters = { ...filter };
    let newFilter = currentFilters.filters.filter((filter) => {
      return filter.field !== "createdAt";
    });
    currentFilters.filters = newFilter;
    setDateRange({ minDateFilter: null, maxDateFilter: null });
    setFilter({ ...currentFilters });
  };

  const handleDateFilterChange = (event) => {
    let currentFilters = { ...filter };

    if (event.operator === "gt") {
      setDateRange({ ...dateRange, minDateFilter: event.value });
    } else {
      setDateRange({ ...dateRange, maxDateFilter: event.value });
    }
    if (currentFilters.filters) {
      let newFilter = currentFilters.filters.filter((filter) => {
        return !(filter.field === "createdAt" && filter.operator === event.operator);
      });
      currentFilters.filters = newFilter;
      currentFilters.filters.push({
        field: "createdAt",
        operator: event.operator,
        value: event.value,
      });
    } else {
      currentFilters.filters = [];
      currentFilters.logic = "and";
      currentFilters.filters.push({
        field: "createdAt",
        operator: event.operator,
        value: event.value,
      });
    }
    setFilter({ ...currentFilters });
  };

  const MyDateFilterCell = (props) => (
    <DateRangeFilter
      {...props}
      min={dateRange.minDateFilter}
      max={dateRange.maxDateFilter}
      onDateFilterChange={handleDateFilterChange}
      onDateFilterClear={handleClearDateFilter}
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
      dataItem.strategy &&
      !isNaN(dataItem.stopLoss)
    ) {
      const newData = insertItem(data, dataItem);
      setData([...newData]);

      const isSucess = await createJournal({
        token,
        quantity: parseInt(dataItem.quantity),
        buyPrice: parseFloat(dataItem.buyPrice),
        priceTargets: [parseFloat(dataItem.priceTargets)],
        ticker: dataItem.ticker,
        stopLoss: parseFloat(dataItem.stopLoss),
        strategy: dataItem.strategy,
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
          // filter={filter}
          // onFilterChange={filterChange}
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
              Add new
            </Button>
          </GridToolbar>
          <Column cell={CommandCell} width="180px" filterable={false} />

          <Column
            field="createdAt"
            title="Created At"
            editor="date"
            filter="date"
            cell={CustomDate}
            width={300}
            filterCell={MyDateFilterCell}
            filter="date"
            filterable={true}
            editable={false}
          />
          <Column field="ticker" title="Ticker" filterable={true} filter="text" editable={true} />
          <Column field="quantity" title="Qty" filterable={false} editable={true} />
          <Column
            field="buyPrice"
            title="Avg Price $"
            filterable={false}
            filter="numeric"
            editable={true}
          />
          <Column field="stopLoss" title="Stop Loss $" filterable={false} editable={true} />
          <Column field="priceTargets" title="Price Target $" filterable={false} editable={true} />
          <Column
            field="tradeRisk"
            title="Risk $"
            editable={false}
            filterable={false}
            width="100px"
          />
          <Column
            field="tradeReward"
            title="Reward $"
            editable={false}
            filterable={false}
            filter="numeric"
          />
          <Column field="profitLossPercentage" title="P/L %" editable={false} filterable={false} />
          <Column
            field="tradeStatus"
            title="Status"
            width="100px"
            editable={false}
            filterable={false}
          />
          <Column
            field="sellPrice"
            title="Sell Price $"
            editor="numeric"
            filterable={false}
            editable={setEditable()}
          />
          <Column
            field="updatedAt"
            title="Updated At"
            editor="date"
            format="{0:d}"
            cell={CustomDate}
            filterable={false}
            editable={false}
          />
          <Column
            field="sellDate"
            title="Sell Date"
            editor="date"
            format="{0:d}"
            cell={CustomDate}
            filterable={true}
            filter="date"
            editable={false}
          />
          <Column
            field="strategy"
            title="Strategy"
            width="150px"
            editable={true}
            filterable={false}
          />
        </Grid>
      </Box>

      <Footer />
    </div>
  );
}
