import { Router } from "express";
import userCtrl from "../controllers/user";
import { isAuthenticated } from "../middlewares/authGuard";
import uploadImage from "../middlewares/uploader";

const userRoute = Router();

userRoute.post(
  "/:user_id/avatar",
  isAuthenticated,
  uploadImage("avatar", "image"),
  userCtrl.uploadProfileImg
);

export default userRoute;
