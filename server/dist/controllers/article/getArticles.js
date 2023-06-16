"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticleById = exports.getRandomArtcile = void 0;
const ArticleService_1 = __importDefault(require("../../services/ArticleService"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_1 = require("http-status");
const getArticles = async (req, res) => {
    const { category, page } = req.query;
    const filter = { category, page: parseInt(page) };
    const data = await ArticleService_1.default.getArticles(filter);
    res.json(data);
};
const getArticleByIdFn = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await ArticleService_1.default.getOne(id);
        if (!data)
            return res.status(http_status_1.NOT_FOUND).end();
        res.json(data).end();
    }
    catch {
        throw (0, http_errors_1.default)(http_status_1.BAD_REQUEST, "invalid article id");
    }
};
const getRandomArtcileFn = async (req, res) => {
    const { category } = req.query;
    const article = await ArticleService_1.default.getOneRandomly(category);
    res.json(article);
};
exports.getRandomArtcile = (0, express_async_handler_1.default)(getRandomArtcileFn);
exports.getArticleById = (0, express_async_handler_1.default)(getArticleByIdFn);
exports.default = (0, express_async_handler_1.default)(getArticles);
