import type { authTokenPayload } from "./../../../types/index";
import jwt from "jsonwebtoken";
import env from "../config/env";

export const generateAccessToken = (payload: authTokenPayload) => {
  return jwt.sign(payload, env.ACCESS_TOKEN_KEY, {
    expiresIn: "15m",
  });
};

export const generatePrivateToken = (payload: authTokenPayload) => {
  return jwt.sign(payload, env.SECRET_TOKEN_KEY, {
    expiresIn: "15m",
  });
};
