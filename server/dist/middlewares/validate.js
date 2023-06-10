"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const zod_1 = require("zod");
const validate = (schema) => {
    return (req, resp, next) => {
        const data = req.body;
        try {
            schema.parse(data);
            next();
        }
        catch (err) {
            if (err instanceof zod_1.ZodError) {
                return resp
                    .status(http_status_1.default.UNPROCESSABLE_ENTITY)
                    .json({ message: err.errors });
            }
        }
    };
};
exports.default = validate;
