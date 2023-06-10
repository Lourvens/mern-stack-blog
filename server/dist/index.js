"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectDb_1 = __importDefault(require("./config/connectDb"));
const app_1 = __importDefault(require("./app"));
const loadEnv_1 = __importDefault(require("./config/loadEnv"));
const env_1 = __importDefault(require("./config/env"));
const cli_color_1 = __importDefault(require("cli-color"));
(0, loadEnv_1.default)();
(0, connectDb_1.default)();
app_1.default.listen(env_1.default.PORT, env_1.default.HOST, () => {
    console.clear();
    console.log(cli_color_1.default.cyan(`server running at ${env_1.default.HOST}:${env_1.default.PORT}`));
});
