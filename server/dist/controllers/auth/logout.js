"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("../../config/env"));
const http_status_1 = __importDefault(require("http-status"));
const logout = (req, res) => {
    res.cookie(env_1.default.TOKEN_COOKIE_NAME, null);
    res.status(http_status_1.default.NO_CONTENT).end();
};
exports.default = logout;
