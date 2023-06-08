import connectDb from "./config/connectDb";
import app from "./app";
import loadEnv from "./config/loadEnv";
import env from "./config/env";
import clc from "cli-color";

loadEnv();
connectDb();

app.listen(env.PORT, () => {
  console.clear();
  console.log(clc.cyan(`server running on port ${env.PORT}`));
});
