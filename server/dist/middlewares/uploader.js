"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_1 = require("http-status");
// import uuid from "uuid";
const uuid = require("uuid");
const uploadImage = ({ dest, fieldname }) => {
    const storage = multer_1.default.diskStorage({
        destination: path_1.default.join(process.cwd(), "src", "uploads", dest),
        filename(req, file, cb) {
            const extension = file.originalname.match(/(\.[^.]+)$/)?.[1] || "";
            let filename = `${uuid.v4()}-${Date.now()}${extension}`;
            cb(null, filename);
        },
    });
    const Multer = (0, multer_1.default)({
        storage,
        limits: {
            fileSize: 5 * 1024 * 1024, // 5mb
        },
        fileFilter(req, file, callback) {
            let isValidMimetype = /image/.test(file.mimetype);
            if (isValidMimetype) {
                callback(null, true);
            }
            else {
                callback(new Error("invalid mimetype"));
            }
        },
    });
    const upload = Multer.single(fieldname);
    const multerMiddleware = (req, res, next) => {
        upload(req, res, (err) => {
            if (err) {
                next((0, http_errors_1.default)(http_status_1.BAD_REQUEST, err.message));
            }
            else {
                next();
            }
        });
    };
    return multerMiddleware;
};
exports.default = uploadImage;
