import { RequestHandler } from "express";
import ArticleService from "../../services/ArticleService";
import asyncHandler from "express-async-handler";
import createHttpError from "http-errors";
import { BAD_REQUEST, NOT_FOUND } from "http-status";

const getArticles: RequestHandler = async (req, res) => {
  const data = await ArticleService.getArticles();
  res.json(data);
};

type params = { id: string };
const getArticleByIdFn: RequestHandler<params> = async (req, res) => {
  let id = req.params.id;
  try {
    const data = await ArticleService.getOne(id);
    if (!data) res.status(NOT_FOUND).end();

    res.json(data).end();
  } catch {
    throw createHttpError(BAD_REQUEST, "invalid article id");
  }
};
export const getArticleById = asyncHandler(getArticleByIdFn);
export default asyncHandler(getArticles);
