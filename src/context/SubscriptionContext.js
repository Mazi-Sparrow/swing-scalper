// import * as Google from "expo-google-app-auth";

import { gql } from "graphql-request";

import createDataContext from "./createDataContext";
import { client as graphqlClient } from "../api/axios";

const subscriptionReducers = (state, action) => {
  switch (action.type) {
    case "add_checkout_url":
      return {
        ...state,
        checkoutUrl: action.payload,
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

const createCheckout =
  (dispatch) =>
  async ({ token, planId }) => {
    try {
      const response = await graphqlClient.request(
        gql`
          mutation createCheckout($plan: String!) {
            createCheckout(plan: $plan) {
              success
              errors
              url
            }
          }
        `,
        { plan: planId },
        { Authorization: `Bearer ${token}` }
      );

      if (
        !response.createCheckout.success &&
        response.createCheckout.errors &&
        response.createCheckout.errors[0]
      ) {
        dispatch({
          type: "add_error",
          payload: response.createCheckout.errors[0],
        });

        return false;
      }

      if (response.createCheckout.success && !response.createCheckout.errors) {
        dispatch({
          type: "add_checkout_url",
          payload: response.createCheckout.url,
        });
        return response.createCheckout.url;
      }
      return false;
    } catch (error) {
      console.log(error);
      dispatch({
        type: "add_error",
        payload: "Invalid Request",
      });
    }
  };

const confirmCheckout =
  (dispatch) =>
  async ({ token, id }) => {
    try {
      const response = await graphqlClient.request(
        gql`
          mutation confirmCheckout($id: String!) {
            confirmCheckout(id: $id) {
              success
              errors
            }
          }
        `,
        { id },
        { Authorization: `Bearer ${token}` }
      );

      if (
        !response.confirmCheckout.success &&
        response.confirmCheckout.errors &&
        response.confirmCheckout.errors[0]
      ) {
        dispatch({
          type: "add_error",
          payload: response.confirmCheckout.errors[0],
        });

        return false;
      }

      if (response.confirmCheckout.success && !response.confirmCheckout.errors) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      dispatch({
        type: "add_error",
        payload: "Invalid Request",
      });
    }
  };

export const { Context, Provider } = createDataContext(
  subscriptionReducers,
  { createCheckout, confirmCheckout },
  { checkoutUrl: null, errorMessage: "", isLoading: false }
);
