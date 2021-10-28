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

const getWatchlist =
  (dispatch) =>
  async ({ token, ticker }) => {
    try {
      const response = await graphqlClient.request(
        gql`
          query getWatchlist($ticker: String!) {
            getWatchlist(ticker: $ticker) {
              success
              errors
              id
              buyTrigger
              buyPrice
              priceTargets
              buyZone
              ticker
              stopLoss
              buyTrigger
              sma20
              sma200
              rsi14
            }
          }
        `,
        { ticker },
        { Authorization: `Bearer ${token}` }
      );
      if (response.getWatchlist && response.getWatchlist.success && !response.getWatchlist.errors) {
        dispatch({ action: "add_watchList", payload: response.getWatchlist });
        dispatch({ type: "remove_loading" });
        dispatch({ type: "clear_errorMessage" });
        return response.getWatchlist;
      }
      return false;
    } catch (error) {
      dispatch({
        type: "add_error",
        payload: `Error When Fetching Watch List with ticker ${ticker}`,
      });
      console.log(error);
    }
  };

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_errorMessage" });
};

export const { Context, Provider } = createDataContext(
  watchListReducers,
  {
    clearErrorMessage,
    getWatchlist,
  },
  { watchList: null, errorMessage: "", isLoading: true }
);
