"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const NODE_ENV = process.env["NODE_ENV"];
class Module {
    constructor() { }
    static hasCalled() {
        if (!Module.instance) {
            Module.instance = new Module();
            return false;
        }
        return true;
    }
}
const loadEnv = () => {
    // avoid multiple execution
    if (Module.hasCalled())
        return;
    switch (NODE_ENV) {
        case "production":
            dotenv_1.default.config({
                path: path_1.default.join(__dirname, "..", "..", ".env"),
            });
            break;
        case "test":
            dotenv_1.default.config({
                path: path_1.default.join(__dirname, "..", "..", ".env.test"),
            });
            break;
        default:
            let a = dotenv_1.default.config({
                path: path_1.default.join(__dirname, "..", "..", ".env.dev"),
            });
            break;
    }
};
exports.default = loadEnv;
