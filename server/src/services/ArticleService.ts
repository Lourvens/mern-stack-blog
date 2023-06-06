import Article from "../models/Article";
import type { articleProp } from "../models/Article";
import { ResourceNotFound } from "../utils/Error";

type createArticleData = Pick<
  articleProp,
  "author" | "title" | "img_path" | "content"
>;
type filterFn = ReturnType<typeof Article.find | typeof Article.findById>;

const filter = (item: filterFn) =>
  item.select("-__v").populate("author", "-password -__v").lean();

async function create(data: createArticleData) {
  let newArticle = new Article(data);
  await newArticle.save();
}

async function getArticles(step?: number) {
  const articles = await filter(Article.find())
    .skip(step || 0)
    .limit(20)
    .sort("-1")
    .exec();

  return articles;
}

async function getOne(id: string) {
  const article = await filter(Article.findById(id)).exec();
  return article;
}

async function compareUserIdAndDelete(article_id: string, user_id: string) {
  let article = await filter(Article.findById(article_id)).exec();

  if (!article) throw new ResourceNotFound();

  if (<unknown>article.author._id == user_id) {
    const res = await Article.deleteOne({ _id: article_id }).exec();
    console.log(JSON.stringify(res));
  } else {
    throw new Error("forbbiden");
  }
}

const ArticleService = { create, getArticles, getOne, compareUserIdAndDelete };

export default ArticleService;
