import React from "react";
import Navbar from "../Dashboard/navbar";
import { Box } from "@mui/system";
import Footer from "./Footer";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
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
  const [dataState, setDataState] = React.useState(initialDataState);

  return (
    <div>
      <Navbar />
      <div style={{ height: "80vh" }}></div>
      <Footer />
    </div>
  );
}
