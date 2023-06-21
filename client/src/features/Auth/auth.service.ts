import { axiosInstance } from "@/service/axiosInstance";
import { API_ROUTE } from "@/utils/constants";

type user = { email: string; fullname: string; password: string };
type token = { access_token: string };

function login(values: Omit<user, "fullname">) {
  return axiosInstance.post<token>(API_ROUTE.LOGIN, values);
}

function signup(values: user) {
  return axiosInstance.post<null>(API_ROUTE.REGISTER, values);
}

function refreshToken() {
  return axiosInstance.post<token>(API_ROUTE.REFRESH);
}

export default {
  login,
  signup,
  refreshToken,
};
