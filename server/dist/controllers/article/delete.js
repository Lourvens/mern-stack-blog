"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ArticleService_1 = __importDefault(require("../../services/ArticleService"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_errors_1 = __importDefault(require("http-errors"));
const useCredential_1 = __importDefault(require("../../hooks/useCredential"));
const http_status_1 = require("http-status");
const mongoose_1 = require("mongoose");
const Error_1 = require("../../utils/Error");
const deleteOne = async (req, res) => {
    const userId = (0, useCredential_1.default)(req).id;
    const articleId = req.params.id;
    try {
        await ArticleService_1.default.compareUserIdAndDelete(articleId, userId);
        res.end();
    }
    catch (err) {
        if (err instanceof mongoose_1.Error.CastError)
            throw (0, http_errors_1.default)(http_status_1.BAD_REQUEST, "invalid article id");
        if (err instanceof Error_1.ResourceNotFound)
            throw (0, http_errors_1.default)(http_status_1.NOT_FOUND, "not found or already deleted");
        if (err instanceof Error_1.ForbbidenResourceMutation)
            throw (0, http_errors_1.default)(http_status_1.FORBIDDEN);
        else
            throw err;
    }
};
exports.default = (0, express_async_handler_1.default)(deleteOne);
