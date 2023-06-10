"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserService_1 = require("../../services/UserService");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Error_1 = require("../../utils/Error");
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_1 = require("http-status");
const tokenGenerator_1 = require("../../utils/tokenGenerator");
const cookieOptions_1 = require("../../utils/cookieOptions");
const env_1 = __importDefault(require("../../config/env"));
const login = async (req, res) => {
    try {
        let user = await (0, UserService_1.getUserByEmail)(req.body.email);
        let isPasswordMatch = await bcrypt_1.default.compare(req.body.password, user.password);
        if (!isPasswordMatch) {
            throw (0, http_errors_1.default)(http_status_1.UNAUTHORIZED, "user or email is invalid");
        }
        let token_payload = {
            id: user.id,
            email: user.email,
            fullname: user.fullname,
            profile_picture: user?.profile_picture,
        };
        let access_token = (0, tokenGenerator_1.generateAccessToken)(token_payload);
        let private_token = (0, tokenGenerator_1.generatePrivateToken)(token_payload);
        res.cookie(env_1.default.TOKEN_COOKIE_NAME, private_token, cookieOptions_1.secureCookieOption);
        res.status(200).json({ access_token });
    }
    catch (err) {
        if (err instanceof Error_1.ResourceNotFound) {
            throw (0, http_errors_1.default)(http_status_1.UNAUTHORIZED, "user or email is invalid");
        }
        throw err;
    }
};
exports.default = (0, express_async_handler_1.default)(login);
