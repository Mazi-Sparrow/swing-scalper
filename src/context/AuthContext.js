// import * as Google from "expo-google-app-auth";

import { gql } from "graphql-request";

import createDataContext from "./createDataContext";
import { client as graphqlClient } from "../api/axios";

const authReducers = (state, action) => {
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

    case "signin":
      return {
        ...state,
        errorMessage: "",
        token: action.payload.token,
        email: action.payload.email,
        refreshToken: action.payload.refreshToken,
      };
    case "set_token":
      return { ...state, token: action.payload };

    case "logout":
      return { ...state, errorMessage: "", token: null, refreshToken: null, email: null };

    case "clear_errorMessage":
      return { ...state, errorMessage: "" };
    default:
      return state;
  }
};

const signin = (dispatch) => async (username, password) => {
  try {
    const response = await graphqlClient.request(
      gql`
        query login($username: String!, $password: String!) {
          logIn(username: $username, password: $password) {
            expiresIn
            expiresAt
            idToken
            refreshToken
            success
            errors
          }
        }
      `,
      { username: username, password },
      {}
    );

    dispatch({ type: "remove_loading" });

    if (!response.logIn.success && response.logIn.errors && response.logIn.errors[0]) {
      dispatch({
        type: "add_error",
        payload: response.logIn.errors[0],
      });
    }
    if (!response.logIn.errors && response.logIn.idToken) {
      dispatch({
        type: "signin",
        payload: { token: response.logIn.idToken, refreshToken: response.logIn.idToken },
      });
      await Promise.all([
        localStorage.setItem("token", response.logIn.idToken),
        localStorage.setItem("refreshToken", response.logIn.refreshToken),
        localStorage.setItem("email", username),
        localStorage.setItem("expiresAt", response.logIn.expiresAt),
      ]);
    }
  } catch (error) {
    dispatch({ type: "remove_loading" });
    dispatch({
      type: "add_error",
      payload: "Invalid Request",
    });
  }
};

const signup =
  (dispatch) =>
  async ({ email, firstName, lastName, password, confirmPassword }) => {
    try {
      dispatch({ type: "add_loading" });
      const response = await graphqlClient.request(
        gql`
          mutation createUser(
            $email: String!
            $password: String!
            $confirm: String!
            $firstName: String!
            $lastName: String!
          ) {
            createUser(
              input: {
                email: $email
                password: $password
                confirm: $confirm
                firstname: $firstName
                lastname: $lastName
              }
            ) {
              success
              errors
            }
          }
        `,
        { email, password, confirm: confirmPassword, firstName, lastName },
        {}
      );

      dispatch({ type: "remove_loading" });
      if (
        !response.createUser.success &&
        response.createUser.errors &&
        response.createUser.errors[0]
      ) {
        console.log(response.createUser.errors[0]);
        dispatch({
          type: "add_error",
          payload: response.createUser.errors[0],
        });

        return false;
      }

      return true;
    } catch (error) {
      dispatch({ type: "remove_loading" });

      dispatch({
        type: "add_error",
        payload: "Invalid Request",
      });
    }
  };

