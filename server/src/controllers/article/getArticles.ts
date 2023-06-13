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
  const id = req.params.id;
  try {
    const data = await ArticleService.getOne(id);
    if (!data) return res.status(NOT_FOUND).end();

    res.json(data).end();
  } catch {
    throw createHttpError(BAD_REQUEST, "invalid article id");
  }
};

const getRandomArtcileFn: RequestHandler = async (req, res) => {
  const { category } = req.query;
  const article = await ArticleService.getOneRandomly(category as string);
  res.json(article);
};

export const getRandomArtcile = asyncHandler(getRandomArtcileFn);
export const getArticleById = asyncHandler(getArticleByIdFn);
export default asyncHandler(getArticles);
