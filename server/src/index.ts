import connectDb from "./config/connectDb";
import app from "./app";
import loadEnv from "./config/loadEnv";
import env from "./config/env";
import clc from "cli-color";

loadEnv();
connectDb();

app.listen(env.PORT, env.HOST, () => {
  console.log(clc.cyan(`server running at ${env.HOST}:${env.PORT}`));
});
