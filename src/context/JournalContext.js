// import * as Google from "expo-google-app-auth";

import { gql } from "graphql-request";

import createDataContext from "./createDataContext";
import { client as graphqlClient } from "../api/axios";

const journalReducers = (state, action) => {
  switch (action.type) {
    case "list_journals":
      return {
        ...state,
        isLoading: false,
        errorMessage: "",
        journals: action.payload,
      };

    case "add_journals":
      return {
        ...state,
        isLoading: false,
        errorMessage: "",
        journals: [state.journals, ...action.payload],
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

const listJournals =
  (dispatch) =>
  async ({ token }) => {
    try {
      const response = await graphqlClient.request(
        gql`
          query listJournals {
            listJournals {
              items {
                id
                createdAt
                ticker
                quantity
                buyPrice
                sellPrice
                stopLoss
                priceTargets
                tradeRisk
                tradeReward
                profitLossPercentage
                tradeStatus
                updatedAt
                profitLoss
                news {
                  title
                  url
                  image
                  description
                }
              }
              success
              errors
            }
          }
        `,
        {},
        { Authorization: `Bearer ${token}` }
      );
      if (response.listJournals.success && !response.listJournals.errors) {
        dispatch({
          type: "list_journals",
          payload: response.listJournals.items,
        });
        return response.listJournals.items || [];
      } else if (response.listJournals.errors && response.listJournals.errors[0]) {
        dispatch({
          type: "add_error",
          payload: response.listJournals.errors[0],
        });
        return [];
      }
      return [];
    } catch (error) {
      console.log(error);
      dispatch({
        type: "add_error",
        payload: "Invalid Request",
      });
      return [];
    }
  };

const updateJournal =
  (dispatch) =>
  async ({ id, token, sellPrice }) => {
    try {
      const response = await graphqlClient.request(
        gql`
          mutation updateJournal($id: ID!, $sellPrice: Float!) {
            updateJournal(input: { id: $id, sellPrice: $sellPrice }) {
              success
              errors
            }
          }
        `,
        { id, sellPrice },
        { Authorization: `Bearer ${token}` }
      );

      if (
        !response.updateJournal.success &&
        response.updateJournal.errors &&
        response.updateJournal.errors[0]
      ) {
        dispatch({
          type: "add_error",
          payload: response.updateJournal.errors[0],
        });
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      dispatch({
        type: "add_error",
        payload: "Invalid Request",
      });
    }
  };

const createJournal =
  (dispatch) =>
  async ({ token, ticker, quantity, buyPrice, stopLoss, priceTargets }) => {
    try {
      const response = await graphqlClient.request(
        gql`
          mutation createJournal(
            $ticker: String!
            $quantity: Int!
            $buyPrice: Float!
            $priceTargets: [Float!]!
            $stopLoss: Float!
          ) {
            createJournal(
              input: {
                ticker: $ticker
                quantity: $quantity
                buyPrice: $buyPrice
                stopLoss: $stopLoss
                priceTargets: $priceTargets
              }
            ) {
              id
              errors
            }
          }
        `,
        { ticker, quantity, buyPrice, stopLoss, priceTargets },
        { Authorization: `Bearer ${token}` }
      );

      if (response.createJournal.errors && response.createJournal.errors[0]) {
        dispatch({
          type: "add_error",
          payload: response.createJournal.errors[0],
        });
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
      dispatch({
        type: "add_error",
        payload: "Invalid Request",
      });
    }
  };

  const deleteJournal =
    (dispatch) =>
    async ({ id, token }) => {
      try {
        const response = await graphqlClient.request(
          gql`
            mutation deleteJournal($id: String!) {
              deleteJournal(id: $id) {
                success
                errors
              }
            }
          `,
          { id },
          { Authorization: `Bearer ${token}` }
        );

        if (
          !response.deleteJournal.success &&
          response.deleteJournal.errors &&
          response.deleteJournal.errors[0]
        ) {
          dispatch({
            type: "add_error",
            payload: response.deleteJournal.errors[0],
          });
          return false;
        }
        return true;
      } catch (error) {
        console.log(error);
        dispatch({
          type: "add_error",
          payload: "Invalid Request",
        });
      }
    };

    const getNews =
    (dispatch) =>
    async ({ token, ticker, limit }) => {
      try {
        const response = await graphqlClient.request(
          gql`
            query getNews(
                $ticker: String!
                $limit: String!
              ) {
              getNews (
                  ticker: $ticker
                  limit: $limit
                ) {
                items {
                  title
                  url
                  image
                  description
                  published_at
                }
                success
                errors
              }
            }
          `,
          {ticker, limit},
        );
        if (response.getNews.success && !response.getNews.errors) {
          dispatch({
            type: "list_journals",
            payload: response.getNews.items,
          });
          return response.getNews.items || [];
        } else if (response.getNews.errors && response.getNews.errors[0]) {
          dispatch({
            type: "add_error",
            payload: response.getNews.errors[0],
          });
          return [];
        }
        return [];
      } catch (error) {
        console.log(error);
        dispatch({
          type: "add_error",
          payload: "Invalid Request",
        });
        return [];
      }
    };

    const getGainer =
    (dispatch) =>
    async () => {
      try {
        const response = await graphqlClient.request(
          gql`
            query getGainer {
              getGainer{
                items {
                  percentage
                  currentPrice
                  previousPrice
                  ticker
                }
                success
                errors
              }
            }
          `,
          {},
        );
        if (response.getGainer.success && !response.getGainer.errors) {
          dispatch({
            type: "list_journals",
            payload: response.getGainer.items,
          });
          return response.getGainer.items || [];
        } else if (response.getGainer.errors && response.getGainer.errors[0]) {
          dispatch({
            type: "add_error",
            payload: response.getGainer.errors[0],
          });
          return [];
        }
        return [];
      } catch (error) {
        console.log(error);
        dispatch({
          type: "add_error",
          payload: "Invalid Request",
        });
        return [];
      }
    };
    
    const getLoser =
    (dispatch) =>
    async () => {
      try {
        const response = await graphqlClient.request(
          gql`
            query getLoser {
              getLoser{
                items {
                  percentage
                  currentPrice
                  previousPrice
                  ticker
                }
                success
                errors
              }
            }
          `,
          {},
        );
        if (response.getLoser.success && !response.getLoser.errors) {
          dispatch({
            type: "list_journals",
            payload: response.getLoser.items,
          });
          return response.getLoser.items || [];
        } else if (response.getLoser.errors && response.getLoser.errors[0]) {
          dispatch({
            type: "add_error",
            payload: response.getLoser.errors[0],
          });
          return [];
        }
        return [];
      } catch (error) {
        console.log(error);
        dispatch({
          type: "add_error",
          payload: "Invalid Request",
        });
        return [];
      }
    };
    

export const { Context, Provider } = createDataContext(
  journalReducers,
  { listJournals, updateJournal, createJournal, deleteJournal, getNews, getGainer, getLoser },
  { journals: [], errorMessage: "", isLoading: false }
);
