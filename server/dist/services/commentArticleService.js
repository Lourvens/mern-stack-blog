"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Article_1 = __importDefault(require("../models/Article"));
const Error_1 = require("../utils/Error");
const newComment = async (values) => {
    const article = await Article_1.default.findById(values.article_id);
    if (!article)
        throw new Error_1.ResourceNotFound();
    article.comments.push({
        author: values.user_id,
        content: values.content,
    });
    await article.save();
};
const updateComment = async (values) => {
    const article = await Article_1.default.findById(values.article_id);
    if (!article) {
        throw new Error_1.ResourceNotFound("article not found, it might be deleted");
    }
    const comment = article.comments.id(values.comment_id);
    if (!comment) {
        throw new Error_1.ResourceNotFound("comment not found, it might be deleted");
    }
    if (comment.author._id != values.user_id) {
        throw new Error_1.ForbbidenResourceMutation();
    }
    comment.content = values.content;
    await article.save();
};
const deleteComment = async (values) => {
    const article = await Article_1.default.findById(values.article_id);
    if (!article) {
        throw new Error_1.ResourceNotFound("article not found, it might be deleted");
    }
    const comment = article.comments.id(values.comment_id);
    if (!comment) {
        throw new Error_1.ResourceNotFound("comment not found, it might be deleted");
    }
    if (comment.author._id != values.user_id) {
        throw new Error_1.ForbbidenResourceMutation();
    }
    const commentIndx = article.comments.findIndex((item) => item._id?.equals(comment._id));
    article.comments.splice(commentIndx, 1); // remove the selected comment
    await article.save();
};
const comment = {
    add: newComment,
    update: updateComment,
    remove: deleteComment,
};
exports.default = comment;
