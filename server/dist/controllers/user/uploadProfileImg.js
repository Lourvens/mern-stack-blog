"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_1 = require("http-status");
const UserService_1 = __importDefault(require("../../services/UserService"));
const useCredential_1 = __importDefault(require("../../hooks/useCredential"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const uploadProfileImg = async (req, res) => {
    let { id } = (0, useCredential_1.default)(req);
    if (req.file?.filename) {
        const profile_picture = req.file.filename;
        await UserService_1.default.updateProfilePicture(id, profile_picture);
        return res.status(http_status_1.OK).json({ profile_picture });
    }
    throw (0, http_errors_1.default)(http_status_1.BAD_REQUEST, "image not found");
};
exports.default = (0, express_async_handler_1.default)(uploadProfileImg);
