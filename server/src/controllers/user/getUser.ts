import createHttpError from "http-errors";
import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import User from "../../services/UserService";
import { BAD_REQUEST, NOT_FOUND } from "http-status";
import { Error as MongoErr } from "mongoose";
import { ResourceNotFound } from "../../utils/Error";

const getUser: GetRequestHandler = async (req, res) => {
  let user_id = req.params.id;
  try {
    let usr = await User.getUserInfo(user_id);
    res.json(usr).end();
  } catch (err) {
    if (err instanceof MongoErr.CastError) {
      throw createHttpError(BAD_REQUEST, "invalid id");
    }
    if (err instanceof ResourceNotFound) {
      throw createHttpError(NOT_FOUND, "user not found");
    }
    throw err;
  }
};

type GetRequestHandler = RequestHandler<{ id: string }>;

export default asyncHandler(getUser);
