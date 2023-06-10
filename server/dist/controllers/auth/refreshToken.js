"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("../../config/env"));
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const http_status_1 = require("http-status");
const http_errors_1 = __importDefault(require("http-errors"));
const tokenGenerator_1 = require("../../utils/tokenGenerator");
const refreshToken = (req, res) => {
    let token = req.cookies[env_1.default.TOKEN_COOKIE_NAME];
    console.log(token, req.cookies);
    try {
        let { email, fullname, profile_picture, id } = jsonwebtoken_1.default.verify(token, env_1.default.SECRET_TOKEN_KEY);
        let payload = { email, fullname, profile_picture, id };
        let access_token = (0, tokenGenerator_1.generateAccessToken)(payload);
        res.status(200).json({ access_token });
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.TokenExpiredError) {
            throw (0, http_errors_1.default)(http_status_1.UNAUTHORIZED, "token expired");
        }
        if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
            throw (0, http_errors_1.default)(http_status_1.UNAUTHORIZED, "token invalid");
        }
        throw err;
    }
};
exports.default = refreshToken;
