import loadEnv from "./loadEnv";

type EnvType = "production" | "development" | "test";
const NODE_ENV = process.env["NODE_ENV"] as EnvType;

loadEnv();

const env = {
  mode: {
    PROD: NODE_ENV === "production",
    DEV: NODE_ENV === "development",
    TEST: NODE_ENV === "test",
  },

  HOST: (process.env.HOST || "localhost") as string,
  PORT: (process.env.PORT || 3000) as number,
  DB_URI: process.env.DB_URI as string,

  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY as string,
  SECRET_TOKEN_KEY: process.env.SCERET_TOKEN_KEY as string,
  TOKEN_COOKIE_NAME: "auth_token",
};

export default env;
