import { useContext } from "react";
import authContext, { AuthProp } from "../features/Auth/auth.context";
import jwtDecode from "jwt-decode";
import authService from "../features/Auth/auth.service";
import getAssetFileUrl from "@/utils/getAssetFileUrl";

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
    const profile_picture = getAssetFileUrl("avatar", decode.profile_picture);
    context?.setCredentials({ ...decode, profile_picture });
  }

  function updateProfileImg(profile_picture: string) {
    if (context?.credentials) {
      profile_picture = getAssetFileUrl("avatar", profile_picture);
      context?.setCredentials({ ...context.credentials, profile_picture });
    }
  }

  return {
    setAuth,
    logout,
    credential: context.credentials,
    isAuthenticated: !!context.credentials,
    updateProfileImg,
  };
}

export default useAuth;
