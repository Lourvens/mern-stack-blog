"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commentArticleService_1 = __importDefault(require("./commentArticleService"));
const Article_1 = __importDefault(require("../models/Article"));
const Error_1 = require("../utils/Error");
const filter = (item) => item.select("-__v").populate("author", "-password -__v").lean();
async function create(data) {
    let newArticle = new Article_1.default(data);
    await newArticle.save();
}
async function getArticles(step) {
    const articles = await filter(Article_1.default.find())
        .skip(step || 0)
        .select("-comments")
        .limit(20)
        .sort("-1")
        .exec();
    return articles;
}
async function getOne(id) {
    const article = await filter(Article_1.default.findById(id))
        .populate("comments.author", "fullname profile_picture")
        .exec();
    return article;
}
async function compareUserIdAndDelete(article_id, user_id) {
    let article = await filter(Article_1.default.findById(article_id)).exec();
    if (!article)
        throw new Error_1.ResourceNotFound();
    if (article.author._id == user_id) {
        await Article_1.default.deleteOne({ _id: article_id }).exec();
    }
    else {
        throw new Error_1.ForbbidenResourceMutation();
    }
}
const ArticleService = {
    create,
    getArticles,
    getOne,
    compareUserIdAndDelete,
    comment: commentArticleService_1.default,
};
exports.default = ArticleService;
