import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";

import * as React from "react";
import "./App.css";
import "./Custom.css";
import Signin from "./Components/Sign-in/Index";
import Signup from "./Components/Sign-up/Index";
import Dashboard from "./Components/Dashboard/Index";
import Journal from "./Components/Journal/Index";
import Watchlist from "./Components/Watchlist/Index";
import Analyzer from "./Components/Analyzer/Index";
import { Redirect, Route, Switch } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { StyledEngineProvider } from "@mui/material/styles";
import { Provider as AuthProvider, Context as AuthContext } from "./context/AuthContext";
import { Provider as JournalProvider, Context as JournalContext } from "./context/JournalContext";
import {
  Provider as SubscriptionProvider,
  Context as SubscriptionContext,
} from "./context/SubscriptionContext";
import {
  Provider as WatchListProvider,
  Context as WatchListContext,
} from "./context/WatchListContext";
import { Provider as ContactUsProvider } from "./context/ContactUsContext";

import TryToLogin from "./Components/TryToLogin/Index";
import TryToGetToken from "./Components/TryToGetToken/Index";
import ConfirmUser from "./Components/ConfirmUser/Index";
import ForgotPassword from "./Components/ForgotPassword/Index";
import ConfirmForgotPassword from "./Components/ConfirmForgotPassword/Index";
import Subscription from "./Components/Subscription/Index";
import Information from "./Components/Information/Index";
import CheckoutRedirect from "./Components/CheckoutRedirect/Index";
import Profile from "./Components/Profile/Index";
import LandingPage from './Components/LandingPage/Index';
import PrivacyPolicy from './Components/PrivacyPolicy/Index';
import TermsOfService from "./Components/TermsOfService/Index";
import Support from "./Components/Support/Index";
import TradeStreams from "./Components/TradeStreams/Index";
import NewWatchList from "./Components/NewWatchlist/Index";

Amplify.configure(awsconfig);

function Root() {
  const { state } = React.useContext(AuthContext);
  console.log(state);
  const authFlow = (
    <>
      {state.errorMessage ? <TryToGetToken></TryToGetToken> : null}
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/confirm" component={ConfirmUser} />
        <Route path="/forgotPassword" component={ForgotPassword} />
        <Route path="/confirmForgotPassword" component={ConfirmForgotPassword} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/information" component={Information} />
        <Route path="/subscription" component={Subscription} />
        <Route path="*" exact component={Signin} />
        <Route path="*" exact>
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );

  const appFlow = (
    <>
      <TryToGetToken />
      <Switch>
        {state.isSubscribed === "false" ? (
          <Route path="/" exact>
            <Redirect to="/subscription" />
          </Route>
        ) : (
          <Route path="/" exact>
            <Redirect to="/dashboard" />
          </Route>
        )}

        <Route path="/dashboard" component={Dashboard} />
        {state.isSubscribed === "true" || state.isSubscribed === true ? (
          <Route path="/journal" component={Journal} />
        ) : null}

        {state.isSubscribed === "true" || state.isSubscribed === true ? (
          <Route path="/watchlist" component={Watchlist} />
          ) : null}
          
        {state.isSubscribed === "true" || state.isSubscribed === true ? (
          <Route path="/analyzer" component={Analyzer} />
          ) : null}

        <Route path="/information" component={Information} />
        <Route path="/subscription" component={Subscription} />
        <Route path="/redirect" component={CheckoutRedirect} />
        <Route path="/profile" component={Profile} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-service" component={TermsOfService} />
        <Route path="/support" component={Support} />
        <Route path="/trade-streams" component={TradeStreams} />
        <Route path="/watch-list" component={NewWatchList} />
        <Route path="*" exact>
          <Redirect to="/profile" />
        </Route>
      </Switch>
    </>
  );

  return state.token && state.email ? appFlow : authFlow;
}

function App() {
  return (
    <>
      <AuthProvider>
        <JournalProvider>
          <WatchListProvider>
            <SubscriptionProvider>
              <ContactUsProvider>
                <TryToLogin>
                  <StyledEngineProvider injectFirst>
                    <CssBaseline />
                    <Root />
                  </StyledEngineProvider>
                </TryToLogin>
              </ContactUsProvider>
            </SubscriptionProvider>
          </WatchListProvider>
        </JournalProvider>
      </AuthProvider>
    </>
  );
}

export default App;
