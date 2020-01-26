import React from "react";

export type Auth = {
  /**
   * See https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims for detailed descriptions and other
   * available claims.
   *
   * This requires a server call. It will be undefined until that call completes successfully.
   **/
  user?: {
    sub: string; // eg. "00geju6h3aOlWajab9qj"
    name: string; // eg. "Bob Harris"
    email: string; // eg. "bob@yahoo.com"
    given_name: string; // eg. "Bob"
    family_name: string; // eg. "Harris"
  };
  // This requires a server call. It will be undefined until that call completes successfully.
  bearerToken?: string;
  logout: () => void;
};

export const AuthContext = React.createContext<Auth>({
  logout: () => {}
});
