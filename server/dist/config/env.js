"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loadEnv_1 = __importDefault(require("./loadEnv"));
const NODE_ENV = process.env["NODE_ENV"];
(0, loadEnv_1.default)();
const env = {
    mode: {
        PROD: NODE_ENV === "production",
        DEV: NODE_ENV === "development",
        TEST: NODE_ENV === "test",
    },
    HOST: (process.env.HOST || "localhost"),
    PORT: (process.env.PORT || 3000),
    DB_URI: process.env.DB_URI,
    ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
    SECRET_TOKEN_KEY: process.env.SECRET_TOKEN_KEY,
    TOKEN_COOKIE_NAME: "auth_token",
};
exports.default = env;
