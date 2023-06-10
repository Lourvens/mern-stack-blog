"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uploadProfileImg_1 = __importDefault(require("./uploadProfileImg"));
const getUser_1 = __importDefault(require("./getUser"));
const userCtrl = {
    uploadProfileImg: uploadProfileImg_1.default,
    getUser: getUser_1.default,
};
exports.default = userCtrl;
