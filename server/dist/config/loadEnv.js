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
    // avoid multiple execution of this function
    if (Module.hasCalled())
        return;
    let envVars;
    switch (NODE_ENV) {
        case "production":
            envVars = dotenv_1.default.config({
                path: path_1.default.join(__dirname, "..", "..", ".env"),
            }).parsed;
            break;
        case "test":
            envVars = dotenv_1.default.config({
                path: path_1.default.join(__dirname, "..", "..", ".env.test"),
            }).parsed;
            break;
        default:
            envVars = dotenv_1.default.config({
                path: path_1.default.join(__dirname, "..", "..", ".env.dev"),
            }).parsed;
            break;
    }
    const requireEnv = (...requiredVars) => {
        requiredVars.forEach((item) => {
            const message = `${item} variable not found, server won't work properly, provide it on the env file`;
            if (!process.env[item])
                throw new Error(message);
        });
    };
    requireEnv("DB_URI", "ACCESS_TOKEN_KEY", "SECRET_TOKEN_KEY");
};
exports.default = loadEnv;
