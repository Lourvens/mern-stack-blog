"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePrivateToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
const generateAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, env_1.default.ACCESS_TOKEN_KEY, {
        expiresIn: "15m",
    });
};
exports.generateAccessToken = generateAccessToken;
const generatePrivateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, env_1.default.SECRET_TOKEN_KEY, {
        expiresIn: "14d",
    });
};
exports.generatePrivateToken = generatePrivateToken;
