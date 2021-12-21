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

  const verticalLinearOptions = {
    pointer: {
      value: watchList.buyPrice,
      shape: "arrow",
      color: "#9932cc",
    },
    scale: {
      minorUnit: 0,
      majorUnit: watchList.sma20,
      max: watchList.sma200 + 1,
      ranges: [
        {
          from: 0,
          to: watchList.sma20,
          color: "#ffc700",
        },
        {
          from: watchList.sma20,
          to: watchList.sma200,
          color: "#33cc33",
        },
        {
          from: watchList.sma200,
          to: watchList.sma200 + 1,
          color: "#c20000",
        },
      ],
    },
  };

  return (
    <div className="row">
      <div className="col-sm-12 col-md-6">
        <LinearGauge {...verticalLinearOptions} />
      </div>
    </div>
  );
};
