"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserService_1 = require("../../services/UserService");
const http_status_1 = require("http-status");
const Error_1 = require("../../utils/Error");
const http_errors_1 = __importDefault(require("http-errors"));
const signup = async (req, res) => {
    try {
        const salts = await bcrypt_1.default.genSalt(10);
        const cryptedPwd = await bcrypt_1.default.hash(req.body.password, salts);
        await (0, UserService_1.createUser)({ ...req.body, password: cryptedPwd });
        res.status(http_status_1.CREATED).end();
    }
    catch (err) {
        if (err instanceof Error_1.ResourceAlreadyExist) {
            throw (0, http_errors_1.default)(http_status_1.CONFLICT, "user already exist");
        }
        throw err;
    }
};
exports.default = (0, express_async_handler_1.default)(signup);
