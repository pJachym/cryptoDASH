import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "assets/styles/theme";
import { GlobalStyle } from "assets/styles/GlobalStyle";
import MainTemplate from "components/templates/MainTemplate/MainTemplate";
import { BrowserRouter as Router, Switch, Route, Redirect, useParams } from "react-router-dom";
import Market from "./Market";
import Dashboard from "./Dashboard";
import Wallet from "./Wallet";
import MarketProvider from "providers/MarketProvider/MarketProvider";
import AppProvider from "providers/AppProvider/AppProvider";

function App() {
  const { id } = useParams;

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <MarketProvider>
          <MainTemplate>
            <Switch>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/wallet">
                <Wallet />
              </Route>
              <Route path="/market/:id?">
                <Market />
              </Route>
            </Switch>
          </MainTemplate>
        </MarketProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
