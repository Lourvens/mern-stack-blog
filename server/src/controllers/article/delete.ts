import ArticleService from "../../services/ArticleService";
import asyncHandler from "express-async-handler";
import createHttpError from "http-errors";
import useCredentials from "../../hooks/useCredential";
import { RequestHandler } from "express";
import { BAD_REQUEST, FORBIDDEN, NOT_FOUND } from "http-status";
import { Error as MongoErr } from "mongoose";
import { ForbbidenResourceMutation, ResourceNotFound } from "../../utils/Error";

type params = { id: string };
const deleteOne: RequestHandler<params> = async (req, res) => {
  const userId = useCredentials(req).id;
  const articleId = req.params.id;

  try {
    await ArticleService.compareUserIdAndDelete(articleId, userId);
    res.end();
  } catch (err) {
    if (err instanceof MongoErr.CastError)
      throw createHttpError(BAD_REQUEST, "invalid article id");
    if (err instanceof ResourceNotFound)
      throw createHttpError(NOT_FOUND, "not found or already deleted");
    if (err instanceof ForbbidenResourceMutation)
      throw createHttpError(FORBIDDEN);
    else throw err;
  }
};

export default asyncHandler(deleteOne);
