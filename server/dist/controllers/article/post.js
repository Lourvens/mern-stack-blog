"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const ArticleService_1 = __importDefault(require("../../services/ArticleService"));
const useCredential_1 = __importDefault(require("../../hooks/useCredential"));
const http_status_1 = require("http-status");
const http_errors_1 = __importDefault(require("http-errors"));
const postArticle = async (req, res) => {
    const { id: userID } = (0, useCredential_1.default)(req);
    const { content, title } = req.body;
    let img_path = req.file?.filename;
    if (!img_path) {
        throw (0, http_errors_1.default)(400, "a cover image is required in the image field");
    }
    await ArticleService_1.default.create({
        author: userID,
        content,
        title,
        img_path,
    });
    res.status(http_status_1.CREATED).end();
};
exports.default = (0, express_async_handler_1.default)(postArticle);
