import axios, { isAxiosError } from "axios";
import {
  BAD_REQUEST_ERR,
  CONFLICT_ERR,
  FORBIDDEN_ERR,
  NOT_FOUND_ERR,
  UNAUTHORIZED_ERR,
  TOO_MANY_REQUESTS_ERR,
} from "@/utils/httpError";

export const axiosInstance = axios.create({
  baseURL: "/api/",
});

axiosInstance.interceptors.response.use(null, (err) => {
  if (isAxiosError(err)) {
    switch (err.response?.status) {
      case 400: // 400
        throw new BAD_REQUEST_ERR(err.message);
      case 401: //401
        throw new UNAUTHORIZED_ERR(err.message);
      case 403: // 403
        throw new FORBIDDEN_ERR(err.message);
      case 404: // 404
        throw new NOT_FOUND_ERR(err.message);
      case 409:
        throw new CONFLICT_ERR(err.message);
      case 429:
        throw new TOO_MANY_REQUESTS_ERR(err.message);
    }
  }
});
