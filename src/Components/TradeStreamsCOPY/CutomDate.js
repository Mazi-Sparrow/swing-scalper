import * as React from "react";
import moment from "moment";

export const CustomDate = (props) => {
  if (props.dataItem[props.field] && props.dataItem[props.field] !== "") {
    return <td>{moment(props.dataItem[props.field]).format("MM/DD/YYYY")}</td>;
  }
  return <td>{props.dataItem[props.field]}</td>;
};
