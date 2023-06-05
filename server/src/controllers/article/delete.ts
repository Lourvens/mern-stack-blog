import { RequestHandler } from "express";
import ArticleService from "../../services/ArticleService";
import asyncHandler from "express-async-handler";
import createHttpError from "http-errors";
import { BAD_REQUEST, NOT_FOUND } from "http-status";
import useCredentials from "../../hooks/useCredential";
import { Error as MongoErr } from "mongoose";

type params = { id: string };
const deleteOne: RequestHandler<params> = async (req, res) => {
  let user = useCredentials(req);

  try {
    const userId = user.id,
      articleId = req.params.id;
    await ArticleService.compareUserIdAndDelete(articleId, userId);
    res.end();
  } catch (err) {
    if (err instanceof MongoErr.CastError) {
      throw createHttpError(BAD_REQUEST, "invalid article id");
    }
    throw err;
  }
};

export default asyncHandler(deleteOne);
