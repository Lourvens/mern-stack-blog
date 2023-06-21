import { useContext } from "react";
import authContext, { AuthProp } from "./auth.context";
import jwtDecode from "jwt-decode";

function useAuth() {
  const context = useContext(authContext);

  if (!context) throw new Error("auth context cannot be empty");

  function clearUserCredential() {
    context?.setCredentials();
  }

  function setAuth(token: string) {
    type authToken = NonNullable<AuthProp["credentials"]>;
    const decode = jwtDecode<authToken>(token);

    context?.setCredentials({ ...decode, access_token: token });
  }

  return {
    setAuth,
    clearUserCredential,
    credential: context.credentials,
    access_token: context.credentials?.access_token,
    isAuthenticated: !!context.credentials,
  };
}

export default useAuth;
