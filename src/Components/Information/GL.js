import React, { useState, useContext, useEffect } from "react";
import {
    Box,
  } from "@mui/material";
import { Context as JournalContext } from "../../context/JournalContext";
import './gl-style.css';

export default function GL(props) {
  const { getLoser, getGainer } = useContext(JournalContext);
  
  const [data, setData] = useState([]);

  useEffect(() => {
      if (props.name === 'Gainer') {
          getGainer({}).then((res) => {
              setData(res);
          })
      } else if (props.name === 'Loser') {
          getLoser({}).then((res) => {
              setData(res);
          })
      }
  }, [])

    return (
      <Box className="GL-block">
        {Object.keys(data).length === 0 || data.length === 0 ? (
          <Box my={5} mb={5} textAlign="center">
            <Box className="grid-loading-panel">
              <Box className="spinner-loader"></Box>
            </Box>
          </Box>
        ) : (
          <>
            <Box className="GL-block-title">Top {props.name}</Box>
            {data.map((element, index) => {
              if (index < 5)
                return (
                  <Box className="GL-item">
                    <Box className="GL-ticker-name">{element.ticker}</Box>
                    <Box className="GL-current-price ">
                      ${element.currentPrice}
                    </Box>
                    <Box
                      className={
                        "GL-percentage " +
                        (element.percentage > 0
                          ? "positive-text"
                          : "negative-text")
                      }
                    >
                      {element.percentage > 0 ? "+" : ""}
                      {element.percentage}%
                    </Box>
                  </Box>
                );
            return null;
            })}
          </>
        )}
      </Box>
    );
}