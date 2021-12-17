// import * as Google from "expo-google-app-auth";

import { gql } from "graphql-request";

import createDataContext from "./createDataContext";
import { client as graphqlClient } from "../api/axios";

const watchListReducers = (state, action) => {
  switch (action.type) {
    case "add_watchList":
      return {
        ...state,
        errorMessage: "",
        isLoading: false,
        watchList: action.payload,
      };

    case "add_loading":
      return {
        ...state,
        isLoading: true,
      };

    case "remove_loading":
      return {
        ...state,
        isLoading: false,
      };
    case "add_error":
      return { ...state, errorMessage: action.payload };

    case "clear_errorMessage":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const getAnalyzer =
  (dispatch) =>
  async ({ token, ticker }) => {
    try {
      dispatch({ type: "add_loading" });
      const response = await graphqlClient.request(
        gql`
          query getAnalyzer($ticker: String!) {
            getAnalyzer(ticker: $ticker) {
              success
              errors
              id
              buyTrigger
              currentPrice
              priceTargets
              buyZone
              ticker
              stopLoss
              tradeRisk
              tradeReward
              buyTrigger
              sma20
              sma200
              rsi14
              averageVolume
              open
              previousClose
              priceChange
              volume
              averageVolume
              vwap
              high
              low
              news {
                title
                url
                image
                description
              }
              company {
                name
                logo
              }
            }
          }
        `,
        { ticker },
        { Authorization: `Bearer ${token}` }
      );
      dispatch({ type: "remove_loading" });
      if (response.getAnalyzer && response.getAnalyzer.success && !response.getAnalyzer.errors) {
        dispatch({ action: "add_watchList", payload: response.getAnalyzer });
        dispatch({ type: "clear_errorMessage" });
        return response.getAnalyzer;
      }
      return false;
    } catch (error) {
      dispatch({ type: "remove_loading" });

      dispatch({
        type: "add_error",
        payload: `Invalid Request`,
      });
    }
  };

  const listWatchlist =
  (dispatch) =>
  async ({ token }) => {
    try {
      dispatch({ type: "add_loading" });
      const response = await graphqlClient.request(
        gql`
          query listWatchlist {
            listWatchlist {
              items {
                company {
                  name
                  logo
                }
                currentPrice
                buyTrigger
                buyZone
                tradeReward
                tradeRisk
                ticker
              }
              errors
              success
            }
          }
        `,
        {},
        { Authorization: `Bearer ${token}` }
      );
      dispatch({ type: "remove_loading" });
      console.log(response);
      if (response.listWatchlist) {
        dispatch({ action: "add_watchList", payload: response.listWatchlist });
        dispatch({ type: "clear_errorMessage" });
        return response.listWatchlist;
      }
      return false;
    } catch (error) {
      dispatch({ type: "remove_loading" });

      dispatch({
        type: "add_error",
        payload: `Invalid Request`,
      });
    }
  };


const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_errorMessage" });
};

const listTrades =
  (dispatch) =>
  async ({ token, ticker, sortDirection, limit, sortBy }) => {
    try {
      dispatch({ type: "add_loading" });
      const response = await graphqlClient.request(
        gql`
          query listTrades($ticker: String!, $sortDirection: ModelSortDirection!, $limit: Int!, $sortBy: ModelTradeSort!) {
            listTrades (
                ticker: $ticker,
                sortDirection: $sortDirection,
                limit: $limit, 
                sortBy: $sortBy
              ) {
                items {
                  ticker
                  exchangeID
                  tradeID
                  price
                  size
                  tape
                  time
                  isSSR
                  conditions {
                    title
                    description
                  }
                }
                success
                errors
            }
          }
        `,
        { ticker, sortDirection, limit, sortBy },
        { Authorization: `Bearer ${token}` }
      );
      dispatch({ type: "remove_loading" });
      if (response.listTrades && response.listTrades.success && !response.listTrades.errors) {
        dispatch({ action: "add_watchList", payload: response.listTrades });
        dispatch({ type: "clear_errorMessage" });
        return response.listTrades.items;
      }
      return false;
    } catch (error) {
      dispatch({ type: "remove_loading" });

      dispatch({
        type: "add_error",
        payload: `Invalid Request`,
      });
    }
  };

export const { Context, Provider } = createDataContext(
  watchListReducers,
  {
    clearErrorMessage,
    getAnalyzer,
    listWatchlist,
    listTrades,
  },
  { watchList: null, errorMessage: "", isLoading: false }
);
