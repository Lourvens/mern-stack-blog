import env from "./config/env";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";

import errorHandler from "./middlewares/errorHandler";
import { apiLimiter } from "./middlewares/rateLimit";
import authRoute from "./routes/auth.routes";
import userRoute from "./routes/user.routes";
import articleRouter from "./routes/article.routes";

const app = express();

if (env.mode.DEV) {
  app.use(morgan("dev"));
}

// default config
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// rate limiter
app.use(apiLimiter);

// static assets files
app.use("/assets", express.static(path.join(__dirname, "uploads")));

// api routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/article", articleRouter);

// error handler
app.use(errorHandler);

export default app;
