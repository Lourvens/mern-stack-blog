"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = require("http-errors");
const http_status_1 = __importDefault(require("http-status"));
const errorHandler = (err, req, res, next) => {
    let status = http_status_1.default.INTERNAL_SERVER_ERROR;
    let message = "an unknown error was occured";
    if ((0, http_errors_1.isHttpError)(err)) {
        status = err.statusCode;
        message = err.message;
    }
    res.status(status).json({ error: { message } });
};
exports.default = errorHandler;
