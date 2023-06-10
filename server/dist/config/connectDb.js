"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cli_color_1 = __importDefault(require("cli-color"));
const env_1 = __importDefault(require("./env"));
const connectDb = async () => {
    try {
        await mongoose_1.default.connect(env_1.default.DB_URI);
        console.log(cli_color_1.default.cyan("connected to the mongo database with success"));
    }
    catch (err) {
        console.log(cli_color_1.default.red("db connection error"));
        console.log(err);
        process.exit(1);
    }
};
exports.default = connectDb;
