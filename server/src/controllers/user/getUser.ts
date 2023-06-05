import createHttpError from "http-errors";
import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import User from "../../services/UserService";
import { BAD_REQUEST } from "http-status";

const getUser: GetRequestHandler = async (req, res) => {
  let user_id = req.params.id;
  try {
    let usr = await User.getUserInfo(user_id);
    res.json(usr).end();
  } catch (err) {
    throw createHttpError(BAD_REQUEST, "invalid id");
  }
};

type GetRequestHandler = RequestHandler<{ id: string }>;

export default asyncHandler(getUser);
