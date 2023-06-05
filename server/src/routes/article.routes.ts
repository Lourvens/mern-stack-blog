import { Router } from "express";
import { isAuthenticated } from "../middlewares/authGuard";
import { articleSchema } from "../utils/schemaValidation";
import articleCtrl from "../controllers/article";
import uploadImage from "../middlewares/uploader";
import validate from "../middlewares/validate";

const articleRouter = Router();

articleRouter
  .get("/", articleCtrl.get)
  .get("/:id", articleCtrl.getById)

  .post(
    "/",
    isAuthenticated,
    uploadImage({ dest: "blog", fieldname: "cover" }),
    validate(articleSchema),
    articleCtrl.create
  )
  .delete("/:id", isAuthenticated, articleCtrl.delete);
export default articleRouter;
