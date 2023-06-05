import { Router } from "express";
import { isAuthenticated } from "../middlewares/authGuard";
import userCtrl from "../controllers/user";
import uploadImage from "../middlewares/uploader";

const userRoute = Router();

const uploadMiddleware = [
  isAuthenticated,
  uploadImage({ dest: "avatar", fieldname: "image" }),
  userCtrl.uploadProfileImg,
];

// (update|post) add a new profile picture
userRoute
  .route("/avatar")
  .post(...uploadMiddleware)
  .put(...uploadMiddleware);

// get user profile
userRoute.get("/:id", userCtrl.getUser);

export default userRoute;
