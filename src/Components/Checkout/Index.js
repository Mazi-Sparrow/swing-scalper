import React, { Component } from "react";
import { CardComponent } from "@chargebee/chargebee-js-react-wrapper";

import Navbar from "../Dashboard/navbar";
import Footer from "./Footer";
import "./checkout.css";

import { Context as AuthContext } from "../../context/AuthContext";
const THEMES = [
  {
    "main-bg": "#262E3A",
    "secondary-bg": "#3e4b5b",
    "main-text": "#fff",
    placeholder: "#939aa3",
    "placeholder-focused": "#ccc",
    "primary-btn": "#6EEDB6",
    "btn-text": "#1C2026",
    "primary-btn-focus": "rgb(70, 203, 145)",
    invalid: "#FF7C4A",
    "invalid-focused": "#e44d5f",
    "invalid-placeholder": "#FFCCA5",
  },
  {
    "main-bg": "#D5DBE7",
    "secondary-bg": "#fff",
    "main-text": "#000",
    placeholder: "#abacbe",
    "placeholder-focused": "#abacbe",
    "primary-btn": "#4773D2",
    "btn-text": "#fff",
    "primary-btn-focus": "#3361c3",
    invalid: "#E94745",
    "invalid-focused": "#e44d5f",
    "invalid-placeholder": "#FFCCA5",
  },
  {
    "main-bg": "#fca571",
    "secondary-bg": "#fff",
    "main-text": "#252857",
    placeholder: "#9293AB",
    "placeholder-focused": "#666",
    "primary-btn": "#252857",
    "btn-text": "#fff",
    "primary-btn-focus": "#191c4a",
    invalid: "#E94745",
    "invalid-focused": "#e44d5f",
    "invalid-placeholder": "#FFCCA5",
  },
  {
    "main-bg": "#544FB0",
    "secondary-bg": "#fff",
    "main-text": "#35A9BD",
    placeholder: "ddd",
    "placeholder-focused": "#ddd",
    "primary-btn": "#35A9BD",
    "btn-text": "#fff",
    "primary-btn-focus": "rgb(29, 138, 157)",
  },
];

const getIframeStyles = (theme) => {
  return {
    base: {
      color: theme["main-text"],
      fontWeight: "500",
      fontFamily: "Lato,-apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      iconColor: theme["main-text"],

      ":focus": {
        // color: '#424770',
      },

      "::placeholder": {
        color: theme["placeholder"],
      },

      ":focus::placeholder": {
        color: theme["placeholder-focused"],
      },
    },
    invalid: {
      color: theme["invalid"] || "#FF7C4A",

      ":focus": {
        color: theme["invalid-focused"] || "#e44d5f",
      },
      "::placeholder": {
        color: theme["invalid-placeholder"] || "#FFCCA5",
      },
    },
  };
};

export default function Index(props) {
  const { planId } = props;

  const {
    state: { token },
  } = React.useContext(AuthContext);

  const themes = THEMES;
  const cardRef = React.createRef();
  const [state, setState] = React.useState({
    token: "",
    error: "",
    loading: false,
    firstName: "",
    email: "",
    phone: "",
    // To change styles dynamically
    // Custom Styles
    styles: getIframeStyles(themes[0]),
    // Custom classes
    classes: {
      focus: "focus",
      invalid: "invalid",
      empty: "empty",
      complete: "complete",
    },
  });

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    console.log(name, value);
    setState({
      [name]: value,
    });
  };

  const tokenize = () => {
    console.log(planId);
    setState({ loading: true });
    // Call tokenize method using card component's ref
    cardRef.current
      .tokenize({})
      .then((data) => {
        console.log(data);
        setState({ loading: false, token: data.token, error: "" });
      })
      .catch((error) => {
        setState({
          loading: false,
          token: "",
          error: "Problem while tokenizing your card details",
        });
      });
  };

  return (
    <div>
      <div className="ex2 container">
        <div className="ex2-wrap">
          <div className="ex2-fieldset">
            <label className="ex2-field">
              <span className="ex2-label">Name</span>
              <input
                name="firstName"
                className={state.firstName ? "ex2-input val" : "ex2-input"}
                type="text"
                placeholder="John Doe"
                value={state.firstName}
                onChange={handleChange}
              />
            </label>
            <label className="ex2-field">
              <span className="ex2-label">Email</span>
              <input
                name="email"
                className={state.email ? "ex2-input val" : "ex2-input"}
                type="text"
                placeholder="john@comp.any"
                value={state.email}
                onChange={handleChange}
              />
            </label>
            <label className="ex2-field">
              <span className="ex2-label">Phone</span>
              <input
                name="phone"
                className={state.phone ? "ex2-input val" : "ex2-input"}
                type="text"
                placeholder="+63 53242 32637"
                value={state.phone}
                onChange={handleChange}
              />
            </label>

            <label className="ex2-field">
              {/* Render card component in combined-mode */}
              <CardComponent
                ref={cardRef}
                className="ex2-input fieldset field"
                icon={true}
                styles={THEMES[1]}
                classes={state.classes}
              />
            </label>
          </div>
          <button
            type="submit"
            className={state.loading ? "submit ex2-button" : "ex2-button"}
            onClick={tokenize}
          >
            Pay $100 & Tokenize
          </button>
          {state.error && (
            <div className="error" role="alert">
              {state.error}
            </div>
          )}
          {state.token && <div className="token">{state.token}</div>}
        </div>
      </div>
    </div>
  );
}
