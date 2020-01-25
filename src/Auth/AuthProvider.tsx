import React from "react";
import { withAuth } from "@okta/okta-react";
import { PropsWithChildren, useState, useEffect } from "react";
import { Auth, AuthContext } from "./Auth";

export interface AuthProviderProps {
  // Injected by withAuth
  auth?: any;
}

/**
 * Injects an `Auth` object in the react context
 */
export const AuthProvider = withAuth(
  (props: PropsWithChildren<AuthProviderProps>) => {
    const [user, setUser] = useState<any>();
    const [accessToken, setAccessToken] = useState<string>();

    const getValue = (): Auth => {
      const result: Auth = {};
      if (user) {
        result.user = { ...user };
      }
      if (accessToken) {
        result.bearerToken = `Bearer ${accessToken}`;
      }
      return result;
    };

    useEffect(() => {
      if (props.auth) {
        props.auth.getUser().then(setUser);
        props.auth.getAccessToken().then(setAccessToken);
      }
    }, [props.auth]);

    return (
      <AuthContext.Provider value={getValue()}>
        {props.children}
      </AuthContext.Provider>
    );
  }
);
