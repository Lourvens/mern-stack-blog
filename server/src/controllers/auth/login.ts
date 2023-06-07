import bcrypt from "bcrypt";
import { user } from "../../types/schema";
import { RequestHandler } from "express";
import { getUserByEmail } from "../../services/UserService";
import asyncHandler from "express-async-handler";
import { ResourceNotFound } from "../../utils/Error";
import createHttpError from "http-errors";
import { UNAUTHORIZED } from "http-status";
import {
  generateAccessToken,
  generatePrivateToken,
} from "../../utils/tokenGenerator";
import { secureCookieOption } from "../../utils/cookieOptions";
import env from "../../config/env";
import type { authTokenPayload } from "../../types";

const login: loginReqHandler = async (req, res) => {
  try {
    let user = await getUserByEmail(req.body.email);
    let isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      throw createHttpError(UNAUTHORIZED, "user or email is invalid");
    }

    let token_payload: authTokenPayload = {
      id: user.id,
      email: user.email,
      fullname: user.fullname,
      profile_picture: user?.profile_picture,
    };

    let access_token = generateAccessToken(token_payload);
    let private_token = generatePrivateToken(token_payload);
    res.cookie(env.TOKEN_COOKIE_NAME, private_token, secureCookieOption);

    res.status(200).json({ access_token });
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      throw createHttpError(UNAUTHORIZED, "user or email is invalid");
    }
    throw err;
  }
};

type loginReqHandler = RequestHandler<
  unknown,
  unknown,
  Pick<user, "email" | "password">,
  unknown
>;

export default asyncHandler(login);
