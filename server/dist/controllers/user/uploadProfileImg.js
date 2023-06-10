"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_1 = require("http-status");
const UserService_1 = __importDefault(require("../../services/UserService"));
const useCredential_1 = __importDefault(require("../../hooks/useCredential"));
const uploadProfileImg = (req, res) => {
    let { id } = (0, useCredential_1.default)(req);
    if (req.file?.filename) {
        UserService_1.default.updateProfilePicture(id, req.file.filename);
        return res.status(http_status_1.CREATED).end();
    }
    throw (0, http_errors_1.default)(http_status_1.BAD_REQUEST, "image not found");
};
exports.default = uploadProfileImg;
