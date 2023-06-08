import dotenv from "dotenv";
import path from "path";

type EnvType = "production" | "development" | "test";
const NODE_ENV = process.env["NODE_ENV"] as EnvType;

class Module {
  private static instance: Module;
  private constructor() {}

  public static hasCalled(): Module {
    if (!Module.instance) {
      Module.instance = new Module();
      return false;
    }
    return true;
  }
}

const loadEnv = () => {
  // avoid multiple execution of this function
  if (Module.hasCalled()) return;

  let envVars: any;

  switch (NODE_ENV) {
    case "production":
      envVars = dotenv.config({
        path: path.join(__dirname, "..", "..", ".env"),
      }).parsed;
      break;
    case "test":
      envVars = dotenv.config({
        path: path.join(__dirname, "..", "..", ".env.test"),
      }).parsed;
      break;
    default:
      envVars = dotenv.config({
        path: path.join(__dirname, "..", "..", ".env.dev"),
      }).parsed;
      break;
  }

  const requireEnv = (...requiredVars: string[]) => {
    if (typeof envVars == "object") {
      requiredVars.forEach((item) => {
        const message = `${item} var not found work properly, provide it on the env var`;
        if (!envVars[item]) throw new Error(message);
      });
    }
  };

  requireEnv("DB_URI", "ACCESS_TOKEN_KEY", "SECRET_TOKEN_KEY");
};

export default loadEnv;
