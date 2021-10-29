import * as React from "react";
import { LinearGauge } from "@progress/kendo-react-gauges";

export const LinearGaugeComponent = (props) => {
  const { watchList } = props;

  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setValue(watchList.buyPrice);
    }, 0);
  }, []);

  const linearOptions = {
    value: value,
    shape: "arrow",
    scale: {
      minorUnit: 5,
      majorUnit: 20,
      max: watchList.sma200,
      ranges: [
        {
          from: 0,
          to: watchList.sma20,
          color: "#ffc700",
        },
        {
          from: watchList.sma20,
          to: watchList.sma200,
          color: "#ff7a00",
        },
      ],
    },
  };

  return <LinearGauge {...linearOptions} />;
};