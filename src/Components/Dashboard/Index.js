import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/NavbarComponent";
import MobileNavbar from "../MobileNavbar/MobileNavbarComponent";
import { Box } from "@mui/system";
import Footer from "./Footer";

import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
  ChartLegend,
  ChartValueAxis,
  ChartValueAxisItem,
} from "@progress/kendo-react-charts";
import "hammerjs";

import { Context as JournalContext } from "../../context/JournalContext";
import { Context as AuthContext } from "../../context/AuthContext";
import { dashboardValues } from "./utils";
const categories = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function Index() {
  const {
    state: { token },
  } = React.useContext(AuthContext);
  const { listJournals } = useContext(JournalContext);

  const [state, setState] = useState({
    loading: true,
    profitLossSum: 0,
    profit: 0,
    loss: 0,
    openTrades: 0,
    riskValues: [],
    rewardValues: [],
    profitLossValues: [],
    categories: [],
  });

  useEffect(() => {
    let isMounted = true;
    listJournals({ token }).then((res) => {
      if (isMounted) {
        const { profitLossSum, profit, loss, openTrades, riskValues, rewardValues, profitLossValues } = dashboardValues(res);

        const newCategories = [];
        const newRewards = [];
        const newRisks = [];
        const newProfitLossValues = [];

        for (let i = 0; i < 12; i++) {
          if (riskValues[i] > 0 || rewardValues > 0) {
            newCategories.push(categories[i]);
            newRewards.push(rewardValues[i]);
            newRisks.push(riskValues[i]);
          }
          newProfitLossValues.push(profitLossValues[i]);
        }

        setState({
          ...state,
          profitLossSum,
          profit,
          loss,
          openTrades,
          riskValues: newRisks,
          rewardValues: newRewards,
          profitLossValues: newProfitLossValues,
          categories: newCategories,
          loading: false,
        });
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const pieData = [
    {
      name: "LOSS",
      share: state.profitLossSum !== 0 ? state.loss / state.profitLossSum : 0,
    },
    {
      name: "PROFIT",
      share: state.profitLossSum !== 0 ? state.profit / state.profitLossSum : 0,
    },
  ];

  const series = [
    {
      name: "Risk",
      data: state.riskValues,
    },
    {
      name: "Reward",
      data: state.rewardValues,
    },
  ];

  const seriesProfitLoss = [
    {
      name: "Profit/Loss",
      data: state.profitLossValues,
    }
  ]

  return (
    <>
      {!state.loading ? (
        <div>
          <Box>
            <Navbar />
          </Box>
          <Box>
            <MobileNavbar />
          </Box>

          <Box my={10} mb={15}>
            <div className="ffflex">
              <div className="asdasd">
                <Chart
                  style={{
                    height: 350,
                  }}
                >
                  <ChartTitle text="PERFORMANCE" />
                  <ChartLegend position="top" orientation="horizontal" />

                  <ChartSeries>
                    <ChartSeriesItem
                      labels={{
                        visible: true,
                        padding: 3,
                        font: "bold 16px Arial, sans-serif",
                        format: "p",
                      }}
                      type="pie"
                      overlay={{
                        gradient: "sharpBevel",
                      }}
                      tooltip={{
                        visible: true,
                      }}
                      data={pieData}
                      categoryField="name"
                      field="share"
                    />
                  </ChartSeries>
                </Chart>
              </div>

              <div className="asdasd">
                <Chart
                  style={{
                    height: 350,
                  }}
                >
                  <ChartTitle text="RISK/REWARD" />
                  <ChartLegend position="top" orientation="horizontal" />

                  <ChartValueAxis>
                    <ChartValueAxisItem
                      labels={{
                        format: "c0",
                        padding: 3,
                        font: "bold 16px Arial, sans-serif",
                      }}
                    />
                  </ChartValueAxis>
                  <ChartCategoryAxis>
                    <ChartCategoryAxisItem categories={state.categories} startAngle={45} />
                  </ChartCategoryAxis>
                  <ChartSeries>
                    {series.map((item, idx) => (
                      <ChartSeriesItem
                        labels={{
                          visible: true,
                          padding: 3,
                          font: "bold 16px Arial, sans-serif",
                          format: "c2",
                        }}
                        key={idx}
                        type="column"
                        tooltip={{
                          visible: true,
                        }}
                        data={item.data}
                        name={item.name}
                      />
                    ))}
                  </ChartSeries>
                </Chart>
              </div>
            </div>

            <Chart
              style={{
                height: 350,
              }}
            >
              <ChartTitle text="P/L TREND LINE" />
              <ChartLegend position="top" orientation="horizontal" />
              <ChartValueAxis>
                <ChartValueAxisItem
                  labels={{
                    format: "c0",
                    padding: 3,
                    font: "bold 16px Arial, sans-serif",
                  }}
                />
              </ChartValueAxis>
              <ChartSeries>
                {seriesProfitLoss.map((item, idx) => (
                  <ChartSeriesItem
                    key={idx}
                    type="line"
                    tooltip={{
                      visible: true,
                    }}
                    data={item.data}
                    name={item.name}
                    labels={{
                      visible: true,
                      padding: 3,
                      font: "bold 16px Arial, sans-serif",
                      format: "c2",
                    }}
                  />
                ))}
              </ChartSeries>
            </Chart>
          </Box>
          <Footer />
        </div>
      ) : null}
    </>
  );
}
