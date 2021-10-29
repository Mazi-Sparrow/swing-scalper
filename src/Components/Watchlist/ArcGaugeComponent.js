import * as React from "react";
import { ArcGauge } from "@progress/kendo-react-gauges";
const colors = [
  {
    to: 25,
    color: "#0058e9",
  },
  {
    from: 25,
    to: 50,
    color: "#37b400",
  },
  {
    from: 50,
    to: 75,
    color: "#ffc000",
  },
  {
    from: 75,
    color: "#f31700",
  },
];

export const ArcGaugeComponent = (props) => {
  const { watchList } = props;

  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setValue(watchList.buyPrice);
    }, 0);
  }, []);

  const arcOptions = {
    value: value,
    colors,
  };

  const arcCenterRenderer = (value, color) => {
    return (
      <h3
        style={{
          color: color,
        }}
      >
        {value}%
      </h3>
    );
  };

  return <ArcGauge {...arcOptions} arcCenterRender={arcCenterRenderer} />;
};
