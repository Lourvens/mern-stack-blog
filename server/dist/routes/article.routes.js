"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authGuard_1 = require("../middlewares/authGuard");
const schemaValidation_1 = require("../utils/schemaValidation");
const article_1 = __importDefault(require("../controllers/article"));
const uploader_1 = __importDefault(require("../middlewares/uploader"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const articleRouter = (0, express_1.Router)();
const COMMENT_ROUTE = "/:article_id/comments";
/**
 * @Route /article
 */
articleRouter
    /**@return the last 10 article */
    .get("/", article_1.default.get)
    /**@return a single article with more details*/
    .get("/:id", article_1.default.getById)
    .use(authGuard_1.isAuthenticated)
    .post("/", authGuard_1.isAuthenticated, (0, uploader_1.default)({ dest: "blog", fieldname: "cover" }), (0, validate_1.default)(schemaValidation_1.articleSchema), article_1.default.create)
    .delete("/:id", authGuard_1.isAuthenticated, article_1.default.delete)
    /**
     * @Route /article/:article_id/comment
     */
    .post(`${COMMENT_ROUTE}`, (0, validate_1.default)(schemaValidation_1.commentSchema), article_1.default.addComment)
    .put(`${COMMENT_ROUTE}/:comment_id`, (0, validate_1.default)(schemaValidation_1.commentSchema), article_1.default.updateComment)
    .delete(`${COMMENT_ROUTE}/:comment_id`, article_1.default.deleteComment);
exports.default = articleRouter;
