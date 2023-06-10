import { Router } from "express";
import { authLimiter } from "../middlewares/rateLimit";
import { userLogin, userRegister } from "../utils/schemaValidation";
import validate from "../middlewares/validate";
import authCtrl from "../controllers/auth";

const authRoute = Router();

authRoute
  .use(authLimiter)

  .post("/signup", validate(userRegister), authCtrl.signup)
  .post("/login", validate(userLogin), authCtrl.login)
  .post("/refresh-token", authCtrl.refreshToken)
  .post("/logout", authCtrl.logout);

export default authRoute;