const getToken = (dispatch) => async () => {
  try {
    const refreshToken = await localStorage.getItem("refreshToken");
    const email = await localStorage.getItem("email");
    const expiresAt = await localStorage.getItem("expiresAt");
    const expiresAtDate = new Date(expiresAt);
    var localExpiresAt = new Date(
      expiresAtDate.getTime() + expiresAtDate.getTimezoneOffset() * 60 * 1000
    );

    var offset = expiresAtDate.getTimezoneOffset() / 60;
    var hours = expiresAtDate.getHours();

    localExpiresAt.setHours(hours - offset);

    if (localExpiresAt < new Date()) {
      const response = await graphqlClient.request(
        gql`
          mutation refreshToken($email: String!, $refreshToken: String!) {
            refreshToken(email: $email, refreshToken: $refreshToken) {
              success
              errors
              idToken
              expiresAt
            }
          }
        `,
        { email, refreshToken },
        {}
      );

      if (!response.refreshToken.errors && response.refreshToken.idToken) {
        dispatch({
          type: "set_token",
          payload: response.refreshToken.idToken,
        });

        await localStorage.setItem("token", response.refreshToken.idToken);
        await localStorage.setItem("expiresAt", response.refreshToken.expiresAt);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const getUser =
  (dispatch) =>
  async ({ token }) => {
    try {
      const response = await graphqlClient.request(
        gql`
          query getUser {
            getUser {
              id
              firstname
              lastname
              email
              phone
              success
              errors
            }
          }
        `,
        {},
        { Authorization: `Bearer ${token}` }
      );

      if (!response.getUser.errors && response.getUser.success) {
        dispatch({
          type: "set_user",
          payload: response.getUser,
        });

        return response.getUser;
      }

      return false;
    } catch (error) {
      console.log(error);
    }
  };

const confirmEmail =
  (dispatch) =>
  async ({ email, code }) => {
    dispatch({ type: "add_loading" });
    try {
      const response = await graphqlClient.request(
        gql`
          mutation confirmUser($email: String!, $code: String!) {
            confirmUser(email: $email, code: $code) {
              success
              errors
            }
          }
        `,
        { email, code },
        {}
      );

      dispatch({ type: "remove_loading" });
      if (
        !response.confirmUser.success &&
        response.confirmUser.errors &&
        response.confirmUser.errors[0]
      ) {
        dispatch({
          type: "add_error",
          payload: response.confirmUser.errors[0],
        });
        return false;
      }

      return true;
    } catch (error) {
      dispatch({ type: "remove_loading" });

      dispatch({
        type: "add_error",
        payload: "Invalid Request",
      });
    }
  };

const forgotPassword =
  (dispatch) =>
  async ({ email }) => {
    try {
      const response = await graphqlClient.request(
        gql`
          mutation forgotPassword($email: String!) {
            forgotPassword(email: $email) {
              success
              errors
            }
          }
        `,
        { email },
        {}
      );

      if (
        !response.forgotPassword.success &&
        response.forgotPassword.errors &&
        response.forgotPassword.errors[0]
      ) {
        dispatch({
          type: "add_error",
          payload: response.forgotPassword.errors[0],
        });
        return false;
      }

      return true;
    } catch (error) {
      dispatch({ type: "remove_loading" });

      dispatch({
        type: "add_error",
        payload: "Invalid Request",
      });
    }
  };

const confirmForgotPassword =
  (dispatch) =>
  async ({ email, code, password, confirmPassword }) => {
    try {
      const response = await graphqlClient.request(
        gql`
          mutation confirmForgotPassword(
            $email: String!
            $code: String!
            $password: String!
            $confirm: String!
          ) {
            confirmForgotPassword(
              email: $email
              code: $code
              password: $password
              confirm: $confirm
            ) {
              success
              errors
            }
          }
        `,
        { email, code, password, confirm: confirmPassword },
        {}
      );

      if (
        !response.confirmForgotPassword.success &&
        response.confirmForgotPassword.errors &&
        response.confirmForgotPassword.errors[0]
      ) {
        dispatch({
          type: "add_error",
          payload: response.confirmForgotPassword.errors[0],
        });
        return false;
      }

      return true;
    } catch (error) {
      dispatch({ type: "remove_loading" });
      dispatch({
        type: "add_error",
        payload: "Invalid Request",
      });
    }
  };

const logout = (dispatch) => async () => {
  await localStorage.removeItem("token");
  await localStorage.removeItem("email");
  await localStorage.removeItem("refreshToken");
  await localStorage.removeItem("expiresAt");

  dispatch({ type: "logout" });
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_errorMessage" });
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await localStorage.getItem("token");
  const refreshToken = await localStorage.getItem("refreshToken");

  if (token) {
    dispatch({ type: "signin", payload: { token, refreshToken } });
  }
};

export const { Context, Provider } = createDataContext(
  authReducers,
  {
    signin,
    logout,
    signup,
    clearErrorMessage,
    tryLocalSignin,
    confirmEmail,
    forgotPassword,
    confirmForgotPassword,
    getToken,
    getUser,
  },
  { token: null, refreshToken: null, errorMessage: "", isLoading: false }
);
