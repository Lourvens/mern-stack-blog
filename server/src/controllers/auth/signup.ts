import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

import { RequestHandler } from "express";
import { user } from "../../types/schema";
import { createUser } from "../../services/UserService";
import { CREATED, CONFLICT } from "http-status";
import { ResourceAlreadyExist } from "../../utils/Error";
import createHttpError from "http-errors";

const signup: signupReqHandler = async (req, res) => {
  try {
    const salts = await bcrypt.genSalt(10);
    const cryptedPwd = await bcrypt.hash(req.body.password, salts);
    await createUser({ ...req.body, password: cryptedPwd });
    res.status(CREATED).end();
  } catch (err) {
    if (err instanceof ResourceAlreadyExist) {
      throw createHttpError(CONFLICT, "user already exist");
    }
    throw err;
  }
};

type signupReqHandler = RequestHandler<
  unknown,
  unknown,
  Omit<user, "avatar">,
  unknown
>;

export default asyncHandler(signup);
