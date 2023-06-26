import axios, { AxiosRequestConfig, isAxiosError } from "axios";
import {
  BAD_REQUEST_ERR,
  CONFLICT_ERR,
  FORBIDDEN_ERR,
  NOT_FOUND_ERR,
  UNAUTHORIZED_ERR,
  TOO_MANY_REQUESTS_ERR,
} from "@/utils/httpError";
import authService from "@/features/Auth/auth.service";

export const axiosInstance = axios.create({
  baseURL: "/api/",
  withCredentials: true,
});

/**
 * Auto send access token in each request if the token was in localstorage
 */
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.withCredentials = true;
  }
  return config;
});

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  __isRetryReq: boolean;
}
/**
 * refresh the access token when request failed with 401 status code
 * and retry the request again
 */
axiosInstance.interceptors.response.use(null, async (error) => {
  if (isAxiosError(error)) {
    const prevRequest = error.config as CustomAxiosRequestConfig;
    const errorMessage = error.response?.data.error.message as string;

    if (error.response?.status === 401 && !prevRequest?.__isRetryReq) {
      console.log(errorMessage);
      const isInvalidRefreshToken = /token/.test(errorMessage);
      if (isInvalidRefreshToken) return Promise.reject(error);

      prevRequest.__isRetryReq = true;
      const { data } = await authService.refreshToken();
      localStorage.setItem("token", data.access_token);

      return axiosInstance(prevRequest);
    }
    return Promise.reject(error);
  }
});

axiosInstance.interceptors.response.use(null, (err) => {
  if (isAxiosError(err)) {
    switch (err.response?.status) {
      case 400:
        throw new BAD_REQUEST_ERR(err);
      case 401:
        throw new UNAUTHORIZED_ERR(err);
      case 403:
        throw new FORBIDDEN_ERR(err);
      case 404:
        throw new NOT_FOUND_ERR(err);
      case 409:
        throw new CONFLICT_ERR(err);
      case 429:
        throw new TOO_MANY_REQUESTS_ERR(err);
    }
  }
});
