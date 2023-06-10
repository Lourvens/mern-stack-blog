"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiLimiter = exports.authLimiter = void 0;
const { rateLimit } = require("express-rate-limit");
exports.authLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 10,
    message: "too many attemps",
    standardHeaders: true,
    legacyHeaders: false,
});
exports.apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
});
