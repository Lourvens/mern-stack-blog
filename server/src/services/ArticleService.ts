import comment from "./commentArticleService";
import Article from "../models/Article";
import type { articleProp } from "../models/Article";
import { ForbbidenResourceMutation, ResourceNotFound } from "../utils/Error";

type createArticleData = Pick<
  articleProp,
  "author" | "title" | "img_path" | "content" | "category"
>;
type filterFn = ReturnType<typeof Article.find | typeof Article.findById>;

const filter = (item: filterFn) =>
  item.select("-__v").populate("author", "-password -__v").lean();

async function create(data: createArticleData) {
  let newArticle = new Article(data);
  await newArticle.save();
}

type params = { page?: number; category?: string; author?: string };
async function getArticles(params?: params) {
  let query = {};
  if (params?.category) query = { category: params.category };
  if (params?.author) query = { ...query, author: params.author };

  const skipPage = (parseInt(params?.page as unknown as string) - 1 || 0) * 10;
  const articles = await filter(Article.find(query))
    .skip(skipPage)
    .select("-comments")
    .limit(10)
    .sort({ updatedAt: -1 })
    .exec();

  return articles;
}

async function getOne(id: string) {
  const article = await filter(Article.findById(id))
    .populate("comments.author", "fullname profile_picture")
    .exec();
  return article;
}

async function getOneRandomly(category?: string) {
  const query: any = {};
  if (category) {
    query.category = category;
  }

  const count = await Article.countDocuments(query);
  const randomIndex = Math.floor(Math.random() * count);

  const article = await filter(Article.findOne(query))
    .skip(randomIndex)
    .populate("comments.author", "fullname profile_picture")
    .exec();
  return article;
}

async function compareUserIdAndDelete(article_id: string, user_id: string) {
  let article = await filter(Article.findById(article_id)).exec();

  if (!article) throw new ResourceNotFound();

  if (<unknown>article.author._id == user_id) {
    await Article.deleteOne({ _id: article_id }).exec();
  } else {
    throw new ForbbidenResourceMutation();
  }
}

const ArticleService = {
  create,
  getArticles,
  getOne,
  compareUserIdAndDelete,
  getOneRandomly,
  comment,
};

export default ArticleService;
