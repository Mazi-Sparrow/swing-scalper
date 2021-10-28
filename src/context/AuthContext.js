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
    if (!response.logIn.success && response.logIn.errors && response.logIn.errors[0]) {
      dispatch({
        type: "add_error",
        payload: response.logIn.errors[0],
      });
    }
    if (!response.logIn.errors && response.logIn.idToken) {
      console.log(response.logIn.idToken);
      dispatch({
        type: "signin",
        payload: { token: response.logIn.idToken, refreshToken: response.logIn.idToken },
      });
      await localStorage.setItem("token", response.logIn.idToken);
      await localStorage.setItem("refreshToken", response.logIn.refreshToken);
      await localStorage.setItem("email", username);
    }
  } catch (error) {
    dispatch({
      type: "add_error",
      payload: "Error when trying to login, invalid credentials .",
    });
  }
};

const signup =
  (dispatch) =>
  async ({ email, phone, firstName, lastName, password, confirmPassword }) => {
    try {
      const response = await graphqlClient.request(
        gql`
          mutation createUser(
            $email: String!
            $password: String!
            $confirm: String!
            $phone: String
            $firstName: String!
            $lastName: String!
          ) {
            createUser(
              input: {
                email: $email
                password: $password
                confirm: $confirm
                phone: $phone
                firstname: $firstName
                lastname: $lastName
              }
            ) {
              success
              errors
            }
          }
        `,
        { email, password, confirm: confirmPassword, phone, firstName, lastName },
        {}
      );

      if (
        !response.createUser.success &&
        response.createUser.errors &&
        response.createUser.errors[0]
      ) {
        dispatch({
          type: "add_error",
          payload: response.createUser.errors[0],
        });

        return false;
      }

      return true;
    } catch (error) {
      dispatch({
        type: "add_error",
        payload: "Error when trying to register, Please try agian later.",
      });
    }
  };

const getToken = (dispatch) => async () => {
  try {
    const refreshToken = await localStorage.getItem("refreshToken");
    const email = await localStorage.getItem("email");

    if (refreshToken && email) {
      return false;
    }
    const response = await graphqlClient.request(
      gql`
        mutation refreshToken($email: String!, $refreshToken: String!) {
          refreshToken(email: $email, refreshToken: $refreshToken) {
            success
            errors
            idToken
          }
        }
      `,
      { email, refreshToken },
      {}
    );

    if (
      !response.refreshToken.success &&
      response.refreshToken.errors &&
      response.refreshToken.errors[0]
    ) {
      dispatch({
        type: "add_error",
        payload: response.refreshToken.errors[0],
      });

      return false;
    }

    if (!response.refreshToken.errors && response.refreshToken.idToken) {
      dispatch({
        type: "set_token",
        payload: response.refreshToken.idToken,
      });

      await localStorage.setItem("token", response.refreshToken.idToken);
    }

    return true;
  } catch (error) {
    dispatch({
      type: "add_error",
      payload: "Error when trying to register, Please try agian later.",
    });
  }
};

const confirmEmail =
  (dispatch) =>
  async ({ email, code }) => {
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
      console.log(error);
      dispatch({
        type: "add_error",
        payload: "Error when trying to confirm email, Please try agian later.",
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
      console.log(error);
      dispatch({
        type: "add_error",
        payload: "Error when trying to confirm email, Please try agian later.",
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
      console.log(error);
      dispatch({
        type: "add_error",
        payload: "Error when trying to confirm email, Please try agian later.",
      });
    }
  };

const logout = (dispatch) => async () => {
  await localStorage.removeItem("token");
  await localStorage.removeItem("email");
  await localStorage.removeItem("refreshToken");

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
  dispatch({ type: "remove_loading" });
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
  },
  { token: null, refreshToken: null, errorMessage: "", isLoading: true }
);
