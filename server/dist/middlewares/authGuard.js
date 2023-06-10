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
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const env_1 = __importDefault(require("../config/env"));
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_1 = require("http-status");
const isAuthenticated = (req, res, next) => {
    let token = req.headers["authorization"]?.split(" ")[1];
    try {
        jsonwebtoken_1.default.verify(token, env_1.default.ACCESS_TOKEN_KEY);
        next();
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
            throw (0, http_errors_1.default)(http_status_1.UNAUTHORIZED, "token might be invalid or expired");
        }
        next(err);
    }
};
exports.isAuthenticated = isAuthenticated;
