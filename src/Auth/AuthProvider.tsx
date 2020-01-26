import React from "react";
import { withAuth } from "@okta/okta-react";
import { PropsWithChildren, useState, useEffect } from "react";
import { Auth, AuthContext } from "./Auth";

export interface AuthProviderProps {
  // Injected by withAuth
  auth?: any;
}

// Okta auth methods seem to return undefined if you call them early. Keep retrying until we get something.
async function getValueUntilDefined<T>(
  name: string,
  getValue: () => Promise<T>,
  onDefined: (value: T) => void,
  attempt: number = 0
) {
  if (attempt === 10) {
    console.error(`Exceeded max retries. Giving up on [${name}]`);
  }
  const value = await getValue();
  if (value) {
    onDefined(value);
  } else {
    console.warn(`[${name}] is undefined. Retrying soon.`);
    setTimeout(
      () => getValueUntilDefined(name, getValue, onDefined, attempt++),
      100
    );
  }
}

/**
 * Injects an `Auth` object in the react context
 */
export const AuthProvider = withAuth(
  (props: PropsWithChildren<AuthProviderProps>) => {
    const [user, setUser] = useState<any>();
    const [accessToken, setAccessToken] = useState<string>();

    const getValue = (): Auth => {
      const result: Auth = {
        logout: () => props.auth.logout("/")
      };
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
        getValueUntilDefined("getUser", props.auth.getUser, setUser);
        getValueUntilDefined(
          "getAccessToken",
          props.auth.getAccessToken,
          setAccessToken
        );
      }
    }, [props.auth]);

    return (
      <AuthContext.Provider value={getValue()}>
        {props.children}
      </AuthContext.Provider>
    );
  }
);
