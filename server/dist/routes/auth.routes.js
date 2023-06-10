"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rateLimit_1 = require("../middlewares/rateLimit");
const schemaValidation_1 = require("../utils/schemaValidation");
const validate_1 = __importDefault(require("../middlewares/validate"));
const auth_1 = __importDefault(require("../controllers/auth"));
const authRoute = (0, express_1.Router)();
authRoute
    .use(rateLimit_1.authLimiter)
    .post("/signup", (0, validate_1.default)(schemaValidation_1.userRegister), auth_1.default.signup)
    .post("/login", (0, validate_1.default)(schemaValidation_1.userLogin), auth_1.default.login)
    .post("/refresh-token", auth_1.default.refreshToken)
    .post("/logout", auth_1.default.logout);
exports.default = authRoute;
