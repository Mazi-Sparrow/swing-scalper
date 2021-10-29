import * as React from "react";
import { RadialGauge } from "@progress/kendo-react-gauges";

export const RadialGaugeComponent = () => {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    setInterval(() => {
      setValue(Math.ceil(Math.random() * 100));
    }, 1000);
  }, []);
  const radialOptions = {
    value: value,
    shape: "arrow",
    scale: {
      minorUnit: 0,
      majorUnit: 20,
      max: 100,
      ranges: [
        {
          from: 0,
          to: 15,
          color: "#c20000",
        },
        {
          from: 15,
          to: 30,
          color: "#ffc700",
        },
        {
          from: 30,
          to: 70,
          color: "#33cc33",
        },
        {
          from: 70,
          to: 85,
          color: "#ffc700",
        },
        {
          from: 85,
          to: 100,
          color: "#c20000",
        },
      ],
    },
  };
  return <RadialGauge {...radialOptions} />;
};
