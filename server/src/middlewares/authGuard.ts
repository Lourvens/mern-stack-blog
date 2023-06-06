import { RequestHandler } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import env from "../config/env";
import createHttpError from "http-errors";
import { UNAUTHORIZED } from "http-status";

export const isAuthenticated: RequestHandler = (req, res, next) => {
  let token = req.headers["authorization"]?.split(" ")[1];
  try {
    jwt.verify(token as string, env.ACCESS_TOKEN_KEY);
    next();
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      throw createHttpError(UNAUTHORIZED, "token might be invalid or expired");
    }
    next(err);
  }
};
