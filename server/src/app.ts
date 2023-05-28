import env from "./config/env";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import errorHandler from "./middlewares/errorHandler";
import { apiLimiter } from "./middlewares/rateLimit";
import authRoute from "./routes/auth.routes";
import userRoute from "./routes/user.routes";

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

// api routes
app.use("/auth", authRoute);
app.use("/user", userRoute);

// error handler
app.use(errorHandler);

export default app;
