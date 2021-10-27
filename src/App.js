import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";

import * as React from "react";
import logo from "./logo.svg";
import "./App.scss";
import Signin from "./Components/Sign-in/Index";
import Signup from "./Components/Sign-up/Index";
import Dashboard from "./Components/Dashboard/Index";
import Journal from "./Components/Journal/Index";
import Trade from "./Components/Trade/Index";
import Watchlist from "./Components/Watchlist/Index";
import { Redirect, Route, Switch } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { StyledEngineProvider } from "@mui/material/styles";
import { Provider as AuthProvider, Context as AuthContext } from "./context/AuthContext";
import { Provider as JournalProvider, Context as JournalContext } from "./context/JournalContext";

import TryToLogin from "./Components/TryToLogin/Index";
import ConfirmUser from "./Components/ConfirmUser/Index";
import ForgotPassword from "./Components/ForgotPassword/Index";
import ConfirmForgotPassword from "./Components/ConfirmForgotPassword/Index";

import { withAuthenticator } from '@aws-amplify/ui-react'

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

function Root() {
  const { state } = React.useContext(AuthContext);
  const authFlow = (
    <>
      <Route exact path="/" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="/confirm" component={ConfirmUser} />
      <Route path="/forgotPassword" component={ForgotPassword} />
      <Route path="/confirmForgotPassword" component={ConfirmForgotPassword} />
    </>
  );

  const appFlow = (
    <>
      <Route path="/" exact>
        <Redirect to="/dashboard" />
      </Route>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/journal" component={Journal} />
      <Route path="/trade" component={Trade} />
      <Route path="/watchlist" component={Watchlist} />
    </>
  );

  return state.token ? appFlow : authFlow;
}

function App() {
  return (
    <>
      <AuthProvider>
        <JournalProvider>
          <TryToLogin>
            <StyledEngineProvider injectFirst>
              <CssBaseline />
              <Switch>
                <Root />
              </Switch>
            </StyledEngineProvider>
          </TryToLogin>
        </JournalProvider>
      </AuthProvider>
    </>
  );
}

export default withAuthenticator(App)
