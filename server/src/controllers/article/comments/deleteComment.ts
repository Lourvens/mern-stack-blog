import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import useCredentials from "../../../hooks/useCredential";
import ArticleService from "../../../services/ArticleService";
import { BAD_REQUEST, FORBIDDEN, NOT_FOUND, NO_CONTENT } from "http-status";
import {
  ForbbidenResourceMutation,
  ResourceNotFound,
} from "../../../utils/Error";
import createHttpError from "http-errors";
import { Error as MongoError } from "mongoose";

type params = { article_id: string; comment_id: string };
type DeleteReqHandler = RequestHandler<params>;

const deleteComment: DeleteReqHandler = asyncHandler(async (req, res) => {
  const user_id = useCredentials(req).id;
  const { article_id, comment_id } = req.params;
  try {
    const data = { article_id, user_id, comment_id };
    await ArticleService.comment.remove(data);
    res.status(NO_CONTENT).end();
  } catch (err) {
    if (err instanceof MongoError.CastError) {
      throw createHttpError(BAD_REQUEST, "invalid article id");
    }
    if (err instanceof ResourceNotFound) {
      throw createHttpError(NOT_FOUND, err.message);
    }
    if (err instanceof ForbbidenResourceMutation) {
      throw createHttpError(FORBIDDEN, "only the same user has write access");
    }
    throw err;
  }
});

export default deleteComment;
