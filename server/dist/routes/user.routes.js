"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authGuard_1 = require("../middlewares/authGuard");
const user_1 = __importDefault(require("../controllers/user"));
const uploader_1 = __importDefault(require("../middlewares/uploader"));
const userRoute = (0, express_1.Router)();
const uploadMiddleware = [
    authGuard_1.isAuthenticated,
    (0, uploader_1.default)({ dest: "avatar", fieldname: "image" }),
    user_1.default.uploadProfileImg,
];
// (update|post) add a new profile picture
userRoute
    .route("/avatar")
    .post(...uploadMiddleware)
    .put(...uploadMiddleware);
// get user profile
userRoute.get("/:id", user_1.default.getUser);
exports.default = userRoute;
