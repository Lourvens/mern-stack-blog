"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("./config/env"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const rateLimit_1 = require("./middlewares/rateLimit");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const article_routes_1 = __importDefault(require("./routes/article.routes"));
const healthCheck_1 = __importDefault(require("./healthCheck"));
const app = (0, express_1.default)();
if (env_1.default.mode.DEV) {
    app.use((0, morgan_1.default)("dev"));
}
if (env_1.default.mode.PROD) {
    app.use((0, helmet_1.default)());
    app.use((0, compression_1.default)({
        filter: (req, res) => {
            if (req.headers["x-no-compression"])
                return false;
            return compression_1.default.filter(req, res);
        },
    }));
}
// default config
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
// rate limiter
app.use(rateLimit_1.apiLimiter);
// static assets files
app.use("/assets", express_1.default.static(path_1.default.join(__dirname, "uploads")));
// api routes
app.use("/auth", auth_routes_1.default);
app.use("/user", user_routes_1.default);
app.use("/article", article_routes_1.default);
app.all("/healthz", healthCheck_1.default);
// error handler
app.use(errorHandler_1.default);
exports.default = app;
