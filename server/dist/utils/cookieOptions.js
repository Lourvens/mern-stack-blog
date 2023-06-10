"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secureCookieOption = void 0;
exports.secureCookieOption = {
    httpOnly: true,
    secure: true,
    maxAge: 14 * 24 * 60 * 60 * 1000, // 1 week
};
