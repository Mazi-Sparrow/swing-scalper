// import * as Google from "expo-google-app-auth";

import { gql } from "graphql-request";

import createDataContext from "./createDataContext";
import { client as graphqlClient } from "../api/axios";

const contactUsReducers = (state, action) => {
  switch (action.type) {
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

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_errorMessage" });
};

const contactUs =
  (dispatch) =>
  async ({ token, title, message }) => {
    try {
      dispatch({
        type: "add_loading",
      });
      const email = await localStorage.getItem("email");

      const response = await graphqlClient.request(
        gql`
          mutation contactUs($email: String!, $title: String!, $message: String!) {
            contactUs(input: { email: $email, title: $title, message: $message }) {
              success
              errors
            }
          }
        `,
        { email, title, message },
        { Authorization: `Bearer ${token}` }
      );

      dispatch({
        type: "remove_loading",
      });

      if (
        !response.contactUs.success &&
        response.contactUs.errors &&
        response.contactUs.errors[0]
      ) {
        dispatch({
          type: "add_error",
          payload: response.contactUs.errors[0],
        });

        return false;
      }

      if (response.contactUs.success && !response.contactUs.errors) {
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
  contactUsReducers,
  { contactUs, clearErrorMessage },
  { errorMessage: "", isLoading: false }
);
