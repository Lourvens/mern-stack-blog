import { useContext } from "react";
import authContext, { AuthProp } from "../features/Auth/auth.context";
import jwtDecode from "jwt-decode";
import authService from "../features/Auth/auth.service";

function useAuth() {
  const context = useContext(authContext);

  if (!context) throw new Error("auth context cannot be empty");

  async function logout() {
    await authService.logout();
    context?.setCredentials();
  }

  function setAuth(token: string) {
    type authToken = NonNullable<AuthProp["credentials"]>;
    localStorage.setItem("token", token);
    const decode = jwtDecode<authToken>(token);
    context?.setCredentials({ ...decode });
  }

  return {
    setAuth,
    logout,
    credential: context.credentials,
    isAuthenticated: !!context.credentials,
  };
}

export default useAuth;
