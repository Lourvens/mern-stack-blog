import { Router } from "express";
import userCtrl from "../controllers/user";
import { isAuthenticated } from "../middlewares/authGuard";

const userRoute = Router();

userRoute.post("/:user_id/avatar", isAuthenticated, userCtrl.uploadProfileImg);

export default userRoute;
