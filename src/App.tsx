import React from "react";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { getConfig } from "./config";
import { Security, SecureRoute, ImplicitCallback } from "@okta/okta-react";
import { AuthProvider } from "./Auth/AuthProvider";
import { Header } from "./Components/Header";
import { TempPage } from "./Pages/TempPage";

export const App: React.FC = () => {
  const oktaConfig = getConfig().okta;
  const implicitCallbackPath = "/implicit/callback";
  const redirectUri =
    window.location.origin + process.env.PUBLIC_URL + implicitCallbackPath;
  return (
    <BrowserRouter>
      <Security
        issuer={oktaConfig.endpoint}
        clientId={oktaConfig.clientId}
        redirectUri={redirectUri}
      >
        <AuthProvider>
          <CssBaseline />
          <Header />
          <Switch>
            <Route path={implicitCallbackPath}>
              <ImplicitCallback />
            </Route>
            <SecureRoute path="/" component={TempPage} />
          </Switch>
        </AuthProvider>
      </Security>
    </BrowserRouter>
  );
};
