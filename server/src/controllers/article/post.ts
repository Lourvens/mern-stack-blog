import { articleSchema } from "./../../utils/schemaValidation";
import { Types } from "mongoose";
import asyncHandler from "express-async-handler";
import { RequestHandler } from "express";
import articleService from "../../services/ArticleService";
import useCredentials from "../../hooks/useCredential";
import { CREATED } from "http-status";
import createHttpError from "http-errors";
import { z } from "zod";

type respBody = z.infer<typeof articleSchema>;
type postReqHandler = RequestHandler<unknown, unknown, respBody>;

const postArticle: postReqHandler = async (req, res) => {
  const { id: userID } = useCredentials(req);
  const { content, title, category } = req.body;

  let img_path = req.file?.filename as string;
  if (!img_path) {
    throw createHttpError(400, "a cover image is required in the image field");
  }

  await articleService.create({
    author: userID as unknown as Types.ObjectId,
    content,
    title,
    category,
    img_path,
  });

  res.status(CREATED).end();
};

export default asyncHandler(postArticle);
