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

async function getArticles(step?: number) {
  const articles = await filter(Article.find())
    .skip(step || 0)
    .select("-comments")
    .limit(20)
    .sort("-1")
    .exec();

  return articles;
}

async function getOne(id: string) {
  const article = await filter(Article.findById(id))
    .populate("comments.author", "fullname profile_picture")
    .exec();
  return article;
}

// async function getOneRandomly(category?: string) {
//   const randomPipeline = { $sample: { size: 1 } };
//   // const projectPipeline = { $project: }
//   const article = await Article.aggregate([randomPipeline, {$project: ["_id", ]}]).exec();
//   if (article.length) {

//   }
// }

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
  comment,
};

export default ArticleService;
