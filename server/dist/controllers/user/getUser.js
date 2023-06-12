"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const UserService_1 = __importDefault(require("../../services/UserService"));
const http_status_1 = require("http-status");
const mongoose_1 = require("mongoose");
const Error_1 = require("../../utils/Error");
const getUser = async (req, res) => {
    let user_id = req.params.id;
    try {
        let usr = await UserService_1.default.getUserInfo(user_id);
        res.json(usr).end();
    }
    catch (err) {
        if (err instanceof mongoose_1.Error.CastError) {
            throw (0, http_errors_1.default)(http_status_1.BAD_REQUEST, "invalid id");
        }
        if (err instanceof Error_1.ResourceNotFound) {
            throw (0, http_errors_1.default)(http_status_1.NOT_FOUND, "user not found");
        }
        throw err;
    }
};
exports.default = (0, express_async_handler_1.default)(getUser);
