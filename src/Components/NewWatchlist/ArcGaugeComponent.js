import * as React from "react";
import { ArcGauge } from "@progress/kendo-react-gauges";
const colors = [
  {
    to: 30,
    color: "#33cc33",
  },
  {
    from: 30,
    to: 80,
    color: "#33cc33",
  },
  {
    from: 80,
    to: 95,
    color: "#ffc700",
  },
  {
    from: 95,
    color: "#c20000",
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
    value: watchList.buyPrice,
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
