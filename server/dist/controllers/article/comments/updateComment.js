"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const useCredential_1 = __importDefault(require("../../../hooks/useCredential"));
const ArticleService_1 = __importDefault(require("../../../services/ArticleService"));
const http_status_1 = require("http-status");
const http_errors_1 = __importDefault(require("http-errors"));
const mongoose_1 = require("mongoose");
const Error_1 = require("../../../utils/Error");
const updateComment = (0, express_async_handler_1.default)(async (req, res) => {
    const user_id = (0, useCredential_1.default)(req).id;
    const { article_id, comment_id } = req.params;
    const { content } = req.body;
    console.log(req.params);
    try {
        const data = { article_id, comment_id, content, user_id };
        await ArticleService_1.default.comment.update(data);
        res.status(http_status_1.NO_CONTENT).end();
    }
    catch (err) {
        if (err instanceof mongoose_1.Error.CastError) {
            throw (0, http_errors_1.default)(http_status_1.BAD_REQUEST, "invalid article id");
        }
        if (err instanceof Error_1.ResourceNotFound) {
            throw (0, http_errors_1.default)(http_status_1.NOT_FOUND, err.message);
        }
        if (err instanceof Error_1.ForbbidenResourceMutation) {
            throw (0, http_errors_1.default)(http_status_1.FORBIDDEN, "only the same user has write access");
        }
        throw err;
    }
});
exports.default = updateComment;
