import { RequestHandler } from "express";
import env from "../../config/env";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { UNAUTHORIZED } from "http-status";
import createHttpError from "http-errors";
import { generateAccessToken } from "../../utils/tokenGenerator";
import type { authTokenPayload } from "../../types";

const refreshToken: RequestHandler = (req, res) => {
  let token = req.cookies[env.TOKEN_COOKIE_NAME];
  console.log(token, req.cookies);
  try {
    let { email, fullname, profile_picture, id } = jwt.verify(
      token,
      env.SECRET_TOKEN_KEY
    ) as authTokenPayload;

    let payload = { email, fullname, profile_picture, id };
    let access_token = generateAccessToken(payload);

    res.status(200).json({ access_token });
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw createHttpError(UNAUTHORIZED, "token expired");
    }
    if (err instanceof JsonWebTokenError) {
      throw createHttpError(UNAUTHORIZED, "token invalid");
    }
    throw err;
  }
};

export default refreshToken;
