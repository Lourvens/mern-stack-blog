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
  // avoid multiple execution
  if (Module.hasCalled()) return;

  switch (NODE_ENV) {
    case "production":
      dotenv.config({
        path: path.join(__dirname, "..", "..", ".env.prod"),
      });
      break;
    case "test":
      dotenv.config({
        path: path.join(__dirname, "..", "..", ".env.test"),
      });
      break;
    default:
      let a = dotenv.config({
        path: path.join(__dirname, "..", "..", ".env.dev"),
      });
      break;
  }
};

export default loadEnv;
