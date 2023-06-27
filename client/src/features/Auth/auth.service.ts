import { axiosInstance } from "@/service/axiosInstance";
import { API_ROUTE } from "@/utils/constants";

type user = { email: string; fullname: string; password: string };
type token = { access_token: string };

function login(values: Omit<user, "fullname">) {
  return axiosInstance.post<token>(API_ROUTE.LOGIN, values);
}

function signup(values: user) {
  return axiosInstance.post<null>(API_ROUTE.SIGNUP, values);
}

function logout() {
  return axiosInstance.post<null>(API_ROUTE.LOGOUT);
}

function refreshToken() {
  return axiosInstance.post<token>(API_ROUTE.REFRESH);
}

async function uploadUserProfile(imageFile: File) {
  type resp = { profile_picture: string };
  const formData = new FormData();
  formData.append("image", imageFile);
  return await axiosInstance.post<resp>("/users/avatar", formData);
}

export default {
  login,
  signup,
  logout,
  refreshToken,
  uploadUserProfile,
};
