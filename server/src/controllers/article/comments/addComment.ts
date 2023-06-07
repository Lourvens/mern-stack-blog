import { RequestHandler } from "express";
import { infer as ZodInfer } from "zod";
import asyncHandler from "express-async-handler";
import useCredentials from "../../../hooks/useCredential";
import ArticleService from "../../../services/ArticleService";
import { BAD_REQUEST, CREATED, NOT_FOUND } from "http-status";
import createHttpError from "http-errors";
import { Error as MongoError } from "mongoose";
import { ResourceNotFound } from "../../../utils/Error";
import { commentSchema } from "../../../utils/schemaValidation";

type params = { article_id: string };
type body = ZodInfer<typeof commentSchema>;
type PostReqHandler = RequestHandler<params, unknown, body>;

const addComment: PostReqHandler = asyncHandler(async (req, res) => {
  const user_id = useCredentials(req).id;
  const { article_id } = req.params;
  const { content } = req.body;

  try {
    await ArticleService.comment.add({ content, article_id, user_id });
    res.status(CREATED).end();
  } catch (err) {
    if (err instanceof MongoError.CastError) {
      throw createHttpError(BAD_REQUEST, "invalid article id");
    }
    if (err instanceof ResourceNotFound) {
      throw createHttpError(NOT_FOUND, err.message);
    }
    throw err;
  }
});

export default addComment;
